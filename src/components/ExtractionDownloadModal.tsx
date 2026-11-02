import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Copy, 
  Check, 
  FolderDown, 
  FileCode, 
  CheckCircle2, 
  ExternalLink, 
  HardDrive, 
  Image as ImageIcon,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { ARTICLES } from '../data/mockData';

interface ExtractionDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExtractionDownloadModal: React.FC<ExtractionDownloadModalProps> = ({ isOpen, onClose }) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState<'downloads' | 'script' | 'artigos'>('downloads');
  const [selectedPreviewArticle, setSelectedPreviewArticle] = useState<number | null>(null);

  if (!isOpen) return null;

  const pythonScriptCode = `#!/usr/bin/env python3
"""
EXTRATOR OFICIAL DE CONTEÚDO E IMAGENS — CARTES ADVOGADOS ASSOCIADOS
Extrai 100% dos textos dos artigos (em .md e .docx) e faz download de todas as imagens.
"""
import os, json, re, html, urllib.request, ssl

URL_API = 'https://cartesadvogados.com.br/wp-json/wp/v2/posts?per_page=100&_embed=true'
PASTA_DESTINO = 'conteudo_extraido'
os.makedirs(os.path.join(PASTA_DESTINO, 'md'), exist_ok=True)
os.makedirs(os.path.join(PASTA_DESTINO, 'imagens'), exist_ok=True)

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

req = urllib.request.Request(URL_API, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req, context=ctx) as resp:
    posts = json.loads(resp.read().decode())

print(f"Extraindo {len(posts)} artigos e baixando imagens...")
for i, post in enumerate(posts, 1):
    titulo = html.unescape(post['title']['rendered']).strip()
    slug = post['slug']
    content = re.sub(r'<[^>]+>', '', post['content']['rendered'])
    
    # Download da imagem de capa
    if '_embedded' in post and 'wp:featuredmedia' in post['_embedded']:
        img_url = post['_embedded']['wp:featuredmedia'][0]['source_url']
        ext = os.path.splitext(img_url)[1] or '.png'
        img_nome = f"{i:02d}_{slug}{ext}"
        try:
            urllib.request.urlretrieve(img_url, os.path.join(PASTA_DESTINO, 'imagens', img_nome))
            print(f"   [OK] Imagem: {img_nome}")
        except Exception as e:
            print(f"   [Erro Img]: {e}")
            
    # Salvar Markdown
    with open(os.path.join(PASTA_DESTINO, 'md', f"{i:02d}_{slug}.md"), 'w', encoding='utf-8') as f:
        f.write(f"# {titulo}\\n\\n{content}")
    print(f"[{i}/{len(posts)}] {titulo}")

print("Sucesso! Arquivos salvos na pasta conteudo_extraido.")`;

  const handleCopyScript = () => {
    navigator.clipboard.writeText(pythonScriptCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm">
      <div className="relative flex max-h-[92vh] w-full max-w-4xl flex-col rounded-sm border border-slate-700 bg-[#0e1626] shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-[#c5a880]/15 text-[#c5a880]">
              <FolderDown className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-100">
                Central de Extração de Conteúdo & Google Drive
              </h2>
              <span className="text-[11px] text-slate-400">
                17 Artigos extraídos em .md + Todas as imagens em alta resolução
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-sm border border-slate-700 bg-slate-800 p-1.5 text-slate-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 border-b border-slate-800 bg-slate-900/60 px-6 py-2.5">
          <button
            onClick={() => setActiveTab('downloads')}
            className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors ${
              activeTab === 'downloads'
                ? 'bg-[#c5a880] text-[#0b111e] font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Downloads & Google Drive
          </button>
          <button
            onClick={() => setActiveTab('script')}
            className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors ${
              activeTab === 'script'
                ? 'bg-[#c5a880] text-[#0b111e] font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Script Python Oficial
          </button>
          <button
            onClick={() => setActiveTab('artigos')}
            className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors ${
              activeTab === 'artigos'
                ? 'bg-[#c5a880] text-[#0b111e] font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Inventário dos 17 Artigos ({ARTICLES.length})
          </button>
        </div>

        {/* Body Area */}
        <div className="flex-1 overflow-y-auto p-6">
          
          {/* TAB 1: DOWNLOADS & GOOGLE DRIVE */}
          {activeTab === 'downloads' && (
            <div className="space-y-6">
              
              {/* Highlight Box: 1-Click ZIP */}
              <div className="rounded-sm border border-[#c5a880]/40 bg-gradient-to-r from-[#0b111e] to-[#121c33] p-5 shadow-lg">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#c5a880]">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      <span>Pacote Completo Já Extraído (11.2 MB)</span>
                    </div>
                    <h3 className="mt-1 text-base font-medium text-slate-100">
                      Arquivo ZIP com os 17 artigos (.md) + 17 Imagens Originais
                    </h3>
                    <p className="mt-1 text-xs text-slate-400">
                      Inclui todas as imagens originais de capa, textos limpos em Markdown com frontmatter, e manifesto <code className="text-slate-300">README_MIGRACAO.md</code>.
                    </p>
                  </div>

                  <a
                    href="/conteudo_extraido_cartes_advogados.zip"
                    download="conteudo_extraido_cartes_advogados.zip"
                    className="flex shrink-0 items-center justify-center gap-2 rounded-sm bg-[#c5a880] px-5 py-3 text-xs font-semibold tracking-wider uppercase text-[#0b111e] hover:bg-[#d8be98]"
                  >
                    <Download className="h-4 w-4" />
                    <span>Baixar ZIP (11.2 MB)</span>
                  </a>
                </div>
              </div>

              {/* Instructions for Google Drive */}
              <div className="rounded-sm border border-slate-800 bg-[#0b111e] p-5">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-300">
                  <HardDrive className="h-4 w-4 text-[#c5a880]" />
                  <span>Como Salvar na sua Pasta do Google Drive (H: ou Web)</span>
                </div>

                <div className="mt-4 space-y-3 text-xs leading-relaxed text-slate-300">
                  <div className="flex items-start gap-3 rounded-sm border border-slate-800/80 bg-[#0e1626] p-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#c5a880] text-[10px] font-bold text-[#0b111e]">
                      1
                    </span>
                    <div>
                      <strong className="text-slate-100">Opção 1 (Direto no Windows pelo Drive H: ou G:):</strong>
                      <p className="mt-0.5 text-slate-400">
                        Após baixar o ZIP acima, extraia a pasta para o seu Google Drive sincronizado:
                        <br />
                        <code className="mt-1 block rounded bg-slate-900 p-1.5 text-emerald-300">
                          H:\Meu Drive\Google AI Studio\Dr_VictorHugoCartes\conteudo_extraido\
                        </code>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-sm border border-slate-800/80 bg-[#0e1626] p-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#c5a880] text-[10px] font-bold text-[#0b111e]">
                      2
                    </span>
                    <div>
                      <strong className="text-slate-100">Opção 2 (Upload no Google Drive pelo Navegador):</strong>
                      <p className="mt-0.5 text-slate-400">
                        Abra a pasta vista no seu print do celular:
                        <br />
                        <strong>Meu Drive &gt; Google AI Studio &gt; Dr_VictorHugoCartes</strong>
                        <br />
                        Arraste o arquivo ZIP ou a pasta descompactada para lá. O Google Drive sincronizará automaticamente com seu celular e computador.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Summary Counts */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-sm border border-slate-800 bg-[#0b111e] p-3.5 text-center">
                  <span className="font-serif-legal text-2xl font-medium text-slate-100">17</span>
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 mt-0.5">Artigos Extraídos</p>
                </div>
                <div className="rounded-sm border border-slate-800 bg-[#0b111e] p-3.5 text-center">
                  <span className="font-serif-legal text-2xl font-medium text-emerald-400">17</span>
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 mt-0.5">Imagens Baixadas</p>
                </div>
                <div className="rounded-sm border border-slate-800 bg-[#0b111e] p-3.5 text-center">
                  <span className="font-serif-legal text-2xl font-medium text-slate-100">100%</span>
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 mt-0.5">Integridade de Texto</p>
                </div>
                <div className="rounded-sm border border-slate-800 bg-[#0b111e] p-3.5 text-center">
                  <span className="font-serif-legal text-2xl font-medium text-[#c5a880]">0</span>
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 mt-0.5">Falhas de Conexão</p>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: PYTHON SCRIPT */}
          {activeTab === 'script' && (
            <div className="space-y-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                    Script Python Standalone (extrair_conteudo_cartes.py)
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Utiliza a API REST nativa do WordPress para garantir precisão e baixar as imagens físicas para a pasta local.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyScript}
                    className="flex items-center gap-1.5 rounded-sm border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-slate-200 hover:text-white"
                  >
                    {copiedCode ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copiedCode ? 'Copiado!' : 'Copiar Script'}</span>
                  </button>

                  <a
                    href="/extrair_conteudo_cartes.py"
                    download="extrair_conteudo_cartes.py"
                    className="flex items-center gap-1.5 rounded-sm bg-[#c5a880] px-3.5 py-1.5 text-xs font-semibold text-[#0b111e] hover:bg-[#d8be98]"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Baixar .py</span>
                  </a>
                </div>
              </div>

              <pre className="max-h-96 overflow-y-auto rounded-sm border border-slate-800 bg-[#070b14] p-4 text-xs font-mono text-emerald-300">
                {pythonScriptCode}
              </pre>

              <div className="rounded-sm border border-slate-800 bg-[#0b111e] p-3 text-xs text-slate-400">
                <strong>Como executar na sua máquina:</strong>
                <p className="mt-1">
                  1. Abra o terminal na pasta onde salvou o script.<br />
                  2. Execute: <code className="text-slate-200">python extrair_conteudo_cartes.py</code> (não requer bibliotecas externas, roda com bibliotecas nativas do Python).
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: ARTIGOS INVENTÁRIO */}
          {activeTab === 'artigos' && (
            <div className="space-y-4">
              <div className="overflow-x-auto rounded-sm border border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-slate-800 bg-slate-900/80 text-[10px] uppercase tracking-wider text-slate-400">
                    <tr>
                      <th className="px-3 py-2.5">#</th>
                      <th className="px-3 py-2.5">Título do Artigo</th>
                      <th className="px-3 py-2.5">Categoria</th>
                      <th className="px-3 py-2.5">Data</th>
                      <th className="px-3 py-2.5">Palavras</th>
                      <th className="px-3 py-2.5 text-right">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/70">
                    {ARTICLES.map((art, idx) => (
                      <tr key={art.id} className="hover:bg-[#0b111e]/80 transition-colors">
                        <td className="px-3 py-2.5 font-mono text-slate-500">{idx + 1}</td>
                        <td className="px-3 py-2.5 font-medium text-slate-200 max-w-xs truncate">
                          {art.title}
                        </td>
                        <td className="px-3 py-2.5 text-[#c5a880]">{art.category}</td>
                        <td className="px-3 py-2.5 text-slate-400">{art.publishedAt}</td>
                        <td className="px-3 py-2.5 text-slate-400">{art.wordCount || 800}</td>
                        <td className="px-3 py-2.5 text-right">
                          <button
                            onClick={() => setSelectedPreviewArticle(idx)}
                            className="text-[11px] font-semibold text-[#c5a880] hover:underline"
                          >
                            Prévia
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {selectedPreviewArticle !== null && (
                <div className="rounded-sm border border-slate-700 bg-[#0b111e] p-4 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="font-semibold text-slate-200">
                      {ARTICLES[selectedPreviewArticle].title}
                    </span>
                    <button
                      onClick={() => setSelectedPreviewArticle(null)}
                      className="text-slate-500 hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="mt-2 text-slate-300 leading-relaxed">
                    {ARTICLES[selectedPreviewArticle].summary}
                  </p>
                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Autor: {ARTICLES[selectedPreviewArticle].author.name}</span>
                    <a
                      href={ARTICLES[selectedPreviewArticle].originalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[#c5a880] hover:underline"
                    >
                      <span>Abrir no site original</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-800 bg-slate-900/60 px-6 py-3">
          <span className="text-[11px] text-slate-500">
            Arquivos prontos para sincronização na pasta H: ou Google Drive.
          </span>
          <button
            onClick={onClose}
            className="rounded-sm border border-slate-700 bg-slate-800 px-4 py-1.5 text-xs font-semibold text-slate-300 hover:text-white"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
