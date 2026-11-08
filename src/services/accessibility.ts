/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Accessibility (A11y) & Contrast Service — Cartes Advogados
 * Inspirado nas diretrizes WCAG 2.2 AAA e no padrão BETI (Web Solutions ETI)
 */

export interface A11yPreferences {
  highContrast: boolean;
  contrastMode?: 'default' | 'dark' | 'light';
  fontScale: 'normal' | 'lg' | 'xl';
  reducedMotion: boolean;
}

const STORAGE_KEY = 'cartes_a11y_prefs';

export const defaultPreferences: A11yPreferences = {
  highContrast: false,
  contrastMode: 'default',
  fontScale: 'normal',
  reducedMotion: false,
};

export const getA11yPreferences = (): A11yPreferences => {
  if (typeof window === 'undefined') return defaultPreferences;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultPreferences;
    return { ...defaultPreferences, ...JSON.parse(raw) };
  } catch {
    return defaultPreferences;
  }
};

export const applyA11yPreferences = (prefs: A11yPreferences) => {
  if (typeof window === 'undefined') return;

  const root = document.documentElement;

  // 1. Modos de Contraste (Padrão, Escuro Preto/Ouro ou Claro Não-Preto)
  root.classList.remove('high-contrast', 'high-contrast-light');
  if (prefs.contrastMode === 'light') {
    root.classList.add('high-contrast-light');
  } else if (prefs.contrastMode === 'dark' || prefs.highContrast) {
    root.classList.add('high-contrast');
  }

  // 2. Escala de Fonte
  root.classList.remove('font-scale-lg', 'font-scale-xl');
  if (prefs.fontScale === 'lg') {
    root.classList.add('font-scale-lg');
  } else if (prefs.fontScale === 'xl') {
    root.classList.add('font-scale-xl');
  }

  // 3. Redução de Movimento
  if (prefs.reducedMotion) {
    root.classList.add('reduced-motion');
  } else {
    root.classList.remove('reduced-motion');
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // Silencioso em caso de restrição de storage
  }

  window.dispatchEvent(new CustomEvent('cartes:a11y-changed', { detail: prefs }));
};

export const openA11yModal = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cartes:open-a11y-modal'));
  }
};

export const setA11yHoverState = (isHovered: boolean) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('cartes:a11y-hover', { detail: { isHovered } }));
  }
};

export const toggleHighContrast = (): boolean => {
  const current = getA11yPreferences();
  const next = !current.highContrast;
  applyA11yPreferences({ ...current, highContrast: next });
  return next;
};

export const cycleFontScale = (): 'normal' | 'lg' | 'xl' => {
  const current = getA11yPreferences();
  const nextScale: Record<string, 'normal' | 'lg' | 'xl'> = {
    normal: 'lg',
    lg: 'xl',
    xl: 'normal',
  };
  const next = nextScale[current.fontScale] || 'normal';
  applyA11yPreferences({ ...current, fontScale: next });
  return next;
};

export const resetA11yPreferences = () => {
  applyA11yPreferences(defaultPreferences);
};
