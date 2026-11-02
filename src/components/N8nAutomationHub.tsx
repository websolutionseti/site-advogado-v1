import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  Play, 
  Download, 
  Copy, 
  Check, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Code2, 
  Database, 
  MessageSquare, 
  Bell, 
  ShieldCheck,
  ChevronDown,
  Layers,
  Sparkles,
  Zap,
  ArrowLeft,
  Activity,
  FileCode,
  Share2
} from 'lucide-react';
import { N8nWebhookExecution } from '../types';

interface N8nAutomationHubProps {
  executions: N8nWebhookExecution[];
  onTriggerManualTest: (presetType: 'tributario_urgente' | 'ma_societario' | 'trabalhista_pdv') => void;
  selectedProtocol?: string | null;
}

export const N8nAutomationHub: React.FC<N8nAutomationHubProps> = ({ 
  executions, 
  onTriggerManualTest,
  selectedProtocol 
}) => {
  const [selectedExecId, setSelectedExecId] = useState<string>(
    selectedProtocol 
      ? executions.find(e => e.protocol === selectedProtocol)?.id || executions[0]?.id || '' 
      : executions[0]?.id || ''
  );
  const [copiedJson, setCopiedJson] = useState(false);
  const [copiedSnippetIndex, setCopiedSnippetIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'visual' | 'logs' | 'n8n_json'>('visual');
  const [expandedStepIndex, setExpandedStepIndex] = useState<number | null>(0);
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);

  const selectedExec = executions.find(e => e.id === selectedExecId) || executions[0];

  const n8nWorkflowJson = {
    name: "Cartes Advogados - Pipeline de Intake & Qualificação Jurídica v1.0",
    nodes: [
      {
        parameters: {
          httpMethod: "POST",
          path: "cartes-lead",
          responseMode: "lastNode",
          options: {}
        },
        id: "webhook-trigger",
        name: "Webhook Intake",
        type: "n8n-nodes-base.webhook",
        typeVersion: 1,
        position: [240, 300]
      },
      {
        parameters: {
          jsCode: `// Sanitização E.164 e Validação de Dados
const item = $input.first().json;
const cleanPhone = (item.phone || '').replace(/\\D/g, '');
const formattedPhone = cleanPhone.startsWith('55') ? '+' + cleanPhone : '+55' + cleanPhone;

return {
  json: {
    ...item,
    phone_e164: formattedPhone,
    validated_at: new Date().toISOString(),
    is_urgent: item.urgency === 'alta' || item.urgency === 'critica'
  }
};`
        },
        id: "code-sanitizer",
        name: "Validação & Regex",
        type: "n8n-nodes-base.code",
        typeVersion: 2,
        position: [460, 300]
      },
      {
        parameters: {
          conditions: {
            boolean: [
              {
                value1: "={{ $json.is_urgent }}",
                value2: true
              }
            ]
          }
        },
        id: "urgency-router",
        name: "Roteador de Urgência",
        type: "n8n-nodes-base.if",
        typeVersion: 1,
        position: [680, 300]
      },
      {
        parameters: {
          operation: "create",
          resource: "deal",
          pipelineId: "juridico_cartes",
          stageId: "lead_qualificado",
          title: "={{ $json.companyName || $json.contactName }} - {{ $json.practiceArea }}",
          customFields: {
            protocolo: "={{ $json.protocol }}",
            socio_atribuido: "={{ $json.assignedPartner }}",
            prazo_dias: "={{ $json.deadlineDays || 0 }}"
          }
        },
        id: "crm-deal-sync",
        name: "Sincronização CRM",
        type: "n8n-nodes-base.hubspot",
        typeVersion: 1,
        position: [900, 240]
      },
      {
        parameters: {
          method: "POST",
          url: "https://api.z-api.io/instances/YOUR_INSTANCE/token/YOUR_TOKEN/send-text",
          sendBody: true,
          bodyParameters: {
            parameters: [
              {
                name: "phone",
                value: "={{ $json.phone_e164 }}"
              },
              {
                name: "message",
                value: "Olá {{ $json.contactName }}, confirmamos o protocolo {{ $json.protocol }} na Cartes Advogados. O sócio {{ $json.assignedPartner }} já foi notificado."
              }
            ]
          }
        },
        id: "whatsapp-zapi",
        name: "WhatsApp Confirmação",
        type: "n8n-nodes-base.httpRequest",
        typeVersion: 4.1,
        position: [1120, 300]
      },
      {
        parameters: {
          channel: "#alertas-socios-urgentes",
          text: "🚨 *Novo Caso Protocolado* | {{ $json.protocol }}\\n• Cliente: {{ $json.contactName }}\\n• Área: {{ $json.practiceArea }}\\n• Sócio: {{ $json.assignedPartner }}\\n• Resumo: {{ $json.caseSummary }}"
        },
        id: "slack-alert",
        name: "Alerta Equipe (Slack/Teams)",
        type: "n8n-nodes-base.slack",
        typeVersion: 2.1,
        position: [1340, 300]
      }
    ],
    connections: {
      "Webhook Intake": {
        main: [[{ node: "Validação & Regex", type: "main", index: 0 }]]
      },
      "Validação & Regex": {
        main: [[{ node: "Roteador de Urgência", type: "main", index: 0 }]]
      },
      "Roteador de Urgência": {
        main: [
          [{ node: "Sincronização CRM", type: "main", index: 0 }],
          [{ node: "Sincronização CRM", type: "main", index: 0 }]
        ]
      },
      "Sincronização CRM": {
        main: [[{ node: "WhatsApp Confirmação", type: "main", index: 0 }]]
      },
      "WhatsApp Confirmação": {
        main: [[{ node: "Alerta Equipe (Slack/Teams)", type: "main", index: 0 }]]
      }
    }
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(n8nWorkflowJson, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const handleCopySnippet = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippetIndex(index);
    setTimeout(() => setCopiedSnippetIndex(null), 2000);
  };

  const handleDownloadJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(n8nWorkflowJson, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "n8n_cartes_advogados_workflow_v1.0.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const stepTechnicalDetails = [
    {
      node: "Webhook Intake",
      role: "Ponto de Entrada HTTP",
      endpoint: "POST /webhook/cartes-lead",
      runtime: "n8n Webhook Listener v1.0",
      headers: { "Content-Type": "application/json", "X-Cartes-Origin": "portal_web", "X-Signature": "sha256=9f82a1..." },
      inputSnippet: { 
        protocol: selectedExec?.protocol, 
        client: selectedExec?.leadName, 
        company: selectedExec?.companyName,
        area: selectedExec?.practiceArea 
      },
      outputSnippet: { 
        status: 200, 
        received: true, 
        queueTime: "12ms", 
        latency: "28ms" 
      },
      insights: "Captura atômica sem perda de requisições com buffer assíncrono e resposta HTTP 200 em menos de 30ms."
    },
    {
      node: "Regex & Sanitização",
      role: "Normalização e Conformidade",
      endpoint: "n8n Code Node (JavaScript Sandbox)",
      runtime: "Node.js v20.x V8 Engine",
      headers: { "Runtime": "Node.js v20", "MemoryLimit": "128MB", "ExecutionTimeout": "5000ms" },
      inputSnippet: { 
        rawPhone: selectedExec?.payload?.phone, 
        rawEmail: selectedExec?.payload?.email, 
        rawName: selectedExec?.leadName 
      },
      outputSnippet: { 
        phone_e164: "+5511984529901", 
        cleanName: selectedExec?.leadName, 
        sanitizedEmail: selectedExec?.payload?.email?.toLowerCase(),
        is_valid: true 
      },
      insights: "Validação estrita com regex para formato internacional E.164, garantindo entrega precisa no WhatsApp."
    },
    {
      node: "Classificador de Urgência",
      role: "Triagem Jurídica Heurística",
      endpoint: "n8n Switch / Rules Engine",
      runtime: "Decision Matrix v2.4",
      headers: { "UrgencyRules": "JudicialDeadline_Under5Days", "EscalationPolicy": "DirectPartnerPaging" },
      inputSnippet: { 
        hasDeadline: selectedExec?.payload?.hasJudicialDeadline, 
        days: selectedExec?.payload?.deadlineDays,
        urgencyField: selectedExec?.urgency 
      },
      outputSnippet: { 
        assignedTier: selectedExec?.urgency?.toUpperCase(), 
        queue: selectedExec?.urgency === 'critica' || selectedExec?.urgency === 'alta' ? "priority_sla_2h" : "standard_sla_24h",
        routeTaken: "urgent_path" 
      },
      insights: "Roteia demandas com prazos processuais fatais ou autuações para a esteira prioritária com SLA de atendimento de 2 horas."
    },
    {
      node: "Sincronização CRM",
      role: "Integração Hubspot / Pipedrive",
      endpoint: "POST https://api.hubspot.com/crm/v3/objects/deals",
      runtime: "REST API Client with Bearer Token",
      headers: { "Authorization": "Bearer ***", "Content-Type": "application/json", "X-Retry-Policy": "exponential" },
      inputSnippet: { 
        dealname: `${selectedExec?.companyName || selectedExec?.leadName} - ${selectedExec?.practiceArea}`, 
        stage: "lead_qualificado",
        owner: selectedExec?.assignedPartner 
      },
      outputSnippet: { 
        dealId: "89410294", 
        status: "created", 
        pipeline: "juridico_cartes", 
        partnerOwner: selectedExec?.assignedPartner 
      },
      insights: "Gera o deal comercial imediatamente vinculado ao histórico do cliente e ao sócio coordenador da área."
    },
    {
      node: "WhatsApp (Z-API)",
      role: "Mensageria e Confirmação Imediata",
      endpoint: "POST https://api.z-api.io/instances/CARTES_PROD/token/***/send-text",
      runtime: "Z-API Cloud WhatsApp Gateway",
      headers: { "Client-Token": "***", "Provider": "Z-API / WhatsApp Cloud", "DeliveryReceipt": "active" },
      inputSnippet: { 
        to: selectedExec?.payload?.phone, 
        template: "welcome_protocol", 
        protocol: selectedExec?.protocol,
        assignedPartner: selectedExec?.assignedPartner 
      },
      outputSnippet: { 
        messageId: "wamid.HB19920", 
        status: "SENT_DELIVERED", 
        carrierAck: "200_OK" 
      },
      insights: "Disparo do comprovante formal do protocolo com link seguro e identificação nominal do advogado designado."
    },
    {
      node: "Alerta Sócios",
      role: "Notificação Interna Slack / Teams",
      endpoint: "POST https://hooks.slack.com/services/***/cartes-alertas",
      runtime: "Webhook Publisher",
      headers: { "TargetChannel": "#socios-demandas-urgentes", "Priority": "HIGH" },
      inputSnippet: { 
        lead: selectedExec?.leadName, 
        partner: selectedExec?.assignedPartner, 
        protocol: selectedExec?.protocol,
        summary: selectedExec?.payload?.caseSummary?.slice(0, 80) + '...'
      },
      outputSnippet: { 
        notifiedUsers: [selectedExec?.assignedPartner, "Secretaria Jurídica"], 
        messageTs: "1728679200.00192", 
        status: "notified" 
      },
      insights: "Alerta em canal interno fechado contendo resumo prévio da demanda e botão de aceitação de caso."
    }
  ];

  return (
    <section id="n8n" className="border-b border-slate-800/80 bg-[#0e1626] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#c5a880]">
              <Terminal className="h-4 w-4" />
              <span>ORQUESTRADOR N8N & ENGENHARIA DE AUTOMAÇÃO</span>
            </div>
            <h2 className="mt-2 text-3xl font-normal text-slate-100 sm:text-4xl">
              Pipeline de Intake, CRM & WhatsApp
            </h2>
          </div>
          <p className="max-w-md text-sm text-slate-400">
            Arquitetura orientada a eventos para triagem de casos em menos de 2 minutos com conformidade e rastreabilidade total.
          </p>
        </div>

        {/* Tab Selector & Actions */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4">
          <div className="relative flex items-center gap-2 bg-slate-900/90 p-1 rounded-sm border border-slate-800">
            {[
              { id: 'visual', label: 'Pipeline Visual & Execução' },
              { id: 'logs', label: `Logs de Webhook (${executions.length})` },
              { id: 'n8n_json', label: 'Blueprint n8n (.json)' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative px-3.5 py-1.5 text-xs font-medium rounded-sm transition-colors z-10 ${
                  activeTab === tab.id
                    ? 'text-[#0b111e] font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeN8nTab"
                    className="absolute inset-0 bg-[#c5a880] rounded-sm -z-10 shadow-sm"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                )}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Test Trigger Shortcuts */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-500 mr-1 hidden lg:inline">Simular Disparo:</span>
            <button
              onClick={() => onTriggerManualTest('tributario_urgente')}
              className="flex items-center gap-1.5 rounded-sm border border-amber-600/50 bg-amber-950/30 px-2.5 py-1.5 text-[11px] font-medium text-amber-300 hover:bg-amber-900/40 transition-colors"
            >
              <Play className="h-3 w-3" />
              <span>CARF Urgente</span>
            </button>
            <button
              onClick={() => onTriggerManualTest('ma_societario')}
              className="flex items-center gap-1.5 rounded-sm border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-[11px] font-medium text-slate-300 hover:border-slate-500 transition-colors"
            >
              <Play className="h-3 w-3" />
              <span>M&A Série A</span>
            </button>
            <button
              onClick={() => onTriggerManualTest('trabalhista_pdv')}
              className="flex items-center gap-1.5 rounded-sm border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-[11px] font-medium text-slate-300 hover:border-slate-500 transition-colors"
            >
              <Play className="h-3 w-3" />
              <span>Acordo Sindical</span>
            </button>
          </div>
        </div>

        {/* TAB 1: VISUAL PIPELINE */}
        {activeTab === 'visual' && (
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 space-y-6"
          >
            {/* Visual Node Diagram */}
            <div className="rounded-sm border border-slate-800 bg-[#0b111e] p-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>Fluxo Ativo: POST https://webhook.cartesadvogados.com.br/cartes-lead</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Clock className="h-3.5 w-3.5 text-[#c5a880]" />
                  <span>Latência média: <strong className="text-emerald-400">295ms</strong></span>
                </div>
              </div>

              {/* Step cards connected by lines */}
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
                {[
                  { node: "NÓ 01", title: "Webhook Intake", desc: "Recebe POST do formulário com payload estruturado.", status: "200 OK (Instant)", icon: Terminal, color: "emerald", index: 0 },
                  { node: "NÓ 02", title: "Validação & Regex", desc: "Sanitização de telefone E.164 e integridade de dados.", status: "Regex Validado", icon: Code2, color: "blue", index: 1 },
                  { node: "NÓ 03", title: "Classificador de Urgência", desc: "Classifica prazos processuais e define prioridade.", status: "Roteamento Inteligente", icon: ShieldCheck, color: "amber", index: 2 },
                  { node: "NÓ 04", title: "Sincronização CRM", desc: "Criação de Oportunidade no funil com dados do lead.", status: "Deal Gerado", icon: Database, color: "purple", index: 3 },
                  { node: "NÓ 05", title: "WhatsApp (Z-API)", desc: "Confirmação instantânea com protocolo e horário.", status: "Mensagem Enviada", icon: MessageSquare, color: "emerald", index: 4 },
                  { node: "NÓ 06", title: "Alerta Sócios", desc: "Notificação imediata no Slack/Teams com atalho de resposta.", status: "Canal Notificado", icon: Bell, color: "rose", index: 5 }
                ].map((item) => {
                  const Icon = item.icon;
                  const isNodeActive = expandedStepIndex === item.index;

                  return (
                    <motion.div
                      key={item.index}
                      whileHover={{ y: -4, transition: { duration: 0.15 } }}
                      onClick={() => setExpandedStepIndex(item.index)}
                      className={`cursor-pointer group flex flex-col justify-between rounded-sm border p-4 transition-all duration-200 ${
                        isNodeActive 
                          ? 'border-[#c5a880] bg-[#121c30] shadow-md shadow-[#c5a880]/10' 
                          : 'border-slate-800 bg-[#0e1626] hover:border-[#c5a880]/50 hover:bg-[#111a2d]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <div className={`flex h-7 w-7 items-center justify-center rounded-sm bg-${item.color}-950 text-${item.color}-400 border border-${item.color}-800/50`}>
                            <Icon className="h-3.5 w-3.5" />
                          </div>
                          <span className={`text-[10px] font-mono ${isNodeActive ? 'text-[#c5a880] font-bold' : 'text-slate-500'}`}>
                            {item.node}
                          </span>
                        </div>
                        <span className="mt-3 block text-xs font-semibold text-slate-200 group-hover:text-[#c5a880] transition-colors">
                          {item.title}
                        </span>
                        <p className="mt-1 text-[11px] text-slate-400 leading-snug">{item.desc}</p>
                      </div>
                      <div className="mt-4 flex items-center justify-between pt-2 border-t border-slate-800/60">
                        <span className={`text-[10px] text-${item.color}-400`}>{item.status}</span>
                        {isNodeActive && (
                          <span className="flex h-1.5 w-1.5 rounded-full bg-[#c5a880]"></span>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Selected Execution Inspector with Premium Framer Motion Accordion */}
            {selectedExec && (
              <motion.div 
                layout
                className="rounded-sm border border-slate-800 bg-[#0b111e] p-6 shadow-2xl transition-colors"
              >
                {/* Header */}
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-slate-800/80 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs uppercase tracking-wider text-slate-400">
                        Inspeção de Execução em Tempo Real
                      </span>
                      <span className="rounded bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 text-[10px] font-mono font-medium text-emerald-400">
                        Status 200 SUCCESS
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-slate-100 mt-1">
                      Protocolo: <span className="font-mono text-[#c5a880]">{selectedExec.protocol}</span> — {selectedExec.leadName} ({selectedExec.companyName})
                    </h3>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-slate-400">Duração Total: <strong className="text-emerald-400">{selectedExec.durationMs}ms</strong></span>
                    <span className="text-slate-600">·</span>
                    <span className="text-slate-400">Sócio: <strong className="text-slate-200">{selectedExec.assignedPartner}</strong></span>
                  </div>
                </div>

                {/* Subtitle helper with quick action */}
                <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                  <p>
                    Clique em qualquer etapa abaixo para <strong>expandir a telemetria, inputs e outputs</strong> processados pelo nó do n8n:
                  </p>
                  <button
                    onClick={() => setExpandedStepIndex(expandedStepIndex !== null ? null : 0)}
                    className="text-[11px] font-medium text-[#c5a880] hover:underline"
                  >
                    {expandedStepIndex !== null ? 'Recolher Todos' : 'Expandir Nó Inicial'}
                  </button>
                </div>

                {/* Expandable Steps List with Smooth Framer Motion Accordion */}
                <div className="mt-4 space-y-3">
                  {selectedExec.steps.map((st, i) => {
                    const isExpanded = expandedStepIndex === i;
                    const techDetail = stepTechnicalDetails[i] || stepTechnicalDetails[0];

                    return (
                      <motion.div
                        key={i}
                        layout
                        transition={{ 
                          layout: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } 
                        }}
                        className={`rounded-sm border overflow-hidden transition-all duration-300 ${
                          isExpanded 
                            ? 'border-[#c5a880]/70 bg-[#0e1626] shadow-lg shadow-black/40 ring-1 ring-[#c5a880]/20' 
                            : 'border-slate-800/80 bg-[#0e1626]/70 hover:border-slate-700 hover:bg-[#0e1626]'
                        }`}
                      >
                        {/* Step Header (Click to Toggle) */}
                        <button
                          type="button"
                          onClick={() => setExpandedStepIndex(isExpanded ? null : i)}
                          className="flex w-full items-center justify-between p-4 text-left text-xs transition-colors group cursor-pointer"
                        >
                          <div className="flex items-center gap-3.5">
                            <motion.div 
                              animate={{ scale: isExpanded ? 1.05 : 1 }}
                              className="flex h-7 w-7 items-center justify-center rounded-sm bg-emerald-950/80 border border-emerald-800/40 text-emerald-400 shadow-sm"
                            >
                              <CheckCircle2 className="h-4 w-4" />
                            </motion.div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-slate-100 group-hover:text-[#c5a880] transition-colors">
                                  {st.name}
                                </span>
                                <span className="text-[11px] text-slate-400 font-mono">({st.duration})</span>
                              </div>
                              <p className="text-[11px] text-slate-400 mt-0.5">{st.detail}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-[10px] uppercase font-mono text-emerald-400 hidden sm:inline px-2 py-0.5 rounded bg-emerald-950/50 border border-emerald-800/30">
                              {st.status}
                            </span>
                            <motion.div
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              transition={{ type: "spring", stiffness: 350, damping: 25 }}
                              className="flex h-6 w-6 items-center justify-center rounded bg-slate-800/60 text-slate-400 group-hover:text-white"
                            >
                              <ChevronDown className="h-3.5 w-3.5" />
                            </motion.div>
                          </div>
                        </button>

                        {/* Expandable Body with Framer Motion Spring */}
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              key="content"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ 
                                opacity: 1, 
                                height: 'auto',
                                transition: {
                                  height: { duration: 0.38, ease: [0.16, 1, 0.3, 1] },
                                  opacity: { duration: 0.28, delay: 0.08 }
                                }
                              }}
                              exit={{ 
                                opacity: 0, 
                                height: 0,
                                transition: {
                                  height: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                                  opacity: { duration: 0.15 }
                                }
                              }}
                              className="overflow-hidden border-t border-slate-800/90 bg-[#070c17]/95 px-5 py-5"
                            >
                              <motion.div
                                initial={{ y: 8, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                                className="space-y-4"
                              >
                                {/* Role & Description Banner */}
                                <div className="flex flex-wrap items-center justify-between gap-2 rounded-sm border border-slate-800 bg-[#09101f] px-3.5 py-2.5 text-xs">
                                  <div className="flex items-center gap-2">
                                    <Activity className="h-3.5 w-3.5 text-[#c5a880]" />
                                    <span className="font-semibold text-slate-200">{techDetail.role}</span>
                                    <span className="text-slate-600">·</span>
                                    <span className="text-slate-400 font-mono text-[11px]">{techDetail.runtime}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                                    <span className="font-mono text-emerald-400">Latência do Nó: {st.duration}</span>
                                  </div>
                                </div>

                                <p className="text-xs text-slate-300 leading-relaxed italic bg-slate-900/40 p-2.5 rounded border border-slate-800/50">
                                  "{techDetail.insights}"
                                </p>

                                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 text-xs">
                                  {/* Left: Input Payload & Endpoint */}
                                  <div className="flex flex-col justify-between">
                                    <div>
                                      <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
                                        <span className="font-mono text-[#c5a880]">Endpoint de Entrada:</span>
                                        <span className="font-mono text-slate-500 text-[10px] truncate max-w-[220px]" title={techDetail.endpoint}>
                                          {techDetail.endpoint}
                                        </span>
                                      </div>
                                      <div className="relative rounded-sm border border-slate-800 bg-[#05080f] p-3 group/code">
                                        <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-slate-900 text-[10px] font-mono text-slate-500">
                                          <span>$input.first().json</span>
                                          <button
                                            onClick={() => handleCopySnippet(JSON.stringify(techDetail.inputSnippet, null, 2), i * 2)}
                                            className="flex items-center gap-1 text-[#c5a880] hover:text-white"
                                          >
                                            {copiedSnippetIndex === i * 2 ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                                            <span>{copiedSnippetIndex === i * 2 ? 'Copiado' : 'Copiar'}</span>
                                          </button>
                                        </div>
                                        <pre className="text-[11px] font-mono text-slate-300 overflow-x-auto leading-relaxed">
                                          {JSON.stringify(techDetail.inputSnippet, null, 2)}
                                        </pre>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Right: Output Payload & Headers */}
                                  <div className="flex flex-col justify-between">
                                    <div>
                                      <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
                                        <span className="font-mono text-emerald-400">Saída Normalizada:</span>
                                        <span className="font-mono text-emerald-400 text-[10px]">200 OK SUCCESS</span>
                                      </div>
                                      <div className="relative rounded-sm border border-slate-800 bg-[#05080f] p-3 group/code">
                                        <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-slate-900 text-[10px] font-mono text-slate-500">
                                          <span>$json (output emitido)</span>
                                          <button
                                            onClick={() => handleCopySnippet(JSON.stringify(techDetail.outputSnippet, null, 2), i * 2 + 1)}
                                            className="flex items-center gap-1 text-[#c5a880] hover:text-white"
                                          >
                                            {copiedSnippetIndex === i * 2 + 1 ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                                            <span>{copiedSnippetIndex === i * 2 + 1 ? 'Copiado' : 'Copiar'}</span>
                                          </button>
                                        </div>
                                        <pre className="text-[11px] font-mono text-emerald-300 overflow-x-auto leading-relaxed">
                                          {JSON.stringify(techDetail.outputSnippet, null, 2)}
                                        </pre>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Quick Stepper Navigation inside Accordion */}
                                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (i > 0) setExpandedStepIndex(i - 1);
                                    }}
                                    disabled={i === 0}
                                    className="flex items-center gap-1.5 text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 cursor-pointer"
                                  >
                                    <ArrowLeft className="h-3.5 w-3.5" />
                                    <span>Nó Anterior</span>
                                  </button>

                                  <span className="text-[11px] font-mono text-slate-500">
                                    Etapa {i + 1} de {selectedExec.steps.length}
                                  </span>

                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (i < selectedExec.steps.length - 1) setExpandedStepIndex(i + 1);
                                    }}
                                    disabled={i === selectedExec.steps.length - 1}
                                    className="flex items-center gap-1.5 text-[#c5a880] hover:text-white disabled:opacity-30 disabled:hover:text-[#c5a880] cursor-pointer"
                                  >
                                    <span>Próximo Nó</span>
                                    <ArrowRight className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              </motion.div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Raw JSON Payload */}
                <div className="mt-7 border-t border-slate-800 pt-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-slate-400">Payload JSON Completo Transmitido:</span>
                    <button
                      onClick={() => handleCopySnippet(JSON.stringify(selectedExec.payload, null, 2), 9999)}
                      className="flex items-center gap-1 text-[11px] font-mono text-[#c5a880] hover:underline"
                    >
                      {copiedSnippetIndex === 9999 ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                      <span>{copiedSnippetIndex === 9999 ? 'Copiado!' : 'Copiar Payload'}</span>
                    </button>
                  </div>
                  <pre className="max-h-52 overflow-y-auto rounded-sm border border-slate-800 bg-[#070b14] p-3 text-[11px] font-mono text-slate-300">
                    {JSON.stringify(selectedExec.payload, null, 2)}
                  </pre>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* TAB 2: EXECUTION LOGS LIST WITH EXPANDABLE ROWS */}
        {activeTab === 'logs' && (
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 rounded-sm border border-slate-800 bg-[#0b111e] overflow-hidden shadow-xl"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-slate-800 bg-slate-900/80 text-[11px] uppercase tracking-wider text-slate-400">
                  <tr>
                    <th className="px-4 py-3">Protocolo</th>
                    <th className="px-4 py-3">Data / Hora</th>
                    <th className="px-4 py-3">Lead / Empresa</th>
                    <th className="px-4 py-3">Área</th>
                    <th className="px-4 py-3">Urgência</th>
                    <th className="px-4 py-3">Sócio</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {executions.map((item) => {
                    const isRowExpanded = expandedLogId === item.id;

                    return (
                      <React.Fragment key={item.id}>
                        <tr 
                          onClick={() => {
                            setSelectedExecId(item.id);
                            setExpandedLogId(isRowExpanded ? null : item.id);
                          }}
                          className={`hover:bg-[#0e1626] cursor-pointer transition-colors ${
                            item.id === selectedExecId ? 'bg-[#0e1626]/80' : ''
                          }`}
                        >
                          <td className="px-4 py-3.5 font-mono font-medium text-[#c5a880]">{item.protocol}</td>
                          <td className="px-4 py-3.5 text-slate-400">
                            {new Date(item.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                          </td>
                          <td className="px-4 py-3.5">
                            <span className="font-medium text-slate-200">{item.leadName}</span>
                            <p className="text-[10px] text-slate-500">{item.companyName}</p>
                          </td>
                          <td className="px-4 py-3.5 text-slate-300 capitalize">{item.practiceArea}</td>
                          <td className="px-4 py-3.5">
                            <span className={`uppercase font-semibold text-[10px] ${
                              item.urgency === 'critica' || item.urgency === 'alta' ? 'text-amber-400' : 'text-slate-400'
                            }`}>
                              {item.urgency}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 text-slate-300">{item.assignedPartner}</td>
                          <td className="px-4 py-3.5">
                            <span className="inline-flex items-center gap-1 text-emerald-400 text-[11px]">
                              <CheckCircle2 className="h-3 w-3" />
                              <span>200 OK</span>
                            </span>
                          </td>
                          <td className="px-4 py-3.5 text-right">
                            <button
                              type="button"
                              className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#c5a880] hover:underline"
                            >
                              <span>{isRowExpanded ? 'Recolher' : 'Expandir'}</span>
                              <motion.div
                                animate={{ rotate: isRowExpanded ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <ChevronDown className="h-3 w-3" />
                              </motion.div>
                            </button>
                          </td>
                        </tr>

                        {/* Inline Expandable Log Drawer with Silky Smooth Framer Motion */}
                        <AnimatePresence>
                          {isRowExpanded && (
                            <tr>
                              <td colSpan={8} className="p-0 border-b border-slate-800 bg-[#070c16]">
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ 
                                    opacity: 1, 
                                    height: 'auto',
                                    transition: {
                                      height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                                      opacity: { duration: 0.25, delay: 0.05 }
                                    }
                                  }}
                                  exit={{ 
                                    opacity: 0, 
                                    height: 0,
                                    transition: {
                                      height: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
                                      opacity: { duration: 0.15 }
                                    }
                                  }}
                                  className="overflow-hidden p-6"
                                >
                                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                                    <div className="flex items-center gap-2">
                                      <span className="font-mono text-sm text-[#c5a880] font-bold">
                                        {item.protocol}
                                      </span>
                                      <span className="text-slate-400 text-xs">— Resumo Executivo do Caso</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs">
                                      <span className="text-slate-400">Latência do Pipeline:</span>
                                      <span className="rounded bg-emerald-950 px-2 py-0.5 font-mono text-emerald-400 border border-emerald-800/40">
                                        {item.durationMs}ms
                                      </span>
                                    </div>
                                  </div>

                                  <div className="rounded border border-slate-800 bg-[#0a1120] p-4 text-xs text-slate-300">
                                    <strong className="text-slate-100 block mb-1 text-[11px] uppercase tracking-wider text-[#c5a880]">
                                      Fatos Relatados & Objeto da Consulta:
                                    </strong>
                                    <p className="leading-relaxed">
                                      {item.payload.caseSummary}
                                    </p>
                                  </div>

                                  {/* Telemetry Grid */}
                                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] text-slate-400">
                                    <div className="rounded border border-slate-800/80 bg-[#05080f] p-2.5">
                                      <span className="block text-slate-500 text-[10px]">Telefone Normalizado:</span>
                                      <p className="font-mono text-slate-200 mt-0.5">{item.payload.phone}</p>
                                    </div>
                                    <div className="rounded border border-slate-800/80 bg-[#05080f] p-2.5">
                                      <span className="block text-slate-500 text-[10px]">E-mail Corporativo:</span>
                                      <p className="font-mono text-slate-200 mt-0.5 truncate" title={item.payload.email}>{item.payload.email}</p>
                                    </div>
                                    <div className="rounded border border-slate-800/80 bg-[#05080f] p-2.5">
                                      <span className="block text-slate-500 text-[10px]">Preferência de Reunião:</span>
                                      <p className="text-slate-200 mt-0.5 capitalize">{item.payload.meetingPreference}</p>
                                    </div>
                                    <div className="rounded border border-slate-800/80 bg-[#05080f] p-2.5">
                                      <span className="block text-slate-500 text-[10px]">Janela de Horário:</span>
                                      <p className="text-slate-200 mt-0.5 capitalize">{item.payload.preferredTimeSlot}</p>
                                    </div>
                                  </div>

                                  {/* Steps Mini Progress */}
                                  <div className="mt-4 flex flex-wrap items-center gap-2 pt-3 border-t border-slate-800/70">
                                    <span className="text-[11px] text-slate-500 mr-2">Etapas concluídas:</span>
                                    {item.steps.map((s, idx) => (
                                      <span 
                                        key={idx}
                                        className="inline-flex items-center gap-1 rounded bg-slate-900 border border-slate-800 px-2 py-0.5 text-[10px] text-slate-300"
                                      >
                                        <Check className="h-2.5 w-2.5 text-emerald-400" />
                                        <span>{s.name}</span>
                                      </span>
                                    ))}
                                  </div>

                                  <div className="mt-5 flex justify-end">
                                    <button
                                      onClick={() => {
                                        setSelectedExecId(item.id);
                                        setActiveTab('visual');
                                      }}
                                      className="flex items-center gap-2 rounded-sm bg-[#c5a880] px-3.5 py-1.5 text-xs font-semibold text-[#0b111e] hover:bg-[#d8be98] transition-colors shadow-sm"
                                    >
                                      <span>Abrir no Pipeline Visual Completo</span>
                                      <ArrowRight className="h-3.5 w-3.5" />
                                    </button>
                                  </div>
                                </motion.div>
                              </td>
                            </tr>
                          )}
                        </AnimatePresence>
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* TAB 3: N8N JSON EXPORT BLUEPRINT */}
        {activeTab === 'n8n_json' && (
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 rounded-sm border border-slate-800 bg-[#0b111e] p-6 shadow-xl"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-800/80 pb-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-200">
                  Blueprint n8n (Import ready)
                </h3>
                <p className="text-xs text-slate-400">
                  Copie o código JSON abaixo e cole diretamente na interface do seu n8n via "Import from JSON" ou atalho Ctrl+V.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyJson}
                  className="flex items-center gap-1.5 rounded-sm border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 hover:text-white transition-colors"
                >
                  {copiedJson ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5 text-slate-400" />}
                  <span>{copiedJson ? 'Copiado!' : 'Copiar JSON'}</span>
                </button>

                <button
                  onClick={handleDownloadJson}
                  className="flex items-center gap-1.5 rounded-sm bg-[#c5a880] px-3.5 py-1.5 text-xs font-semibold text-[#0b111e] hover:bg-[#d8be98] transition-colors"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Baixar Arquivo .json</span>
                </button>
              </div>
            </div>

            <pre className="mt-4 max-h-96 overflow-y-auto rounded-sm border border-slate-800 bg-[#070b14] p-4 text-xs font-mono text-emerald-300">
              {JSON.stringify(n8nWorkflowJson, null, 2)}
            </pre>
          </motion.div>
        )}

      </div>
    </section>
  );
};
