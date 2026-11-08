import React, { useState } from 'react';
import { 
  FluentProvider, 
  webLightTheme, 
  Card, 
  CardFooter,
  tokens
} from '@fluentui/react-components';
import { 
  ArrowRight, 
  ArrowUpRight, 
  X, 
  GraduationCap, 
  CheckCircle2, 
  Mail, 
  Linkedin,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Footer } from './Footer';

import { NavigationPage } from '../types';

interface EquipeFluentPageProps {
  onNavigate: (page: NavigationPage) => void;
  onOpenIntake: () => void;
  onOpenPRD?: () => void;
  onOpenExtraction?: () => void;
  hideHeader?: boolean;
  hideFooter?: boolean;
}

interface LawyerProfile {
  id: string;
  name: string;
  role: string;
  oab: string;
  photoUrl: string;
  specialties: string[];
  bio: string;
  quote?: string;
  education: string[];
  squad: string;
  email: string;
  linkedin: string;
}

export const EquipeFluentPage: React.FC<EquipeFluentPageProps> = ({ 
  onNavigate, 
  onOpenIntake,
  onOpenPRD,
  onOpenExtraction,
  hideHeader = false,
  hideFooter = false
}) => {
  const [selectedLawyer, setSelectedLawyer] = useState<LawyerProfile | null>(null);
  const [imageErrorMap, setImageErrorMap] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImageErrorMap(prev => ({ ...prev, [id]: true }));
  };

  const lawyers: LawyerProfile[] = [
    {
      id: 'victor-cartes',
      name: 'Victor Hugo Lira Cartes',
      role: 'SÓCIO FUNDADOR',
      oab: 'OAB/SP 421.506',
      photoUrl: '/equipe/victor_cartes.jpg',
      specialties: [
        'Planejamento Patrimonial e Sucessório',
        'Direito de Família e Sucessões',
        'Direito Contratual Estratégico',
        'Direito Societário e Governança'
      ],
      bio: 'Com mais de 10 anos de experiência jurídica e consultiva, assessora famílias empresárias e líderes corporativos com foco em Planejamento Patrimonial, Sucessão de Negócios e Mediação de Conflitos. Une a precisão técnica do Direito Civil à visão prática de negócios para blindar legados e prevenir litígios.',
      quote: 'A advocacia vai além da aplicação das leis: envolve compreender pessoas, negócios e propósitos. Caminhamos lado a lado para prevenir conflitos e construir soluções duradouras.',
      education: [
        'Bacharel em Direito com distinção em Direito Civil e Sucessões',
        'Especialização em Planejamento Patrimonial e Sucessório Familiar',
        'Certificação Executiva Internacional em Negotiation Strategy (I.B.M.I)'
      ],
      squad: 'Wealth Governance, Família & Sucessões',
      email: 'victor.cartes@cartesadvogados.com.br',
      linkedin: 'https://linkedin.com'
    },
    {
      id: 'leonardo-gutierrez',
      name: 'Leonardo Gutierrez Alves',
      role: 'ADVOGADO ASSOCIADO',
      oab: 'OAB/SP 306.294',
      photoUrl: '/equipe/leonardo_gutierrez.jpg',
      specialties: [
        'Direito Digital & LGPD',
        'Compliance & Prova Eletrônica',
        'Direito Trabalhista Preventivo',
        'Contratos e Tributário Corporativo'
      ],
      bio: 'Mais de duas décadas de prática jurídica dedicada ao Direito Empresarial, Tributário, Trabalhista e às áreas de ponta de Compliance, Proteção de Dados (LGPD) e Provas Digitais frente à Inteligência Artificial. Atuação contenciosa sólida nos Tribunais Superiores.',
      quote: 'Na velocidade da transformação digital, a conformidade preventiva é o único escudo contra contingências e passivos operacionais invisíveis.',
      education: [
        'Pós-Graduado em Direito Empresarial e Tributário pela PUC/SP',
        'Especialista em Compliance e Proteção de Dados Pessoais (LGPD)',
        'Extensão em Validade Jurídica de Documentos Eletrônicos e Prova Digital'
      ],
      squad: 'Direito Digital, Inovação & Tributário',
      email: 'leonardo.gutierrez@cartesadvogados.com.br',
      linkedin: 'https://linkedin.com'
    },
    {
      id: 'anderson-bispo',
      name: 'Anderson Bispo da Silva',
      role: 'ADVOGADO ASSOCIADO',
      oab: 'OAB/SP 252.001',
      photoUrl: '/equipe/anderson_bispo.png',
      specialties: [
        'Direito Societário & M&A',
        'Governança Corporativa',
        'Apuração de Haveres e Dissoluções',
        'Reorganizações Societárias e Contratos'
      ],
      bio: 'Mais de 20 anos de trajetória no Direito Empresarial e Societário, assessorando sociedades nacionais e transnacionais em operações de fusões e aquisições (M&A), acordos de sócios complexos, mediação societária e resolução de litígios societários.',
      quote: 'Contratos societários bem estruturados não são custo burocrático; são a fundação inabalável para o crescimento seguro e valorização da empresa.',
      education: [
        'Especialista em Direito Societário e Governança Corporativa pela FGV',
        'Extensão em Dissolução Parcial de Sociedades e Apuração Pericial de Haveres',
        'Bacharel em Direito com ampla atuação em Arbitragem Comercial'
      ],
      squad: 'Empresarial Estratégico, Societário & M&A',
      email: 'anderson.bispo@cartesadvogados.com.br',
      linkedin: 'https://linkedin.com'
    },
    {
      id: 'pedro-sirna',
      name: 'Pedro Gabriel Sirna dos Santos',
      role: 'ADVOGADO ASSOCIADO',
      oab: 'OAB/SP 412.274',
      photoUrl: '/equipe/pedro_sirna.jpg',
      specialties: [
        'Direito do Consumidor Corporativo',
        'Direito Imobiliário & Due Diligence',
        'Gaming Law & Mercados Digitais',
        'Contencioso Cível Estratégico'
      ],
      bio: 'Especialista em relações jurídicas contemporâneas de alto dinamismo. Atua na proteção de empresas perante demandas de consumo de grande volume, estruturação de operações imobiliárias com auditoria de riscos e consultoria no setor de e-commerce e jogos eletrônicos.',
      quote: 'A precisão técnica no contencioso e o olhar preventivo nas relações de consumo protegem o caixa e preservam a integridade reputacional da marca.',
      education: [
        'Especialista em Direito Civil e Relações de Consumo',
        'Formação em Negócios Imobiliários e Contratos Comerciais',
        'Bacharel em Direito com atuação em Cortes Estaduais e Federais'
      ],
      squad: 'Contencioso Estratégico, Imobiliário & Consumo',
      email: 'pedro.sirna@cartesadvogados.com.br',
      linkedin: 'https://linkedin.com'
    },
    {
      id: 'paulo-faria',
      name: 'Paulo A. de Barros Faria Neto',
      role: 'ADVOGADO ASSOCIADO',
      oab: 'OAB/SP 420.055',
      photoUrl: '/equipe/paulo_faria.jpg',
      specialties: [
        'Direito Trabalhista Patronal',
        'Mediação e Resolução de Conflitos',
        'Gestão Preventiva de Riscos',
        'Perícia Judicial Trabalhista'
      ],
      bio: 'Atuação orientada por visão pragmática e multidisciplinar do Direito do Trabalho empresarial. Estrutura políticas de remuneração variável, acordos coletivos e defesas técnicas perante a Justiça do Trabalho para mitigar passivos ocultos e custos operacionais.',
      quote: 'Soluções negociadas com rigor técnico preservam parcerias comerciais e diminuem drasticamente a litigiosidade crônica.',
      education: [
        'Bacharel em Direito inscrito na OAB/SP',
        'Especialização em Direito do Trabalho Corporativo e Gestão Preventiva',
        'Capacitação em Técnicas Avançadas de Mediação e Perícia Judicial'
      ],
      squad: 'Gestão Contratual & Riscos Trabalhistas',
      email: 'paulo.faria@cartesadvogados.com.br',
      linkedin: 'https://linkedin.com'
    }
  ];

  const consultant: LawyerProfile = {
    id: 'brenner-refundini',
    name: 'Brenner Aparecido Refundini',
    role: 'CONSULTORIA ESTRATÉGICA & CONTROLADORIA',
    oab: 'CRC/SP 1SP 346408/0-4',
    photoUrl: '/equipe/brenner_refundini.jpg',
    specialties: [
      'Contabilidade Consultiva Geral',
      'Gestão Financeira & Orçamentária',
      'Planejamento Societário e Tributário',
      'Valuation e Análise de Balanços'
    ],
    bio: 'Graduado em Ciências Contábeis com especialização em Gestão Financeira Corporativa. Desenvolve atuação estratégica integrada ao corpo jurídico, garantindo alinhamento perfeito entre as normas contábeis, a eficiência tributária e as estruturas societárias dos clientes.',
    quote: 'A harmonia entre os números contábeis e as leis civis é a garantia de perenidade para holdings familiares e corporações.',
    education: [
      'Graduado em Ciências Contábeis com registro ativo no CRC/SP',
      'Especialização em Gestão Financeira, Controladoria e Auditoria',
      'Consultor técnico em planejamento sucessório e reorganização societária'
    ],
    squad: 'Controladoria, Perícia & Eficiência Tributária',
    email: 'brenner.refundini@cartesadvogados.com.br',
    linkedin: 'https://linkedin.com'
  };

  return (
    <FluentProvider theme={webLightTheme}>
      <div className="min-h-screen bg-[#fbfbfa] text-[#1a1f2c] font-inter selection:bg-[#c5a880]/30 selection:text-black">
        
        {/* 1. TOP NAVBAR (Dark Theme) — WCAG 2.2 AA Conforme */}
        {!hideHeader && (
          <header 
            className="sticky top-0 z-40 w-full border-b border-[#1c2436] bg-[#070b13] text-[#f0ede6]" 
            role="banner"
          >
          <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            
            {/* Left Navigation: HOME, ATUAÇÃO, EQUIPE */}
            <nav aria-label="Navegação Institucional" className="flex items-center gap-7 sm:gap-9">
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="text-xs uppercase tracking-[0.22em] text-[#9ca3af] transition-colors hover:text-[#c5a880] focus-visible:outline-2 focus-visible:outline-[#c5a880] cursor-pointer"
                aria-label="Ir para a página inicial"
              >
                HOME
              </button>
              
              <button
                type="button"
                onClick={() => onNavigate('atuacao')}
                className="text-xs uppercase tracking-[0.22em] text-[#9ca3af] transition-colors hover:text-[#c5a880] focus-visible:outline-2 focus-visible:outline-[#c5a880] cursor-pointer"
                aria-label="Ir para a página de áreas de atuação"
              >
                ATUAÇÃO
              </button>
              
              {/* Active page indicator with subtle gold line */}
              <div className="relative py-2">
                <span 
                  className="text-xs font-semibold uppercase tracking-[0.22em] text-white" 
                  aria-current="page"
                >
                  EQUIPE
                </span>
                <div 
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c5a880]" 
                  aria-hidden="true" 
                />
              </div>
            </nav>

            {/* Central Logo ("CARTES ADVOGADOS") */}
            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="group flex flex-col items-center text-center focus-visible:outline-2 focus-visible:outline-[#c5a880] cursor-pointer"
                aria-label="Cartes Advogados — Retornar para a Página Inicial"
              >
                <span className="font-playfair text-xl font-normal tracking-[0.28em] text-[#f0ede6] sm:text-2xl">
                  CARTES
                </span>
                <span className="text-[9px] tracking-[0.45em] text-[#c5a880] font-inter -mt-0.5">
                  ADVOGADOS
                </span>
              </button>
            </div>

            {/* Right Navigation: BLOG, CONTATO, DIAGNÓSTICO */}
            <div className="flex items-center gap-4 sm:gap-7">
              <button
                type="button"
                onClick={() => onNavigate('blog')}
                className="hidden md:inline-block text-xs uppercase tracking-[0.22em] text-[#9ca3af] transition-colors hover:text-[#c5a880] focus-visible:outline-2 focus-visible:outline-[#c5a880] cursor-pointer"
                aria-label="Acessar o Blog de artigos jurídicos e análises"
              >
                BLOG
              </button>

              <button
                type="button"
                onClick={onOpenIntake}
                className="hidden sm:inline-block text-xs uppercase tracking-[0.22em] text-[#9ca3af] transition-colors hover:text-[#c5a880] focus-visible:outline-2 focus-visible:outline-[#c5a880] cursor-pointer"
                aria-label="Falar com nossa equipe ou agendar atendimento"
              >
                CONTATO
              </button>

              <button
                type="button"
                onClick={onOpenIntake}
                className="rounded-none sm:rounded-sm bg-[#c5a880] px-4 sm:px-5 py-2.5 text-[11px] font-semibold tracking-wider uppercase text-[#070b13] transition-all hover:bg-[#d8be98] focus-visible:outline-2 focus-visible:outline-white cursor-pointer"
                aria-label="Solicitar diagnóstico preliminar de caso jurídico"
              >
                DIAGNÓSTICO
              </button>
            </div>

          </div>
        </header>
        )}

        <main id="conteudo-principal" role="main">

          {/* 2. HERO SECTION (Light Theme / Imagem) — Private Banking Style */}
          <section 
            aria-labelledby="hero-title" 
            className="relative border-b border-[#e5e5e0] bg-[#fbfbfa] py-16 sm:py-24"
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
                
                {/* Left Column: Typography */}
                <div className="lg:col-span-7">
                  <div 
                    className="mb-4 inline-block h-[2px] w-12 bg-[#c5a880]" 
                    aria-hidden="true" 
                  />
                  
                  <h1 
                    id="hero-title" 
                    className="font-playfair text-5xl font-normal tracking-tight text-[#111827] sm:text-7xl lg:text-8xl"
                  >
                    EQUIPE
                  </h1>
                  
                  <h2 className="mt-6 text-xl sm:text-2xl font-medium text-[#2a3447] leading-snug">
                    Conhecimento jurídico, experiência e atuação integrada.
                  </h2>

                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#596375] sm:text-base">
                    Profissionais com diferentes especialidades, reunidos para compreender cada contexto e construir soluções jurídicas sob medida para pessoas, famílias empresárias e corporações.
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={onOpenIntake}
                      className="inline-flex items-center gap-2 rounded-none sm:rounded-sm bg-[#0c111c] px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#f0ede6] transition-colors hover:bg-[#1a2337] focus-visible:outline-2 focus-visible:outline-[#c5a880] cursor-pointer"
                      aria-label="Agendar conversa com um dos nossos sócios especialistas"
                    >
                      <span>Falar com um Especialista</span>
                      <ArrowRight className="h-4 w-4 text-[#c5a880]" />
                    </button>

                    {onOpenPRD && (
                      <button
                        type="button"
                        onClick={onOpenPRD}
                        className="inline-flex items-center gap-1.5 border border-[#deded9] bg-white px-4 py-3.5 text-xs font-medium text-[#4b5563] hover:border-[#c5a880] hover:text-[#111827] focus-visible:outline-2 focus-visible:outline-[#c5a880] cursor-pointer"
                        aria-label="Abrir especificações técnicas do PRD da Cartes Advogados"
                      >
                        <FileText className="h-3.5 w-3.5 text-[#c5a880]" />
                        <span>Ver PRD do Projeto</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Right Column: High-End Layout Architectural Image */}
                <div className="lg:col-span-5">
                  <div className="relative overflow-hidden rounded-none sm:rounded-sm border border-[#e5e5e0] shadow-xl bg-slate-900 aspect-[4/3.2]">
                    <img
                      src="/imagens/01_capa_ChatGPT-Image-21-de-set-de-2026-16_40_03.png"
                      alt="Vista executiva do skyline corporativo ao entardecer em São Paulo"
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover filter contrast-105"
                      loading="eager"
                    />
                    <div 
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" 
                      aria-hidden="true"
                    />
                    
                    <div className="absolute bottom-5 right-5 text-right text-[10px] uppercase tracking-[0.25em] text-[#e0ded8]">
                      <p className="font-semibold text-[#c5a880]">PESSOAS</p>
                      <p>FAMÍLIAS</p>
                      <p>EMPRESAS</p>
                      <p className="text-white font-medium">SOLUÇÕES DURADOURAS</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* 3. SEÇÃO ADVOGADOS (Grid de Cards) — Fluent 2 Components */}
          <section 
            aria-labelledby="advogados-title" 
            className="bg-[#fbfbfa] py-20"
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              
              {/* Section Header with Line Divider */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#e5e5e0] pb-6 mb-12">
                <div className="flex items-center gap-4">
                  <h2 
                    id="advogados-title"
                    className="font-playfair text-3xl font-normal text-[#111827] sm:text-4xl"
                  >
                    Advogados
                  </h2>
                  <div className="hidden sm:block h-[1px] w-24 bg-[#c5a880]" aria-hidden="true" />
                </div>
                <p className="mt-2 sm:mt-0 text-[11px] uppercase tracking-[0.2em] text-[#717b8f]">
                  EXPERIÊNCIA, ESPECIALIZAÇÃO E UMA VISÃO INTEGRADA DO DIREITO.
                </p>
              </div>

              {/* 5-Column Grid using Fluent 2 <Card> without exaggerated border radius */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-stretch">
                {lawyers.map((lawyer) => (
                  <article
                    key={lawyer.id}
                    className="flex flex-col h-full"
                    aria-labelledby={`lawyer-name-${lawyer.id}`}
                  >
                    <Card
                      className="group flex flex-col justify-between h-full !rounded-none !border !border-[#e5e5e0] !bg-white !p-0 transition-all duration-300 hover:!border-[#c5a880] hover:shadow-xl hover:-translate-y-1 focus-within:ring-2 focus-within:ring-[#c5a880]"
                      appearance="subtle"
                    >
                      <div>
                        {/* Member Photo with graceful fallback */}
                        <div className="relative aspect-[3/3.8] w-full overflow-hidden bg-slate-900 border-b border-[#e5e5e0]">
                          {!imageErrorMap[lawyer.id] ? (
                            <img
                              src={lawyer.photoUrl}
                              alt={`Foto profissional de ${lawyer.name}`}
                              referrerPolicy="no-referrer"
                              onError={() => handleImageError(lawyer.id)}
                              className="h-full w-full object-cover object-top filter grayscale contrast-115 transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                              loading="lazy"
                            />
                          ) : (
                            <div className="h-full w-full flex flex-col items-center justify-center bg-slate-950 p-4 text-center">
                              <span className="font-playfair text-2xl text-[#c5a880]">
                                {lawyer.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                              </span>
                              <span className="text-[10px] text-slate-400 mt-2 font-mono">
                                {lawyer.oab}
                              </span>
                            </div>
                          )}
                          <div 
                            className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" 
                            aria-hidden="true"
                          />
                        </div>

                        {/* Details */}
                        <div className="p-5">
                          <span className="text-[10px] font-inter uppercase tracking-widest text-[#717b8f] block mb-1">
                            {lawyer.role}
                          </span>
                          
                          <h3 
                            id={`lawyer-name-${lawyer.id}`}
                            className="font-playfair text-lg font-bold text-[#111827] leading-tight group-hover:text-[#9e7d47] transition-colors"
                          >
                            {lawyer.name}
                          </h3>

                          <span className="text-[10px] font-mono text-[#c5a880] mt-1 block">
                            {lawyer.oab}
                          </span>

                          {/* Specialties: clean typographic list (Zero-pill discipline) */}
                          <ul 
                            className="mt-4 space-y-1.5 border-t border-[#f0f0eb] pt-3 text-xs text-[#4b5563]" 
                            aria-label={`Especialidades de ${lawyer.name}`}
                          >
                            {lawyer.specialties.map((spec, sIdx) => (
                              <li key={sIdx} className="line-clamp-1 leading-snug">
                                {spec}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Card Footer: Subtle Button "CONHEÇA O PERFIL ->" */}
                      <CardFooter className="!p-5 !pt-0">
                        <button
                          type="button"
                          onClick={() => setSelectedLawyer(lawyer)}
                          className="flex w-full items-center justify-between border-t border-[#f0f0eb] pt-3 text-[11px] font-semibold uppercase tracking-wider text-[#9e7d47] hover:text-[#6e532b] focus-visible:outline-2 focus-visible:outline-[#9e7d47] cursor-pointer"
                          aria-label={`Conheça o perfil completo e histórico de ${lawyer.name}`}
                        >
                          <span>CONHEÇA O PERFIL</span>
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </button>
                      </CardFooter>
                    </Card>
                  </article>
                ))}
              </div>

            </div>
          </section>

          {/* 4. SEÇÃO SÓCIO FUNDADOR & DESTAQUE FIDUCIÁRIO (Horizontal Card) — Fluent 2 Component */}
          {(() => {
            // Lógica de Destaque Fiduciário e Segmentação A/B por busca (SEO / UTM)
            const getFeatured = (): LawyerProfile => {
              if (typeof window === 'undefined') return lawyers[0];
              const params = new URLSearchParams(window.location.search);
              const slug = (params.get('destaque') || params.get('advogado') || params.get('area') || '').toLowerCase();
              if (slug.includes('digital') || slug.includes('compliance') || slug.includes('leonardo')) {
                return lawyers.find(l => l.id === 'leonardo-gutierrez') || lawyers[0];
              }
              if (slug.includes('societ') || slug.includes('m&a') || slug.includes('anderson')) {
                return lawyers.find(l => l.id === 'anderson-bispo') || lawyers[0];
              }
              if (slug.includes('trabalh') || slug.includes('contrat') || slug.includes('pedro')) {
                return lawyers.find(l => l.id === 'pedro-sirna') || lawyers[0];
              }
              if (slug.includes('contab') || slug.includes('tribut') || slug.includes('brenner')) {
                return consultant;
              }
              // Padrão: Sócio Fundador Victor Hugo Lira Cartes
              return lawyers[0];
            };

            const featured = getFeatured();
            const isFounder = featured.id === 'victor-cartes';

            return (
              <section 
                aria-labelledby="featured-lawyer-title" 
                className="bg-[#f5f5f2] py-16 border-t border-b border-[#e5e5e0]"
              >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#deded9] pb-6 mb-10">
                    <div className="flex items-center gap-4">
                      <h2 
                        id="featured-lawyer-title"
                        className="font-playfair text-3xl font-normal text-[#111827] sm:text-4xl"
                      >
                        {isFounder ? 'Sócio Fundador & Direção Fiduciária' : 'Especialista em Destaque'}
                      </h2>
                      <div className="hidden sm:block h-[1px] w-24 bg-[#c5a880]" aria-hidden="true" />
                    </div>
                    <p className="mt-2 sm:mt-0 text-[11px] uppercase tracking-[0.2em] text-[#717b8f]">
                      {isFounder 
                        ? 'LIDERANÇA ESTRATÉGICA & GOVERNANÇA PATRIMONIAL.'
                        : 'CONHECIMENTO MULTIDISCIPLINAR PARA SOLUÇÕES MAIS COMPLETAS.'}
                    </p>
                  </div>

                  {/* Horizontal <Card> for Featured Profile */}
                  <article 
                    className="mx-auto max-w-4xl"
                    aria-labelledby="featured-lawyer-name"
                  >
                    <Card 
                      className="group !rounded-none !border !border-[#deded9] !bg-white !shadow-md transition-all duration-300 hover:!border-[#c5a880] hover:!shadow-xl focus-within:ring-2 focus-within:ring-[#c5a880] !p-0"
                      appearance="subtle"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
                        
                        {/* Left: Headshot */}
                        <div className="md:col-span-5 relative aspect-[4/3.5] md:aspect-auto overflow-hidden bg-slate-900 border-b md:border-b-0 md:border-r border-[#deded9]">
                          {!imageErrorMap[featured.id] ? (
                            <img
                              src={featured.photoUrl}
                              alt={`Foto profissional de ${featured.name}`}
                              referrerPolicy="no-referrer"
                              onError={() => handleImageError(featured.id)}
                              className="h-full w-full object-cover object-top filter grayscale contrast-110 transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                              loading="lazy"
                            />
                          ) : (
                            <div className="h-full w-full flex flex-col items-center justify-center bg-slate-950 p-6 text-center">
                              <span className="font-playfair text-3xl text-[#c5a880]">VH</span>
                              <span className="text-xs text-slate-400 mt-2 font-mono">{featured.oab}</span>
                            </div>
                          )}
                        </div>

                        {/* Right: Info, Specialties & CTAs */}
                        <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] font-inter uppercase tracking-widest text-[#717b8f] block mb-1">
                              {featured.role}
                            </span>
                            
                            <h3 
                              id="featured-lawyer-name"
                              className="font-playfair text-2xl font-bold text-[#111827] group-hover:text-[#9e7d47] transition-colors"
                            >
                              {featured.name}
                            </h3>
                            
                            <span className="text-[11px] font-mono text-[#c5a880] block mt-1">
                              {featured.oab}
                            </span>

                            <p className="mt-3 text-xs leading-relaxed text-[#596375]">
                              {featured.bio}
                            </p>

                            <div className="mt-5 border-t border-[#f0f0eb] pt-4">
                              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#111827] block mb-2">
                                Especialidades & Atuação Técnica:
                              </span>
                              <ul className="space-y-1.5 text-xs text-[#4b5563]" aria-label="Especialidades jurídicas e fiduciárias">
                                {featured.specialties.map((spec, idx) => (
                                  <li key={idx} className="flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#c5a880]" aria-hidden="true" />
                                    <span>{spec}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <div className="mt-6 border-t border-[#f0f0eb] pt-4 flex flex-wrap items-center justify-between gap-3">
                            <button
                              type="button"
                              onClick={() => setSelectedLawyer(featured)}
                              className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#9e7d47] hover:text-[#6e532b] focus-visible:outline-2 focus-visible:outline-[#9e7d47] cursor-pointer"
                              aria-label={`Conheça o perfil completo de ${featured.name}`}
                            >
                              <span>CONHEÇA O PERFIL</span>
                              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                            </button>

                            <a
                              href="https://wa.me/5511973758834?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20com%20o%20Dr.%20Victor%20Cartes."
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-[#717b8f] hover:text-[#111827] hover:underline cursor-pointer flex items-center gap-1 font-medium"
                              aria-label={`Falar diretamente com ${featured.name}`}
                            >
                              <span>Plantão WhatsApp Direto</span>
                              <span>→</span>
                            </a>
                          </div>

                        </div>

                      </div>
                    </Card>
                  </article>

                </div>
              </section>
            );
          })()}

          {/* 5. FOOTER / CTA SECTION (Dark Theme) — Private Banking Presence */}
          <section 
            aria-labelledby="cta-title" 
            className="relative overflow-hidden bg-[#070b13] py-20 sm:py-24 text-[#f0ede6]"
          >
            {/* Background texture with executive library image */}
            <div 
              className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-center opacity-15 mix-blend-luminosity filter blur-[1px]"
              style={{ backgroundImage: `url('/imagens/02_capa_ChatGPT-Image-10-de-set-de-2026-17_23_01.png')` }}
              aria-hidden="true"
            />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl">
                <h2 
                  id="cta-title" 
                  className="font-playfair text-4xl font-normal tracking-tight text-[#f0ede6] sm:text-5xl lg:text-6xl"
                >
                  Diferentes experiências. <br className="hidden sm:inline" />
                  <span className="text-[#c5a880]">Uma atuação integrada.</span>
                </h2>

                <p className="mt-6 text-sm leading-relaxed text-[#9ca3af] sm:text-base">
                  Questões jurídicas frequentemente atravessam mais de uma área do Direito. Nossa estrutura permite reunir diferentes experiências e perspectivas quando o contexto exige uma análise mais ampla.
                </p>
              </div>

              {/* Bottom Bar within CTA */}
              <div className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-slate-800/80 pt-8 sm:flex-row sm:items-center">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.25em] text-[#9ca3af]">
                    EXPERIÊNCIA, ESCUTA E COMPROMISSO COM SOLUÇÕES REAIS.
                  </p>
                  <p className="mt-1 text-base font-playfair font-normal text-[#f0ede6]">
                    Conheça quem estará ao seu lado.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onOpenIntake}
                  className="group flex items-center gap-3 rounded-none sm:rounded-sm border border-[#c5a880] px-7 py-3 text-xs font-semibold tracking-wider uppercase text-[#c5a880] transition-all hover:bg-[#c5a880] hover:text-[#070b13] focus-visible:outline-2 focus-visible:outline-white cursor-pointer"
                  aria-label="Falar com nossa equipe de advogados para agendar uma reunião"
                >
                  <span>FALAR COM NOSSA EQUIPE</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

            </div>
          </section>

        </main>

        {/* FOOTER CORPORATIVO (Mobile-First / Fluent 2 Style) */}
        {!hideFooter && (
          <Footer 
            onNavigate={onNavigate}
            onOpenIntake={onOpenIntake}
            onOpenPRD={onOpenPRD}
            onOpenExtraction={onOpenExtraction}
          />
        )}

        {/* MODAL / DOSSIÊ INTERATIVO DO ADVOGADO (Framer Motion Spring Physics) */}
        <AnimatePresence>
          {selectedLawyer && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-lawyer-title"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
                className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-none sm:rounded-sm border border-[#deded9] bg-white p-6 sm:p-10 shadow-2xl text-[#111827]"
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setSelectedLawyer(null)}
                  className="absolute top-5 right-5 rounded-none sm:rounded-sm border border-slate-200 bg-slate-100 p-2 text-slate-500 hover:text-black focus-visible:outline-2 focus-visible:outline-[#9e7d47] cursor-pointer"
                  aria-label="Fechar dossiê do profissional"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Dossier Top Banner */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-[#e5e5e0] pb-8 pr-6 items-center">
                  <div className="md:col-span-8">
                    <span className="text-[11px] font-inter uppercase tracking-[0.2em] text-[#717b8f]">
                      {selectedLawyer.role} · {selectedLawyer.oab}
                    </span>
                    
                    <h2 
                      id="modal-lawyer-title"
                      className="mt-1 font-playfair text-3xl font-bold text-[#111827] sm:text-4xl"
                    >
                      {selectedLawyer.name}
                    </h2>

                    <p className="mt-3 text-sm text-[#4b5563]">
                      Atuação de excelência técnica com foco na prevenção de conflitos, segurança patrimonial e construção de soluções jurídicas duradouras.
                    </p>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedLawyer(null);
                          onOpenIntake();
                        }}
                        className="inline-flex items-center gap-2 rounded-none sm:rounded-sm bg-[#0c111c] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#1a2337] cursor-pointer"
                        aria-label={`Entrar em contato com ${selectedLawyer.name}`}
                      >
                        <span>Entrar em Contato</span>
                        <ArrowRight className="h-3.5 w-3.5 text-[#c5a880]" />
                      </button>

                      <a
                        href={`mailto:${selectedLawyer.email}`}
                        className="inline-flex items-center gap-1.5 border border-slate-200 px-4 py-2.5 text-xs text-slate-600 hover:border-[#c5a880] hover:text-black"
                        aria-label={`Enviar e-mail para ${selectedLawyer.name}`}
                      >
                        <Mail className="h-3.5 w-3.5 text-[#c5a880]" />
                        <span>E-mail</span>
                      </a>
                    </div>
                  </div>

                  <div className="md:col-span-4 relative aspect-[3/3.8] overflow-hidden rounded-none sm:rounded-sm border border-[#e5e5e0] bg-slate-900 shadow-md">
                    <img
                      src={selectedLawyer.photoUrl}
                      alt={selectedLawyer.name}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                </div>

                {/* Profile Bio & Quote */}
                <div className="mt-8">
                  <h3 className="font-playfair text-2xl font-normal text-[#111827]">
                    Perfil & Trajetória
                  </h3>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#717b8f] mb-3">
                    EXPERIÊNCIA, ESTRATÉGIA E VISÃO INTEGRADA PARA SOLUÇÕES DURADOURAS.
                  </p>

                  <p className="text-sm leading-relaxed text-[#374151]">
                    {selectedLawyer.bio}
                  </p>

                  {selectedLawyer.quote && (
                    <div className="mt-6 border-l-2 border-[#c5a880] pl-4 italic text-sm text-[#596375] bg-[#fafaf8] py-3 pr-3">
                      "{selectedLawyer.quote}"
                      <span className="block mt-1 font-inter text-[11px] not-italic font-semibold text-[#111827]">
                        — {selectedLawyer.name}
                      </span>
                    </div>
                  )}
                </div>

                {/* Education & Qualifications */}
                <div className="mt-8 border-t border-[#e5e5e0] pt-6">
                  <h3 className="font-playfair text-xl font-normal text-[#111827] mb-3 flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-[#c5a880]" />
                    <span>Formação e Qualificações</span>
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#4b5563]">
                    {selectedLawyer.education.map((edu, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-[#f9f9f7] p-2.5 rounded-none border border-[#efefeb]">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{edu}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Specialties / Areas */}
                <div className="mt-8 border-t border-[#e5e5e0] pt-6">
                  <h3 className="font-playfair text-xl font-normal text-[#111827] mb-3">
                    Áreas de Atuação
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedLawyer.specialties.map((spec, sIdx) => (
                      <span key={sIdx} className="rounded-none bg-[#0c111c] text-[#f0ede6] px-3 py-1.5 text-xs">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Jeito de Atuar (4 Steps) */}
                <div className="mt-8 border-t border-[#e5e5e0] pt-6">
                  <h3 className="font-playfair text-xl font-normal text-[#111827] mb-3">
                    Metodologia de Atuação
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="p-3 bg-[#fafaf8] border border-[#efefeb]">
                      <span className="font-mono text-[10px] text-[#c5a880] block font-bold">01</span>
                      <strong className="text-[#111827]">Prevenção</strong>
                      <p className="text-[11px] text-[#717b8f] mt-1">Antecipar riscos e evitar conflitos judiciais.</p>
                    </div>
                    <div className="p-3 bg-[#fafaf8] border border-[#efefeb]">
                      <span className="font-mono text-[10px] text-[#c5a880] block font-bold">02</span>
                      <strong className="text-[#111827]">Estratégia</strong>
                      <p className="text-[11px] text-[#717b8f] mt-1">Visão integrada e soluções sob medida.</p>
                    </div>
                    <div className="p-3 bg-[#fafaf8] border border-[#efefeb]">
                      <span className="font-mono text-[10px] text-[#c5a880] block font-bold">03</span>
                      <strong className="text-[#111827]">Negociação</strong>
                      <p className="text-[11px] text-[#717b8f] mt-1">Diálogo para construir acordos sólidos.</p>
                    </div>
                    <div className="p-3 bg-[#fafaf8] border border-[#efefeb]">
                      <span className="font-mono text-[10px] text-[#c5a880] block font-bold">04</span>
                      <strong className="text-[#111827]">Solução</strong>
                      <p className="text-[11px] text-[#717b8f] mt-1">Segurança jurídica para pessoas e empresas.</p>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#e5e5e0] pt-6">
                  <span className="text-xs text-[#717b8f]">
                    Atendimento confidencial em São Paulo, Brasília e ambiente virtual seguro.
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedLawyer(null);
                      onOpenIntake();
                    }}
                    className="w-full sm:w-auto rounded-none sm:rounded-sm bg-[#c5a880] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#0c111c] hover:bg-[#d8be98] cursor-pointer"
                  >
                    Agendar com {selectedLawyer.name.split(' ')[0]} {selectedLawyer.name.split(' ')[1]}
                  </button>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </FluentProvider>
  );
};
