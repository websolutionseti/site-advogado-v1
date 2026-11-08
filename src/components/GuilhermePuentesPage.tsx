/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Página Oficial do CTO & Product Designer — Guilherme Puentes
 * Web Solutions ETI | Ecossistema WUXIA-OPS
 */

import React, { useEffect } from 'react';
import { 
  ArrowLeft, 
  ExternalLink, 
  Linkedin, 
  Globe, 
  ShieldCheck, 
  Cpu, 
  Layers, 
  Sparkles, 
  Bot, 
  Code2, 
  Send,
  Workflow
} from 'lucide-react';
import { NavigationPage } from '../types';

interface GuilhermePuentesPageProps {
  onNavigate: (page: NavigationPage) => void;
}

export const GuilhermePuentesPage: React.FC<GuilhermePuentesPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = "Guilherme Puentes — CTO & Senior Product Designer | Web Solutions ETI";
  }, []);

  return (
    <div className="min-h-screen bg-[#060D17] text-[#E2E8F0] selection:bg-[#C5A059]/30 selection:text-white">
      
      {/* 1. Header Fiduciário de Navegação */}
      <header className="sticky top-0 z-40 w-full border-b border-[#C5A059]/20 bg-[#0B192C]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 text-xs uppercase tracking-widest text-[#94A3B8] hover:text-[#C5A059] transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar ao Cartes Advogados</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#C5A059] bg-[#C5A059]/10 px-3 py-1 rounded-full border border-[#C5A059]/30 hidden sm:inline-block">
              Inteligência Técnica • Web Solutions ETI
            </span>
          </div>
        </div>
      </header>

      {/* 2. Hero Section com Apresentação Executiva */}
      <section className="relative overflow-hidden py-16 sm:py-24 border-b border-slate-800">
        <div 
          className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center opacity-10 mix-blend-luminosity filter blur-[1px]"
          style={{ backgroundImage: `url('/imagens/02_capa_ChatGPT-Image-10-de-set-de-2026-17_23_01.png')` }}
          aria-hidden="true"
        />

        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 sm:gap-12">
            
            {/* Foto / Badge Executivo */}
            <div className="relative group shrink-0">
              <div className="h-44 w-44 sm:h-52 sm:w-52 rounded-2xl bg-gradient-to-br from-[#C5A059]/30 to-[#0B192C] p-1.5 shadow-2xl shadow-black/80">
                <div className="h-full w-full rounded-xl bg-slate-900 border border-[#C5A059]/40 flex flex-col items-center justify-center text-center p-4">
                  <span className="font-playfair text-5xl text-[#C5A059] font-bold">GP</span>
                  <span className="text-[11px] uppercase font-mono tracking-widest text-slate-300 mt-2">
                    CTO & Lead Designer
                  </span>
                  <span className="text-[9px] text-emerald-400 font-semibold mt-1 flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    Web Solutions ETI
                  </span>
                </div>
              </div>
            </div>

            {/* Informações Principais */}
            <div className="flex-1 text-center md:text-left">
              <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#C5A059] font-semibold block mb-2">
                Chief Technology Officer & Senior Product Designer
              </span>

              <h1 className="font-playfair text-3xl sm:text-5xl font-bold text-white tracking-tight">
                Guilherme Puentes
              </h1>

              <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#94A3B8]">
                Líder técnico e estrategista de engenharia de software na <strong className="text-white">Web Solutions ETI</strong>. Especialista em arquitetura escalável, automações avançadas de inteligência artificial (n8n & agentes autônomos), conformidade de segurança e Design Systems corporativos de alta fidelidade.
              </p>

              {/* Botões de Contato e Conexão */}
              <div className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-4">
                <a
                  href="https://websolutions.eti.br/guilherme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#D4AF37] text-[#060D17] text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#C5A059]/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <Globe className="h-4 w-4" />
                  <span>Site Pessoal Oficial</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>

                <a
                  href="https://www.linkedin.com/in/guilhermepuentes/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0D2538] border border-slate-700 hover:border-[#0077B5] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#0077B5]/20 transition-all cursor-pointer"
                >
                  <Linkedin className="h-4 w-4 text-[#0077B5]" />
                  <span>LinkedIn de Guilherme Puentes</span>
                  <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
                </a>

                <a
                  href="https://wa.me/5512991528871?text=Ol%C3%A1%20Guilherme%2C%20vim%20pelo%20portal%20Cartes%20Advogados%20e%20gostaria%20de%20falar%20com%20voc%C3%AA."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-600/30 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
                >
                  <Send className="h-4 w-4 text-emerald-400" />
                  <span>Contato Direto WhatsApp</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Pilares de Atuação Técnica & Engenharia */}
      <section className="py-16 sm:py-20 bg-[#0B192C]/50">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#C5A059] block mb-2">
              Matriz de Expertise (WUXIA-OPS)
            </span>
            <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-white">
              Arquitetura, Automação & Experiência de Produto
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Product Design */}
            <div className="p-6 rounded-2xl bg-[#0D2538]/70 border border-slate-700/60 hover:border-[#C5A059]/50 transition-all">
              <div className="h-10 w-10 rounded-xl bg-[#C5A059]/15 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059] mb-4">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2 font-playfair">
                Product Design (UX/UI)
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Design systems corporativos de alta fidelidade, acessibilidade WCAG AAA, psicologia de conversão fiduciária e interfaces responsivas mobile-first.
              </p>
            </div>

            {/* Card 2: AI & Automação */}
            <div className="p-6 rounded-2xl bg-[#0D2538]/70 border border-slate-700/60 hover:border-emerald-500/50 transition-all">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                <Workflow className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2 font-playfair">
                Automação com IA & n8n
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Orquestração de sistemas inteligentes, esteiras de CRM/WhatsApp automatizadas, integração de Chatwoot e agentes autônomos de triagem.
              </p>
            </div>

            {/* Card 3: Full-Stack & DevSecOps */}
            <div className="p-6 rounded-2xl bg-[#0D2538]/70 border border-slate-700/60 hover:border-sky-500/50 transition-all">
              <div className="h-10 w-10 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-4">
                <Cpu className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-white mb-2 font-playfair">
                Full-Stack & DevSecOps
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Aplicações modernas com React, TypeScript, Vite e Tailwind, deploy contínuo seguro via GitHub Pages/Actions e compliance estrito com OWASP e LGPD.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 4. Sobre o Projeto Cartes Advogados */}
      <section className="py-16 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <ShieldCheck className="h-10 w-10 text-[#C5A059] mx-auto mb-4" />
          <h2 className="font-playfair text-2xl font-bold text-white">
            Engenharia Fiduciária no Cartes Advogados
          </h2>
          <p className="mt-3 text-sm text-[#94A3B8] leading-relaxed">
            Esta plataforma foi desenvolvida sob medida pela Web Solutions ETI para a banca Cartes Advogados, unindo a sobriedade do Direito Civil à excelência tecnológica do ecossistema WUXIA-OPS.
          </p>

          <div className="mt-8">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="inline-flex items-center gap-2 border border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059] hover:text-black px-6 py-2.5 rounded-lg text-xs uppercase tracking-widest font-bold transition-all cursor-pointer"
            >
              <span>Explorar o Site Institucional</span>
              <ArrowLeft className="h-3.5 w-3.5 rotate-180" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

