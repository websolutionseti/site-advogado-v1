import { PracticeArea, Lawyer, Article, N8nWebhookExecution } from '../types';

export const PRACTICE_AREAS: PracticeArea[] = [
  {
    id: 'patrimonial-sucessorio',
    title: 'Planejamento Patrimonial & Sucessório',
    subtitle: 'Estruturação de holdings familiares e preservação de patrimônio',
    description: 'Arquitetura jurídica preventiva para transmissão segura de bens, governança familiar, blindagem patrimonial lícita e redução substancial do ITCMD.',
    fullDescription: 'Atuamos na estruturação de holdings patrimoniais familiares, doações com cláusulas de usufruto, incomunicabilidade e inalienabilidade, elaboração de testamentos e protocolos familiares. Nosso foco é blindar o legado construído por fundadores, prevenindo conflitos entre herdeiros e evitando inventários litigiosos e onerosos.',
    scopeList: [
      'Constituição de Holdings Familiares puras e de administração de bens próprios',
      'Elaboração de acordos parassociais, regras de voto e governança intergeracional',
      'Planejamento tributário preventivo na sucessão patrimonial (otimização de ITCMD e IRPF)',
      'Testamentos públicos e cerrados, doações com reserva de usufruto e reversão',
      'Prevenção de litígios e mediação prévia em disputas sucessórias'
    ],
    representativeCases: [
      {
        title: 'Holding Familiar Agroindustrial',
        description: 'Patrimônio de R$ 140M consolidado em estrutura imobiliária e de participações.',
        result: 'Economia fiscal de 58% em ITCMD e transição de controle garantida em vida.'
      },
      {
        title: 'Segregação de Ativos Operacionais vs. Imobiliários',
        description: 'Empresa familiar com risco civil em transportes e 18 imóveis urbanos.',
        result: 'Separação jurídica total dos imóveis locados, neutralizando riscos operacionais.'
      }
    ],
    leadPartner: 'Dr. Victor Cartes',
    partnerRole: 'Sócio Fundador & Advogado (OAB/SP 421.506)',
    iconName: 'Landmark',
    imageUrl: '/imagens/01_capa_ChatGPT-Image-21-de-set-de-2026-16_40_03.png'
  },
  {
    id: 'familia-sucessoes',
    title: 'Família & Sucessões',
    subtitle: 'Divórcios complexos, partilha de quotas societárias e pactos antenupciais',
    description: 'Condução discreta e estratégica de divórcios judiciais e extrajudiciais, apuração de haveres conjugais em empresas, pensão e regimes de bens.',
    fullDescription: 'Conectamos as esferas familiar, patrimonial e empresarial. Atuamos em divórcios com partilha de quotas de empresas, redação de pactos antenupciais com regras econômicas personalizadas, reconhecimento e dissolução de união estável e inventários com composição amigável de partilha.',
    scopeList: [
      'Divórcios consensuais e litigiosos com empresas e participações no polo de partilha',
      'Pactos antenupciais customizados com cláusulas indenizatórias e regimes mistos',
      'Dissolução de união estável sem contrato prévio com defesa patrimonial',
      'Inventários e arrolamentos de bens de alta complexidade em cartório e judiciais',
      'Ações de alimentos, guarda compartilhada e planejamento sucessório conjugal'
    ],
    representativeCases: [
      {
        title: 'Divórcio com Sociedade Limitada Operacional',
        description: 'Ex-cônjuge pleiteava ingresso imediato na administração da sociedade.',
        result: 'Apuração e pagamento de haveres estritamente em haveres patrimoniais, preservando a governança dos sócios.'
      },
      {
        title: 'Pacto Antenupcial Estruturado para Sócios',
        description: 'Empresário com startup em rodada de investimento.',
        result: 'Separação total absoluta com regras claras sobre valorização de quotas futuras.'
      }
    ],
    leadPartner: 'Dr. Victor Cartes',
    partnerRole: 'Sócio Fundador & Especialista em Família e Negociação',
    iconName: 'Scale',
    imageUrl: '/imagens/02_capa_ChatGPT-Image-10-de-set-de-2026-17_23_01.png'
  },
  {
    id: 'empresarial-societario',
    title: 'Empresarial & Societário',
    subtitle: 'Governança corporativa, resolução de impasses e apuração de haveres',
    description: 'Assessoria jurídica para sociedades de diferentes portes, estruturação de contratos sociais, dissolução parcial e defesa de direitos dos sócios.',
    fullDescription: 'Mais de 20 anos de experiência orientando empresários em todas as fases da atividade empresarial: constituição de sociedades, acordos de sócios, operações de reestruturação, apuração judicial e extrajudicial de haveres em dissoluções societárias e condução de disputas corporativas.',
    scopeList: [
      'Constituição, alteração e reestruturação de sociedades limitadas e anônimas',
      'Elaboração de Acordos de Sócios e Acordos de Acionistas com regras de saída',
      'Dissolução parcial de sociedade e apuração contábil/jurídica de haveres',
      'Governança corporativa preventiva e assessoria contínua para diretorias',
      'Defesa técnica contra desconsideração da personalidade jurídica'
    ],
    representativeCases: [
      {
        title: 'Apuração de Haveres em Exclusão de Sócio',
        description: 'Divergência sobre valuation e fluxo de caixa descontado em empresa de tecnologia.',
        result: 'Acordo extrajudicial preservando R$ 8,5M do caixa da empresa com parcelamento favorável.'
      },
      {
        title: 'Reestruturação Societária para Entrada de Investidores',
        description: 'Adequação societária de LTDA para S/A fechada com governança de compliance.',
        result: 'Aporte de capital fechado com sucesso sem contingências para os fundadores.'
      }
    ],
    leadPartner: 'Dr. Anderson Bispo da Silva',
    partnerRole: 'Advogado & Consultor Jurídico (OAB/SP 252.001)',
    iconName: 'Building2',
    imageUrl: '/imagens/04_capa_ChatGPT-Image-10-de-set-de-2026-16_26_45.png'
  },
  {
    id: 'contratos',
    title: 'Contratos Empresariais & Comerciais',
    subtitle: 'Segurança contratual, mitigação de riscos e validade jurídica de instrumentos',
    description: 'Elaboração, negociação e auditoria de contratos estratégicos comerciais, contratos de tecnologia, parcerias e cláusulas de rescisão e indenização.',
    fullDescription: 'Desenvolvemos instrumentos contratuais sólidos que equilibram ambição comercial e segurança preventiva. Avaliamos riscos de assinaturas eletrônicas, cláusulas penais, termos de confidencialidade (NDA), contratos de fornecimento, prestação de serviços B2B e contratos de franquia e distribuição.',
    scopeList: [
      'Redação e negociação de contratos complexos de prestação de serviços e fornecimento',
      'Auditoria de validade jurídica em assinaturas eletrônicas e plataformas digitais',
      'Cláusulas de não-concorrência, confidencialidade e retenção de segredos de negócio',
      'Estruturação de contratos de representação comercial e parcerias estratégicas',
      'Assessoria em resilição, resolução contratual e notificações extrajudiciais'
    ],
    representativeCases: [
      {
        title: 'Revisão Contratual Global de Grupo Varejista',
        description: 'Auditoria em mais de 120 contratos com fornecedores e prestadores.',
        result: 'Identificação e anulação de cláusulas leoninas com redução de passivos potenciais em 40%.'
      },
      {
        title: 'Validação de Fluxo de Assinaturas Eletrônicas',
        description: 'Empresa com risco de nulidade em contratos digitais com certificados não ICP-Brasil.',
        result: 'Adequação aos requisitos do art. 10 da MP 2.200-2/01, conferindo plena força executiva.'
      }
    ],
    leadPartner: 'Dr. Leonardo Gutierrez',
    partnerRole: 'Advogado & Consultor Jurídico (OAB/SP 306.294)',
    iconName: 'FileText',
    imageUrl: '/imagens/06_capa_ChatGPT-Image-10-de-set-de-2026-15_45_01.png'
  },
  {
    id: 'trabalhista',
    title: 'Trabalhista Estratégico & Compliance',
    subtitle: 'Prevenção de passivos e defesa corporativa em demandas trabalhistas',
    description: 'Atuação consultiva e contenciosa focada na mitigação de contingências laborais, contratos especiais para executivos e compliance trabalhista.',
    fullDescription: 'Nossa área trabalhista atua preventivamente ao lado dos setores de Recursos Humanos e Jurídico Interno para alinhar políticas de remuneração, terceirização segura, jornadas flexíveis e rescisões estratégicas. Defendemos empresas perante a Justiça do Trabalho com teses sólidas e técnicas.',
    scopeList: [
      'Auditoria trabalhista preventiva para mapeamento e eliminação de passivos ocultos',
      'Contratos de trabalho para diretores e executivos (bônus, vesting, confidencialidade)',
      'Defesa corporativa em reclamações trabalhistas individuais e plúrimas',
      'Adequação de rotinas de teletrabalho e controle de ponto eletrônico',
      'Elaboração de programas de conformidade e código de conduta interno'
    ],
    representativeCases: [
      {
        title: 'Defesa em Pedido de Vínculo de Executivo PJ',
        description: 'Ex-diretor comercial pleiteava verbas rescisórias de R$ 1,9M.',
        result: 'Sentença de improcedência total com base na Lei da Liberdade Econômica e prova pericial.'
      },
      {
        title: 'Reestruturação de Políticas de Teletrabalho',
        description: 'Indústria com 200 colaboradores em regime híbrido.',
        result: 'Padronização dos termos aditivos, eliminando riscos de horas extras e danos ergonômicos.'
      }
    ],
    leadPartner: 'Dr. Leonardo Gutierrez',
    partnerRole: 'Advogado & Consultor Jurídico (OAB/SP 306.294)',
    iconName: 'Briefcase',
    imageUrl: '/imagens/05_capa_ChatGPT-Image-10-de-set-de-2026-15_57_18.png'
  },
  {
    id: 'consumidor',
    title: 'Direito do Consumidor & Relações de Consumo',
    subtitle: 'Assessoria contenciosa e consultiva para empresas no mercado de consumo',
    description: 'Defesa empresarial contra litígios de consumo de grande repercussão, adequação de SAC e canais de atendimento, e atuação preventiva perante o PROCON.',
    fullDescription: 'Apoiamos empresas em suas relações com consumidores finais, garantindo equilíbrio entre a conformidade com o CDC e a viabilidade operacional do negócio. Atuamos em ações civis públicas, defesas administrativas no PROCON e na revisão de termos de garantia, contratos de adesão e políticas comerciais.',
    scopeList: [
      'Defesa contenciosa estratégica perante Juizados Especiais e Varas Cíveis',
      'Atuação e defesas administrativas perante órgãos de proteção ao consumidor (PROCON/SENACON)',
      'Revisão preventiva de termos de adesão, cláusulas de cancelamento e políticas de troca',
      'Treinamento de equipes de atendimento para mitigação de litígios consumeristas',
      'Consultoria para e-commerce, marketplaces e plataformas digitais de consumo'
    ],
    representativeCases: [
      {
        title: 'Defesa em Procedimento Coletivo no PROCON',
        description: 'Apuração sobre suposta prática abusiva em cancelamentos de assinaturas.',
        result: 'Termo de ajustamento preventivo sem aplicação de multas pecuniárias.'
      },
      {
        title: 'Contencioso de Volume com Redução Drástica de Condenações',
        description: 'Empresa de serviços de tecnologia com alto volume de reclamações em JEC.',
        result: 'Adoção de política de conciliação célere, reduzindo despesas judiciais em 64%.'
      }
    ],
    leadPartner: 'Dr. Pedro Sirna',
    partnerRole: 'Advogado & Consultor Jurídico (OAB/SP 412.274)',
    iconName: 'ShieldAlert'
  },
  {
    id: 'civel-imobiliario',
    title: 'Cível & Imobiliário',
    subtitle: 'Segurança em negócios imobiliários, posse, propriedade e disputas cíveis',
    description: 'Assessoria completa em compra e venda de imóveis, locações comerciais, regularização fundiária, usucapião e contencioso de responsabilidade civil.',
    fullDescription: 'Garantimos segurança técnica em operações imobiliárias urbanas e rurais, realizando due diligence aprofundada de matrículas, certidões e histórico dos vendedores. Conduzimos ações possessórias, despejos comerciais e litígios contratuais perante o Poder Judiciário.',
    scopeList: [
      'Due Diligence imobiliária rigorosa para aquisições seguras de imóveis e terrenos',
      'Elaboração e revisão de contratos de locação comercial (Built to Suit, shopping centers)',
      'Ações de despejo, renovatórias de locação e revisionais de aluguel',
      'Regularização de imóveis, usucapião extrajudicial e judicial',
      'Defesa em execuções de títulos extrajudiciais e medidas cautelares'
    ],
    representativeCases: [
      {
        title: 'Aquisição Imobiliária Comercial de R$ 18M na Faria Lima',
        description: 'Auditoria de certidões com apontamento de distribuições fiscais em face do vendedor.',
        result: 'Estruturação de garantias e seguro garantia, viabilizando o negócio sem risco de fraude à execução.'
      },
      {
        title: 'Renovatória de Locação Empresarial',
        description: 'Ponto comercial estratégico ameaçado de retomada injustificada pelo locador.',
        result: 'Procedência da ação com renovação do contrato por 5 anos nos termos de mercado.'
      }
    ],
    leadPartner: 'Dr. Pedro Sirna',
    partnerRole: 'Advogado & Consultor Jurídico (OAB/SP 412.274)',
    iconName: 'Building2'
  },
  {
    id: 'digital-lgpd-cidadania',
    title: 'Digital, LGPD & Cidadania Italiana',
    subtitle: 'Proteção de dados, herança digital, inteligência artificial e cidadania europeia',
    description: 'Adequação integral à LGPD, validade da prova digital gerada por IA, herança de ativos virtuais/games e assessoria jurídica em cidadania italiana.',
    fullDescription: 'Atuamos nas fronteiras do direito contemporâneo. Prestamos consultoria para governança de dados pessoais (LGPD), contratos de tecnologia, assessoria sobre sucessão e herança de contas digitais e jogos, além de suporte técnico para processos de reconhecimento de cidadania italiana via judicial (tribunais italianos) e administrativa.',
    scopeList: [
      'Programas de conformidade à LGPD e atuação como Encarregado de Dados (DPO) consultivo',
      'Validade probatória de documentos digitais e perícias frente ao uso de Inteligência Artificial',
      'Planejamento sucessório de heranças digitais (criptoativos, games, perfis e celulares)',
      'Elaboração de Termos de Uso, Políticas de Privacidade e Acordos de Compartilhamento (DPA)',
      'Processos judiciais de Cidadania Italiana perante os Tribunais Regionais na Itália'
    ],
    representativeCases: [
      {
        title: 'Adequação LGPD de Plataforma de Serviços Digitais',
        description: 'Mapeamento de dados de mais de 350 mil titulares com matriz de riscos ANPD.',
        result: 'Conformidade atestada com implementação de canal de direitos dos titulares.'
      },
      {
        title: 'Cidadania Italiana via Judicial Materna (Linha 1948)',
        description: 'Família com descendência italiana por linha materna pré-constituição de 1948.',
        result: 'Sentença favorável no Tribunal de Roma com transcrição das certidões no Comune.'
      }
    ],
    leadPartner: 'Dr. Leonardo Gutierrez',
    partnerRole: 'Advogado & Consultor em Direito Digital (OAB/SP 306.294)',
    iconName: 'FileText',
    imageUrl: '/imagens/07_capa_prova-digital-2.png'
  }
];

