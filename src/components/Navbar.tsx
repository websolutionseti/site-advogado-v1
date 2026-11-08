import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Menu, 
  X, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Search,
  MessageSquare,
  Accessibility,
  Eye
} from 'lucide-react';
import { NavigationPage } from '../types';
import { A11yWidget } from './A11yWidget';
import { openA11yModal } from '../services/accessibility';

interface NavbarProps {
  currentPage: NavigationPage;
  onNavigate: (page: NavigationPage) => void;
  onOpenPRD?: () => void;
  onOpenExtraction?: () => void;
  onOpenIntake?: () => void;
  onOpenStyleGuide?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentPage,
  onNavigate,
  onOpenPRD, 
  onOpenExtraction, 
  onOpenIntake,
  onOpenStyleGuide
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isA11yActive, setIsA11yActive] = useState(false);
  const [mobileA11yVisible, setMobileA11yVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('cartes_mobile_a11y_visible') === 'true';
  });

  // Monitorar hover/foco no widget de Acessibilidade para exibir ícone na TopBar
  useEffect(() => {
    const handleA11yHover = (e: any) => {
      if (e.detail) {
        setIsA11yActive(Boolean(e.detail.isHovered));
      }
    };
    window.addEventListener('cartes:a11y-hover', handleA11yHover);
    return () => window.removeEventListener('cartes:a11y-hover', handleA11yHover);
  }, []);

  const handleNavClick = (page: NavigationPage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  const handleOpenMobileA11y = () => {
    setMobileA11yVisible(true);
    try {
      localStorage.setItem('cartes_mobile_a11y_visible', 'true');
    } catch {}
    setMobileMenuOpen(false);
    openA11yModal();
  };

  return (
    <div className="w-full">
      {/* ================================================================== */}
      {/* 1. TOPBAR INSTITUCIONAL (Executive Dark TopBar) */}
      {/* ================================================================== */}
      <div className="hidden lg:block bg-[#0C0E12] border-b border-[#C5A880]/20 text-xs py-2 px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center tracking-wider text-neutral-400">
          
          <div className="flex items-center space-x-6 text-[11px]">
            <span className="flex items-center space-x-2">
              <MapPin className="h-3 w-3 text-[#C5A880]" />
              <span>Av. Paulista, 1471 - CJ 511 | Bela Vista, São Paulo - SP</span>
            </span>
            <span className="text-neutral-700">|</span>
            <span className="flex items-center space-x-2">
              <Phone className="h-3 w-3 text-[#C5A880]" />
              <a 
                href="tel:+5511973758834" 
                data-track="topbar_phone_click"
                className="hover:text-[#C5A880] transition-colors"
              >
                (11) 9 7375-8834
              </a>
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <span 
              className={`text-[11px] font-medium tracking-wide transition-all duration-300 flex items-center gap-1.5 ${
                isA11yActive ? 'text-[#FFD700] font-bold' : 'text-[#DFCAAB]'
              }`}
            >
              {isA11yActive && (
                <Accessibility className="h-3.5 w-3.5 text-[#FFD700] animate-pulse" />
              )}
              <span>Atendimento Inclusivo</span>
            </span>
            <span className="text-neutral-700">|</span>
            
            {/* Redes Sociais */}
            <div className="flex items-center space-x-3 text-xs">
              <a 
                href="https://linkedin.com/company/cartes-advogados" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn Cartes Advogados"
                className="hover:text-[#C5A880] transition-colors"
              >
                LinkedIn
              </a>
              <span className="text-neutral-700">·</span>
              <a 
                href="https://instagram.com/cartes_advogados" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram Cartes Advogados"
                className="hover:text-[#C5A880] transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* ================================================================== */}
      {/* 2. MAIN HEADER / PRIMARY NAVBAR (Glass Luxury Dark) */}
      {/* ================================================================== */}
      <header className="sticky top-0 z-40 w-full border-b border-[#C5A880]/15 bg-[#14171C]/90 backdrop-blur-md text-[#F9F9F8]" role="banner">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Cartes Advogados */}
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="flex flex-col items-start group focus-visible:outline-2 focus-visible:outline-[#C5A880] cursor-pointer"
            aria-label="Cartes Advogados Página Inicial"
          >
            <span className="font-playfair text-2xl tracking-[0.25em] text-white font-medium group-hover:text-[#C5A880] transition-colors">
              CARTES
            </span>
            <span className="text-[9px] tracking-[0.45em] text-[#C5A880] uppercase -mt-1 font-semibold">
              ADVOGADOS
            </span>
          </button>

          {/* Menu Centralizado (Desktop / 6 Páginas) */}
          <nav aria-label="Menu Principal" className="hidden lg:flex items-center space-x-7 text-[12px] uppercase tracking-[0.18em] font-medium">
            <button
              type="button"
              onClick={() => handleNavClick('home')}
              className={`relative py-2 transition-colors cursor-pointer ${
                currentPage === 'home' ? 'text-white font-semibold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <span>HOME</span>
              {currentPage === 'home' && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C5A880]" />
              )}
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('quem-somos')}
              className={`relative py-2 transition-colors cursor-pointer ${
                currentPage === 'quem-somos' ? 'text-white font-semibold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <span>QUEM SOMOS</span>
              {currentPage === 'quem-somos' && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C5A880]" />
              )}
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('atuacao')}
              className={`relative py-2 transition-colors cursor-pointer ${
                currentPage === 'atuacao' ? 'text-white font-semibold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <span>ATUAÇÃO</span>
              {currentPage === 'atuacao' && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C5A880]" />
              )}
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('equipe')}
              className={`relative py-2 transition-colors cursor-pointer ${
                currentPage === 'equipe' ? 'text-white font-semibold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <span>EQUIPE</span>
              {currentPage === 'equipe' && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C5A880]" />
              )}
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('blog')}
              className={`relative py-2 transition-colors cursor-pointer ${
                currentPage === 'blog' ? 'text-white font-semibold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <span>BLOG</span>
              {currentPage === 'blog' && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C5A880]" />
              )}
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('contato')}
              className={`relative py-2 transition-colors cursor-pointer ${
                currentPage === 'contato' ? 'text-white font-semibold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <span>CONTATO</span>
              {currentPage === 'contato' && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C5A880]" />
              )}
            </button>
          </nav>

          {/* Action CTA, A11y & Mobile Toggle */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* 1. Botão Agendar Consulta */}
            <button
              type="button"
              onClick={() => handleNavClick('contato')}
              className="hidden sm:inline-flex items-center justify-center border border-[#C5A880] text-[#C5A880] px-5 py-2 text-xs uppercase tracking-widest font-semibold hover:bg-[#C5A880] hover:text-[#14171C] transition-all duration-300 cursor-pointer"
            >
              Agendar Consulta
            </button>

            {/* 2. Desktop A11y Widget: Posicionado DEPOIS de Agendar Consulta */}
            <div className="hidden lg:block">
              <A11yWidget />
            </div>

            {/* 3. Mobile Eye Icon: Só aparece ao lado do Hamburger se o usuário clicou em Acessibilidade no menu mobile */}
            {mobileA11yVisible && (
              <div className="lg:hidden animate-fadeIn">
                <A11yWidget />
              </div>
            )}

            {/* 4. Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-white hover:text-[#C5A880] focus:outline-none p-1.5 cursor-pointer"
              aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0C0E12] border-b border-[#C5A880]/30 px-6 py-5 text-xs uppercase tracking-widest space-y-4">
            
            {/* Topo do Menu Mobile: Identificação Institucional */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="font-playfair text-sm tracking-[0.2em] text-[#C5A880] uppercase font-bold">
                CARTES ADVOGADOS
              </span>
            </div>

            <button
              type="button"
              onClick={() => handleNavClick('home')}
              className={`block w-full text-left py-1 ${currentPage === 'home' ? 'text-[#C5A880] font-bold' : 'text-neutral-300'}`}
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('quem-somos')}
              className={`block w-full text-left py-1 ${currentPage === 'quem-somos' ? 'text-[#C5A880] font-bold' : 'text-neutral-300'}`}
            >
              Quem Somos
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('atuacao')}
              className={`block w-full text-left py-1 ${currentPage === 'atuacao' ? 'text-[#C5A880] font-bold' : 'text-neutral-300'}`}
            >
              Atuação
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('equipe')}
              className={`block w-full text-left py-1 ${currentPage === 'equipe' ? 'text-[#C5A880] font-bold' : 'text-neutral-300'}`}
            >
              Equipe
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('blog')}
              className={`block w-full text-left py-1 ${currentPage === 'blog' ? 'text-[#C5A880] font-bold' : 'text-neutral-300'}`}
            >
              Blog
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('contato')}
              className={`block w-full text-left py-1 ${currentPage === 'contato' ? 'text-[#C5A880] font-bold' : 'text-neutral-300'}`}
            >
              Contato
            </button>

            {/* Novo Item: Acessibilidade (ao clicar, torna o olho visível no header mobile e abre as opções) */}
            <button
              type="button"
              onClick={handleOpenMobileA11y}
              className="flex items-center justify-between w-full py-2.5 text-left text-neutral-200 hover:text-[#C5A880] transition-colors border-t border-white/10 pt-3.5 cursor-pointer"
            >
              <span className="flex items-center gap-2.5">
                <Accessibility className="h-4 w-4 text-[#FFD700]" />
                <span className="font-semibold text-[#DFCAAB] tracking-wider text-[11px]">
                  Acessibilidade
                </span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#FFD700]/15 text-[#FFD700] font-mono font-bold border border-[#FFD700]/30">
                A11Y
              </span>
            </button>

            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
              <a
                href="https://wa.me/5511973758834"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-2.5 bg-[#25D366] text-white font-bold tracking-wider uppercase text-[11px] rounded"
              >
                Falar no WhatsApp
              </a>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};
