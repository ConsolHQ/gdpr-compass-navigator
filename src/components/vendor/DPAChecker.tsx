import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  FileText, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Upload, 
  Download,
  ExternalLink,
  Clock,
  Shield
} from 'lucide-react';
import { ConfidenceBadge } from '@/components/ai/ConfidenceBadge';
import { SourceChip } from '@/components/ai/SourceChip';

interface DPAClause {
  id: string;
  name: string;
  required: boolean;
  status: 'pass' | 'fail' | 'partial' | 'missing';
  confidence: 'high' | 'medium' | 'low';
  description: string;
  foundText?: string;
  recommendation?: string;
  gdprReference?: string;
}

interface DPAAnalysis {
  id: string;
  vendorName: string;
  documentName: string;
  uploadDate: Date;
  overallScore: number;
  riskRating: 'low' | 'medium' | 'high' | 'critical';
  renewalDate?: Date;
  clauses: DPAClause[];
  suggestedActions: string[];
  processingCategories: string[];
}

export const DPAChecker: React.FC = () => {
  const [analysis] = useState<DPAAnalysis>({
    id: '1',
    vendorName: 'Slack Technologies',
    documentName: 'Slack Data Processing Agreement v3.2',
    uploadDate: new Date('2024-01-15'),
    overallScore: 78,
    riskRating: 'medium',
    renewalDate: new Date('2024-12-31'),
    processingCategories: ['Employee Data', 'Communication Data', 'Metadata'],
    suggestedActions: [
      'Review sub-processor notification requirements',
      'Clarify data retention periods for deleted messages',
      'Request additional security certifications'
    ],
    clauses: [
      {
        id: '1',
        name: 'Data Controller/Processor Identification',
        required: true,
        status: 'pass',
        confidence: 'high',
        description: 'Clear identification of data controller and processor roles',
        foundText: 'Customer acts as the data controller and Slack as the data processor...',
        gdprReference: 'GDPR Article 28(3)(a)'
      },
      {
        id: '2',
        name: 'Processing Instructions',
        required: true,
        status: 'pass',
        confidence: 'high',
        description: 'Processor only processes on documented instructions from controller',
        foundText: 'Slack will process personal data only on documented instructions...',
        gdprReference: 'GDPR Article 28(3)(a)'
      },
      {
        id: '3',
        name: 'Confidentiality Obligations',
        required: true,
        status: 'pass',
        confidence: 'medium',
        description: 'Personnel authorized to process data are subject to confidentiality',
        foundText: 'All Slack personnel with access to personal data are bound by confidentiality...',
        gdprReference: 'GDPR Article 28(3)(b)'
      },
      {
        id: '4',
        name: 'Security Measures',
        required: true,
        status: 'partial',
        confidence: 'medium',
        description: 'Appropriate technical and organizational security measures',
        foundText: 'Slack implements industry-standard security measures including...',
        recommendation: 'Request specific details on encryption methods and access controls',
        gdprReference: 'GDPR Article 28(3)(c)'
      },
      {
        id: '5',
        name: 'Sub-processor Authorization',
        required: true,
        status: 'partial',
        confidence: 'low',
        description: 'Prior authorization or notification for sub-processors',
        foundText: 'Slack may engage sub-processors with general written authorization...',
        recommendation: 'Clarify notification timeline and opt-out procedures for new sub-processors',
        gdprReference: 'GDPR Article 28(3)(d)'
      },
      {
        id: '6',
        name: 'Data Subject Rights Assistance',
        required: true,
        status: 'pass',
        confidence: 'high',
        description: 'Assistance with data subject rights requests',
        foundText: 'Slack will assist Customer in responding to data subject requests...',
        gdprReference: 'GDPR Article 28(3)(e)'
      },
      {
        id: '7',
        name: 'Data Return/Deletion',
        required: true,
        status: 'fail',
        confidence: 'high',
        description: 'Return or deletion of data at end of processing',
        recommendation: 'Add clear data return/deletion procedures and timelines',
        gdprReference: 'GDPR Article 28(3)(g)'
      },
      {
        id: '8',
        name: 'Audit Rights',
        required: true,
        status: 'partial',
        confidence: 'medium',
        description: 'Controller audit rights and processor cooperation',
        foundText: 'Customer may conduct audits through third-party certifications...',
        recommendation: 'Negotiate direct audit rights or more detailed reporting',
        gdprReference: 'GDPR Article 28(3)(h)'
      },
      {
        id: '9',
        name: 'International Transfers (SCCs)',
        required: true,
        status: 'pass',
        confidence: 'high',
        description: 'Standard Contractual Clauses for international transfers',
        foundText: 'EU Standard Contractual Clauses (2021/914) are incorporated...',
        gdprReference: 'GDPR Article 46'
      },
      {
        id: '10',
        name: 'Breach Notification',
        required: true,
        status: 'pass',
        confidence: 'medium',
        description: 'Personal data breach notification requirements',
        foundText: 'Slack will notify Customer without undue delay of any breach...',
        gdprReference: 'GDPR Article 33'
      }
    ]
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="h-4 w-4 text-emerald-600" />;
      case 'fail':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'partial':
        return <AlertTriangle className="h-4 w-4 text-amber-600" />;
      case 'missing':
        return <XCircle className="h-4 w-4 text-gray-400" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'fail':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'partial':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'missing':
        return 'bg-gray-50 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-50 text-green-700 border-green-200';
      case 'medium': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'high': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'critical': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const passCount = analysis.clauses.filter(c => c.status === 'pass').length;
  const failCount = analysis.clauses.filter(c => c.status === 'fail').length;
  const partialCount = analysis.clauses.filter(c => c.status === 'partial').length;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                DPA Analysis: {analysis.vendorName}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {analysis.documentName} • Uploaded {analysis.uploadDate.toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{analysis.overallScore}%</div>
                <div className="text-xs text-muted-foreground">Compliance Score</div>
              </div>
              <Badge variant="outline" className={getRiskColor(analysis.riskRating)}>
                {analysis.riskRating.toUpperCase()} Risk
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Compliance Progress</span>
                <span>{analysis.overallScore}%</span>
              </div>
              <Progress value={analysis.overallScore} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="text-sm font-medium">Clause Status</div>
              <div className="flex gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-emerald-600" />
                  {passCount} Pass
                </span>
                <span className="flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3 text-amber-600" />
                  {partialCount} Partial
                </span>
                <span className="flex items-center gap-1">
                  <XCircle className="h-3 w-3 text-red-600" />
                  {failCount} Fail
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm font-medium">Renewal Date</div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-3 w-3" />
                {analysis.renewalDate?.toLocaleDateString() || 'Not specified'}
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Upload New Version
            </Button>
            <Button variant="outline">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Original
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="clauses" className="space-y-4">
        <TabsList>
          <TabsTrigger value="clauses">Clause Analysis</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="processing">Processing Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="clauses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>GDPR DPA Clause Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analysis.clauses.map((clause) => (
                  <div key={clause.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3 flex-1">
                        {getStatusIcon(clause.status)}
                        <div className="flex-1">
                          <h4 className="font-medium">{clause.name}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {clause.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <ConfidenceBadge confidence={clause.confidence} size="sm" />
                        <Badge 
                          variant="outline" 
                          className={getStatusColor(clause.status)}
                        >
                          {clause.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>

                    {clause.gdprReference && (
                      <div className="mb-2">
                        <SourceChip 
                          source={{
                            type: 'gdpr-article',
                            reference: clause.gdprReference
                          }}
                          size="sm"
                        />
                      </div>
                    )}

                    {clause.foundText && (
                      <div className="mb-3">
                        <div className="text-xs font-medium text-muted-foreground mb-1">
                          Found Text:
                        </div>
                        <div className="text-sm bg-muted p-2 rounded italic">
                          "{clause.foundText}"
                        </div>
                      </div>
                    )}

                    {clause.recommendation && (
                      <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
                          <div>
                            <div className="text-sm font-medium text-amber-800 mb-1">
                              Recommendation:
                            </div>
                            <div className="text-sm text-amber-700">
                              {clause.recommendation}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations">
          <Card>
            <CardHeader>
              <CardTitle>Recommended Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analysis.suggestedActions.map((action, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    <span className="flex-1 text-sm">{action}</span>
                    <Button size="sm" variant="outline">
                      Create Task
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="processing">
          <Card>
            <CardHeader>
              <CardTitle>Processing Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {analysis.processingCategories.map((category, index) => (
                  <Badge key={index} variant="secondary">
                    {category}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};