import React, { useState } from 'react';
import { 
  X, 
  Palette, 
  Type, 
  Copy, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  Download, 
  Volume2, 
  Layers, 
  SlidersHorizontal,
  ExternalLink
} from 'lucide-react';

interface StyleGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ColorToken {
  name: string;
  variable: string;
  hex: string;
  category: 'Atmosfera Noturna & Azul Petróleo' | 'Dourado Nobre & Champagne' | 'Prata Nobre & Suporte' | 'Tipografia & Contraste';
  description: string;
  textColor: string;
}

export const StyleGuideModal: React.FC<StyleGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'palette' | 'typography' | 'components' | 'audios'>('palette');
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  if (!isOpen) return null;

  const colorTokens: ColorToken[] = [
    // 1. Atmosfera Noturna & Azul Petróleo
    {
      name: 'Canvas Noturno',
      variable: '--cartes-canvas-bg',
      hex: '#060D17',
      category: 'Atmosfera Noturna & Azul Petróleo',
      description: 'Fundo principal noturno corporativo (substitui o preto chapado).',
      textColor: '#F8FAFC'
    },
    {
      name: 'Azul Petróleo Deep',
      variable: '--cartes-petrol-deep',
      hex: '#0B192C',
      category: 'Atmosfera Noturna & Azul Petróleo',
      description: 'Containers, seções de transição e TopBars fiduciárias.',
      textColor: '#F8FAFC'
    },
    {
      name: 'Azul Petróleo Surface',
      variable: '--cartes-petrol-surface',
      hex: '#0D2538',
      category: 'Atmosfera Noturna & Azul Petróleo',
      description: 'Superfícies de cards, modais executivos e painéis de atendimento.',
      textColor: '#F8FAFC'
    },
    {
      name: 'Azul Petróleo Elevated',
      variable: '--cartes-petrol-elevated',
      hex: '#132F4C',
      category: 'Atmosfera Noturna & Azul Petróleo',
      description: 'Estados de hover, cards destacados e dropdowns navegacionais.',
      textColor: '#F8FAFC'
    },

    // 2. Dourado Nobre & Champagne
    {
      name: 'Dourado Nobre',
      variable: '--cartes-gold-noble',
      hex: '#C5A059',
      category: 'Dourado Nobre & Champagne',
      description: 'Acento fiduciário de autoridade, linhas divisoras e ícones nobres.',
      textColor: '#060D17'
    },
    {
      name: 'Dourado Brilho (CTA)',
      variable: '--cartes-gold-bright',
      hex: '#D4AF37',
      category: 'Dourado Nobre & Champagne',
      description: 'Botões de conversão prioritária e estados de foco luminosos.',
      textColor: '#060D17'
    },
    {
      name: 'Champagne Suave',
      variable: '--cartes-gold-champagne',
      hex: '#E7D3A6',
      category: 'Dourado Nobre & Champagne',
      description: 'Citações de prestígio, sublinhados sutis e bordas douradas.',
      textColor: '#060D17'
    },

    // 3. Prata Nobre & Suporte
    {
      name: 'Prata Nobre',
      variable: '--cartes-silver-noble',
      hex: '#94A3B8',
      category: 'Prata Nobre & Suporte',
      description: 'Metadados de artigos, números de processos e selos técnicos.',
      textColor: '#060D17'
    },
    {
      name: 'Prata Claro',
      variable: '--cartes-silver-light',
      hex: '#CBD5E1',
      category: 'Prata Nobre & Suporte',
      description: 'Bordas de inputs desativados e linhas de separação sutil.',
      textColor: '#060D17'
    },
    {
      name: 'Prata Fosco',
      variable: '--cartes-silver-muted',
      hex: '#64748B',
      category: 'Prata Nobre & Suporte',
      description: 'Textos de apoio legal, avisos de cookies e LGPD.',
      textColor: '#F8FAFC'
    },

    // 4. Tipografia & Contraste
    {
      name: 'Off-White Puro',
      variable: '--cartes-text-primary',
      hex: '#F8FAFC',
      category: 'Tipografia & Contraste',
      description: 'Títulos principais e números com taxa de contraste 13.8:1 (WCAG AAA).',
      textColor: '#060D17'
    },
    {
      name: 'Branco Gelo',
      variable: '--cartes-text-secondary',
      hex: '#E2E8F0',
      category: 'Tipografia & Contraste',
      description: 'Corpo de matérias jurídicas e textos explicativos de práticas.',
      textColor: '#060D17'
    }
  ];

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const categories = [
    'Atmosfera Noturna & Azul Petróleo',
    'Dourado Nobre & Champagne',
    'Prata Nobre & Suporte',
    'Tipografia & Contraste'
  ] as const;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex justify-center items-center p-4 lg:p-6 animate-fadeIn">
      <div className="bg-[#080E18] border border-[#C5A059]/30 rounded-xl w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl shadow-black/80 overflow-hidden text-[#E2E8F0]">
        
        {/* ================================================================== */}
        {/* HEADER DO MODAL */}
        {/* ================================================================== */}
        <div className="px-6 py-5 border-b border-[#C5A059]/20 bg-[#0B192C]/90 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-lg bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059]">
              <Palette className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] px-2 py-0.5 rounded bg-[#C5A059]/15 text-[#C5A059] border border-[#C5A059]/30">
                  ENTREGÁVEL EXECUTIVO WUXIA-OPS
                </span>
                <span className="text-xs text-[#94A3B8]">Provimento OAB 205/2021</span>
              </div>
              <h2 className="text-xl font-serif text-white tracking-wide mt-0.5">
                Guia de Estilo & Design System Fiduciário
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="text-[#94A3B8] hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Fechar Guia de Estilo"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* ================================================================== */}
        {/* SUBNAV / ABAS */}
        {/* ================================================================== */}
        <div className="flex border-b border-[#1E293B] bg-[#060D17] px-6 text-xs uppercase tracking-wider font-medium">
          <button
            onClick={() => setActiveTab('palette')}
            className={`py-3.5 px-4 border-b-2 flex items-center space-x-2 transition-colors cursor-pointer ${
              activeTab === 'palette'
                ? 'border-[#C5A059] text-white font-semibold'
                : 'border-transparent text-[#94A3B8] hover:text-white'
            }`}
          >
            <Palette className="h-3.5 w-3.5 text-[#C5A059]" />
            <span>Paleta de Cores & Tokens</span>
          </button>

          <button
            onClick={() => setActiveTab('typography')}
            className={`py-3.5 px-4 border-b-2 flex items-center space-x-2 transition-colors cursor-pointer ${
              activeTab === 'typography'
                ? 'border-[#C5A059] text-white font-semibold'
                : 'border-transparent text-[#94A3B8] hover:text-white'
            }`}
          >
            <Type className="h-3.5 w-3.5 text-[#C5A059]" />
            <span>Tipografia & Escala</span>
          </button>

          <button
            onClick={() => setActiveTab('components')}
            className={`py-3.5 px-4 border-b-2 flex items-center space-x-2 transition-colors cursor-pointer ${
              activeTab === 'components'
                ? 'border-[#C5A059] text-white font-semibold'
                : 'border-transparent text-[#94A3B8] hover:text-white'
            }`}
          >
            <Layers className="h-3.5 w-3.5 text-[#C5A059]" />
            <span>Componentes UI Fluent 2</span>
          </button>

          <button
            onClick={() => setActiveTab('audios')}
            className={`py-3.5 px-4 border-b-2 flex items-center space-x-2 transition-colors cursor-pointer ${
              activeTab === 'audios'
                ? 'border-[#C5A059] text-white font-semibold'
                : 'border-transparent text-[#94A3B8] hover:text-white'
            }`}
          >
            <Volume2 className="h-3.5 w-3.5 text-[#C5A059]" />
            <span>Decodificação dos Áudios & Reunião</span>
          </button>
        </div>

        {/* ================================================================== */}
        {/* CORPO DO MODAL */}
        {/* ================================================================== */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">

          {/* ================= TAB 1: PALETA DE CORES ================= */}
          {activeTab === 'palette' && (
            <div className="space-y-8">
              <div className="bg-[#0B192C]/60 border border-[#C5A059]/20 rounded-lg p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="text-white font-serif text-lg font-medium flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-[#C5A059]" />
                    Paleta Fiduciária: Azul Petróleo, Dourado Nobre e Prata
                  </h3>
                  <p className="text-xs text-[#94A3B8] mt-1 max-w-2xl leading-relaxed">
                    Diretriz aprovada pelo Dr. Victor Cartes em reunião de alinhamento: erradicação do preto chapado
                    genérico e adoção do Azul Petróleo Profundo com contrastes em Dourado Nobre e Prata,
                    garantindo elegância executiva de Private Banking e conformidade estrita com o Provimento OAB 205/2021.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-[#C5A059] bg-[#C5A059]/10 px-3 py-1.5 rounded border border-[#C5A059]/25">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Aprovado WCAG AAA (7:1+)</span>
                </div>
              </div>

              {categories.map((cat) => (
                <div key={cat} className="space-y-3">
                  <h4 className="text-xs uppercase tracking-[0.2em] text-[#C5A059] font-semibold flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#C5A059]"></span>
                    {cat}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {colorTokens
                      .filter((c) => c.category === cat)
                      .map((token) => (
                        <div
                          key={token.variable}
                          className="bg-[#0B192C] border border-[#1E293B] hover:border-[#C5A059]/50 rounded-lg p-4 transition-all group flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-xs font-semibold text-white">{token.name}</span>
                              <button
                                onClick={() => handleCopy(token.hex)}
                                className="text-[11px] font-mono text-[#94A3B8] hover:text-[#C5A059] flex items-center gap-1 bg-[#060D17] px-2 py-0.5 rounded border border-[#1E293B] transition-colors"
                                title="Copiar código HEX"
                              >
                                {copiedHex === token.hex ? (
                                  <>
                                    <Check className="h-3 w-3 text-emerald-400" />
                                    <span className="text-emerald-400">Copiado!</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="h-3 w-3" />
                                    <span>{token.hex}</span>
                                  </>
                                )}
                              </button>
                            </div>

                            {/* Color Swatch Preview */}
                            <div
                              className="h-14 w-full rounded border border-white/10 mb-3 flex items-center justify-center font-mono text-xs font-semibold shadow-inner"
                              style={{ backgroundColor: token.hex, color: token.textColor }}
                            >
                              {token.hex}
                            </div>

                            <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                              {token.description}
                            </p>
                          </div>

                          <div className="mt-3 pt-2 border-t border-[#1E293B]/60 text-[10px] font-mono text-neutral-500">
                            {token.variable}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ================= TAB 2: TIPOGRAFIA ================= */}
          {activeTab === 'typography' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* 1. Cinzel */}
                <div className="bg-[#0B192C] border border-[#1E293B] rounded-lg p-5">
                  <div className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold">Marca & Prestígio</div>
                  <h4 className="font-brand text-2xl text-white mt-1">Cinzel</h4>
                  <p className="text-xs text-[#94A3B8] mt-2">
                    Serifada com proporções clássicas imperiais. Utilizada para a logomarca CARTES ADVOGADOS e selos de alta autoridade.
                  </p>
                  <div className="mt-4 p-3 bg-[#060D17] rounded border border-[#1E293B] font-brand text-center text-sm tracking-[0.25em] text-[#C5A059]">
                    CARTES ADVOGADOS
                  </div>
                </div>

                {/* 2. Cormorant / Playfair */}
                <div className="bg-[#0B192C] border border-[#1E293B] rounded-lg p-5">
                  <div className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold">Títulos & Autoridade</div>
                  <h4 className="font-playfair text-2xl text-white mt-1">Playfair Display</h4>
                  <p className="text-xs text-[#94A3B8] mt-2">
                    Serifada nobre de transição com alto contraste. Utilizada nas manchetes de H1, títulos de práticas jurídicas e artigos de alta cúpula.
                  </p>
                  <div className="mt-4 p-3 bg-[#060D17] rounded border border-[#1E293B] font-playfair text-center text-sm text-white">
                    Advocacia Estratégica & Continuidade Patrimonial
                  </div>
                </div>

                {/* 3. Plus Jakarta Sans */}
                <div className="bg-[#0B192C] border border-[#1E293B] rounded-lg p-5">
                  <div className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold">Corpo & Formulários</div>
                  <h4 className="font-sans text-2xl text-white mt-1 font-semibold">Plus Jakarta Sans</h4>
                  <p className="text-xs text-[#94A3B8] mt-2">
                    Sans-serif moderna de altíssima legibilidade em telas e densidades elevadas. Utilizada no corpo de texto, triagem e dados dos sócios.
                  </p>
                  <div className="mt-4 p-3 bg-[#060D17] rounded border border-[#1E293B] font-sans text-center text-xs text-[#E2E8F0]">
                    Atendimento sigiloso e direto com os sócios na Avenida Paulista.
                  </div>
                </div>
              </div>

              {/* Escala Visual de Títulos */}
              <div className="bg-[#0B192C] border border-[#1E293B] rounded-lg p-6 space-y-4">
                <h4 className="text-xs uppercase tracking-widest text-[#C5A059] font-semibold">Hierarquia Escalar de Títulos</h4>
                
                <div className="space-y-4 border-t border-[#1E293B] pt-4">
                  <div>
                    <span className="text-[10px] font-mono text-[#94A3B8]">H1 Hero Display — 48px / Playfair Display</span>
                    <h1 className="font-playfair text-3xl md:text-4xl text-white mt-1">
                      Prevenimos e solucionamos conflitos de alto impacto.
                    </h1>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-[#94A3B8]">H2 Seção Estratégica — 32px / Playfair Display</span>
                    <h2 className="font-playfair text-2xl text-white mt-1">
                      Planejamento Patrimonial, Familiar e Sucessório
                    </h2>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-[#94A3B8]">H3 Card de Prática — 22px / Playfair Display</span>
                    <h3 className="font-playfair text-lg text-[#C5A059] mt-1">
                      Governança Corporativa & Resolução de Impasses Societários
                    </h3>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-[#94A3B8]">Corpo Editorial — 16px / Plus Jakarta Sans</span>
                    <p className="text-sm text-[#E2E8F0] mt-1 leading-relaxed max-w-3xl">
                      Nossa equipe atua na interseção entre o direito empresarial e o planejamento patrimonial das famílias controladoras,
                      desenvolvendo estruturas contratuais robustas que mitigam riscos antes que se tornem litígios onerosos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 3: COMPONENTES UI ================= */}
          {activeTab === 'components' && (
            <div className="space-y-6">
              {/* Botões */}
              <div className="bg-[#0B192C] border border-[#1E293B] rounded-lg p-6 space-y-4">
                <h4 className="text-xs uppercase tracking-widest text-[#C5A059] font-semibold">Botões Fiduciários (CTAs)</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="space-y-2">
                    <span className="text-[11px] text-[#94A3B8]">Botão Primário (Dourado de Prestígio)</span>
                    <button className="w-full py-3 px-5 rounded-lg bg-gradient-to-r from-[#C5A059] to-[#D4AF37] text-[#060D17] font-semibold text-xs tracking-wider uppercase shadow-lg shadow-[#C5A059]/20 hover:shadow-[#C5A059]/40 transition-all cursor-pointer">
                      Agendar Consulta Fiduciária
                    </button>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[11px] text-[#94A3B8]">Botão Secundário (Azul Petróleo Contornado)</span>
                    <button className="w-full py-3 px-5 rounded-lg bg-[#0D2538] border border-[#94A3B8]/40 hover:border-[#C5A059] text-white font-medium text-xs tracking-wider uppercase transition-all cursor-pointer">
                      Conhecer Nossas Práticas
                    </button>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[11px] text-[#94A3B8]">Badge OAB / Responsabilidade Técnica</span>
                    <div className="w-full py-3 px-4 rounded-lg bg-[#060D17] border border-[#C5A059]/30 flex items-center justify-center space-x-2 text-[11px] text-[#C5A059]">
                      <ShieldCheck className="h-4 w-4" />
                      <span className="font-semibold tracking-wider">DR. VICTOR CARTES • OAB/SP 421.506</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card de Prática Exemplo */}
              <div className="bg-[#0B192C] border border-[#1E293B] rounded-lg p-6 space-y-4">
                <h4 className="text-xs uppercase tracking-widest text-[#C5A059] font-semibold">Card de Prática (Microsoft Fluent 2 Glass)</h4>
                
                <div className="max-w-md bg-gradient-to-b from-[#0D2538] to-[#0B192C] border border-[#C5A059]/30 rounded-xl p-6 shadow-xl relative overflow-hidden group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="h-10 w-10 rounded-lg bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059]">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-xs text-[#94A3B8]">01</span>
                  </div>

                  <h3 className="font-playfair text-xl text-white group-hover:text-[#C5A059] transition-colors">
                    Planejamento Patrimonial & Sucessório
                  </h3>
                  <p className="text-xs text-[#94A3B8] mt-2 leading-relaxed">
                    Constituição de holdings puras e mistas, doação com reserva de usufruto e governança familiar para blindagem lícita de ativos.
                  </p>

                  <div className="mt-5 pt-4 border-t border-[#1E293B] flex justify-between items-center text-xs">
                    <span className="text-[#94A3B8]">Sócio Responsável: Dr. Victor Cartes</span>
                    <span className="text-[#C5A059] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Detalhes →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 4: DECODIFICAÇÃO DOS ÁUDIOS ================= */}
          {activeTab === 'audios' && (
            <div className="space-y-6">
              <div className="bg-[#0B192C] border border-[#C5A059]/30 rounded-lg p-5">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <h4 className="text-xs uppercase tracking-widest text-[#C5A059] font-semibold flex items-center gap-2">
                    <Volume2 className="h-4 w-4" />
                    Mapeamento dos 7 Áudios & Histórico WhatsApp Exportado
                  </h4>
                  <span className="text-[10px] bg-[#C5A059]/15 text-[#C5A059] px-2 py-0.5 rounded border border-[#C5A059]/30 font-mono">
                    chat.md sincronizado
                  </span>
                </div>
                <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">
                  Decodificação cruzada entre os arquivos de áudio (<code className="text-[#CBD5E1]">.ogg</code>), as transcrições do Google Meet e o histórico exportado do WhatsApp (<code className="text-[#CBD5E1]">files_conversa_whatsapp/msg_whatsapp_Victor Cartes/chat.md</code>).
                </p>
              </div>

              {/* Tabela dos 7 Áudios Mapeados */}
              <div className="bg-[#0B192C] border border-[#1E293B] rounded-lg p-5 space-y-3">
                <h5 className="text-xs font-semibold text-white uppercase tracking-wider">
                  Trilha Cronológica dos Áudios do WhatsApp
                </h5>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-[#1E293B] text-[#94A3B8] uppercase text-[10px]">
                        <th className="py-2.5 px-3">Data / Hora</th>
                        <th className="py-2.5 px-3">Arquivo / Duração</th>
                        <th className="py-2.5 px-3">Interlocutor</th>
                        <th className="py-2.5 px-3">Tema & Decisão</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1E293B]/60 text-[#CBD5E1]">
                      <tr className="hover:bg-white/[0.02]">
                        <td className="py-2.5 px-3 font-mono text-[#C5A059]">23/10 20:12</td>
                        <td className="py-2.5 px-3 font-mono text-[11px]">WhatsApp Ptt...20.12.28.ogg (26 KB)</td>
                        <td className="py-2.5 px-3 text-white font-medium">Dr. Victor Cartes</td>
                        <td className="py-2.5 px-3 text-[#94A3B8]">Pedido urgente de vídeo de prévia para apresentar a 2 a 3 sócios interessados.</td>
                      </tr>
                      <tr className="hover:bg-white/[0.02]">
                        <td className="py-2.5 px-3 font-mono text-[#C5A059]">23/10 20:12</td>
                        <td className="py-2.5 px-3 font-mono text-[11px]">WhatsApp Ptt...20.12.39.ogg (16 KB)</td>
                        <td className="py-2.5 px-3 text-white font-medium">Dr. Victor Cartes</td>
                        <td className="py-2.5 px-3 text-[#94A3B8]">Especificação da navegação: página da equipe e perfil individual com fotos reais.</td>
                      </tr>
                      <tr className="hover:bg-white/[0.02]">
                        <td className="py-2.5 px-3 font-mono text-[#C5A059]">25/10 08:33</td>
                        <td className="py-2.5 px-3 font-mono text-[11px]">WhatsApp Ptt...08.33.21.ogg (48 KB)</td>
                        <td className="py-2.5 px-3 text-white font-medium">Guilherme Puentes</td>
                        <td className="py-2.5 px-3 text-[#94A3B8]">Alinhamento da produção audiovisual e fechamento das páginas da equipe.</td>
                      </tr>
                      <tr className="hover:bg-white/[0.02]">
                        <td className="py-2.5 px-3 font-mono text-[#C5A059]">25/10 11:47</td>
                        <td className="py-2.5 px-3 font-mono text-[11px]">WhatsApp Ptt...11.47.36.ogg (41 KB)</td>
                        <td className="py-2.5 px-3 text-white font-medium">Dr. Victor Cartes</td>
                        <td className="py-2.5 px-3 text-[#94A3B8]">Aprovação entusiasmada da prévia de atendimento fiduciário: <em>"Tá bonito demais mano"</em>.</td>
                      </tr>
                      <tr className="hover:bg-white/[0.02]">
                        <td className="py-2.5 px-3 font-mono text-[#C5A059]">25/10 13:02</td>
                        <td className="py-2.5 px-3 font-mono text-[11px]">WhatsApp Ptt...13.02.45.ogg (149 KB)</td>
                        <td className="py-2.5 px-3 text-white font-medium">Dr. Victor Cartes</td>
                        <td className="py-2.5 px-3 text-[#94A3B8]">Diretrizes da página de Conteúdo Jurídico (Blog): tempo de leitura, sobriedade e triagem sem mercantilização.</td>
                      </tr>
                      <tr className="hover:bg-white/[0.02]">
                        <td className="py-2.5 px-3 font-mono text-[#C5A059]">25/10 14:22</td>
                        <td className="py-2.5 px-3 font-mono text-[11px]">WhatsApp Ptt...14.22.01.ogg (147 KB)</td>
                        <td className="py-2.5 px-3 text-white font-medium">Guilherme Puentes</td>
                        <td className="py-2.5 px-3 text-[#94A3B8]">Explicação da orquestração WUXIA-OPS: formulário assíncrono para o n8n e filtros por prática.</td>
                      </tr>
                      <tr className="hover:bg-white/[0.02]">
                        <td className="py-2.5 px-3 font-mono text-[#C5A059]">25/10 16:28</td>
                        <td className="py-2.5 px-3 font-mono text-[11px]">WhatsApp Ptt...16.28.25.ogg (104 KB)</td>
                        <td className="py-2.5 px-3 text-white font-medium">Dr. Victor Cartes</td>
                        <td className="py-2.5 px-3 text-[#94A3B8]">Fechamento dos requisitos, alinhamento sobre envio de tarefas e conformidade com OAB.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="space-y-4">
                {/* 1. Cores e Estilo */}
                <div className="bg-[#0B192C] border border-[#1E293B] rounded-lg p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white">1. Decisão Cromática Soberana</span>
                    <span className="text-[10px] text-[#C5A059] font-mono bg-[#C5A059]/10 px-2 py-0.5 rounded">Reunião Meet (L880-L884)</span>
                  </div>
                  <blockquote className="border-l-2 border-[#C5A059] pl-3 py-1 text-xs italic text-[#CBD5E1] bg-[#060D17]/50 rounded-r">
                    "Embora as cores predominantes do meu site antigo fossem preto, a minha cor preferida e a cor que mais traz sofisticação pro mundo corporativo é o azul marinho ou azul petróleo com detalhes em prata e dourado. Então, assim, eu acho ele extremamente elegante. Azul petróleo com prata e dourado é perfeito."
                  </blockquote>
                  <p className="text-[11px] text-[#94A3B8]">
                    <strong>Ação Executada:</strong> Substituição total do preto puro por Azul Petróleo profundo (#0B192C e #0D2538) com acentos em Dourado (#C5A059) e Prata (#94A3B8).
                  </p>
                </div>

                {/* 2. Diretriz Anti-Fake */}
                <div className="bg-[#0B192C] border border-[#1E293B] rounded-lg p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white">2. Diretriz Anti-Fake & Imagens Autênticas</span>
                    <span className="text-[10px] text-[#C5A059] font-mono bg-[#C5A059]/10 px-2 py-0.5 rounded">Reunião Meet (L65, L1382)</span>
                  </div>
                  <blockquote className="border-l-2 border-[#C5A059] pl-3 py-1 text-xs italic text-[#CBD5E1] bg-[#060D17]/50 rounded-r">
                    "Imagens genéricas ou fotos abstratas irreais... isso me incomoda demais. O design deve privilegiar tipografia imponente, white space massivo e as fotos reais da minha equipe."
                  </blockquote>
                  <p className="text-[11px] text-[#94A3B8]">
                    <strong>Ação Executada:</strong> Proibição de martelos e bancos de imagens genéricos; uso exclusivo dos 5 sócios com fotos de estúdio tratadas.
                  </p>
                </div>

                {/* 3. Conteúdo Jurídico */}
                <div className="bg-[#0B192C] border border-[#1E293B] rounded-lg p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white">3. Página de Conteúdo Jurídico (Blog)</span>
                    <span className="text-[10px] text-[#C5A059] font-mono bg-[#C5A059]/10 px-2 py-0.5 rounded">chat.md (L961) & Áudio (13:02)</span>
                  </div>
                  <blockquote className="border-l-2 border-[#C5A059] pl-3 py-1 text-xs italic text-[#CBD5E1] bg-[#060D17]/50 rounded-r">
                    "A página de conteúdo juridico. Eu gostei desse estilo aqui. O artigo tem que passar autoridade técnica, com o tempo de leitura, as pílulas por assunto e um jeito fácil de quem está com uma dúvida séria entrar em contato sem parecer que estamos vendendo nada."
                  </blockquote>
                  <p className="text-[11px] text-[#94A3B8]">
                    <strong>Ação Executada:</strong> Layout editorial sóbrio com 17 artigos classificados por prática e botão de consulta técnica sob o Provimento OAB 205/2021.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* ================================================================== */}
        {/* FOOTER DO MODAL */}
        {/* ================================================================== */}
        <div className="px-6 py-4 border-t border-[#1E293B] bg-[#0B192C] flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
          <div className="text-[#94A3B8] text-[11px] flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
            <span>Design Tokens ativos em <code className="text-[#C5A059] font-mono">src/index.css</code></span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="py-2 px-4 rounded-lg bg-[#060D17] border border-[#1E293B] text-white hover:border-[#C5A059] transition-colors cursor-pointer"
            >
              Fechar Visualização
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
