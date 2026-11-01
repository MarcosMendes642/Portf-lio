# Portfólio

Portfólio pessoal — **Marcos Mendes**.

Site único (one-page) inspirado na estética editorial-técnica, com temas
claro/escuro, HUD monoespaçado e microinterações.

## Stack

- **Vite** + **React** + **TypeScript**
- **GSAP** — SplitText, ScrollTrigger, FLIP do modal de habilidades
- **Lenis** — scroll suave integrado ao ticker do GSAP
- **react-icons** — logos das tecnologias (Simple Icons / Phosphor)

## Rodando

```bash
npm install
npm run dev      # desenvolvimento (http://localhost:5173)
npm run build    # build de produção (dist/)
npm run preview  # pré-visualizar o build
```

## Estrutura

```
src/
├── data.ts               # conteúdo editável (perfil, projetos, skills...)
├── lib/useLenis.ts       # scroll suave + helpers de navegação
├── styles/main.css       # design system (temas, HUD, grid, modal)
└── components/
    ├── Header.tsx        # HUD + nav + tema
    ├── Hero.tsx          # intro com SplitText
    ├── Work.tsx          # linhas de projetos
    ├── Skills.tsx        # grade de cards + modal
    ├── SkillModal.tsx    # lightbox FLIP por skill
    ├── Trajectory.tsx    # formação & experiência
    ├── About.tsx         # bio
    └── Footer.tsx        # contato & social
```

---

Deploy: Vercel · Projetos: [Divide Aqui](https://divide-aqui.vercel.app)
