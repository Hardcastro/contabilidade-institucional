export type NavItem = {
  label: string;
  href: string;
};

export type Service = {
  slug: string;
  title: string;
  summary: string;
  description: string;
};

export type Plan = {
  id: string;
  name: string;
  price: string;
  audience: string;
  items: string[];
  featured?: boolean;
};

export type ComparisonRow = {
  label: string;
  essencial: string;
  crescimento: string;
  completo: string;
};

export type TeamMember = {
  name: string;
  role: string;
  crc: string;
  bio: string;
};

export type ProofNumber = {
  value: string;
  label: string;
};

export type HowItWorksStep = {
  title: string;
  description: string;
};

export const siteConfig = {
  name: "Meridiano Contabilidade",
  shortName: "Meridiano",
  city: "São Paulo",
  state: "SP",
  tagline: "Você sabe quanto vai pagar de imposto antes do mês fechar.",
  description:
    "Contabilidade para pequena empresa e prestador de serviço autônomo em São Paulo. Guias, folha e declarações no prazo, com número explicado — não recitado.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://contabilidade-institucional.vercel.app",
  locale: "pt_BR",
  contact: {
    phone: "(11) 4002-8922",
    phoneHref: "+551140028922",
    email: "contato@meridianocontabil.com.br",
    address: "Rua dos Pinheiros, 890 — Sala 42, Pinheiros, São Paulo/SP",
    hours: "Segunda a sexta, 9h às 18h",
  },
} as const;

export const navItems: NavItem[] = [
  { label: "Início", href: "/" },
  { label: "Serviços", href: "/servicos" },
  { label: "Escritório", href: "/escritorio" },
  { label: "Planos", href: "/planos" },
  { label: "Contato", href: "/contato" },
];

export const services: Service[] = [
  {
    slug: "abertura-de-empresa",
    title: "Abertura de empresa",
    summary: "Seu CNPJ ativo e pronto para emitir nota, sem fila de cartório.",
    description:
      "Você recebe o CNPJ ativo, o enquadramento tributário já decidido e o cadastro na prefeitura resolvido, sem precisar entender a burocracia por trás. Cuidamos da viabilidade, do registro e do alvará. Você começa a emitir nota fiscal assim que a papelada sai, não semanas depois.",
  },
  {
    slug: "contabilidade-mensal",
    title: "Contabilidade mensal",
    summary: "Guias de imposto prontas para pagar, todo mês, antes do vencimento.",
    description:
      "Todo mês você recebe as guias de imposto já calculadas e prontas para pagar, um balancete simples de ler e um canal direto para tirar dúvida. Nada de planilha para você preencher ou termo técnico para decifrar sozinho.",
  },
  {
    slug: "folha-de-pagamento",
    title: "Folha de pagamento",
    summary: "Holerite, férias e rescisão calculados sem erro, prontos no dia.",
    description:
      "Você recebe o holerite de cada funcionário, as guias de FGTS e INSS prontas para pagar e o cálculo de férias ou rescisão sem margem para erro. Tudo entregue com antecedência do vencimento, para você não correr atrás de multa.",
  },
  {
    slug: "imposto-de-renda-pj-e-pf",
    title: "Imposto de renda PJ e PF",
    summary: "Declaração da empresa e a sua, entregues no prazo, sem prazo perdido.",
    description:
      "Entregamos a declaração da empresa e a sua declaração de pessoa física, dentro do prazo, sem retificação de última hora. De quebra, mostramos a comparação entre regimes para você decidir se compensa mudar no ano seguinte.",
  },
  {
    slug: "consultoria-tributaria",
    title: "Consultoria tributária",
    summary: "Uma resposta clara sobre quanto você vai pagar, antes de decidir.",
    description:
      "Antes de fechar uma decisão que mexe com imposto — contratar, mudar de regime, abrir uma filial — você tem uma conversa em linguagem simples sobre quanto isso custa. Nada de resposta genérica: revisamos o seu enquadramento antes de responder.",
  },
];

export const featuredServiceSlugs = [
  "contabilidade-mensal",
  "abertura-de-empresa",
  "consultoria-tributaria",
];

export const howItWorks: HowItWorksStep[] = [
  {
    title: "Conversa inicial",
    description:
      "Você conta como a empresa funciona hoje. Vinte minutos, sem compromisso e sem letra miúda.",
  },
  {
    title: "Diagnóstico e enquadramento",
    description:
      "Comparamos os regimes tributários disponíveis e mostramos, em número, quanto cada um custa por mês.",
  },
  {
    title: "Rotina no ar",
    description:
      "Guias, folha e declarações entram no calendário. Você recebe antes do vencimento, não depois dele.",
  },
];

export const proofNumbers: ProofNumber[] = [
  { value: "9", label: "anos de escritório" },
  { value: "180+", label: "empresas ativas na carteira" },
  { value: "0", label: "multas por atraso em 2025" },
  { value: "1 dia útil", label: "prazo médio de resposta" },
];

