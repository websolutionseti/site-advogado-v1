export type NavigationPage = 'home' | 'quem-somos' | 'atuacao' | 'equipe' | 'blog' | 'contato';

export interface PracticeArea {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  fullDescription: string;
  scopeList: string[];
  representativeCases: {
    title: string;
    description: string;
    result: string;
  }[];
  leadPartner: string;
  partnerRole: string;
  iconName: string;
  imageUrl?: string;
}

export interface Lawyer {
  id: string;
  name: string;
  role: string;
  oab: string;
  bio: string;
  education: string[];
  areas: string[];
  email: string;
  linkedin: string;
  photoUrl: string;
  slug: string;
  squad: string;
  squadRole: string;
  featuredQuote?: string;
  casesHandledCount?: number;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: 'Família e Sucessões' | 'Patrimonial' | 'Empresarial' | 'Contratos' | 'Direito e Tecnologia' | 'Tributário' | 'Trabalhista';
  summary: string;
  content: string[];
  author: {
    name: string;
    role: string;
    oab: string;
  };
  readTime: string;
  publishedAt: string;
  featured?: boolean;
  takeaways: string[];
  tags: string[];
  imageUrl?: string;
  originalUrl?: string;
  wordCount?: number;
}

export interface ConsultationLead {
  protocol: string;
  timestamp: string;
  clientType: 'PJ' | 'PF';
  companyName?: string;
  companySegment?: string;
  revenueRange?: string;
  contactName: string;
  email: string;
  phone: string;
  practiceArea: string;
  urgency: 'baixa' | 'media' | 'alta' | 'critica';
  hasJudicialDeadline: boolean;
  deadlineDays?: number;
  caseSummary: string;
  meetingPreference: 'google_meet' | 'presencial_sp';
  preferredTimeSlot: 'manha' | 'tarde';
  assignedPartner: string;
  origin: string;
}

export interface N8nStep {
  id: string;
  title: string;
  type: 'trigger' | 'function' | 'ai' | 'crm' | 'message' | 'alert';
  description: string;
  status: 'idle' | 'running' | 'success' | 'warning';
  outputPreview?: Record<string, unknown>;
}

export interface N8nWebhookExecution {
  id: string;
  protocol: string;
  timestamp: string;
  leadName: string;
  companyName: string;
  practiceArea: string;
  urgency: string;
  assignedPartner: string;
  payload: ConsultationLead;
  durationMs: number;
  steps: {
    name: string;
    status: 'completed' | 'in_progress' | 'failed';
    duration: string;
    detail: string;
  }[];
}
