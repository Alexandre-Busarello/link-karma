'use client';

import {
  FAQ,
  LoadingState,
  Showcase,
  ShowcaseContent,
} from '@linkkarma/shared-types';
import {
  AlertCircle,
  CheckCircle,
  Eye,
  FileText,
  HelpCircle,
  Image,
  List,
  Plus,
  Save,
  Send,
  Star,
  Trash2,
} from 'lucide-react';
import { ChangeEvent, useEffect, useState } from 'react';
import { ShowcaseDisplay } from './showcase-display';

interface ShowcaseEditorProps {
  showcase: Partial<Showcase>;
  onSave: (data: Partial<Showcase>) => Promise<void>;
  onPublish: (data: Partial<Showcase>) => Promise<void>;
  loading?: LoadingState;
  userTier?: 'basic' | 'pro';
}

export function ShowcaseEditor({
  showcase,
  onSave,
  onPublish,
  loading = { isLoading: false, error: null },
  userTier = 'basic',
}: ShowcaseEditorProps) {
  const [formData, setFormData] = useState<Partial<Showcase>>(showcase);
  const [activeTab, setActiveTab] = useState<'content' | 'media' | 'preview'>(
    'content'
  );
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    setFormData(showcase);
  }, [showcase]);

  const handleContentChange = (
    field: keyof ShowcaseContent,
    value: string | string[] | FAQ[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      content: {
        what_is: '',
        advantages: [],
        quick_guide: [],
        faq: [],
        ...prev.content,
        [field]: value,
      },
    }));
    setHasUnsavedChanges(true);
  };

  const handleBasicInfoChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setHasUnsavedChanges(true);
  };

  const handleFAQChange = (index: number, field: keyof FAQ, value: string) => {
    const newFAQ = [...(formData.content?.faq || [])];
    newFAQ[index] = { ...newFAQ[index], [field]: value };
    handleContentChange('faq', newFAQ);
  };

  const handleAdvantageChange = (index: number, value: string) => {
    const newAdvantages = [...(formData.content?.advantages || [])];
    newAdvantages[index] = value;
    handleContentChange('advantages', newAdvantages);
  };

  const handleQuickGuideChange = (index: number, value: string) => {
    const newQuickGuide = [...(formData.content?.quick_guide || [])];
    newQuickGuide[index] = value;
    handleContentChange('quick_guide', newQuickGuide);
  };

  const addAdvantage = () => {
    const newAdvantages = [...(formData.content?.advantages || []), ''];
    handleContentChange('advantages', newAdvantages);
  };

  const removeAdvantage = (index: number) => {
    const newAdvantages = (formData.content?.advantages || []).filter(
      (_, i) => i !== index
    );
    handleContentChange('advantages', newAdvantages);
  };

  const addQuickGuideStep = () => {
    const newQuickGuide = [...(formData.content?.quick_guide || []), ''];
    handleContentChange('quick_guide', newQuickGuide);
  };

  const removeQuickGuideStep = (index: number) => {
    const newQuickGuide = (formData.content?.quick_guide || []).filter(
      (_, i) => i !== index
    );
    handleContentChange('quick_guide', newQuickGuide);
  };

  const addFAQItem = () => {
    const newFAQ = [
      ...(formData.content?.faq || []),
      { question: '', answer: '' },
    ];
    handleContentChange('faq', newFAQ);
  };

  const removeFAQItem = (index: number) => {
    const newFAQ = (formData.content?.faq || []).filter((_, i) => i !== index);
    handleContentChange('faq', newFAQ);
  };

  const handleSave = async () => {
    try {
      await onSave(formData);
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error('Error saving showcase:', error);
    }
  };

  const handlePublish = async () => {
    try {
      await onPublish({ ...formData, status: 'published' });
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error('Error publishing showcase:', error);
    }
  };

  const tabs = [
    {
      id: 'content',
      label: 'Conteúdo',
      description: 'Edite o conteúdo da sua vitrine',
      icon: FileText,
      color: 'text-purple-600',
    },
    {
      id: 'media',
      label: 'Mídia',
      description: 'Adicione imagens e vídeos',
      icon: Image,
      color: 'text-blue-600',
    },
    {
      id: 'preview',
      label: 'Visualizar',
      description: 'Veja como ficará sua vitrine',
      icon: Eye,
      color: 'text-green-600',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {formData.title || 'Nova Vitrine'}
              </h1>
              <div className="flex items-center space-x-3 mt-1">
                {formData.service_name && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {formData.service_name}
                  </span>
                )}
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    formData.status === 'published'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {formData.status === 'published' ? (
                    <>
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Publicado
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-3 h-3 mr-1" />
                      Rascunho
                    </>
                  )}
                </span>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={handleSave}
              disabled={loading.isLoading || !hasUnsavedChanges}
              className="inline-flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium text-sm shadow-sm hover:shadow-md"
            >
              <Save className="w-4 h-4 mr-2" />
              {loading.isLoading ? 'Salvando...' : 'Salvar'}
            </button>
            <button
              onClick={handlePublish}
              disabled={loading.isLoading}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium text-sm shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <Send className="w-4 h-4 mr-2" />
              {loading.isLoading ? 'Publicando...' : 'Publicar'}
            </button>
          </div>
        </div>

        {hasUnsavedChanges && (
          <div className="mt-2 text-sm text-amber-600 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            Você tem alterações não salvas
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 p-2 shadow-sm">
        <nav className="flex space-x-2">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() =>
                  setActiveTab(tab.id as 'content' | 'media' | 'preview')
                }
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <IconComponent
                  className={`w-4 h-4 ${isActive ? 'text-white' : tab.color}`}
                />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content Tab */}
      {activeTab === 'content' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Título da Vitrine
                </label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) =>
                    handleBasicInfoChange(
                      'title',
                      (e.target as HTMLInputElement).value
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Ex: Nubank - Conta Digital Sem Tarifas"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome do Serviço
                </label>
                <input
                  type="text"
                  value={formData.service_name || ''}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleBasicInfoChange('service_name', e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Ex: Nubank"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descrição Curta
              </label>
              <textarea
                value={formData.description || ''}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  handleBasicInfoChange('description', e.target.value)
                }
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Descrição concisa do serviço em 1-2 frases"
              />
            </div>

            {/* What Is */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                O que é?
              </label>
              <textarea
                value={formData.content?.what_is || ''}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  handleContentChange('what_is', e.currentTarget.value)
                }
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Explique o que é o produto ou serviço de forma clara e atrativa"
              />
            </div>

            {/* Advantages */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <Star className="w-4 h-4 mr-2 text-yellow-500" />
                  Vantagens Incríveis
                </label>
                <button
                  onClick={addAdvantage}
                  className="inline-flex items-center text-sm text-purple-600 hover:text-purple-700 font-medium"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Adicionar Vantagem
                </button>
              </div>
              <div className="space-y-2">
                {(formData.content?.advantages || []).map(
                  (advantage, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={advantage}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleAdvantageChange(index, e.currentTarget.value)
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder={`Vantagem ${index + 1}`}
                      />
                      <button
                        onClick={() => removeAdvantage(index)}
                        className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Quick Guide */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <List className="w-4 h-4 mr-2 text-blue-500" />
                  Guia Rápido (Passo a Passo)
                </label>
                <button
                  onClick={addQuickGuideStep}
                  className="inline-flex items-center text-sm text-purple-600 hover:text-purple-700 font-medium"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Adicionar Passo
                </button>
              </div>
              <div className="space-y-2">
                {(formData.content?.quick_guide || []).map((step, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={step}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleQuickGuideChange(index, e.currentTarget.value)
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder={`Passo ${index + 1}`}
                    />
                    <button
                      onClick={() => removeQuickGuideStep(index)}
                      className="text-red-600 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <HelpCircle className="w-4 h-4 mr-2 text-green-500" />
                  Perguntas Frequentes (FAQ)
                </label>
                <button
                  onClick={addFAQItem}
                  className="inline-flex items-center text-sm text-purple-600 hover:text-purple-700 font-medium"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Adicionar FAQ
                </button>
              </div>
              <div className="space-y-4">
                {(formData.content?.faq || []).map((faq, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        FAQ {index + 1}
                      </span>
                      <button
                        onClick={() => removeFAQItem(index)}
                        className="text-red-600 hover:text-red-700 p-1 rounded hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleFAQChange(
                            index,
                            'question',
                            e.currentTarget.value
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Pergunta"
                      />
                      <textarea
                        value={faq.answer}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                          handleFAQChange(
                            index,
                            'answer',
                            e.currentTarget.value
                          )
                        }
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Resposta"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Media Tab */}
      {activeTab === 'media' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <Image className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Upload de Mídia
            </h3>
            <p className="text-gray-600 mb-4">
              Adicione imagens e vídeos para tornar sua vitrine mais atrativa
            </p>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
              Selecionar Arquivos
            </button>
          </div>
        </div>
      )}

      {/* Preview Tab */}
      {activeTab === 'preview' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Pré-visualização da Vitrine
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  Veja como sua vitrine aparecerá para os usuários
                </p>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Eye className="w-4 h-4" />
                <span>Atualização em Tempo Real</span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Preview Content */}
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 bg-gray-50">
              {formData.title && formData.content?.what_is ? (
                <ShowcaseDisplay
                  showcase={{
                    id: 'preview',
                    user_id: 'preview-user',
                    title: formData.title || 'Título da Vitrine',
                    description: formData.description || 'Descrição da vitrine',
                    referral_url: 'https://example.com/preview',
                    service_name: formData.service_name || 'Nome do Serviço',
                    category: formData.category || 'other',
                    status: 'draft',
                    cover_image_url: formData.cover_image_url || null,
                    gallery_images: formData.gallery_images || [],
                    video_url: formData.video_url || null,
                    content: {
                      what_is: formData.content?.what_is || '',
                      advantages: formData.content?.advantages || [],
                      quick_guide: formData.content?.quick_guide || [],
                      faq: formData.content?.faq || [],
                    },
                    karma_boost: 0,
                    featured_until: null,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    security_check: formData.security_check,
                  }}
                  isPreview={true}
                />
              ) : (
                <div className="text-center py-12">
                  <Eye className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">
                    Preencha os campos para ver a pré-visualização
                  </h4>
                  <p className="text-gray-600">
                    Complete pelo menos o título e a descrição "O que é?" para
                    visualizar sua vitrine
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Error Display */}
      {loading.error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-600">{loading.error}</p>
        </div>
      )}
    </div>
  );
}
