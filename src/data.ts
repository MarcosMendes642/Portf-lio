// ============================================================
// SEUS DADOS — edite este arquivo com suas informações reais.
// ============================================================

import type { IconType } from "react-icons";
import {
  SiCss,
  SiGsap,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiNodedotjs,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { PiSparkle } from "react-icons/pi";

export const profile = {
  name: "Marcos",
  initials: "M",
  role: "Desenvolvedor Full-stack",
  location: "Volta Redonda-RJ, BR",
  timezoneLabel: "RJ",
  email: "DevMarcosMendes@gmail.com",
  availability: "Q1'27", 
  bio: [
    "Sou desenvolvedor full stack apaixonado por transformar problemas complexos em soluções simples e bem construídas, do banco de dados à interface.",
"Trabalho com JavaScript e TypeScript, tenho uma base sólida em lógica de programação e MySQL, e gosto de cuidar do front-end com o mesmo rigor que dedico ao back-end.",
  ],
};

export type Project = {
  name: string;
  meta: string; 
  year: string;
  href: string; 
};

// ============================================================
// HABILIDADES — grade única de cards (icon: react-icons, cor oficial)
// ============================================================

export interface Skill {
  name: string;
  icon: IconType;
  category?: string;
  color: string; 
  opticalScale?: number; 
  since: string; 
  description: string;
  topics: string[];
}

export const skills: Skill[] = [
  {
    name: "JavaScript",
    icon: SiJavascript,
    category: "Linguagens",
    color: "#f7df1e",
    since: "2024",
    description:
      "Minha base: a linguagem da web. Uso no dia a dia para construir interfaces, manipular o DOM, trabalhar com APIs assíncronas (fetch, Promises, async/await) e módulos ES.",
    topics: ["ES2023+", "DOM", "Async", "ESM"],
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
    category: "Linguagens",
    color: "#3178c6",
    since: "2025",
    description:
      "JavaScript com tipagem estática: tipos, generics, narrowing e configuração de tsconfig. Meu padrão em qualquer projeto React ou Node para código mais previsível e refatorável.",
    topics: ["Generics", "Narrowing", "tsconfig", "Office Scripts"],
  },
  {
    name: "React",
    icon: SiReact,
    category: "Front-end",
    color: "#61dafb",
    since: "2025",
    description:
      "Componentes, hooks (useState, useEffect, useContext), props, estado e hierarquia limpa. Construo SPAs reusáveis com atenção a linhas de atualização e keys.",
    topics: ["Hooks", "Componentes", "Estado", "Context API"],
  },
  {
    name: "Node.js",
    icon: SiNodedotjs,
    category: "Back-end",
    color: "#5fa04e",
    since: "2025",
    description:
      "Runtime para o back-end em JavaScript: servidores HTTP, APIs REST, Express, scripts e automações — o mesmo JavaScript do front no servidor.",
    topics: ["Express", "API REST", "npm", "Scripts"],
  },
  {
    name: "MySQL",
    icon: SiMysql,
    category: "Banco de dados",
    color: "#4479a1",
    since: "2026",
    description:
      "Modelagem relacional: criação de tabelas, chaves, joins, consultas SQL e operações CRUD — fundamentos de estruturação e busca de dados.",
    topics: ["SQL", "Joins", "CRUD", "Modelagem"],
  },
  {
    name: "HTML",
    icon: SiHtml5,
    category: "Front-end",
    color: "#e34f26",
    since: "2024",
    description:
      "Estrutura semântica e acessível: tags corretas, landmarks, meta/viewport, imagens responsivas e formulários — com atenção a SEO e hierarquia de conteúdo.",
    topics: ["Semântica", "A11y", "SEO", "Formulários"],
  },
  {
    name: "CSS",
    icon: SiCss,
    category: "Front-end",
    color: "#1572b6",
    since: "2024",
    description:
      "Layout moderno (flexbox, grid, unidades fluidas), custom properties, color-mix, transições e easings — tipografia e microinterações cuidadosas em cada pixel.",
    topics: ["Flexbox & Grid", "Variáveis", "Responsivo", "Motion"],
  },
  {
    name: "Tailwind",
    icon: SiTailwindcss,
    category: "Front-end",
    color: "#06b6d4",
    since: "2026",
    description:
      "Utilitários atômicos para produtividade sem perder consistência: paleta, spacing e estados no próprio markup, com theming centralizado.",
    topics: ["Utility-first", "Theming", "Responsive", "Dark mode"],
  },
  {
    name: "GSAP",
    icon: SiGsap,
    category: "Front-end",
    color: "#0ae448",
    since: "2026",
    description:
      "Animação profissional no browser: timelines, easings custom, ScrollTrigger com scrub, SplitText, quickTo/quickSetter e integração com Lenis — todo o movimento deste site.",
    topics: ["Timeline", "ScrollTrigger", "SplitText", "quickTo"],
  },
  {
    name: "Python",
    icon: SiPython,
    category: "Linguagens",
    color: "#3776ab",
    since: "2026",
    description:
      "Automações, scripts e fundamentos: lógica, estruturas de dados, leitura de arquivos e primeiras integrações — a base da automação de tarefas.",
    topics: ["Scripts", "Automações", "Lógica", "Dados"],
  },
  {
    name: "Git",
    icon: SiGit,
    category: "Ferramentas",
    color: "#f05032",
    since: "2025",
    description:
      "Versionamento no fluxo de trabalho: branch/merge, rebase, histórico limpo, pull requests e colaboração em repositórios remotos.",
    topics: ["Branch & merge", "Rebase", "Pull requests", "GitHub"],
  },
  {
    name: "IA",
    icon: PiSparkle,
    category: "Inteligência Artificial",
    color: "#8b5cf6",
    opticalScale: 1.16, 
    since: "2025",
    description:
      "Uso IA como parte do workflow de desenvolvedor: integração de APIs de modelos, engenharia de prompts, agentes e ferramentas (OpenCode) para acelerar código, revisar e automatizar tarefas.",
    topics: ["APIs de modelos", "Prompts", "Agentes (OpenCode)", "Automações"],
  },
];

export const projects: Project[] = [
  { name: "Divide Aqui(front-end)", meta: "TCC FAETEC", year: "2026", href: "https://divide-aqui.vercel.app" },
  { name: "Divide Aqui(Back-end)", meta: "TCC FAETEC", year: "2026", href: "https://divide-aqui-backend.vercel.app" },

];



export type Qualification = {
  kind: "Formação" | "Experiência";
  title: string;
  org: string;
  period: string;
  desc: string;
  tags: string[];
};

export const trajectory: Qualification[] = [
  {
    kind: "Experiência",
    title: "Estagiário (TI)",
    org: "CSN",
    period: "2026",
    desc: "Estágio pela CSN, com automações em TypeScript: scripts de Office que automatizam planilhas no Excel, reduzindo trabalho manual e erros de digitação.",
    tags: ["CSN", "Office Scripts", "TypeScript"],
  },
  {
    kind: "Formação",
    title: "Técnico em Informática para Internet",
    org: "FAETEC",
    period: "2024 — 2026",
    desc: "Curso técnico com base em desenvolvimento web: front-end, lógica de programação, redes e fundamentos de sistemas.",
    tags: ["FAETEC", "Técnico"],
  },
];

// ============================================================
// SOCIAIS
// ============================================================

export const socials = [
  { label: "GitHub", href: "https://github.com/MarcosMendes642" },
  { label: "LinkedIn", href: "https://linkedin.com/in/seu-usuario" },
  { label: "Instagram", href: "https://www.instagram.com/m.mendezx__" },
];
