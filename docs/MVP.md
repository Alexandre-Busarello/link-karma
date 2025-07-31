# Documento de Requisitos e Estratégia: LinkKarma

**Versão:** 6.0 (Revisada com Vitrines de Conteúdo Avançadas)
**Data:** 30 de Julho de 2025

### **Sumário das Revisões (Versão 6.0)**

- **Vitrines de Conteúdo Avançadas (Seção 5.3):** O conceito de "Vitrine" foi completamente reformulado. Em vez de um link simples, os usuários agora criam uma mini landing page rica em conteúdo (guias, FAQ, imagens, vídeos), com um fluxo de criação impulsionado por IA para remover o atrito e maximizar a conversão.
- **Diferenciação de Tiers (Seção 4):** Adicionados benefícios de personalização de Vitrine (imagens e vídeo) ao plano Pro, criando um forte incentivo para o upgrade.
- **Core Loop (Seção 1 e 5.2):** Mantido o sistema de **"Prova de Contribuição"** da v5.0, que se mostrou uma solução robusta para o atrito e escalabilidade.
- **Sistema de Verificação (Seção 3 e 5.4):** Mantida a **"Fila de Verificação Comunitária"** como pilar central do MVP para garantir a escalabilidade da confiança.

---

## 1. Visão do Projeto e Objetivo do MVP

- **Visão:** Criar o principal ecossistema de indicações do mundo, baseado em um princípio de contribuição mútua, protegido por um sistema de verificação comunitário e apresentado através das **vitrines de indicação mais ricas e eficazes** do mercado.
- **Nome do Projeto:** LinkKarma
- **Objetivo do MVP:**
  1.  Validar o core loop de **"Prova de Contribuição"** (usar links ou verificar para postar).
  2.  Implementar o sistema de confiança multi-camada (IA + Divulgador + Comunidade).
  3.  Validar o modelo de criação de **Vitrines de Conteúdo com IA** como principal diferencial de engajamento e conversão.
  4.  Confirmar a viabilidade do modelo de monetização Freemium.

### **1.1. Estratégia de Lançamento e Go-to-Market (Solução para o "Ovo e a Galinha")**

Para superar a barreira de entrada inicial e garantir que a plataforma tenha valor desde o primeiro dia, a seguinte estratégia será implementada:

1.  **Fase 1: Pré-Lançamento (Seeding):**
    - A equipe do LinkKarma irá **pré-popular (semear) a plataforma com 50-100 links de indicação de alta qualidade** dos serviços mais populares (Nubank, Uber, Airbnb, PicPay, etc.). Esses "Links da Casa" garantirão que os primeiros usuários tenham uma variedade de opções para cumprir a "Prova de Contribuição".
2.  **Fase 2: Campanha "Membros Fundadores" (Beta Fechado):**
    - Convidaremos um grupo seleto de 100-200 _power users_ de comunidades de indicação existentes (Reddit, Telegram) para serem os "Membros Fundadores".
    - **Benefícios para Fundadores:** Eles receberão um bônus massivo de Karma Points (ex: 1.000 KP), uma medalha de "Membro Fundador" permanente no perfil e o direito de postar seus **3 primeiros links sem a necessidade da "Prova de Contribuição"**. Sua missão será ajudar a testar e popular a plataforma.
3.  **Fase 3: Lançamento Público com "Bônus de Boas-Vindas":**
    - Para todos os novos usuários após o lançamento público, a regra do core loop será suavizada no início.
    - **Primeiro Link Grátis:** Todo novo usuário ganha o direito de publicar **1 Vitrine (link) imediatamente após o cadastro**, sem precisar acumular créditos antes.
    - A necessidade de acumular **Créditos de Contribuição** será ativada apenas quando o usuário quiser publicar sua **segunda** Vitrine.

---

## 2. Conceitos Fundamentais da Economia do MVP

O MVP funcionará com **Karma Points (KP)**, a moeda interna para vantagens competitivas, e **Créditos de Contribuição**, o recurso para desbloquear funcionalidades.

- **Karma Points (KP):** Usados para **impulsionar** e **destacar** Vitrines. Podem ser ganhos em ações, recebidos em assinaturas ou comprados.
- **Créditos de Contribuição:** Usados para **desbloquear novos slots de Vitrine**. São adquiridos exclusivamente através da "Prova de Contribuição".

