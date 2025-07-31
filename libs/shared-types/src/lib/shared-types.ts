// User and Profile Types
export interface User {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
  display_name: string | null;
  avatar_url: string | null;
  trust_score: number;
  karma_points: number;
  tier: UserTier;
  contribution_credits: number;
  created_at: string;
  updated_at: string;
}

export type UserTier = 'basic' | 'pro';

// Security Verification Types
export interface SecurityCheckResult {
  status: 'APROVADO' | 'SUSPEITO' | 'BLOQUEADO';
  confidence: number;
  sources_checked: string[];
  findings: string[];
  recommendation: string;
  details?: {
    positive_mentions: number;
    negative_mentions: number;
    scam_indicators: string[];
    trustworthiness_score: number;
  };
}

// Showcase (Vitrine) Types
export interface Showcase {
  id: string;
  user_id: string;
  title: string;
  description: string;
  referral_url: string;
  service_name: string;
  category: ShowcaseCategory;
  status: ShowcaseStatus;
  cover_image_url: string | null;
  gallery_images: string[];
  video_url: string | null;
  content: ShowcaseContent;
  karma_boost: number;
  featured_until: string | null;
  created_at: string;
  updated_at: string;
  security_check?: SecurityCheckResult;
}

export interface ShowcaseContent {
  what_is: string;
  advantages: string[];
  quick_guide: string[];
  faq: FAQ[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export type ShowcaseCategory =
  | 'banking'
  | 'transport'
  | 'food'
  | 'shopping'
  | 'entertainment'
  | 'finance'
  | 'health'
  | 'education'
  | 'technology'
  | 'other';

export type ShowcaseStatus = 'draft' | 'published' | 'suspended';

// Verification Types
export interface Verification {
  id: string;
  showcase_id: string;
  user_id: string; // cadastrante
  divulgador_id: string; // dono do showcase
  evidence_url: string | null;
  ai_confidence_level: number | null;
  ai_justification: string | null;
  status: VerificationStatus;
  divulgador_decision: VerificationDecision | null;
  community_votes: CommunityVote[];
  expires_at: string | null;
  created_at: string;
  updated_at: string;
}

export type VerificationStatus =
  | 'pending_ai'
  | 'ai_approved'
  | 'pending_divulgador'
  | 'divulgador_approved'
  | 'divulgador_disputed'
  | 'pending_community'
  | 'community_approved'
  | 'community_disputed'
  | 'final_approved'
  | 'final_rejected';

export type VerificationDecision = 'approve' | 'dispute';

export interface CommunityVote {
  id: string;
  verification_id: string;
  voter_id: string;
  decision: VerificationDecision;
  created_at: string;
}

// Karma and Transaction Types
export interface KarmaTransaction {
  id: string;
  from_user_id: string | null;
  to_user_id: string;
  amount: number;
  transaction_type: KarmaTransactionType;
  reason: string;
  reference_id: string | null; // showcase_id, verification_id, etc.
  created_at: string;
}

export type KarmaTransactionType =
  | 'earned_verification'
  | 'earned_community_vote'
  | 'spent_boost'
  | 'spent_feature'
  | 'purchased'
  | 'subscription_bonus'
  | 'founder_bonus';

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form Types
export interface CreateShowcaseRequest {
  referral_url: string;
  category: ShowcaseCategory;
}

export interface UpdateShowcaseRequest {
  title?: string;
  description?: string;
  service_name?: string;
  category?: ShowcaseCategory;
  status?: ShowcaseStatus;
  cover_image_url?: string | null;
  gallery_images?: string[];
  video_url?: string | null;
  content?: Partial<ShowcaseContent>;
  security_check?: SecurityCheckResult;
}

export interface SubmitVerificationRequest {
  showcase_id: string;
  evidence_url?: string;
}

// UI State Types
export interface ShowcaseFilters {
  category?: ShowcaseCategory;
  search?: string;
  sort?: 'newest' | 'popular' | 'featured';
}

export interface NotificationPreferences {
  email_verification_updates: boolean;
  email_karma_updates: boolean;
  email_marketing: boolean;
  push_verification_updates: boolean;
  push_karma_updates: boolean;
}

// Mock Data Service Types
export interface MockDataService {
  getShowcases: (
    filters?: ShowcaseFilters
  ) => Promise<PaginatedResponse<Showcase>>;
  getShowcase: (id: string) => Promise<Showcase | null>;
  createShowcase: (data: CreateShowcaseRequest) => Promise<Showcase>;
  updateShowcase: (
    id: string,
    data: UpdateShowcaseRequest
  ) => Promise<Showcase>;
  deleteShowcase: (id: string) => Promise<void>;
  generateShowcaseContent: (
    url: string,
    category?: ShowcaseCategory
  ) => Promise<ShowcaseContent>;
  uploadImage: (file: File, folder: string) => Promise<string>;
}

// AI Content Generation Types
export interface AIGenerationRequest {
  url: string;
  category: ShowcaseCategory;
}

export interface AIGenerationResponse {
  titulo_cativante: string;
  o_que_e: string;
  tres_vantagens: string[];
  guia_rapido: string[];
  faq: { pergunta: string; resposta: string }[];
  service_name: string;
}

// File Upload Types
export interface FileUploadResponse {
  url: string;
  path: string;
  size: number;
  type: string;
}

// Loading States
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
  progress?: number;
}

// Showcase Creation Flow States
export type ShowcaseCreationStep =
  | 'url-input'
  | 'security-verification'
  | 'ai-generation'
  | 'content-editing'
  | 'media-upload'
  | 'review'
  | 'published';

export interface ShowcaseCreationState {
  step: ShowcaseCreationStep;
  data: Partial<Showcase>;
  loading: LoadingState;
  canProceed: boolean;
}
