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
  CheckCircle,
  Mail,
  User,
  Shield
} from 'lucide-react';

interface DSRGenerationAgentProps {
  isActive: boolean;
  formData: any;
  onFormUpdate: (updates: any) => void;
  onGeneratedDSRApply: (generatedDSR: any) => void;
}

const DSRGenerationAgent: React.FC<DSRGenerationAgentProps> = ({ 
  isActive, 
  formData, 
  onFormUpdate,
  onGeneratedDSRApply 
}) => {
  const [inputMethod, setInputMethod] = useState<'description' | 'email'>('description');
  const [description, setDescription] = useState('');
  const [emailContent, setEmailContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDSR, setGeneratedDSR] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [confidenceScore, setConfidenceScore] = useState(0);

  const generateDSR = async () => {
    setIsGenerating(true);
    
    // Simulate comprehensive DSR generation
    setTimeout(() => {
      const mockGeneratedDSR = {
        // Request Classification
        type: 'Data Access',
        priority: 'medium',
        
        // Requester Information
        requesterName: 'John Smith',
        requesterEmail: 'john.smith@email.com',
        requesterPhone: '+44 20 1234 5678',
        
        // Request Details
        description: 'Request for access to all personal data held by the company including account information, transaction history, support tickets, and any third-party data sharing records.',
        dataCategories: [
          'Personal Identifiers',
          'Contact Information', 
          'Transaction Data',
          'Communication Records',
          'Account Information'
        ],
        
        // Assignment & Processing
        assignedTo: 'Sarah Johnson',
        estimatedHours: 6,
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        
        // Internal Processing Notes
        internalNotes: `AI Analysis Summary:
- Request Type: Complete data access request under GDPR Article 15
- Jurisdiction: UK/EU (based on email domain and phone format)
- Verification Required: Standard identity verification (driving license or passport)
- Systems to Search: CRM, Support System, Payment Gateway, Marketing Platform
- Estimated Processing Time: 6 hours
- Legal Review: Recommended due to comprehensive scope
- Third-party Data: Check with payment processor and support tools`,

        // Generated Response Components
        identityVerification: {
          status: 'required',
          method: 'Document verification',
          documents: ['Photo ID', 'Proof of address'],
          instructions: 'Please provide a clear photo of your driving license or passport, plus a recent utility bill.'
        },
        
        dataDiscovery: {
          systemsToSearch: [
            'Customer Database',
            'Support Ticketing System', 
            'Payment Processing System',
            'Marketing Automation Platform',
            'Analytics Platform'
          ],
          estimatedRecords: 156,
          dataTypes: [
            'Account creation and login records',
            'Personal profile information',
            'Purchase and transaction history',
            'Support communications and tickets',
            'Marketing preferences and communications',
            'Website usage and analytics data'
          ]
        },
        
        responseTemplate: {
          subject: 'Your Data Subject Access Request - Reference: DSR-2024-001',
          greeting: 'Dear John Smith,',
          body: `Thank you for your data subject access request received on ${new Date().toLocaleDateString()}. 

We are processing your request in accordance with Article 15 of the General Data Protection Regulation (GDPR).

IDENTITY VERIFICATION:
Before we can process your request, we need to verify your identity. Please provide:
- A clear photograph of your driving license or passport
- A recent utility bill or bank statement as proof of address

WHAT WE WILL PROVIDE:
Following verification, we will provide you with:
- All personal data we hold about you
- The purposes for which we process your data  
- The categories of data we process
- Details of any third parties we share your data with
- How long we retain your data
- Your rights regarding your personal data

TIMELINE:
We will respond to your request within 30 days of receiving your identity verification documents.

If you have any questions, please contact our Data Protection Officer at dpo@company.com.

Best regards,
Data Protection Team`,
          footer: 'This response was generated with AI assistance and reviewed for accuracy.'
        },
        
        complianceChecks: {
          jurisdiction: 'GDPR - Article 15',
          deadline: '30 days from identity verification',
          verificationRequired: true,
          notificationsSent: false,
          legalReviewRequired: true
        }
      };
      
      setGeneratedDSR(mockGeneratedDSR);
      setConfidenceScore(94);
      setShowPreview(true);
      setIsGenerating(false);
    }, 3500);
  };

  const applyGeneratedDSR = () => {
    if (generatedDSR) {
      onGeneratedDSRApply(generatedDSR);
      setShowPreview(false);
      setGeneratedDSR(null);
    }
  };

  const regenerateDSR = () => {
    setGeneratedDSR(null);
    setShowPreview(false);
    generateDSR();
  };

  if (!isActive) {
    return (
      <Card className="opacity-60">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-sm">
            <Wand2 className="h-4 w-4" />
            <span>DSR Generation Agent</span>
            <Badge variant="outline" className="text-xs">Inactive</Badge>
          </CardTitle>
          <CardDescription className="text-xs">
            Will generate complete DSR responses from your input
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="border-emerald-200 bg-emerald-50/50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-sm">
          <Wand2 className="h-4 w-4 text-emerald-600" />
          <span>DSR Generation Agent</span>
          <Badge className="bg-emerald-100 text-emerald-800 text-xs">Active</Badge>
        </CardTitle>
        <CardDescription className="text-xs">
          Generate complete DSR processing workflows from requests or emails
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!showPreview ? (
          <>
            <Tabs value={inputMethod} onValueChange={(value) => setInputMethod(value as 'description' | 'email')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="description" className="text-xs">Request Details</TabsTrigger>
                <TabsTrigger value="email" className="text-xs">Email/Message</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="space-y-3">
                <div>
                  <Label className="text-xs font-medium">Data Subject Request Details</Label>
                  <Textarea
                    placeholder="Describe the data subject request: What type of request is this? What data is the person asking for? Include requester details if available..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="text-xs mt-1"
                    rows={6}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="email" className="space-y-3">
                <div>
                  <Label className="text-xs font-medium">Email or Message Content</Label>
                  <Textarea
                    placeholder="Paste the complete email or message from the data subject. Include headers, full content, and any attachments described..."
                    value={emailContent}
                    onChange={(e) => setEmailContent(e.target.value)}
                    className="text-xs mt-1"
                    rows={8}
                  />
                  <p className="text-xs text-gray-600 mt-1">
                    AI will extract requester details, request type, and scope automatically
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            <Button 
              onClick={generateDSR}
              disabled={isGenerating || (!description.trim() && !emailContent.trim())}
              className="w-full"
              size="sm"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="mr-2 h-3 w-3 animate-spin" />
                  Generating Complete DSR Response...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-3 w-3" />
                  Generate Complete DSR
                </>
              )}
            </Button>
          </>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-900">DSR Generated</span>
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
                <div className="flex items-center space-x-2">
                  <User className="h-3 w-3 text-gray-600" />
                  <div className="flex-1">
                    <span className="font-medium text-emerald-900">Requester:</span>
                    <p className="text-gray-900">{generatedDSR?.requesterName} ({generatedDSR?.requesterEmail})</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <FileText className="h-3 w-3 text-gray-600" />
                  <div className="flex-1">
                    <span className="font-medium text-emerald-900">Request Type:</span>
                    <p className="text-gray-900">{generatedDSR?.type}</p>
                  </div>
                </div>
                
                <div>
                  <span className="font-medium text-emerald-900">Data Categories:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {generatedDSR?.dataCategories?.map((category: string, idx: number) => (
                      <Badge key={idx} variant="outline" className="text-xs">{category}</Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Shield className="h-3 w-3 text-gray-600" />
                  <div className="flex-1">
                    <span className="font-medium text-emerald-900">Verification:</span>
                    <p className="text-gray-900">{generatedDSR?.identityVerification?.method}</p>
                  </div>
                </div>
                
                <div>
                  <span className="font-medium text-emerald-900">Systems to Search:</span>
                  <p className="text-gray-900">{generatedDSR?.dataDiscovery?.systemsToSearch?.length} systems identified</p>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="font-medium text-emerald-900">Priority:</span>
                    <p className="text-gray-900 capitalize">{generatedDSR?.priority}</p>
                  </div>
                  <div>
                    <span className="font-medium text-emerald-900">Est. Time:</span>
                    <p className="text-gray-900">{generatedDSR?.estimatedHours}h</p>
                  </div>
                </div>
                
                <div>
                  <span className="font-medium text-emerald-900">Response Template:</span>
                  <p className="text-gray-900 bg-gray-50 p-2 rounded text-xs mt-1">
                    Subject: {generatedDSR?.responseTemplate?.subject}
                  </p>
                </div>
              </div>
            </ScrollArea>

            <div className="flex space-x-2">
              <Button onClick={applyGeneratedDSR} size="sm" className="flex-1">
                <Check className="mr-2 h-3 w-3" />
                Apply Complete DSR
              </Button>
              <Button onClick={regenerateDSR} size="sm" variant="outline">
                <RefreshCw className="h-3 w-3" />
              </Button>
            </div>
          </div>
        )}

        <div className="text-xs text-gray-600 p-2 bg-gray-50 rounded">
          <div className="flex items-center space-x-1 mb-1">
            <Brain className="h-3 w-3" />
            <span className="font-medium">Complete DSR Processing</span>
          </div>
          <p>AI analyzes the request and generates complete processing workflow including identity verification, data discovery plan, response templates, and compliance tracking.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DSRGenerationAgent;