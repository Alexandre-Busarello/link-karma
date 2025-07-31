'use client';

import {
  CreateShowcaseRequest,
  LoadingState,
  ShowcaseCategory,
} from '@linkkarma/shared-types';
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Building2,
  Car,
  Crown,
  DollarSign,
  Film,
  Heart,
  Laptop,
  Loader2,
  Package,
  Pizza,
  ShoppingCart,
  Sparkles,
} from 'lucide-react';
import React, { useState } from 'react';

interface ShowcaseCreationFormProps {
  onSubmit: (data: CreateShowcaseRequest) => Promise<void>;
  loading?: LoadingState;
  userTier?: 'basic' | 'pro';
  currentShowcaseCount?: number;
}

const categoryOptions: {
  value: ShowcaseCategory;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { value: 'banking', label: 'Bancos e Finanças', icon: Building2 },
  { value: 'transport', label: 'Transporte', icon: Car },
  { value: 'food', label: 'Alimentação', icon: Pizza },
  { value: 'shopping', label: 'Compras', icon: ShoppingCart },
  { value: 'entertainment', label: 'Entretenimento', icon: Film },
  { value: 'finance', label: 'Investimentos', icon: DollarSign },
  { value: 'health', label: 'Saúde', icon: Heart },
  { value: 'education', label: 'Educação', icon: BookOpen },
  { value: 'technology', label: 'Tecnologia', icon: Laptop },
  { value: 'other', label: 'Outros', icon: Package },
];

export function ShowcaseCreationForm({
  onSubmit,
  loading = { isLoading: false, error: null },
  userTier = 'basic',
  currentShowcaseCount = 0,
}: ShowcaseCreationFormProps) {
  const [formData, setFormData] = useState<CreateShowcaseRequest>({
    referral_url: '',
    category: 'other',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const maxShowcases = userTier === 'pro' ? 5 : 1;
  const canCreateShowcase = currentShowcaseCount < maxShowcases;

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    setErrors({});

    // Validation
    const newErrors: Record<string, string> = {};

    if (!formData.referral_url.trim()) {
      newErrors.referral_url = 'URL de referral é obrigatória';
    } else if (!validateUrl(formData.referral_url)) {
      newErrors.referral_url = 'URL inválida. Inclua http:// ou https://';
    }

    if (!formData.category) {
      newErrors.category = 'Categoria é obrigatória';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      setErrors({
        submit:
          error instanceof Error ? error.message : 'Erro ao criar showcase',
      });
    }
  };

  const handleInputChange = (
    field: keyof CreateShowcaseRequest,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleInputChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange('referral_url', (e.target as any).value);
  };

  const handleSelectChangeEvent = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleInputChange('category', (e.target as any).value as ShowcaseCategory);
  };

  if (!canCreateShowcase) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-yellow-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Limite de Showcases Atingido
          </h3>
          <p className="text-gray-600 mb-4">
            Você já criou {currentShowcaseCount} showcase
            {currentShowcaseCount > 1 ? 's' : ''}.
            {userTier === 'basic' ? (
              <span className="block mt-2">
                Usuários do plano <strong>Basic</strong> podem criar até 1
                showcase.
              </span>
            ) : (
              <span className="block mt-2">
                Usuários do plano <strong>Pro</strong> podem criar até 5
                showcases.
              </span>
            )}
          </p>
          {userTier === 'basic' && (
            <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 flex items-center justify-center">
              <Crown className="w-4 h-4 mr-2" />
              Upgrade para Pro
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="text-center mb-6">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-purple-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Criar Nova Vitrine
        </h2>
        <p className="text-gray-600 text-sm">
          Cole o link de referral e nossa IA criará uma vitrine incrível para
          você!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* URL Input */}
        <div>
          <label
            htmlFor="referral_url"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            URL de Referral *
          </label>
          <input
            type="url"
            id="referral_url"
            value={formData.referral_url}
            onChange={handleInputChangeEvent}
            placeholder="https://exemplo.com/meu-link-de-referral"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              errors.referral_url ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={loading.isLoading}
          />
          {errors.referral_url && (
            <p className="mt-1 text-sm text-red-600">{errors.referral_url}</p>
          )}
        </div>

        {/* Category Selection */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Categoria *
          </label>
          <select
            id="category"
            value={formData.category}
            onChange={handleSelectChangeEvent}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              errors.category ? 'border-red-500' : 'border-gray-300'
            }`}
            disabled={loading.isLoading}
          >
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">{errors.category}</p>
          )}
        </div>

        {/* Tier Info */}
        <div className="bg-gray-50 p-3 rounded-md">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Plano atual:</span>
            <span
              className={`font-medium ${
                userTier === 'pro' ? 'text-purple-600' : 'text-gray-900'
              }`}
            >
              {userTier === 'pro' ? 'Pro' : 'Basic'}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm mt-1">
            <span className="text-gray-600">Showcases:</span>
            <span className="text-gray-900">
              {currentShowcaseCount} / {maxShowcases}
            </span>
          </div>
        </div>

        {/* Error Message */}
        {errors.submit && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{errors.submit}</p>
          </div>
        )}

        {/* Loading Message */}
        {loading.error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{loading.error}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading.isLoading}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
        >
          {loading.isLoading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Criando Vitrine...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <Sparkles className="w-4 h-4 mr-2" />
              Criar Vitrine com IA
              <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          )}
        </button>
      </form>

      {/* Help Text */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          Nossa IA analisará o link e criará conteúdo personalizado para sua
          vitrine
        </p>
      </div>
    </div>
  );
}
