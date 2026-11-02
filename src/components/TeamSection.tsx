import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Layers, 
  LayoutGrid, 
  Shield, 
  Briefcase, 
  GraduationCap, 
  Mail, 
  Linkedin, 
  ArrowUpRight, 
  ExternalLink, 
  CheckCircle2, 
  Sparkles, 
  ChevronDown, 
  Quote, 
  Calendar,
  X,
  FileText
} from 'lucide-react';
import { Lawyer } from '../types';
import { LAWYERS, ARTICLES } from '../data/mockData';

interface TeamSectionProps {
  onScheduleWithPartner: (areaName: string) => void;
}

interface SquadGroup {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  icon: any;
  color: string;
  leadMemberId: string;
  members: Lawyer[];
  keyHighlights: string[];
}

export const TeamSection: React.FC<TeamSectionProps> = ({ onScheduleWithPartner }) => {
  const [viewMode, setViewMode] = useState<'squads' | 'grid'>('squads');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('Todos');
  const [activeDossier, setActiveDossier] = useState<Lawyer | null>(null);
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  // Group lawyers into strategic squads
  const squads: SquadGroup[] = [
    {
      id: 'wealth-family',
      name: 'Squad 01 — Wealth Governance, Família & Sucessões',
      subtitle: 'Proteção Patrimonial & Continuidade Geracional',
      description: 'Estruturação de holdings familiares, inventários de alta complexidade, pactos antenupciais e sucessão de ativos físicos e digitais.',
      icon: Shield,
      color: 'amber',
      leadMemberId: 'victor-cartes',
      members: LAWYERS.filter(l => l.id === 'victor-cartes' || l.id === 'brenner-refundini'),
      keyHighlights: [
        'Planejamento sucessório preventivo com redução drástica de ITCMD',
        'Separação entre patrimônio operacional e familiar',
        'Mediação e pactuação extrajudicial de conflitos familiares'
      ]
    },
    {
      id: 'digital-tax',
      name: 'Squad 02 — Direito Digital, Inovação, LGPD & Tributário',
      subtitle: 'Compliance Tecnológico & Eficiência Fiscal',
      description: 'Validade probatória frente à IA, proteção de dados pessoais (LGPD), contratos em nuvem, tributação de negócios digitais e cidadania europeia.',
      icon: Sparkles,
      color: 'blue',
      leadMemberId: 'leonardo-gutierrez',
      members: LAWYERS.filter(l => l.id === 'leonardo-gutierrez' || l.id === 'brenner-refundini'),
      keyHighlights: [
        'Auditoria e governança contínua de privacidade perante a ANPD',
        'Blindagem contratual de assinaturas eletrônicas e provas digitais',
        'Planejamento contábil e fiscal de estruturas corporativas'
      ]
    },
    {
      id: 'corporate-ma',
      name: 'Squad 03 — Empresarial Estratégico, Societário & M&A',
      subtitle: 'Arquitetura Corporativa & Expansão Segura',
      description: 'Acordos de acionistas/cotistas, resolução de conflitos societários, apuração de haveres, contratos comerciais complexos e suporte a fusões & aquisições.',
      icon: Briefcase,
      color: 'emerald',
      leadMemberId: 'anderson-bispo',
      members: LAWYERS.filter(l => l.id === 'anderson-bispo' || l.id === 'paulo-faria-neto'),
      keyHighlights: [
        'Mais de 20 anos de experiência em disputas societárias de grande porte',
        'Governança corporativa orientada à preservação da empresa',
        'Elaboração de contratos com mitigação prévia de contingências'
      ]
    },
    {
      id: 'dispute-realestate',
      name: 'Squad 04 — Contencioso Estratégico, Imobiliário & Consumo',
      subtitle: 'Defesa Corporativa & Relações Contratuais',
      description: 'Atuação célere em litígios cíveis, ações renovatórias de locação, defesas coletivas perante o PROCON e gestão de contencioso de volume.',
      icon: Layers,
      color: 'purple',
      leadMemberId: 'pedro-sirna',
      members: LAWYERS.filter(l => l.id === 'pedro-sirna' || l.id === 'paulo-faria-neto'),
      keyHighlights: [
        'Defesa estratégica de empresas em Juizados Especiais e Varas Cíveis',
        'Estruturação de operações imobiliárias e garantias reais',
        'Redução comprovada de despesas com contingências judiciais'
      ]
    }
  ];

  const specialties = [
    'Todos',
    'Planejamento Patrimonial',
    'Família & Sucessões',
    'Direito Digital',
    'Societário & M&A',
    'Tributário & Controladoria',
    'Consumidor & Imobiliário'
  ];

  const filteredLawyers = LAWYERS.filter((lawyer) => {
    if (selectedSpecialty === 'Todos') return true;
    if (selectedSpecialty === 'Planejamento Patrimonial') return lawyer.areas.some(a => a.includes('Patrimonial') || a.includes('Holdings'));
    if (selectedSpecialty === 'Família & Sucessões') return lawyer.areas.some(a => a.includes('Família') || a.includes('Sucessões'));
    if (selectedSpecialty === 'Direito Digital') return lawyer.areas.some(a => a.includes('Digital') || a.includes('LGPD'));
    if (selectedSpecialty === 'Societário & M&A') return lawyer.areas.some(a => a.includes('Societário') || a.includes('Empresarial') || a.includes('M&A'));
    if (selectedSpecialty === 'Tributário & Controladoria') return lawyer.areas.some(a => a.includes('Tributár') || a.includes('Contábil') || a.includes('Controladoria'));
    if (selectedSpecialty === 'Consumidor & Imobiliário') return lawyer.areas.some(a => a.includes('Consumidor') || a.includes('Imobiliário') || a.includes('Cível'));
    return true;
  });

  return (
    <section id="equipe" className="border-b border-slate-800/80 bg-[#0e1626] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#c5a880]">
              <Users className="h-4 w-4" />
              <span>BANCA JURÍDICA & SQUADS ESTRATÉGICOS</span>
            </div>
            <h2 className="mt-2 text-3xl font-normal text-slate-100 sm:text-4xl">
              Corpo Jurídico estruturado por núcleos de alta excelência.
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">
              Superamos o modelo tradicional de galeria estática: nossa banca opera em <strong>Squads Multidisciplinares</strong>, combinando advogados seniores, especialistas em tecnologia e controladoria para atender demandas complexas de ponta a ponta.
            </p>
          </div>

          {/* View Mode Selector: Squads vs Individual Profiles */}
          <div className="flex items-center rounded-sm border border-slate-800 bg-[#090f1d] p-1 shadow-sm">
            <button
              onClick={() => setViewMode('squads')}
              className={`flex items-center gap-1.5 rounded-sm px-3.5 py-1.5 text-xs font-medium transition-colors ${
                viewMode === 'squads'
                  ? 'bg-[#c5a880] text-[#0b111e] font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>Squads por Prática</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 rounded-sm px-3.5 py-1.5 text-xs font-medium transition-colors ${
                viewMode === 'grid'
                  ? 'bg-[#c5a880] text-[#0b111e] font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>Dossiês Individuais (6)</span>
            </button>
          </div>
        </div>

        {/* VIEW MODE 1: SQUADS POR PRÁTICA (MODERN & STRATEGIC) */}
        {viewMode === 'squads' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 space-y-8"
          >
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {squads.map((squad) => {
                const SquadIcon = squad.icon;

                return (
                  <div
                    key={squad.id}
                    className="flex flex-col justify-between rounded-sm border border-slate-800 bg-[#0b111e] p-7 transition-all duration-300 hover:border-[#c5a880]/60 hover:shadow-xl hover:shadow-black/50"
                  >
                    <div>
                      {/* Squad Header */}
                      <div className="flex items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
                        <div>
                          <span className="text-[11px] font-mono uppercase tracking-wider text-[#c5a880]">
                            {squad.subtitle}
                          </span>
                          <h3 className="mt-1 text-lg font-semibold text-slate-100 sm:text-xl">
                            {squad.name}
                          </h3>
                        </div>
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-[#c5a880]/30 bg-slate-900 text-[#c5a880]">
                          <SquadIcon className="h-5 w-5" />
                        </div>
                      </div>

                      <p className="mt-4 text-xs leading-relaxed text-slate-300">
                        {squad.description}
                      </p>

                      {/* Key Highlights */}
                      <div className="mt-5 rounded-sm border border-slate-800/80 bg-[#070c17] p-3.5">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                          Competências & Entregáveis do Squad:
                        </span>
                        <ul className="space-y-1.5 text-xs text-slate-300">
                          {squad.keyHighlights.map((hl, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{hl}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Squad Members Avatars / Mini Cards */}
                      <div className="mt-6 border-t border-slate-800/80 pt-5">
                        <span className="text-[11px] font-medium text-slate-400 block mb-3">
                          Profissionais Integrantes do Squad:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {squad.members.map((member) => (
                            <div
                              key={member.id}
                              onClick={() => setActiveDossier(member)}
                              className="group/mem flex items-center gap-3 rounded-sm border border-slate-800/80 bg-[#0e1626] p-2.5 cursor-pointer hover:border-[#c5a880]/60 transition-colors"
                            >
                              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-sm bg-slate-800">
                                <img
                                  src={member.photoUrl}
                                  alt={member.name}
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                  }}
                                  className="h-full w-full object-cover object-top filter grayscale contrast-110 group-hover/mem:grayscale-0 transition-all duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                              </div>
                              <div className="min-w-0">
                                <span className="font-semibold text-xs text-slate-200 group-hover/mem:text-[#c5a880] transition-colors truncate block">
                                  {member.name}
                                </span>
                                <span className="text-[10px] font-mono text-[#c5a880] block">
                                  {member.oab}
                                </span>
                                <span className="text-[10px] text-slate-400 truncate block">
                                  {member.squadRole}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Squad CTA */}
                    <div className="mt-7 flex items-center justify-between border-t border-slate-800/80 pt-4">
                      <span className="text-[11px] text-slate-500">
                        Atendimento Integrado & Sigilo
                      </span>
                      <button
                        onClick={() => onScheduleWithPartner(squad.id === 'wealth-family' ? 'patrimonial-sucessorio' : squad.id === 'digital-tax' ? 'digital-lgpd-cidadania' : squad.id === 'corporate-ma' ? 'empresarial-societario' : 'contratos')}
                        className="flex items-center gap-1.5 text-xs font-semibold text-[#c5a880] hover:text-[#d8be98] cursor-pointer"
                      >
                        <span>Acionar este Squad</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* VIEW MODE 2: DOSSIÊS INDIVIDUAIS (GRID WITH EXPANDABLE DETAILS) */}
        {viewMode === 'grid' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8"
          >
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-5">
              <span className="text-xs text-slate-500 mr-2">Filtrar por Especialidade:</span>
              {specialties.map((spec) => (
                <button
                  key={spec}
                  onClick={() => setSelectedSpecialty(spec)}
                  className={`rounded-sm px-3 py-1 text-xs transition-colors cursor-pointer ${
                    selectedSpecialty === spec
                      ? 'bg-[#c5a880] text-[#0b111e] font-semibold'
                      : 'border border-slate-800 bg-[#090f1d] text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>

            {/* Lawyers Grid */}
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 items-start">
              {filteredLawyers.map((lawyer) => {
                const isCardExpanded = expandedCardId === lawyer.id;

                return (
                  <motion.div
                    key={lawyer.id}
                    layout
                    transition={{ layout: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
                    className={`group flex flex-col justify-between rounded-sm border overflow-hidden transition-all duration-300 ${
                      isCardExpanded 
                        ? 'border-[#c5a880]/80 bg-[#0d1629] shadow-2xl ring-1 ring-[#c5a880]/30' 
                        : 'border-slate-800 bg-[#0b111e] hover:border-[#c5a880]/50 hover:bg-[#0c1424]'
                    }`}
                  >
                    <div>
                      {/* Photo Section */}
                      <div className="relative aspect-[4/4.2] w-full overflow-hidden bg-slate-900">
                        <img
                          src={lawyer.photoUrl}
                          alt={lawyer.name}
                          onError={(e) => {
                            const target = e.currentTarget;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent && !parent.querySelector('.avatar-fallback')) {
                              const fallback = document.createElement('div');
                              fallback.className = 'avatar-fallback absolute inset-0 flex flex-col items-center justify-center bg-[#0d1627] text-[#c5a880] p-4 text-center';
                              fallback.innerHTML = `<div class="h-16 w-16 rounded-full border border-[#c5a880]/40 flex items-center justify-center text-xl font-serif mb-2 bg-slate-900/60 font-bold">${lawyer.name.split(' ').map(n=>n[0]).slice(0,2).join('')}</div><span class="text-xs text-slate-400 font-mono">${lawyer.oab}</span>`;
                              parent.appendChild(fallback);
                            }
                          }}
                          className="h-full w-full object-cover object-top filter grayscale contrast-110 transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b111e] via-[#0b111e]/30 to-transparent opacity-95" />
                        
                        <div className="absolute top-3 right-3 flex items-center gap-1.5">
                          <span className="rounded bg-slate-900/80 backdrop-blur-sm border border-slate-800 px-2 py-0.5 text-[10px] font-mono text-[#c5a880]">
                            {lawyer.oab}
                          </span>
                        </div>

                        <div className="absolute bottom-3 left-4 right-4">
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#c5a880]">
                            {lawyer.squadRole}
                          </span>
                          <h3 className="text-lg font-medium text-slate-100">
                            {lawyer.name}
                          </h3>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-5">
                        <p className={`text-xs leading-relaxed text-slate-300 ${isCardExpanded ? '' : 'line-clamp-3'}`}>
                          {lawyer.bio}
                        </p>

                        {/* Quote Pill */}
                        {lawyer.featuredQuote && (
                          <div className="mt-3.5 flex items-start gap-2 rounded bg-slate-900/60 p-2.5 border border-slate-800/60">
                            <Quote className="h-3.5 w-3.5 text-[#c5a880] shrink-0 mt-0.5" />
                            <p className="text-[11px] text-slate-300 italic leading-snug">
                              "{lawyer.featuredQuote}"
                            </p>
                          </div>
                        )}

                        {/* Expandable Extended Details */}
                        <AnimatePresence initial={false}>
                          {isCardExpanded && (
                            <motion.div
                              key="extended"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ 
                                opacity: 1, 
                                height: 'auto',
                                transition: {
                                  height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                                  opacity: { duration: 0.25, delay: 0.05 }
                                }
                              }}
                              exit={{ 
                                opacity: 0, 
                                height: 0,
                                transition: {
                                  height: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
                                  opacity: { duration: 0.15 }
                                }
                              }}
                              className="overflow-hidden mt-4 pt-3.5 border-t border-slate-800/80 space-y-3"
                            >
                              {/* Education */}
                              <div>
                                <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#c5a880] mb-1.5">
                                  <GraduationCap className="h-3.5 w-3.5" />
                                  <span>Formação & Títulos</span>
                                </div>
                                <ul className="space-y-1 text-[11px] text-slate-400">
                                  {lawyer.education.map((edu, idx) => (
                                    <li key={idx} className="flex items-start gap-1.5">
                                      <span className="text-[#c5a880]">•</span>
                                      <span>{edu}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Specialties */}
                              <div>
                                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                                  Especialidades:
                                </span>
                                <div className="flex flex-wrap gap-1">
                                  {lawyer.areas.map((ar, aIdx) => (
                                    <span key={aIdx} className="rounded bg-slate-900 border border-slate-800 px-2 py-0.5 text-[10px] text-slate-300">
                                      {ar}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Expand Toggle */}
                        <div className="mt-4 flex items-center justify-between border-t border-slate-800/60 pt-3 text-xs">
                          <button
                            type="button"
                            onClick={() => setExpandedCardId(isCardExpanded ? null : lawyer.id)}
                            className="flex items-center gap-1 text-[11px] font-medium text-[#c5a880] hover:underline cursor-pointer"
                          >
                            <span>{isCardExpanded ? 'Recolher Perfil' : 'Expandir Credenciais'}</span>
                            <motion.div
                              animate={{ rotate: isCardExpanded ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown className="h-3.5 w-3.5" />
                            </motion.div>
                          </button>

                          <button
                            type="button"
                            onClick={() => setActiveDossier(lawyer)}
                            className="flex items-center gap-1 text-[11px] font-semibold text-slate-300 hover:text-white cursor-pointer"
                          >
                            <span>Dossiê Completo</span>
                            <ExternalLink className="h-3 w-3 text-[#c5a880]" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="border-t border-slate-800/80 p-3.5 bg-slate-950/40 flex items-center justify-between">
                      <button
                        onClick={() => onScheduleWithPartner(lawyer.id === 'victor-cartes' ? 'patrimonial-sucessorio' : lawyer.id === 'anderson-bispo' ? 'empresarial-societario' : lawyer.id === 'pedro-sirna' ? 'consumidor' : 'contratos')}
                        className="text-[11px] font-semibold uppercase tracking-wider text-[#c5a880] hover:text-[#d8be98] cursor-pointer"
                      >
                        Agendar com este Sócio
                      </button>

                      <div className="flex items-center gap-2">
                        <a
                          href={`mailto:${lawyer.email}`}
                          className="p-1 text-slate-400 hover:text-white"
                          title={`Enviar e-mail para ${lawyer.email}`}
                        >
                          <Mail className="h-3.5 w-3.5" />
                        </a>
                        <a
                          href={lawyer.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 text-slate-400 hover:text-[#c5a880]"
                          title="LinkedIn"
                        >
                          <Linkedin className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

      </div>

      {/* MODAL DOSSIÊ COMPLETO COM FRAMER MOTION */}
      <AnimatePresence>
        {activeDossier && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-sm border border-slate-700 bg-[#0d1527] p-6 shadow-2xl sm:p-9"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveDossier(null)}
                className="absolute top-5 right-5 rounded-sm border border-slate-700 bg-slate-800 p-2 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Dossier Header */}
              <div className="flex flex-col sm:flex-row items-start gap-6 border-b border-slate-800 pb-6 pr-8">
                <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-sm border border-[#c5a880]/40 bg-slate-900 shadow-lg">
                  <img
                    src={activeDossier.photoUrl}
                    alt={activeDossier.name}
                    className="h-full w-full object-cover object-top"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#c5a880]">
                      {activeDossier.oab}
                    </span>
                    <span className="text-slate-600">·</span>
                    <span className="text-xs text-slate-400">
                      {activeDossier.squad}
                    </span>
                  </div>
                  <h3 className="mt-1 text-2xl font-normal text-slate-100 sm:text-3xl">
                    {activeDossier.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#c5a880] mt-1">
                    {activeDossier.role}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    URL Institucional Oficial: <code className="text-slate-300 font-mono">https://cartesadvogados.com.br/{activeDossier.slug}/</code>
                  </p>
                </div>
              </div>

              {/* Full Bio */}
              <div className="mt-6">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Trajetória & Filosofia de Atuação
                </h4>
                <p className="text-sm leading-relaxed text-slate-200">
                  {activeDossier.bio}
                </p>
              </div>

              {/* Quote */}
              {activeDossier.featuredQuote && (
                <div className="mt-5 rounded border border-[#c5a880]/30 bg-[#09101f] p-4 text-xs italic text-[#c5a880]">
                  "{activeDossier.featuredQuote}"
                </div>
              )}

              {/* Education & Credentials */}
              <div className="mt-6 border-t border-slate-800 pt-5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
                  <GraduationCap className="h-4 w-4 text-[#c5a880]" />
                  <span>Formação Acadêmica & Qualificações</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {activeDossier.education.map((edu, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#c5a880]">•</span>
                      <span>{edu}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Author's Articles from CMS */}
              {ARTICLES.some(a => a.author.name === activeDossier.name) && (
                <div className="mt-6 border-t border-slate-800 pt-5">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
                    <FileText className="h-4 w-4 text-[#c5a880]" />
                    <span>Publicações de Autoria deste Membro no Blog</span>
                  </h4>
                  <div className="space-y-2">
                    {ARTICLES.filter(a => a.author.name === activeDossier.name).map((art) => (
                      <div key={art.id} className="rounded border border-slate-800 bg-[#070c17] p-3 text-xs flex items-center justify-between">
                        <div>
                          <strong className="text-slate-200 block">{art.title}</strong>
                          <span className="text-[11px] text-slate-500">{art.publishedAt} · {art.readTime}</span>
                        </div>
                        <a
                          href={`#artigos`}
                          onClick={() => setActiveDossier(null)}
                          className="text-[#c5a880] hover:underline text-[11px] font-semibold shrink-0 ml-3"
                        >
                          Ler Artigo
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800 pt-6">
                <div className="flex items-center gap-3">
                  <a
                    href={`mailto:${activeDossier.email}`}
                    className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white"
                  >
                    <Mail className="h-4 w-4" />
                    <span>{activeDossier.email}</span>
                  </a>
                  <span className="text-slate-600">·</span>
                  <a
                    href={activeDossier.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-[#c5a880] hover:underline"
                  >
                    <Linkedin className="h-4 w-4" />
                    <span>LinkedIn</span>
                  </a>
                </div>

                <button
                  onClick={() => {
                    const lawyerArea = activeDossier.id === 'victor-cartes' ? 'patrimonial-sucessorio' : activeDossier.id === 'anderson-bispo' ? 'empresarial-societario' : activeDossier.id === 'pedro-sirna' ? 'consumidor' : 'contratos';
                    setActiveDossier(null);
                    onScheduleWithPartner(lawyerArea);
                  }}
                  className="w-full sm:w-auto rounded-sm bg-[#c5a880] px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-[#0b111e] hover:bg-[#d8be98] transition-colors cursor-pointer"
                >
                  Agendar Reunião com {activeDossier.name.split(' ')[0]} {activeDossier.name.split(' ')[1]}
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};
