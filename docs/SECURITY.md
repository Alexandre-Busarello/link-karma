# Documentação de Segurança - LinkKarma MVP

**Versão:** 1.0  
**Data:** 31 de Julho de 2025  
**Baseado em:** MVP.md v6.0, DETAILS.md, STACK.md

## 1. Visão Geral de Segurança

O LinkKarma é uma plataforma de indicações que lida com dados sensíveis dos usuários, transações financeiras e um sistema de reputação crítico. Esta documentação estabelece as diretrizes de segurança específicas para o MVP, considerando a stack tecnológica escolhida e os riscos inerentes ao modelo de negócio.

### 1.1. Princípios de Segurança Fundamentais

- **Defesa em Profundidade:** Múltiplas camadas de segurança em todos os componentes
- **Princípio do Menor Privilégio:** Usuários e sistemas têm apenas as permissões mínimas necessárias
- **Segurança por Design:** Controles de segurança integrados desde o desenvolvimento
- **Transparência Controlada:** Logs de auditoria para ações críticas sem expor dados sensíveis

## 2. Segurança da Arquitetura e Stack

### 2.1. Monorepo NX - Segurança de Código

**Riscos Identificados:**
- Vazamento de secrets entre aplicações
- Dependências vulneráveis compartilhadas
- Exposição acidental de código interno

**Controles Recomendados:**
```typescript
// libs/shared-types/src/security.ts
export interface SecureUser {
  id: string;
  email: string;
  // NUNCA expor: password_hash, api_keys, payment_info
}

// Separar tipos públicos dos internos
export interface InternalUser extends SecureUser {
  trust_score: number;
  karma_points: number;
  created_at: Date;
}
```

- **Configuração de Secrets:** Use `.env.local` para desenvolvimento e variáveis de ambiente seguras em produção
- **Auditoria de Dependências:** Configure `npm audit` no pipeline CI/CD
- **Linting de Segurança:** Integre ESLint com regras de segurança (`@typescript-eslint/no-unsafe-*`)

### 2.2. Next.js 14+ - Segurança Frontend/Backend

**API Routes Security:**
```typescript
// app/api/verify/route.ts
import { rateLimit } from '@/lib/rate-limit';
import { validateAuth } from '@/lib/auth';

export async function POST(request: Request) {
  // 1. Rate limiting por usuário
  const rateLimitResult = await rateLimit(request);
  if (!rateLimitResult.success) {
    return new Response('Rate limit exceeded', { status: 429 });
  }

  // 2. Validação de autenticação
  const user = await validateAuth(request);
  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  // 3. Validação de input
  const body = await request.json();
  const validatedData = verificationSchema.parse(body);
  
  // ... resto da lógica
}
```

**Configurações de Segurança Obrigatórias:**
```javascript
// next.config.js
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@supabase/supabase-js']
  },
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY'
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin'
        },
        {
          key: 'Content-Security-Policy',
          value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
        }
      ]
    }
  ]
};
```

### 2.3. Supabase - Segurança de Dados

**Row Level Security (RLS) - Configuração Crítica:**
```sql
-- Tabela de usuários
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Tabela de vitrines
ALTER TABLE showcases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public showcases are viewable by everyone" ON showcases
  FOR SELECT USING (status = 'published');

CREATE POLICY "Users can manage own showcases" ON showcases
  FOR ALL USING (auth.uid() = user_id);

-- Tabela de verificações (CRÍTICA)
ALTER TABLE verifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own verifications" ON verifications
  FOR SELECT USING (
    auth.uid() = user_id OR 
    auth.uid() = divulgador_id OR
    (status = 'pending_community' AND get_user_trust_score(auth.uid()) > 400)
  );
```

**Configuração de Storage Seguro:**
```sql
-- Bucket para evidências de verificação
INSERT INTO storage.buckets (id, name, public) VALUES ('verification-evidence', 'verification-evidence', false);

CREATE POLICY "Users can upload own evidence" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'verification-evidence' AND 
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Authorized users can view evidence" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'verification-evidence' AND (
      auth.uid()::text = (storage.foldername(name))[1] OR
      EXISTS (
        SELECT 1 FROM verifications v 
        WHERE v.evidence_url = storage.objects.name 
        AND (v.divulgador_id = auth.uid() OR v.user_id = auth.uid())
      )
    )
  );
```

### 2.4. Vercel Functions - Segurança Serverless

