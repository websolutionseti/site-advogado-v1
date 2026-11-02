import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Scale, 
  Building2, 
  Briefcase, 
  ShieldAlert, 
  FileText, 
  Landmark, 
  ArrowRight, 
  X, 
  CheckCircle2, 
  UserCheck,
  ChevronDown,
  Layers,
  Sparkles
} from 'lucide-react';
import { PracticeArea } from '../types';
import { PRACTICE_AREAS } from '../data/mockData';

interface PracticeAreasProps {
  onSelectAreaForIntake: (areaId: string) => void;
}

export const PracticeAreas: React.FC<PracticeAreasProps> = ({ onSelectAreaForIntake }) => {
  const [selectedArea, setSelectedArea] = useState<PracticeArea | null>(null);
  const [expandedAreaId, setExpandedAreaId] = useState<string | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Scale':
        return <Scale className="h-6 w-6 text-[#c5a880]" />;
      case 'Building2':
        return <Building2 className="h-6 w-6 text-[#c5a880]" />;
      case 'Briefcase':
        return <Briefcase className="h-6 w-6 text-[#c5a880]" />;
      case 'ShieldAlert':
        return <ShieldAlert className="h-6 w-6 text-[#c5a880]" />;
      case 'FileText':
        return <FileText className="h-6 w-6 text-[#c5a880]" />;
      case 'Landmark':
        return <Landmark className="h-6 w-6 text-[#c5a880]" />;
      default:
        return <Scale className="h-6 w-6 text-[#c5a880]" />;
    }
  };

  const toggleExpand = (areaId: string) => {
    setExpandedAreaId(prev => prev === areaId ? null : areaId);
  };

  return (
    <section id="areas" className="border-b border-slate-800/80 bg-[#0e1626] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c5a880]">
              PRÁTICAS JURÍDICAS ESPECIALIZADAS
            </span>
            <h2 className="mt-2 text-3xl font-normal text-slate-100 sm:text-4xl">
              Soluções sob medida para operações e litígios críticos.
            </h2>
          </div>
          <p className="max-w-md text-sm text-slate-400">
            Cada área é liderada por sócios com sólida formação acadêmica e histórico comprovado de vitórias em casos de alta repercussão econômica.
          </p>
        </div>

        {/* Practice Areas Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PRACTICE_AREAS.map((area, index) => {
            const isExpanded = expandedAreaId === area.id;

            return (
              <motion.div
                key={area.id}
                layout
                transition={{ layout: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
                className={`group flex flex-col justify-between rounded-sm border transition-all duration-300 ${
                  isExpanded 
                    ? 'border-[#c5a880]/70 bg-[#0d1629] shadow-xl shadow-black/50 ring-1 ring-[#c5a880]/20' 
                    : 'border-slate-800 bg-[#0b111e]/90 hover:border-[#c5a880]/50 hover:bg-[#0d1527] hover:shadow-lg hover:shadow-black/40'
                }`}
              >
                <div className="p-7">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-sm border border-slate-800 bg-slate-900/90 group-hover:border-[#c5a880]/40 transition-colors">
                      {getIcon(area.iconName)}
                    </div>
                    <span className="font-serif-legal text-sm text-slate-500">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-normal text-slate-100 group-hover:text-[#c5a880] transition-colors">
                    {area.title}
                  </h3>
                  
                  <p className="mt-1 text-xs text-slate-400">
                    {area.subtitle}
                  </p>

                  <p className="mt-4 text-sm leading-relaxed text-slate-300">
                    {area.description}
                  </p>

                  {/* Inline Expandable Details with Framer Motion */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        key="expanded-content"
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
                        className="overflow-hidden pt-5 mt-5 border-t border-slate-800/80"
                      >
                        {/* Scope list */}
                        <div>
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#c5a880] block mb-2">
                            Escopo Principal de Atuação
                          </span>
                          <ul className="space-y-1.5 text-xs text-slate-300">
                            {area.scopeList.slice(0, 3).map((scope, sIdx) => (
                              <li key={sIdx} className="flex items-start gap-2">
                                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                                <span>{scope}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Representative case sample */}
                        {area.representativeCases[0] && (
                          <div className="mt-4 rounded border border-slate-800 bg-[#070b14] p-3 text-xs">
                            <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">
                              Precedente de Destaque:
                            </span>
                            <strong className="text-slate-200 block text-xs">
                              {area.representativeCases[0].title}
                            </strong>
                            <p className="text-[11px] text-[#c5a880] mt-1">
                              {area.representativeCases[0].result}
                            </p>
                          </div>
                        )}

                        {/* Layout Image Preview */}
                        {area.imageUrl && (
                          <div className="mt-4 relative h-28 w-full overflow-hidden rounded-sm border border-slate-800/80">
                            <img
                              src={area.imageUrl}
                              alt={`Contexto de ${area.title}`}
                              referrerPolicy="no-referrer"
                              className="h-full w-full object-cover filter contrast-105 opacity-80"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1629] via-transparent to-transparent" />
                          </div>
                        )}

                        {/* Partner in Charge badge */}
                        <div className="mt-4 flex items-center justify-between text-xs pt-3 border-t border-slate-800/60">
                          <span className="text-slate-400">Responsável: <strong className="text-slate-200">{area.leadPartner}</strong></span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Card Footer Actions */}
                <div className="border-t border-slate-800/80 p-5 bg-[#090f1d]/50 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => toggleExpand(area.id)}
                    className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <span>{isExpanded ? 'Recolher Detalhes' : 'Expandir Escopo'}</span>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-3.5 w-3.5" />
                    </motion.div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedArea(area)}
                    className="flex items-center gap-1 text-xs font-semibold tracking-wider uppercase text-[#c5a880] hover:text-[#d8be98] cursor-pointer"
                  >
                    <span>Dossiê Completo</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Deep-Dive Modal with Framer Motion Spring */}
      <AnimatePresence>
        {selectedArea && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-sm border border-slate-700 bg-[#0d1527] p-6 shadow-2xl sm:p-9"
            >
              {/* Modal Close Button */}
              <button
                onClick={() => setSelectedArea(null)}
                className="absolute top-5 right-5 rounded-sm border border-slate-700 bg-slate-800 p-2 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Modal Banner if available */}
              {selectedArea.imageUrl && (
                <div className="relative mb-6 -mt-2 h-44 w-full overflow-hidden rounded-sm border border-slate-700/80">
                  <img
                    src={selectedArea.imageUrl}
                    alt={selectedArea.title}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover filter contrast-105 opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1527] via-[#0d1527]/40 to-transparent" />
                </div>
              )}

              {/* Modal Header */}
              <div className="pr-8">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#c5a880]">
                  <span>Área de Prática</span>
                  <span aria-hidden="true">·</span>
                  <span>Cartes Advogados</span>
                </div>
                <h3 className="mt-2 text-2xl font-normal text-slate-100 sm:text-3xl">
                  {selectedArea.title}
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                  {selectedArea.subtitle}
                </p>
              </div>

              {/* Full description */}
              <p className="mt-6 text-sm leading-relaxed text-slate-200">
                {selectedArea.fullDescription}
              </p>

              {/* Scope of Work */}
              <div className="mt-7 border-t border-slate-800 pt-6">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Escopo de Atuação & Metodologia
                </h4>
                <ul className="mt-3 space-y-2.5">
                  {selectedArea.scopeList.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#c5a880]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Representative Cases */}
              <div className="mt-7 border-t border-slate-800 pt-6">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Casos Representativos & Precedentes
                </h4>
                <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {selectedArea.representativeCases.map((c, idx) => (
                    <div key={idx} className="rounded-sm border border-slate-800 bg-[#0b111e] p-4">
                      <span className="text-xs font-semibold text-slate-200">
                        {c.title}
                      </span>
                      <p className="mt-1 text-xs text-slate-400">
                        {c.description}
                      </p>
                      <div className="mt-3 border-t border-slate-800/80 pt-2 text-xs font-medium text-[#c5a880]">
                        Resultado: {c.result}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Partner in Charge & Action */}
              <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-slate-800 pt-6 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-slate-800 text-[#c5a880]">
                    <UserCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-200">
                      {selectedArea.leadPartner}
                    </span>
                    <p className="text-[11px] text-slate-400">
                      {selectedArea.partnerRole}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    const areaId = selectedArea.id;
                    setSelectedArea(null);
                    onSelectAreaForIntake(areaId);
                  }}
                  className="w-full sm:w-auto rounded-sm bg-[#c5a880] px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-[#0b111e] transition-all hover:bg-[#d8be98] cursor-pointer"
                >
                  Agendar nesta Área
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
