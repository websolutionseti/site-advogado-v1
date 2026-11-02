/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { QuemSomosPage } from './components/QuemSomosPage';
import { PracticeAreas } from './components/PracticeAreas';
import { EquipeFluentPage } from './components/EquipeFluentPage';
import { ArticlesCMS } from './components/ArticlesCMS';
import { ContatoPage } from './components/ContatoPage';
import { PRDViewerModal } from './components/PRDViewerModal';
import { ExtractionDownloadModal } from './components/ExtractionDownloadModal';
import { StyleGuideModal } from './components/StyleGuideModal';
import { CartesLayout } from './components/CartesLayout';
import { NavigationPage, ConsultationLead, N8nWebhookExecution } from './types';
import { INITIAL_N8N_LOGS } from './data/mockData';

export default function App() {
  const [currentPage, setCurrentPage] = useState<NavigationPage>('home');
  const [isPRDOpen, setIsPRDOpen] = useState(false);
  const [isExtractionOpen, setIsExtractionOpen] = useState(false);
  const [isStyleGuideOpen, setIsStyleGuideOpen] = useState(false);
  const [selectedAreaForIntake, setSelectedAreaForIntake] = useState<string>('patrimonial-sucessorio');
  const [n8nExecutions, setN8nExecutions] = useState<N8nWebhookExecution[]>(INITIAL_N8N_LOGS);

  const handleNavigate = (page: NavigationPage) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArea = (areaId: string) => {
    setSelectedAreaForIntake(areaId);
    handleNavigate('contato');
  };

  return (
    <CartesLayout
      onOpenPRD={() => setIsPRDOpen(true)}
      onOpenExtraction={() => setIsExtractionOpen(true)}
      onOpenIntake={() => handleNavigate('contato')}
      onNavigate={handleNavigate}
    >
      {/* 1. Header Global com TopBar Executiva & Menu das 6 Páginas */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenPRD={() => setIsPRDOpen(true)}
        onOpenExtraction={() => setIsExtractionOpen(true)}
        onOpenIntake={() => handleNavigate('contato')}
        onOpenStyleGuide={() => setIsStyleGuideOpen(true)}
      />

      {/* 2. Conteúdo da Página Ativa (Páginas Totalmente Dedicadas) */}
      <div className="flex-1">
        {/* P01: HOME (Institucional Corporativo Amplo com Quiet Luxury) */}
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenPRD={() => setIsPRDOpen(true)}
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
            onOpenPRD={() => setIsPRDOpen(true)}
            onOpenExtraction={() => setIsExtractionOpen(true)}
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

      {/* 3. Modais Auxiliares para Documentação, Design System e Extração */}
      <PRDViewerModal
        isOpen={isPRDOpen}
        onClose={() => setIsPRDOpen(false)}
      />

      <ExtractionDownloadModal
        isOpen={isExtractionOpen}
        onClose={() => setIsExtractionOpen(false)}
      />

      <StyleGuideModal
        isOpen={isStyleGuideOpen}
        onClose={() => setIsStyleGuideOpen(false)}
      />
    </CartesLayout>
  );
}