### **2.1. A Economia da "Prova de Contribuição"**

Para ativar um novo slot de Vitrine (após o primeiro, que é gratuito), o usuário precisa acumular **3 Créditos de Contribuição**.

**Como Acumular Créditos de Contribuição:**

1.  **Usando um Link de Indicação:**
    - **Ação:** Se cadastrar em um serviço através de um link do LinkKarma e ter sua verificação aprovada.
    - **Recompensa:** **1 Crédito de Contribuição** + Bônus de 15 KP.
2.  **Ajudando na Verificação Comunitária:**
    - **Ação:** Analisar uma pendência na "Fila de Verificação Comunitária" e votar (Aprovar/Disputar). Sua avaliação deve corresponder ao resultado final do consenso.
    - **Recompensa:** **0.5 Crédito de Contribuição** + Bônus de 3 KP.

---

## 3. O Sistema de Confiança e Verificação Comunitária

Este é o pilar da plataforma, desenhado para ser escalável desde o início.

### 3.1. O Fluxo de Verificação Híbrido

1.  O _Cadastrante_ clica em "Confirmo que me cadastrei!" e envia uma evidência (opcional, mas incentivado).
2.  A evidência passa pela **Análise de IA Multimodal** (Seção 3.2). Se a confiança for > 90%, é **auto-aprovada**.
3.  Se a confiança da IA for baixa ou não houver evidência, a pendência é enviada para o **Painel do Divulgador** (dono do link).
4.  O _Divulgador_ tem **24 horas** para fazer a análise manual.
5.  **Se o Divulgador não agir em 24 horas**, a pendência entra automaticamente na **Fila de Verificação Comunitária**, ficando disponível para outros usuários confiáveis analisarem.
6.  Uma pendência é resolvida na fila comunitária após receber um número mínimo de votos com consenso (ex: 3 votos idênticos).

### 3.2. A Análise de Evidência por IA Multimodal

1.  **Se uma evidência for enviada**, ela é enviada diretamente para a API de um LLM Multimodal (Google Gemini 1.5 Flash).
2.  Junto com a imagem, é enviado um prompt para que o modelo analise a imagem e o texto contido nela em um único passo.
3.  O LLM retorna um objeto JSON (ex: `{"nivel_confianca": 98, "justificativa": "A imagem mostra a tela de boas-vindas do app Nubank com o texto 'Seja bem-vindo'."}`).
4.  **Regra de Auto-Aprovação:** Se o `nivel_confianca` for **maior que 90%**, a solicitação é **automaticamente aprovada**.
5.  **Se nenhuma evidência for enviada ou a confiança da IA for baixa**, a solicitação segue para a próxima etapa do fluxo (verificação pelo divulgador).

### 3.3. O Sistema de Reputação: "Trust Score" (Atualizado)

O score de 0 a 1000 reflete as novas responsabilidades. O pontos do Trust Score devem expirar a cada 60 dias para manter os usuários ativos.

| **Ação do Usuário**                                                               | **Impacto no Trust Score** |
| --------------------------------------------------------------------------------- | -------------------------- |
| **(Cadastrante)** Verificação auto-aprovada por IA com alta confiança             | **+10 pontos**             |
| **(Cadastrante)** Ter uma aprovação sua disputada e confirmada como fraude        | **-50 pontos**             |
| **(Divulgador)** Revisar uma pendência (confirmando ou disputando) dentro de 24h  | **+5 pontos**              |
| **(Divulgador)** Deixar uma pendência ir para a fila comunitária (inação)         | **-5 pontos**              |
| **(Verificador da Comunidade)** Votar em uma pendência e acertar o consenso final | **+3 pontos**              |
| **(Verificador da Comunidade)** Votar contra o consenso final (erro de análise)   | **-5 pontos**              |

### 3.4. Mitigação de Custos e Abuso de IA

Para garantir a sustentabilidade financeira da operação de IA e prevenir abusos, serão implementadas as seguintes medidas:

- **Limitação de Taxa (Rate Limiting):** Usuários do plano Básico (Grátis) terão um limite de submissões de evidências para análise por IA (ex: 10 por dia). Usuários Pro terão um limite maior ou ilimitado.
- **Controle por Reputação:** Contas com `Trust Score` muito baixo (ex: abaixo de 300) podem ter suas submissões de verificação temporariamente suspensas ou colocadas em uma fila de baixa prioridade, desincentivando tentativas repetidas de fraude.

