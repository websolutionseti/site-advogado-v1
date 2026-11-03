import { 
  FileText, 
  FolderDown, 
  ShieldCheck, 
  ExternalLink,
  Award,
  Clock,
  MapPin,
  Mail,
  Phone
} from 'lucide-react';
import { NavigationPage } from '../types';

export interface FooterProps {
  onOpenPRD?: () => void;
  onOpenExtraction?: () => void;
  onOpenIntake?: () => void;
  onNavigate?: (page: NavigationPage) => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onOpenPRD = () => {}, 
  onOpenExtraction = () => {}, 
  onOpenIntake = () => {},
  onNavigate
}) => {
  return (
    <footer 
      role="contentinfo" 
      aria-label="Rodapé Institucional Cartes Advogados"
      className="bg-[#1C1C1C] text-[#F9F9F8] pt-16 pb-10 px-6 sm:px-8 lg:px-12 font-sans border-t border-[#2A2A2A]"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* ================================================================== */}
        {/* ESTRUTURA PRINCIPAL (Mobile-First: Coluna única -> Tablet: 2 cols -> Desktop: 4 cols) */}
        {/* ================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 lg:gap-12 mb-14">
          
          {/* ----------------------------------------------------------------- */}
          {/* COLUNA 1: Marca e Endereço */}
          {/* ----------------------------------------------------------------- */}
          <div className="flex flex-col space-y-5 text-left">
            <div>
              <span className="font-playfair text-2xl tracking-[0.18em] uppercase text-[#F9F9F8] font-bold block">
                CARTES <span className="text-[#C5A880]">ADVOGADOS</span>
              </span>
              <span className="text-[10px] tracking-[0.35em] text-[#8E95A0] uppercase font-medium block mt-1">
                ADVOCACIA ESTRATÉGICA & PRIVATE
              </span>
            </div>

            <div className="text-xs text-[#8E95A0] leading-relaxed space-y-1.5 font-sans">
              <div className="flex items-start gap-2">
                <MapPin className="h-3.5 w-3.5 text-[#C5A880] mt-0.5 flex-shrink-0" />
                <address className="not-italic">
                  Av. Paulista, 1471 - CJ 511 - Bela Vista, São Paulo - SP, 01311-200, Brasil
                </address>
              </div>
            </div>

            <div className="pt-1 flex flex-col space-y-2 text-xs">
              <a 
                href="mailto:cartes@cadvs.com.br" 
                data-track="email_footer_click"
                className="text-[#C5A880] hover:text-[#F9F9F8] transition-colors flex items-center gap-2"
                aria-label="Enviar e-mail para cartes@cadvs.com.br"
              >
                <Mail className="h-3.5 w-3.5 text-[#C5A880]" />
                <span>cartes@cadvs.com.br</span>
              </a>

              <a 
                href="https://wa.me/5511973758834"
                target="_blank"
                rel="noopener noreferrer"
                data-track="whatsapp_footer_link_click"
                className="text-[#8E95A0] hover:text-[#25D366] transition-colors flex items-center gap-2"
                aria-label="Telefone e WhatsApp: +55 (11) 97375-8834"
              >
                <Phone className="h-3.5 w-3.5 text-[#25D366]" />
                <span>+55 (11) 97375-8834</span>
              </a>
            </div>

            <p className="text-[11px] text-[#8E95A0] leading-relaxed pt-2 border-t border-[#2A2A2A]">
              Assessoria jurídica integrada com foco em mitigação de riscos, governança e estruturação patrimonial.
            </p>
          </div>

          {/* ----------------------------------------------------------------- */}
          {/* COLUNA 2: Links Sociais & Conecte-se */}
          {/* ----------------------------------------------------------------- */}
          <div className="flex flex-col space-y-4 text-left">
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-[#8E95A0] border-b border-[#2A2A2A] pb-2">
              CONECTE-SE
            </h3>

            <ul className="space-y-3 text-xs text-[#8E95A0]">
              <li>
                <a 
                  href="https://instagram.com/cartes_advogados" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  data-track="instagram_footer_click"
                  className="group hover:text-[#F9F9F8] transition-colors flex items-center justify-between p-2 rounded-sm bg-[#222222] hover:bg-[#2A2A2A] border border-[#2E2E2E]"
                  aria-label="Acessar Instagram oficial @cartes_advogados (abre em nova aba)"
                >
                  <span className="flex items-center gap-2.5">
                    {/* Instagram SVG Icon */}
                    <svg className="h-4 w-4 text-[#C5A880] group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span>@cartes_advogados</span>
                  </span>
                  <ExternalLink className="h-3 w-3 text-[#8E95A0] group-hover:text-white" />
                </a>
              </li>

              <li>
                <a 
                  href="https://facebook.com/VCartesAdvocacia" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  data-track="facebook_footer_click"
                  className="group hover:text-[#F9F9F8] transition-colors flex items-center justify-between p-2 rounded-sm bg-[#222222] hover:bg-[#2A2A2A] border border-[#2E2E2E]"
                  aria-label="Acessar Facebook oficial VCartesAdvocacia (abre em nova aba)"
                >
                  <span className="flex items-center gap-2.5">
                    {/* Facebook SVG Icon */}
                    <svg className="h-4 w-4 text-[#C5A880] group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                    </svg>
                    <span>/VCartesAdvocacia</span>
                  </span>
                  <ExternalLink className="h-3 w-3 text-[#8E95A0] group-hover:text-white" />
                </a>
              </li>

              <li>
                <a 
                  href="https://linkedin.com/company/cartes-advogados" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  data-track="linkedin_footer_click"
                  className="group hover:text-[#F9F9F8] transition-colors flex items-center justify-between p-2 rounded-sm bg-[#222222] hover:bg-[#2A2A2A] border border-[#2E2E2E]"
                  aria-label="Acessar LinkedIn corporativo Cartes Advogados (abre em nova aba)"
                >
                  <span className="flex items-center gap-2.5">
                    {/* LinkedIn SVG Icon */}
                    <svg className="h-4 w-4 text-[#C5A880] group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    <span>Cartes Advogados</span>
                  </span>
                  <ExternalLink className="h-3 w-3 text-[#8E95A0] group-hover:text-white" />
                </a>
              </li>
            </ul>

            <div className="pt-2">
              <span className="text-[10px] text-[#8E95A0] uppercase tracking-wider block">
                Atendimento Virtual e Presencial
              </span>
              <span className="text-xs text-[#F9F9F8] font-medium block mt-0.5">
                Segunda a Sexta, das 09h às 19h
              </span>
            </div>
          </div>

          {/* ----------------------------------------------------------------- */}
          {/* COLUNA 3: Selo de Autoridade (ANCEC Ouro) */}
          {/* ----------------------------------------------------------------- */}
          <div className="flex flex-col space-y-4 text-left">
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-[#8E95A0] border-b border-[#2A2A2A] pb-2">
              RECONHECIMENTO & AUTORIDADE
            </h3>

            {/* Espaço para o Selo Referência Nacional ANCEC Ouro */}
            <div 
              data-track="seal_ancec_hover"
              className="group relative rounded-sm border border-[#333333] bg-[#222222] p-5 opacity-80 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 hover:border-[#C5A880]/60 hover:shadow-[0_4px_20px_rgba(197,168,128,0.15)]"
              aria-label="Selo Referência Nacional ANCEC Ouro concedido ao Cartes Advogados"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-gradient-to-br from-[#DFCAAB] via-[#C5A880] to-[#8D7048] text-[#1C1C1C] flex-shrink-0 shadow-md">
                  <Award className="h-7 w-7 text-[#1C1C1C]" />
                </div>
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#C5A880] block">
                    SELO DE EXCELÊNCIA
                  </span>
                  <h4 className="text-xs font-serif font-bold text-[#F9F9F8] leading-snug">
                    Referência Nacional ANCEC
                  </h4>
                  <span className="inline-block mt-1 text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 bg-[#C5A880]/15 text-[#DFCAAB] rounded-none border border-[#C5A880]/30">
                    Categoria Ouro
                  </span>
                </div>
              </div>

              <p className="mt-3 text-[11px] leading-relaxed text-[#8E95A0] group-hover:text-[#F9F9F8] transition-colors">
                Outorgado pela Agência Nacional de Cultura, Empreendedorismo e Comunicação em reconhecimento ao padrão ético e técnico.
              </p>

              <div className="mt-3 flex items-center justify-between text-[10px] text-[#C5A880] pt-2 border-t border-[#2E2E2E]">
                <span>Certificação 2024–2026</span>
                <span className="font-mono text-[#8E95A0]">AUDITADO</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-[#8E95A0]">
              <ShieldCheck className="h-3.5 w-3.5 text-[#C5A880]" />
              <span>Conformidade Ética OAB Prov. 205/2021</span>
            </div>
          </div>

          {/* ----------------------------------------------------------------- */}
          {/* COLUNA 4: Atendimento Institucional & Consulta */}
          {/* ----------------------------------------------------------------- */}
          <div className="flex flex-col space-y-4 text-left">
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-[#8E95A0] border-b border-[#2A2A2A] pb-2">
              ATENDIMENTO & CONSULTORIA
            </h3>

            <p className="text-xs text-[#8E95A0] leading-relaxed">
              Agende uma consulta presencial reservada em nossas sedes na Av. Paulista ou via videoconferência segura:
            </p>

            <div className="flex flex-col space-y-2.5">
              <button
                type="button"
                onClick={onOpenIntake}
                data-track="footer_btn_triagem"
                className="w-full flex items-center justify-between rounded-sm border border-[#C5A880] bg-[#C5A880]/10 px-3.5 py-3 text-xs text-[#F9F9F8] hover:bg-[#C5A880] hover:text-[#1C1C1C] transition-all font-semibold cursor-pointer shadow-sm"
              >
                <span>Agendar Consulta Fiduciária</span>
                <span className="text-[#C5A880] group-hover:text-[#1C1C1C]">→</span>
              </button>
            </div>

            {onNavigate && (
              <div className="pt-2 flex flex-wrap gap-2 text-[11px] text-[#8E95A0]">
                <button type="button" onClick={() => onNavigate('home')} className="hover:text-white underline-offset-2 hover:underline cursor-pointer">Home</button>
                <span>·</span>
                <button type="button" onClick={() => onNavigate('quem-somos')} className="hover:text-white underline-offset-2 hover:underline cursor-pointer">Quem Somos</button>
                <span>·</span>
                <button type="button" onClick={() => onNavigate('atuacao')} className="hover:text-white underline-offset-2 hover:underline cursor-pointer">Atuação</button>
                <span>·</span>
                <button type="button" onClick={() => onNavigate('equipe')} className="hover:text-[#C5A880] underline-offset-2 hover:underline cursor-pointer">Equipe</button>
                <span>·</span>
                <button type="button" onClick={() => onNavigate('blog')} className="hover:text-white underline-offset-2 hover:underline cursor-pointer">Blog</button>
                <span>·</span>
                <button type="button" onClick={() => onNavigate('contato')} className="hover:text-white underline-offset-2 hover:underline cursor-pointer">Contato</button>
              </div>
            )}
          </div>

        </div>

        {/* ================================================================== */}
        {/* BASE DO FOOTER (Border-top fina #333333) */}
        {/* ================================================================== */}
        <div className="pt-8 border-t border-[#333333] flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 text-xs text-[#8E95A0]">
          
          {/* Direitos Autorais */}
          <p className="text-center md:text-left">
            © 2026 Cartes Advogados. Todos os direitos reservados.
          </p>

          {/* Links Legais com Páginas Dedicadas */}
          <div className="flex flex-wrap items-center justify-center space-x-6 text-xs">
            <button 
              type="button"
              onClick={() => onNavigate ? onNavigate('privacidade') : null}
              className="hover:text-[#C5A880] transition-colors cursor-pointer"
            >
              Política de Privacidade
            </button>
            <span>|</span>
            <button 
              type="button"
              onClick={() => onNavigate ? onNavigate('termos') : null}
              className="hover:text-[#C5A880] transition-colors cursor-pointer"
            >
              Termos de Uso
            </button>
          </div>

          {/* OAB Responsável */}
          <p className="font-medium tracking-wide text-[#DFCAAB] text-center md:text-right">
            Victor Hugo Lira Cartes - OAB/SP 421.506
          </p>

        </div>

      </div>
    </footer>
  );
};
