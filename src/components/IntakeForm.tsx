import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  User, 
  Clock, 
  Calendar, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  MessageSquare, 
  ArrowRight, 
  ArrowLeft,
  FileCheck2,
  ExternalLink,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { ConsultationLead } from '../types';
import { PRACTICE_AREAS } from '../data/mockData';
import { getLeadCache, saveLeadCache } from '../services/leadCache';

interface IntakeFormProps {
  initialAreaId?: string;
  onLeadSubmitted: (lead: ConsultationLead) => void;
  onViewInN8n: (protocol: string) => void;
}

export const IntakeForm: React.FC<IntakeFormProps> = ({ 
  initialAreaId, 
  onLeadSubmitted, 
  onViewInN8n 
}) => {
  const [step, setStep] = useState<number>(1);
  const [clientType, setClientType] = useState<'PJ' | 'PF'>('PJ');
  const [companyName, setCompanyName] = useState('');
  const [companySegment, setCompanySegment] = useState('');
  const [revenueRange, setRevenueRange] = useState('R$ 10M a R$ 50M/ano');
  
  const [practiceArea, setPracticeArea] = useState(initialAreaId || 'tributario');
  const [demandNature, setDemandNature] = useState('preventiva');
  
  const [hasJudicialDeadline, setHasJudicialDeadline] = useState(false);
  const [deadlineDays, setDeadlineDays] = useState<number>(5);
  const [caseSummary, setCaseSummary] = useState('');
  
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [meetingPreference, setMeetingPreference] = useState<'google_meet' | 'presencial_sp'>('google_meet');
  const [preferredTimeSlot, setPreferredTimeSlot] = useState<'manha' | 'tarde'>('tarde');
  const [acceptedTerms, setAcceptedTerms] = useState(true);

  const [submittedLead, setSubmittedLead] = useState<ConsultationLead | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isFromCache, setIsFromCache] = useState(false);

  // Carregar dados de cache (Chatwoot / sessões anteriores)
  useEffect(() => {
    const cached = getLeadCache();
    if (cached.contactName || cached.email || cached.phone || cached.companyName) {
      if (cached.contactName) setContactName(cached.contactName);
      if (cached.email) setEmail(cached.email);
      if (cached.phone) setPhone(cached.phone);
      if (cached.companyName) setCompanyName(cached.companyName);
      setIsFromCache(true);
    }

    // Ouvir atualizações de cache emitidas pelo Chatwoot
    const handleCacheUpdated = (e: any) => {
      const data = e.detail;
      if (data) {
        if (data.contactName) setContactName(data.contactName);
        if (data.email) setEmail(data.email);
        if (data.phone) setPhone(data.phone);
        if (data.companyName) setCompanyName(data.companyName);
        setIsFromCache(true);
      }
    };

    window.addEventListener('cartes:lead-cache-updated', handleCacheUpdated);
    return () => window.removeEventListener('cartes:lead-cache-updated', handleCacheUpdated);
  }, []);

  useEffect(() => {
    if (initialAreaId) {
      setPracticeArea(initialAreaId);
    }
  }, [initialAreaId]);

  const calculateUrgency = (): 'baixa' | 'media' | 'alta' | 'critica' => {
    if (hasJudicialDeadline) {
      if (deadlineDays <= 2) return 'critica';
      if (deadlineDays <= 5) return 'alta';
      return 'media';
    }
    const lower = caseSummary.toLowerCase();
    if (lower.includes('bloqueio') || lower.includes('penhora') || lower.includes('liminar') || lower.includes('urgente')) {
      return 'alta';
    }
    return 'media';
  };

  const getAssignedPartner = (areaId: string): string => {
    const area = PRACTICE_AREAS.find(a => a.id === areaId);
    return area ? area.leadPartner : 'Dr. Guilherme Cartes';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !email || !phone) return;

    setIsSubmitting(true);
    
    // Generate unique legal protocol
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const protocol = `CRT-2026-${randomNum}`;
    const urgency = calculateUrgency();
    const assignedPartner = getAssignedPartner(practiceArea);

    const lead: ConsultationLead = {
      protocol,
      timestamp: new Date().toISOString(),
      clientType,
      companyName: clientType === 'PJ' ? companyName || 'Não informado' : undefined,
      companySegment: clientType === 'PJ' ? companySegment : undefined,
      revenueRange: clientType === 'PJ' ? revenueRange : undefined,
      contactName,
      email,
      phone,
      practiceArea,
      urgency,
      hasJudicialDeadline,
      deadlineDays: hasJudicialDeadline ? deadlineDays : undefined,
      caseSummary: caseSummary || 'Diagnóstico preliminar solicitado via portal institucional.',
      meetingPreference,
      preferredTimeSlot,
      assignedPartner,
      origin: 'cartes_intake_web'
    };

    setTimeout(() => {
      // Salvar no cache e sincronizar com Chatwoot
      saveLeadCache({
        contactName,
        email,
        phone,
        companyName: clientType === 'PJ' ? companyName : undefined,
        source: 'intake_form'
      });

      setIsSubmitting(false);
      setSubmittedLead(lead);
      onLeadSubmitted(lead);
    }, 600);
  };

  const resetForm = () => {
    setSubmittedLead(null);
    setStep(1);
    setCaseSummary('');
    setHasJudicialDeadline(false);
  };

  return (
    <section id="intake" className="border-b border-slate-800/80 bg-[#0b111e] py-20 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c5a880]">
            ATENDIMENTO INSTITUCIONAL & TRIAGEM DE CASOS
          </span>
          <h2 className="mt-2 text-3xl font-normal text-slate-100 sm:text-4xl">
            Diagnóstico Jurídico Preliminar & Agendamento
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            Estrutura sigilosa para qualificação rápida de demandas corporativas, prazos peremptórios e direcionamento imediato ao sócio especialista.
          </p>
        </div>

        {/* Confirmation Screen */}
        {submittedLead ? (
          <div className="mt-12 rounded-sm border border-slate-700 bg-[#0e1626] p-8 shadow-2xl sm:p-10">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <FileCheck2 className="h-7 w-7" />
              </div>
              
              <span className="mt-4 text-xs font-semibold uppercase tracking-widest text-[#c5a880]">
                SOLICITAÇÃO PROTOCOLADA COM SUCESSO
              </span>
              
              <h3 className="mt-1 text-2xl font-normal text-slate-100">
                Protocolo: <span className="font-mono text-[#c5a880]">{submittedLead.protocol}</span>
              </h3>
              
              <p className="mt-2 max-w-lg text-sm text-slate-300">
                Os dados foram registrados de forma sigilosa em conformidade com o Código de Ética da OAB e a LGPD. O fluxo automatizado encaminhou o caso para análise da banca.
              </p>
            </div>

            {/* Case Summary Details */}
            <div className="mt-8 rounded-sm border border-slate-800 bg-[#0b111e] p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-xs">
                <div>
                  <span className="text-slate-500">Solicitante:</span>
                  <p className="font-medium text-slate-200 mt-0.5">{submittedLead.contactName}</p>
                </div>
                {submittedLead.companyName && (
                  <div>
                    <span className="text-slate-500">Empresa / Razão Social:</span>
                    <p className="font-medium text-slate-200 mt-0.5">{submittedLead.companyName}</p>
                  </div>
                )}
                <div>
                  <span className="text-slate-500">Área Jurídica:</span>
                  <p className="font-medium text-slate-200 mt-0.5 capitalize">{submittedLead.practiceArea}</p>
                </div>
                <div>
                  <span className="text-slate-500">Sócio Responsável Atribuído:</span>
                  <p className="font-medium text-[#c5a880] mt-0.5">{submittedLead.assignedPartner}</p>
                </div>
                <div>
                  <span className="text-slate-500">Nível de Urgência Classificado:</span>
                  <p className="font-medium uppercase mt-0.5 text-slate-200">
                    {submittedLead.urgency} {submittedLead.hasJudicialDeadline ? `(Prazo de ${submittedLead.deadlineDays} dias)` : ''}
                  </p>
                </div>
                <div>
                  <span className="text-slate-500">Previsão de Retorno:</span>
                  <p className="font-medium text-emerald-400 mt-0.5">
                    {submittedLead.urgency === 'critica' || submittedLead.urgency === 'alta' ? 'Em até 2 horas úteis' : 'Em até 24 horas úteis'}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <a
                href={`https://wa.me/5511987654321?text=${encodeURIComponent(
                  `Olá, acabo de registrar o Protocolo ${submittedLead.protocol} no portal da Cartes Advogados. Sou ${submittedLead.contactName}${submittedLead.companyName ? ` da empresa ${submittedLead.companyName}` : ''}. Gostaria de confirmar o atendimento com ${submittedLead.assignedPartner}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-sm bg-emerald-600 px-5 py-3 text-xs font-semibold text-white transition-colors hover:bg-emerald-500"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Confirmar via WhatsApp Direto</span>
              </a>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => onViewInN8n(submittedLead.protocol)}
                  className="flex items-center justify-center gap-1.5 rounded-sm border border-slate-700 bg-slate-800 px-4 py-3 text-xs font-semibold text-slate-200 hover:border-[#c5a880] hover:text-[#c5a880]"
                >
                  <span>Ver Execução no n8n</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={resetForm}
                  className="rounded-sm border border-slate-800 px-4 py-3 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Novo Diagnóstico
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Intake Multi-step Wizard */
          <div className="mt-12 rounded-sm border border-slate-800 bg-[#0e1626] p-6 shadow-xl sm:p-10">
            
            {/* Step Indicator Header (Clean text separators, no pills) */}
            <div className="mb-8 border-b border-slate-800 pb-5">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold uppercase tracking-wider text-[#c5a880]">
                  Etapa {step} de 4
                </span>
                <div className="flex items-center gap-2">
                  <span className={step >= 1 ? 'text-slate-200 font-medium' : 'text-slate-600'}>01. Perfil</span>
                  <span className="text-slate-700">·</span>
                  <span className={step >= 2 ? 'text-slate-200 font-medium' : 'text-slate-600'}>02. Objeto</span>
                  <span className="text-slate-700">·</span>
                  <span className={step >= 3 ? 'text-slate-200 font-medium' : 'text-slate-600'}>03. Urgência</span>
                  <span className="text-slate-700">·</span>
                  <span className={step >= 4 ? 'text-slate-200 font-medium' : 'text-slate-600'}>04. Contato</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              
              {/* STEP 1: Perfil do Contratante */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                      Tipo de Contratante
                    </label>
                    <div className="mt-3 grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setClientType('PJ')}
                        className={`flex items-center justify-center gap-3 rounded-sm border p-4 text-xs font-semibold transition-all ${
                          clientType === 'PJ'
                            ? 'border-[#c5a880] bg-[#c5a880]/10 text-slate-100 shadow-sm'
                            : 'border-slate-800 bg-[#0b111e] text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <Building2 className="h-4 w-4 text-[#c5a880]" />
                        <span>Pessoa Jurídica (Empresa)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setClientType('PF')}
                        className={`flex items-center justify-center gap-3 rounded-sm border p-4 text-xs font-semibold transition-all ${
                          clientType === 'PF'
                            ? 'border-[#c5a880] bg-[#c5a880]/10 text-slate-100 shadow-sm'
                            : 'border-slate-800 bg-[#0b111e] text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <User className="h-4 w-4 text-[#c5a880]" />
                        <span>Pessoa Física / Sócio Executivo</span>
                      </button>
                    </div>
                  </div>

                  {clientType === 'PJ' && (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-medium text-slate-300">
                          Razão Social ou Nome Fantasia
                        </label>
                        <input
                          type="text"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="Ex.: Inovare Logística S.A."
                          className="mt-1.5 w-full rounded-sm border border-slate-700 bg-[#0b111e] px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:border-[#c5a880] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-300">
                          Setor / Segmento de Atuação
                        </label>
                        <input
                          type="text"
                          value={companySegment}
                          onChange={(e) => setCompanySegment(e.target.value)}
                          placeholder="Ex.: Tecnologia / Indústria / Agronegócio"
                          className="mt-1.5 w-full rounded-sm border border-slate-700 bg-[#0b111e] px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:border-[#c5a880] focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-slate-300">
                          Faixa de Faturamento Anual Estimada
                        </label>
                        <select
                          value={revenueRange}
                          onChange={(e) => setRevenueRange(e.target.value)}
                          className="mt-1.5 w-full rounded-sm border border-slate-700 bg-[#0b111e] px-3.5 py-2.5 text-sm text-slate-100 focus:border-[#c5a880] focus:outline-none"
                        >
                          <option value="Até R$ 10M/ano">Até R$ 10M / ano</option>
                          <option value="R$ 10M a R$ 50M/ano">R$ 10M a R$ 50M / ano</option>
                          <option value="R$ 50M a R$ 200M/ano">R$ 50M a R$ 200M / ano</option>
                          <option value="Acima de R$ 200M/ano">Acima de R$ 200M / ano</option>
                        </select>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="flex items-center gap-2 rounded-sm bg-[#c5a880] px-6 py-2.5 text-xs font-semibold tracking-wider uppercase text-[#0b111e] hover:bg-[#d8be98]"
                    >
                      <span>Avançar para Objeto</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Objeto da Demanda */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                      Área Jurídica Principal
                    </label>
                    <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {PRACTICE_AREAS.map((area) => (
                        <button
                          key={area.id}
                          type="button"
                          onClick={() => setPracticeArea(area.id)}
                          className={`flex flex-col items-start rounded-sm border p-3.5 text-left transition-all ${
                            practiceArea === area.id
                              ? 'border-[#c5a880] bg-[#c5a880]/10 text-slate-100 shadow-sm'
                              : 'border-slate-800 bg-[#0b111e] text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <span className="text-xs font-semibold text-slate-200">{area.title}</span>
                          <span className="mt-1 text-[11px] text-slate-400 line-clamp-1">{area.subtitle}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                      Natureza da Atuação Requerida
                    </label>
                    <div className="mt-2.5 grid grid-cols-3 gap-3">
                      {[
                        { id: 'preventiva', label: 'Consultoria Preventiva & Parecer' },
                        { id: 'operacao', label: 'Operação / M&A / Contratos' },
                        { id: 'contencioso', label: 'Contencioso Judicial / CARF' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setDemandNature(item.id)}
                          className={`rounded-sm border p-3 text-center text-xs font-medium transition-all ${
                            demandNature === item.id
                              ? 'border-[#c5a880] bg-[#c5a880]/10 text-slate-100'
                              : 'border-slate-800 bg-[#0b111e] text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      <span>Voltar</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="flex items-center gap-2 rounded-sm bg-[#c5a880] px-6 py-2.5 text-xs font-semibold tracking-wider uppercase text-[#0b111e] hover:bg-[#d8be98]"
                    >
                      <span>Avançar para Urgência</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Urgência e Prazos Judiciais */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="rounded-sm border border-slate-800 bg-[#0b111e] p-5">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hasJudicialDeadline}
                        onChange={(e) => setHasJudicialDeadline(e.target.checked)}
                        className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-[#c5a880] focus:ring-0"
                      />
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-slate-200">
                          Existe notificação formal ou prazo processual judicial em aberto?
                        </span>
                        <span className="text-[11px] text-slate-400">
                          Marque para acionar roteamento prioritário com aviso imediato ao sócio de plantão.
                        </span>
                      </div>
                    </label>

                    {hasJudicialDeadline && (
                      <div className="mt-4 border-t border-slate-800 pt-4">
                        <label className="block text-xs font-medium text-amber-300">
                          Quantos dias úteis restam para cumprimento do prazo?
                        </label>
                        <div className="mt-2 flex items-center gap-3">
                          {[
                            { days: 2, label: 'Até 2 dias (Crítico)' },
                            { days: 5, label: '3 a 5 dias (Alto)' },
                            { days: 10, label: '6 a 10 dias (Médio)' },
                            { days: 15, label: 'Mais de 10 dias' }
                          ].map((option) => (
                            <button
                              key={option.days}
                              type="button"
                              onClick={() => setDeadlineDays(option.days)}
                              className={`rounded-sm border px-3 py-1.5 text-xs font-medium transition-all ${
                                deadlineDays === option.days
                                  ? 'border-amber-400 bg-amber-950/40 text-amber-200'
                                  : 'border-slate-800 bg-slate-900 text-slate-400'
                              }`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                      Síntese da Situação ou Controvérsia
                    </label>
                    <textarea
                      rows={4}
                      value={caseSummary}
                      onChange={(e) => setCaseSummary(e.target.value)}
                      placeholder="Descreva de forma concisa os fatos principais, valores em disputa ou objetivo da consulta..."
                      className="mt-2 w-full rounded-sm border border-slate-700 bg-[#0b111e] p-3 text-sm text-slate-100 placeholder-slate-500 focus:border-[#c5a880] focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      <span>Voltar</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(4)}
                      className="flex items-center gap-2 rounded-sm bg-[#c5a880] px-6 py-2.5 text-xs font-semibold tracking-wider uppercase text-[#0b111e] hover:bg-[#d8be98]"
                    >
                      <span>Avançar para Agendamento</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: Contato & Agendamento */}
              {step === 4 && (
                <div className="space-y-6">
                  {/* Banner de Dados Recuperados de Sessão / Chatwoot */}
                  {isFromCache && (
                    <div className="flex items-center gap-2 rounded-sm border border-sky-500/30 bg-sky-950/20 px-3.5 py-2.5 text-xs text-sky-300">
                      <Sparkles className="h-4 w-4 shrink-0 text-sky-400" />
                      <span>
                        Dados de contato pré-identificados via atendimento prévio (Chatwoot / Portal).
                      </span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-slate-300">
                        Nome Completo do Contato Responsável *
                      </label>
                      <input
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Ex.: Guilherme Puentes"
                        className="mt-1.5 w-full rounded-sm border border-slate-700 bg-[#0b111e] px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:border-[#c5a880] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300">
                        E-mail Corporativo *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="guilherme@empresa.com.br"
                        className="mt-1.5 w-full rounded-sm border border-slate-700 bg-[#0b111e] px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:border-[#c5a880] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300">
                        WhatsApp / Celular com DDD *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(11) 98765-4321"
                        className="mt-1.5 w-full rounded-sm border border-slate-700 bg-[#0b111e] px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:border-[#c5a880] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-medium text-slate-300">
                        Formato Preferencial de Reunião
                      </label>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setMeetingPreference('google_meet')}
                          className={`rounded-sm border p-2.5 text-xs font-medium ${
                            meetingPreference === 'google_meet'
                              ? 'border-[#c5a880] bg-[#c5a880]/10 text-slate-100'
                              : 'border-slate-800 bg-[#0b111e] text-slate-400'
                          }`}
                        >
                          Google Meet
                        </button>
                        <button
                          type="button"
                          onClick={() => setMeetingPreference('presencial_sp')}
                          className={`rounded-sm border p-2.5 text-xs font-medium ${
                            meetingPreference === 'presencial_sp'
                              ? 'border-[#c5a880] bg-[#c5a880]/10 text-slate-100'
                              : 'border-slate-800 bg-[#0b111e] text-slate-400'
                          }`}
                        >
                          Presencial (SP - Faria Lima)
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300">
                        Janela de Horário
                      </label>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setPreferredTimeSlot('manha')}
                          className={`rounded-sm border p-2.5 text-xs font-medium ${
                            preferredTimeSlot === 'manha'
                              ? 'border-[#c5a880] bg-[#c5a880]/10 text-slate-100'
                              : 'border-slate-800 bg-[#0b111e] text-slate-400'
                          }`}
                        >
                          Manhã (09h - 12h)
                        </button>
                        <button
                          type="button"
                          onClick={() => setPreferredTimeSlot('tarde')}
                          className={`rounded-sm border p-2.5 text-xs font-medium ${
                            preferredTimeSlot === 'tarde'
                              ? 'border-[#c5a880] bg-[#c5a880]/10 text-slate-100'
                              : 'border-slate-800 bg-[#0b111e] text-slate-400'
                          }`}
                        >
                          Tarde (14h - 18h)
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* LGPD & OAB confidentiality notice */}
                  <div className="flex items-start gap-2.5 rounded-sm border border-slate-800/80 bg-[#0b111e] p-3 text-xs text-slate-400">
                    <ShieldCheck className="h-4 w-4 shrink-0 text-[#c5a880]" />
                    <span>
                      Todas as informações fornecidas estão resguardadas pelo sigilo profissional (Estatuto da OAB) e protegidas conforme a LGPD.
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      <span>Voltar</span>
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || !contactName || !email || !phone}
                      className="flex items-center gap-2 rounded-sm bg-[#c5a880] px-8 py-3 text-xs font-semibold tracking-wider uppercase text-[#0b111e] hover:bg-[#d8be98] disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Processando Protocolo...</span>
                      ) : (
                        <>
                          <span>Finalizar & Protocolar Diagnóstico</span>
                          <Send className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

            </form>
          </div>
        )}

      </div>
    </section>
  );
};
