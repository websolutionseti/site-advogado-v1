import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ArrowRight, X, Download, Share2, BookOpen, Clock, User, CheckCircle2 } from 'lucide-react';
import { Article } from '../types';
import { ARTICLES } from '../data/mockData';

interface ArticlesCMSProps {
  onScheduleWithAuthor: (practiceArea: string) => void;
}

export const ArticlesCMS: React.FC<ArticlesCMSProps> = ({ onScheduleWithAuthor }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [readingArticle, setReadingArticle] = useState<Article | null>(null);

  const categories = ['Todos', 'Família e Sucessões', 'Patrimonial', 'Direito e Tecnologia', 'Empresarial', 'Contratos', 'Tributário'];

  const filteredArticles = ARTICLES.filter((article) => {
    const matchesCategory = selectedCategory === 'Todos' || article.category === selectedCategory;
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getAreaIdFromCategory = (category: string): string => {
    switch (category) {
      case 'Família e Sucessões': return 'familia-sucessoes';
      case 'Patrimonial': return 'patrimonial-sucessorio';
      case 'Direito e Tecnologia': return 'digital-lgpd-cidadania';
      case 'Empresarial': return 'empresarial-societario';
      case 'Contratos': return 'contratos';
      case 'Tributário': return 'empresarial-societario';
      default: return 'patrimonial-sucessorio';
    }
  };

  const handleDownloadExecutiveSummary = (article: Article) => {
    const text = `RESUMO EXECUTIVO — CARTES ADVOGADOS ASSOCIADOS
Artigo: ${article.title}
Autor: ${article.author.name} (${article.author.oab})
Data de Publicação: ${article.publishedAt}

SÍNTESE EXECUTIVA:
${article.summary}

PRINCIPAIS CONCLUSÕES PRÁTICAS:
${article.takeaways.map((t, i) => `${i + 1}. ${t}`).join('\n')}

CONTEÚDO ANALÍTICO:
${article.content.join('\n\n')}

Cartes Advogados — Advocacia Estratégica
São Paulo / Brasília | www.cartesadvogados.com.br`;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Resumo_${article.slug}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <section id="artigos" className="border-b border-slate-800/80 bg-[#0b111e] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c5a880]">
              CENTRO DE INTELIGÊNCIA JURÍDICA
            </span>
            <h2 className="mt-2 text-3xl font-normal text-slate-100 sm:text-4xl">
              Artigos, Pareceres & Análises Estratégicas
            </h2>
          </div>
          <p className="max-w-md text-sm text-slate-400">
            Produção doutrinária e jurisprudencial contínua da banca sobre decisões dos Tribunais Superiores, CARF e inovações regulatórias.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-5">
          
          {/* Category Filter Buttons (Functional segmented control, not pills) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900/90 rounded-sm border border-slate-800">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#c5a880] text-[#0b111e] font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por tema ou tese..."
              className="w-full rounded-sm border border-slate-800 bg-[#0e1626] py-1.5 pl-8 pr-3 text-xs text-slate-200 placeholder-slate-500 focus:border-[#c5a880] focus:outline-none"
            />
          </div>

        </div>

        {/* Articles Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="group flex flex-col justify-between rounded-sm border border-slate-800 bg-[#0e1626]/80 p-6 sm:p-7 transition-all duration-200 hover:border-[#c5a880]/50 hover:bg-[#0e1626] hover:shadow-lg hover:shadow-black/30"
            >
              <div>
                {/* Article Cover Image */}
                {article.imageUrl && (
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm bg-slate-900 mb-5">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e1626] via-transparent to-transparent opacity-60" />
                  </div>
                )}

                {/* Clean unboxed metadata with typographic separators */}
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="font-semibold text-[#c5a880]">{article.category}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>{article.readTime}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>{article.publishedAt}</span>
                </div>

                <h3 className="mt-3 font-serif-legal text-xl sm:text-2xl font-normal text-slate-100 group-hover:text-[#c5a880] transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-slate-300 line-clamp-3">
                  {article.summary}
                </p>

                {/* Author Info */}
                <div className="mt-6 flex items-center gap-2.5 text-xs text-slate-400">
                  <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-slate-800 text-slate-300 font-semibold text-[11px]">
                    {article.author.name.substring(4, 6)}
                  </div>
                  <div>
                    <span className="text-slate-200 font-medium">{article.author.name}</span>
                    <span className="text-slate-500 text-[11px] ml-1.5">({article.author.oab})</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="mt-7 border-t border-slate-800/80 pt-4">
                <button
                  onClick={() => setReadingArticle(article)}
                  className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#c5a880] hover:text-[#d8be98]"
                >
                  <span>Ler Parecer Completo</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="mt-12 rounded-sm border border-slate-800 bg-[#0e1626] p-8 text-center text-slate-400">
            Nenhum artigo encontrado com os critérios de busca selecionados.
          </div>
        )}

      </div>

      {/* Full Article Reader Modal with Framer Motion Spring */}
      <AnimatePresence>
        {readingArticle && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-sm border border-slate-700 bg-[#0e1626] p-6 shadow-2xl sm:p-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setReadingArticle(null)}
                className="absolute top-5 right-5 rounded-sm border border-slate-700 bg-slate-800 p-2 text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Header Metadata */}
              <div className="pr-8">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="font-semibold text-[#c5a880]">{readingArticle.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{readingArticle.publishedAt}</span>
                  <span aria-hidden="true">·</span>
                  <span>{readingArticle.readTime}</span>
                </div>

                <h2 className="mt-3 font-serif-legal text-2xl font-normal text-slate-100 sm:text-3xl leading-snug">
                  {readingArticle.title}
                </h2>

                <div className="mt-4 flex items-center gap-3 border-y border-slate-800/80 py-3 text-xs text-slate-300">
                  <span className="font-medium">{readingArticle.author.name}</span>
                  <span className="text-slate-600">·</span>
                  <span className="text-slate-400">{readingArticle.author.role}</span>
                  <span className="text-slate-600">·</span>
                  <span className="text-slate-400">{readingArticle.author.oab}</span>
                </div>
              </div>

              {/* Modal Cover Image */}
              {readingArticle.imageUrl && (
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm bg-slate-900 mt-6 border border-slate-800">
                  <img
                    src={readingArticle.imageUrl}
                    alt={readingArticle.title}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              {/* Executive Takeaways Box */}
              <div className="mt-6 rounded-sm border border-slate-800 bg-[#0b111e] p-5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#c5a880]">
                  Pontos-Chave & Conclusões Executivas
                </h4>
                <ul className="mt-3 space-y-2">
                  {readingArticle.takeaways.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#c5a880]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Article Content Paragraphs */}
              <div className="mt-7 space-y-4 text-sm leading-relaxed text-slate-200">
                {readingArticle.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Tags (Unboxed text with dots) */}
              <div className="mt-8 flex items-center gap-2 text-xs text-slate-500 border-t border-slate-800 pt-4">
                <span>Palavras-chave:</span>
                {readingArticle.tags.map((tag, idx) => (
                  <React.Fragment key={tag}>
                    <span className="text-slate-400">{tag}</span>
                    {idx < readingArticle.tags.length - 1 && <span>·</span>}
                  </React.Fragment>
                ))}
              </div>

              {/* Action Bar */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-slate-800 pt-6">
                <button
                  onClick={() => handleDownloadExecutiveSummary(readingArticle)}
                  className="flex items-center justify-center gap-2 rounded-sm border border-slate-700 bg-slate-800 px-4 py-2.5 text-xs font-medium text-slate-200 hover:text-white"
                >
                  <Download className="h-4 w-4" />
                  <span>Baixar Resumo Executivo (.txt)</span>
                </button>

                <button
                  onClick={() => {
                    const areaId = getAreaIdFromCategory(readingArticle.category);
                    setReadingArticle(null);
                    onScheduleWithAuthor(areaId);
                  }}
                  className="rounded-sm bg-[#c5a880] px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-[#0b111e] hover:bg-[#d8be98]"
                >
                  Consultar Sócio sobre Este Tema
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};