export const LAWYERS: Lawyer[] = [
  {
    id: 'victor-cartes',
    name: 'Dr. Victor Hugo Cartes',
    role: 'Sócio Fundador & Consultor Jurídico',
    oab: 'OAB/SP 421.506',
    slug: 'victor-cartes',
    squad: 'Squad Patrimonial, Família & Sucessões',
    squadRole: 'Sócio Coordenador de Wealth & Family Governance',
    featuredQuote: 'A verdadeira segurança patrimonial começa na preservação da harmonia entre família, sucessão e negócios.',
    casesHandledCount: 380,
    bio: 'Mais de 10 anos de experiência profissional com atuação destacada em Planejamento Patrimonial, Familiar e Sucessório e Negociação Estratégica. Fundou a Cartes Advogados para proporcionar assessoria jurídica personalizada, unindo família, patrimônio e empresas.',
    education: [
      'Bacharel em Direito com foco em Direito Civil e Sucessões',
      'Especialização em Planejamento Patrimonial e Sucessório',
      'Formação Avançada em Técnicas de Negociação e Mediação de Conflitos'
    ],
    areas: ['Planejamento Patrimonial', 'Família & Sucessões', 'Holdings Familiares', 'Pactos Matrimoniais'],
    email: 'victor@cartesadvogados.com.br',
    linkedin: 'https://www.linkedin.com/in/victor-cartes/',
    photoUrl: 'https://cartesadvogados.com.br/wp-content/uploads/2025/12/WhatsApp-Image-2025-11-27-at-16.05.58-e1765296613987.jpeg'
  },
  {
    id: 'leonardo-gutierrez',
    name: 'Dr. Leonardo Gutierrez',
    role: 'Advogado & Consultor Jurídico',
    oab: 'OAB/SP 306.294',
    slug: 'leonardo-gutierrez',
    squad: 'Squad Direito Digital, LGPD & Tributário',
    squadRole: 'Sócio Líder de Inovação Jurídica & Compliance',
    featuredQuote: 'Na velocidade da inteligência artificial, o compliance preventivo é o único escudo contra passivos tecnológicos.',
    casesHandledCount: 450,
    bio: 'Mais de 20 anos de experiência jurídica sólida dedicada ao Direito Empresarial, Tributário, Trabalhista e às áreas de Compliance, Proteção de Dados (LGPD) e Direito Digital. Vasta bagagem consultiva e contenciosa.',
    education: [
      'Pós-Graduado em Direito Empresarial e Tributário',
      'Especialista em Compliance e Proteção de Dados Pessoais (LGPD)',
      'Bacharel em Direito com mais de duas décadas de exercício da advocacia'
    ],
    areas: ['Empresarial', 'Tributário', 'Trabalhista', 'Compliance & LGPD', 'Direito Digital'],
    email: 'leonardo@cartesadvogados.com.br',
    linkedin: 'https://www.linkedin.com/in/leonardo-gutierrez/',
    photoUrl: 'https://cartesadvogados.com.br/wp-content/uploads/2025/12/WhatsApp-Image-2025-11-27-at-16.05.59-e1765296654795.jpeg'
  },
  {
    id: 'anderson-bispo',
    name: 'Dr. Anderson Bispo da Silva',
    role: 'Advogado & Consultor Jurídico',
    oab: 'OAB/SP 252.001',
    slug: 'anderson-bispo',
    squad: 'Squad Empresarial, Societário & M&A',
    squadRole: 'Sócio Estrategista em Reorganização Societária',
    featuredQuote: 'Contratos societários bem estruturados não são custo, são a fundação inabalável do crescimento empresarial.',
    casesHandledCount: 310,
    bio: 'Mais de 20 anos de carreira jurídica dedicados com excelência ao Direito Empresarial e Societário, assessorando empresas nacionais e multinacionais em diferentes fases de crescimento, reorganizações e resolução de litígios corporativos.',
    education: [
      'Especialista em Direito Societário e Governança Corporativa',
      'Extensão em Dissolução de Sociedades e Apuração de Haveres',
      'Bacharel em Direito com sólida atuação perante os Tribunais Estaduais e Federais'
    ],
    areas: ['Direito Empresarial', 'Societário', 'Apuração de Haveres', 'Governança', 'M&A'],
    email: 'anderson@cartesadvogados.com.br',
    linkedin: 'https://www.linkedin.com/in/anderson-bispo/',
    photoUrl: 'https://cartesadvogados.com.br/wp-content/uploads/2026/09/ChatGPT-Image-22-de-set.-de-2026-18_32_46.png'
  },
  {
    id: 'pedro-sirna',
    name: 'Dr. Pedro Sirna',
    role: 'Advogado & Consultor Jurídico',
    oab: 'OAB/SP 412.274',
    slug: 'pedro-sirna',
    squad: 'Squad Contencioso Cível, Imobiliário & Consumidor',
    squadRole: 'Sócio Responsável por Contencioso de Volume & Cível',
    featuredQuote: 'Agilidade contenciosa e soluções negociais evitam o desgaste e o custo de processos arrastados.',
    casesHandledCount: 520,
    bio: 'Atuação voltada a relações jurídicas modernas e dinâmicas, com atenção especial às questões consumeristas, patrimoniais, contratuais, imobiliárias e à resolução de conflitos civis com foco em eficiência e agilidade.',
    education: [
      'Especialista em Direito Civil e Relações de Consumo',
      'Formação em Direito Imobiliário e Contratos Comerciais',
      'Bacharel em Direito inscrito na OAB/SP'
    ],
    areas: ['Consumidor', 'Cível & Imobiliário', 'Contratos', 'Resolução de Conflitos'],
    email: 'pedro@cartesadvogados.com.br',
    linkedin: 'https://www.linkedin.com/in/pedro-sirna/',
    photoUrl: 'https://cartesadvogados.com.br/wp-content/uploads/2025/12/WhatsApp-Image-2025-11-27-at-16.05.59-1-e1765296692831.jpeg'
  },
  {
    id: 'brenner-refundini',
    name: 'Brenner Refundini',
    role: 'Contador & Analista Tributário',
    oab: 'CRC/SP 1SP 346408/0-4',
    slug: 'brenner-refundini',
    squad: 'Squad Controladoria & Eficiência Tributária',
    squadRole: 'Líder Técnico de Gestão Tributária & Controladoria',
    featuredQuote: 'A precisão dos números e o alinhamento fiscal garantem a perenidade das holdings e estruturas empresariais.',
    casesHandledCount: 290,
    bio: 'Graduado em Ciências Contábeis e especializado em Gestão Financeira, desenvolve atuação essencial com foco na organização, análise e eficiência da gestão contábil e tributária das estruturas patrimoniais e empresariais da banca.',
    education: [
      'Graduado em Ciências Contábeis (CRC/SP)',
      'Especialização em Gestão Financeira e Controladoria',
      'Atuação técnica integrada ao planejamento sucessório e societário'
    ],
    areas: ['Gestão Contábil', 'Análise Tributária', 'Holdings', 'Controladoria'],
    email: 'brenner@cartesadvogados.com.br',
    linkedin: 'https://www.linkedin.com/in/brenner-refundini/',
    photoUrl: 'https://cartesadvogados.com.br/wp-content/uploads/2025/12/WhatsApp-Image-2025-11-27-at-16.24.17-e1765296933673.jpeg'
  },
  {
    id: 'paulo-faria-neto',
    name: 'Dr. Paulo Faria Neto',
    role: 'Advogado & Consultor Jurídico',
    oab: 'OAB/SP 420.055',
    slug: 'paulo-faria-neto',
    squad: 'Squad Gestão Contratual & Riscos Operacionais',
    squadRole: 'Consultor Sênior em Prevenção de Conflitos',
    featuredQuote: 'Prevenir litígios com clareza documental preserva o ativo mais valioso de uma empresa: o foco no seu negócio.',
    casesHandledCount: 220,
    bio: 'Sua atuação é marcada por uma visão prática e multidisciplinar do Direito, compreendido como instrumento de organização preventiva e apoio à tomada de decisões estratégicas para mitigar impactos econômicos e operacionais.',
    education: [
      'Bacharel em Direito inscrito na OAB/SP',
      'Especialização em Direito Civil e Empresarial Prático',
      'Atuação consultiva focada em prevenção de litígios corporativos'
    ],
    areas: ['Direito Civil', 'Empresarial', 'Prevenção de Riscos', 'Negociação'],
    email: 'paulo@cartesadvogados.com.br',
    linkedin: 'https://www.linkedin.com/in/paulo-faria-neto/',
    photoUrl: 'https://cartesadvogados.com.br/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-24-at-18.40.22.jpeg'
  }
];

