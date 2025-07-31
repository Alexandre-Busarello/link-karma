# Stack Técnica Detalhada para o MVP LinkKarma

Esta é a stack recomendada com o racional técnico para cada escolha, visando máxima produtividade, baixo custo inicial e alta escalabilidade para o projeto.

## 💻 Ambiente e Ferramentas

- **Monorepo: NX**
  - **Justificativa:** (Pré-requisito) Fundamental para um projeto com múltiplos componentes (app, libs). Permite o compartilhamento de tipos, componentes e lógica de forma segura e eficiente, além de otimizar os processos de build e teste (CI/CD).

- **Linguagem Principal: TypeScript**
  - **Justificativa:** Essencial para a robustez e manutenibilidade do projeto. Garante a segurança de tipos entre o frontend, backend e banco de dados, prevenindo uma classe inteira de bugs em tempo de desenvolvimento.

## 🎨 Frontend

- **Framework: Next.js 14+ (com App Router)**
  - **Justificativa:** (Pré-requisito) A melhor escolha para o LinkKarma. Permite renderizar as "Vitrines" no servidor (SSR/SSG) para excelente SEO e performance, enquanto o painel do usuário pode ser uma aplicação cliente (SPA), oferecendo o melhor dos dois mundos de forma integrada.

- **Estilização: Tailwind CSS**
  - **Justificativa:** Proporciona uma agilidade de desenvolvimento incomparável. Evita a necessidade de escrever CSS customizado, mantendo a consistência visual e facilitando a criação de um Design System coeso.

## ⚙️ Backend (Serverless)

- **Plataforma e API: Vercel Functions**
  - **Justificativa:** Por ser um projeto Next.js, o deploy na Vercel transforma as API Routes em funções serverless automaticamente. É a arquitetura com o menor atrito possível, com deploy instantâneo, escalabilidade automática e um generoso tier gratuito.

- **Jobs Assíncronos / Filas: Upstash QStash**
  - **Justificativa:** As operações de IA (scraping e análise de imagem) são lentas. Uma fila de tarefas é crucial para não travar a experiência do usuário. O QStash é serverless, de fácil integração e previne timeouts nas Vercel Functions, garantindo que processos longos sejam executados de forma confiável em segundo plano.

## 🗃️ Banco de Dados e Serviços Integrados (PaaS)

- **Plataforma Principal: Supabase**
  - **Justificativa:** (Pré-requisito atendido) É a escolha mais estratégica para o MVP. Mais do que um banco, é um "Backend as a Service" que resolve múltiplos problemas com uma única ferramenta, reduzindo a complexidade da stack.

- **Banco de Dados: PostgreSQL (via Supabase)**
  - **Justificativa:** Oferece o poder e a confiabilidade do SQL, permitindo consultas complexas e transações ACID, que são importantes para a economia interna (Karma Points, Créditos) e o sistema de reputação (Trust Score).

- **Autenticação: Supabase Auth**
  - **Justificativa:** Elimina a complexidade de implementar autenticação do zero. Oferece login com e-mail/senha e provedores sociais (Google) de forma segura e já integrada à tabela de usuários do seu banco de dados.

- **Armazenamento de Arquivos: Supabase Storage**
  - **Justificativa:** Solução perfeita e integrada para o upload das imagens de evidência e das Vitrines. As políticas de segurança baseadas em RLS (Row Level Security) do Postgres permitem controlar facilmente quem pode ver ou enviar arquivos.

- **Funcionalidades Real-time: Supabase Realtime**
  - **Justificativa:** Um diferencial para a UX do LinkKarma. Permite que a UI seja atualizada em tempo real (ex: quando uma verificação é aprovada ou uma nova pendência aparece no painel do divulgador) sem a necessidade do usuário recarregar a página.

## 🔗 Integrações e APIs de Terceiros

- **Inteligência Artificial (LLM): Google Gemini API**
  - **Justificativa:** (Definido no plano) Escolha excelente pela sua capacidade multimodal (analisar texto e imagem em uma única chamada), performance e estrutura de custos competitiva, ideal para os fluxos de criação e verificação da Vitrine.

- **Gateway de Pagamento: Stripe**
  - **Justificativa:** Padrão ouro para pagamentos. Possui APIs robustas, documentação de primeira linha e componentes pré-construídos (Stripe Checkout) que simplificam a implementação de assinaturas (Plano Pro) e compras avulsas (pacotes de KP).

- **Envio de E-mails Transacionais: Resend**
  - **Justificativa:** Plataforma moderna, focada em desenvolvedores, com uma API simples e uma ótima integração com React, permitindo criar e enviar e-mails de notificação usando a mesma sintaxe de componentes do seu app.