export const plans: Plan[] = [
  {
    id: "essencial",
    name: "Essencial",
    price: "R$ 189/mês",
    audience: "MEI e autônomo, sem funcionário",
    items: [
      "Apuração mensal do Simples ou do MEI",
      "Emissão das guias de imposto (DAS)",
      "Declaração anual (DASN-SIMEI ou IRPF)",
      "Canal direto de dúvidas por WhatsApp",
      "Sem folha de pagamento",
    ],
  },
  {
    id: "crescimento",
    name: "Crescimento",
    price: "R$ 389/mês",
    audience: "ME no Simples Nacional, até 5 funcionários",
    items: [
      "Tudo do plano Essencial",
      "Folha de pagamento para até 5 funcionários",
      "Guias de FGTS e INSS prontas para pagar",
      "Balancete mensal em linguagem simples",
      "Orientação para emissão de nota fiscal",
      "Resposta em até 1 dia útil",
    ],
    featured: true,
  },
  {
    id: "completo",
    name: "Completo",
    price: "R$ 749/mês",
    audience: "Simples ou Lucro Presumido, folha maior, consultoria inclusa",
    items: [
      "Tudo do plano Crescimento",
      "Folha de pagamento sem limite de funcionários",
      "Apuração no Lucro Presumido",
      "Consultoria tributária mensal incluída",
      "Relatório gerencial trimestral",
      "Atendimento prioritário, resposta no mesmo dia",
    ],
  },
];

export const comparisonRows: ComparisonRow[] = [
  {
    label: "Apuração de imposto",
    essencial: "Simples ou MEI",
    crescimento: "Simples Nacional",
    completo: "Simples ou Presumido",
  },
  {
    label: "Folha de pagamento",
    essencial: "Não incluída",
    crescimento: "Até 5 funcionários",
    completo: "Sem limite",
  },
  {
    label: "Consultoria tributária",
    essencial: "Sob consulta avulsa",
    crescimento: "Sob consulta avulsa",
    completo: "Mensal, incluída",
  },
  {
    label: "Prazo de resposta",
    essencial: "Até 3 dias úteis",
    crescimento: "1 dia útil",
    completo: "Mesmo dia",
  },
  {
    label: "Relatório gerencial",
    essencial: "Não incluído",
    crescimento: "Balancete mensal",
    completo: "Trimestral, com leitura guiada",
  },
];

export const team: TeamMember[] = [
  {
    name: "Marina Andrade Reis",
    role: "Sócia-fundadora",
    crc: "CRC-SP 184223/O-3",
    bio: "Quatorze anos cuidando de contabilidade de pequena empresa, depois de trocar a auditoria pelo lado de quem paga o imposto.",
  },
  {
    name: "Thiago Bezerra Lima",
    role: "Contador responsável pela folha",
    crc: "CRC-SP 209157/O-6",
    bio: "Especialista em folha de pagamento e rescisão, já revisou mais de trezentos cálculos sem glosa.",
  },
  {
    name: "Camila Fontoura Duarte",
    role: "Consultora tributária",
    crc: "CRC-SP 198340/O-2",
    bio: "Passou seis anos dentro de um Simples Nacional de verdade antes de virar consultora — sabe onde o regime aperta.",
  },
  {
    name: "Rodrigo Salgado Vieira",
    role: "Contador responsável por abertura",
    crc: "CRC-SP 221876/O-9",
    bio: "Já abriu mais de duzentos CNPJs e conhece as prefeituras da região metropolitana que mais travam o alvará.",
  },
];

export const officeHistory =
  "A Meridiano nasceu em 2017, na mesa de cozinha de Marina, atendendo dois clientes que ela levou da auditoria. Hoje o escritório cuida de mais de cento e oitenta empresas em São Paulo, mas manteve a regra do primeiro cliente: nenhuma guia sai sem alguém explicar o que ela significa.";

export const finalCta = {
  title: "Fale com a Meridiano antes de fechar o mês",
  description:
    "Conte como sua empresa funciona hoje e leve embora um diagnóstico de enquadramento, sem compromisso.",
  buttonLabel: "Falar com a Meridiano",
  buttonHref: "/contato",
};

export const businessTypeOptions = [
  { value: "mei", label: "MEI" },
  { value: "me", label: "ME" },
  { value: "simples", label: "Simples Nacional" },
  { value: "presumido", label: "Lucro Presumido" },
  { value: "ainda-vou-abrir", label: "Ainda vou abrir" },
] as const;

export const revenueRangeOptions = [
  { value: "ate-81k", label: "Até R$ 81 mil por ano" },
  { value: "81k-360k", label: "R$ 81 mil a R$ 360 mil por ano" },
  { value: "360k-4-8m", label: "R$ 360 mil a R$ 4,8 milhões por ano" },
  { value: "acima-4-8m", label: "Acima de R$ 4,8 milhões por ano" },
] as const;