export const ARTICLES: Article[] = [
  {
    id: 'art-01',
    title: 'O SÓCIO DA EMPRESA SE DIVORCIOU. E AGORA, COMO FICAM AS QUOTAS DA EMPRESA?',
    slug: 'o-socio-da-empresa-se-divorciou-e-agora-como-ficam-as-quotas-da-empresa',
    category: 'Família e Sucessões',
    summary: 'Uma análise detalhada sobre a partilha de quotas societárias no divórcio, a distinção entre direitos patrimoniais e direitos políticos de sócio, e como o contrato social protege a sociedade.',
    content: [
      'Quando um sócio de uma empresa passa por um divórcio, a primeira dúvida que surge entre os demais sócios é: o ex-cônjuge pode se tornar sócio da empresa? A resposta do Código Civil é clara: não necessariamente, a depender das cláusulas societárias.',
      'Existe uma separação fundamental entre o valor econômico das quotas (que integra a comunhão de bens conforme o regime adotado) e a condição de sócio (affectio societatis), que exige concordância dos demais parceiros.',
      'O contrato social bem redigido deve prever cláusula expressa vedando o ingresso de terceiros decorrente de partilha matrimonial, estipulando a apuração de haveres e o cronograma de pagamento dos direitos econômicos sem asfixiar o fluxo de caixa.'
    ],
    author: {
      name: 'Dr. Victor Hugo Cartes',
      role: 'Sócio Fundador | Família & Planejamento Sucessório',
      oab: 'OAB/SP 421.506'
    },
    readTime: '8 min de leitura',
    publishedAt: '21 de Setembro de 2026',
    featured: true,
    takeaways: [
      'Distinção jurídica clara entre valor patrimonial das quotas e direitos de administração da empresa.',
      'Necessidade de cláusula impeditiva de ingresso de ex-cônjuges no Contrato Social.',
      'Mecanismos de avaliação e parcelamento de haveres para preservar a higidez financeira da sociedade.'
    ],
    tags: ['Divórcio', 'Quotas Societárias', 'Contrato Social', 'Direito de Família', 'Empresarial'],
    imageUrl: '/imagens/01_capa_ChatGPT-Image-21-de-set-de-2026-16_40_03.png',
    originalUrl: 'https://cartesadvogados.com.br/o-socio-da-empresa-se-divorciou-e-agora-como-ficam-as-quotas-da-empresa/',
    wordCount: 1973
  },
  {
    id: 'art-02',
    title: 'UNIÃO ESTÁVEL SEM CONTRATO: QUAIS SÃO OS RISCOS PATRIMONIAIS?',
    slug: 'uniao-estavel-sem-contrato-quais-sao-os-riscos-patrimoniais',
    category: 'Família e Sucessões',
    summary: 'A ausência de escritura pública ou contrato de convivência aplica compulsoriamente a comunhão parcial de bens. Entenda os impactos na compra de imóveis e empresas.',
    content: [
      'No Brasil, a união estável não formalizada submete-se automaticamente ao regime da comunhão parcial de bens por força do artigo 1.725 do Código Civil.',
      'Isso significa que todo o patrimônio adquirido a título oneroso durante a convivência é presumido como esforço comum, mesmo que registrado exclusivamente em nome de um dos parceiros.',
      'A celebração de uma Escritura Pública de União Estável com estipulação de separação total de bens ou regras específicas é o instrumento adequado para conferir segurança patrimonial a ambos.'
    ],
    author: {
      name: 'Dr. Victor Hugo Cartes',
      role: 'Sócio Fundador & Consultor Jurídico',
      oab: 'OAB/SP 421.506'
    },
    readTime: '5 min de leitura',
    publishedAt: '10 de Setembro de 2026',
    takeaways: [
      'Comunhão parcial automática na união estável informal.',
      'Risco de meação sobre bens e investimentos adquiridos no período.',
      'Eficácia e proteção do contrato de convivência registrado em cartório.'
    ],
    tags: ['União Estável', 'Regime de Bens', 'Comunhão Parcial', 'Planejamento Patrimonial'],
    imageUrl: '/imagens/02_capa_ChatGPT-Image-10-de-set-de-2026-17_23_01.png',
    originalUrl: 'https://cartesadvogados.com.br/uniao-estavel-sem-contrato-quais-sao-os-riscos-patrimoniais/',
    wordCount: 1121
  },
  {
    id: 'art-03',
    title: 'QUANDO O GAME VIRA PATRIMÔNIO: A HERANÇA DOS JOGOS DIGITAIS NO BRASIL',
    slug: 'quando-o-game-vira-patrimonio-a-heranca-dos-jogos-digitais-no-brasil',
    category: 'Direito e Tecnologia',
    summary: 'Contas com skins raras, itens colecionáveis e patrimônios virtuais avaliados em milhares de reais. O que diz a jurisprudência sobre herança digital no Brasil.',
    content: [
      'A ascensão dos esportes eletrônicos e dos mundos virtuais transformou contas em plataformas como Steam, Epic Games, Roblox e League of Legends em verdadeiros acervos patrimoniais.',
      'O dilema jurídico reside na natureza jurídica desses ativos: são licenças de uso intransferíveis conforme os Termos de Serviço ou bens com valor econômico passíveis de herança?',
      'Os tribunais brasileiros começam a acolher a transmissão hereditária quando comprovado o valor patrimonial intrínseco, exigindo a inclusão formal desses bens no inventário ou em testamento digital.'
    ],
    author: {
      name: 'Dr. Leonardo Gutierrez',
      role: 'Advogado & Consultor em Direito Digital',
      oab: 'OAB/SP 306.294'
    },
    readTime: '9 min de leitura',
    publishedAt: '10 de Setembro de 2026',
    takeaways: [
      'Conflito entre termos de uso de plataformas de jogos e o direito sucessório brasileiro.',
      'Avaliação pericial e inventário de bens virtuais com valor de mercado.',
      'Recomendação de testamento digital para nomeação de inventariante específico.'
    ],
    tags: ['Jogos Digitais', 'Herança Digital', 'Ativos Virtuais', 'Direito Digital'],
    imageUrl: '/imagens/03_capa_5e4d39_3dab41718b9f4693aa42c4c6b64641dcm.avif',
    originalUrl: 'https://cartesadvogados.com.br/quando-o-game-vira-patrimonio-a-heranca-dos-jogos-digitais-no-brasil/',
    wordCount: 2144
  },
  {
    id: 'art-04',
    title: 'O CASAL PODE CRIAR SUAS PRÓPRIAS REGRAS NO PACTO ANTENUPCIAL?',
    slug: 'o-casal-pode-criar-suas-proprias-regras-no-pacto-antenupcial',
    category: 'Família e Sucessões',
    summary: 'Da cláusula penal por infidelidade à estipulação de compensação financeira por dedicação aos filhos: a evolução da autonomia privada nos pactos matrimoniais.',
    content: [
      'O pacto antenupcial deixou de ser um mero documento burocrático de escolha entre comunhão parcial e separação de bens para se tornar um verdadeiro contrato de vida conjugal.',
      'Hoje, é plenamente lícita a fixação de cláusulas de indenização por violação de deveres conjugais, regramentos sobre administração financeira compartilhada e renúncia a benefícios reflexos.',
      'O limite imposto pela ordem jurídica reside no respeito aos direitos fundamentais, à dignidade humana e às normas cogentes de ordem pública.'
    ],
    author: {
      name: 'Dr. Victor Hugo Cartes',
      role: 'Sócio Fundador & Consultor Jurídico',
      oab: 'OAB/SP 421.506'
    },
    readTime: '11 min de leitura',
    publishedAt: '10 de Setembro de 2026',
    takeaways: [
      'Liberdade negocial ampla para desenhar regimes de bens atípicos e mistos.',
      'Validade de cláusulas indenizatórias e extrapatrimoniais conforme entendimento do STJ.',
      'Necessidade de escritura pública e averbação no cartório de registro de imóveis.'
    ],
    tags: ['Pacto Antenupcial', 'Casamento', 'Autonomia Privada', 'Direito de Família'],
    imageUrl: '/imagens/04_capa_ChatGPT-Image-10-de-set.-de-2026-16_26_45.png',
    originalUrl: 'https://cartesadvogados.com.br/o-casal-pode-criar-suas-proprias-regras-no-pacto-antenupcial/',
    wordCount: 3055
  },
  {
    id: 'art-05',
    title: 'FILHOS PODEM EXIGIR ACESSO AO CELULAR DO FALECIDO?',
    slug: 'filhos-podem-exigir-acesso-ao-celular-do-falecido',
    category: 'Família e Sucessões',
    summary: 'O confronto entre o direito à intimidade post-mortem do de cujus e o direito dos herdeiros ao acesso a dados bancários, fotos e conversas eletrônicas.',
    content: [
      'Com o falecimento de um ente querido, smartphones guardam não apenas memórias afetivas, mas senhas de contas bancárias, criptoativos e mensagens privadas confidenciais.',
      'A jurisprudência brasileira tem ponderado com rigor a inviolabilidade da intimidade (art. 5º, X da CF) e a preservação de dados patrimoniais estritamente necessários ao inventário.',
      'Fabricantes de sistemas como Apple e Google exigem alvará judicial específico, exceto nos casos em que o titular configurou antecipadamente um "Contato de Herdeiro" nas opções de privacidade.'
    ],
    author: {
      name: 'Dr. Victor Hugo Cartes',
      role: 'Sócio Fundador & Advogado',
      oab: 'OAB/SP 421.506'
    },
    readTime: '6 min de leitura',
    publishedAt: '10 de Setembro de 2026',
    takeaways: [
      'Proteção da privacidade do falecido versus necessidade patrimonial do inventário.',
      'Requisitos para expedição de alvará judicial direcionado a Big Techs.',
      'Importância de diretivas antecipadas de vontade sobre o destino de dados digitais.'
    ],
    tags: ['Privacidade Post-Mortem', 'Herança Digital', 'Alvará Judicial', 'Smartphones'],
    imageUrl: '/imagens/05_capa_ChatGPT-Image-10-de-set.-de-2026-15_57_18.png',
    originalUrl: 'https://cartesadvogados.com.br/filhos-podem-exigir-acesso-ao-celular-do-falecido/',
    wordCount: 1189
  },
  {
    id: 'art-06',
    title: 'ERROS NA ASSINATURA ELETRÔNICA QUE PODEM ANULAR CONTRATOS',
    slug: 'erros-na-assinatura-eletronica-que-podem-anular-contratos',
    category: 'Contratos',
    summary: 'Diferença entre assinatura eletrônica simples, avançada e qualificada (ICP-Brasil) e as armadilhas de validade jurídica que tornam títulos inexequíveis.',
    content: [
      'A proliferação de plataformas de assinatura digital trouxe agilidade ao comércio, mas gerou uma onda de contratos questionados em juízo por ausência de aceite inequívoco.',
      'A MP 2.200-2/2001 e a Lei 14.063/2020 estabelecem três níveis de assinatura. Contratos com assinaturas simples sem rastreabilidade de IP, hash e autenticação multifatorial são frequentemente anulados em execuções de título extrajudicial.',
      'Nossa banca orienta a inclusão de cláusula expressa de consentimento com o meio eletrônico adotado e a exigência de certificação ICP-Brasil em negócios de alto valor econômico.'
    ],
    author: {
      name: 'Dr. Leonardo Gutierrez',
      role: 'Advogado & Consultor em Contratos e Tech',
      oab: 'OAB/SP 306.294'
    },
    readTime: '9 min de leitura',
    publishedAt: '10 de Setembro de 2026',
    takeaways: [
      'Diferenciação probatória entre assinaturas simples, avançadas e qualificadas.',
      'Requisitos indispensáveis no log de auditoria da plataforma contratada.',
      'Cláusula de concordância mútua para blindar a força executiva do documento.'
    ],
    tags: ['Assinatura Eletrônica', 'Validade Contratual', 'ICP-Brasil', 'Execução de Título'],
    imageUrl: '/imagens/06_capa_ChatGPT-Image-10-de-set.-de-2026-15_45_01.png',
    originalUrl: 'https://cartesadvogados.com.br/erros-na-assinatura-eletronica-que-podem-anular-contratos/',
    wordCount: 2488
  },
  {
    id: 'art-07',
    title: 'O FUTURO DA PROVA DIGITAL DIANTE DA INTELIGÊNCIA ARTIFICIAL',
    slug: 'o-futuro-da-prova-digital-diante-da-inteligencia-artificial',
    category: 'Direito e Tecnologia',
    summary: 'Como deepfakes de voz e imagem, mensagens forjadas e manipulação por IA desafiam a cadeia de custódia e a ata notarial nos processos judiciais brasileiros.',
    content: [
      'A capacidade de sistemas de inteligência artificial generativa em criar áudios, vídeos e documentos com aparência hiper-realista coloca em xeque a confiabilidade dos prints de tela como elemento probatório.',
      'O simples print do WhatsApp já é reiteradamente rechaçado pelo Superior Tribunal de Justiça (STJ) pela facilidade de adulteração sem preservação de metadados.',
      'A preservação de provas na era da IA requer a observância estrita da cadeia de custódia (art. 158-A do CPP por analogia civil), utilização de registro em blockchain com carimbo do tempo e atas notariais periciais.'
    ],
    author: {
      name: 'Dr. Leonardo Gutierrez',
      role: 'Advogado & Consultor em Direito Digital',
      oab: 'OAB/SP 306.294'
    },
    readTime: '8 min de leitura',
    publishedAt: '10 de Setembro de 2026',
    takeaways: [
      'Inadmissibilidade do print de tela isolado no entendimento consolidado do STJ.',
      'Cadeia de custódia probatória e preservação de metadados originais.',
      'Novas técnicas de perícia forense digital diante de deepfakes e IA generativa.'
    ],
    tags: ['Prova Digital', 'Inteligência Artificial', 'Deepfake', 'Cadeia de Custódia'],
    imageUrl: '/imagens/07_capa_prova-digital-2.png',
    originalUrl: 'https://cartesadvogados.com.br/o-futuro-da-prova-digital-diante-da-inteligencia-artificial/',
    wordCount: 2192
  },
  {
    id: 'art-08',
    title: 'Qual a Responsabilidade dos Sócios na Apuração dos Haveres em Caso de Dissolução Empresarial',
    slug: 'qual-a-responsabilidade-dos-socios-na-apuracao-dos-haveres-em-caso-de-dissolucao-empresarial',
    category: 'Empresarial',
    summary: 'A metodologia contábil e jurídica para calcular a quota do sócio retirante ou falecido sem inviabilizar as operações da sociedade remanescente.',
    content: [
      'A saída de um sócio por vontade própria, exclusão ou falecimento impõe a apuração de seus haveres com base no balanço de determinação, avaliando o patrimônio líquido a valor de saída.',
      'Muitas sociedades entram em colapso financeiro porque o contrato social não previu prazo razoável para o pagamento ou permitiu a exigência imediata de pagamento em parcela única.',
      'O artigo 1.031 do Código Civil confere aos sócios ampla liberdade para pactuar critérios próprios no contrato social, incluindo parcelamento em até 36 meses e índices de correção monetária.'
    ],
    author: {
      name: 'Dr. Anderson Bispo da Silva',
      role: 'Advogado & Consultor Empresarial',
      oab: 'OAB/SP 252.001'
    },
    readTime: '6 min de leitura',
    publishedAt: '22 de Janeiro de 2025',
    takeaways: [
      'Adoção do balanço de determinação com avaliação de ativos e passivos reais.',
      'Fixação de prazos e parcelamentos contratuais para proteção do fluxo de caixa.',
      'Critérios de apuração para sócio retirante versus sócio excluído por justa causa.'
    ],
    tags: ['Dissolução Societária', 'Apuração de Haveres', 'Balanço de Determinação', 'Direito Empresarial'],
    imageUrl: '/imagens/08_capa_L6sRr5cMXQ.jpg',
    originalUrl: 'https://cartesadvogados.com.br/qual-a-responsabilidade-dos-socios-na-apuracao-dos-haveres-em-caso-de-dissolucao-empresarial/',
    wordCount: 676
  },
  {
    id: 'art-09',
    title: 'Partilha de Bens em Divórcios: O Que Você Precisa Saber sobre Divisão Patrimonial',
    slug: 'partilha-de-bens-em-divorcios-o-que-voce-precisa-saber-sobre-divisao-patrimonial',
    category: 'Família e Sucessões',
    summary: 'Critérios práticos para avaliação de imóveis, investimentos e participações societárias no encerramento do matrimônio.',
    content: [
      'A dissolução conjugal envolve não apenas aspectos emocionais, mas a complexa divisão contábil de patrimônios adquiridos ao longo de anos de convivência.',
      'A omissão de bens, contas conjuntas e aplicações financeiras no exterior pode ensejar pedido de sobrepartilha e penalidades civis de sonegados.',
      'Recomenda-se a condução de auditoria prévia documental para balizar propostas de acordo que assegurem liquidez equitativa a ambos os cônjuges.'
    ],
    author: {
      name: 'Dr. Victor Hugo Cartes',
      role: 'Sócio Fundador & Consultor Jurídico',
      oab: 'OAB/SP 421.506'
    },
    readTime: '5 min de leitura',
    publishedAt: '22 de Janeiro de 2025',
    takeaways: [
      'Auditoria documental de ativos, investimentos e participações societárias.',
      'Possibilidade de sobrepartilha para bens sonegados ou não avaliados a tempo.',
      'Vantagens do divórcio consensual extrajudicial com partilha equilibrada.'
    ],
    tags: ['Partilha de Bens', 'Divórcio', 'Comunhão de Bens', 'Família'],
    imageUrl: '/imagens/09_capa_WhatsApp-Image-2023-06-28-at-202843.jpeg',
    originalUrl: 'https://cartesadvogados.com.br/partilha-de-bens-em-divorcios-o-que-voce-precisa-saber-sobre-divisao-patrimonial/',
    wordCount: 628
  },
  {
    id: 'art-10',
    title: 'Quais os Possíveis Impactos Tributários nas Relações Contratuais com a Reforma Tributária',
    slug: 'quais-os-possiveis-impactos-tributarios-nas-relacoes-contratuais-com-a-reforma-tributaria',
    category: 'Tributário',
    summary: 'Como a unificação de impostos pelo IBS e CBS altera cláusulas de gross-up, repasse de custos e reequilíbrio econômico-financeiro em contratos de longo prazo.',
    content: [
      'A promulgação da Emenda Constitucional da Reforma Tributária inicia a maior transformação fiscal do país em seis décadas.',
      'Contratos de prestação de serviços continuados e fornecimento comercial firmados com base em alíquotas de ISS, PIS e COFINS necessitam de cláusulas de revisão automática para absorver as novas alíquotas do IBS e da CBS.',
      'A ausência de previsão expressa de repasse tributário pode transferir integralmente o ônus fiscal para o contratado, destruindo margens operacionais.'
    ],
    author: {
      name: 'Dr. Leonardo Gutierrez',
      role: 'Advogado & Consultor Tributário',
      oab: 'OAB/SP 306.294'
    },
    readTime: '6 min de leitura',
    publishedAt: '22 de Janeiro de 2025',
    takeaways: [
      'Inclusão imediata de cláusulas de contingência e repasse fiscal da Reforma Tributária.',
      'Revisão de contratos com prazos superiores a 24 meses.',
      'Impacto do split payment no fluxo de recebíveis das empresas.'
    ],
    tags: ['Reforma Tributária', 'IBS', 'CBS', 'Contratos', 'Direito Tributário'],
    imageUrl: '/imagens/10_capa_Smooth-Transition-and-Better-Planning-wi.jpg',
    originalUrl: 'https://cartesadvogados.com.br/quais-os-possiveis-impactos-tributarios-nas-relacoes-contratuais-com-a-reforma-tributaria/',
    wordCount: 695
  },
  {
    id: 'art-11',
    title: 'Revisão de Pensão Alimentícia: Critérios Legais e Procedimentos para Modificação de Valor',
    slug: 'revisao-de-pensao-alimenticia-criterios-legais-e-procedimentos-para-modificacao-de-valor',
    category: 'Família e Sucessões',
    summary: 'Quando e como requerer a redução ou majoração dos alimentos com base na alteração do binômio necessidade-possibilidade.',
    content: [
      'A obrigação alimentar não é imutável: ela rege-se pela cláusula rebus sic stantibus, podendo ser revisada sempre que houver alteração na situação financeira de quem paga ou de quem recebe.',
      'O nascimento de novos filhos, desemprego involuntário ou agravamento de despesas médicas constituem causas legítimas para o ajuizamento da ação revisional de alimentos.',
      'A comprovação probatória prévia por extratos e documentos fiscais é essencial para a concessão de tutela de urgência.'
    ],
    author: {
      name: 'Dr. Victor Hugo Cartes',
      role: 'Sócio Fundador & Consultor Jurídico',
      oab: 'OAB/SP 421.506'
    },
    readTime: '5 min de leitura',
    publishedAt: '22 de Janeiro de 2025',
    takeaways: [
      'Aplicação do binômio necessidade e possibilidade para readequação alimentar.',
      'Requisitos para obtenção de liminar de redução ou majoração de alimentos.',
      'Distinção entre exoneração definitiva e revisão temporária.'
    ],
    tags: ['Pensão Alimentícia', 'Ação Revisional', 'Direito de Família', 'Alimentos'],
    imageUrl: '/imagens/12_capa_Pensao-Alimenticia.jpg',
    originalUrl: 'https://cartesadvogados.com.br/revisao-de-pensao-alimenticia-criterios-legais-e-procedimentos-para-modificacao-de-valor/',
    wordCount: 567
  },
  {
    id: 'art-12',
    title: 'Proteção Patrimonial Familiar: Estratégias Legais para Blindar Bens de Riscos Empresariais',
    slug: 'protecao-patrimonial-familiar-estrategias-legais-para-blindar-bens-de-riscos-empresariais',
    category: 'Patrimonial',
    summary: 'Instrumentos lícitos de segregação de riscos entre pessoa jurídica e família: holdings patrimoniais, doações com reserva de usufruto e cláusulas restritivas.',
    content: [
      'A criação de uma holding familiar pura permite centralizar a administração de imóveis e investimentos, isolando o patrimônio pessoal de oscilações e contingências da atividade operacional.',
      'A doação de quotas com reserva de usufruto vitalício e cláusulas de inalienabilidade, incomunicabilidade e impenhorabilidade assegura o comando dos patriarcas e antecipa a partilha.',
      'O planejamento deve ser estritamente preventivo, realizado em momento de plena solvência, para jamais configurar fraude a credores ou contra a execução.'
    ],
    author: {
      name: 'Dr. Victor Hugo Cartes',
      role: 'Sócio Fundador & Consultor Jurídico',
      oab: 'OAB/SP 421.506'
    },
    readTime: '7 min de leitura',
    publishedAt: '22 de Janeiro de 2025',
    takeaways: [
      'Segregação jurídica entre ativos de risco e patrimônio familiar.',
      'Holding familiar com cláusulas de incomunicabilidade e inalienabilidade.',
      'Planejamento em tempo de solvência para garantia de plena legalidade.'
    ],
    tags: ['Blindagem Patrimonial', 'Holding Familiar', 'Usufruto', 'Planejamento Sucessório'],
    imageUrl: '/imagens/13_capa_82ec8a6b36c05d658f964bbe6605023f.jpg',
    originalUrl: 'https://cartesadvogados.com.br/protecao-patrimonial-familiar-estrategias-legais-para-blindar-bens-de-riscos-empresariais/',
    wordCount: 710
  },
  {
    id: 'art-13',
    title: 'Planejamento Sucessório e Segregação de Bens: O Que Você Precisa Saber',
    slug: 'planejamento-sucessorio-e-segregacao-de-bens-o-que-voce-precisa-saber',
    category: 'Patrimonial',
    summary: 'A técnica de separar o patrimônio operacional do patrimônio imobiliário de renda como mecanismo de mitigação de riscos civis e tributários.',
    content: [
      'Manter bens imóveis locados no mesmo CNPJ da empresa que exerce atividade operacional de risco expõe o patrimônio familiar a penhoras e constrições judiciais.',
      'A segregação através de uma holding patrimonial pura e de uma sociedade operacional cria barreiras jurídicas legítimas entre a atividade de risco e os ativos produtores de renda.',
      'Essa estruturação deve ser executada com estrita obediência à causa negocial e ao regime tributário do lucro presumido para gozar de redução lícita de alíquotas.'
    ],
    author: {
      name: 'Dr. Victor Hugo Cartes',
      role: 'Sócio Fundador & Consultor Jurídico',
      oab: 'OAB/SP 421.506'
    },
    readTime: '6 min de leitura',
    publishedAt: '22 de Janeiro de 2025',
    takeaways: [
      'Separação entre holding patrimonial e sociedade de atividade operacional.',
      'Proteção lícita de imóveis de família contra riscos trabalhistas e comerciais.',
      'Eficiência tributária na locação de imóveis via pessoa jurídica.'
    ],
    tags: ['Segregação de Bens', 'Holding Familiar', 'Proteção Patrimonial', 'Planejamento Sucessório'],
    imageUrl: 'https://cartesadvogados.com.br/wp-content/uploads/2025/01/WhatsApp-Image-2023-06-28-at-20.29.23.jpeg',
    originalUrl: 'https://cartesadvogados.com.br/planejamento-sucessorio-e-segregacao-de-bens-o-que-voce-precisa-saber/',
    wordCount: 636
  },
  {
    id: 'art-12',
    title: 'Os Erros Mais Comuns no Planejamento Sucessório e Como Evitá-los',
    slug: 'os-erros-mais-comuns-no-planejamento-sucessorio-e-como-evita-los',
    category: 'Patrimonial',
    summary: 'Invasão da legítima dos herdeiros necessários, simulação de doações e desconsideração de aspectos emocionais que provocam a anulação da holding.',
    content: [
      'O planejamento sucessório mal conduzido pode se transformar em um foco ainda maior de litígios do que o próprio inventário tradicional.',
      'O erro mais recorrente é desrespeitar a legítima (art. 1.846 do Código Civil), que reserva 50% dos bens para os herdeiros necessários, tornando qualquer doação inoficiosa nula de pleno direito.',
      'Outro equívoco comum é a utilização de modelos contratuais genéricos de holding sem cláusulas de usufruto, reversão ou acordos parassociais adequados à dinâmica familiar.'
    ],
    author: {
      name: 'Dr. Victor Hugo Cartes',
      role: 'Sócio Fundador & Consultor Jurídico',
      oab: 'OAB/SP 421.506'
    },
    readTime: '6 min de leitura',
    publishedAt: '22 de Janeiro de 2025',
    takeaways: [
      'Respeito absoluto à legítima dos herdeiros necessários para evitar anulação.',
      'Importância das cláusulas de reversão e incomunicabilidade nas doações.',
      'Necessidade de desenho personalizado sem recorrer a fórmulas padronizadas.'
    ],
    tags: ['Planejamento Sucessório', 'Herdeiros Necessários', 'Doação Inoficiosa', 'Legítima'],
    imageUrl: 'https://cartesadvogados.com.br/wp-content/uploads/2025/01/Pensao-Alimenticia.jpg',
    originalUrl: 'https://cartesadvogados.com.br/os-erros-mais-comuns-no-planejamento-sucessorio-e-como-evita-los/',
    wordCount: 676
  },
  {
    id: 'art-13',
    title: 'Sucessão Patrimonial em Famílias Reconstituídas: Desafios e Soluções',
    slug: 'sucessao-patrimonial-em-familias-reconstituidas-desafios-e-solucoes',
    category: 'Família e Sucessões',
    summary: 'Como harmonizar os interesses de filhos de diferentes uniões, novos cônjuges e entesados garantindo equidade e prevenindo conflitos judiciais.',
    content: [
      'Com as novas configurações familiares contemporâneas, o planejamento sucessório de famílias reconstituídas exige sensibilidade jurídica e equilíbrio técnico.',
      'A coexistência de filhos de casamentos anteriores e o novo cônjuge frequentemente suscita disputas sobre o direito real de habitação e a concorrência sucessória prevista no art. 1.829 do Código Civil.',
      'Testamentos com atribuição da parte disponível e a criação de estruturas de doação com usufruto sucessivo viabilizam a segurança de todos os ramos da família.'
    ],
    author: {
      name: 'Dr. Victor Hugo Cartes',
      role: 'Sócio Fundador & Consultor Jurídico',
      oab: 'OAB/SP 421.506'
    },
    readTime: '5 min de leitura',
    publishedAt: '22 de Janeiro de 2025',
    takeaways: [
      'Equilíbrio entre direito de herança dos filhos de uniões anteriores e o novo cônjuge.',
      'Utilização estratégica da quota disponível em testamentos.',
      'Prevenção de conflitos sobre o direito real de habitação.'
    ],
    tags: ['Famílias Reconstituídas', 'Direito Sucessório', 'Testamento', 'Herança'],
    imageUrl: 'https://cartesadvogados.com.br/wp-content/uploads/2025/01/82ec8a6b36c05d658f964bbe6605023f.jpg',
    originalUrl: 'https://cartesadvogados.com.br/sucessao-patrimonial-em-familias-reconstituidas-desafios-e-solucoes/',
    wordCount: 593
  },
  {
    id: 'art-14',
    title: 'A Importância do Planejamento Sucessório em Tempos de Crise Econômica',
    slug: 'a-importancia-do-planejamento-sucessorio-em-tempos-de-crise-economica',
    category: 'Patrimonial',
    summary: 'A antecipação de estruturas patrimoniais durante períodos de oscilação de mercado para reduzir a base de cálculo de tributos e garantir liquidez.',
    content: [
      'Em momentos de incerteza econômica e discussões sobre o aumento das alíquotas do ITCMD pelos estados, antecipar a sucessão protege o patrimônio contra onerações súbitas.',
      'A avaliação fiscal de imóveis a valor contábil histórico e a estruturação de fundos exclusivos de investimento permitem economias financeiras consideráveis antes da vigência de reformas tributárias estaduais.',
      'Além disso, a governança familiar estabelecida previamente assegura que a empresa mantenha sua liderança operacional sem paralisia decorrente de disputas entre herdeiros.'
    ],
    author: {
      name: 'Dr. Victor Hugo Cartes',
      role: 'Sócio Fundador & Consultor Jurídico',
      oab: 'OAB/SP 421.506'
    },
    readTime: '5 min de leitura',
    publishedAt: '22 de Janeiro de 2025',
    takeaways: [
      'Antecipação ao aumento progressivo das alíquotas estaduais do ITCMD.',
      'Preservação da liquidez da empresa sem bloqueios judiciais de inventário.',
      'Continuidade da gestão empresarial em períodos de recessão.'
    ],
    tags: ['Crise Econômica', 'ITCMD', 'Governança Familiar', 'Planejamento Sucessório'],
    imageUrl: 'https://cartesadvogados.com.br/wp-content/uploads/2025/01/advocacia-1.jpg',
    originalUrl: 'https://cartesadvogados.com.br/a-importancia-do-planejamento-sucessorio-em-tempos-de-crise-economica/',
    wordCount: 628
  },
  {
    id: 'art-15',
    title: 'Heranças Digitais: O Que Você Precisa Saber para Incluir Bens Virtuais no Planejamento Sucessório',
    slug: 'herancas-digitais-o-que-voce-precisa-saber-para-incluir-bens-virtuais-no-planejamento-sucessorio',
    category: 'Direito e Tecnologia',
    summary: 'Contas bancárias digitais, criptomoedas, canais monetizados e direitos autorais em mídias sociais: como planejar a transmissão segura aos herdeiros.',
    content: [
      'A vida digital concentra uma parcela crescente da riqueza contemporânea: carteiras de criptoativos (wallets), milhas aéreas, domínios na web e canais de conteúdo com faturamento recorrente.',
      'A ausência de planejamento acarreta a perda definitiva de chaves privadas e senhas que plataformas internacionais se recusam a fornecer mesmo com ordem de inventário.',
      'A redação de diretivas digitais com nomeação de inventariante digital e armazenamento em cofre criptografado resolve esse gargalo.'
    ],
    author: {
      name: 'Dr. Leonardo Gutierrez',
      role: 'Advogado & Consultor em Direito Digital',
      oab: 'OAB/SP 306.294'
    },
    readTime: '5 min de leitura',
    publishedAt: '22 de Janeiro de 2025',
    takeaways: [
      'Mapeamento de ativos digitais monetizados e criptomoedas.',
      'Nomeação de inventariante digital específico em testamento.',
      'Armazenamento seguro de chaves de acesso com custódia idônea.'
    ],
    tags: ['Herança Digital', 'Criptoativos', 'Bens Virtuais', 'Direito e Tecnologia'],
    imageUrl: 'https://cartesadvogados.com.br/wp-content/uploads/2025/01/capa-a-verdade-sobre-a-contabilidade-digital-1.jpg',
    originalUrl: 'https://cartesadvogados.com.br/herancas-digitais-o-que-voce-precisa-saber-para-incluir-bens-virtuais-no-planejamento-sucessorio/',
    wordCount: 550
  },
  {
    id: 'art-16',
    title: 'Como Evitar Litígios no Processo Sucessório: A Importância de um Planejamento Adequado',
    slug: 'como-evitar-litigios-no-processo-sucessorio-a-importancia-de-um-planejamento-adequado',
    category: 'Patrimonial',
    summary: 'A mediação familiar preventiva e a clareza documental como os maiores antídotos contra inventários que se arrastam por décadas no Judiciário.',
    content: [
      'Pesquisas apontam que mais de 70% das empresas familiares não sobrevivem à transição para a segunda geração, majoritariamente em razão de litígios societários entre herdeiros.',
      'A antecipação dos diálogos sucessórios acompanhados por advogados especialistas desmistifica tabus e permite que os fundadores expressem suas vontades de maneira pacífica.',
      'Instrumentos como pactos de família e conselhos consultivos preparam os sucessores e garantem que o patrimônio continue a gerar valor social e econômico.'
    ],
    author: {
      name: 'Dr. Victor Hugo Cartes',
      role: 'Sócio Fundador & Consultor Jurídico',
      oab: 'OAB/SP 421.506'
    },
    readTime: '5 min de leitura',
    publishedAt: '22 de Janeiro de 2025',
    takeaways: [
      'Diálogo sucessório antecipado com mediação jurídica especializada.',
      'Criação de protocolos e conselhos de família para decisões estratégicas.',
      'Extinção de disputas judiciais de inventário através de acordos prévios.'
    ],
    tags: ['Litígios Sucessórios', 'Empresa Familiar', 'Mediação de Conflitos', 'Planejamento Patrimonial'],
    imageUrl: 'https://cartesadvogados.com.br/wp-content/uploads/2025/01/advocacia_15-1.webp',
    originalUrl: 'https://cartesadvogados.com.br/como-evitar-litigios-no-processo-sucessorio-a-importancia-de-um-planejamento-adequado/',
    wordCount: 635
  },
  {
    id: 'art-17',
    title: 'Proteção Patrimonial por meio da Holding Familiar como Ferramenta de Planejamento Familiar e Sucessório',
    slug: 'protecao-patrimonial-por-meio-da-holding-familiar-como-ferramenta-de-planejamento-familiar-e-sucessorio',
    category: 'Patrimonial',
    summary: 'O passo a passo da estruturação de uma holding familiar: aspectos societários, tributários e a transferência pacífica de controle aos sucessores.',
    content: [
      'A holding familiar é uma pessoa jurídica constituída com o propósito de deter e administrar o patrimônio de uma mesma família, sejam bens imóveis, participações em outras empresas ou ativos financeiros.',
      'Diferente da ideia equivocada de blindagem absoluta contra fraudes, a holding legítima oferece transparência, simplificação da gestão condominial de bens e alívio de tributação sobre aluguéis de até 27,5% para cerca de 11,33%.',
      'Na sucessão, a doação de quotas com reserva de usufruto mantém os patriarcas na administração vitalícia dos bens, com a titularidade definitiva já transferida aos filhos sem necessidade de abertura de inventário.'
    ],
    author: {
      name: 'Dr. Victor Hugo Cartes',
      role: 'Sócio Fundador & Consultor Jurídico',
      oab: 'OAB/SP 421.506'
    },
    readTime: '5 min de leitura',
    publishedAt: '22 de Janeiro de 2025',
    takeaways: [
      'Redução da carga tributária na gestão e locação de imóveis.',
      'Doação de quotas com reserva de usufruto vitalício aos fundadores.',
      'Eliminação da morosidade e dos custos elevados do inventário judicial.'
    ],
    tags: ['Holding Familiar', 'Proteção Patrimonial', 'ITCMD', 'Planejamento Sucessório'],
    imageUrl: 'https://cartesadvogados.com.br/wp-content/uploads/2025/01/151-1140x815-1.jpg',
    originalUrl: 'https://cartesadvogados.com.br/protecao-patrimonial-por-meio-da-holding-familiar-como-ferramenta-de-planejamento-familiar-e-sucessorio/',
    wordCount: 566
  }
];

