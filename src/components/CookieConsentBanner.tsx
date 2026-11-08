import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie, X } from 'lucide-react';
import { getStoredConsent, setStoredConsent } from '../services/visitorTracking';
import { NavigationPage } from '../types';

interface CookieConsentBannerProps {
  onNavigate: (page: NavigationPage) => void;
}

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = getStoredConsent();
    if (consent === 'pending') {
      // Pequeno delay gracioso para não saltar na tela imediatamente
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    setStoredConsent('granted');
    setIsVisible(false);
  };

  const handleAcceptEssentialOnly = () => {
    setStoredConsent('essential_only');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Aviso de Privacidade e Gestão de Cookies (LGPD/GDPR)"
      className="fixed bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 md:left-6 md:right-auto md:max-w-xl z-[60] animate-fadeIn"
    >
      <div className="bg-[#0B192C]/98 backdrop-blur-xl border border-[#C5A059]/40 rounded-2xl p-4 sm:p-5 shadow-2xl shadow-black/90 text-[#E2E8F0]">
        
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-[#C5A059]/15 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059] flex-shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#C5A059] block">
                Privacidade & Conformidade LGPD
              </span>
              <h4 className="text-xs sm:text-sm font-semibold text-white">
                Controle de Dados & Gestão de Cookies
              </h4>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAcceptEssentialOnly}
            className="text-[#94A3B8] hover:text-white min-h-[44px] min-w-[44px] p-2 flex items-center justify-center rounded-lg hover:bg-white/10 active:scale-95 transition-all cursor-pointer touch-manipulation -mr-1 -mt-1"
            aria-label="Dispensar aviso mantendo apenas cookies essenciais"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="mt-2.5 sm:mt-3 text-[11px] sm:text-xs leading-relaxed text-[#94A3B8]">
          Utilizamos cookies essenciais para o funcionamento seguro desta plataforma e tecnologias analíticas para aprimorar o atendimento fiduciário, em estrita observância à <strong className="text-white">Lei Geral de Proteção de Dados (Lei nº 13.709/2018)</strong> e ao Código de Ética da OAB.
        </p>

        <div className="mt-3.5 sm:mt-4 pt-3 border-t border-[#1E293B] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-3 text-[11px] text-[#94A3B8]">
            <button
              type="button"
              onClick={() => onNavigate('privacidade')}
              className="text-[#C5A059] hover:underline underline-offset-2 cursor-pointer font-medium min-h-[36px] flex items-center touch-manipulation"
            >
              Política de Privacidade
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => onNavigate('termos')}
              className="text-[#C5A059] hover:underline underline-offset-2 cursor-pointer font-medium min-h-[36px] flex items-center touch-manipulation"
            >
              Termos de Uso
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleAcceptEssentialOnly}
              className="flex-1 sm:flex-initial min-h-[42px] py-2 px-3.5 rounded-lg bg-[#060D17] border border-[#1E293B] hover:border-[#94A3B8] active:bg-[#1E293B] text-[11px] sm:text-xs text-[#CBD5E1] font-medium transition-colors cursor-pointer touch-manipulation text-center"
            >
              Apenas Essenciais
            </button>
            <button
              type="button"
              onClick={handleAcceptAll}
              className="flex-1 sm:flex-initial min-h-[42px] py-2 px-4 rounded-lg bg-gradient-to-r from-[#C5A059] to-[#D4AF37] text-[#060D17] text-[11px] sm:text-xs font-bold tracking-wide uppercase transition-all shadow-md shadow-[#C5A059]/25 hover:scale-[1.02] active:scale-[0.98] cursor-pointer touch-manipulation text-center"
            >
              Aceitar Todos
            </button>
          </div>
        </div>

      </div>
    </aside>
  );
};