---

## 4. Tiers de Usuário no MVP

### Usuário Básico (Grátis)

- Pode ter **1 Vitrine ativa** por vez.
- Deve completar a **"Prova de Contribuição"** para ativar slots adicionais.
- Pode participar da Verificação Comunitária (`Trust Score` > 400).
- **Personalização de Vitrine:** Pode adicionar **1 imagem de capa** à sua Vitrine.
- Pode comprar pacotes de KP avulsos.
- Limitado a **2 verificação por dia** via IA.
- Limitado até 6 Prova de Contribuição por dia e 90 Karma Points por dia (6 × 15 KP).

### Usuário Pro (Assinatura Paga)

- Pode ter até **10 Vitrines ativas** simultaneamente.
- Ainda precisa completar a "Prova de Contribuição" para cada slot.
- Recebe um **"salário" mensal de 500 Karma Points**.
- Tem um desconto na compra de pacotes de KP avulsos.
- Tem limite de **30 verificação por dia** via IA.
- Limitado até 30 Prova de Contribuição por dia e 450 Karma Points por dia (30 × 15 KP).
- **Recursos Avançados de Vitrine:**
  - Pode adicionar **1 imagem de capa**.
  - Pode adicionar uma **galeria com até 5 imagens** adicionais.
  - Pode **incorporar (embed) 1 vídeo** do YouTube/Vimeo.
- Possui limites maiores para submissão de verificação por IA.

---

## 5. Requisitos Funcionais do MVP (Features)

### 5.1. Onboarding e Gerenciamento de Usuário

- \[ \] Cadastro simplificado via Email/Senha e Login com Google.
- \[ \] Onboarding que explica o **"Bônus de Boas-Vindas" (1º link grátis)** e o sistema de **"Prova de Contribuição"**.
- \[ \] Página de Perfil do Usuário com suas Vitrines, status, saldo de KP, `Trust Score` e progresso de Créditos de Contribuição.

### 5.2. O Core Loop: "Prova de Contribuição"

- \[ \] Ao ter uma verificação aprovada (seja por IA, divulgador ou comunidade), conceder ao _Cadastrante_:
  - \[ \] **1 Crédito de Contribuição**.
  - \[ \] O bônus de **50 Karma Points**.
- \[ \] Exibir o progresso de Créditos de Contribuição de forma clara no painel do usuário (ex: `1.5 / 3 Créditos para o próximo slot`).

### 5.3. Sistema de "Vitrine de Conteúdo" com IA (REFORMULADO)

Este é um diferencial central. Em vez de um link frio, o usuário cria uma mini "landing page" para sua indicação, com a IA removendo a fricção da criação.

#### 5.3.1. A Jornada de Criação da Vitrine

- \[ \] **Input Mínimo:** O usuário clica em "Criar nova Vitrine". A plataforma pede apenas uma coisa: a **URL de referral**.
- \[ \] **A Mágica da IA (Backend):**
  - \[ \] **Passo A (Análise):** O sistema acessa a URL, extrai o conteúdo textual e metadados sobre o produto.
  - \[ \] **Passo B (Prompt para o LLM):** O sistema envia as informações para o Gemini API com um prompt estruturado:
    _"Você é um especialista em marketing de afiliados. Com base no conteúdo extraído, gere o conteúdo para uma 'Vitrine de Referral' em português do Brasil. O tom deve ser convidativo e claro. Crie as seguintes seções em JSON: `titulo_cativante` (máx 60 caracteres), `o_que_e` (parágrafo curto), `tres_vantagens` (array de 3 strings), `guia_rapido` (array de passos), `faq` (array de objetos com pergunta e resposta)."_
- \[ \] **Interface de Edição (Frontend):**
  - \[ \] A plataforma exibe um editor de Vitrine **já pré-preenchido pela IA**.
  - \[ \] O usuário pode facilmente revisar, editar e personalizar cada campo de texto.
  - \[ \] O usuário pode fazer upload de imagens e adicionar o link do vídeo, conforme seu plano.

#### 5.3.2. Estrutura e Componentes da Vitrine