export const INITIAL_N8N_LOGS: N8nWebhookExecution[] = [
  {
    id: 'exec-8941',
    protocol: 'CRT-2026-8941',
    timestamp: '2026-10-11T13:42:15-03:00',
    leadName: 'Eduardo Silveira Prado',
    companyName: 'Prado Empreendimentos Imobiliários',
    practiceArea: 'Planejamento Patrimonial & Sucessório',
    urgency: 'alta',
    assignedPartner: 'Dr. Victor Hugo Cartes',
    durationMs: 340,
    payload: {
      protocol: 'CRT-2026-8941',
      timestamp: '2026-10-11T13:42:15-03:00',
      clientType: 'PJ',
      companyName: 'Prado Empreendimentos Imobiliários',
      companySegment: 'Construção Civil e Gestão de Imóveis',
      revenueRange: 'R$ 50M a R$ 200M/ano',
      contactName: 'Eduardo Silveira Prado',
      email: 'eduardo@pradoempreendimentos.com.br',
      phone: '+55 11 98452-9901',
      practiceArea: 'patrimonial-sucessorio',
      urgency: 'alta',
      hasJudicialDeadline: false,
      caseSummary: 'Necessidade de estruturação de holding patrimonial familiar para 24 imóveis urbanos e transferência de quotas aos herdeiros antes da mudança de alíquotas do ITCMD.',
      meetingPreference: 'google_meet',
      preferredTimeSlot: 'manha',
      assignedPartner: 'Dr. Victor Hugo Cartes',
      origin: 'cartes_intake_web'
    },
    steps: [
      { name: 'Webhook Ingest', status: 'completed', duration: '28ms', detail: 'Payload de lead recebido com sucesso no endpoint /cartes-lead' },
      { name: 'Regex & Sanitização', status: 'completed', duration: '14ms', detail: 'Telefone sanitizado para formato E.164 (+5511984529901)' },
      { name: 'Classificador de Urgência', status: 'completed', duration: '82ms', detail: 'Demanda de Holding & Planejamento Sucessório -> Classificado como prioridade Alta' },
      { name: 'Roteamento de Sócio', status: 'completed', duration: '21ms', detail: 'Atribuído ao sócio fundador Dr. Victor Hugo Cartes' },
      { name: 'Sync CRM & Chatwoot', status: 'completed', duration: '110ms', detail: 'Conversa criada na fila do Chatwoot com contexto completo' },
      { name: 'Disparo WhatsApp (Z-API)', status: 'completed', duration: '85ms', detail: 'Mensagem de boas-vindas com protocolo CRT-2026-8941 enviada' }
    ]
  },
  {
    id: 'exec-8940',
    protocol: 'CRT-2026-8940',
    timestamp: '2026-10-11T11:15:02-03:00',
    leadName: 'Beatriz Vasconcellos',
    companyName: 'Nexus Cloud Technologies',
    practiceArea: 'Empresarial & Societário',
    urgency: 'media',
    assignedPartner: 'Dr. Anderson Bispo da Silva',
    durationMs: 295,
    payload: {
      protocol: 'CRT-2026-8940',
      timestamp: '2026-10-11T11:15:02-03:00',
      clientType: 'PJ',
      companyName: 'Nexus Cloud Technologies',
      companySegment: 'SaaS & Enterprise Software',
      revenueRange: 'R$ 10M a R$ 50M/ano',
      contactName: 'Beatriz Vasconcellos',
      email: 'beatriz@nexuscloud.io',
      phone: '+55 11 97120-4411',
      practiceArea: 'empresarial-societario',
      urgency: 'media',
      hasJudicialDeadline: false,
      caseSummary: 'Dissolução parcial consensual com saída de um dos sócios cotistas. Necessidade de minuta de alteração contratual e apuração de haveres.',
      meetingPreference: 'presencial_sp',
      preferredTimeSlot: 'tarde',
      assignedPartner: 'Dr. Anderson Bispo da Silva',
      origin: 'cartes_intake_web'
    },
    steps: [
      { name: 'Webhook Ingest', status: 'completed', duration: '22ms', detail: 'Payload recebido com sucesso (200 OK)' },
      { name: 'Regex & Sanitização', status: 'completed', duration: '11ms', detail: 'Validação de campos e e-mail corporativo' },
      { name: 'Classificador de Urgência', status: 'completed', duration: '60ms', detail: 'Sem prazo judicial aberto -> Urgência Média' },
      { name: 'Roteamento de Sócio', status: 'completed', duration: '18ms', detail: 'Atribuído ao Dr. Anderson Bispo da Silva (Empresarial/Societário)' },
      { name: 'Sync CRM & Chatwoot', status: 'completed', duration: '95ms', detail: 'Lead categorizado no funil societário' },
      { name: 'Disparo WhatsApp (Z-API)', status: 'completed', duration: '89ms', detail: 'Confirmação enviada para reunião presencial na Faria Lima' }
    ]
  }
];

