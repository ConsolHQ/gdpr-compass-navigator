import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Clock, AlertTriangle, CheckCircle, XCircle, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SLAGuardianProps {
  deadline: Date;
  type: 'dsr' | 'breach-notification' | 'dpia-review' | 'vendor-review';
  status: 'on-track' | 'at-risk' | 'overdue' | 'completed';
  onExtend?: () => void;
  onAutoResponse?: () => void;
  showActions?: boolean;
  compact?: boolean;
}

export const SLAGuardian: React.FC<SLAGuardianProps> = ({
  deadline,
  type,
  status,
  onExtend,
  onAutoResponse,
  showActions = true,
  compact = false
}) => {
  const now = new Date();
  const timeLeft = deadline.getTime() - now.getTime();
  const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));
  const hoursLeft = Math.ceil(timeLeft / (1000 * 60 * 60));

  const getTypeConfig = (type: string) => {
    switch (type) {
      case 'dsr':
        return { label: 'DSR Response Due', slaHours: 720 }; // 30 days
      case 'breach-notification':
        return { label: 'Breach Notification Due', slaHours: 72 };
      case 'dpia-review':
        return { label: 'DPIA Review Due', slaHours: 336 }; // 14 days
      case 'vendor-review':
        return { label: 'Vendor Review Due', slaHours: 8760 }; // 365 days
      default:
        return { label: 'Task Due', slaHours: 168 }; // 7 days
    }
  };

  const getStatusConfig = (status: string, timeLeft: number) => {
    switch (status) {
      case 'completed':
        return {
          color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          icon: <CheckCircle className="h-3 w-3" />,
          urgency: 'completed'
        };
      case 'overdue':
        return {
          color: 'bg-red-50 text-red-700 border-red-200',
          icon: <XCircle className="h-3 w-3" />,
          urgency: 'critical'
        };
      case 'at-risk':
        return {
          color: 'bg-amber-50 text-amber-700 border-amber-200',
          icon: <AlertTriangle className="h-3 w-3" />,
          urgency: 'warning'
        };
      default:
        return {
          color: 'bg-blue-50 text-blue-700 border-blue-200',
          icon: <Clock className="h-3 w-3" />,
          urgency: 'normal'
        };
    }
  };

  const typeConfig = getTypeConfig(type);
  const statusConfig = getStatusConfig(status, timeLeft);

  const formatTimeLeft = () => {
    if (status === 'completed') return 'Completed';
    if (status === 'overdue') return `${Math.abs(daysLeft)} days overdue`;
    
    if (type === 'breach-notification' && hoursLeft <= 72) {
      return `${Math.max(0, hoursLeft)}h left`;
    }
    
    return `${Math.max(0, daysLeft)} days left`;
  };

  const CountdownPill = () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            variant="outline"
            className={cn(
              statusConfig.color,
              "font-medium inline-flex items-center gap-1.5",
              compact ? "text-xs px-2 py-1" : "text-sm px-3 py-1.5"
            )}
          >
            {statusConfig.icon}
            {formatTimeLeft()}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <div className="space-y-1">
            <p className="font-medium">{typeConfig.label}</p>
            <p className="text-xs text-muted-foreground">
              Due: {deadline.toLocaleDateString()} at {deadline.toLocaleTimeString()}
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  if (compact) {
    return <CountdownPill />;
  }

  return (
    <Card className={cn(
      "border-l-4",
      statusConfig.urgency === 'critical' && "border-l-red-500",
      statusConfig.urgency === 'warning' && "border-l-amber-500",
      statusConfig.urgency === 'normal' && "border-l-blue-500",
      statusConfig.urgency === 'completed' && "border-l-emerald-500"
    )}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="font-medium">{typeConfig.label}</p>
              <p className="text-sm text-muted-foreground">
                {deadline.toLocaleDateString()} at {deadline.toLocaleTimeString()}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <CountdownPill />
            
            {showActions && status !== 'completed' && (
              <div className="flex gap-2">
                {onAutoResponse && status === 'at-risk' && (
                  <Button size="sm" variant="outline" onClick={onAutoResponse}>
                    Auto Response
                  </Button>
                )}
                {onExtend && (
                  <Button size="sm" variant="outline" onClick={onExtend}>
                    Request Extension
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};