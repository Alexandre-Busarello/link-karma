'use client';

import { SecurityCheckResult } from '@linkkarma/shared-types';
import {
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Shield,
  XCircle,
} from 'lucide-react';

interface SecurityBadgeProps {
  securityCheck: SecurityCheckResult;
  showcaseId?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  showLink?: boolean;
}

export function SecurityBadge({
  securityCheck,
  showcaseId,
  size = 'md',
  showText = true,
  showLink = true,
}: SecurityBadgeProps) {
  const getStatusConfig = () => {
    switch (securityCheck.status) {
      case 'APROVADO':
        return {
          icon: CheckCircle,
          color: 'text-green-600',
          bgColor: 'bg-green-100',
          borderColor: 'border-green-200',
          text: 'Verificado',
          textColor: 'text-green-800',
        };
      case 'SUSPEITO':
        return {
          icon: AlertTriangle,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-100',
          borderColor: 'border-yellow-200',
          text: 'Atenção',
          textColor: 'text-yellow-800',
        };
      case 'BLOQUEADO':
        return {
          icon: XCircle,
          color: 'text-red-600',
          bgColor: 'bg-red-100',
          borderColor: 'border-red-200',
          text: 'Bloqueado',
          textColor: 'text-red-800',
        };
    }
  };

  const getSizeConfig = () => {
    switch (size) {
      case 'sm':
        return {
          iconSize: 'w-3 h-3',
          textSize: 'text-xs',
          padding: 'px-2 py-1',
          gap: 'gap-1',
        };
      case 'md':
        return {
          iconSize: 'w-4 h-4',
          textSize: 'text-sm',
          padding: 'px-2.5 py-1.5',
          gap: 'gap-1.5',
        };
      case 'lg':
        return {
          iconSize: 'w-5 h-5',
          textSize: 'text-base',
          padding: 'px-3 py-2',
          gap: 'gap-2',
        };
    }
  };

  const statusConfig = getStatusConfig();
  const sizeConfig = getSizeConfig();
  const IconComponent = statusConfig.icon;

  const handleDetailsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (showcaseId) {
      window.open(`/security-check/${showcaseId}`, '_blank');
    }
  };

  if (!showText) {
    return (
      <button
        onClick={showLink && showcaseId ? handleDetailsClick : undefined}
        className={`inline-flex items-center justify-center rounded-full border ${
          statusConfig.bgColor
        } ${statusConfig.borderColor} ${sizeConfig.padding} ${
          showLink && showcaseId
            ? 'cursor-pointer hover:shadow-md transition-all duration-200'
            : ''
        }`}
        title={`Status: ${statusConfig.text}${
          showLink && showcaseId ? ' - Clique para ver detalhes' : ''
        }`}
      >
        <IconComponent
          className={`${sizeConfig.iconSize} ${statusConfig.color}`}
        />
      </button>
    );
  }

  return (
    <div
      className={`inline-flex items-center rounded-full border ${statusConfig.bgColor} ${statusConfig.borderColor} ${sizeConfig.padding} ${sizeConfig.gap}`}
    >
      <IconComponent
        className={`${sizeConfig.iconSize} ${statusConfig.color}`}
      />
      <span
        className={`font-medium ${sizeConfig.textSize} ${statusConfig.textColor}`}
      >
        {statusConfig.text}
      </span>

      {showLink && showcaseId && (
        <>
          <span className="text-gray-400 text-xs">•</span>
          <button
            onClick={handleDetailsClick}
            className="inline-flex items-center gap-1 text-xs hover:underline transition-colors"
            title="Ver detalhes da verificação de segurança"
          >
            <span>Detalhes</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </button>
        </>
      )}
    </div>
  );
}

// Variant for just the shield icon with tooltip
export function SecurityShieldBadge({
  status,
  size = 'md',
}: {
  status: 'APROVADO' | 'SUSPEITO' | 'BLOQUEADO';
  size?: 'sm' | 'md' | 'lg';
}) {
  const getStatusConfig = () => {
    switch (status) {
      case 'APROVADO':
        return {
          color: 'text-green-600',
          tooltip: 'Link verificado e seguro',
        };
      case 'SUSPEITO':
        return {
          color: 'text-yellow-600',
          tooltip: 'Link com questões de reputação',
        };
      case 'BLOQUEADO':
        return {
          color: 'text-red-600',
          tooltip: 'Link bloqueado por segurança',
        };
    }
  };

  const getSizeConfig = () => {
    switch (size) {
      case 'sm':
        return 'w-4 h-4';
      case 'md':
        return 'w-5 h-5';
      case 'lg':
        return 'w-6 h-6';
    }
  };

  const statusConfig = getStatusConfig();
  const iconSize = getSizeConfig();

  return (
    <div className="inline-flex items-center" title={statusConfig.tooltip}>
      <Shield className={`${iconSize} ${statusConfig.color}`} />
    </div>
  );
}