- \[ \] Um card clicável na listagem que abre a página detalhada da Vitrine.
- \[ \] **Página da Vitrine contendo:**
  - \[ \] Título Cativante.
  - \[ \] Imagem de Capa (upload, obrigatório).
  - \[ \] Descrição "O que é o produto/serviço".
  - \[ \] Seção "Vantagens Incríveis" (bullet points).
  - \[ \] Seção "Seu Guia Rápido para o Bônus" (passo a passo).
  - \[ \] Galeria de Imagens (Plano Pro).
  - \[ \] Player de Vídeo Incorporado (Plano Pro).
  - \[ \] Seção de Perguntas Frequentes (FAQ).
  - \[ \] Botão de Call-to-Action claro com o link de indicação.

### 5.4. Painel do Divulgador

- \[ \] Uma seção no painel do usuário chamada "Minhas Verificações".
- \[ \] Aba **"Pendentes"**:
  - \[ \] Lista de solicitações aguardando sua análise manual.
  - \[ \] Visualização da evidência e do Nível de Confiança da IA.
  - \[ \] **Cronômetro regressivo de 24 horas**.
  - \[ \] Texto informativo: "Após 24h, esta solicitação será aberta para verificação da comunidade."
  - \[ \] Botões claros de **\[ ✓ Confirmar \]** e **\[ X Disputar \]**.
  - \[ \] **Bônus por Agilidade:** Conceder 5 KP extras ao _Divulgador_ que revisar em menos de 12 horas.
- \[ \] Aba **"Histórico"**:
  - \[ \] Log de todas as verificações passadas relacionadas aos seus links.

### 5.5. Fila de Verificação Comunitária

- \[ \] Uma nova seção no painel do usuário chamada **"Verificar para a Comunidade"**, visível apenas para usuários com `Trust Score` > 400.
- \[ \] A página exibe uma pendência de cada vez (sem cherry-picking), mostrando a evidência (se houver) e o `nivel_confianca` da IA (se aplicável).
- \[ \] Botões claros de **\[ ✓ Aprovar Verificação \]** e **\[ X Disputar Verificação \]**.
- \[ \] Após o voto, o sistema concede a recompensa (Crédito e KP) se o voto estiver correto e apresenta a próxima pendência da fila.

### 5.6. Economia de Karma Points (KP)

- \[ \] Saldo de KP sempre visível no cabeçalho.
- \[ \] Botões para **"Impulsionar" (Bump)** por **25 KP** e **"Destacar" (Feature)** por **100 KP** nas Vitrines do usuário.

### 5.7. Monetização e Loja (Planos e Pontos)

- \[ \] Página de "Loja" com opção de assinar o **Plano Pro**.
- \[ \] Seção para compra de **Pacotes de Karma Points** avulsos.

### 5.8. Descoberta e Navegação

- \[ \] Página inicial com Vitrines em destaque e as mais recentes.
- \[ \] Navegação por categorias (ex: Bancos, Transporte, Comida).
- \[ \] Funcionalidade de busca simples por nome do serviço.

### 5.9. Sistema de Notificações

- \[ \] Notificações no app e por e-mail sobre:
  - \[ \] Novas pendências de verificação para divulgadores.
  - \[ \] Status de verificação (aprovado/negado) para cadastrantes.
  - \[ \] Mudanças no `Trust Score` e saldo de KP/Créditos.
  - \[ \] Notificações de urgência para divulgadores quando uma pendência estiver perto de expirar.

---

## 6. Integrações Chave e Tecnologias Recomendadas

- **Gateway de Pagamento:** **Stripe**.
- **Tech:**

---

## 7. Caminho Pós-MVP: A Transição para Web3

- **Roteiro de Escalabilidade da Confiança:** A **Verificação Comunitária** é a base da escalabilidade. O próximo passo (pós-MVP) é introduzir os **"Moderadores da Comunidade"** (usuários com `Trust Score` > 900) como um **tribunal de apelação** para resolver as raras verificações que não alcançam consenso na fila comunitária, solidificando a governança descentralizada.

### A Estratégia "Web2.5": Construindo a Ponte Invisível para a Web3

A experiência do usuário permanecerá idêntica à de um aplicativo Web2, com a complexidade da blockchain totalmente oculta. A plataforma gerenciará carteiras custodiais nos bastidores para cada usuário. No futuro, será oferecida uma opção de "graduação" para que usuários avançados possam exportar seus tokens `$KARMA` para carteiras externas como a Metamask. Esta abordagem garante a máxima simplicidade para a adoção em massa e o máximo poder para os entusiastas da Web3.
