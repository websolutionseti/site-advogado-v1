/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Lead Cache & Chatwoot Integration Service — Cartes Advogados
 * Sincronização em tempo real entre Chatwoot Live Chat e Formulários de Diagnóstico / Contato
 */

export interface LeadData {
  contactName?: string;
  email?: string;
  phone?: string;
  companyName?: string;
  source?: 'chatwoot' | 'intake_form' | 'contact_page';
  updatedAt?: string;
}

const CACHE_KEY = 'cartes_lead_prefill';
const EVENT_NAME = 'cartes:lead-cache-updated';

/**
 * Recupera os dados de lead armazenados em cache local (localStorage e sessionStorage)
 */
export const getLeadCache = (): LeadData => {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(CACHE_KEY) || sessionStorage.getItem(CACHE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
};

/**
 * Salva e propaga os dados de contato do lead na memória cache
 */
export const saveLeadCache = (data: Partial<LeadData>) => {
  if (typeof window === 'undefined') return;
  try {
    const current = getLeadCache();
    const updated: LeadData = {
      ...current,
      ...data,
      updatedAt: new Date().toISOString()
    };

    const serialized = JSON.stringify(updated);
    localStorage.setItem(CACHE_KEY, serialized);
    sessionStorage.setItem(CACHE_KEY, serialized);

    // Notificar formulários ativos na página
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: updated }));

    // Sincronizar com o Chatwoot se estiver ativo
    syncWithChatwoot(updated);
  } catch (err) {
    console.warn('[Cartes Cache] Falha ao persistir lead cache:', err);
  }
};

/**
 * Notifica e atualiza os atributos do visitante no Chatwoot SDK
 */
export const syncWithChatwoot = (lead: LeadData) => {
  if (typeof window === 'undefined') return;
  const cw = (window as any).$chatwoot;
  if (!cw) return;

  const userPayload: Record<string, any> = {};
  if (lead.contactName) userPayload.name = lead.contactName;
  if (lead.email) userPayload.email = lead.email;
  if (lead.phone) userPayload.phone_number = lead.phone;

  if (Object.keys(userPayload).length > 0) {
    try {
      const identifier = lead.email || lead.phone || `cartes_visitor_${Date.now()}`;
      cw.setUser(identifier, userPayload);
      
      if (lead.companyName) {
        cw.setCustomAttributes({
          empresa: lead.companyName,
          fonte_captura: lead.source || 'portal_cartes',
          ultima_sincronizacao: new Date().toISOString()
        });
      }
    } catch (e) {
      // Chatwoot SDK em modo silencioso
    }
  }
};

/**
 * Registra listeners nos eventos do Chatwoot para capturar dados informados no chat
 */
export const initChatwootCacheSync = () => {
  if (typeof window === 'undefined') return;

  // Quando o Chatwoot carregar e estiver pronto
  const onReady = () => {
    const cached = getLeadCache();
    if (cached.contactName || cached.email || cached.phone) {
      syncWithChatwoot(cached);
    }
  };

  window.addEventListener('chatwoot:ready', onReady);

  // Quando o usuário enviar mensagens no chat, tentar extrair email/telefone de mensagens se fornecidos
  window.addEventListener('chatwoot:on-message', (event: any) => {
    try {
      const msg = event?.detail?.content || '';
      if (!msg || typeof msg !== 'string') return;

      // Regex simples para capturar email digitado no chat
      const emailMatch = msg.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
      // Regex para capturar telefone brasileiro digitado no chat
      const phoneMatch = msg.match(/(?:\+?55\s?)?(?:\(?\d{2}\)?\s?)?(?:9\d{4}[-\s]?\d{4}|\d{4}[-\s]?\d{4})/);

      const updates: Partial<LeadData> = { source: 'chatwoot' };
      if (emailMatch) updates.email = emailMatch[0];
      if (phoneMatch) updates.phone = phoneMatch[0];

      if (updates.email || updates.phone) {
        saveLeadCache(updates);
      }
    } catch {
      // Ignorar erros de parsing
    }
  });
};
