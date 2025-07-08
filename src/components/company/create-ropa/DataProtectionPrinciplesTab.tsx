import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save } from 'lucide-react';

interface DataProtectionPrinciplesTabProps {
  formData: any;
  setFormData: (data: any) => void;
  onBack: () => void;
  onCreateROPA: () => void;
}

const DataProtectionPrinciplesTab = ({ 
  formData, 
  setFormData, 
  onBack, 
  onCreateROPA 
}: DataProtectionPrinciplesTabProps) => {
  const principles = [
    { 
      id: 'lawfulness', 
      name: 'Lawfulness, fairness & transparency' 
    },
    { 
      id: 'purposeLimitation', 
      name: 'Purpose limitation' 
    },
    { 
      id: 'dataMinimisation', 
      name: 'Data minimisation' 
    },
    { 
      id: 'accuracy', 
      name: 'Accuracy' 
    },
    { 
      id: 'storageLimitation', 
      name: 'Storage limitation' 
    },
    { 
      id: 'integrityConfidentiality', 
      name: 'Integrity & confidentiality' 
    },
    { 
      id: 'accountability', 
      name: 'Accountability' 
    }
  ];

  const handlePrincipleChange = (principleId: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      dataProtectionPrinciples: {
        ...prev.dataProtectionPrinciples,
        [principleId]: {
          ...prev.dataProtectionPrinciples?.[principleId],
          compliance: value
        }
      }
    }));
  };

  const handleJustificationChange = (principleId: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      dataProtectionPrinciples: {
        ...prev.dataProtectionPrinciples,
        [principleId]: {
          ...prev.dataProtectionPrinciples?.[principleId],
          justification: value
        }
      }
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Protection Principles</CardTitle>
        <CardDescription>
          Assess compliance with the seven data protection principles
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {principles.map((principle) => (
          <div key={principle.id} className="space-y-4 p-4 border rounded-lg">
            <div className="space-y-2">
              <Label className="text-sm font-medium">{principle.name}</Label>
              <Select
                value={formData.dataProtectionPrinciples?.[principle.id]?.compliance || ''}
                onValueChange={(value) => handlePrincipleChange(principle.id, value)}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {formData.dataProtectionPrinciples?.[principle.id]?.compliance && (
              <div className="space-y-2">
                <Label className="text-sm">Justify</Label>
                <Textarea
                  value={formData.dataProtectionPrinciples?.[principle.id]?.justification || ''}
                  onChange={(e) => handleJustificationChange(principle.id, e.target.value)}
                  placeholder="Add justification for your compliance assessment"
                  rows={2}
                />
              </div>
            )}
          </div>
        ))}

        {/* Action buttons at the bottom */}
        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </Button>
            <Button className="bg-teal-600 hover:bg-teal-700" onClick={onCreateROPA}>
              Create ROPA
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataProtectionPrinciplesTab;