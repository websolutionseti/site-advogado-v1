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
      className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-xl z-50 animate-fadeIn"
    >
      <div className="bg-[#0B192C]/95 backdrop-blur-md border border-[#C5A059]/40 rounded-xl p-5 shadow-2xl shadow-black/80 text-[#E2E8F0]">
        
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-[#C5A059]/15 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059] flex-shrink-0">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#C5A059] block">
                Privacidade & Conformidade LGPD
              </span>
              <h4 className="text-xs font-semibold text-white">
                Controle de Dados & Gestão de Cookies
              </h4>
            </div>
          </div>

          <button
            onClick={handleAcceptEssentialOnly}
            className="text-[#94A3B8] hover:text-white p-1 rounded transition-colors"
            aria-label="Dispensar aviso mantendo apenas cookies essenciais"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-3 text-[11px] leading-relaxed text-[#94A3B8]">
          Utilizamos cookies essenciais para o funcionamento seguro desta plataforma e tecnologias analíticas para aprimorar o atendimento fiduciário, em estrita observância à <strong className="text-white">Lei Geral de Proteção de Dados (Lei nº 13.709/2018)</strong> e ao Código de Ética da OAB.
        </p>

        <div className="mt-4 pt-3 border-t border-[#1E293B] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-3 text-[11px] text-[#94A3B8]">
            <button
              onClick={() => onNavigate('privacidade')}
              className="text-[#C5A059] hover:underline underline-offset-2 cursor-pointer font-medium"
            >
              Política de Privacidade
            </button>
            <span>·</span>
            <button
              onClick={() => onNavigate('termos')}
              className="text-[#C5A059] hover:underline underline-offset-2 cursor-pointer font-medium"
            >
              Termos de Uso
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAcceptEssentialOnly}
              className="py-1.5 px-3 rounded-lg bg-[#060D17] border border-[#1E293B] hover:border-[#94A3B8] text-[11px] text-[#CBD5E1] font-medium transition-colors cursor-pointer"
            >
              Apenas Essenciais
            </button>
            <button
              onClick={handleAcceptAll}
              className="py-1.5 px-3.5 rounded-lg bg-gradient-to-r from-[#C5A059] to-[#D4AF37] text-[#060D17] text-[11px] font-bold tracking-wide uppercase transition-all shadow-md shadow-[#C5A059]/20 hover:scale-[1.02] cursor-pointer"
            >
              Aceitar Todos
            </button>
          </div>
        </div>

      </div>
    </aside>
  );
};
