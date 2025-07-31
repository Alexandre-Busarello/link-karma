# Análise Técnica e Estratégia de Implementação para o MVP LinkKarma

## Sumário Executivo da Stack Proposta

| Componente          | Tecnologia Recomendada                    | Justificativa Principal                                                                                      |
| :------------------ | :---------------------------------------- | :----------------------------------------------------------------------------------------------------------- |
| **Monorepo** | **NX com TypeScript** | (Pré-requisito) Código compartilhado, consistência e otimização de build/test.                               |
| **Frontend** | **Next.js 14+ com Tailwind CSS** | (Pré-requisito) Perfeito para SSR/SSG (SEO), com flexibilidade total de renderização.                        |
| **Backend** | **Vercel Functions (integradas ao Next.js)** | Arquitetura Serverless nativa, custo zero para iniciar e deploy simplificado.                                |
| **Banco de Dados** | **Supabase (Postgres)** | (Pré-requisito) Postgres gerenciado com Auth, Storage e Realtime, eliminando a necessidade de outros serviços. |
| **Jobs Assíncronos** | **Upstash QStash ou Vercel Cron Jobs** | Essencial para tarefas de IA de longa duração, evitando timeouts e garantindo a execução em segundo plano.    |
| **Pagamentos** | **Stripe** | API robusta, documentação excelente e fácil integração com Next.js.                                          |
| **IA & LLMs** | **Google Gemini API** | (Definido no plano) Capacidade multimodal e custo-benefício para verificação e geração de conteúdo.        |

---

## 1. Monorepo com NX: A Escolha Certa Desde o Início

Você está corretíssimo em começar com NX. Para um projeto com a complexidade do LinkKarma, ele é fundamental. A organização em um monorepo desde o dia zero trará imensos benefícios de produtividade e manutenção.

#### Estrutura de Pastas Sugerida

    /linkkarma-mono
    |-- /apps
    |   |-- /web             # Aplicação Next.js (Frontend e API)
    |
    |-- /libs
    |   |-- /shared-types    # Interfaces e tipos TypeScript (para User, Vitrine, Verification, etc.)
    |   |-- /ui-components   # Componentes React compartilhados (Botões, Cards, Modais)
    |   |-- /db              # Configuração e cliente do Prisma ou Supabase Client
    |   |-- /auth            # Lógica de autenticação compartilhada
    |
    |-- nx.json
    |-- package.json
    |-- ...

#### Vantagens Imediatas:

-   **Type Safety de Ponta a Ponta:** A `web` (frontend) e a `api` (backend) podem importar os mesmos tipos de `/libs/shared-types`. Se você mudar o modelo de `Vitrine` no banco, o TypeScript irá acusar o erro no seu frontend imediatamente.
-   **Reaproveitamento de Lógica:** Funções de validação, formatação, etc., podem ser colocadas em libs e usadas em qualquer lugar.
-   **Builds Inteligentes:** O NX sabe o que foi alterado e só executa testes e builds para os projetos afetados, economizando tempo e custo de CI/CD.

## 2. Backend Serverless: Vercel em vez de Render

Embora Render seja uma plataforma excelente, para um projeto baseado em Next.js, a **Vercel é a escolha natural e mais otimizada**. O Next.js e a Vercel são desenvolvidos pela mesma empresa, e a integração é perfeita.

-   **Como funciona?** Suas rotas de API dentro do Next.js (`/app/api/...`) se transformam automaticamente em **Vercel Functions** (equivalente a AWS Lambda) no deploy. Zero configuração de infraestrutura.
-   **Custo:** O tier gratuito da Vercel é extremamente generoso e mais do que suficiente para o MVP. Você não pagará nada até ter um volume considerável de usuários.
-   **Developer Experience:** O fluxo `git push -> deploy` é mágico. A Vercel cuida de tudo: build, deploy, CDN global e SSL.

#### Para os Jobs de IA (Geração de Vitrine e Verificação):

A geração de conteúdo da Vitrine (acessar URL, chamar Gemini) pode levar mais de 10 segundos, o limite padrão das Vercel Functions no plano gratuito.

-   **Solução 1 (Simples):** Use **Vercel Cron Jobs** para tarefas agendadas (como processar a fila de verificação comunitária). Para a geração de conteúdo, o plano Pro da Vercel aumenta o timeout das funções, o que pode ser suficiente para o início.
-   **Solução 2 (Mais Robusta):** Integre o **Upstash QStash**. É uma fila de tarefas e agendador serverless, desenhada para este cenário:
    1.  O usuário envia a URL para a sua API.
    2.  Sua API na Vercel envia uma mensagem para a fila do QStash e retorna `202 Accepted` para o frontend imediatamente. A UI não fica travada.
    3.  O QStash chama um outro endpoint da sua API (um "webhook") para processar a tarefa em segundo plano, sem o risco de timeout.
    4.  Quando o processo termina, sua API atualiza o banco de dados e notifica o usuário (usando o Realtime do Supabase!).

## 3. Banco de Dados: Supabase é a Resposta Certa

Sua intuição sobre o Supabase está perfeita. É a melhor escolha para este MVP, pois simplifica enormemente a arquitetura.

