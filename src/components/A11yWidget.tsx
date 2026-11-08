/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Accessibility (A11y) & Contrast Widget — Cartes Advogados
 * Inspirado na central de acessibilidade do ecossistema BETI (Web Solutions ETI)
 */

import React, { useState, useEffect, useRef } from 'react';
import { Eye, Type, Sparkles, RotateCcw, X, SunMedium, Moon } from 'lucide-react';
import { 
  getA11yPreferences, 
  applyA11yPreferences, 
  A11yPreferences,
  defaultPreferences 
} from '../services/accessibility';

export const A11yWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
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

    window.addEventListener('cartes:a11y-changed', onA11yChange);
    return () => window.removeEventListener('cartes:a11y-changed', onA11yChange);
  }, []);

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

  const handleToggleContrast = () => {
    const next = { ...prefs, highContrast: !prefs.highContrast };
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
    const next: A11yPreferences = {
      highContrast: false,
      fontScale: 'normal',
      reducedMotion: false,
    };
    setPrefs(next);
    applyA11yPreferences(next);
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      {/* Botão de Disparo no Menu */}
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        aria-expanded={isOpen}
        aria-label="Ferramentas de Acessibilidade e Alto Contraste (A11y)"
        title="Acessibilidade & Contraste"
        className={`flex items-center justify-center h-9 w-9 rounded-full border transition-all duration-200 cursor-pointer ${
          prefs.highContrast
            ? 'bg-[#FFD700] text-black border-[#FFD700] shadow-[0_0_12px_rgba(255,215,0,0.6)]'
            : 'bg-white/5 border-[#C5A059]/40 text-[#DFCAAB] hover:text-white hover:bg-white/10 hover:border-[#C5A059]'
        }`}
      >
        <Eye className="h-4 w-4" />
      </button>

      {/* Painel Dropdown de Acessibilidade (Inspirado em BETI / WCAG) */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Opções de Acessibilidade"
          className="absolute right-0 mt-2.5 w-76 sm:w-80 rounded-2xl border border-[#C5A059]/40 bg-[#0B192C]/98 backdrop-blur-2xl p-4 shadow-2xl shadow-black/90 z-50 text-[#E2E8F0] animate-fadeIn"
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
              className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors"
              aria-label="Fechar painel de acessibilidade"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Opções */}
          <div className="py-3 space-y-3 text-xs">
            {/* 1. Alto Contraste */}
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center gap-2">
                {prefs.highContrast ? (
                  <SunMedium className="h-4 w-4 text-[#FFD700]" />
                ) : (
                  <Moon className="h-4 w-4 text-slate-400" />
                )}
                <div>
                  <span className="font-semibold text-white block text-[11px]">
                    Alto Contraste
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Preto absoluto e dourado ouro
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleToggleContrast}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  prefs.highContrast
                    ? 'bg-[#FFD700] text-black shadow-[0_0_10px_rgba(255,215,0,0.5)]'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {prefs.highContrast ? 'Ativo' : 'Ativar'}
              </button>
            </div>

            {/* 2. Tamanho da Fonte */}
            <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800">
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
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-[#C5A059]" />
                <div>
                  <span className="font-semibold text-white block text-[11px]">
                    Reduzir Movimento
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Pausa animações intensas
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