**Configuração de Variáveis de Ambiente:**
```bash
# Produção (Vercel Dashboard)
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=eyJ... # Chave pública
SUPABASE_SERVICE_ROLE_KEY=eyJ... # CRÍTICO: Apenas para operações admin
GEMINI_API_KEY=AIza... # CRÍTICO: Para análise de IA
STRIPE_SECRET_KEY=sk_live_... # CRÍTICO: Para pagamentos
WEBHOOK_SECRET=whsec_... # Para validar webhooks do Stripe
```

**Rate Limiting Implementation:**
```typescript
// lib/rate-limit.ts
import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export async function rateLimit(
  identifier: string,
  limit: number = 10,
  window: number = 60
) {
  const key = `rate_limit:${identifier}`;
  const current = await redis.incr(key);
  
  if (current === 1) {
    await redis.expire(key, window);
  }
  
  return {
    success: current <= limit,
    remaining: Math.max(0, limit - current)
  };
}
```

## 3. Segurança Específica do Modelo de Negócio

### 3.1. Sistema de Verificação - Prevenção de Fraudes

**Riscos Críticos:**
- Falsificação de evidências de cadastro
- Manipulação do sistema de Trust Score
- Ataques de Sybil (múltiplas contas falsas)
- Abuso da análise de IA

**Controles de Segurança:**

```typescript
// Validação de evidência antes do envio para IA
export async function validateEvidence(file: File): Promise<ValidationResult> {
  // 1. Validação de tipo de arquivo
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Tipo de arquivo não permitido');
  }

  // 2. Validação de tamanho (máx 5MB)
  if (file.size > 5 * 1024 * 1024) {
    throw new Error('Arquivo muito grande');
  }

  // 3. Validação de metadados suspeitos
  const metadata = await extractMetadata(file);
  if (metadata.hasManipulationSigns) {
    return { valid: false, reason: 'Possível manipulação detectada' };
  }

  return { valid: true };
}

// Rate limiting específico para IA
export async function aiAnalysisRateLimit(userId: string, userTier: 'basic' | 'pro') {
  const limits = {
    basic: { requests: 10, window: 86400 }, // 10 por dia
    pro: { requests: 100, window: 86400 }   // 100 por dia
  };
  
  const limit = limits[userTier];
  return rateLimit(`ai_analysis:${userId}`, limit.requests, limit.window);
}
```

### 3.2. Economia de Karma Points - Prevenção de Manipulação

**Controles de Integridade:**
```typescript
// Transações atômicas para KP
export async function transferKarmaPoints(
  fromUserId: string,
  toUserId: string,
  amount: number,
  reason: string
) {
  const { data, error } = await supabase.rpc('transfer_karma_points', {
    from_user: fromUserId,
    to_user: toUserId,
    amount: amount,
    transaction_reason: reason
  });

  if (error) throw error;
  
  // Log de auditoria
  await auditLog({
    action: 'karma_transfer',
    user_id: fromUserId,
    details: { to_user: toUserId, amount, reason },
    timestamp: new Date()
  });
}
```

**Função SQL para Transações Seguras:**
```sql
CREATE OR REPLACE FUNCTION transfer_karma_points(
  from_user UUID,
  to_user UUID,
  amount INTEGER,
  transaction_reason TEXT
) RETURNS BOOLEAN AS $$
BEGIN
  -- Verificar saldo suficiente
  IF (SELECT karma_points FROM profiles WHERE id = from_user) < amount THEN
    RAISE EXCEPTION 'Saldo insuficiente de Karma Points';
  END IF;

  -- Transação atômica
  UPDATE profiles SET karma_points = karma_points - amount WHERE id = from_user;
  UPDATE profiles SET karma_points = karma_points + amount WHERE id = to_user;
  
  -- Registrar transação
  INSERT INTO karma_transactions (from_user_id, to_user_id, amount, reason, created_at)
  VALUES (from_user, to_user, amount, transaction_reason, NOW());
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;
```

## 4. Segurança de Integrações Externas

### 4.1. Google Gemini API - Proteção de Dados