-   **É Postgres:** Você tem todo o poder do SQL, `JOINs`, transações e a capacidade de usar tipos avançados como `JSONB` para armazenar o conteúdo estruturado das Vitrines gerado pela IA.
-   **É Mais que um Banco:** O Supabase substitui vários serviços, reduzindo custos e complexidade:
    -   **Supabase Auth:** Gerencia usuários, login com Google, etc.
    -   **Supabase Storage:** Armazena as imagens de capa das vitrines e as evidências de verificação de forma segura.
    -   **Supabase Realtime:** **Este é um diferencial matador para o LinkKarma.** Você pode "ouvir" mudanças na tabela de verificações. Quando uma verificação muda de status, o painel do divulgador pode ser atualizado em tempo real sem a necessidade de o usuário recarregar a página. O cronômetro de 24h pode ser facilmente implementado no frontend com base no timestamp de criação vindo do banco.

#### Custo para Escalar no Supabase

-   **Free Tier (Plano Gratuito):** Inclui 500MB de banco, 1GB de storage, 50.000 chamadas de API/mês e 500.000 usuários de Auth. Mais que suficiente para validar o MVP.
-   **Pro Tier (Plano Pago):** Começa em **$25/mês**. Remove os limites do Free Tier e você paga pelo uso. Inclui 8GB de banco, 100GB de storage, e os custos adicionais são por uso (ex: ~$0.10 por GB extra de banco).
-   **Conclusão:** A escalabilidade de preço é muito previsível e suave. Você só começa a pagar quando seu projeto estiver de fato crescendo.

## 4. Frontend: Next.js é a Escolha Definitiva

Mantenha a preferência pelo **Next.js com o App Router**. É a solução mais integrada e madura para o que você precisa.

-   **Renderização Híbrida:**
    -   **Páginas das Vitrines:** Podem ser geradas no servidor (SSR) ou estaticamente (SSG) para um carregamento ultra-rápido e excelente SEO. Essencial para que os links sejam compartilháveis e indexáveis.
    -   **Painel do Usuário:** Pode ser renderizado no cliente (`'use client'`), oferecendo a interatividade de uma SPA tradicional, com dados sendo buscados via API.
-   **Ecossistema:** A combinação com **TypeScript** e **Tailwind CSS** é perfeita para produtividade e manutenibilidade em um projeto dessa escala.

## 5. Revisão da Arquitetura do Fluxo de Verificação

A stack proposta se encaixa perfeitamente no seu fluxo de verificação híbrido:

1.  **Envio da Evidência:** O frontend (`web`) faz o upload da imagem para o **Supabase Storage**.
2.  **Chamada à API:** O frontend chama um endpoint na sua API (`/api/verify`) na **Vercel Function**, passando o link para a imagem armazenada.
3.  **Análise de IA:**
    -   A Vercel Function chama a **API do Gemini** com a imagem.
    -   Se a confiança for > 90%, a função atualiza o status no banco **Supabase** para `ia_approved`. O **Supabase Realtime** notifica o frontend do cadastrante. Fim do fluxo.
    -   Se a confiança for baixa, a função atualiza o status para `pending_divulgador` e define um `expires_at` (agora + 24h).
4.  **Notificação e Painel:** O **Supabase Realtime** atualiza a UI do divulgador, mostrando a nova pendência e o cronômetro.
5.  **Timeout (Expiração):** Um **Vercel Cron Job** roda a cada hora, buscando no **Supabase** por verificações com `status = pending_divulgador` cujo `expires_at` já passou. Para cada uma, ele atualiza o status para `pending_community`.
6.  **Verificação Comunitária:** O **Supabase Realtime** novamente garante que a tarefa apareça na fila da comunidade para os usuários elegíveis.

## 6. Plano de Ação Sugerido

1.  **Setup Inicial:**
    -   Crie o monorepo com `npx create-nx-workspace@latest`.
    -   Adicione os plugins do Next.js e React.
    -   Configure a estrutura de pastas (`apps`, `libs`) como sugerido.
2.  **Integração com Supabase:**
    -   Crie um projeto no Supabase.
    -   Use o editor de tabelas ou as migrações SQL para criar as tabelas iniciais (`users`, `profiles`, `showcases`, `verifications`).
    -   Coloque suas chaves de API do Supabase nas variáveis de ambiente do seu projeto (`.env`).
    -   Crie uma lib `@linkkarma/db` para encapsular o cliente do Supabase (ou Prisma).
3.  **Desenvolvimento do Core Loop:**
    -   Implemente o cadastro de usuário com **Supabase Auth**.
    -   Construa a UI de criação da Vitrine.
    -   Desenvolva a API de geração de conteúdo com a chamada ao Gemini. Use o QStash se o tempo de execução for um problema.
    -   Implemente o fluxo completo de verificação, usando o banco para gerenciar o estado e o Realtime para atualizar a UI.
4.  **Monetização:**
    -   Integre o **Stripe Checkout** para a assinatura do Plano Pro e compra de Karma Points. A Vercel possui guias e exemplos excelentes para isso.

> Esta stack é moderna, altamente escalável e, o mais importante, permite que você se mova com extrema velocidade e baixo custo inicial. Você estará usando ferramentas que se integram de forma quase nativa, reduzindo a complexidade e permitindo que você foque no que realmente importa: construir e validar o produto LinkKarma.
