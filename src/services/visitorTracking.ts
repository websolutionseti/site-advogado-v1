/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Visitor Tracking & LGPD Compliance Service — Cartes Advogados
 * Rastreamento de Origem, UTMs, Detecção de IP e Auditoria de Acesso
 */

import { loadChatwoot, loadClarity, loadGoogleAnalytics } from './scriptLoader';

export interface VisitorSession {
  ip: string;
  referrer: string;
  origin: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  userAgent: string;
  deviceType: 'Desktop' | 'Mobile' | 'Tablet';
  consentStatus: 'granted' | 'essential_only' | 'pending';
  consentTimestamp?: string;
  sessionStartTime: string;
  lastVisitedPage: string;
}

const STORAGE_KEY = 'cartes_visitor_session';
const CONSENT_KEY = 'cartes_lgpd_consent';

export const detectDeviceType = (): 'Desktop' | 'Mobile' | 'Tablet' => {
  const ua = navigator.userAgent.toLowerCase();
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'Tablet';
  }
  if (/mobile|iphone|ipod|blackberry|opera mini|iemobile|wpdesktop/i.test(ua)) {
    return 'Mobile';
  }
  return 'Desktop';
};

export const detectOrigin = (referrer: string, utmSource?: string): string => {
  if (utmSource) {
    return `Campanha: ${utmSource.toUpperCase()}`;
  }
  if (!referrer) {
    return 'Acesso Direto (Digitação de URL / Favoritos)';
  }
  const refLower = referrer.toLowerCase();
  if (refLower.includes('google')) return 'Google Search (Orgânico/Busca)';
  if (refLower.includes('linkedin')) return 'LinkedIn';
  if (refLower.includes('instagram')) return 'Instagram';
  if (refLower.includes('facebook')) return 'Facebook';
  if (refLower.includes('whatsapp') || refLower.includes('wa.me')) return 'WhatsApp Link';
  if (refLower.includes('t.co') || refLower.includes('twitter') || refLower.includes('x.com')) return 'X / Twitter';
  if (refLower.includes('youtube')) return 'YouTube';
  
  try {
    const url = new URL(referrer);
    return `Referência: ${url.hostname}`;
  } catch {
    return 'Origem Externa';
  }
};

export const getStoredConsent = (): 'granted' | 'essential_only' | 'pending' => {
  if (typeof window === 'undefined') return 'pending';
  const val = localStorage.getItem(CONSENT_KEY);
  if (val === 'granted' || val === 'essential_only') return val;
  return 'pending';
};

export const setStoredConsent = (status: 'granted' | 'essential_only') => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CONSENT_KEY, status);
  localStorage.setItem('cartes_lgpd_consent_time', new Date().toISOString());

  // Atualizar sessão ativa
  const session = getStoredSession();
  if (session) {
    session.consentStatus = status;
    session.consentTimestamp = new Date().toISOString();
    saveSession(session);
  }

  // Notificar scripts externos (Clarity, GTM) sobre consentimento
  if (status === 'granted') {
    initializeApprovedScripts();
  }
};

export const getStoredSession = (): VisitorSession | null => {
  if (typeof window === 'undefined') return null;
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const saveSession = (session: VisitorSession) => {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
};

export const initVisitorTracking = async (currentPage: string): Promise<VisitorSession> => {
  const existing = getStoredSession();
  if (existing) {
    existing.lastVisitedPage = currentPage;
    saveSession(existing);
    return existing;
  }

  // Extrair parâmetros de busca / UTM
  const params = new URLSearchParams(window.location.search);
  const utmSource = params.get('utm_source') || undefined;
  const utmMedium = params.get('utm_medium') || undefined;
  const utmCampaign = params.get('utm_campaign') || undefined;
  const utmTerm = params.get('utm_term') || undefined;
  const utmContent = params.get('utm_content') || undefined;

  const referrer = document.referrer || '';
  const origin = detectOrigin(referrer, utmSource);
  const deviceType = detectDeviceType();
  const consent = getStoredConsent();

  const newSession: VisitorSession = {
    ip: 'Consultando IP...',
    referrer,
    origin,
    utmSource,
    utmMedium,
    utmCampaign,
    utmTerm,
    utmContent,
    userAgent: navigator.userAgent,
    deviceType,
    consentStatus: consent,
    sessionStartTime: new Date().toISOString(),
    lastVisitedPage: currentPage
  };

  if (consent !== 'granted') {
    // LGPD (minimização): IP é dado pessoal — só consultamos API de terceiros após consentimento
    newSession.ip = 'Não coletado (aguardando consentimento)';
  }
  saveSession(newSession);

  if (consent === 'granted') {
    await resolveVisitorIp();
  }

  return getStoredSession() || newSession;
};

/**
 * Consulta assíncrona e não-bloqueante do IP (timeout de 3s).
 * Executada SOMENTE com consentimento 'granted'.
 */
const resolveVisitorIp = async () => {
  if (typeof window === 'undefined' || getStoredConsent() !== 'granted') return;
  const session = getStoredSession();
  if (!session) return;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    const res = await fetch('https://api.ipify.org?format=json', { signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      session.ip = typeof data.ip === 'string' ? data.ip : 'IP Oculto/Proxy';
    }
  } catch {
    session.ip = 'Indisponível (bloqueado/proxy)';
  }
  saveSession(session);
};

/**
 * Injeção controlada de scripts com respeito à LGPD/GDPR
 * Só executa após consentimento 'granted'
 * Fonte única: delega para src/services/scriptLoader.ts
 */
export const initializeApprovedScripts = () => {
  if (typeof window === 'undefined') return;
  if (getStoredConsent() !== 'granted') return;

  loadGoogleAnalytics();
  loadClarity();
  void loadChatwoot();
  void resolveVisitorIp();
};
