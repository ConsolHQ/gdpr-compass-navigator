import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { 
  Building2, 
  FileText, 
  Sparkles, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  Upload,
  Eye,
  RefreshCw
} from 'lucide-react';

interface ThirdPartyGenerationAgentProps {
  isActive: boolean;
  formData: any;
  onFormUpdate: (updates: any) => void;
  onGeneratedThirdPartyApply: (generatedThirdParty: any) => void;
}

const ThirdPartyGenerationAgent: React.FC<ThirdPartyGenerationAgentProps> = ({
  isActive,
  formData,
  onFormUpdate,
  onGeneratedThirdPartyApply
}) => {
  const [companyName, setCompanyName] = useState('');
  const [description, setDescription] = useState('');
  const [inputMethod, setInputMethod] = useState<'description' | 'upload'>('description');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedThirdParty, setGeneratedThirdParty] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleGenerate = async () => {
    if (!companyName.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI third-party record generation
    setTimeout(() => {
      const mockThirdParty = {
        id: `TP-${Date.now()}`,
        companyName: companyName,
        description: description,
        contactDetails: {
          website: `https://www.${companyName.toLowerCase().replace(/\s+/g, '')}.com`,
          email: `contact@${companyName.toLowerCase().replace(/\s+/g, '')}.com`,
          phone: '+1 (555) 123-4567',
          address: '123 Business Street, City, State 12345'
        },
        dataProcessing: {
          dataTypes: ['Personal Contact Information', 'Business Communication Data', 'Service Usage Data'],
          purposes: ['Service Provision', 'Customer Support', 'Performance Analytics'],
          legalBasis: 'Contract Performance (Article 6(1)(b) GDPR)',
          retentionPeriod: '3 years after contract termination',
          crossBorderTransfers: false
        },
        securityMeasures: [
          'ISO 27001 Certification',
          'End-to-end Encryption',
          'Regular Security Audits',
          'Access Control Mechanisms',
          'Data Backup and Recovery'
        ],
        compliance: {
          gdprCompliant: true,
          certifications: ['ISO 27001', 'SOC 2 Type II'],
          lastAssessment: '2024-01-15',
          riskLevel: 'Low'
        },
        contractDetails: {
          contractType: 'Data Processing Agreement',
          signedDate: '2024-01-10',
          expiryDate: '2025-01-10',
          renewalTerms: 'Automatic renewal unless terminated with 30 days notice'
        },
        aiGenerated: true,
        confidence: 0.89
      };
      
      setGeneratedThirdParty(mockThirdParty);
      setShowPreview(true);
      setIsGenerating(false);
    }, 3000);
  };

  const handleApply = () => {
    if (generatedThirdParty) {
      onGeneratedThirdPartyApply(generatedThirdParty);
      setShowPreview(false);
      setGeneratedThirdParty(null);
      setCompanyName('');
      setDescription('');
    }
  };

  const handleRegenerate = () => {
    setShowPreview(false);
    setGeneratedThirdParty(null);
    handleGenerate();
  };

  if (!isActive) {
    return (
      <Card className="opacity-50">
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-2">
            <Building2 className="h-4 w-4 text-gray-400" />
            <CardTitle className="text-sm text-gray-500">Third Party Generation Agent</CardTitle>
          </div>
          <CardDescription className="text-xs">
            Generate comprehensive third-party records and assessments (Inactive)
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="border-purple-200 bg-purple-50/30">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-2">
          <Building2 className="h-4 w-4 text-purple-600" />
          <CardTitle className="text-sm text-purple-900">Third Party Generation Agent</CardTitle>
          <Badge variant="secondary" className="text-xs">Active</Badge>
        </div>
        <CardDescription className="text-xs">
          Generate complete third-party vendor records with compliance assessments
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {!showPreview ? (
          <>
            {/* Input Method Selection */}
            <div className="flex space-x-2">
              <Button
                variant={inputMethod === 'description' ? 'default' : 'outline'}
                size="sm"
                className="flex-1"
                onClick={() => setInputMethod('description')}
              >
                <FileText className="mr-2 h-3 w-3" />
                Description
              </Button>
              <Button
                variant={inputMethod === 'upload' ? 'default' : 'outline'}
                size="sm"
                className="flex-1"
                onClick={() => setInputMethod('upload')}
              >
                <Upload className="mr-2 h-3 w-3" />
                Upload Document
              </Button>
            </div>

            {inputMethod === 'description' ? (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-gray-700">Company Name</label>
                  <Input
                    placeholder="Enter third-party company name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700">Company Description</label>
                  <Textarea
                    placeholder="Describe the company, services provided, data processing activities..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="min-h-[100px] text-xs"
                  />
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-8 w-8 text-gray-400" />
                <p className="text-sm text-gray-600 mt-2">Upload company documentation</p>
                <p className="text-xs text-gray-500">PDF, DOC, or other document formats</p>
              </div>
            )}

            <Button 
              onClick={handleGenerate}
              disabled={!companyName.trim() || isGenerating}
              className="w-full"
              size="sm"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                  Generating Third Party Record...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-3 w-3" />
                  Generate Third Party Record
                </>
              )}
            </Button>

            {isGenerating && (
              <div className="text-center py-4">
                <div className="space-y-2">
                  <Sparkles className="h-6 w-6 text-purple-600 animate-pulse mx-auto" />
                  <p className="text-xs text-purple-700">AI is analyzing company information...</p>
                  <p className="text-xs text-gray-600">
                    Creating comprehensive third-party assessment
                  </p>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-purple-900">Generated Third Party Record</span>
              <Badge variant="secondary" className="text-xs">
                {Math.round(generatedThirdParty?.confidence * 100)}% Confidence
              </Badge>
            </div>
            
            <ScrollArea className="h-64">
              <div className="space-y-3 text-xs">
                <div className="bg-white p-3 rounded border">
                  <h4 className="font-medium mb-2">Company Information</h4>
                  <p><strong>Name:</strong> {generatedThirdParty?.companyName}</p>
                  <p><strong>Website:</strong> {generatedThirdParty?.contactDetails.website}</p>
                  <p><strong>Email:</strong> {generatedThirdParty?.contactDetails.email}</p>
                </div>
                
                <div className="bg-white p-3 rounded border">
                  <h4 className="font-medium mb-2">Data Processing</h4>
                  <p><strong>Data Types:</strong> {generatedThirdParty?.dataProcessing.dataTypes.join(', ')}</p>
                  <p><strong>Legal Basis:</strong> {generatedThirdParty?.dataProcessing.legalBasis}</p>
                  <p><strong>Retention:</strong> {generatedThirdParty?.dataProcessing.retentionPeriod}</p>
                </div>
                
                <div className="bg-white p-3 rounded border">
                  <h4 className="font-medium mb-2">Compliance Status</h4>
                  <div className="flex items-center space-x-2 mb-1">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <span>GDPR Compliant</span>
                  </div>
                  <p><strong>Risk Level:</strong> {generatedThirdParty?.compliance.riskLevel}</p>
                  <p><strong>Certifications:</strong> {generatedThirdParty?.compliance.certifications.join(', ')}</p>
                </div>
              </div>
            </ScrollArea>
            
            <div className="flex space-x-2">
              <Button onClick={handleApply} size="sm" className="flex-1">
                <CheckCircle className="mr-2 h-3 w-3" />
                Apply Record
              </Button>
              <Button onClick={handleRegenerate} variant="outline" size="sm">
                <RefreshCw className="h-3 w-3" />
              </Button>
              <Button onClick={() => setShowPreview(true)} variant="outline" size="sm">
                <Eye className="h-3 w-3" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ThirdPartyGenerationAgent;