export const RAW_PRD_CONTENT = `# PRD: Cartes Advogados — MVP v1.0

**Documento de Especificação Técnica e Requisitos de Produto**
**Data:** 11 de Outubro de 2026
**Status:** Pronto para Implementação (Fase de PoC e Descoberta Técnica)
**Autor:** Equipe de Engenharia de Produto & Arquitetura Jurídica
**Cliente:** Cartes Advogados Associados

---

## 1. Visão Geral e Objetivos do Produto
Estabelecer uma presença institucional sólida, segura e de altíssima autoridade para o escritório Cartes Advogados. O sistema deve educar o visitante sobre soluções jurídicas e transferir leads qualificados para a equipe por meio de um fluxo de triagem automatizada, sem cruzar a linha do aconselhamento jurídico automatizado. O design deve transmitir confiança, agilidade e excelência corporativa.

## 2. Escopo do MVP (v1.0)
- Site institucional responsivo e otimizado para Core Web Vitals.
- CMS configurado para gestão editorial com controle de acesso.
- 6 páginas institucionais principais validadas.
- 8 páginas de áreas de atuação detalhadas.
- Apresentação de 5 perfis profissionais da equipe com registros oficiais (OAB/CRC).
- Publicação/migração otimizada de 17 artigos jurídicos reais do blog.
- Fluxo de triagem automatizada via n8n e Chatwoot com transferência para humanos (Handoff seguro).
- Páginas de conformidade: Política de Privacidade e gestão de cookies.
- Estrutura base de acessibilidade (WCAG 2.2 AA) e SEO técnico (Redirecionamentos 301, Schema Markup).

## 3. Equipe Confirmada
1. Dr. Victor Hugo Cartes (OAB/SP 421.506) - Sócio Fundador | Planejamento Patrimonial e Sucessório
2. Dr. Leonardo Gutierrez (OAB/SP 306.294) - Advogado | Empresarial, Tributário, Trabalhista, Compliance e LGPD
3. Dr. Anderson Bispo da Silva (OAB/SP 252.001) - Advogado | Empresarial, Societário e Apuração de Haveres
4. Dr. Pedro Sirna (OAB/SP 412.274) - Advogado | Consumidor, Cível, Imobiliário e Contratos
5. Brenner Refundini (CRC/SP 1SP 346408/0-4) - Contador e Analista Tributário

## 4. Áreas de Atuação (8 Confirmadas)
1. Planejamento Patrimonial e Sucessório
2. Família e Sucessões
3. Empresarial e Societário
4. Contratos
5. Trabalhista Estratégico & Compliance
6. Consumidor
7. Cível e Imobiliário
8. Digital, LGPD & Cidadania Italiana

## 5. Acervo de Artigos Extraídos (17 Publicações)
Todos os 17 artigos com textos e imagens foram extraídos da API do WordPress em formato Markdown (.md) e JSON estruturado, organizados nas categorias Família/Patrimônio, Sucessão e Direito/Tecnologia.
`;
