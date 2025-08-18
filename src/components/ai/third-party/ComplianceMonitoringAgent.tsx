import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  AlertCircle,
  Loader2,
  FileText
} from 'lucide-react';

interface ComplianceMonitoringAgentProps {
  isActive: boolean;
  onComplianceUpdate: (update: any) => void;
}

const ComplianceMonitoringAgent: React.FC<ComplianceMonitoringAgentProps> = ({
  isActive,
  onComplianceUpdate
}) => {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [complianceData, setComplianceData] = useState<any>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const handleStartMonitoring = async () => {
    setIsMonitoring(true);
    
    // Simulate compliance monitoring
    setTimeout(() => {
      const mockComplianceData = {
        overallScore: 85,
        totalVendors: 24,
        compliantVendors: 20,
        riskVendors: 3,
        nonCompliantVendors: 1,
        alerts: [
          {
            id: 1,
            vendor: 'DataTech Solutions',
            type: 'Contract Expiry',
            message: 'DPA expires in 15 days',
            severity: 'medium',
            dueDate: '2024-02-15'
          },
          {
            id: 2,
            vendor: 'CloudStore Inc',
            type: 'Security Assessment',
            message: 'Security assessment overdue by 30 days',
            severity: 'high',
            dueDate: '2024-01-15'
          },
          {
            id: 3,
            vendor: 'Analytics Pro',
            type: 'Data Transfer',
            message: 'New data transfer location detected',
            severity: 'medium',
            dueDate: '2024-02-01'
          }
        ],
        riskBreakdown: {
          low: 15,
          medium: 6,
          high: 2,
          critical: 1
        },
        certificationStatus: {
          iso27001: 18,
          soc2: 16,
          gdprCompliant: 22,
          none: 2
        },
        trends: {
          complianceImprovement: '+5%',
          newVendors: 3,
          resolvedIssues: 8
        }
      };
      
      setComplianceData(mockComplianceData);
      setLastUpdate(new Date());
      setIsMonitoring(false);
      onComplianceUpdate(mockComplianceData);
    }, 2500);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return AlertCircle;
      case 'medium': return AlertTriangle;
      case 'low': return Clock;
      default: return AlertTriangle;
    }
  };

  if (!isActive) {
    return (
      <Card className="opacity-50">
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-gray-400" />
            <CardTitle className="text-sm text-gray-500">Compliance Monitoring Agent</CardTitle>
          </div>
          <CardDescription className="text-xs">
            Continuous compliance monitoring and risk assessment (Inactive)
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="border-orange-200 bg-orange-50/30">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-2">
          <Shield className="h-4 w-4 text-orange-600" />
          <CardTitle className="text-sm text-orange-900">Compliance Monitoring Agent</CardTitle>
          <Badge variant="secondary" className="text-xs">Active</Badge>
        </div>
        <CardDescription className="text-xs">
          Real-time compliance monitoring and automated risk assessments
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {!complianceData ? (
          <div className="text-center space-y-3">
            <Button 
              onClick={handleStartMonitoring}
              disabled={isMonitoring}
              size="sm"
              className="w-full"
            >
              {isMonitoring ? (
                <>
                  <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                  Monitoring Compliance...
                </>
              ) : (
                <>
                  <Shield className="mr-2 h-3 w-3" />
                  Start Compliance Monitoring
                </>
              )}
            </Button>
            
            {isMonitoring && (
              <div className="space-y-2">
                <Shield className="h-6 w-6 text-orange-600 animate-pulse mx-auto" />
                <p className="text-xs text-orange-700">Analyzing vendor compliance...</p>
                <p className="text-xs text-gray-600">
                  Checking contracts, certifications, and risk levels
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {/* Overall Compliance Score */}
            <div className="bg-white p-3 rounded border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Overall Compliance Score</span>
                <Badge variant="default" className="text-xs">
                  {complianceData.overallScore}%
                </Badge>
              </div>
              <Progress value={complianceData.overallScore} className="h-2" />
              <div className="flex justify-between text-xs text-gray-600 mt-1">
                <span>{complianceData.compliantVendors}/{complianceData.totalVendors} vendors compliant</span>
                <span className="text-green-600">{complianceData.trends.complianceImprovement} improvement</span>
              </div>
            </div>

            {/* Risk Summary */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white p-2 rounded border text-center">
                <div className="text-lg font-bold text-red-600">{complianceData.riskVendors}</div>
                <div className="text-xs text-gray-600">High Risk</div>
              </div>
              <div className="bg-white p-2 rounded border text-center">
                <div className="text-lg font-bold text-green-600">{complianceData.compliantVendors}</div>
                <div className="text-xs text-gray-600">Compliant</div>
              </div>
            </div>

            {/* Active Alerts */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-orange-900">Active Alerts</span>
                <Badge variant="outline" className="text-xs">
                  {complianceData.alerts.length} alerts
                </Badge>
              </div>
              
              <ScrollArea className="h-32">
                <div className="space-y-2">
                  {complianceData.alerts.map((alert: any) => {
                    const SeverityIcon = getSeverityIcon(alert.severity);
                    return (
                      <div key={alert.id} className="bg-white p-2 rounded border">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-2">
                            <SeverityIcon className="h-3 w-3 text-orange-600" />
                            <div>
                              <p className="text-xs font-medium">{alert.vendor}</p>
                              <p className="text-xs text-gray-600">{alert.message}</p>
                            </div>
                          </div>
                          <Badge variant={getSeverityColor(alert.severity) as any} className="text-xs">
                            {alert.severity}
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </div>

            {/* Quick Stats */}
            <div className="bg-white p-3 rounded border">
              <h4 className="text-sm font-medium mb-2">Recent Activity</h4>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-sm font-bold text-blue-600">{complianceData.trends.newVendors}</div>
                  <div className="text-xs text-gray-600">New Vendors</div>
                </div>
                <div>
                  <div className="text-sm font-bold text-green-600">{complianceData.trends.resolvedIssues}</div>
                  <div className="text-xs text-gray-600">Resolved</div>
                </div>
                <div>
                  <div className="text-sm font-bold text-orange-600">{complianceData.certificationStatus.iso27001}</div>
                  <div className="text-xs text-gray-600">ISO 27001</div>
                </div>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button onClick={handleStartMonitoring} size="sm" variant="outline" className="flex-1">
                <TrendingUp className="mr-2 h-3 w-3" />
                Refresh
              </Button>
              <Button size="sm" variant="outline">
                <FileText className="mr-2 h-3 w-3" />
                Report
              </Button>
            </div>
            
            {lastUpdate && (
              <p className="text-xs text-gray-500 text-center">
                Last updated: {lastUpdate.toLocaleTimeString()}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ComplianceMonitoringAgent;