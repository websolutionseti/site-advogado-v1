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
import { PoliticaPrivacidadePage } from './components/PoliticaPrivacidadePage';
import { TermosUsoPage } from './components/TermosUsoPage';
import { GuilhermePuentesPage } from './components/GuilhermePuentesPage';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { CartesLayout } from './components/CartesLayout';
import { NavigationPage } from './types';
import { initVisitorTracking, initializeApprovedScripts } from './services/visitorTracking';

// Helper para detectar rota ativa via path ou hash
const detectRouteFromUrl = (): NavigationPage => {
  if (typeof window === 'undefined') return 'home';
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();

  // Rotas Ocultas de Engenharia
  if (path === '/doc' || path === '/anexo' || hash === '#doc' || hash === '#anexo') {
    return 'doc';
  }

  // Rotas Oficiais de Governança
  if (path === '/privacidade' || hash === '#privacidade') {
    return 'privacidade';
  }
  if (path === '/termos' || hash === '#termos') {
    return 'termos';
  }
  if (path === '/guilhermepuentes' || hash === '#guilhermepuentes') {
    return 'guilhermepuentes';
  }

  return 'home';
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<NavigationPage>(detectRouteFromUrl);
  const [selectedAreaForIntake, setSelectedAreaForIntake] = useState<string>('patrimonial-sucessorio');

  // Inicialização de telemetria e rastreamento de consentimento LGPD
  useEffect(() => {
    initVisitorTracking(currentPage);
    initializeApprovedScripts();
  }, [currentPage]);

  // Monitorar alterações na URL/Hash para navegação fluida
  useEffect(() => {
    const handleUrlChange = () => {
      const detected = detectRouteFromUrl();
      setCurrentPage(detected);
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
    } else if (page === 'privacidade') {
      window.location.hash = '#privacidade';
    } else if (page === 'termos') {
      window.location.hash = '#termos';
    } else if (page === 'guilhermepuentes') {
      window.location.hash = '#guilhermepuentes';
    } else {
      if (['#doc', '#anexo', '#privacidade', '#termos', '#guilhermepuentes'].includes(window.location.hash)) {
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

  // SITE PÚBLICO OFICIAL: Limpo, nobre e fiduciário
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

        {/* PÁGINA DEDICADA: POLÍTICA DE PRIVACIDADE & LGPD */}
        {currentPage === 'privacidade' && (
          <PoliticaPrivacidadePage
            onNavigate={handleNavigate}
          />
        )}

        {/* PÁGINA DEDICADA: TERMOS DE USO INSTITUCIONAIS */}
        {currentPage === 'termos' && (
          <TermosUsoPage
            onNavigate={handleNavigate}
          />
        )}

        {/* PÁGINA DEDICADA: GUILHERME PUENTES (CTO & ARQUITETO DE SOFTWARE) */}
        {currentPage === 'guilhermepuentes' && (
          <GuilhermePuentesPage
            onNavigate={handleNavigate}
          />
        )}
      </div>

      {/* Banner de Gestão de Cookies e Consentimento LGPD/GDPR */}
      <CookieConsentBanner onNavigate={handleNavigate} />
    </CartesLayout>
  );
}
