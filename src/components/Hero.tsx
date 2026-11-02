import React from 'react';
import { ArrowRight, ShieldCheck, Scale, Award, ArrowUpRight } from 'lucide-react';

interface HeroProps {
  onStartIntake: () => void;
  onExploreAreas: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartIntake, onExploreAreas }) => {
  return (
    <section id="hero" className="relative overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-[#0b111e] via-[#0d1527] to-[#0b111e] pt-14 pb-20 sm:pt-20 sm:pb-28">
      {/* Subtle luxury editorial backdrop */}
      <div 
        className="pointer-events-none absolute inset-0 -z-20 bg-cover bg-center opacity-[0.09] mix-blend-luminosity"
        style={{ backgroundImage: `url('/imagens/01_capa_ChatGPT-Image-21-de-set-de-2026-16_40_03.png')` }}
      />

      {/* Subtle background ambient mesh */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-1/4 left-1/2 h-[500px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c5a880]/15 blur-[140px]" />
        <div className="absolute bottom-10 left-10 h-72 w-72 rounded-full bg-slate-700/10 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          
          {/* Quiet text kicker with typographic divider */}
          <div className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c5a880]">
            <span>SÃO PAULO</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>BRASÍLIA</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>ADVOCACIA EMPRESARIAL DE ELITE</span>
          </div>

          {/* Primary Editorial Title */}
          <h1 className="max-w-4xl text-4xl font-normal tracking-tight text-slate-100 sm:text-6xl sm:leading-[1.12] lg:text-7xl">
            Rigor técnico, visão estratégica e <span className="font-serif-legal italic text-[#c5a880]">alta complexidade</span>.
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg sm:leading-relaxed">
            Assessoria jurídica orientada à proteção patrimonial perene, eficiência fiscal e condução contundente de litígios corporativos para empresas, fundos e suas lideranças.
          </p>

          {/* Action CTAs */}
          <div className="mt-9 flex flex-col gap-3.5 sm:flex-row sm:items-center">
            <button
              onClick={onStartIntake}
              className="flex items-center justify-center gap-2 rounded-sm bg-[#c5a880] px-7 py-3.5 text-xs font-semibold tracking-wider uppercase text-[#0b111e] transition-all hover:bg-[#d8be98] hover:shadow-xl hover:shadow-[#c5a880]/20"
            >
              <span>Solicitar Diagnóstico Jurídico</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            
            <button
              onClick={onExploreAreas}
              className="flex items-center justify-center gap-2 rounded-sm border border-slate-700 bg-slate-900/60 px-7 py-3.5 text-xs font-semibold tracking-wider uppercase text-slate-200 transition-colors hover:border-slate-500 hover:bg-slate-800"
            >
              <span>Explorar Áreas de Atuação</span>
              <ArrowUpRight className="h-4 w-4 text-slate-400" />
            </button>
          </div>

          {/* Key Editorial Credibility Markers - NO PILL BADGES */}
          <div className="mt-16 w-full max-w-4xl border-t border-slate-800/80 pt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
              
              <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
                <span className="font-serif-legal text-3xl font-medium text-slate-100 sm:text-4xl">
                  R$ 1.8 Bi+
                </span>
                <span className="mt-1 text-xs tracking-wide text-slate-400">
                  Em contingências geridas e operações estruturadas de M&A
                </span>
              </div>

              <div className="flex flex-col items-center text-center sm:items-start sm:text-left sm:border-l sm:border-slate-800/80 sm:pl-6">
                <span className="font-serif-legal text-3xl font-medium text-slate-100 sm:text-4xl">
                  18+ Anos
                </span>
                <span className="mt-1 text-xs tracking-wide text-slate-400">
                  De jurisprudência e defesas no CARF, STJ, STF e Câmaras Arbitrais
                </span>
              </div>

              <div className="flex flex-col items-center text-center sm:items-start sm:text-left sm:border-l sm:border-slate-800/80 sm:pl-6">
                <span className="font-serif-legal text-3xl font-medium text-[#c5a880] sm:text-4xl">
                  &lt; 2 Minutos
                </span>
                <span className="mt-1 text-xs tracking-wide text-slate-400">
                  Triagem guiada e direcionamento imediato para o sócio especialista
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
