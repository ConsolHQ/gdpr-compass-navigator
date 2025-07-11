import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Upload, 
  FileText, 
  ArrowLeft, 
  Eye, 
  Download, 
  Save,
  AlertCircle,
  CheckCircle,
  X
} from 'lucide-react';

interface TemplateData {
  name: string;
  description: string;
  department: string;
  role: string;
  legalBasis: string;
  dataSubjects: string[];
  personalDataCategories: string[];
  purposes: string;
  retentionPeriod: string;
  securityMeasures: string[];
}

interface ROPATemplateImportProps {
  onBack: () => void;
  onImport: (templateData: TemplateData) => void;
}

const ROPATemplateImport = ({ onBack, onImport }: ROPATemplateImportProps) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [previewData, setPreviewData] = useState<TemplateData | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Mock template data for preview
  const mockTemplateData: TemplateData = {
    name: 'Customer Support Operations',
    description: 'Processing of customer inquiries and support ticket management',
    department: 'Customer Service',
    role: 'Controller',
    legalBasis: 'Contract',
    dataSubjects: ['Customers', 'Potential Customers'],
    personalDataCategories: ['Contact Information', 'Support History', 'Transaction Data'],
    purposes: 'Provide customer support services and resolve inquiries',
    retentionPeriod: '3 years after last contact',
    securityMeasures: ['Access Controls', 'Encryption', 'Audit Logging']
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      processTemplate(file);
    }
  };

  const processTemplate = async (file: File) => {
    setIsProcessing(true);
    setProcessingProgress(0);
    setValidationErrors([]);

    // Simulate processing
    const intervals = [20, 40, 60, 80, 100];
    for (const progress of intervals) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setProcessingProgress(progress);
    }

    // Mock validation
    const errors: string[] = [];
    if (file.name.includes('invalid')) {
      errors.push('Invalid file format. Please upload a valid ROPA template.');
    }
    if (file.size > 5 * 1024 * 1024) {
      errors.push('File size too large. Maximum size is 5MB.');
    }

    if (errors.length === 0) {
      setPreviewData(mockTemplateData);
    } else {
      setValidationErrors(errors);
    }

    setIsProcessing(false);
  };

  const handleImportTemplate = () => {
    if (previewData) {
      onImport(previewData);
    }
  };

  const resetUpload = () => {
    setUploadedFile(null);
    setPreviewData(null);
    setValidationErrors([]);
    setProcessingProgress(0);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Templates
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Import ROPA Template</h1>
            <p className="text-gray-600">Upload and preview your ROPA template before importing</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle>Upload Template File</CardTitle>
            <CardDescription>
              Upload your ROPA template file. Supported formats: Excel (.xlsx), CSV (.csv)
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!uploadedFile ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <Label htmlFor="template-upload" className="cursor-pointer">
                  <span className="mt-2 block text-lg font-medium text-gray-900">
                    Click to upload template file
                  </span>
                  <span className="mt-1 block text-sm text-gray-500">
                    Excel (.xlsx) or CSV (.csv) up to 5MB
                  </span>
                </Label>
                <Input
                  id="template-upload"
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-8 w-8 text-blue-500" />
                    <div>
                      <p className="font-medium">{uploadedFile.name}</p>
                      <p className="text-sm text-gray-500">
                        {(uploadedFile.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={resetUpload}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {isProcessing && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Processing template...</span>
                      <span className="text-sm text-gray-500">{processingProgress}%</span>
                    </div>
                    <Progress value={processingProgress} className="w-full" />
                  </div>
                )}

                {validationErrors.length > 0 && (
                  <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                      <span className="font-medium text-red-800">Validation Errors</span>
                    </div>
                    <ul className="list-disc list-inside space-y-1">
                      {validationErrors.map((error, index) => (
                        <li key={index} className="text-sm text-red-700">{error}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Preview Section */}
        {previewData && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Template Preview</span>
                  </CardTitle>
                  <CardDescription>
                    Review the imported template data before saving
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <Eye className="mr-2 h-4 w-4" />
                    Preview Details
                  </Button>
                  <Button onClick={handleImportTemplate}>
                    <Save className="mr-2 h-4 w-4" />
                    Import Template
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Processing Activity</Label>
                  <p className="mt-1 font-medium">{previewData.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Department</Label>
                  <p className="mt-1">{previewData.department}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Role</Label>
                  <Badge variant="outline">{previewData.role}</Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Legal Basis</Label>
                  <Badge variant="outline">{previewData.legalBasis}</Badge>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-500">Description</Label>
                <p className="mt-1 text-gray-700">{previewData.description}</p>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-500">Data Subjects</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {previewData.dataSubjects.map((subject, index) => (
                    <Badge key={index} variant="secondary">{subject}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-500">Personal Data Categories</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {previewData.personalDataCategories.map((category, index) => (
                    <Badge key={index} variant="outline">{category}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-500">Processing Purpose</Label>
                <p className="mt-1 text-gray-700">{previewData.purposes}</p>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-500">Security Measures</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {previewData.securityMeasures.map((measure, index) => (
                    <Badge key={index} variant="outline">{measure}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-500">Retention Period</Label>
                <p className="mt-1 text-gray-700">{previewData.retentionPeriod}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ROPATemplateImport;