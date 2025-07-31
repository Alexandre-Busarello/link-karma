'use client';

import { CheckCircle, Globe, Loader2, Sparkles, Zap } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export interface AIGenerationStep {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  status: 'pending' | 'active' | 'completed' | 'error';
}

interface AIGenerationProgressProps {
  isGenerating: boolean;
  error?: string | null;
  onRetry?: () => void;
}

const generationSteps: Omit<AIGenerationStep, 'status'>[] = [
  {
    id: 'url-analysis',
    label: 'Analisando URL',
    description: 'Extraindo informações do site',
    icon: Globe,
  },
  {
    id: 'content-extraction',
    label: 'Extraindo Conteúdo',
    description: 'Coletando dados relevantes',
    icon: Zap,
  },
  {
    id: 'ai-generation',
    label: 'Gerando Conteúdo',
    description: 'IA criando sua vitrine personalizada',
    icon: Sparkles,
  },
];

export function AIGenerationProgress({
  isGenerating,
  error,
  onRetry,
}: AIGenerationProgressProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [steps, setSteps] = useState<AIGenerationStep[]>(
    generationSteps.map((step, index) => ({
      ...step,
      status: index === 0 ? 'active' : 'pending',
    }))
  );

  useEffect(() => {
    if (!isGenerating) {
      if (error) {
        // Mark current step as error
        setSteps(prev =>
          prev.map((step, index) =>
            index === currentStepIndex
              ? { ...step, status: 'error' }
              : step
          )
        );
      } else {
        // Mark all steps as completed
        setSteps(prev =>
          prev.map(step => ({ ...step, status: 'completed' }))
        );
      }
      return;
    }

    // Progress through steps while generating
    const interval = setInterval(() => {
      setCurrentStepIndex(prev => {
        const nextIndex = Math.min(prev + 1, steps.length - 1);
        
        setSteps(prevSteps =>
          prevSteps.map((step, index) => ({
            ...step,
            status:
              index < nextIndex
                ? 'completed'
                : index === nextIndex
                ? 'active'
                : 'pending',
          }))
        );
        
        return nextIndex;
      });
    }, 2000); // Progress every 2 seconds

    return () => clearInterval(interval);
  }, [isGenerating, error, currentStepIndex, steps.length]);

  // Reset when starting generation
  useEffect(() => {
    if (isGenerating && !error) {
      setCurrentStepIndex(0);
      setSteps(
        generationSteps.map((step, index) => ({
          ...step,
          status: index === 0 ? 'active' : 'pending',
        }))
      );
    }
  }, [isGenerating, error]);

  const getStepIcon = (step: AIGenerationStep) => {
    const IconComponent = step.icon;
    
    switch (step.status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'active':
        return <Loader2 className="w-5 h-5 text-purple-600 animate-spin" />;
      case 'error':
        return <IconComponent className="w-5 h-5 text-red-500" />;
      default:
        return <IconComponent className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStepTextColor = (step: AIGenerationStep) => {
    switch (step.status) {
      case 'completed':
        return 'text-green-600';
      case 'active':
        return 'text-purple-600';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
          {error ? (
            <Sparkles className="w-8 h-8 text-red-500" />
          ) : (
            <Sparkles className="w-8 h-8 text-purple-600" />
          )}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {error ? 'Erro na Geração' : 'IA Criando Sua Vitrine'}
        </h3>
        <p className="text-gray-600">
          {error
            ? 'Ocorreu um erro durante a geração do conteúdo'
            : 'Nossa inteligência artificial está criando conteúdo personalizado para você'}
        </p>
      </div>

      {/* Progress Steps */}
      <div className="space-y-4 mb-6">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              {getStepIcon(step)}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium ${getStepTextColor(step)}`}>
                {step.label}
              </p>
              <p className="text-xs text-gray-500">
                {step.description}
              </p>
            </div>
            {step.status === 'active' && (
              <div className="flex-shrink-0">
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-red-600 mb-3">{error}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors text-sm font-medium"
            >
              Tentar Novamente
            </button>
          )}
        </div>
      )}

      {/* Loading State */}
      {isGenerating && !error && (
        <div className="text-center">
          <div className="flex items-center justify-center text-sm text-gray-500">
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Processando... Isso pode levar alguns segundos
          </div>
          <div className="mt-3 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ 
                width: `${((currentStepIndex + 1) / steps.length) * 100}%` 
              }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}
