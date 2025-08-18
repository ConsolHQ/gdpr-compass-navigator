import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ConfidenceBadge } from '../ConfidenceBadge';
import { 
  Wand2, 
  Upload, 
  FileText, 
  Eye,
  Check,
  X,
  RefreshCw,
  Download,
  Copy,
  Sparkles,
  Brain,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface ROPAGenerationAgentProps {
  isActive: boolean;
  formData: any;
  onFormUpdate: (updates: any) => void;
  onGeneratedROPAApply: (generatedROPA: any) => void;
}

const ROPAGenerationAgent: React.FC<ROPAGenerationAgentProps> = ({ 
  isActive, 
  formData, 
  onFormUpdate,
  onGeneratedROPAApply 
}) => {
  const [inputMethod, setInputMethod] = useState<'description' | 'document'>('description');
  const [description, setDescription] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedROPA, setGeneratedROPA] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [confidenceScore, setConfidenceScore] = useState(0);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const generateROPA = async () => {
    setIsGenerating(true);
    
    // Simulate comprehensive ROPA generation
    setTimeout(() => {
      const mockGeneratedROPA = {
        // General Information
        name: 'Customer Support Data Processing',
        description: 'Processing of customer personal data for support ticket management, communication, and service improvement',
        department: 'Customer Service',
        role: 'Controller',
        jointControllers: 'No',
        selectedControllers: [],

        // Purpose & Legal Basis
        purpose: 'To provide customer support services, resolve technical issues, and improve service quality based on customer feedback and interaction history',
        legalBasis: 'Legitimate Interest',
        
        // Data Categories
        dataSubjectCategories: ['Customers', 'Prospective Customers'],
        personalDataCategories: [
          'Name', 
          'Email Address', 
          'Phone Number', 
          'Account Information',
          'Support History',
          'Communication Records',
          'Technical Issues Reported'
        ],
        specialCategoryData: 'No',
        specialCategoryDetails: '',
        specialCategoryGround: '',

        // Context & Recipients
        processingReason: 'Customer support is essential for service delivery and customer satisfaction. Processing is necessary to resolve technical issues and maintain service quality.',
        imSystems: ['Zendesk', 'CRM System', 'Email Platform'],
        vendors: ['Zendesk Inc.', 'AWS (hosting)'],
        internalRecipients: ['Support Team', 'Technical Team', 'Quality Assurance'],
        externalRecipients: ['Third-party technical vendors (when required for issue resolution)'],
        internationalTransfers: 'Yes',
        transferCountries: ['United States (Zendesk servers)'],

        // Retention
        retentionTime: '3 years',
        retentionPeriod: 'Years',
        retentionTrigger: 'Account closure or service termination',
        retentionAction: 'Secure deletion of all personal data',
        justificationType: 'Internal',
        justificationText: 'Support records retained for service improvement and potential future support requests',
        legislation: 'GDPR Article 6(1)(f) - Legitimate Interest',

        // Security Measures
        securityMeasures: [
          {
            id: 1,
            name: 'Access Controls',
            description: 'Role-based access to support systems',
            type: 'Technical',
            status: 'Implemented',
            imSystem: 'Zendesk',
            appointedTo: 'IT Security Team',
            deadline: ''
          },
          {
            id: 2,
            name: 'Data Encryption',
            description: 'Encryption of data in transit and at rest',
            type: 'Technical',
            status: 'Implemented',
            imSystem: 'All Systems',
            appointedTo: 'IT Security Team',
            deadline: ''
          },
          {
            id: 3,
            name: 'Staff Training',
            description: 'Regular GDPR and data protection training',
            type: 'Organizational',
            status: 'Ongoing',
            imSystem: 'Training Platform',
            appointedTo: 'HR Department',
            deadline: '2024-06-30'
          }
        ],

        // DPIA Check
        dpiaCheck: {
          'systematic-monitoring': { answer: 'No', explanation: 'Limited monitoring for support purposes only' },
          'large-scale': { answer: 'No', explanation: 'Processing limited to active customers' },
          'vulnerable-groups': { answer: 'No', explanation: 'No specific vulnerable groups targeted' },
          'innovative-technology': { answer: 'No', explanation: 'Standard support systems used' },
          'automated-decisions': { answer: 'No', explanation: 'No automated decision making' },
          'special-categories': { answer: 'No', explanation: 'No special category data processed' },
          'public-access': { answer: 'No', explanation: 'Support data not publicly accessible' },
          'data-matching': { answer: 'No', explanation: 'No data matching activities' }
        },

        // Data Protection Principles
        dataProtectionPrinciples: {
          lawfulness: {
            compliant: true,
            evidence: 'Legal basis clearly identified (Legitimate Interest)',
            improvements: []
          },
          fairness: {
            compliant: true,
            evidence: 'Transparent privacy notice provided to customers',
            improvements: []
          },
          transparency: {
            compliant: true,
            evidence: 'Privacy policy clearly explains support data processing',
            improvements: []
          },
          purposeLimitation: {
            compliant: true,
            evidence: 'Data used only for specified support purposes',
            improvements: []
          },
          dataMinimisation: {
            compliant: true,
            evidence: 'Only necessary data collected for support provision',
            improvements: ['Regular review of data fields collected']
          },
          accuracy: {
            compliant: true,
            evidence: 'Customers can update their information',
            improvements: []
          },
          storageLimitation: {
            compliant: true,
            evidence: 'Clear retention period defined (3 years)',
            improvements: []
          },
          security: {
            compliant: true,
            evidence: 'Technical and organizational measures implemented',
            improvements: []
          },
          accountability: {
            compliant: true,
            evidence: 'ROPA documentation and compliance monitoring',
            improvements: ['Regular compliance audits']
          }
        }
      };

      setGeneratedROPA(mockGeneratedROPA);
      setConfidenceScore(92);
      setShowPreview(true);
      setIsGenerating(false);
    }, 3000);
  };

  const applyGeneratedROPA = () => {
    if (generatedROPA) {
      onGeneratedROPAApply(generatedROPA);
      setShowPreview(false);
      setGeneratedROPA(null);
    }
  };

  const regenerateROPA = () => {
    setGeneratedROPA(null);
    setShowPreview(false);
    generateROPA();
  };

  if (!isActive) {
    return (
      <Card className="opacity-60">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-sm">
            <Wand2 className="h-4 w-4" />
            <span>ROPA Generation Agent</span>
            <Badge variant="outline" className="text-xs">Inactive</Badge>
          </CardTitle>
          <CardDescription className="text-xs">
            Will generate complete ROPA drafts from your input
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="border-violet-200 bg-violet-50/50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-sm">
          <Wand2 className="h-4 w-4 text-violet-600" />
          <span>ROPA Generation Agent</span>
          <Badge className="bg-violet-100 text-violet-800 text-xs">Active</Badge>
        </CardTitle>
        <CardDescription className="text-xs">
          Generate complete ROPA drafts from descriptions or documents
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!showPreview ? (
          <>
            <Tabs value={inputMethod} onValueChange={(value) => setInputMethod(value as 'description' | 'document')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="description" className="text-xs">Description</TabsTrigger>
                <TabsTrigger value="document" className="text-xs">Document</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="space-y-3">
                <div>
                  <Label className="text-xs font-medium">Comprehensive Processing Description</Label>
                  <Textarea
                    placeholder="Describe your complete data processing activity: What data do you collect? From whom? For what purpose? How long do you keep it? Who has access? Include as much detail as possible for a comprehensive ROPA..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="text-xs mt-1"
                    rows={6}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="document" className="space-y-3">
                <div>
                  <Label className="text-xs font-medium">Upload Document</Label>
                  <div className="mt-1">
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={handleFileUpload}
                      className="text-xs"
                    />
                  </div>
                  {uploadedFile && (
                    <div className="flex items-center space-x-2 text-xs text-green-700">
                      <FileText className="h-3 w-3" />
                      <span>{uploadedFile.name}</span>
                    </div>
                  )}
                  <p className="text-xs text-gray-600 mt-1">
                    Upload privacy policies, data mapping docs, or existing ROPAs
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            <Button 
              onClick={generateROPA}
              disabled={isGenerating || (!description.trim() && !uploadedFile)}
              className="w-full"
              size="sm"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="mr-2 h-3 w-3 animate-spin" />
                  Generating Complete ROPA...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-3 w-3" />
                  Generate Complete ROPA
                </>
              )}
            </Button>
          </>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-900">ROPA Generated</span>
                <ConfidenceBadge confidence="ai-generated" size="sm" />
              </div>
              <div className="flex space-x-1">
                <Button size="sm" variant="outline" onClick={() => setShowPreview(false)}>
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <ScrollArea className="h-64 border rounded p-3 bg-white">
              <div className="space-y-3 text-xs">
                <div>
                  <span className="font-medium text-violet-900">Processing Activity:</span>
                  <p className="text-gray-900 mt-1">{generatedROPA?.name}</p>
                </div>
                <div>
                  <span className="font-medium text-violet-900">Description:</span>
                  <p className="text-gray-900 mt-1">{generatedROPA?.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="font-medium text-violet-900">Department:</span>
                    <p className="text-gray-900">{generatedROPA?.department}</p>
                  </div>
                  <div>
                    <span className="font-medium text-violet-900">Legal Basis:</span>
                    <p className="text-gray-900">{generatedROPA?.legalBasis}</p>
                  </div>
                </div>
                <div>
                  <span className="font-medium text-violet-900">Personal Data Categories:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {generatedROPA?.personalDataCategories?.map((category: string, idx: number) => (
                      <Badge key={idx} variant="outline" className="text-xs">{category}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="font-medium text-violet-900">Security Measures:</span>
                  <p className="text-gray-900">{generatedROPA?.securityMeasures?.length} measures defined</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="font-medium text-violet-900">Retention:</span>
                    <p className="text-gray-900">{generatedROPA?.retentionTime}</p>
                  </div>
                  <div>
                    <span className="font-medium text-violet-900">International Transfers:</span>
                    <p className="text-gray-900">{generatedROPA?.internationalTransfers}</p>
                  </div>
                </div>
              </div>
            </ScrollArea>

            <div className="flex space-x-2">
              <Button onClick={applyGeneratedROPA} size="sm" className="flex-1">
                <Check className="mr-2 h-3 w-3" />
                Apply Complete ROPA
              </Button>
              <Button onClick={regenerateROPA} size="sm" variant="outline">
                <RefreshCw className="h-3 w-3" />
              </Button>
            </div>
          </div>
        )}

        <div className="text-xs text-gray-600 p-2 bg-gray-50 rounded">
          <div className="flex items-center space-x-1 mb-1">
            <Brain className="h-3 w-3" />
            <span className="font-medium">Complete ROPA Generation</span>
          </div>
          <p>AI analyzes your input and generates a comprehensive, ready-to-review ROPA with all sections populated including security measures, retention policies, and compliance assessments.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ROPAGenerationAgent;