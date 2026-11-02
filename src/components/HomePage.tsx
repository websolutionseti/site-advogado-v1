import React from 'react';
import { 
  ArrowRight, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  Scale, 
  FileText, 
  Building2, 
  Users, 
  Award, 
  Clock, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { NavigationPage } from '../types';
import { ARTICLES } from '../data/mockData';

const homeLawyers = [
  {
    id: 'victor-cartes',
    name: 'Victor Hugo Lira Cartes',
    role: 'Sócio Fundador',
    oab: 'OAB/SP 421.506',
    photoUrl: '/equipe/victor_cartes.jpg'
  },
  {
    id: 'leonardo-gutierrez',
    name: 'Leonardo Gutierrez Alves',
    role: 'Advogado Associado',
    oab: 'OAB/SP 306.294',
    photoUrl: '/equipe/leonardo_gutierrez.jpg'
  },
  {
    id: 'anderson-bispo',
    name: 'Anderson Bispo da Silva',
    role: 'Advogado Associado',
    oab: 'OAB/SP 252.001',
    photoUrl: '/equipe/anderson_bispo.png'
  },
  {
    id: 'pedro-sirna',
    name: 'Pedro Gabriel Sirna dos Santos',
    role: 'Advogado Associado',
    oab: 'OAB/SP 492.650',
    photoUrl: '/equipe/pedro_sirna.jpg'
  },
  {
    id: 'paulo-faria',
    name: 'Paulo A. de Barros Faria Neto',
    role: 'Advogado Associado',
    oab: 'OAB/SP 506.777',
    photoUrl: '/equipe/paulo_faria.jpg'
  }
];

interface HomePageProps {
  onNavigate: (page: NavigationPage) => void;
  onOpenPRD?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenPRD }) => {
  // 6 Práticas Principais para o grid corporativo
  const practiceGrid = [
    {
      title: 'Direito Civil',
      description: 'Soluções para questões envolvendo pessoas, patrimônio e relações jurídicas do dia a dia.',
      imageUrl: '/imagens/01_capa_ChatGPT-Image-21-de-set-de-2026-16_40_03.png'
    },
    {
      title: 'Direito Empresarial',
      description: 'Assessoria jurídica para empresas em diferentes fases com foco em governança e sustentabilidade.',
      imageUrl: '/imagens/04_capa_ChatGPT-Image-10-de-set-de-2026-16_26_45.png'
    },
    {
      title: 'Direito Trabalhista',
      description: 'Atuação consultiva e contenciosa corporativa com foco na mitigação integral de riscos.',
      imageUrl: '/imagens/05_capa_ChatGPT-Image-10-de-set-de-2026-17_32_14.png'
    },
    {
      title: 'Direito do Consumidor',
      description: 'Defesa e equilíbrio técnico em relações de consumo estratégicas e de alto valor.',
      imageUrl: '/imagens/06_capa_ChatGPT-Image-10-de-set-de-2026-17_37_36.png'
    },
    {
      title: 'Direito de Família e Sucessões',
      description: 'Apoio jurídico sensível e rigoroso em todas as fases da vida familiar e na partilha de ativos.',
      imageUrl: '/imagens/02_capa_ChatGPT-Image-10-de-set-de-2026-17_23_01.png'
    },
    {
      title: 'Direito Contratual',
      description: 'Elaboração, análise e negociação de contratos complexos com ênfase em blindagem preventiva.',
      imageUrl: '/imagens/03_capa_ChatGPT-Image-21-de-set-de-2026-16_40_03.png'
    }
  ];

  return (
    <div className="bg-[#14171C] text-[#8E95A0] font-sans antialiased selection:bg-[#C5A880] selection:text-[#0C0E12]">
      
      {/* ================================================================== */}
      {/* 1. HERO SECTION: Corporativo Amplo (Skyline Noturno / Quiet Luxury) */}
      {/* ================================================================== */}
      <section className="relative min-h-[92vh] flex items-center justify-center bg-black overflow-hidden border-b border-white/5">
        
        {/* Background Image com sobreposição de iluminação dourada e carvão */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/imagens/01_capa_ChatGPT-Image-21-de-set-de-2026-16_40_03.png" 
            alt="Edifícios corporativos em iluminação crepuscular dourada" 
            className="w-full h-full object-cover object-center filter brightness-[0.38] contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14171C] via-[#14171C]/50 to-black/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-[#14171C]/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24 w-full">
          <div className="max-w-3xl">
            <p className="text-[#C5A880] text-xs font-semibold tracking-[0.35em] uppercase mb-4 flex items-center">
              <span className="w-8 h-[1px] bg-[#C5A880] mr-3"></span>
              Cartes Advogados Boutique
            </p>

            <h1 className="font-playfair text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-white leading-[1.05] tracking-tight mb-6">
              ADVOCACIA<br />
              <span className="font-serif italic font-light text-transparent bg-clip-text bg-gradient-to-r from-[#DFCAAB] via-[#C5A880] to-[#8D7048]">
                ESTRATÉGICA
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-neutral-300 font-light font-playfair mb-3 tracking-wide">
              Prevenimos e solucionamos conflitos jurídicos.
            </p>

            <p className="text-sm uppercase tracking-[0.25em] text-[#C5A880]/80 mb-10 font-medium">
              Antes do conflito. Além da solução.
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button
                type="button"
                onClick={() => onNavigate('atuacao')}
                className="inline-flex items-center justify-between border border-[#C5A880] text-[#C5A880] px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#C5A880] hover:text-[#14171C] transition-all duration-300 group cursor-pointer"
              >
                <span>Conheça Nossa Atuação</span>
                <ArrowRight className="ml-3 h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center text-xs tracking-[0.25em] uppercase text-neutral-400 pl-1">
                <span className="w-2 h-2 rounded-full bg-[#C5A880] mr-2"></span>
                São Paulo — SP
              </div>
            </div>
          </div>
        </div>

        {/* Linha sutil de transição */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C5A880]/30 to-transparent" />
      </section>

      {/* ================================================================== */}
      {/* 2. MANIFESTO INSTITUCIONAL */}
      {/* ================================================================== */}
      <section className="py-24 bg-[#14171C] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            <div className="lg:col-span-7">
              <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl text-white font-normal leading-tight">
                Uma advocacia construída para compreender contextos, antecipar riscos e estruturar soluções.
              </h2>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between h-full pt-2">
              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed mb-8">
                Atuamos em questões complexas que envolvem pessoas, patrimônio e empresas, com visão jurídica, estratégica e foco na preservação de valor, segurança jurídica e resolução assertiva de conflitos.
              </p>
              <div>
                <button
                  type="button"
                  onClick={() => onNavigate('quem-somos')}
                  className="inline-flex items-center text-xs uppercase tracking-[0.25em] text-[#C5A880] hover:text-white transition-colors group cursor-pointer"
                >
                  <span className="border-b border-[#C5A880] group-hover:border-white pb-1">Conheça o Cartes Advogados</span>
                  <ArrowRight className="ml-2.5 h-3 w-3 transform group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 3. VITRINE DE PRÁTICAS (6 Cards + Destaque Holding) */}
      {/* ================================================================== */}
      <section className="py-28 bg-[#101217] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/10 pb-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C5A880] block mb-2">Áreas de Atuação</span>
              <h3 className="font-playfair text-3xl sm:text-4xl text-white font-light">Práticas Jurídicas Especializadas</h3>
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-400 mt-4 md:mt-0">
              Soluções Jurídicas Para Diferentes Momentos
            </p>
          </div>

          {/* Grid de 6 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {practiceGrid.map((practice, idx) => (
              <article 
                key={idx}
                className="group relative bg-[#1A1E24] border border-white/5 overflow-hidden transition-all duration-300 hover:border-[#C5A880]/50"
              >
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={practice.imageUrl} 
                    alt={practice.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1E24] via-transparent to-transparent" />
                </div>
                <div className="p-6 relative">
                  <h4 className="font-playfair text-2xl text-white font-normal mb-2 group-hover:text-[#C5A880] transition-colors">
                    {practice.title}
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                    {practice.description}
                  </p>
                  <button
                    type="button"
                    onClick={() => onNavigate('atuacao')}
                    className="inline-flex items-center text-[11px] uppercase tracking-widest text-[#C5A880] font-semibold group-hover:underline cursor-pointer"
                  >
                    Saiba Mais <ArrowRight className="ml-2 h-3 w-3" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Banner Destaque Especial: Planejamento Patrimonial */}
          <article className="relative bg-gradient-to-r from-[#1A1E24] to-[#14171C] border border-[#C5A880]/30 p-8 sm:p-12 rounded-sm overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C5A880] block mb-2">
                NOSSO DESTAQUE ESTRATÉGICO
              </span>
              <h4 className="font-playfair text-3xl sm:text-4xl text-white font-normal mb-4">
                Planejamento Patrimonial, Familiar e Sucessório
              </h4>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6">
                Uma atuação integrada para organizar o patrimônio, proteger a família, assegurar a continuidade da empresa e pacificar o processo sucessório com absoluta segurança jurídica.
              </p>
              <button
                type="button"
                onClick={() => onNavigate('atuacao')}
                className="inline-flex items-center gap-2 border border-[#C5A880] text-[#C5A880] px-6 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-[#C5A880] hover:text-[#14171C] transition-all cursor-pointer"
              >
                <span>Conheça Nossa Atuação em Detalhes</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </article>

        </div>
      </section>

      {/* ================================================================== */}
      {/* 4. NOSSA FORMA DE ATUAR (Tríade Metodológica) */}
      {/* ================================================================== */}
      <section className="py-24 bg-[#14171C] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="mb-14">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C5A880] block mb-2">
              Nossa Forma de Atuar
            </span>
            <h3 className="font-playfair text-3xl sm:text-4xl text-white font-light">
              A advocacia começa antes do conflito.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* 01 Prevenção */}
            <div className="bg-[#1A1E24] border border-white/5 p-8 rounded-sm">
              <span className="font-playfair text-4xl text-[#C5A880] font-bold block mb-4">01</span>
              <h4 className="font-playfair text-xl text-white font-normal mb-3">Prevenção</h4>
              <p className="text-xs leading-relaxed text-neutral-400">
                Estruturação jurídica e diagnósticos antecipados para identificar riscos, mitigar contingências e reduzir custos futuros antes de qualquer litígio.
              </p>
            </div>

            {/* 02 Negociação */}
            <div className="bg-[#1A1E24] border border-white/5 p-8 rounded-sm">
              <span className="font-playfair text-4xl text-[#C5A880] font-bold block mb-4">02</span>
              <h4 className="font-playfair text-xl text-white font-normal mb-3">Negociação</h4>
              <p className="text-xs leading-relaxed text-neutral-400">
                Compreensão profunda dos interesses envolvidos e construção técnica de acordos que pacificam dissensos familiares ou societários com solidez.
              </p>
            </div>

            {/* 03 Solução */}
            <div className="bg-[#1A1E24] border border-white/5 p-8 rounded-sm">
              <span className="font-playfair text-4xl text-[#C5A880] font-bold block mb-4">03</span>
              <h4 className="font-playfair text-xl text-white font-normal mb-3">Solução</h4>
              <p className="text-xs leading-relaxed text-neutral-400">
                Atuação estratégica e assertiva na defesa dos interesses do cliente quando o conflito já existe, buscando sempre o desfecho mais seguro e célere.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ================================================================== */}
      {/* 5. NOSSA EQUIPE PREVIEW NA HOME */}
      {/* ================================================================== */}
      <section className="py-24 bg-[#101217] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C5A880] block mb-2">
                Corpo Jurídico
              </span>
              <h3 className="font-playfair text-3xl sm:text-4xl text-white font-light">
                Profissionais com diferentes especialidades, reunidos para uma atuação integrada.
              </h3>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('equipe')}
              className="mt-4 md:mt-0 inline-flex items-center text-xs uppercase tracking-[0.2em] text-[#C5A880] hover:text-white transition-colors cursor-pointer"
            >
              <span>Conhecer Toda a Equipe</span>
              <ArrowRight className="ml-2 h-3 w-3" />
            </button>
          </div>

          {/* Grid dos Advogados com fotos masculinas */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {homeLawyers.map((lawyer) => (
              <div 
                key={lawyer.id}
                onClick={() => onNavigate('equipe')}
                className="group bg-[#1A1E24] border border-white/5 p-4 rounded-sm hover:border-[#C5A880]/50 transition-all cursor-pointer"
              >
                <div className="aspect-[4/5] overflow-hidden rounded-sm mb-4 bg-neutral-900">
                  <img 
                    src={lawyer.photoUrl} 
                    alt={lawyer.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <h4 className="font-playfair text-sm text-white font-bold group-hover:text-[#C5A880] transition-colors leading-snug">
                  {lawyer.name}
                </h4>
                <p className="text-[10px] text-neutral-400 mt-0.5">{lawyer.role}</p>
                <p className="text-[9px] text-[#C5A880] font-mono mt-1">{lawyer.oab}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================================================================== */}
      {/* 6. CONTEÚDO JURÍDICO / BLOG PREVIEW */}
      {/* ================================================================== */}
      <section className="py-24 bg-[#14171C] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C5A880] block mb-2">
                Conteúdo Jurídico
              </span>
              <h3 className="font-playfair text-3xl sm:text-4xl text-white font-light">
                Análises, reflexões e atualizações sobre temas relevantes.
              </h3>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('blog')}
              className="mt-4 md:mt-0 inline-flex items-center text-xs uppercase tracking-[0.2em] text-[#C5A880] hover:text-white transition-colors cursor-pointer"
            >
              <span>Ver Todos os Artigos</span>
              <ArrowRight className="ml-2 h-3 w-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ARTICLES.slice(0, 3).map((art) => (
              <article 
                key={art.id}
                onClick={() => onNavigate('blog')}
                className="group bg-[#1A1E24] border border-white/5 rounded-sm overflow-hidden hover:border-[#C5A880]/50 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="h-44 overflow-hidden relative">
                    <img 
                      src={art.imageUrl || '/imagens/01_capa_ChatGPT-Image-21-de-set-de-2026-16_40_03.png'} 
                      alt={art.title} 
                      className="w-full h-full object-cover filter brightness-75 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm px-2.5 py-1 text-[10px] uppercase font-bold text-[#C5A880] rounded-none">
                      {art.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="text-[10px] text-neutral-400 block mb-2">{art.publishedAt} · {art.readTime}</span>
                    <h4 className="font-playfair text-lg text-white font-normal group-hover:text-[#C5A880] transition-colors leading-snug mb-3">
                      {art.title}
                    </h4>
                    <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                      {art.summary}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-white/5 flex items-center justify-between text-xs text-[#C5A880]">
                  <span>Ler Artigo Completo</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* ================================================================== */}
      {/* 7. CTA FINAL (Banner de Fechamento Editorial) */}
      {/* ================================================================== */}
      <section className="relative overflow-hidden bg-black py-24 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-8">
              <h3 className="font-playfair text-3xl sm:text-4xl md:text-5xl text-white font-normal leading-tight mb-4">
                Algumas decisões jurídicas não deveriam começar quando o problema aparece.
              </h3>
              <p className="text-sm sm:text-base text-neutral-400 leading-relaxed max-w-2xl">
                Converse com nossa equipe para compreender os caminhos jurídicos disponíveis para o seu caso com total sigilo e assertividade.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4">
              <button
                type="button"
                onClick={() => onNavigate('contato')}
                className="inline-flex items-center justify-center bg-[#C5A880] text-[#14171C] px-8 py-4 text-xs uppercase tracking-widest font-bold hover:bg-[#d8be98] transition-all cursor-pointer shadow-xl shadow-[#C5A880]/20"
              >
                <span>Falar com Nossa Equipe</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>

              <a
                href="https://wa.me/5511973758834?text=Ol%C3%A1%2C%20gostaria%20de%20conversar%20com%20um%20especialista%20do%20Cartes%20Advogados."
                target="_blank"
                rel="noopener noreferrer"
                data-track="whatsapp_home_cta_click"
                className="inline-flex items-center justify-center border border-white/20 text-white px-8 py-4 text-xs uppercase tracking-widest font-bold hover:bg-white/10 transition-colors"
              >
                <span>WhatsApp Oficial</span>
              </a>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
