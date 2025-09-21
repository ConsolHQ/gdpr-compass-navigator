import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ExternalLink, FileText, Database, Shield, BookOpen, Users } from 'lucide-react';

interface SourceChipProps {
  source: {
    type: 'data-dictionary' | 'gdpr-article' | 'policy-template' | 'previous-dpia' | 'legal-basis' | 'company-policy';
    reference: string;
    description?: string;
    url?: string;
  };
  size?: 'sm' | 'default';
  showTooltip?: boolean;
  onClick?: () => void;
}

export const SourceChip: React.FC<SourceChipProps> = ({
  source,
  size = 'default',
  showTooltip = true,
  onClick
}) => {
  const getSourceConfig = (type: string) => {
    switch (type) {
      case 'data-dictionary':
        return {
          icon: <Database className="h-3 w-3" />,
          label: 'Data Dictionary',
          color: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
        };
      case 'gdpr-article':
        return {
          icon: <Shield className="h-3 w-3" />,
          label: 'GDPR Article',
          color: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
        };
      case 'policy-template':
        return {
          icon: <FileText className="h-3 w-3" />,
          label: 'Policy Template',
          color: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100'
        };
      case 'previous-dpia':
        return {
          icon: <BookOpen className="h-3 w-3" />,
          label: 'Previous DPIA',
          color: 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100'
        };
      case 'legal-basis':
        return {
          icon: <Shield className="h-3 w-3" />,
          label: 'Legal Basis',
          color: 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
        };
      case 'company-policy':
        return {
          icon: <Users className="h-3 w-3" />,
          label: 'Company Policy',
          color: 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
        };
      default:
        return {
          icon: <FileText className="h-3 w-3" />,
          label: 'Source',
          color: 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
        };
    }
  };

  const config = getSourceConfig(source.type);

  const chip = (
    <Badge
      variant="outline"
      className={`${config.color} ${size === 'sm' ? 'text-xs px-2 py-1' : 'text-sm px-3 py-1'} 
        font-medium cursor-pointer transition-colors inline-flex items-center gap-1.5
        ${onClick ? 'hover:shadow-sm' : ''}`}
      onClick={onClick}
    >
      {config.icon}
      <span className="truncate max-w-32">{source.reference}</span>
      {source.url && <ExternalLink className="h-3 w-3 opacity-50" />}
    </Badge>
  );

  if (!showTooltip) {
    return chip;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {chip}
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-xs">
          <div className="space-y-1">
            <p className="font-medium">{config.label}</p>
            <p className="text-xs text-muted-foreground">{source.reference}</p>
            {source.description && (
              <p className="text-xs">{source.description}</p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};