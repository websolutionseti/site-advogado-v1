/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Script Loader — Cartes Advogados
 * Fonte ÚNICA de injeção de scripts de terceiros (GA4, Clarity, Chatwoot).
 *
 * Governança LGPD/GDPR:
 *  - GA4 e Clarity (analytics/telemetria): somente após consentimento 'granted'.
 *  - Chatwoot (serviço solicitado pelo titular): carregado sob demanda quando o
 *    visitante clica em "Iniciar Chat" (ação explícita) OU antecipadamente
 *    quando há consentimento 'granted'.
 *  - Nenhum script de terceiro é carregado no index.html.
 */

const env = ((import.meta as any).env || {}) as Record<string, string | undefined>;

export const SCRIPT_CONFIG = {
  gaId: env.VITE_GA_ID || '',
  clarityId: env.VITE_CLARITY_ID || '',
  // O websiteToken do Chatwoot é público por design (exposto no widget);
  // fallback mantém o comportamento atual de produção caso o ENV não exista.
  chatwootBaseUrl: env.VITE_CHATWOOT_BASE_URL || 'https://chat.online.des.br',
  chatwootToken: env.VITE_CHATWOOT_TOKEN || 'KKoEhfthVd1GPBK9wz5VtXtW',
};

const isBrowser = () => typeof window !== 'undefined' && typeof document !== 'undefined';

/** Google Analytics 4 — exige consentimento 'granted' (validado pelo chamador). */
export const loadGoogleAnalytics = () => {
  const { gaId } = SCRIPT_CONFIG;
  if (!isBrowser() || !gaId || !/^G-[A-Z0-9]+$/i.test(gaId)) return;
  if (document.getElementById('ga-gtag-script')) return;

  const w = window as any;
  w.dataLayer = w.dataLayer || [];
  w.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer.push(arguments);
  };
  w.gtag('js', new Date());
  w.gtag('config', gaId, { send_page_view: true, anonymize_ip: true });

  const s = document.createElement('script');
  s.id = 'ga-gtag-script';
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`;
  document.head.appendChild(s);
};

/** Microsoft Clarity — exige consentimento 'granted' (validado pelo chamador). */
export const loadClarity = () => {
  const { clarityId } = SCRIPT_CONFIG;
  if (!isBrowser() || !clarityId || !/^[a-z0-9]+$/i.test(clarityId)) return;
  if (document.getElementById('clarity-script')) return;

  const w = window as any;
  w.clarity = w.clarity || function clarity() {
    // eslint-disable-next-line prefer-rest-params
    (w.clarity.q = w.clarity.q || []).push(arguments);
  };

  const s = document.createElement('script');
  s.id = 'clarity-script';
  s.async = true;
  s.src = `https://www.clarity.ms/tag/${encodeURIComponent(clarityId)}`;
  document.head.appendChild(s);
};

let chatwootPromise: Promise<boolean> | null = null;

/**
 * Chatwoot Live Chat — idempotente. Resolve `true` quando `window.$chatwoot`
 * estiver pronto; `false` se bloqueado (adblock/rede) ou sem configuração.
 */
export const loadChatwoot = (): Promise<boolean> => {
  if (!isBrowser()) return Promise.resolve(false);
  const w = window as any;
  if (w.$chatwoot) return Promise.resolve(true);
  if (chatwootPromise) return chatwootPromise;

  const { chatwootBaseUrl, chatwootToken } = SCRIPT_CONFIG;
  if (!chatwootBaseUrl || !chatwootToken || !/^https:\/\//.test(chatwootBaseUrl)) {
    return Promise.resolve(false);
  }

  chatwootPromise = new Promise<boolean>((resolve) => {
    let settled = false;
    const finish = (ok: boolean) => {
      if (settled) return;
      settled = true;
      window.removeEventListener('chatwoot:ready', onReady);
      if (!ok) chatwootPromise = null; // permite nova tentativa futura
      resolve(ok);
    };
    const onReady = () => finish(true);
    window.addEventListener('chatwoot:ready', onReady);
    const timeout = window.setTimeout(() => finish(!!w.$chatwoot), 8000);

    // Configuração precisa existir ANTES do SDK carregar
    w.chatwootSettings = {
      hideMessageBubble: true, // CTA duplo próprio substitui a bolha padrão
      position: 'right',
      locale: 'pt-BR',
      type: 'standard',
    };

    const s = document.createElement('script');
    s.id = 'chatwoot-script';
    s.async = true;
    s.src = `${chatwootBaseUrl}/packs/js/sdk.js`;
    s.onload = () => {
      if (w.chatwootSDK && typeof w.chatwootSDK.run === 'function') {
        w.chatwootSDK.run({ websiteToken: chatwootToken, baseUrl: chatwootBaseUrl });
      } else {
        window.clearTimeout(timeout);
        finish(false);
      }
    };
    s.onerror = () => {
      window.clearTimeout(timeout);
      s.remove();
      finish(false);
    };
    document.body.appendChild(s);
  });

  return chatwootPromise;
};

/** Abre a janela do chat, carregando o SDK sob demanda se necessário. */
export const openChatwoot = async (): Promise<boolean> => {
  const ok = await loadChatwoot();
  const cw = (window as any).$chatwoot;
  if (ok && cw && typeof cw.toggle === 'function') {
    cw.toggle('open');
    return true;
  }
  return false;
};

