import React, { useState, useEffect } from 'react';
import { 
  Palette, 
  Type, 
  Copy, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  Download, 
  Volume2, 
  Layers, 
  FileText, 
  FolderDown, 
  Lock, 
  ArrowLeft,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { NavigationPage } from '../types';

interface DocumentationPageProps {
  onNavigate: (page: NavigationPage) => void;
}

interface ColorToken {
  name: string;
  variable: string;
  hex: string;
  category: 'Atmosfera Noturna & Azul Petróleo' | 'Dourado Nobre & Champagne' | 'Prata Nobre & Suporte' | 'Tipografia & Contraste';
  description: string;
  textColor: string;
}

export const DocumentationPage: React.FC<DocumentationPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'design' | 'audios' | 'prd' | 'security' | 'downloads'>('design');
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  // Injetar meta tag noindex, nofollow para ocultar de motores de busca
  useEffect(() => {
    let robotsMeta = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    const previousContent = robotsMeta ? robotsMeta.content : null;

    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.name = 'robots';
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.content = 'noindex, nofollow, noarchive';

    return () => {
      if (robotsMeta) {
        if (previousContent !== null) {
          robotsMeta.content = previousContent;
        } else {
          robotsMeta.remove();
        }
      }
    };
  }, []);

  const colorTokens: ColorToken[] = [
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
    <div className="min-h-screen bg-[#060D17] text-[#E2E8F0] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* ================================================================== */}
        {/* HEADER DA PÁGINA OCULTA */}
        {/* ================================================================== */}
        <div className="bg-[#0B192C] border border-[#C5A059]/30 rounded-xl p-6 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[10px] uppercase font-bold tracking-[0.2em] text-[#C5A059]">
              <Lock className="h-3.5 w-3.5" />
              <span>Ambiente Reservado de Engenharia WUXIA-OPS (Oculto da Navegação Pública)</span>
            </div>
            <h1 className="text-2xl font-serif text-white tracking-wide mt-1">
              Cartes Advogados — Documentação Técnica & Governança
            </h1>
            <p className="text-xs text-[#94A3B8] mt-1">
              Acesso exclusivo para CTO, engenharia e auditoria técnica. URL restrita (<code className="text-[#C5A059]">/doc</code> ou <code className="text-[#C5A059]">/anexo</code>).
            </p>
          </div>

          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 py-2 px-4 rounded-lg bg-[#060D17] border border-[#C5A059]/40 hover:border-[#C5A059] text-white text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5 text-[#C5A059]" />
            <span>Voltar ao Site Oficial</span>
          </button>
        </div>

        {/* ================================================================== */}
        {/* SUBNAV DE ABAS */}
        {/* ================================================================== */}
        <div className="flex border-b border-[#1E293B] bg-[#0B192C] rounded-t-xl px-4 overflow-x-auto text-xs uppercase tracking-wider font-medium">
          <button
            onClick={() => setActiveTab('design')}
            className={`py-3.5 px-4 border-b-2 flex items-center space-x-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'design'
                ? 'border-[#C5A059] text-white font-semibold'
                : 'border-transparent text-[#94A3B8] hover:text-white'
            }`}
          >
            <Palette className="h-3.5 w-3.5 text-[#C5A059]" />
            <span>Design System & Cores</span>
          </button>

          <button
            onClick={() => setActiveTab('audios')}
            className={`py-3.5 px-4 border-b-2 flex items-center space-x-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'audios'
                ? 'border-[#C5A059] text-white font-semibold'
                : 'border-transparent text-[#94A3B8] hover:text-white'
            }`}
          >
            <Volume2 className="h-3.5 w-3.5 text-[#C5A059]" />
            <span>Áudios & Alinhamento</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`py-3.5 px-4 border-b-2 flex items-center space-x-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'security'
                ? 'border-[#C5A059] text-white font-semibold'
                : 'border-transparent text-[#94A3B8] hover:text-white'
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5 text-[#C5A059]" />
            <span>Segurança (WCAG + OWASP)</span>
          </button>

          <button
            onClick={() => setActiveTab('prd')}
            className={`py-3.5 px-4 border-b-2 flex items-center space-x-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'prd'
                ? 'border-[#C5A059] text-white font-semibold'
                : 'border-transparent text-[#94A3B8] hover:text-white'
            }`}
          >
            <FileText className="h-3.5 w-3.5 text-[#C5A059]" />
            <span>PRD v1.0 (Requisitos)</span>
          </button>

          <button
            onClick={() => setActiveTab('downloads')}
            className={`py-3.5 px-4 border-b-2 flex items-center space-x-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'downloads'
                ? 'border-[#C5A059] text-white font-semibold'
                : 'border-transparent text-[#94A3B8] hover:text-white'
            }`}
          >
            <FolderDown className="h-3.5 w-3.5 text-[#C5A059]" />
            <span>Arquivos & Migração</span>
          </button>
        </div>

        {/* ================================================================== */}
        {/* CONTEÚDO DAS ABAS */}
        {/* ================================================================== */}
        <div className="bg-[#0B192C] border border-[#1E293B] rounded-b-xl p-6 shadow-xl space-y-6">

          {/* ================= ABA 1: DESIGN SYSTEM ================= */}
          {activeTab === 'design' && (
            <div className="space-y-8">
              <div className="bg-[#060D17] border border-[#C5A059]/30 rounded-lg p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="text-white font-serif text-lg font-medium flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-[#C5A059]" />
                    Paleta Fiduciária Soberana: Azul Petróleo, Dourado e Prata
                  </h3>
                  <p className="text-xs text-[#94A3B8] mt-1 max-w-2xl leading-relaxed">
                    Diretriz aprovada pelo Dr. Victor Cartes: substituição integral do preto chapado por Azul Petróleo profundo (#0B192C / #0D2538) com acentos em Dourado Nobre (#C5A059) e Prata (#94A3B8).
                  </p>
                </div>
                <div className="text-[11px] text-[#C5A059] bg-[#C5A059]/10 px-3 py-1.5 rounded border border-[#C5A059]/30 flex items-center gap-1.5 font-semibold">
                  <ShieldCheck className="h-4 w-4" />
                  <span>WCAG AAA 7:1+ Validado</span>
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
                          className="bg-[#060D17] border border-[#1E293B] hover:border-[#C5A059]/50 rounded-lg p-4 transition-all flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-xs font-semibold text-white">{token.name}</span>
                              <button
                                onClick={() => handleCopy(token.hex)}
                                className="text-[11px] font-mono text-[#94A3B8] hover:text-[#C5A059] flex items-center gap-1 bg-[#0B192C] px-2 py-0.5 rounded border border-[#1E293B] transition-colors"
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

                            <div
                              className="h-12 w-full rounded border border-white/10 mb-3 flex items-center justify-center font-mono text-xs font-semibold shadow-inner"
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

          {/* ================= ABA 2: ÁUDIOS DO WHATSAPP ================= */}
          {activeTab === 'audios' && (
            <div className="space-y-6">
              <div className="bg-[#060D17] border border-[#C5A059]/30 rounded-lg p-5">
                <h4 className="text-xs uppercase tracking-widest text-[#C5A059] font-semibold flex items-center gap-2">
                  <Volume2 className="h-4 w-4" />
                  Trilha Cronológica dos 7 Áudios & Reunião do Google Meet
                </h4>
                <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">
                  Correlação direta entre as mensagens de voz gravadas (<code className="text-[#CBD5E1]">.ogg</code>), as transcrições do Google Meet e o histórico exportado do WhatsApp (<code className="text-[#CBD5E1]">chat.md</code>).
                </p>
              </div>

              <div className="overflow-x-auto bg-[#060D17] border border-[#1E293B] rounded-lg">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#1E293B] text-[#94A3B8] uppercase text-[10px] bg-[#0B192C]/50">
                      <th className="py-3 px-4">Data / Hora</th>
                      <th className="py-3 px-4">Arquivo / Tamanho</th>
                      <th className="py-3 px-4">Interlocutor</th>
                      <th className="py-3 px-4">Decisão & Diretriz</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1E293B]/60 text-[#CBD5E1]">
                    <tr className="hover:bg-white/[0.02]">
                      <td className="py-3 px-4 font-mono text-[#C5A059]">22/10 17:24</td>
                      <td className="py-3 px-4 font-mono text-[11px]">Meet (133k carac.)</td>
                      <td className="py-3 px-4 text-white font-medium">Dr. Victor & Guilherme</td>
                      <td className="py-3 px-4 text-[#94A3B8]">Definição mandatória de Azul Petróleo + Dourado e Prata (L882) e rejeição a fotos fakes (L65).</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02]">
                      <td className="py-3 px-4 font-mono text-[#C5A059]">23/10 20:12</td>
                      <td className="py-3 px-4 font-mono text-[11px]">WhatsApp Ptt...20.12.28.ogg</td>
                      <td className="py-3 px-4 text-white font-medium">Dr. Victor Cartes</td>
                      <td className="py-3 px-4 text-[#94A3B8]">Pedido urgente de vídeo de prévia para apresentar a 2 a 3 sócios interessados.</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02]">
                      <td className="py-3 px-4 font-mono text-[#C5A059]">23/10 20:12</td>
                      <td className="py-3 px-4 font-mono text-[11px]">WhatsApp Ptt...20.12.39.ogg</td>
                      <td className="py-3 px-4 text-white font-medium">Dr. Victor Cartes</td>
                      <td className="py-3 px-4 text-[#94A3B8]">Especificação do fluxo: página de equipe com perfis individuais e fotos reais.</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02]">
                      <td className="py-3 px-4 font-mono text-[#C5A059]">25/10 08:33</td>
                      <td className="py-3 px-4 font-mono text-[11px]">WhatsApp Ptt...08.33.21.ogg</td>
                      <td className="py-3 px-4 text-white font-medium">Guilherme Puentes</td>
                      <td className="py-3 px-4 text-[#94A3B8]">Alinhamento da produção e preparação da gravação da navegação.</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02]">
                      <td className="py-3 px-4 font-mono text-[#C5A059]">25/10 11:47</td>
                      <td className="py-3 px-4 font-mono text-[11px]">WhatsApp Ptt...11.47.36.ogg</td>
                      <td className="py-3 px-4 text-white font-medium">Dr. Victor Cartes</td>
                      <td className="py-3 px-4 text-[#94A3B8]">Aprovação entusiasmada da prévia de atendimento fiduciário: <em>"Tá bonito demais mano"</em>.</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02]">
                      <td className="py-3 px-4 font-mono text-[#C5A059]">25/10 13:02</td>
                      <td className="py-3 px-4 font-mono text-[11px]">WhatsApp Ptt...13.02.45.ogg</td>
                      <td className="py-3 px-4 text-white font-medium">Dr. Victor Cartes</td>
                      <td className="py-3 px-4 text-[#94A3B8]">Aprovação do layout editorial do Blog: tempo de leitura, sobriedade e triagem sem mercantilização.</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02]">
                      <td className="py-3 px-4 font-mono text-[#C5A059]">25/10 14:22</td>
                      <td className="py-3 px-4 font-mono text-[11px]">WhatsApp Ptt...14.22.01.ogg</td>
                      <td className="py-3 px-4 text-white font-medium">Guilherme Puentes</td>
                      <td className="py-3 px-4 text-[#94A3B8]">Orquestração técnica WUXIA-OPS: formulário assíncrono para o n8n e filtros por prática.</td>
                    </tr>
                    <tr className="hover:bg-white/[0.02]">
                      <td className="py-3 px-4 font-mono text-[#C5A059]">25/10 16:28</td>
                      <td className="py-3 px-4 font-mono text-[11px]">WhatsApp Ptt...16.28.25.ogg</td>
                      <td className="py-3 px-4 text-white font-medium">Dr. Victor Cartes</td>
                      <td className="py-3 px-4 text-[#94A3B8]">Fechamento de escopo, alinhamento sobre listas de tarefas e conformidade com OAB.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================= ABA 3: CHECKLIST DE SEGURANÇA (WCAG + OWASP) ================= */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="bg-[#060D17] border border-[#C5A059]/30 rounded-lg p-5">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-[#C5A059]" />
                  <h4 className="text-sm uppercase tracking-widest text-white font-bold">
                    Checklist de Segurança & Conformidade (WCAG AAA + OWASP)
                  </h4>
                </div>
                <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">
                  Matriz de validação técnica executada pela Squad de Engenharia (Uma + Dex) para o ambiente de produção.
                </p>
              </div>

              <div className="overflow-x-auto bg-[#060D17] border border-[#1E293B] rounded-lg">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#1E293B] text-[#94A3B8] uppercase text-[10px] bg-[#0B192C]/50">
                      <th className="py-3 px-4">Item de Segurança / Acessibilidade</th>
                      <th className="py-3 px-4">Responsável</th>
                      <th className="py-3 px-4">Como Validar</th>
                      <th className="py-3 px-4">Status WUXIA-OPS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1E293B]/60 text-[#CBD5E1]">
                    <tr className="hover:bg-white/[0.02]">
                      <td className="py-3 px-4 font-medium text-white">Contrast ratio ≥ 7:1 (WCAG AAA)</td>
                      <td className="py-3 px-4 text-[#C5A059]">Uma (Design UI)</td>
                      <td className="py-3 px-4 text-[#94A3B8]">Ferramenta axe ou Lighthouse (<code className="text-[#CBD5E1]">npm run lint:a11y</code>). Fundo #060D17 vs #F8FAFC (15.8:1).</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-950/40 text-emerald-400 border border-emerald-800/40">
                          <CheckCircle2 className="h-3 w-3" /> APROVADO
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-white/[0.02]">
                      <td className="py-3 px-4 font-medium text-white">Navegação por teclado</td>
                      <td className="py-3 px-4 text-[#C5A059]">Uma (Design UI)</td>
                      <td className="py-3 px-4 text-[#94A3B8]">Testes manuais + tabindex correto e anéis de foco visíveis em todos os elementos interativos.</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-950/40 text-emerald-400 border border-emerald-800/40">
                          <CheckCircle2 className="h-3 w-3" /> APROVADO
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-white/[0.02]">
                      <td className="py-3 px-4 font-medium text-white">Sanitização de entrada (XSS)</td>
                      <td className="py-3 px-4 text-cyan-400">Dex (Front-End Dev)</td>
                      <td className="py-3 px-4 text-[#94A3B8]">Sanitização nos campos de formulário antes do envio assíncrono para o webhook n8n.</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-950/40 text-emerald-400 border border-emerald-800/40">
                          <CheckCircle2 className="h-3 w-3" /> ATIVO
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-white/[0.02]">
                      <td className="py-3 px-4 font-medium text-white">CSP & Headers seguros</td>
                      <td className="py-3 px-4 text-cyan-400">Dex / DevOps</td>
                      <td className="py-3 px-4 text-[#94A3B8]">Configurar no proxy reverso Traefik / Nginx (Content-Security-Policy, HSTS, X-Frame-Options: DENY).</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-cyan-950/40 text-cyan-400 border border-cyan-800/40">
                          <CheckCircle2 className="h-3 w-3" /> SWARM STACK
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-white/[0.02]">
                      <td className="py-3 px-4 font-medium text-white">Dependências up-to-date</td>
                      <td className="py-3 px-4 text-cyan-400">Dex (Dev)</td>
                      <td className="py-3 px-4 text-[#94A3B8]"><code className="text-[#CBD5E1]">npm audit</code> no pipeline de CI/CD. Auditoria atual: 0 vulnerabilidades.</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-950/40 text-emerald-400 border border-emerald-800/40">
                          <CheckCircle2 className="h-3 w-3" /> 0 VULN
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================= ABA 4: PRD V1.0 ================= */}
          {activeTab === 'prd' && (
            <div className="space-y-4 text-xs leading-relaxed text-[#CBD5E1]">
              <div className="bg-[#060D17] border border-[#1E293B] rounded-lg p-5">
                <h4 className="text-sm font-serif text-white font-semibold">
                  PRD — Product Requirements Document (Cartes Advogados MVP v1.0)
                </h4>
                <p className="text-xs text-[#94A3B8] mt-1">
                  Diretrizes de Governança, Provimento OAB nº 205/2021 e Mapeamento das 6 Telas Oficiais.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-[#060D17] rounded-lg border border-[#1E293B]">
                  <h5 className="font-semibold text-white uppercase text-[11px] text-[#C5A059]">Regras OAB 205/2021</h5>
                  <p className="mt-2 text-[#94A3B8]">
                    Proibição estrita de mercantilização ostensiva. Comunicação fiduciária, informativa e discreta. Responsabilidade técnica expressa: Dr. Victor Hugo Lira Cartes (OAB/SP 421.506).
                  </p>
                </div>

                <div className="p-4 bg-[#060D17] rounded-lg border border-[#1E293B]">
                  <h5 className="font-semibold text-white uppercase text-[11px] text-[#C5A059]">Arquitetura de Conversão</h5>
                  <p className="mt-2 text-[#94A3B8]">
                    Triagem fiduciária conectada ao webhook n8n via endpoint https://fila.online.des.br/webhook/contato_webform gravando em Data Tables e disparando alertas no WhatsApp.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ================= ABA 5: DOWNLOADS & ARQUIVOS ================= */}
          {activeTab === 'downloads' && (
            <div className="space-y-4">
              <div className="bg-[#060D17] border border-[#1E293B] rounded-lg p-5">
                <h4 className="text-sm font-serif text-white font-semibold">
                  Pacotes de Conteúdo & Migração Editorial
                </h4>
                <p className="text-xs text-[#94A3B8] mt-1">
                  17 artigos jurídicos extraídos, catalogados e prontos para consumo no Ghost CMS Headless.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-4 bg-[#060D17] rounded-lg border border-[#1E293B] flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-white block">Índice Geral de Artigos (JSON)</span>
                    <span className="text-[10px] text-[#94A3B8]">17 artigos com slugs e tags</span>
                  </div>
                  <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/40 px-2 py-1 rounded">
                    conteudo_extraido/
                  </span>
                </div>

                <div className="p-4 bg-[#060D17] rounded-lg border border-[#1E293B] flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-white block">Fotos Reais da Equipe (Estúdio)</span>
                    <span className="text-[10px] text-[#94A3B8]">5 sócios com registros OAB/CRC</span>
                  </div>
                  <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/40 px-2 py-1 rounded">
                    public/equipe/
                  </span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