**Configuração Segura:**
```typescript
// lib/gemini-client.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function analyzeEvidence(imageUrl: string, serviceContext: string) {
  try {
    // 1. Validar URL da imagem (deve ser do Supabase Storage)
    if (!imageUrl.includes(process.env.SUPABASE_URL!)) {
      throw new Error('URL de imagem inválida');
    }

    // 2. Rate limiting
    await aiAnalysisRateLimit(userId, userTier);

    // 3. Prompt seguro (sem dados sensíveis)
    const prompt = `Analise esta evidência de cadastro para o serviço ${serviceContext}. 
    Retorne apenas: {"nivel_confianca": number, "justificativa": "string"}`;

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent([prompt, { inlineData: { data: imageData, mimeType: 'image/jpeg' } }]);
    
    return JSON.parse(result.response.text());
  } catch (error) {
    // Log do erro sem expor dados sensíveis
    console.error('Gemini analysis failed:', { error: error.message, timestamp: new Date() });
    throw new Error('Análise de IA temporariamente indisponível');
  }
}
```

### 4.2. Stripe - Segurança de Pagamentos

**Webhook Security:**
```typescript
// app/api/webhooks/stripe/route.ts
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get('stripe-signature');

  if (!signature) {
    return new Response('Missing signature', { status: 400 });
  }

  try {
    // Verificar assinatura do webhook
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    // Processar apenas eventos esperados
    const allowedEvents = [
      'customer.subscription.created',
      'customer.subscription.updated',
      'customer.subscription.deleted',
      'payment_intent.succeeded'
    ];

    if (!allowedEvents.includes(event.type)) {
      return new Response('Event not handled', { status: 200 });
    }

    // Processar evento de forma idempotente
    await processStripeEvent(event);
    
    return new Response('OK', { status: 200 });
  } catch (error) {
    console.error('Stripe webhook error:', error);
    return new Response('Webhook error', { status: 400 });
  }
}
```

## 5. Monitoramento e Auditoria

### 5.1. Logs de Segurança

**Eventos Críticos para Monitorar:**
- Tentativas de login falhadas
- Mudanças no Trust Score
- Transações de Karma Points
- Uploads de evidência
- Decisões de verificação comunitária
- Tentativas de acesso não autorizado

```typescript
// lib/audit-logger.ts
export interface AuditEvent {
  action: string;
  user_id?: string;
  ip_address?: string;
  user_agent?: string;
  details: Record<string, any>;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
}

export async function auditLog(event: AuditEvent) {
  // Armazenar no Supabase com retenção de 1 ano
  await supabase.from('audit_logs').insert({
    ...event,
    details: JSON.stringify(event.details)
  });

  // Para eventos críticos, também enviar para serviço externo
  if (event.severity === 'critical') {
    await sendToExternalMonitoring(event);
  }
}
```

### 5.2. Alertas de Segurança

**Configurar alertas para:**
- Múltiplas tentativas de verificação falhadas do mesmo usuário
- Padrões suspeitos de criação de contas
- Uso anômalo da API do Gemini
- Transações de KP em volumes suspeitos
- Falhas de autenticação em massa

## 6. Plano de Resposta a Incidentes

### 6.1. Classificação de Incidentes

**Nível 1 - Crítico:**
- Vazamento de dados de usuários
- Comprometimento de chaves de API
- Manipulação em massa do Trust Score

**Nível 2 - Alto:**
- Tentativas de fraude sistemática
- Abuso da análise de IA
- Falhas de autenticação

**Nível 3 - Médio:**
- Tentativas de spam
- Uploads de conteúdo inadequado

### 6.2. Procedimentos de Resposta

1. **Detecção:** Monitoramento automatizado + relatórios de usuários
2. **Contenção:** Suspensão automática de contas suspeitas
3. **Investigação:** Análise de logs e padrões
4. **Recuperação:** Restauração de dados e correção de vulnerabilidades
5. **Lições Aprendidas:** Documentação e melhoria dos controles

## 7. Checklist de Segurança para Deploy

### 7.1. Pré-Deploy
- [ ] Todas as variáveis de ambiente configuradas
- [ ] RLS habilitado em todas as tabelas sensíveis
- [ ] Rate limiting implementado em todas as APIs
- [ ] Headers de segurança configurados
- [ ] Validação de input em todos os endpoints
- [ ] Logs de auditoria funcionando

### 7.2. Pós-Deploy
- [ ] Monitoramento de logs ativo
- [ ] Alertas de segurança configurados
- [ ] Backup automático do banco configurado
- [ ] Teste de penetração básico realizado
- [ ] Documentação de segurança atualizada

---

**Nota:** Esta documentação deve ser revisada e atualizada a cada nova funcionalidade implementada. A segurança é um processo contínuo, não um estado final.
