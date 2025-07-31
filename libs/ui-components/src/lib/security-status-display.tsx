'use client';

import { SecurityCheckResult } from '@linkkarma/shared-types';
import {
  AlertTriangle,
  CheckCircle,
  Info,
  Shield,
  XCircle,
} from 'lucide-react';

interface SecurityStatusDisplayProps {
  securityCheck: SecurityCheckResult;
  onProceed?: () => void;
  onCancel?: () => void;
  showActions?: boolean;
}

export function SecurityStatusDisplay({
  securityCheck,
  onProceed,
  onCancel,
  showActions = true,
}: SecurityStatusDisplayProps) {
  const getStatusConfig = () => {
    switch (securityCheck.status) {
      case 'APROVADO':
        return {
          icon: CheckCircle,
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          title: 'Link Verificado e Seguro',
          description:
            'Este link foi verificado e considerado seguro para uso.',
        };
      case 'SUSPEITO':
        return {
          icon: AlertTriangle,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          title: 'Link com Questões de Reputação',
          description:
            'Algumas questões foram identificadas. Prossiga com cautela.',
        };
      case 'BLOQUEADO':
        return {
          icon: XCircle,
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          title: 'Link Bloqueado por Segurança',
          description: 'Este link foi identificado como potencial golpe/scam.',
        };
    }
  };

  const config = getStatusConfig();
  const IconComponent = config.icon;

  const formatSourceName = (source: string): string => {
    const sourceMap: Record<string, string> = {
      twitter: 'Twitter/X',
      reddit: 'Reddit',
      reclame_aqui: 'Reclame Aqui',
      trustpilot: 'Trustpilot',
      google: 'Google',
      error_fallback: 'Verificação Técnica',
    };
    return sourceMap[source] || source;
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Main Status Card */}
      <div
        className={`rounded-xl border-2 p-6 ${config.bgColor} ${config.borderColor} shadow-sm`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div
              className={`p-3 rounded-full ${config.bgColor} ${config.borderColor} border`}
            >
              <IconComponent className={`w-8 h-8 ${config.color}`} />
            </div>
            <div>
              <h2 className={`text-xl font-bold ${config.color}`}>
                {config.title}
              </h2>
              <p className="text-gray-600 text-sm mt-1">{config.description}</p>
            </div>
          </div>

          <div className="text-right">
            <div className="flex items-center space-x-2 mb-1">
              <Shield className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-600">
                Confiança
              </span>
            </div>
            <div className={`text-2xl font-bold ${config.color}`}>
              {securityCheck.confidence}%
            </div>
          </div>
        </div>

        {/* Recommendation */}
        <div className="bg-white/50 rounded-lg p-4 border border-white/20">
          <div className="flex items-start space-x-2">
            <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Recomendação</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                {securityCheck.recommendation}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Details Grid */}
      <div className="gap-4">
        {/* Findings Card */}
        {securityCheck.findings.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center space-x-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-purple-500" />
              <h3 className="font-semibold text-gray-800">
                Descobertas da Análise
              </h3>
            </div>
            <div className="space-y-3">
              {securityCheck.findings.slice(0, 3).map((finding, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {finding}
                  </p>
                </div>
              ))}
              {securityCheck.findings.length > 3 && (
                <div className="text-xs text-gray-500 italic">
                  +{securityCheck.findings.length - 3} descobertas adicionais
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Sources Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <Shield className="w-5 h-5 text-blue-500" />
          <h3 className="font-semibold text-gray-800">Fontes Verificadas</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {securityCheck.sources_checked.map((source, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200"
            >
              {formatSourceName(source)}
            </span>
          ))}
        </div>
      </div>

      {/* Statistics and Risk Indicators */}
      {securityCheck.details && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <Info className="w-5 h-5 text-indigo-500" />
            <span>Estatísticas Detalhadas</span>
          </h3>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-700">
                  Positivas
                </span>
              </div>
              <div className="text-2xl font-bold text-green-600">
                {securityCheck.details.positive_mentions}
              </div>
              <div className="text-xs text-green-600">menções</div>
            </div>

            <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <XCircle className="w-5 h-5 text-red-600" />
                <span className="text-sm font-medium text-red-700">
                  Negativas
                </span>
              </div>
              <div className="text-2xl font-bold text-red-600">
                {securityCheck.details.negative_mentions}
              </div>
              <div className="text-xs text-red-600">menções</div>
            </div>

            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Shield className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-700">
                  Confiabilidade
                </span>
              </div>
              <div className="text-2xl font-bold text-blue-600">
                {securityCheck.details.trustworthiness_score}
              </div>
              <div className="text-xs text-blue-600">de 100</div>
            </div>
          </div>

          {/* Risk Indicators */}
          {securityCheck.details.scam_indicators.length > 0 && (
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center space-x-2 mb-3">
                <XCircle className="w-5 h-5 text-red-500" />
                <h4 className="font-semibold text-red-700">
                  Indicadores de Risco
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {securityCheck.details.scam_indicators.map(
                  (indicator, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 p-3 bg-red-50 rounded-lg border border-red-200"
                    >
                      <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                      <span className="text-sm text-red-800 font-medium">
                        {indicator}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      {showActions && securityCheck.status !== 'BLOQUEADO' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-3">
            {securityCheck.status === 'SUSPEITO' && onProceed && (
              <button
                onClick={onProceed}
                className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 px-6 rounded-lg hover:from-yellow-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-all duration-200 font-semibold text-sm shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-center space-x-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Prosseguir com Cautela</span>
                </div>
              </button>
            )}
            {onCancel && (
              <button
                onClick={onCancel}
                className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white py-3 px-6 rounded-lg hover:from-gray-600 hover:to-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 font-semibold text-sm shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-center space-x-2">
                  <XCircle className="w-4 h-4" />
                  <span>Cancelar</span>
                </div>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Blocked State */}
      {securityCheck.status === 'BLOQUEADO' && (
        <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl border-2 border-red-200 p-6 shadow-sm">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                <span role="img" aria-label="Bloqueado" className="text-2xl">
                  🚫
                </span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-red-800 mb-2">
                Link Bloqueado por Segurança
              </h3>
              <p className="text-red-700 mb-3 leading-relaxed">
                Este link não pode ser usado para criar vitrines. Nossa análise
                identificou indicadores de risco que sugerem possível golpe ou
                atividade fraudulenta.
              </p>
              <div className="bg-red-200/50 rounded-lg p-3 border border-red-300">
                <p className="text-sm text-red-800 font-medium">
                  <span role="img" aria-label="Proteção">
                    🛡️
                  </span>{' '}
                  Proteção Ativa: Para sua segurança e dos demais usuários,
                  links identificados como potenciais golpes são automaticamente
                  bloqueados.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
