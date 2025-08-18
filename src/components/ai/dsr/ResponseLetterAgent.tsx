import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Send, Edit, Copy, Download, Eye, Sparkles, Save } from 'lucide-react';
import { ConfidenceBadge } from '../ConfidenceBadge';
import { AutoFillButton } from '../AutoFillButton';

interface ResponseLetterAgentProps {
  requestType: string;
  requesterInfo: {
    name: string;
    email: string;
  };
  discoveryResults?: {
    totalRecords: number;
    dataCategories: string[];
    sensitiveDataFound: boolean;
  };
  verificationStatus: 'verified' | 'requires_review' | 'failed';
  onLetterComplete: (letter: GeneratedLetter) => void;
}

interface GeneratedLetter {
  type: 'acknowledgment' | 'fulfillment' | 'partial_fulfillment' | 'refusal';
  subject: string;
  content: string;
  legalBasis: string[];
  attachments: string[];
  reviewRequired: boolean;
  confidence: 'high' | 'medium' | 'low';
}

export const ResponseLetterAgent: React.FC<ResponseLetterAgentProps> = ({
  requestType,
  requesterInfo,
  discoveryResults,
  verificationStatus,
  onLetterComplete
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [letterType, setLetterType] = useState<string>('fulfillment');
  const [generatedLetter, setGeneratedLetter] = useState<GeneratedLetter | null>(null);
  const [customInstructions, setCustomInstructions] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');

  const letterTypes = [
    { value: 'acknowledgment', label: 'Acknowledgment Letter', description: 'Initial receipt confirmation' },
    { value: 'fulfillment', label: 'Fulfillment Letter', description: 'Complete request fulfillment' },
    { value: 'partial_fulfillment', label: 'Partial Fulfillment', description: 'Partial response with explanation' },
    { value: 'refusal', label: 'Refusal Letter', description: 'Request refusal with legal basis' }
  ];

  const handleGenerateLetter = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock letter generation based on request details
    const mockLetter: GeneratedLetter = {
      type: letterType as any,
      subject: getLetterSubject(letterType, requestType),
      content: generateLetterContent(letterType, requesterInfo, discoveryResults, verificationStatus, customInstructions),
      legalBasis: getLegalBasis(letterType, requestType),
      attachments: getRequiredAttachments(letterType, discoveryResults),
      reviewRequired: letterType === 'refusal' || verificationStatus !== 'verified',
      confidence: getConfidenceLevel(letterType, verificationStatus, discoveryResults)
    };

    setGeneratedLetter(mockLetter);
    setEditedContent(mockLetter.content);
    setIsGenerating(false);
    onLetterComplete(mockLetter);
  };

  const getLetterSubject = (type: string, requestType: string): string => {
    switch (type) {
      case 'acknowledgment':
        return `Acknowledgment of Your ${requestType} Request`;
      case 'fulfillment':
        return `Response to Your ${requestType} Request - Data Provided`;
      case 'partial_fulfillment':
        return `Partial Response to Your ${requestType} Request`;
      case 'refusal':
        return `Response to Your ${requestType} Request - Unable to Fulfill`;
      default:
        return `Response to Your ${requestType} Request`;
    }
  };

  const generateLetterContent = (
    type: string, 
    requester: any, 
    discovery: any, 
    verification: string, 
    instructions: string
  ): string => {
    const baseContent = `Dear ${requester.name},

Thank you for your ${requestType.toLowerCase()} request received on [DATE].

`;

    switch (type) {
      case 'acknowledgment':
        return baseContent + `We acknowledge receipt of your request and are currently processing it. We will respond within 30 days as required by GDPR Article 12.

${verification !== 'verified' ? 'We may contact you to verify your identity before proceeding.' : ''}

Best regards,
Data Protection Team`;

      case 'fulfillment':
        return baseContent + `Following our investigation, we have located the following personal data:

${discovery ? `- Total records found: ${discovery.totalRecords}
- Data categories: ${discovery.dataCategories.join(', ')}` : '- Personal data as requested'}

${discovery?.sensitiveDataFound ? 'Please note that some sensitive data has been redacted to protect third parties.' : ''}

The requested data is attached to this email in a secure format.

Best regards,
Data Protection Team`;

      case 'partial_fulfillment':
        return baseContent + `We have completed our search and can provide some of the requested information.

However, we cannot provide certain data due to:
- Legal restrictions
- Third-party confidentiality
- Data retention policies

The available data is attached.

Best regards,
Data Protection Team`;

      case 'refusal':
        return baseContent + `After careful consideration, we are unable to fulfill your request for the following reasons:

- [LEGAL BASIS FOR REFUSAL]

You have the right to appeal this decision and contact our supervisory authority.

Best regards,
Data Protection Team`;

      default:
        return baseContent + 'We are processing your request and will respond shortly.';
    }
  };

  const getLegalBasis = (type: string, requestType: string): string[] => {
    const basis = ['GDPR Article 12 (Right to Information)', `GDPR Article ${getGDPRArticle(requestType)}`];
    
    if (type === 'refusal') {
      basis.push('GDPR Article 12(5) (Manifestly Unfounded)', 'GDPR Article 23 (Restrictions)');
    }
    
    return basis;
  };

  const getGDPRArticle = (requestType: string): string => {
    switch (requestType.toLowerCase()) {
      case 'data access': return '15 (Right of Access)';
      case 'data deletion': return '17 (Right to Erasure)';
      case 'data rectification': return '16 (Right to Rectification)';
      case 'data portability': return '20 (Right to Data Portability)';
      default: return '15-22 (Data Subject Rights)';
    }
  };

  const getRequiredAttachments = (type: string, discovery: any): string[] => {
    const attachments = [];
    
    if (type === 'fulfillment' || type === 'partial_fulfillment') {
      attachments.push('Personal_Data_Export.zip');
      if (discovery?.sensitiveDataFound) {
        attachments.push('Redaction_Report.pdf');
      }
    }
    
    attachments.push('Privacy_Notice.pdf', 'Appeal_Rights_Information.pdf');
    
    return attachments;
  };

  const getConfidenceLevel = (type: string, verification: string, discovery: any): 'high' | 'medium' | 'low' => {
    if (verification !== 'verified') return 'low';
    if (type === 'refusal') return 'medium';
    if (discovery?.totalRecords > 0) return 'high';
    return 'medium';
  };

  const handleSaveDraft = () => {
    if (generatedLetter) {
      const updatedLetter = { ...generatedLetter, content: editedContent };
      setGeneratedLetter(updatedLetter);
      setIsEditing(false);
      onLetterComplete(updatedLetter);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Response Letter Agent
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Generation Controls */}
        {!generatedLetter && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Letter Type</label>
              <Select value={letterType} onValueChange={setLetterType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {letterTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      <div>
                        <div className="font-medium">{type.label}</div>
                        <div className="text-xs text-muted-foreground">{type.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Custom Instructions (Optional)</label>
              <Textarea
                value={customInstructions}
                onChange={(e) => setCustomInstructions(e.target.value)}
                placeholder="Add specific instructions for letter generation..."
                rows={3}
              />
            </div>

            <AutoFillButton
              onAutoFill={handleGenerateLetter}
              confidence="high"
              description="Generates legally compliant response letter based on GDPR requirements and case specifics"
              sources={['GDPR Articles 12-22', 'Company Templates', 'Legal Precedents']}
              disabled={isGenerating}
              variant="default"
              size="default"
            >
              {isGenerating ? 'Generating Letter...' : 'Generate Response Letter'}
            </AutoFillButton>
          </div>
        )}

        {/* Generated Letter */}
        {generatedLetter && (
          <div className="space-y-4">
            {/* Letter Info */}
            <div className="bg-muted/50 p-3 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">Generated Letter</span>
                <ConfidenceBadge confidence={generatedLetter.confidence} />
              </div>
              <div className="text-sm space-y-1">
                <div><span className="font-medium">Type:</span> {letterTypes.find(t => t.value === generatedLetter.type)?.label}</div>
                <div><span className="font-medium">Subject:</span> {generatedLetter.subject}</div>
                <div><span className="font-medium">Review Required:</span> {generatedLetter.reviewRequired ? 'Yes' : 'No'}</div>
              </div>
            </div>

            {/* Letter Content */}
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="content">Letter Content</TabsTrigger>
                <TabsTrigger value="legal">Legal Basis</TabsTrigger>
                <TabsTrigger value="attachments">Attachments</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Letter Content</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(editedContent)}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                      <Edit className="h-4 w-4 mr-2" />
                      {isEditing ? 'Cancel' : 'Edit'}
                    </Button>
                  </div>
                </div>

                {isEditing ? (
                  <div className="space-y-2">
                    <Textarea
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                      rows={15}
                      className="font-mono text-sm"
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={handleSaveDraft}>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-white border rounded-lg font-mono text-sm whitespace-pre-wrap">
                    {editedContent}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="legal" className="space-y-2">
                <span className="text-sm font-medium">Legal Basis</span>
                <div className="space-y-2">
                  {generatedLetter.legalBasis.map((basis, index) => (
                    <Badge key={index} variant="outline" className="block w-full text-center p-2">
                      {basis}
                    </Badge>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="attachments" className="space-y-2">
                <span className="text-sm font-medium">Required Attachments</span>
                <div className="space-y-2">
                  {generatedLetter.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">{attachment}</span>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {/* Actions */}
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setGeneratedLetter(null)}>
                Generate New Letter
              </Button>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
                <Button>
                  <Send className="h-4 w-4 mr-2" />
                  Send Letter
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};