import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ConfidenceBadge } from '../ConfidenceBadge';
import { 
  Database, 
  Users, 
  Shield, 
  AlertTriangle,
  Check,
  X,
  Sparkles
} from 'lucide-react';

interface DataClassificationAgentProps {
  isActive: boolean;
  formData: any;
  onFormUpdate: (updates: any) => void;
  onArrayFieldChange: (field: string, value: string, checked: boolean) => void;
}

const DataClassificationAgent: React.FC<DataClassificationAgentProps> = ({ 
  isActive, 
  formData, 
  onFormUpdate,
  onArrayFieldChange 
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dataClassifications, setDataClassifications] = useState<any[]>([]);

  const analyzeDataCategories = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis based on form data
    setTimeout(() => {
      const mockClassifications = [
        {
          category: 'Personal Identifiers',
          dataTypes: ['Name', 'Email Address', 'Phone Number'],
          confidence: 95,
          isSpecialCategory: false,
          riskLevel: 'Medium',
          suggested: true
        },
        {
          category: 'Contact Information',
          dataTypes: ['Physical Address', 'Postal Code'],
          confidence: 88,
          isSpecialCategory: false,
          riskLevel: 'Low',
          suggested: true
        },
        {
          category: 'Transaction Data',
          dataTypes: ['Purchase History', 'Payment Information'],
          confidence: 82,
          isSpecialCategory: false,
          riskLevel: 'High',
          suggested: false
        },
        {
          category: 'Health Data',
          dataTypes: ['Medical Records', 'Health Status'],
          confidence: 65,
          isSpecialCategory: true,
          riskLevel: 'Very High',
          suggested: false
        }
      ];
      
      setDataClassifications(mockClassifications);
      setIsAnalyzing(false);
    }, 2000);
  };

  const acceptClassification = (classification: any) => {
    // Update personal data categories
    classification.dataTypes.forEach((dataType: string) => {
      if (!formData.personalDataCategories.includes(dataType)) {
        onArrayFieldChange('personalDataCategories', dataType, true);
      }
    });

    // Update special category if needed
    if (classification.isSpecialCategory && formData.specialCategoryData === 'No') {
      onFormUpdate({ specialCategoryData: 'Yes' });
    }

    // Remove from suggestions
    setDataClassifications(prev => prev.filter(c => c.category !== classification.category));
  };

  const rejectClassification = (classification: any) => {
    setDataClassifications(prev => prev.filter(c => c.category !== classification.category));
  };

  if (!isActive) {
    return (
      <Card className="opacity-60">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-sm">
            <Database className="h-4 w-4" />
            <span>Data Classification Agent</span>
            <Badge variant="outline" className="text-xs">Inactive</Badge>
          </CardTitle>
          <CardDescription className="text-xs">
            Will classify and categorize personal data types
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="border-purple-200 bg-purple-50/50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-sm">
          <Database className="h-4 w-4 text-purple-600" />
          <span>Data Classification Agent</span>
          <Badge className="bg-purple-100 text-purple-800 text-xs">Active</Badge>
        </CardTitle>
        <CardDescription className="text-xs">
          AI-powered data classification and risk assessment
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <Button 
            size="sm" 
            onClick={analyzeDataCategories}
            disabled={isAnalyzing}
            className="w-full"
          >
            {isAnalyzing ? (
              <>
                <Sparkles className="mr-2 h-3 w-3 animate-spin" />
                Analyzing Data Types...
              </>
            ) : (
              <>
                <Database className="mr-2 h-3 w-3" />
                Analyze Data Categories
              </>
            )}
          </Button>
        </div>

        {dataClassifications.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-3 w-3 text-purple-600" />
              <span className="text-xs font-medium text-purple-900">Data Classifications</span>
            </div>
            
            {dataClassifications.map((classification, index) => (
              <div key={index} className="bg-white p-3 rounded-lg border border-purple-200">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      {classification.isSpecialCategory ? (
                        <AlertTriangle className="h-3 w-3 text-red-500" />
                      ) : (
                        <Database className="h-3 w-3 text-gray-600" />
                      )}
                      <span className="text-xs font-medium">
                        {classification.category}
                      </span>
                      {classification.isSpecialCategory && (
                        <Badge variant="destructive" className="text-xs">Special Category</Badge>
                      )}
                    </div>
                    <ConfidenceBadge confidence={classification.confidence} size="sm" />
                  </div>
                  <div className="flex space-x-1">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => acceptClassification(classification)}
                      className="text-xs h-6 w-6 p-0"
                    >
                      <Check className="h-3 w-3" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => rejectClassification(classification)}
                      className="text-xs h-6 w-6 p-0"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={
                        classification.riskLevel === 'Very High' ? 'destructive' :
                        classification.riskLevel === 'High' ? 'secondary' :
                        classification.riskLevel === 'Medium' ? 'outline' : 'default'
                      }
                      className="text-xs"
                    >
                      {classification.riskLevel} Risk
                    </Badge>
                  </div>
                  
                  <div className="text-xs space-y-1">
                    <p className="font-medium text-gray-900">Data Types:</p>
                    <div className="flex flex-wrap gap-1">
                      {classification.dataTypes.map((dataType: string, idx: number) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {dataType}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-xs text-gray-600 p-2 bg-gray-50 rounded">
          <div className="flex items-center space-x-1 mb-1">
            <Database className="h-3 w-3" />
            <span className="font-medium">Smart Classification</span>
          </div>
          <p>AI analyzes your processing activity to identify personal data categories, assess risks, and detect special category data.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataClassificationAgent;