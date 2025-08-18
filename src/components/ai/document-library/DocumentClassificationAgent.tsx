import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ConfidenceBadge } from '../ConfidenceBadge';
import { 
  Tags, 
  FileText,
  Upload,
  Check,
  X,
  Brain,
  Sparkles,
  Folder,
  Calendar,
  Shield
} from 'lucide-react';

interface DocumentClassificationAgentProps {
  isActive: boolean;
  onClassificationResult: (result: any) => void;
}

const DocumentClassificationAgent: React.FC<DocumentClassificationAgentProps> = ({ 
  isActive, 
  onClassificationResult 
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedDocument, setUploadedDocument] = useState<File | null>(null);
  const [classificationResult, setClassificationResult] = useState<any>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedDocument(file);
      setClassificationResult(null);
    }
  };

  const analyzeDocument = async () => {
    if (!uploadedDocument) return;
    
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const result = {
        documentType: 'Privacy Policy',
        confidence: 'high',
        categories: [
          { name: 'Privacy & Data Protection', confidence: 0.95 },
          { name: 'Legal Compliance', confidence: 0.88 },
          { name: 'Customer Facing', confidence: 0.92 }
        ],
        tags: [
          { name: 'GDPR', confidence: 0.96, color: 'blue' },
          { name: 'Data Processing', confidence: 0.91, color: 'green' },
          { name: 'Cookie Policy', confidence: 0.85, color: 'purple' },
          { name: 'Data Rights', confidence: 0.89, color: 'orange' },
          { name: 'Privacy Notice', confidence: 0.93, color: 'red' }
        ],
        metadata: {
          language: 'English',
          jurisdiction: 'UK/EU',
          industry: 'Technology',
          documentLength: 'Long (2,500+ words)',
          readingLevel: 'Professional',
          lastUpdated: 'Recent (within 6 months)'
        },
        complianceAreas: [
          { area: 'GDPR Article 13 (Information to be provided)', status: 'Compliant', confidence: 0.94 },
          { area: 'GDPR Article 14 (Information where data not obtained from data subject)', status: 'Partially Compliant', confidence: 0.76 },
          { area: 'GDPR Article 7 (Conditions for consent)', status: 'Compliant', confidence: 0.91 },
          { area: 'Cookie Law Compliance', status: 'Needs Review', confidence: 0.65 }
        ],
        suggestedActions: [
          'Review Article 14 compliance requirements',
          'Update cookie consent mechanisms',
          'Add retention period details',
          'Include DPO contact information'
        ],
        fileInfo: {
          name: uploadedDocument.name,
          size: uploadedDocument.size,
          type: uploadedDocument.type,
          analyzedAt: new Date()
        }
      };
      
      setClassificationResult(result);
      setIsAnalyzing(false);
      onClassificationResult(result);
    }, 2500);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'compliant': return 'text-green-600 bg-green-50';
      case 'partially compliant': return 'text-yellow-600 bg-yellow-50';
      case 'needs review': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTagColor = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-800',
      green: 'bg-green-100 text-green-800',
      purple: 'bg-purple-100 text-purple-800',
      orange: 'bg-orange-100 text-orange-800',
      red: 'bg-red-100 text-red-800'
    };
    return colors[color as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (!isActive) {
    return (
      <Card className="opacity-60">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-sm">
            <Tags className="h-4 w-4" />
            <span>Document Classification Agent</span>
            <Badge variant="outline" className="text-xs">Inactive</Badge>
          </CardTitle>
          <CardDescription className="text-xs">
            Will analyze and classify uploaded documents
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="border-orange-200 bg-orange-50/50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-sm">
          <Tags className="h-4 w-4 text-orange-600" />
          <span>Document Classification Agent</span>
          <Badge className="bg-orange-100 text-orange-800 text-xs">Active</Badge>
        </CardTitle>
        <CardDescription className="text-xs">
          AI-powered document analysis, classification, and compliance checking
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!classificationResult ? (
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-gray-700 mb-2 block">
                Upload Document for Analysis
              </label>
              <Input
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileUpload}
                className="text-xs"
              />
              {uploadedDocument && (
                <div className="flex items-center space-x-2 mt-2 text-xs text-green-700">
                  <FileText className="h-3 w-3" />
                  <span>{uploadedDocument.name}</span>
                </div>
              )}
            </div>

            <Button 
              onClick={analyzeDocument}
              disabled={isAnalyzing || !uploadedDocument}
              className="w-full"
              size="sm"
            >
              {isAnalyzing ? (
                <>
                  <Sparkles className="mr-2 h-3 w-3 animate-spin" />
                  Analyzing Document...
                </>
              ) : (
                <>
                  <Tags className="mr-2 h-3 w-3" />
                  Classify Document
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-medium text-orange-900">Document Analyzed</span>
                <ConfidenceBadge confidence="ai-generated" size="sm" />
              </div>
            </div>

            {/* Document Type & Categories */}
            <div className="bg-white p-3 rounded-lg border border-orange-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Document Type</span>
                <Badge variant="outline" className="text-xs">
                  {classificationResult.documentType}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <span className="text-xs font-medium text-orange-900">Categories</span>
                {classificationResult.categories.map((category: any, index: number) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-xs">{category.name}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-1">
                        <div 
                          className="bg-orange-600 h-1 rounded-full" 
                          style={{ width: `${category.confidence * 100}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium">{Math.round(category.confidence * 100)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <span className="text-xs font-medium text-orange-900">AI Generated Tags</span>
              <div className="flex flex-wrap gap-1">
                {classificationResult.tags.map((tag: any, index: number) => (
                  <Badge 
                    key={index} 
                    className={`text-xs ${getTagColor(tag.color)}`}
                  >
                    {tag.name} ({Math.round(tag.confidence * 100)}%)
                  </Badge>
                ))}
              </div>
            </div>

            {/* Compliance Areas */}
            <div className="space-y-2">
              <span className="text-xs font-medium text-orange-900">Compliance Analysis</span>
              <div className="space-y-1">
                {classificationResult.complianceAreas.map((area: any, index: number) => (
                  <div key={index} className={`p-2 rounded text-xs ${getStatusColor(area.status)}`}>
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{area.area}</span>
                      <div className="flex items-center space-x-2">
                        <span>{area.status}</span>
                        <span>({Math.round(area.confidence * 100)}%)</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggested Actions */}
            <div className="space-y-2">
              <span className="text-xs font-medium text-orange-900">Suggested Actions</span>
              <div className="bg-blue-50 border border-blue-200 rounded p-2">
                {classificationResult.suggestedActions.map((action: string, index: number) => (
                  <div key={index} className="flex items-start space-x-2 text-xs mb-1">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span className="text-blue-900">{action}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-2">
              <Button size="sm" className="flex-1">
                <Check className="mr-2 h-3 w-3" />
                Apply Classification
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => {
                  setClassificationResult(null);
                  setUploadedDocument(null);
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        )}

        <div className="text-xs text-gray-600 p-2 bg-gray-50 rounded">
          <div className="flex items-center space-x-1 mb-1">
            <Brain className="h-3 w-3" />
            <span className="font-medium">Smart Document Analysis</span>
          </div>
          <p>AI analyzes document content, identifies compliance areas, suggests tags, and provides actionable recommendations.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentClassificationAgent;