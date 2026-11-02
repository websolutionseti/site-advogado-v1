import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  Building2, 
  Users, 
  Scale, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight,
  CheckCircle2,
  Lock,
  Clock
} from 'lucide-react';
import { NavigationPage } from '../types';

interface QuemSomosPageProps {
  onNavigate: (page: NavigationPage) => void;
}

export const QuemSomosPage: React.FC<QuemSomosPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#14171C] text-[#8E95A0] font-sans antialiased">
      
      {/* ================================================================== */}
      {/* HERO SECTION: Quem Somos */}
      {/* ================================================================== */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-black overflow-hidden border-b border-white/5">
        {/* Background Image com overlay editorial */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/imagens/01_capa_ChatGPT-Image-21-de-set-de-2026-16_40_03.png" 
            alt="Fachada corporativa elegante Cartes Advogados" 
            className="w-full h-full object-cover object-center filter brightness-[0.35] contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14171C] via-[#14171C]/60 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-[#14171C]/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 w-full">
          <div className="max-w-3xl">
            <p className="text-[#C5A880] text-xs font-semibold tracking-[0.35em] uppercase mb-4 flex items-center">
              <span className="w-8 h-[1px] bg-[#C5A880] mr-3"></span>
              História, Fundação & Filosofia
            </p>
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-normal text-white leading-[1.1] tracking-tight mb-6">
              QUEM <span className="font-serif italic font-light text-[#C5A880]">SOMOS</span>
            </h1>
            <p className="text-xl sm:text-2xl text-neutral-300 font-light font-playfair mb-6 tracking-wide leading-relaxed">
              Experiência, estratégia e visão de futuro para a salvaguarda de pessoas, famílias e negócios.
            </p>
            <p className="text-sm leading-relaxed text-neutral-400 max-w-2xl">
              O Cartes Advogados é uma sociedade de advogados boutique estruturada para atuar na intersecção entre alta precisão técnica, inteligência negocial e prevenção estratégica de riscos patrimoniais.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* MANIFESTO E PROPÓSITO INSTITUCIONAL */}
      {/* ================================================================== */}
      <section className="py-24 bg-[#14171C] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C5A880] block">
                Nossa Origem & Propósito
              </span>
              <h2 className="font-playfair text-3xl sm:text-4xl text-white font-normal leading-tight">
                Uma banca moldada para antever o amanhã e preservar legados.
              </h2>
              <div className="h-0.5 w-16 bg-[#C5A880]" />
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                Fundado com a missão de transformar a relação tradicional do cliente com o Direito, o Cartes Advogados nasceu da constatação de que as disputas mais onerosas e destrutivas poderiam ter sido evitadas com governança prévia, escuta atenta e acordos bem estruturados.
              </p>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Nossa atuação transcende a mera aplicação reativa de teses jurídicas. Estudamos a fundo a dinâmica relacional e os objetivos de longo prazo de cada cliente, integrando ferramentas de Direito Civil, Societário, Tributário e Negociação Internacional para edificar estruturas jurídicas sólidas e imunes a intempéries.
              </p>
            </div>

            <div className="lg:col-span-6 space-y-8">
              {/* Card Destaque Quiet Luxury */}
              <div className="bg-[#1A1E24] border border-[#C5A880]/20 p-8 rounded-sm shadow-xl relative overflow-hidden">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-[#C5A880]/10 border border-[#C5A880]/30 rounded-sm">
                    <ShieldCheck className="h-6 w-6 text-[#C5A880]" />
                  </div>
                  <div>
                    <h3 className="font-playfair text-lg font-bold text-white">Sigilo Fiduciário Absoluto</h3>
                    <span className="text-xs text-[#C5A880] font-mono">Provimento OAB 205/2021 & LGPD</span>
                  </div>
                </div>
                <p className="text-xs leading-relaxed text-neutral-300">
                  Todas as consultas, pareceres e diagnósticos operam sob os mais rigorosos protocolos de confidencialidade bancária e fiduciária, garantindo inviolabilidade de dados e total reserva.
                </p>
              </div>

              {/* Grid de Métricas Institucionais */}
              <div className="grid grid-cols-2 gap-6 pt-2">
                <div className="border-l-2 border-[#C5A880] pl-4">
                  <span className="font-playfair text-3xl text-white font-bold block">10+ Anos</span>
                  <span className="text-xs text-neutral-400 mt-1 block">De liderança jurídica e assessoria patrimonial</span>
                </div>
                <div className="border-l-2 border-[#C5A880] pl-4">
                  <span className="font-playfair text-3xl text-white font-bold block">100%</span>
                  <span className="text-xs text-neutral-400 mt-1 block">Dedicação direta dos sócios aos casos estratégicos</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* VALORES E PILARES FUNDAMENTAIS */}
      {/* ================================================================== */}
      <section className="py-24 bg-[#101217] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C5A880] block mb-2">
              Nossos Pilares
            </span>
            <h2 className="font-playfair text-3xl sm:text-4xl text-white font-light">
              Princípios que regem cada decisão
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Pilar 1 */}
            <div className="bg-[#1A1E24] border border-white/5 p-8 rounded-sm hover:border-[#C5A880]/40 transition-all group">
              <div className="w-12 h-12 bg-[#14171C] border border-[#C5A880]/30 rounded-sm flex items-center justify-center text-[#C5A880] mb-6 group-hover:bg-[#C5A880] group-hover:text-[#14171C] transition-colors">
                <Scale className="h-6 w-6" />
              </div>
              <h3 className="font-playfair text-xl text-white font-normal mb-3 group-hover:text-[#C5A880] transition-colors">
                Advocacia Preventiva
              </h3>
              <p className="text-xs leading-relaxed text-neutral-400">
                Acreditamos que o melhor resultado jurídico é o conflito que nunca chega ao tribunal. Desenhamos acordos e estruturas contratuais antecipando fricções e blindando a estabilidade de longo prazo.
              </p>
            </div>

            {/* Pilar 2 */}
            <div className="bg-[#1A1E24] border border-white/5 p-8 rounded-sm hover:border-[#C5A880]/40 transition-all group">
              <div className="w-12 h-12 bg-[#14171C] border border-[#C5A880]/30 rounded-sm flex items-center justify-center text-[#C5A880] mb-6 group-hover:bg-[#C5A880] group-hover:text-[#14171C] transition-colors">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="font-playfair text-xl text-white font-normal mb-3 group-hover:text-[#C5A880] transition-colors">
                Atendimento Personalizado
              </h3>
              <p className="text-xs leading-relaxed text-neutral-400">
                Rejeitamos modelos de advocacia massificada. Cada cliente é atendido diretamente por sócios especialistas dedicados a entender as particularidades e os objetivos de seu núcleo familiar ou corporativo.
              </p>
            </div>

            {/* Pilar 3 */}
            <div className="bg-[#1A1E24] border border-white/5 p-8 rounded-sm hover:border-[#C5A880]/40 transition-all group">
              <div className="w-12 h-12 bg-[#14171C] border border-[#C5A880]/30 rounded-sm flex items-center justify-center text-[#C5A880] mb-6 group-hover:bg-[#C5A880] group-hover:text-[#14171C] transition-colors">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="font-playfair text-xl text-white font-normal mb-3 group-hover:text-[#C5A880] transition-colors">
                Excelência Reconhecida
              </h3>
              <p className="text-xs leading-relaxed text-neutral-400">
                Certificados com o Selo Referência Nacional ANCEC Ouro, mantemos padrões internacionais de compliance e rigor acadêmico contínuo em todas as instâncias de atuação.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ================================================================== */}
      {/* SEDE PAULISTA & INFRAESTRUTURA */}
      {/* ================================================================== */}
      <section className="py-24 bg-[#14171C]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C5A880] block mb-2">
                Nossa Localização Estratégica
              </span>
              <h2 className="font-playfair text-3xl sm:text-4xl text-white font-normal leading-tight mb-6">
                Presença consolidada na Avenida Paulista
              </h2>
              <p className="text-neutral-300 text-sm leading-relaxed mb-6">
                Situado no centro financeiro e empresarial da América Latina, o Cartes Advogados dispõe de estrutura reservada para reuniões fiduciárias de alto nível, além de infraestrutura tecnológica segura para audiências e consultorias virtuais com clientes em todo o Brasil e exterior.
              </p>
              
              <div className="space-y-3 text-xs text-neutral-400 mb-8">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-[#C5A880]" />
                  <span>Av. Paulista, 1471 - CJ 511 - Bela Vista, São Paulo - SP, 01311-200</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-[#C5A880]" />
                  <span>Atendimento com hora marcada: Segunda a Sexta, das 09h às 19h</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-[#C5A880]" />
                  <span>Linha Direta Executiva: (11) 9 7375-8834</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => onNavigate('equipe')}
                  className="inline-flex items-center gap-2 border border-[#C5A880] text-[#C5A880] px-6 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-[#C5A880] hover:text-[#14171C] transition-all cursor-pointer"
                >
                  <span>Conhecer Nossa Equipe</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => onNavigate('contato')}
                  className="inline-flex items-center gap-2 bg-[#1A1E24] text-white px-6 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-neutral-800 border border-white/10 transition-all cursor-pointer"
                >
                  <span>Fale Conosco</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-sm overflow-hidden border border-white/10 shadow-2xl">
                <img 
                  src="/imagens/04_capa_ChatGPT-Image-10-de-set-de-2026-16_26_45.png" 
                  alt="Instalações corporativas da banca Cartes Advogados" 
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14171C] via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#14171C]/90 backdrop-blur-sm border border-white/10">
                  <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold block">Sede São Paulo</span>
                  <p className="text-xs text-white font-playfair font-normal">Ambiente privativo para negociações de alto impacto.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
