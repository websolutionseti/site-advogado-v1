import React, { ReactNode, useEffect } from 'react';
import { Footer } from './Footer';
import { FloatingCtaWidget } from './FloatingCtaWidget';
import { initChatwootCacheSync } from '../services/leadCache';

// ============================================================================
// INJEÇÃO DE SCRIPTS E RASTREAMENTO (PONTOS DE INJEÇÃO DOCUMENTADOS)
// ============================================================================
/*
  =============================================================================
  1. GOOGLE ANALYTICS (GA4 / GTM / PIX DE CONVERSÃO)
  Ponto de Injeção: No cabeçalho global (<head>) ou inicialização em SPA.
  -----------------------------------------------------------------------------
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX', { send_page_view: true });
  </script>
  =============================================================================

  =============================================================================
  2. MICROSOFT CLARITY (GRAVAÇÃO DE SESSÕES & MAPAS DE CALOR)
  Ponto de Injeção: Imediatamente antes do fechamento do </head>.
  -----------------------------------------------------------------------------
  <script type="text/javascript">
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "CLARITY_PROJECT_ID");
  </script>
  =============================================================================

  =============================================================================
  3. CHATWOOT LIVE CHAT WIDGET
  Ponto de Injeção: No final do <body> ou inicialização pós-render.
  -----------------------------------------------------------------------------
  <script>
    (function(d,t) {
      var BASE_URL="https://chat.meuservidor.com";
      var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
      g.src=BASE_URL+"/packs/js/sdk.js";
      g.defer = true;
      g.async = true;
      s.parentNode.insertBefore(g,s);
      g.onload=function(){
        window.chatwootSDK.run({
          websiteToken: 'SEU_CHATWOOT_TOKEN',
          baseUrl: BASE_URL
        });
      };
    })(document,"script");
  </script>
  =============================================================================
*/

// Declarações globais para TypeScript seguro
declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
    clarity?: (...args: any[]) => void;
    chatwootSDK?: {
      run: (config: { websiteToken: string; baseUrl: string }) => void;
    };
  }
}

// Configurações de ambiente opcionais (fallback seguro)
const GA_MEASUREMENT_ID = (import.meta as any).env?.VITE_GA_ID || '';
const CLARITY_PROJECT_ID = (import.meta as any).env?.VITE_CLARITY_ID || '';
const CHATWOOT_BASE_URL = (import.meta as any).env?.VITE_CHATWOOT_BASE_URL || '';
const CHATWOOT_WEBSITE_TOKEN = (import.meta as any).env?.VITE_CHATWOOT_TOKEN || '';

import { NavigationPage } from '../types';

export interface CartesLayoutProps {
  children: ReactNode;
  onOpenPRD?: () => void;
  onOpenExtraction?: () => void;
  onOpenIntake?: () => void;
  onNavigate?: (page: NavigationPage) => void;
  hideFooter?: boolean;
}

export const CartesLayout: React.FC<CartesLayoutProps> = ({
  children,
  onOpenPRD = () => {},
  onOpenExtraction = () => {},
  onOpenIntake = () => {},
  onNavigate,
  hideFooter = false
}) => {

  // Efeito para captura universal de eventos data-track (GTM/GA4/Clarity) e sync do Chatwoot
  useEffect(() => {
    initChatwootCacheSync();

    // 1. Injeção dinâmica opcional de GA4 se configurado em ambiente
    if (GA_MEASUREMENT_ID && !document.getElementById('ga-gtag-script')) {
      const gaScript = document.createElement('script');
      gaScript.id = 'ga-gtag-script';
      gaScript.async = true;
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(gaScript);

      const gaInit = document.createElement('script');
      gaInit.id = 'ga-init-script';
      gaInit.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: true });
      `;
      document.head.appendChild(gaInit);
    }

    // 2. Injeção dinâmica opcional de Clarity se configurado
    if (CLARITY_PROJECT_ID && !document.getElementById('clarity-script')) {
      const clarityScript = document.createElement('script');
      clarityScript.id = 'clarity-script';
      clarityScript.type = 'text/javascript';
      clarityScript.innerHTML = `
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
      `;
      document.head.appendChild(clarityScript);
    }

    // 3. Injeção dinâmica de Chatwoot se configurado
    if (CHATWOOT_BASE_URL && CHATWOOT_WEBSITE_TOKEN && !document.getElementById('chatwoot-script')) {
      const chatwootScript = document.createElement('script');
      chatwootScript.id = 'chatwoot-script';
      chatwootScript.async = true;
      chatwootScript.defer = true;
      chatwootScript.src = `${CHATWOOT_BASE_URL}/packs/js/sdk.js`;
      chatwootScript.onload = () => {
        if (window.chatwootSDK) {
          window.chatwootSDK.run({
            websiteToken: CHATWOOT_WEBSITE_TOKEN,
            baseUrl: CHATWOOT_BASE_URL,
          });
        }
      };
      document.body.appendChild(chatwootScript);
    }

    // 4. Captura universal e desacoplada de cliques com [data-track]
    const handleGlobalClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement)?.closest('[data-track]');
      if (!target) return;
      const trackEventName = target.getAttribute('data-track');
      if (!trackEventName) return;

      // Disparo para dataLayer e Google Analytics
      if (typeof window.gtag === 'function') {
        window.gtag('event', trackEventName, {
          event_category: 'Engajamento UI',
          element_text: target.textContent?.trim().slice(0, 50) || '',
          timestamp: new Date().toISOString()
        });
      } else if (Array.isArray(window.dataLayer)) {
        window.dataLayer.push({
          event: trackEventName,
          timestamp: new Date().toISOString()
        });
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col bg-[#0b111e] text-[#F9F9F8] font-sans antialiased selection:bg-[#c5a880]/30 selection:text-white">
      {/* 
        =======================================================================
        INJEÇÃO DE METADADOS / HEAD MOCKADO (Compatível com React SPA / SSR)
        =======================================================================
      */}
      {/* 
        PONTOS DE INJEÇÃO PARA SERVIÇOS DE RASTREAMENTO EXTERNO:
        - GA4: window.gtag('config', 'G-XXXXXXXXXX')
        - Clarity: window.clarity('identify', ...)
        - Chatwoot: window.chatwootSDK.run(...)
      */}

      {/* Conteúdo Dinâmico da Página */}
      <main className="flex-grow flex flex-col">
        {children}
      </main>

      {/* Footer Institucional Responsivo Mobile-First */}
      {!hideFooter && (
        <Footer
          onOpenPRD={onOpenPRD}
          onOpenExtraction={onOpenExtraction}
          onOpenIntake={onOpenIntake}
          onNavigate={onNavigate}
        />
      )}

      {/* 
        =======================================================================
        BOTÃO FLUTUANTE EXPANSÍVEL: CHATWOOT LIVE CHAT + PLANTÃO WHATSAPP
        - Ponto azul pulsando com brilho branco uniforme e constante
        - Hover no desktop e Toque no mobile abre os dois CTAs
        - Integração com chat online e WhatsApp direto
        =======================================================================
      */}
      <FloatingCtaWidget onOpenIntake={onOpenIntake} />
    </div>
  );
};
