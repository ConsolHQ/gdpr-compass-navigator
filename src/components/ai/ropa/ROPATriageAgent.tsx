import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ConfidenceBadge } from '../ConfidenceBadge';
import { 
  Brain, 
  MessageCircle, 
  Upload, 
  FileText, 
  Database,
  Shield,
  Users,
  Globe,
  Clock,
  Sparkles
} from 'lucide-react';

interface ROPATriageAgentProps {
  isActive: boolean;
  formData: any;
  onFormUpdate: (updates: any) => void;
}

const ROPATriageAgent: React.FC<ROPATriageAgentProps> = ({ 
  isActive, 
  formData, 
  onFormUpdate 
}) => {
  const [userInput, setUserInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);

  const handleAnalyzeInput = async () => {
    if (!userInput.trim()) return;
    
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const mockSuggestions = [
        {
          field: 'name',
          value: 'Customer Data Processing',
          confidence: 92,
          reason: 'Based on your description, this appears to be a customer data processing activity'
        },
        {
          field: 'department',
          value: 'Customer Service',
          confidence: 85,
          reason: 'Processing involves customer interactions and support'
        },
        {
          field: 'purpose',
          value: 'To provide customer support and maintain service quality',
          confidence: 88,
          reason: 'Primary purpose identified from processing description'
        },
        {
          field: 'legalBasis',
          value: 'Legitimate Interest',
          confidence: 78,
          reason: 'Customer service activities typically rely on legitimate interest'
        }
      ];
      
      setSuggestions(mockSuggestions);
      setIsProcessing(false);
    }, 2000);
  };

  const applySuggestion = (suggestion: any) => {
    onFormUpdate({ [suggestion.field]: suggestion.value });
    setSuggestions(suggestions.filter(s => s.field !== suggestion.field));
  };

  const handleDocumentUpload = () => {
    // TODO: Implement document upload for ROPA analysis
    console.log('Document upload for ROPA analysis');
  };

  if (!isActive) {
    return (
      <Card className="opacity-60">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-sm">
            <Brain className="h-4 w-4" />
            <span>ROPA Triage Agent</span>
            <Badge variant="outline" className="text-xs">Inactive</Badge>
          </CardTitle>
          <CardDescription className="text-xs">
            Will analyze your processing activity and suggest ROPA structure
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="border-blue-200 bg-blue-50/50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-sm">
          <Brain className="h-4 w-4 text-blue-600" />
          <span>ROPA Triage Agent</span>
          <Badge className="bg-blue-100 text-blue-800 text-xs">Active</Badge>
        </CardTitle>
        <CardDescription className="text-xs">
          Analyze your processing activity and get AI-powered ROPA suggestions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-gray-700 mb-2 block">
              Describe your data processing activity
            </label>
            <Textarea
              placeholder="e.g., We collect customer email addresses and phone numbers to provide support and send service updates..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="text-xs"
              rows={3}
            />
          </div>
          
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              onClick={handleAnalyzeInput}
              disabled={!userInput.trim() || isProcessing}
              className="flex-1"
            >
              {isProcessing ? (
                <>
                  <Sparkles className="mr-2 h-3 w-3 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <MessageCircle className="mr-2 h-3 w-3" />
                  Analyze Activity
                </>
              )}
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={handleDocumentUpload}
            >
              <Upload className="mr-2 h-3 w-3" />
              Upload Doc
            </Button>
          </div>
        </div>

        {suggestions.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-3 w-3 text-blue-600" />
              <span className="text-xs font-medium text-blue-900">AI Suggestions</span>
            </div>
            
            {suggestions.map((suggestion, index) => (
              <div key={index} className="bg-white p-3 rounded-lg border border-blue-200">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      {suggestion.field === 'name' && <FileText className="h-3 w-3 text-gray-600" />}
                      {suggestion.field === 'department' && <Database className="h-3 w-3 text-gray-600" />}
                      {suggestion.field === 'purpose' && <Shield className="h-3 w-3 text-gray-600" />}
                      {suggestion.field === 'legalBasis' && <Users className="h-3 w-3 text-gray-600" />}
                      <span className="text-xs font-medium capitalize">
                        {suggestion.field.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                    </div>
                    <ConfidenceBadge confidence={suggestion.confidence} size="sm" />
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => applySuggestion(suggestion)}
                    className="text-xs h-6"
                  >
                    Apply
                  </Button>
                </div>
                <p className="text-xs text-gray-900 font-medium mb-1">
                  {suggestion.value}
                </p>
                <p className="text-xs text-gray-600">
                  {suggestion.reason}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="text-xs text-gray-600 p-2 bg-gray-50 rounded">
          <div className="flex items-center space-x-1 mb-1">
            <Brain className="h-3 w-3" />
            <span className="font-medium">Smart Analysis</span>
          </div>
          <p>AI will analyze your input and suggest appropriate ROPA fields, departments, legal bases, and processing purposes.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ROPATriageAgent;