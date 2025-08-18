import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ConfidenceBadge } from '../ConfidenceBadge';
import { 
  Wand2, 
  Check,
  X,
  RefreshCw,
  Sparkles,
  Brain,
  CheckCircle,
  FileText,
  Download,
  Copy
} from 'lucide-react';

interface DocumentGenerationAgentProps {
  isActive: boolean;
  formData: any;
  onFormUpdate: (updates: any) => void;
  onGeneratedDocumentApply: (generatedDocument: any) => void;
}

const DocumentGenerationAgent: React.FC<DocumentGenerationAgentProps> = ({ 
  isActive, 
  formData, 
  onFormUpdate,
  onGeneratedDocumentApply 
}) => {
  const [documentType, setDocumentType] = useState('');
  const [requirements, setRequirements] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDocument, setGeneratedDocument] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(false);

  const documentTypes = [
    'Privacy Policy',
    'Privacy Notice',
    'Cookie Policy',
    'Data Retention Policy',
    'Data Breach Response Plan',
    'Data Subject Rights Procedure',
    'Staff Privacy Training Material',
    'Vendor Data Processing Agreement',
    'GDPR Compliance Checklist',
    'Consent Management Framework'
  ];

  const generateDocument = async () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      let mockDocument;
      
      if (documentType === 'Privacy Policy') {
        mockDocument = {
          type: 'Privacy Policy',
          title: 'Privacy Policy - TechCorp Solutions',
          version: '2.1',
          effectiveDate: new Date(),
          sections: [
            {
              title: 'Information We Collect',
              content: `We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This includes:

• Personal identifiers (name, email address, phone number)
• Account information (username, password, preferences)
• Payment information (processed securely by our payment providers)
• Communication data (support tickets, feedback, survey responses)
• Usage data (how you interact with our services, features used)

We also automatically collect certain information about your device and how you interact with our services through cookies and similar technologies.`
            },
            {
              title: 'How We Use Your Information',
              content: `We use the information we collect to:

• Provide, maintain, and improve our services
• Process transactions and send related information
• Send technical notices, updates, security alerts, and administrative messages
• Respond to your comments, questions, and provide customer service
• Communicate with you about products, services, and events
• Monitor and analyze trends, usage, and activities
• Detect, investigate, and prevent fraudulent transactions and other illegal activities
• Personalize and improve your experience

We process your personal data based on the following legal grounds under GDPR:
• Performance of a contract with you
• Our legitimate interests in operating and improving our business
• Your consent (which you may withdraw at any time)
• Compliance with legal obligations`
            },
            {
              title: 'Information Sharing and Disclosure',
              content: `We may share your information in the following circumstances:

• With service providers who perform services on our behalf
• To comply with legal obligations or respond to legal requests
• To protect our rights, privacy, safety, or property
• In connection with a merger, acquisition, or sale of assets
• With your consent or at your direction

We implement appropriate safeguards for all data sharing and do not sell your personal information to third parties for their marketing purposes.`
            },
            {
              title: 'Your Rights and Choices',
              content: `Under GDPR, you have the following rights regarding your personal data:

• Right of access - request a copy of your personal data
• Right to rectification - correct inaccurate or incomplete data
• Right to erasure - request deletion of your data in certain circumstances
• Right to restrict processing - limit how we use your data
• Right to data portability - receive your data in a portable format
• Right to object - object to processing based on legitimate interests
• Rights regarding automated decision-making and profiling

To exercise these rights, contact us at privacy@techcorp.com. We will respond within 30 days.`
            },
            {
              title: 'Data Security and Retention',
              content: `We implement appropriate technical and organizational measures to protect your personal information, including:

• Encryption of data in transit and at rest
• Regular security assessments and updates
• Access controls and authentication systems
• Staff training on data protection requirements

We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce agreements. Specific retention periods vary by data type and are detailed in our Data Retention Policy.`
            },
            {
              title: 'Contact Information',
              content: `For questions about this Privacy Policy or our privacy practices, contact us at:

Data Protection Officer
TechCorp Solutions Ltd
456 Tech Street, London, UK SW1A 1AA
Email: dpo@techcorp.com
Phone: +44 20 7123 4567

If you are not satisfied with our response, you have the right to lodge a complaint with the Information Commissioner's Office (ICO) at ico.org.uk.`
            }
          ],
          metadata: {
            wordCount: 580,
            readingTime: '3 minutes',
            complianceStandards: ['GDPR', 'UK Data Protection Act 2018'],
            lastUpdated: new Date(),
            approvalRequired: true
          }
        };
      } else if (documentType === 'Data Breach Response Plan') {
        mockDocument = {
          type: 'Data Breach Response Plan',
          title: 'Data Breach Response and Incident Management Plan',
          version: '1.3',
          effectiveDate: new Date(),
          sections: [
            {
              title: 'Immediate Response (0-72 hours)',
              content: `Upon discovering a potential data breach:

1. CONTAIN THE BREACH
• Immediately isolate affected systems
• Prevent further unauthorized access
• Preserve evidence for investigation
• Document all actions taken with timestamps

2. ASSESS THE SCOPE
• Identify what data was involved
• Determine number of data subjects affected
• Assess potential harm and risk level
• Gather initial facts and evidence

3. NOTIFICATION REQUIREMENTS
• High-risk breaches: Notify supervisory authority within 72 hours
• Notify affected individuals without undue delay if high risk to rights and freedoms
• Use breach notification templates and forms
• Maintain detailed records of breach and response actions`
            },
            {
              title: 'Investigation and Analysis',
              content: `Conduct thorough investigation to determine:

• Root cause of the breach
• Timeline of events and discovery
• Systems and data affected
• Potential impact on data subjects
• Effectiveness of existing security measures
• Whether criminal activity is suspected

Engage appropriate experts:
• IT security specialists
• Legal counsel
• External forensic investigators (if required)
• Law enforcement (if criminal activity suspected)`
            },
            {
              title: 'Communication and Notification',
              content: `REGULATORY NOTIFICATIONS:
• ICO notification within 72 hours (if high risk)
• Use ICO's online reporting tool
• Include all required information per GDPR Article 33

DATA SUBJECT NOTIFICATIONS:
• Direct notification if high risk to rights and freedoms
• Clear, plain language explaining the breach
• Include contact details for more information
• Describe measures taken to address the breach
• Recommend steps individuals can take

INTERNAL COMMUNICATIONS:
• Board/senior management notification
• Staff briefings and guidance
• Customer support team preparation`
            }
          ],
          metadata: {
            wordCount: 320,
            readingTime: '2 minutes',
            complianceStandards: ['GDPR Article 33', 'GDPR Article 34', 'ICO Guidelines'],
            lastUpdated: new Date(),
            approvalRequired: true
          }
        };
      } else {
        // Generic document structure
        mockDocument = {
          type: documentType,
          title: `${documentType} - Generated by AI`,
          version: '1.0',
          effectiveDate: new Date(),
          sections: [
            {
              title: 'Introduction',
              content: `This ${documentType.toLowerCase()} has been generated to meet GDPR compliance requirements for your organization.`
            },
            {
              title: 'Scope and Application',
              content: `This document applies to all processing activities involving personal data within the organization.`
            },
            {
              title: 'Implementation',
              content: `Specific implementation details will be customized based on your organization's requirements.`
            }
          ],
          metadata: {
            wordCount: 150,
            readingTime: '1 minute',
            complianceStandards: ['GDPR'],
            lastUpdated: new Date(),
            approvalRequired: true
          }
        };
      }
      
      setGeneratedDocument(mockDocument);
      setShowPreview(true);
      setIsGenerating(false);
    }, 3000);
  };

  const applyGeneratedDocument = () => {
    if (generatedDocument) {
      onGeneratedDocumentApply(generatedDocument);
      setShowPreview(false);
      setGeneratedDocument(null);
    }
  };

  const regenerateDocument = () => {
    setGeneratedDocument(null);
    setShowPreview(false);
    generateDocument();
  };

  if (!isActive) {
    return (
      <Card className="opacity-60">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-sm">
            <Wand2 className="h-4 w-4" />
            <span>Document Generation Agent</span>
            <Badge variant="outline" className="text-xs">Inactive</Badge>
          </CardTitle>
          <CardDescription className="text-xs">
            Will generate GDPR compliance documents
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="border-teal-200 bg-teal-50/50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-sm">
          <Wand2 className="h-4 w-4 text-teal-600" />
          <span>Document Generation Agent</span>
          <Badge className="bg-teal-100 text-teal-800 text-xs">Active</Badge>
        </CardTitle>
        <CardDescription className="text-xs">
          Generate comprehensive GDPR compliance documents and policies
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!showPreview ? (
          <>
            <div>
              <label className="text-xs font-medium text-gray-700 mb-2 block">
                Document Type
              </label>
              <Select value={documentType} onValueChange={setDocumentType}>
                <SelectTrigger className="text-xs">
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  {documentTypes.map((type) => (
                    <SelectItem key={type} value={type} className="text-xs">{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-700 mb-2 block">
                Specific Requirements
              </label>
              <Textarea
                placeholder="Describe any specific requirements, industry focus, or customizations needed for this document..."
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                className="text-xs"
                rows={4}
              />
            </div>

            <Button 
              onClick={generateDocument}
              disabled={isGenerating || !documentType}
              className="w-full"
              size="sm"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="mr-2 h-3 w-3 animate-spin" />
                  Generating Document...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-3 w-3" />
                  Generate Document
                </>
              )}
            </Button>
          </>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-900">Document Generated</span>
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
                  <FileText className="h-4 w-4 text-teal-600" />
                  <div>
                    <p className="font-medium text-teal-900">{generatedDocument?.title}</p>
                    <p className="text-gray-600">Version {generatedDocument?.version} • {generatedDocument?.metadata?.wordCount} words</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {generatedDocument?.sections?.slice(0, 3).map((section: any, idx: number) => (
                    <div key={idx} className="p-2 bg-gray-50 rounded">
                      <p className="font-medium text-gray-900 mb-1">{section.title}</p>
                      <p className="text-gray-700 text-xs line-clamp-3">
                        {section.content.substring(0, 150)}...
                      </p>
                    </div>
                  ))}
                </div>
                
                <div>
                  <p className="font-medium text-teal-900 mb-1">Compliance Standards:</p>
                  <div className="flex flex-wrap gap-1">
                    {generatedDocument?.metadata?.complianceStandards?.map((standard: string, idx: number) => (
                      <Badge key={idx} variant="outline" className="text-xs">{standard}</Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>Reading Time: {generatedDocument?.metadata?.readingTime}</span>
                  <span>Sections: {generatedDocument?.sections?.length}</span>
                </div>
              </div>
            </ScrollArea>

            <div className="flex space-x-2">
              <Button onClick={applyGeneratedDocument} size="sm" className="flex-1">
                <Check className="mr-2 h-3 w-3" />
                Add to Library
              </Button>
              <Button onClick={regenerateDocument} size="sm" variant="outline">
                <RefreshCw className="h-3 w-3" />
              </Button>
              <Button size="sm" variant="outline">
                <Download className="h-3 w-3" />
              </Button>
            </div>
          </div>
        )}

        <div className="text-xs text-gray-600 p-2 bg-gray-50 rounded">
          <div className="flex items-center space-x-1 mb-1">
            <Brain className="h-3 w-3" />
            <span className="font-medium">Smart Document Generation</span>
          </div>
          <p>AI creates comprehensive GDPR compliance documents with proper structure, legal language, and industry best practices.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentGenerationAgent;