import React from 'react';
import { ShieldCheck, ArrowLeft, Lock, FileText, CheckCircle, Database, Eye } from 'lucide-react';
import { NavigationPage } from '../types';
import { getStoredSession } from '../services/visitorTracking';

interface PoliticaPrivacidadePageProps {
  onNavigate: (page: NavigationPage) => void;
}

export const PoliticaPrivacidadePage: React.FC<PoliticaPrivacidadePageProps> = ({ onNavigate }) => {
  const session = getStoredSession();

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10 text-[#E2E8F0]">
      
      {/* Botão de Retorno */}
      <div className="flex items-center justify-between border-b border-[#1E293B] pb-6">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#C5A059] hover:text-white transition-colors cursor-pointer font-semibold"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Voltar à Página Inicial</span>
        </button>

        <span className="text-[11px] font-mono text-[#94A3B8] bg-[#0B192C] px-3 py-1 rounded border border-[#1E293B]">
          Revisão: Outubro / 2026 • Versão 1.2
        </span>
      </div>

      {/* Header Institucional */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30 text-xs font-semibold uppercase tracking-widest">
          <ShieldCheck className="h-4 w-4" />
          <span>Governança de Dados & LGPD (Lei nº 13.709/2018)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif text-white tracking-wide">
          Política de Privacidade & Proteção de Dados
        </h1>
        <p className="text-sm text-[#94A3B8] leading-relaxed max-w-3xl">
          Esta Política de Privacidade estabelece as diretrizes de governança, tratamento e proteção de dados pessoais coletados no ecossistema digital do escritório <strong>Cartes Advogados</strong>, sob a responsabilidade técnica do <strong>Dr. Victor Hugo Lira Cartes (OAB/SP 421.506)</strong>.
        </p>
      </div>

      {/* Box de Transparência Ativa: Dados da Sessão Atual */}
      {session && (
        <div className="bg-[#0B192C] border border-[#C5A059]/30 rounded-xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-wider text-[#C5A059]">
            <Eye className="h-4 w-4" />
            <span>Transparência Ativa — Dados da sua Sessão Técnica Atual</span>
          </div>
          <p className="text-xs text-[#94A3B8] leading-relaxed">
            Em conformidade com o princípio da transparência da LGPD (Art. 6º, VI), informamos os metadados técnicos de conexão registrados para segurança operacional e prevenção contra ataques cibernéticos:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs font-mono">
            <div className="p-3 bg-[#060D17] rounded border border-[#1E293B]">
              <span className="text-[#94A3B8] block text-[10px] uppercase">Endereço IP Registrado</span>
              <span className="text-white font-semibold mt-0.5 block">{session.ip}</span>
            </div>

            <div className="p-3 bg-[#060D17] rounded border border-[#1E293B]">
              <span className="text-[#94A3B8] block text-[10px] uppercase">Canal de Origem</span>
              <span className="text-[#C5A059] font-semibold mt-0.5 block truncate">{session.origin}</span>
            </div>

            <div className="p-3 bg-[#060D17] rounded border border-[#1E293B]">
              <span className="text-[#94A3B8] block text-[10px] uppercase">Dispositivo / Ambiente</span>
              <span className="text-white font-semibold mt-0.5 block">{session.deviceType}</span>
            </div>
          </div>
        </div>
      )}

      {/* Seções da Política */}
      <div className="space-y-8 text-sm leading-relaxed text-[#CBD5E1]">
        
        {/* Seção 1 */}
        <section className="space-y-3 bg-[#0B192C]/40 p-6 rounded-xl border border-[#1E293B]">
          <h2 className="text-lg font-serif text-white font-semibold flex items-center gap-2">
            <span className="text-[#C5A059] font-mono text-sm">01.</span>
            Agente de Tratamento e Sigilo Profissional da Advocacia
          </h2>
          <p>
            O controlador dos dados pessoais é <strong>Cartes Advogados</strong>, com sede principal na <strong>Av. Paulista, 1.763 (Cj. 1.704)</strong> e núcleo consultivo na <strong>Av. Paulista, 1.471 (Cj. 511)</strong>, Bela Vista, São Paulo - SP.
          </p>
          <p>
            Todas as comunicações e informações submetidas através dos canais de triagem e agendamento estão amparadas pelo <strong>sigilo profissional fiduciário</strong> previsto no Estatuto da Advocacia (Lei Federal nº 8.906/94) e no Código de Ética e Disciplina da OAB.
          </p>
        </section>

        {/* Seção 2 */}
        <section className="space-y-3 bg-[#0B192C]/40 p-6 rounded-xl border border-[#1E293B]">
          <h2 className="text-lg font-serif text-white font-semibold flex items-center gap-2">
            <span className="text-[#C5A059] font-mono text-sm">02.</span>
            Finalidade e Bases Legais do Tratamento
          </h2>
          <p>Os dados coletados neste portal possuem finalidades estritas e legítimas:</p>
          <ul className="list-disc pl-5 space-y-2 text-[#94A3B8]">
            <li><strong className="text-white">Triagem Jurídica Preliminar:</strong> Avaliação de conflitos de interesses e viabilidade técnica da demanda jurídica (Base legal: Execução de contrato ou procedimentos preliminares — Art. 7º, V da LGPD).</li>
            <li><strong className="text-white">Agendamento de Consultas:</strong> Coordenação de atendimentos presenciais ou virtuais e envio de confirmações seguras via WhatsApp ou e-mail corporativo.</li>
            <li><strong className="text-white">Segurança Cibernética & Auditoria:</strong> Registro de IPs, timestamps e origens de tráfego para cumprimento de obrigação legal imposta pelo Marco Civil da Internet (Lei nº 12.965/2014, Art. 15).</li>
          </ul>
        </section>

        {/* Seção 3 */}
        <section className="space-y-3 bg-[#0B192C]/40 p-6 rounded-xl border border-[#1E293B]">
          <h2 className="text-lg font-serif text-white font-semibold flex items-center gap-2">
            <span className="text-[#C5A059] font-mono text-sm">03.</span>
            Direitos do Titular de Dados (Art. 18 da LGPD)
          </h2>
          <p>
            O titular dos dados pessoais tem direito a obter, mediante requisição expressa ao nosso Encarregado de Proteção de Dados (DPO):
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
            <div className="p-3 bg-[#060D17] rounded border border-[#1E293B] flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-[#C5A059] flex-shrink-0" />
              <span>Confirmação da existência de tratamento</span>
            </div>
            <div className="p-3 bg-[#060D17] rounded border border-[#1E293B] flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-[#C5A059] flex-shrink-0" />
              <span>Acesso aos dados pessoais mantidos</span>
            </div>
            <div className="p-3 bg-[#060D17] rounded border border-[#1E293B] flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-[#C5A059] flex-shrink-0" />
              <span>Correção de dados incompletos ou inexatos</span>
            </div>
            <div className="p-3 bg-[#060D17] rounded border border-[#1E293B] flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-[#C5A059] flex-shrink-0" />
              <span>Revogação de consentimento e eliminação</span>
            </div>
          </div>
        </section>

        {/* Seção 4: Contato do DPO */}
        <section className="space-y-3 bg-[#0B192C]/40 p-6 rounded-xl border border-[#1E293B]">
          <h2 className="text-lg font-serif text-white font-semibold flex items-center gap-2">
            <span className="text-[#C5A059] font-mono text-sm">04.</span>
            Canal de Atendimento do Encarregado (DPO)
          </h2>
          <p>
            Para exercer seus direitos de privacidade ou esclarecer dúvidas sobre esta Política, contate diretamente o canal oficial de conformidade:
          </p>
          <div className="p-4 bg-[#060D17] rounded-lg border border-[#C5A059]/30 text-xs space-y-1">
            <p><strong className="text-white">Encarregado de Proteção de Dados:</strong> Núcleo de Governança & Compliance Cartes</p>
            <p><strong className="text-white">E-mail Corporativo de Privacidade:</strong> <a href="mailto:cartes@cadvs.com.br" className="text-[#C5A059] hover:underline">cartes@cadvs.com.br</a></p>
            <p><strong className="text-white">Linha de Contato Institucional:</strong> +55 (11) 9 7375-8834</p>
          </div>
        </section>

      </div>

    </div>
  );
};
