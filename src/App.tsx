/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { QuemSomosPage } from './components/QuemSomosPage';
import { PracticeAreas } from './components/PracticeAreas';
import { EquipeFluentPage } from './components/EquipeFluentPage';
import { ArticlesCMS } from './components/ArticlesCMS';
import { ContatoPage } from './components/ContatoPage';
import { DocumentationPage } from './components/DocumentationPage';
import { CartesLayout } from './components/CartesLayout';
import { NavigationPage } from './types';

// Helper para detectar rota oculta via path ou hash
const detectHiddenRoute = (): NavigationPage => {
  if (typeof window === 'undefined') return 'home';
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  if (path === '/doc' || path === '/anexo' || hash === '#doc' || hash === '#anexo') {
    return 'doc';
  }
  return 'home';
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<NavigationPage>(detectHiddenRoute);
  const [selectedAreaForIntake, setSelectedAreaForIntake] = useState<string>('patrimonial-sucessorio');

  // Monitorar alterações na URL/Hash para abrir a página oculta /doc ou voltar
  useEffect(() => {
    const handleUrlChange = () => {
      const detected = detectHiddenRoute();
      if (detected === 'doc') {
        setCurrentPage('doc');
      }
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  const handleNavigate = (page: NavigationPage) => {
    setCurrentPage(page);
    if (page === 'doc') {
      window.location.hash = '#doc';
    } else {
      if (window.location.hash === '#doc' || window.location.hash === '#anexo') {
        window.history.pushState(null, '', '/');
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArea = (areaId: string) => {
    setSelectedAreaForIntake(areaId);
    handleNavigate('contato');
  };

  // ROTA OCULTA /doc ou /anexo: Painel de Engenharia, Design System e Governança WUXIA-OPS
  if (currentPage === 'doc' || currentPage === 'anexo') {
    return <DocumentationPage onNavigate={handleNavigate} />;
  }

  // SITE PÚBLICO OFICIAL: Limpo, nobre e fiduciário (Sem botões de desenvolvimento na visão pública)
  return (
    <CartesLayout
      onOpenIntake={() => handleNavigate('contato')}
      onNavigate={handleNavigate}
    >
      {/* 1. Header Global com TopBar Limpa e Fiduciária */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenIntake={() => handleNavigate('contato')}
      />

      {/* 2. Conteúdo da Página Ativa */}
      <div className="flex-1">
        {/* P01: HOME (Institucional Corporativo Amplo com Quiet Luxury) */}
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
          />
        )}

        {/* P02: QUEM SOMOS (História, Fundação, Propósito & Unidade Paulista) */}
        {currentPage === 'quem-somos' && (
          <QuemSomosPage
            onNavigate={handleNavigate}
          />
        )}

        {/* P03: ATUAÇÃO (Práticas Especializadas & Modais Detalhados) */}
        {currentPage === 'atuacao' && (
          <div className="py-12 bg-[#14171C]">
            <PracticeAreas
              onSelectAreaForIntake={handleSelectArea}
            />
          </div>
        )}

        {/* P04: EQUIPE (Microsoft Fluent 2 Cards, Grid de Advogados & Dossiês) */}
        {currentPage === 'equipe' && (
          <EquipeFluentPage
            onNavigate={handleNavigate}
            onOpenIntake={() => handleNavigate('contato')}
            hideHeader={true}
            hideFooter={true}
          />
        )}

        {/* P05: BLOG (Artigos Jurídicos, Filtros e Leitor Editorial) */}
        {currentPage === 'blog' && (
          <div className="py-12 bg-[#14171C]">
            <ArticlesCMS
              onScheduleWithAuthor={() => handleNavigate('contato')}
            />
          </div>
        )}

        {/* P06: CONTATO (Canais Diretos, Endereço Paulista, FAQ e WhatsApp Prioritário) */}
        {currentPage === 'contato' && (
          <ContatoPage
            onNavigate={handleNavigate}
          />
        )}
      </div>
    </CartesLayout>
  );
}
