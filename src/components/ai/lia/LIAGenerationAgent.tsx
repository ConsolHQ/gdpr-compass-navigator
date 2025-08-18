import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
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
  Scale,
  Shield,
  Users
} from 'lucide-react';

interface LIAGenerationAgentProps {
  isActive: boolean;
  formData: any;
  onFormUpdate: (updates: any) => void;
  onGeneratedLIAApply: (generatedLIA: any) => void;
}

const LIAGenerationAgent: React.FC<LIAGenerationAgentProps> = ({ 
  isActive, 
  formData, 
  onFormUpdate,
  onGeneratedLIAApply 
}) => {
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLIA, setGeneratedLIA] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(false);

  const generateLIA = async () => {
    setIsGenerating(true);
    
    // Simulate comprehensive LIA generation
    setTimeout(() => {
      const mockGeneratedLIA = {
        // Basic Information
        activityName: 'Customer Email Marketing Campaigns',
        description: 'Sending promotional emails and newsletters to existing customers based on purchase history and engagement patterns',
        dataController: 'Marketing Department',
        assessmentDate: new Date(),
        
        // Legitimate Interest Identification
        legitimateInterest: {
          primary: 'Direct Marketing',
          specific: 'Promoting relevant products and services to existing customers to increase sales and customer engagement',
          commercial: 'Increase revenue through targeted marketing communications',
          broader: 'Maintain customer relationships and provide value through relevant offers'
        },
        
        // Processing Details
        processingDetails: {
          personalData: [
            'Customer name and contact details',
            'Purchase history and transaction data',
            'Website browsing behavior',
            'Email engagement metrics (opens, clicks)',
            'Product preferences and interests'
          ],
          dataSubjects: ['Existing customers', 'Past customers within 2 years'],
          processingActivities: [
            'Email list segmentation based on behavior',
            'Personalized content creation',
            'Automated email campaign delivery',
            'Performance tracking and analysis'
          ],
          dataRetention: '3 years from last customer interaction'
        },
        
        // Necessity Test
        necessityTest: {
          purpose: 'To communicate relevant offers and maintain customer relationships',
          necessity: 'Email marketing is necessary to achieve business growth and customer retention goals',
          alternatives: {
            considered: [
              'Generic advertising (less effective)',
              'Social media only (limited reach)',
              'Opt-in only approach (significantly reduced audience)'
            ],
            reasoning: 'Direct email marketing to existing customers is the most effective method for maintaining relationships and driving sales'
          },
          proportionality: 'Processing is limited to existing customers and focused on relevant communications'
        },
        
        // Balancing Test
        balancingTest: {
          legitimateInterestWeights: {
            commercial: 8,
            relationship: 9,
            efficiency: 7,
            total: 8.0
          },
          dataSubjectImpacts: {
            intrusion: 3,
            expectation: 2,
            sensitivity: 2,
            consequences: 2,
            total: 2.25
          },
          mitigatingFactors: [
            'Clear opt-out mechanism in every email',
            'Frequency controls to prevent spam',
            'Relevant content based on actual interests',
            'Transparent privacy policy explaining use',
            'Easy preference management system'
          ],
          outcome: 'Legitimate Interest Justified',
          reasoning: 'The commercial benefits significantly outweigh the minimal impact on data subjects, especially with comprehensive safeguards in place'
        },
        
        // Safeguards and Controls
        safeguards: [
          {
            category: 'Technical Measures',
            controls: [
              'Automated opt-out processing',
              'Preference center for granular control',
              'Email frequency capping',
              'Suppression list management',
              'Secure data encryption'
            ]
          },
          {
            category: 'Organizational Measures',
            controls: [
              'Regular review of email performance and complaints',
              'Staff training on data protection requirements',
              'Clear data retention and deletion procedures',
              'Privacy policy updates and communications',
              'Complaint handling procedures'
            ]
          },
          {
            category: 'Data Subject Rights',
            controls: [
              'Clear information about processing in privacy policy',
              'Easy opt-out mechanism in all communications',
              'Right to object prominently displayed',
              'Preference management dashboard',
              'Prompt response to data subject requests'
            ]
          }
        ],
        
        // Risk Assessment
        riskAssessment: {
          overallRisk: 'Low',
          riskFactors: [
            {
              risk: 'Reputational damage from unwanted emails',
              likelihood: 'Medium',
              impact: 'Medium',
              mitigation: 'Robust opt-out and preference systems'
            },
            {
              risk: 'Regulatory action for excessive processing',
              likelihood: 'Low',
              impact: 'High',
              mitigation: 'Regular compliance reviews and legal oversight'
            }
          ],
          residualRisk: 'Very Low - With safeguards implemented'
        },
        
        // Compliance Monitoring
        monitoring: {
          reviewFrequency: 'Quarterly',
          kpis: [
            'Opt-out rate (target: <2%)',
            'Complaint rate (target: <0.1%)',
            'Email engagement rates',
            'Data subject rights requests volume'
          ],
          responsibilities: 'Marketing Manager and DPO',
          nextReview: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) // 90 days
        },
        
        // Conclusion
        conclusion: {
          recommendation: 'Legitimate Interest is Established',
          conditions: [
            'Implement all recommended safeguards',
            'Provide clear opt-out mechanisms',
            'Regular monitoring of complaint rates',
            'Quarterly review of processing necessity'
          ],
          validityPeriod: '12 months',
          approvedBy: 'Data Protection Officer'
        }
      };
      
      setGeneratedLIA(mockGeneratedLIA);
      setShowPreview(true);
      setIsGenerating(false);
    }, 3500);
  };

  const applyGeneratedLIA = () => {
    if (generatedLIA) {
      onGeneratedLIAApply(generatedLIA);
      setShowPreview(false);
      setGeneratedLIA(null);
    }
  };

  const regenerateLIA = () => {
    setGeneratedLIA(null);
    setShowPreview(false);
    generateLIA();
  };

  if (!isActive) {
    return (
      <Card className="opacity-60">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-sm">
            <Wand2 className="h-4 w-4" />
            <span>LIA Generation Agent</span>
            <Badge variant="outline" className="text-xs">Inactive</Badge>
          </CardTitle>
          <CardDescription className="text-xs">
            Will generate complete Legitimate Interest Assessments
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="border-indigo-200 bg-indigo-50/50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-sm">
          <Wand2 className="h-4 w-4 text-indigo-600" />
          <span>LIA Generation Agent</span>
          <Badge className="bg-indigo-100 text-indigo-800 text-xs">Active</Badge>
        </CardTitle>
        <CardDescription className="text-xs">
          Generate comprehensive Legitimate Interest Assessments with balancing tests
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!showPreview ? (
          <>
            <div>
              <label className="text-xs font-medium text-gray-700 mb-2 block">
                Processing Activity Description
              </label>
              <Textarea
                placeholder="Describe the processing activity you want to assess for legitimate interest: What is the business purpose? What personal data is involved? Who benefits from this processing?..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="text-xs"
                rows={6}
              />
            </div>

            <Button 
              onClick={generateLIA}
              disabled={isGenerating || !description.trim()}
              className="w-full"
              size="sm"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="mr-2 h-3 w-3 animate-spin" />
                  Generating Complete LIA...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-3 w-3" />
                  Generate Complete LIA
                </>
              )}
            </Button>
          </>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-900">LIA Generated</span>
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
                  <span className="font-medium text-indigo-900">Activity:</span>
                  <p className="text-gray-900 mt-1">{generatedLIA?.activityName}</p>
                </div>
                
                <div>
                  <span className="font-medium text-indigo-900">Legitimate Interest:</span>
                  <p className="text-gray-900 mt-1">{generatedLIA?.legitimateInterest?.specific}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Scale className="h-3 w-3 text-gray-600" />
                  <div className="flex-1">
                    <span className="font-medium text-indigo-900">Balancing Test Result:</span>
                    <p className="text-gray-900">{generatedLIA?.balancingTest?.outcome}</p>
                  </div>
                </div>
                
                <div>
                  <span className="font-medium text-indigo-900">Data Subjects:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {generatedLIA?.processingDetails?.dataSubjects?.map((subject: string, idx: number) => (
                      <Badge key={idx} variant="outline" className="text-xs">{subject}</Badge>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-2 bg-green-50 rounded">
                    <div className="flex items-center space-x-1">
                      <span className="text-xs font-medium text-green-900">LI Weight:</span>
                      <span className="text-xs font-bold">{generatedLIA?.balancingTest?.legitimateInterestWeights?.total}/10</span>
                    </div>
                  </div>
                  <div className="p-2 bg-blue-50 rounded">
                    <div className="flex items-center space-x-1">
                      <span className="text-xs font-medium text-blue-900">DS Impact:</span>
                      <span className="text-xs font-bold">{generatedLIA?.balancingTest?.dataSubjectImpacts?.total}/10</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <span className="font-medium text-indigo-900">Safeguards:</span>
                  <p className="text-gray-900">{generatedLIA?.safeguards?.length} categories implemented</p>
                </div>
                
                <div className="p-2 bg-green-50 rounded">
                  <div className="flex items-center space-x-1">
                    <Shield className="h-3 w-3 text-green-600" />
                    <span className="text-xs font-medium text-green-900">
                      {generatedLIA?.conclusion?.recommendation}
                    </span>
                  </div>
                </div>
              </div>
            </ScrollArea>

            <div className="flex space-x-2">
              <Button onClick={applyGeneratedLIA} size="sm" className="flex-1">
                <Check className="mr-2 h-3 w-3" />
                Apply Complete LIA
              </Button>
              <Button onClick={regenerateLIA} size="sm" variant="outline">
                <RefreshCw className="h-3 w-3" />
              </Button>
            </div>
          </div>
        )}

        <div className="text-xs text-gray-600 p-2 bg-gray-50 rounded">
          <div className="flex items-center space-x-1 mb-1">
            <Brain className="h-3 w-3" />
            <span className="font-medium">Complete LIA Generation</span>
          </div>
          <p>AI creates comprehensive Legitimate Interest Assessment including necessity test, balancing analysis, safeguards implementation, and compliance monitoring.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LIAGenerationAgent;