import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  ArrowLeft, 
  Save, 
  Building,
  Shield,
  Users,
  CheckSquare,
  Globe,
  Clock,
  Lock
} from 'lucide-react';
import GeneralInfoTab from './create-ropa/GeneralInfoTab';
import PurposeTab from './create-ropa/PurposeTab';
import DataTab from './create-ropa/DataTab';
import DPIACheckTab from './create-ropa/DPIACheckTab';
import ContextTab from './create-ropa/ContextTab';
import RetentionTab from './create-ropa/RetentionTab';
import SecurityTab from './create-ropa/SecurityTab';

const CreateROPA = ({ onBack }: { onBack: () => void }) => {
  const [showDPIADialog, setShowDPIADialog] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    department: '',
    role: '',
    jointControllers: 'No',
    selectedControllers: [] as string[],
    purpose: '',
    legalBasis: '',
    dataSubjectCategories: [] as string[],
    personalDataCategories: [] as string[],
    specialCategoryData: 'No',
    specialCategoryDetails: '',
    specialCategoryGround: '',
    dpiaCheck: {} as any,
    processingReason: '',
    imSystems: [] as string[],
    vendors: [] as string[],
    internalRecipients: [] as string[],
    externalRecipients: [] as string[],
    internationalTransfers: 'No',
    transferCountries: [] as string[],
    retentionTime: '',
    retentionPeriod: '',
    retentionTrigger: '',
    retentionAction: '',
    justificationType: 'Internal',
    justificationText: '',
    legislation: '',
    securityMeasures: [] as any[]
  });

  const handleArrayFieldChange = (field: keyof typeof formData, value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...(prev[field] as string[]), value]
        : (prev[field] as string[]).filter(item => item !== value)
    }));
  };

  const addSecurityMeasure = () => {
    const newMeasure = {
      id: Date.now(),
      name: '',
      description: '',
      type: '',
      status: 'Not Started',
      imSystem: '',
      appointedTo: '',
      deadline: ''
    };
    setFormData(prev => ({
      ...prev,
      securityMeasures: [...prev.securityMeasures, newMeasure]
    }));
  };

  const updateSecurityMeasure = (id: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      securityMeasures: prev.securityMeasures.map(measure => 
        measure.id === id ? { ...measure, [field]: value } : measure
      )
    }));
  };

  const removeSecurityMeasure = (id: number) => {
    setFormData(prev => ({
      ...prev,
      securityMeasures: prev.securityMeasures.filter(measure => measure.id !== id)
    }));
  };

  const handleCreateROPA = () => {
    // Check if DPIA is recommended
    const dpiaQuestions = Object.keys(formData.dpiaCheck || {});
    const yesAnswers = dpiaQuestions.filter(q => 
      formData.dpiaCheck?.[q]?.answer === 'Yes'
    ).length;

    if (yesAnswers >= 2) {
      setShowDPIADialog(true);
    } else {
      // Create ROPA without DPIA recommendation
      console.log('ROPA created successfully');
      onBack();
    }
  };

  const handleCreateDPIA = () => {
    setShowDPIADialog(false);
    // Navigate to DPIA creation with ROPA link
    console.log('Creating DPIA linked to ROPA:', formData.name);
    // Here you would navigate to DPIA creation form
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to ROPA
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create New ROPA</h1>
            <p className="text-gray-600">Record of Processing Activities</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button className="bg-teal-600 hover:bg-teal-700" onClick={handleCreateROPA}>
            Create ROPA
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="general" className="flex items-center space-x-2">
            <Building className="h-4 w-4" />
            <span>General</span>
          </TabsTrigger>
          <TabsTrigger value="purpose" className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span>Purpose</span>
          </TabsTrigger>
          <TabsTrigger value="data" className="flex items-center space-x-2">
            <Users className="h-4 w-4" />
            <span>Data</span>
          </TabsTrigger>
          <TabsTrigger value="dpiacheck" className="flex items-center space-x-2">
            <CheckSquare className="h-4 w-4" />
            <span>DPIA Check</span>
          </TabsTrigger>
          <TabsTrigger value="context" className="flex items-center space-x-2">
            <Globe className="h-4 w-4" />
            <span>Context</span>
          </TabsTrigger>
          <TabsTrigger value="retention" className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span>Retention</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center space-x-2">
            <Lock className="h-4 w-4" />
            <span>Security</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <GeneralInfoTab 
            formData={formData} 
            setFormData={setFormData} 
            handleArrayFieldChange={handleArrayFieldChange} 
          />
        </TabsContent>

        <TabsContent value="purpose">
          <PurposeTab formData={formData} setFormData={setFormData} />
        </TabsContent>

        <TabsContent value="data">
          <DataTab 
            formData={formData} 
            setFormData={setFormData} 
            handleArrayFieldChange={handleArrayFieldChange} 
          />
        </TabsContent>

        <TabsContent value="dpiacheck">
          <DPIACheckTab formData={formData} setFormData={setFormData} />
        </TabsContent>

        <TabsContent value="context">
          <ContextTab 
            formData={formData} 
            setFormData={setFormData} 
            handleArrayFieldChange={handleArrayFieldChange} 
          />
        </TabsContent>

        <TabsContent value="retention">
          <RetentionTab formData={formData} setFormData={setFormData} />
        </TabsContent>

        <TabsContent value="security">
          <SecurityTab 
            formData={formData} 
            setFormData={setFormData}
            addSecurityMeasure={addSecurityMeasure}
            updateSecurityMeasure={updateSecurityMeasure}
            removeSecurityMeasure={removeSecurityMeasure}
          />
        </TabsContent>
      </Tabs>

      {/* DPIA Recommendation Dialog */}
      <Dialog open={showDPIADialog} onOpenChange={setShowDPIADialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>DPIA Recommended</DialogTitle>
            <DialogDescription>
              Based on your responses in the DPIA Check, a Data Protection Impact Assessment is recommended for this processing activity.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex space-x-2">
            <Button variant="outline" onClick={() => {
              setShowDPIADialog(false);
              onBack();
            }}>
              Continue without DPIA
            </Button>
            <Button onClick={handleCreateDPIA} className="bg-teal-600 hover:bg-teal-700">
              Create DPIA
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateROPA;