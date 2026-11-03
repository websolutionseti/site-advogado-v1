/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Floating CTA Widget — Cartes Advogados
 * Botão flutuante expansível:
 * - Ponto azul piscando com brilho branco uniforme e constante
 * - Ícone oficial do WhatsApp
 * - Mouseover (desktop) e Toque (mobile) abre os dois CTAs:
 *   1. "Iniciar Chat" (Chatwoot Live Chat)
 *   2. "Plantão WhatsApp" (Conversa direta com Dr. Victor Cartes)
 */

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, ShieldCheck, X, Sparkles } from 'lucide-react';

interface FloatingCtaWidgetProps {
  onOpenIntake?: () => void;
}

export const FloatingCtaWidget: React.FC<FloatingCtaWidgetProps> = ({ onOpenIntake }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const WHATSAPP_URL = "https://wa.me/5511973758834?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20com%20o%20Plant%C3%A3o%20WhatsApp%20do%20Dr.%20Victor%20Cartes.";

  // Fechar ao clicar fora (mobile e desktop)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Handlers para hover suave (desktop)
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsHovered(true);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
      setIsOpen(false);
    }, 450); // Delay suave para permitir navegação sem fechar abruptamente
  };

  // Handler para clique (toggle mobile/desktop)
  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(prev => !prev);
  };

  // Abrir Chatwoot Live Chat
  const handleOpenChatwoot = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);

    const win = window as any;
    if (win.$chatwoot && typeof win.$chatwoot.toggle === 'function') {
      win.$chatwoot.toggle('open');
    } else if (win.chatwootSDK && typeof win.chatwootSDK.run === 'function') {
      win.chatwootSDK.run({
        websiteToken: 'KKoEhfthVd1GPBK9wz5VtXtW',
        baseUrl: 'https://chat.online.des.br'
      });
      setTimeout(() => {
        if (win.$chatwoot) win.$chatwoot.toggle('open');
      }, 500);
    } else {
      // Fallback amigável se script externo for bloqueado por adblock
      if (onOpenIntake) {
        onOpenIntake();
      } else {
        window.open(WHATSAPP_URL, '_blank');
      }
    }
  };

  return (
    <aside
      ref={containerRef}
      aria-label="Canais Rápidos de Atendimento e Plantão"
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end select-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 
        =======================================================================
        MENU EXPANSÍVEL: 2 CTAs (INICIAR CHAT + PLANTÃO WHATSAPP)
        =======================================================================
      */}
      <div
        className={`mb-3 w-80 sm:w-88 rounded-2xl border border-slate-700/80 bg-[#0B192C]/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_30px_rgba(0,163,255,0.15)] transition-all duration-300 transform origin-bottom-right ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-95 translate-y-3 pointer-events-none invisible'
        }`}
        role="dialog"
        aria-hidden={!isOpen}
        aria-label="Opções de Atendimento Imediato"
      >
        {/* Cabeçalho do Card */}
        <div className="flex items-center justify-between border-b border-slate-700/60 px-4 py-3.5 bg-[#0D2538]/70 rounded-t-2xl">
          <div className="flex items-center gap-2.5">
            {/* Ponto azul piscando com brilho branco */}
            <span className="relative flex h-3 w-3">
              <span className="animate-pulse-blue-glow absolute inline-flex h-full w-full rounded-full"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00A3FF]"></span>
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-100 font-brand">
                Plantão & Atendimento
              </p>
              <p className="text-[10px] text-emerald-400 font-medium">
                Online Agora • Dr. Victor Cartes
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Fechar menu de atendimento"
            className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Lista dos 2 CTAs Solicitados */}
        <div className="p-3.5 space-y-2.5">
          {/* CTA 1: INICIAR CHAT (Chatwoot Live Chat) */}
          <button
            type="button"
            onClick={handleOpenChatwoot}
            data-track="chatwoot_cta_click"
            className="group w-full flex items-center gap-3.5 p-3 rounded-xl border border-sky-500/30 bg-gradient-to-r from-sky-950/40 to-slate-900/60 hover:from-sky-900/60 hover:to-slate-800/80 text-left transition-all duration-200 hover:border-sky-400 hover:shadow-[0_0_20px_rgba(0,163,255,0.25)] focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-[0_0_12px_rgba(0,163,255,0.4)] group-hover:scale-105 transition-transform">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Iniciar Chat
                </span>
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-semibold bg-sky-500/20 text-sky-300 border border-sky-400/30">
                  <Sparkles className="h-2.5 w-2.5 text-sky-300" />
                  Instantâneo
                </span>
              </div>
              <p className="text-[11px] text-slate-300 truncate mt-0.5">
                Atendimento digital & triagem no portal
              </p>
            </div>
          </button>

          {/* CTA 2: PLANTÃO WHATSAPP (WhatsApp Direto) */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-track="whatsapp_floating_click"
            className="group w-full flex items-center gap-3.5 p-3 rounded-xl border border-emerald-500/40 bg-gradient-to-r from-emerald-950/40 to-slate-900/60 hover:from-emerald-900/60 hover:to-slate-800/80 text-left transition-all duration-200 hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(37,211,102,0.3)] focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#25D366] text-white shadow-[0_0_15px_rgba(37,211,102,0.5)] group-hover:scale-105 transition-transform">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12.031 21.018c-1.623 0-3.21-.437-4.605-1.265l-.33-.196-3.424.897.915-3.338-.214-.34A8.932 8.932 0 013.09 12.03c0-4.945 4.025-8.97 8.973-8.97 2.396 0 4.646.934 6.339 2.628a8.935 8.935 0 012.628 6.342c-.001 4.943-4.027 8.968-8.975 8.968zm5.556-6.666c-.305-.152-1.802-.888-2.081-.99-.279-.101-.482-.152-.685.152-.204.305-.788.99-.966 1.194-.178.203-.356.228-.66.076-.305-.152-1.288-.475-2.453-1.513-.907-.808-1.52-1.807-1.698-2.112-.178-.305-.019-.47.133-.622.137-.137.305-.356.457-.533.152-.178.203-.305.305-.508.102-.203.051-.381-.025-.533-.076-.152-.686-1.65-.94-2.26-.247-.594-.498-.514-.685-.524-.178-.009-.381-.01-.584-.01-.203 0-.533.076-.812.381-.28.305-1.066 1.041-1.066 2.539 0 1.498 1.091 2.945 1.244 3.149.152.203 2.148 3.28 5.204 4.598.727.314 1.295.502 1.737.643.73.232 1.394.199 1.919.121.585-.088 1.802-.736 2.056-1.447.254-.711.254-1.32.178-1.447-.076-.127-.279-.203-.584-.355z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Plantão WhatsApp
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  Direto
                </span>
              </div>
              <p className="text-[11px] text-slate-300 truncate mt-0.5">
                +55 (11) 9 7375-8834 • Dr. Victor Cartes
              </p>
            </div>
          </a>
        </div>

        {/* Rodapé de Segurança e Sigilo */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#060D17]/80 border-t border-slate-800 rounded-b-2xl text-[10px] text-slate-400">
          <span className="flex items-center gap-1">
            <ShieldCheck className="h-3 w-3 text-[#C5A059]" />
            Sigilo OAB/SP 421.506
          </span>
          <span className="text-slate-500">LGPD & Segurança</span>
        </div>
      </div>

      {/* 
        =======================================================================
        BOTÃO PRINCIPAL DO CTA (ESTADO FECHADO & TRIGGER EXPANSÍVEL)
        - Ponto Azul Piscando com Brilho Branco Constante
        - Ícone do WhatsApp
        - Mouseover: expande texto "PLANTÃO WHATSAPP" e abre os 2 CTAs
        - Mobile: clique abre/fecha os dois CTAs
        =======================================================================
      */}
      <button
        type="button"
        onClick={handleButtonClick}
        aria-expanded={isOpen}
        aria-label="Abrir canais de atendimento imediato: Chat e Plantão WhatsApp"
        className="group relative flex items-center gap-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-3.5 py-3 sm:px-4 sm:py-3.5 rounded-full shadow-[0_10px_25px_-5px_rgba(37,211,102,0.45),0_0_20px_2px_rgba(0,163,255,0.3)] hover:shadow-[0_15px_35px_-5px_rgba(37,211,102,0.6),0_0_25px_4px_rgba(0,163,255,0.5)] hover:scale-[1.04] active:scale-[0.97] transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/50"
      >
        {/* Ponto Azul Piscando com Brilho Branco Constante (velocidade uniforme e constante) */}
        <span className="relative flex h-3.5 w-3.5 shrink-0" title="Plantão Disponível">
          <span className="animate-pulse-blue-glow absolute inline-flex h-full w-full rounded-full"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#00A3FF]"></span>
        </span>

        {/* Ícone Oficial WhatsApp Mantido */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 flex-shrink-0 fill-current"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12.031 21.018c-1.623 0-3.21-.437-4.605-1.265l-.33-.196-3.424.897.915-3.338-.214-.34A8.932 8.932 0 013.09 12.03c0-4.945 4.025-8.97 8.973-8.97 2.396 0 4.646.934 6.339 2.628a8.935 8.935 0 012.628 6.342c-.001 4.943-4.027 8.968-8.975 8.968zm5.556-6.666c-.305-.152-1.802-.888-2.081-.99-.279-.101-.482-.152-.685.152-.204.305-.788.99-.966 1.194-.178.203-.356.228-.66.076-.305-.152-1.288-.475-2.453-1.513-.907-.808-1.52-1.807-1.698-2.112-.178-.305-.019-.47.133-.622.137-.137.305-.356.457-.533.152-.178.203-.305.305-.508.102-.203.051-.381-.025-.533-.076-.152-.686-1.65-.94-2.26-.247-.594-.498-.514-.685-.524-.178-.009-.381-.01-.584-.01-.203 0-.533.076-.812.381-.28.305-1.066 1.041-1.066 2.539 0 1.498 1.091 2.945 1.244 3.149.152.203 2.148 3.28 5.204 4.598.727.314 1.295.502 1.737.643.73.232 1.394.199 1.919.121.585-.088 1.802-.736 2.056-1.447.254-.711.254-1.32.178-1.447-.076-.127-.279-.203-.584-.355z" />
        </svg>

        {/* 
          Palavra "PLANTÃO WHATSAPP"
          - No desktop: visível suavemente ou expande ao passar o mouse
          - No mobile: exibição elegante e equilibrada
        */}
        <span className="font-sans text-xs uppercase tracking-wider font-extrabold whitespace-nowrap inline-block transition-all duration-300">
          PLANTÃO WHATSAPP
        </span>
      </button>
    </aside>
  );
};
