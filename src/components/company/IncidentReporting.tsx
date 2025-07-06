
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Save, Send, FileText, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Import step components
import IncidentDetailsStep from './incident-reporting/IncidentDetailsStep';
import IncidentOriginStep from './incident-reporting/IncidentOriginStep';
import LeakedDataStep from './incident-reporting/LeakedDataStep';
import EaseOfIdentificationStep from './incident-reporting/EaseOfIdentificationStep';
import CircumstancesStep from './incident-reporting/CircumstancesStep';
import ProjectedImpactStep from './incident-reporting/ProjectedImpactStep';
import SummaryStep from './incident-reporting/SummaryStep';

interface IncidentData {
  // Step 1: Incident Details
  incidentName: string;
  incidentId: string;
  reportedBy: string;
  submittedBy: string;
  category: string[];
  incidentDate: string;
  detectionDate: string;
  reportedDate: string;
  description: string;
  referenceUrl: string;
  documents: File[];
  
  // Step 2: Incident Origin
  origin: 'internal' | 'external' | '';
  involvedFunction: string;
  involvedVendor: string;
  privacyRole: 'controller' | 'processor' | '';
  personalDataLeaked: boolean;
  
  // Step 3: Leaked Data
  dataSubjects: Array<{
    type: string;
    numberAffected: number;
    imSystem: string;
    dataAttributes: string[];
  }>;
  dpcAnswers: Record<string, { answer: boolean; justification: string }>;
  mitigatingFactors: Record<string, { answer: boolean; justification: string }>;
  
  // Step 4: Ease of Identification
  identifiabilityLevel: number;
  identifiabilityJustification: string;
  
  // Step 5: Circumstances
  circumstances: Record<string, { answer: boolean; justification: string }>;
  
  // Step 6: Projected Impact
  autoScore: number;
  severity: 'Low' | 'Medium' | 'High';
  scoreAgreed: boolean;
  manualScore: number;
  scoreJustification: string;
  
  // Step 7: Summary
  summary: string;
  nextSteps: string;
  internalNotes: string;
}

