import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import IdentifyingLegitimateInterest from './create-lia/IdentifyingLegitimateInterest';
import ScopeDefinition from './create-lia/ScopeDefinition';
import BalanceOfInterests from './create-lia/BalanceOfInterests';
import Conclusion from './create-lia/Conclusion';

interface LIAFormData {
  // Section 1: Identifying Legitimate Interest
  name: string;
  relatedProcessingActivities: string[];
  importance: string;
  alternativeLegalBasis: string;
  alternativeDescription?: string;
  otherLegalBasis?: string;
  necessaryForOrganization: string;
  organizationPurposes?: string;
  necessaryForThirdParty: string;
  thirdPartyPurposes?: string;
  thirdPartyDescription?: string;
  legalException: string;
  selectedExceptions?: string[];

  // Section 2: Scope Definition
  interactionFrequency: string;
  relationship: string;
  dataObtainment: string;
  informedTiming: string;
  rightToObject: string;
  decisionPower: string;

  // Section 3: Balance of Interests
  dataSubjectExpectation: string;
  processingExpectation: string;
  addedValue: string;
  negativeImpact: string;
  unwarrantedHarm: string;
  prejudiceToController: string;
  prejudiceToThirdParty: string;
  dataSubjectInterest: string;
  intrusiveProcessing: string;

  // Section 4: Conclusion
  calculatedScore?: {
    interestScore: number;
    impactScore: number;
  };
  finalDecision?: string;
  decisionReason?: string;
}

interface CreateLIAProps {
  onBack: () => void;
}

const CreateLIA = ({ onBack }: CreateLIAProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<LIAFormData>({
    name: '',
    relatedProcessingActivities: [],
    importance: '',
    alternativeLegalBasis: '',
    necessaryForOrganization: '',
    necessaryForThirdParty: '',
    legalException: '',
    interactionFrequency: '',
    relationship: '',
    dataObtainment: '',
    informedTiming: '',
    rightToObject: '',
    decisionPower: '',
    dataSubjectExpectation: '',
    processingExpectation: '',
    addedValue: '',
    negativeImpact: '',
    unwarrantedHarm: '',
    prejudiceToController: '',
    prejudiceToThirdParty: '',
    dataSubjectInterest: '',
    intrusiveProcessing: '',
  });

  const steps = [
    { id: 1, title: 'Identifying Legitimate Interest', description: 'Define the processing activity and check alternatives' },
    { id: 2, title: 'Scope Definition', description: 'Define the scope and context of data processing' },
    { id: 3, title: 'Balance of Interests', description: 'Assess organizational interests vs data subject impact' },
    { id: 4, title: 'Conclusion', description: 'Review results and make final decision' },
  ];

  const updateFormData = (section: Partial<LIAFormData>) => {
    setFormData(prev => ({ ...prev, ...section }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = () => {
    console.log('Saving LIA:', formData);
    // In real app, this would save to backend
    onBack();
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <IdentifyingLegitimateInterest
            data={formData}
            updateData={updateFormData}
          />
        );
      case 2:
        return (
          <ScopeDefinition
            data={formData}
            updateData={updateFormData}
          />
        );
      case 3:
        return (
          <BalanceOfInterests
            data={formData}
            updateData={updateFormData}
          />
        );
      case 4:
        return (
          <Conclusion
            data={formData}
            updateData={updateFormData}
          />
        );
      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.importance && formData.alternativeLegalBasis && 
               formData.necessaryForOrganization && formData.necessaryForThirdParty && formData.legalException;
      case 2:
        return formData.interactionFrequency && formData.relationship && formData.dataObtainment && 
               formData.informedTiming && formData.rightToObject && formData.decisionPower;
      case 3:
        return formData.dataSubjectExpectation && formData.processingExpectation && formData.addedValue && 
               formData.negativeImpact && formData.unwarrantedHarm && formData.prejudiceToController && 
               formData.prejudiceToThirdParty && formData.dataSubjectInterest && formData.intrusiveProcessing;
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to LIA Overview
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Create Legitimate Interest Assessment</h1>
          <p className="text-muted-foreground mt-1">
            Conduct a comprehensive balancing test to assess legitimate interest
          </p>
        </div>
      </div>

      {/* Progress */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">
              Step {currentStep} of {steps.length}: {steps[currentStep - 1].title}
            </CardTitle>
            <span className="text-sm text-muted-foreground">
              {Math.round((currentStep / steps.length) * 100)}% Complete
            </span>
          </div>
          <CardDescription>
            {steps[currentStep - 1].description}
          </CardDescription>
          <Progress value={(currentStep / steps.length) * 100} className="mt-4" />
        </CardHeader>
      </Card>

      {/* Step Content */}
      {renderCurrentStep()}

      {/* Navigation */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>
            
            <div className="flex gap-2">
              {currentStep === 4 ? (
                <Button onClick={handleSave} className="flex items-center gap-2">
                  Save Assessment
                </Button>
              ) : (
                <Button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className="flex items-center gap-2"
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateLIA;