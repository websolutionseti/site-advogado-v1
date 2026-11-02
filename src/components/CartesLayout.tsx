import React, { ReactNode, useEffect } from 'react';
import { Footer } from './Footer';

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

  // Efeito para captura universal de eventos data-track (GTM/GA4/Clarity)
  useEffect(() => {
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
        BOTÃO FLUTUANTE DO WHATSAPP (FLOATING ACTION BUTTON - FAB)
        - Fixo no canto inferior direito
        - data-track="whatsapp_floating_click" para mensuração no GTM/GA4
        - Link oficial: https://wa.me/5511973758834
        - Mobile-First: tamanhos adequados para toque (mínimo 48px WCAG)
        =======================================================================
      */}
      <aside aria-label="Canal Direto de Atendimento WhatsApp">
        <a
          href="https://wa.me/5511973758834?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20uma%20orienta%C3%A7%C3%A3o%20jur%C3%ADdica%20com%20o%20escrit%C3%B3rio%20Cartes%20Advogados."
          target="_blank"
          rel="noopener noreferrer"
          data-track="whatsapp_floating_click"
          aria-label="Falar com Cartes Advogados pelo WhatsApp (Canal Prioritário)"
          className="fixed bottom-6 right-6 z-50 group flex items-center gap-3 bg-[#25D366] text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-[0_10px_25px_-5px_rgba(37,211,102,0.4)] hover:bg-[#1EBE5D] hover:shadow-[0_15px_30px_-5px_rgba(37,211,102,0.55)] hover:scale-[1.04] active:scale-[0.98] transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/50"
        >
          {/* Status Pulse Indicator (Disponível agora) */}
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>

          {/* Ícone Oficial WhatsApp */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 sm:h-6 sm:w-6 flex-shrink-0 fill-current"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12.031 21.018c-1.623 0-3.21-.437-4.605-1.265l-.33-.196-3.424.897.915-3.338-.214-.34A8.932 8.932 0 013.09 12.03c0-4.945 4.025-8.97 8.973-8.97 2.396 0 4.646.934 6.339 2.628a8.935 8.935 0 012.628 6.342c-.001 4.943-4.027 8.968-8.975 8.968zm5.556-6.666c-.305-.152-1.802-.888-2.081-.99-.279-.101-.482-.152-.685.152-.204.305-.788.99-.966 1.194-.178.203-.356.228-.66.076-.305-.152-1.288-.475-2.453-1.513-.907-.808-1.52-1.807-1.698-2.112-.178-.305-.019-.47.133-.622.137-.137.305-.356.457-.533.152-.178.203-.305.305-.508.102-.203.051-.381-.025-.533-.076-.152-.686-1.65-.94-2.26-.247-.594-.498-.514-.685-.524-.178-.009-.381-.01-.584-.01-.203 0-.533.076-.812.381-.28.305-1.066 1.041-1.066 2.539 0 1.498 1.091 2.945 1.244 3.149.152.203 2.148 3.28 5.204 4.598.727.314 1.295.502 1.737.643.73.232 1.394.199 1.919.121.585-.088 1.802-.736 2.056-1.447.254-.711.254-1.32.178-1.447-.076-.127-.279-.203-.584-.355z" />
          </svg>

          {/* Texto visível apenas em telas maiores ou com hover elegante */}
          <span className="hidden sm:inline-block font-sans text-xs uppercase tracking-wider font-bold">
            Plantão WhatsApp
          </span>
        </a>
      </aside>
    </div>
  );
};
