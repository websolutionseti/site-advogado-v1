/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Accessibility (A11y) & Contrast Widget — Cartes Advogados
 * Inspirado na central de acessibilidade do ecossistema BETI (Web Solutions ETI)
 */

import React, { useState, useEffect, useRef } from 'react';
import { Eye, Type, Sparkles, RotateCcw, X, SunMedium, Moon, Sun } from 'lucide-react';
import { 
  getA11yPreferences, 
  applyA11yPreferences, 
  A11yPreferences,
  defaultPreferences,
  setA11yHoverState
} from '../services/accessibility';

interface A11yWidgetProps {
  onStateChange?: (isOpen: boolean) => void;
}

export const A11yWidget: React.FC<A11yWidgetProps> = ({ onStateChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [prefs, setPrefs] = useState<A11yPreferences>(getA11yPreferences);
  const menuRef = useRef<HTMLDivElement>(null);

  // Carregar e sincronizar preferências
  useEffect(() => {
    const initial = getA11yPreferences();
    setPrefs(initial);
    applyA11yPreferences(initial);

    const onA11yChange = (e: any) => {
      if (e.detail) setPrefs(e.detail);
    };

    const onOpenModal = () => {
      setIsOpen(true);
    };

    window.addEventListener('cartes:a11y-changed', onA11yChange);
    window.addEventListener('cartes:open-a11y-modal', onOpenModal);

    return () => {
      window.removeEventListener('cartes:a11y-changed', onA11yChange);
      window.removeEventListener('cartes:open-a11y-modal', onOpenModal);
    };
  }, []);

  // Notificar estado de foco/hover para transicionar TopBar ("Atendimento Inclusivo")
  useEffect(() => {
    const active = isHovered || isOpen;
    setA11yHoverState(active);
    if (onStateChange) onStateChange(isOpen);
  }, [isHovered, isOpen, onStateChange]);

  // Fechar ao clicar fora ou ESC
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKey);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, [isOpen]);

  const handleSetContrastMode = (mode: 'default' | 'dark' | 'light') => {
    const next: A11yPreferences = {
      ...prefs,
      contrastMode: mode,
      highContrast: mode === 'dark' || mode === 'light',
    };
    setPrefs(next);
    applyA11yPreferences(next);
  };

  const handleSetFontScale = (scale: 'normal' | 'lg' | 'xl') => {
    const next = { ...prefs, fontScale: scale };
    setPrefs(next);
    applyA11yPreferences(next);
  };

  const handleToggleMotion = () => {
    const next = { ...prefs, reducedMotion: !prefs.reducedMotion };
    setPrefs(next);
    applyA11yPreferences(next);
  };

  const handleReset = () => {
    const next = { ...defaultPreferences };
    setPrefs(next);
    applyA11yPreferences(next);
  };

  const isHighContrastActive = prefs.contrastMode === 'dark' || prefs.contrastMode === 'light' || prefs.highContrast;

  return (
    <div 
      className="relative inline-block text-left" 
      ref={menuRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Botão de Disparo no Menu com Tooltip Acessível */}
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label="Acessibilidade (a11y) e preferências de exibição"
        aria-describedby="a11y-tooltip"
        className={`relative flex items-center justify-center h-9 w-9 rounded-full border transition-all duration-300 cursor-pointer ${
          isHighContrastActive
            ? 'bg-[#FFD700] text-black border-[#FFD700] shadow-[0_0_14px_rgba(255,215,0,0.7)] scale-105'
            : 'bg-white/5 border-[#C5A059]/40 text-[#DFCAAB] hover:text-white hover:bg-white/10 hover:border-[#C5A059] focus:outline-none focus:ring-2 focus:ring-[#C5A059]'
        }`}
      >
        <Eye className="h-4 w-4" />
      </button>

      {/* Tooltip Nativo Acessível (Visível em Hover ou Focus via Teclado) */}
      {isHovered && !isOpen && (
        <div
          id="a11y-tooltip"
          role="tooltip"
          className="absolute -bottom-8 right-0 pointer-events-none z-50 whitespace-nowrap rounded bg-slate-900 border border-slate-700 px-2.5 py-1 text-[10px] font-medium tracking-wider text-slate-200 shadow-xl shadow-black/80 animate-fadeIn"
        >
          Acessibilidade (a11y)
        </div>
      )}

      {/* Painel Dropdown de Acessibilidade (Inspirado em BETI / WCAG) */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Painel de Acessibilidade e Ajustes de Leitura"
          className="absolute right-0 mt-2.5 w-80 sm:w-88 rounded-2xl border border-[#C5A059]/40 bg-[#0B192C]/98 backdrop-blur-2xl p-4 shadow-2xl shadow-black/90 z-50 text-[#E2E8F0] animate-fadeIn"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-700/60">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#C5A059]/20 text-[#C5A059]">
                <Eye className="h-4 w-4" />
              </span>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                  Acessibilidade (A11y)
                </h4>
                <p className="text-[10px] text-[#94A3B8]">
                  Padrão BETI & WCAG 2.2 AAA
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Fechar painel de acessibilidade"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Opções de Acessibilidade */}
          <div className="py-3 space-y-3.5 text-xs">
            {/* 1. Modos de Alto Contraste (Padrão, Preto/Ouro ou Claro Não-Preto) */}
            <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white text-[11px] flex items-center gap-1.5">
                  <SunMedium className="h-3.5 w-3.5 text-[#FFD700]" />
                  Contraste & Tema
                </span>
                <span className="text-[10px] text-[#94A3B8] font-mono">
                  {prefs.contrastMode === 'light' ? 'Claro' : prefs.contrastMode === 'dark' || prefs.highContrast ? 'Preto/Ouro' : 'Padrão'}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-1.5">
                <button
                  type="button"
                  onClick={() => handleSetContrastMode('default')}
                  className={`py-1.5 px-1 rounded-md text-[10px] font-semibold transition-all cursor-pointer truncate ${
                    (!prefs.highContrast && (prefs.contrastMode === 'default' || !prefs.contrastMode))
                      ? 'bg-[#C5A059] text-black font-bold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                  title="Tema Padrão Escuro Quiet Luxury"
                >
                  Padrão
                </button>

                <button
                  type="button"
                  onClick={() => handleSetContrastMode('dark')}
                  className={`py-1.5 px-1 rounded-md text-[10px] font-semibold transition-all cursor-pointer truncate ${
                    (prefs.contrastMode === 'dark' || (prefs.highContrast && prefs.contrastMode !== 'light'))
                      ? 'bg-[#FFD700] text-black font-bold shadow-[0_0_8px_rgba(255,215,0,0.5)]'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                  title="Alto Contraste Preto e Dourado Ouro"
                >
                  Preto / Ouro
                </button>

                <button
                  type="button"
                  onClick={() => handleSetContrastMode('light')}
                  className={`py-1.5 px-1 rounded-md text-[10px] font-semibold transition-all cursor-pointer truncate ${
                    prefs.contrastMode === 'light'
                      ? 'bg-sky-400 text-slate-950 font-bold shadow-[0_0_8px_rgba(56,189,248,0.5)]'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                  title="Alto Contraste Claro (Não-Preto)"
                >
                  Claro (A11y)
                </button>
              </div>
            </div>

            {/* 2. Tamanho da Fonte */}
            <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-white text-[11px] flex items-center gap-1.5">
                  <Type className="h-3.5 w-3.5 text-[#C5A059]" />
                  Tamanho do Texto
                </span>
                <span className="text-[10px] text-[#C5A059] font-mono uppercase">
                  {prefs.fontScale === 'normal' && '100%'}
                  {prefs.fontScale === 'lg' && '112% (A+)'}
                  {prefs.fontScale === 'xl' && '125% (A++)'}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-1.5">
                <button
                  type="button"
                  onClick={() => handleSetFontScale('normal')}
                  className={`py-1.5 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                    prefs.fontScale === 'normal'
                      ? 'bg-[#C5A059] text-black font-bold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Padrão
                </button>
                <button
                  type="button"
                  onClick={() => handleSetFontScale('lg')}
                  className={`py-1.5 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                    prefs.fontScale === 'lg'
                      ? 'bg-[#C5A059] text-black font-bold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  A +
                </button>
                <button
                  type="button"
                  onClick={() => handleSetFontScale('xl')}
                  className={`py-1.5 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                    prefs.fontScale === 'xl'
                      ? 'bg-[#C5A059] text-black font-bold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  A ++
                </button>
              </div>
            </div>

            {/* 3. Reduzir Movimento */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#C5A059]" />
                <div>
                  <span className="font-semibold text-white block text-[11px]">
                    Reduzir Movimento
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Pausa animações e pulsos
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleToggleMotion}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  prefs.reducedMotion
                    ? 'bg-[#C5A059] text-black'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {prefs.reducedMotion ? 'Ativo' : 'Ativar'}
              </button>
            </div>
          </div>

          {/* Footer Reset */}
          <div className="pt-2.5 border-t border-slate-700/60 flex items-center justify-between">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Restaurar Padrões</span>
            </button>

            <span className="text-[9px] text-[#C5A059] font-mono tracking-wider">
              BETI A11Y ENGINE
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
