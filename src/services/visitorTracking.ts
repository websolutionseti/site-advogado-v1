/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Visitor Tracking & LGPD Compliance Service — Cartes Advogados
 * Rastreamento de Origem, UTMs, Detecção de IP e Auditoria de Acesso
 */

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

  saveSession(newSession);

  // Consulta assíncrona e não-bloqueante do IP com timeout seguro de 3 segundos
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    const res = await fetch('https://api.ipify.org?format=json', { signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      newSession.ip = data.ip || 'IP Oculto/Proxy';
      saveSession(newSession);
    }
  } catch {
    newSession.ip = 'Cloudflare Edge Proxy';
    saveSession(newSession);
  }

  return newSession;
};

/**
 * Injeção controlada de scripts com respeito à LGPD/GDPR
 * Só executa após consentimento 'granted'
 */
export const initializeApprovedScripts = () => {
  if (typeof window === 'undefined') return;
  const consent = getStoredConsent();
  if (consent !== 'granted') return;

  const env = (import.meta as any).env || {};

  // 1. Microsoft Clarity
  const clarityId = env.VITE_CLARITY_ID;
  if (clarityId && !document.getElementById('clarity-script')) {
    const s = document.createElement('script');
    s.id = 'clarity-script';
    s.type = 'text/javascript';
    s.innerHTML = `
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "${clarityId}");
    `;
    document.head.appendChild(s);
  }

  // 2. Chatwoot Live Chat
  const chatwootBase = env.VITE_CHATWOOT_BASE_URL;
  const chatwootToken = env.VITE_CHATWOOT_TOKEN;
  if (chatwootBase && chatwootToken && !document.getElementById('chatwoot-script')) {
    const s = document.createElement('script');
    s.id = 'chatwoot-script';
    s.async = true;
    s.defer = true;
    s.src = `${chatwootBase}/packs/js/sdk.js`;
    s.onload = () => {
      if ((window as any).chatwootSDK) {
        (window as any).chatwootSDK.run({
          websiteToken: chatwootToken,
          baseUrl: chatwootBase
        });
      }
    };
    document.body.appendChild(s);
  }
};
