import React from 'react';
import { FileText, ArrowLeft, ShieldCheck, Scale, AlertCircle, Building2 } from 'lucide-react';
import { NavigationPage } from '../types';

interface TermosUsoPageProps {
  onNavigate: (page: NavigationPage) => void;
}

export const TermosUsoPage: React.FC<TermosUsoPageProps> = ({ onNavigate }) => {
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
          Conformidade OAB • Versão 1.2
        </span>
      </div>

      {/* Header Institucional */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30 text-xs font-semibold uppercase tracking-widest">
          <Scale className="h-4 w-4" />
          <span>Provimento OAB nº 205/2021 & Código de Ética</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif text-white tracking-wide">
          Termos de Uso & Condições Institucionais
        </h1>
        <p className="text-sm text-[#94A3B8] leading-relaxed max-w-3xl">
          Termos que regulam a navegação e a utilização dos serviços informativos do portal institucional do escritório <strong>Cartes Advogados</strong>.
        </p>
      </div>

      {/* Seções dos Termos */}
      <div className="space-y-8 text-sm leading-relaxed text-[#CBD5E1]">
        
        {/* Seção 1 */}
        <section className="space-y-3 bg-[#0B192C]/40 p-6 rounded-xl border border-[#1E293B]">
          <h2 className="text-lg font-serif text-white font-semibold flex items-center gap-2">
            <span className="text-[#C5A059] font-mono text-sm">01.</span>
            Caráter Estritamente Informativo & Não Vinculativo
          </h2>
          <p>
            O conteúdo publicado neste portal (incluindo artigos, pareceres, guias e materiais educativos) possui caráter exclusivamente informativo, pedagógico e institucional, em rigoroso cumprimento às disposições do <strong>Provimento OAB nº 205/2021</strong>.
          </p>
          <p className="text-[#94A3B8]">
            Nenhum dos conteúdos veiculados constitui parecer jurídico individualizado ou consultoria técnica definitiva. A contratação dos serviços privativos da advocacia formaliza-se exclusivamente mediante celebração de contrato formal de prestação de serviços jurídicos e outorga de procuração específica.
          </p>
        </section>

        {/* Seção 2 */}
        <section className="space-y-3 bg-[#0B192C]/40 p-6 rounded-xl border border-[#1E293B]">
          <h2 className="text-lg font-serif text-white font-semibold flex items-center gap-2">
            <span className="text-[#C5A059] font-mono text-sm">02.</span>
            Propriedade Intelectual & Conteúdo Autoral
          </h2>
          <p>
            Todos os textos, logomarcas, identidade visual, artigos doutrinários, fluxogramas e códigos-fonte disponibilizados são de propriedade intelectual exclusiva de <strong>Cartes Advogados</strong> e de seus sócios titulares.
          </p>
          <p className="text-[#94A3B8]">
            É expressamente vedada a reprodução total ou parcial para fins comerciais sem autorização prévia e por escrito, sendo permitida a citação acadêmica ou jornalística com a devida atribuição de autoria e indicação do link oficial da fonte.
          </p>
        </section>

        {/* Seção 3 */}
        <section className="space-y-3 bg-[#0B192C]/40 p-6 rounded-xl border border-[#1E293B]">
          <h2 className="text-lg font-serif text-white font-semibold flex items-center gap-2">
            <span className="text-[#C5A059] font-mono text-sm">03.</span>
            Responsabilidade Técnica & Identificação OAB
          </h2>
          <p>
            A condução ética e a responsabilidade técnica deste ecossistema institucional competem ao sócio fundador:
          </p>
          <div className="p-4 bg-[#060D17] rounded-lg border border-[#C5A059]/30 text-xs space-y-1">
            <p><strong className="text-white">Responsável Técnico:</strong> Dr. Victor Hugo Lira Cartes</p>
            <p><strong className="text-white">Inscrição Profissional:</strong> Ordem dos Advogados do Brasil — Seccional de São Paulo (OAB/SP nº 421.506)</p>
            <p><strong className="text-white">Sede Oficial:</strong> Av. Paulista, 1.763 - Conjunto 1.704 • Bela Vista, São Paulo - SP</p>
          </div>
        </section>

        {/* Seção 4 */}
        <section className="space-y-3 bg-[#0B192C]/40 p-6 rounded-xl border border-[#1E293B]">
          <h2 className="text-lg font-serif text-white font-semibold flex items-center gap-2">
            <span className="text-[#C5A059] font-mono text-sm">04.</span>
            Foro e Legislação Aplicável
          </h2>
          <p>
            Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil, em particular pela Lei Federal nº 8.906/94 (Estatuto da Advocacia e da OAB) e pelo Código Civil Brasileiro. Fica eleito o <strong>Foro Central da Comarca da Capital do Estado de São Paulo</strong> para dirimir quaisquer controvérsias decorrentes deste termo.
          </p>
        </section>

      </div>

    </div>
  );
};
