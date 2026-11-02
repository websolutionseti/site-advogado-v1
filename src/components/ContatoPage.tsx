import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  Lock,
  Calendar,
  HelpCircle
} from 'lucide-react';
import { NavigationPage } from '../types';

interface ContatoPageProps {
  onNavigate: (page: NavigationPage) => void;
}

export const ContatoPage: React.FC<ContatoPageProps> = ({ onNavigate }) => {
  const [nome, setNome] = useState('');
  const [contato, setContato] = useState('');
  const [area, setArea] = useState('Planejamento Patrimonial e Sucessório');
  const [mensagem, setMensagem] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !contato) return;

    // Constrói mensagem direta para o WhatsApp oficial
    const textoWhatsApp = encodeURIComponent(
      `Olá, Cartes Advogados.\n\nMeu nome é ${nome.trim()}.\nContato: ${contato.trim()}.\nÁrea de interesse: ${area}.\nResumo do caso: ${mensagem.trim() || 'Gostaria de agendar uma consulta inicial reservada.'}`
    );

    // Redireciona diretamente para o canal prioritário oficial
    window.open(`https://wa.me/5511973758834?text=${textoWhatsApp}`, '_blank');
    setEnviado(true);
  };

  const faqItems = [
    {
      q: 'Como funciona a primeira consulta estratégica?',
      a: 'A primeira consulta é conduzida diretamente por um dos sócios especialistas na matéria do seu caso. Realizamos uma análise preliminar de riscos e traçamos as alternativas jurídicas mais seguras sob total confidencialidade.'
    },
    {
      q: 'O atendimento pode ser realizado de forma 100% online?',
      a: 'Sim. Dispomos de salas virtuais criptografadas para atendimento de clientes em todo o Brasil e no exterior, garantindo a mesma reserva e profundidade do encontro presencial.'
    },
    {
      q: 'Como é resguardado o sigilo das informações compartilhadas?',
      a: 'Todas as comunicações com nossa banca são protegidas pelo sigilo profissional advogado-cliente (Estatuto da OAB) e pelas normas da Lei Geral de Proteção de Dados (Lei nº 13.709/2018).'
    },
    {
      q: 'Qual é o prazo típico de retorno após o contato inicial?',
      a: 'Nosso plantão de atendimento fiduciário responde em até 2 horas em dias úteis, ou de imediato via canal prioritário de WhatsApp.'
    }
  ];

  return (
    <div className="bg-[#14171C] text-[#8E95A0] font-sans antialiased">
      
      {/* ================================================================== */}
      {/* HERO SECTION: Contato */}
      {/* ================================================================== */}
      <section className="relative min-h-[50vh] flex items-center justify-center bg-black overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <img 
            src="/imagens/02_capa_ChatGPT-Image-10-de-set-de-2026-17_23_01.png" 
            alt="Recepção fiduciária Cartes Advogados" 
            className="w-full h-full object-cover object-center filter brightness-[0.35] contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14171C] via-[#14171C]/60 to-black/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 w-full text-center">
          <p className="text-[#C5A880] text-xs font-semibold tracking-[0.35em] uppercase mb-4">
            Atendimento Fiduciário Reservado
          </p>
          <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-normal text-white leading-tight mb-4">
            CONTATO & <span className="font-serif italic font-light text-[#C5A880]">AGENDAMENTO</span>
          </h1>
          <p className="text-base sm:text-lg text-neutral-300 font-light max-w-2xl mx-auto leading-relaxed">
            Converse diretamente com nossa liderança jurídica sob absoluto sigilo para estruturar e proteger seus interesses.
          </p>
        </div>
      </section>

      {/* ================================================================== */}
      {/* GRID PRINCIPAL: Canais Diretos + Formulário */}
      {/* ================================================================== */}
      <section className="py-20 bg-[#14171C] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Coluna Esquerda: Canais Diretos & Endereço */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C5A880] block mb-2">
                  Canais Oficiais
                </span>
                <h2 className="font-playfair text-3xl text-white font-normal leading-tight">
                  Estamos à disposição para atender seu caso com prontidão.
                </h2>
              </div>

              {/* Card WhatsApp Prioritário */}
              <a
                href="https://wa.me/5511973758834?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20um%20atendimento%20estrat%C3%A9gico%20com%20o%20Cartes%20Advogados."
                target="_blank"
                rel="noopener noreferrer"
                data-track="whatsapp_contato_card_click"
                className="group block p-6 bg-[#1A1E24] border border-[#25D366]/40 hover:border-[#25D366] rounded-sm transition-all shadow-lg hover:shadow-[0_10px_30px_rgba(37,211,102,0.15)]"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-[#25D366]/10 text-[#25D366] rounded-sm">
                      <MessageSquare className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#25D366]">Canal Prioritário</span>
                      <h3 className="font-playfair text-lg font-bold text-white">WhatsApp Corporativo</h3>
                    </div>
                  </div>
                  <span className="text-xs text-[#25D366] font-semibold group-hover:translate-x-1 transition-transform">→</span>
                </div>
                <p className="text-xs text-neutral-300">
                  Direcionamento imediato para o sócio responsável pela matéria de interesse.
                </p>
                <span className="inline-block mt-3 text-xs font-mono text-[#F8F9FA] font-bold">
                  (11) 9 7375-8834
                </span>
              </a>

              {/* Informações de Localização e Horário */}
              <div className="space-y-4 pt-2 border-t border-white/5">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-[#C5A880] mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Unidade São Paulo</h4>
                    <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
                      Av. Paulista, 1471 - CJ 511 - Bela Vista<br />
                      São Paulo - SP, 01311-200, Brasil
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-[#C5A880] mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">E-mail Institucional</h4>
                    <a href="mailto:cartes@cadvs.com.br" className="text-xs text-[#C5A880] hover:text-white transition-colors">
                      cartes@cadvs.com.br
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-[#C5A880] mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Horário de Funcionamento</h4>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Segunda a Sexta-feira: 09h às 19h (Hora marcada)
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Coluna Direita: Formulário de Agendamento Confidencial */}
            <div className="lg:col-span-7 bg-[#1A1E24] border border-white/10 p-8 sm:p-10 rounded-sm shadow-2xl">
              <div className="mb-6">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#C5A880] mb-2">
                  <Lock className="h-3.5 w-3.5" />
                  <span>Ambiente Protegido & Confidencial</span>
                </div>
                <h3 className="font-playfair text-2xl font-normal text-white">
                  Solicite um Retorno Reservado
                </h3>
                <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                  Preencha as informações para direcionarmos sua demanda ao sócio especialista competente sob absoluto sigilo fiduciário.
                </p>
              </div>

              {enviado ? (
                <div className="p-6 bg-[#0E1E16] border border-[#25D366]/50 rounded-sm">
                  <div className="flex items-center gap-3 text-[#25D366] mb-2">
                    <CheckCircle2 className="h-5 w-5" />
                    <h4 className="font-bold text-sm">Dados Direcionados com Sucesso</h4>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    Sua mensagem foi estruturada e aberta no canal prioritário do WhatsApp do Cartes Advogados. Nossa equipe responderá em breve com as orientações prévias.
                  </p>
                  <button
                    type="button"
                    onClick={() => setEnviado(false)}
                    className="mt-4 text-xs font-bold uppercase tracking-wider text-[#C5A880] underline hover:text-white"
                  >
                    Enviar nova mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="nome" className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                      Nome Completo *
                    </label>
                    <input
                      id="nome"
                      type="text"
                      required
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Ex: Dr. Roberto Menezes"
                      className="w-full bg-[#14171C] border border-neutral-700 focus:border-[#C5A880] px-4 py-3 text-xs text-white placeholder-neutral-500 rounded-sm focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contato" className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                        WhatsApp ou E-mail *
                      </label>
                      <input
                        id="contato"
                        type="text"
                        required
                        value={contato}
                        onChange={(e) => setContato(e.target.value)}
                        placeholder="(11) 99999-9999"
                        className="w-full bg-[#14171C] border border-neutral-700 focus:border-[#C5A880] px-4 py-3 text-xs text-white placeholder-neutral-500 rounded-sm focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="area" className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                        Área de Interesse *
                      </label>
                      <select
                        id="area"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        className="w-full bg-[#14171C] border border-neutral-700 focus:border-[#C5A880] px-4 py-3 text-xs text-white rounded-sm focus:outline-none transition-colors cursor-pointer"
                      >
                        <option value="Planejamento Patrimonial e Sucessório">Planejamento Patrimonial e Sucessório</option>
                        <option value="Direito Empresarial e Societário">Direito Empresarial e Societário</option>
                        <option value="Direito de Família e Sucessões">Direito de Família e Sucessões</option>
                        <option value="Direito Contratual Estratégico">Direito Contratual Estratégico</option>
                        <option value="Direito Trabalhista Corporativo">Direito Trabalhista Corporativo</option>
                        <option value="Direito Civil e Contencioso">Direito Civil e Contencioso</option>
                        <option value="Outros">Outros temas estratégicos</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="mensagem" className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                      Resumo da Necessidade (Opcional)
                    </label>
                    <textarea
                      id="mensagem"
                      rows={3}
                      value={mensagem}
                      onChange={(e) => setMensagem(e.target.value)}
                      placeholder="Descreva sucintamente o contexto para melhor direcionamento..."
                      className="w-full bg-[#14171C] border border-neutral-700 focus:border-[#C5A880] p-4 text-xs text-white placeholder-neutral-500 rounded-sm focus:outline-none transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    data-track="contato_form_submit"
                    className="w-full bg-[#C5A880] hover:bg-[#d8be98] text-[#14171C] text-xs font-bold uppercase tracking-widest py-4 px-6 rounded-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-[#C5A880]/20"
                  >
                    <span>Prosseguir para Atendimento Prioritário</span>
                    <Send className="h-3.5 w-3.5" />
                  </button>

                  <p className="text-[10px] text-center text-neutral-500">
                    Seus dados são estritamente sigilosos e protegidos sob o Provimento OAB 205/2021.
                  </p>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* FAQ INSTITUCIONAL */}
      {/* ================================================================== */}
      <section className="py-20 bg-[#101217]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C5A880] block mb-2">
              Tire Suas Dúvidas
            </span>
            <h2 className="font-playfair text-3xl text-white font-normal">
              Perguntas Frequentes
            </h2>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, idx) => (
              <div key={idx} className="bg-[#1A1E24] border border-white/5 p-6 rounded-sm">
                <h3 className="font-playfair text-base font-bold text-white mb-2 flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-[#C5A880] flex-shrink-0" />
                  <span>{item.q}</span>
                </h3>
                <p className="text-xs leading-relaxed text-neutral-400 pl-6">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