const IncidentReporting = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [incidentData, setIncidentData] = useState<IncidentData>({
    incidentName: '',
    incidentId: `INC-${Date.now()}`,
    reportedBy: '',
    submittedBy: '',
    category: [],
    incidentDate: '',
    detectionDate: '',
    reportedDate: new Date().toISOString().split('T')[0],
    description: '',
    referenceUrl: '',
    documents: [],
    origin: '',
    involvedFunction: '',
    involvedVendor: '',
    privacyRole: '',
    personalDataLeaked: false,
    dataSubjects: [],
    dpcAnswers: {},
    mitigatingFactors: {},
    identifiabilityLevel: 0.5,
    identifiabilityJustification: '',
    circumstances: {},
    autoScore: 0,
    severity: 'Low',
    scoreAgreed: true,
    manualScore: 0,
    scoreJustification: '',
    summary: '',
    nextSteps: '',
    internalNotes: ''
  });

  const { toast } = useToast();

  const steps = [
    { id: 1, title: 'Incident Details', description: 'Basic incident information' },
    { id: 2, title: 'Incident Origin', description: 'Source and personal data status' },
    { id: 3, title: 'Leaked Data', description: 'Affected data and systems' },
    { id: 4, title: 'Ease of Identification', description: 'Identifiability assessment' },
    { id: 5, title: 'Circumstances', description: 'Context and impact factors' },
    { id: 6, title: 'Projected Impact', description: 'Risk assessment and scoring' },
    { id: 7, title: 'Summary', description: 'Final review and submission' }
  ];

  const updateIncidentData = (updates: Partial<IncidentData>) => {
    setIncidentData(prev => ({ ...prev, ...updates }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(incidentData.incidentName && incidentData.incidentDate && incidentData.detectionDate);
      case 2:
        return !!(incidentData.origin && incidentData.privacyRole);
      case 3:
        return incidentData.personalDataLeaked ? incidentData.dataSubjects.length > 0 : true;
      case 4:
        return incidentData.identifiabilityLevel > 0;
      case 5:
        return Object.keys(incidentData.circumstances).length > 0;
      case 6:
        return true; // Always valid as it's calculated
      case 7:
        return !!incidentData.summary;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields before proceeding.",
        variant: "destructive"
      });
      return;
    }

    // Skip to summary if no personal data leaked
    if (currentStep === 2 && !incidentData.personalDataLeaked) {
      setCurrentStep(7);
    } else {
      setCurrentStep(prev => Math.min(prev + 1, 7));
    }
  };

  const handlePrevious = () => {
    // Skip back from summary if no personal data leaked
    if (currentStep === 7 && !incidentData.personalDataLeaked) {
      setCurrentStep(2);
    } else {
      setCurrentStep(prev => Math.max(prev - 1, 1));
    }
  };

  const handleSaveDraft = () => {
    console.log('Saving draft:', incidentData);
    toast({
      title: "Draft Saved",
      description: "Your incident report has been saved as a draft."
    });
  };

  const handleExportPDF = () => {
    // Create comprehensive PDF content
    const pdfContent = {
      title: `GDPR Incident Report - ${incidentData.incidentName || incidentData.incidentId}`,
      metadata: {
        incidentId: incidentData.incidentId,
        reportedDate: incidentData.reportedDate,
        submittedBy: incidentData.submittedBy
      },
      sections: [
        { title: 'Incident Details', content: incidentData },
        { title: 'Risk Assessment', content: `Severity: ${incidentData.severity}, Score: ${incidentData.autoScore}` },
        { title: 'Summary', content: incidentData.summary }
      ]
    };
    
    console.log('Exporting PDF:', pdfContent);
    toast({
      title: "PDF Export",
      description: "Your incident report has been exported as PDF."
    });
  };

  const handleSubmit = () => {
    if (!validateStep(7)) {
      toast({
        title: "Validation Error",
        description: "Please complete all required fields before submitting.",
        variant: "destructive"
      });
      return;
    }

    console.log('Submitting incident:', incidentData);
    toast({
      title: "Incident Submitted",
      description: "Your incident report has been submitted successfully."
    });
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <IncidentDetailsStep
            data={incidentData}
            onUpdate={updateIncidentData}
          />
        );
      case 2:
        return (
          <IncidentOriginStep
            data={incidentData}
            onUpdate={updateIncidentData}
          />
        );
      case 3:
        return (
          <LeakedDataStep
            data={incidentData}
            onUpdate={updateIncidentData}
          />
        );
      case 4:
        return (
          <EaseOfIdentificationStep
            data={incidentData}
            onUpdate={updateIncidentData}
          />
        );
      case 5:
        return (
          <CircumstancesStep
            data={incidentData}
            onUpdate={updateIncidentData}
          />
        );
      case 6:
        return (
          <ProjectedImpactStep
            data={incidentData}
            onUpdate={updateIncidentData}
          />
        );
      case 7:
        return (
          <SummaryStep
            data={incidentData}
            onUpdate={updateIncidentData}
          />
        );
      default:
        return null;
    }
  };

  const progress = (currentStep / 7) * 100;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Report GDPR Incident</h1>
          <p className="text-gray-600 mt-1">
            Structured incident reporting compliant with GDPR Articles 33/34
          </p>
        </div>
        <Badge variant="outline" className="text-sm">
          <AlertTriangle className="w-4 h-4 mr-1" />
          Draft
        </Badge>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Step {currentStep} of 7</span>
              <span className="text-sm text-gray-600">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="w-full" />
            <div className="flex items-center space-x-2">
              <span className="text-lg font-semibold">{steps[currentStep - 1].title}</span>
              <span className="text-gray-600">— {steps[currentStep - 1].description}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      <Card>
        <CardContent className="pt-6">
          {renderCurrentStep()}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={handleSaveDraft}
          >
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          {currentStep < 7 ? (
            <Button onClick={handleNext}>
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleExportPDF}>
                <FileText className="w-4 h-4 mr-2" />
                Export PDF
              </Button>
              <Button onClick={handleSubmit}>
                <Send className="w-4 h-4 mr-2" />
                Submit Report
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IncidentReporting;
