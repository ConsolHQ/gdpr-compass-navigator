import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Save, Eye, Upload, File, CheckCircle, X, Link as LinkIcon, AlertCircle } from 'lucide-react';
import { useMetadata } from '@/hooks/useMetadata';

interface CreateDPIAProps {
  onBack: () => void;
}

const CreateDPIA = ({ onBack }: CreateDPIAProps) => {
  const { getMetadataItems } = useMetadata();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    riskLevel: '',
    assessor: '',
    dueDate: '',
    dataTypes: [] as string[],
    risks: [] as string[],
    externalUrl: '',
    notes: '',
  });

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setIsUploading(true);
    const newFiles = Array.from(files);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setUploadedFiles(prev => [...prev, ...newFiles]);
        setIsUploading(false);
        setUploadProgress(0);
      }
    }, 200);
  }, []);

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleSave = () => {
    console.log('Saving DPIA:', { ...formData, files: uploadedFiles });
    // In a real app, this would save to backend
    onBack();
  };

  const handleDataTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({ ...prev, dataTypes: [...prev.dataTypes, type] }));
    } else {
      setFormData(prev => ({ ...prev, dataTypes: prev.dataTypes.filter(t => t !== type) }));
    }
  };

  const handleRiskChange = (risk: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({ ...prev, risks: [...prev.risks, risk] }));
    } else {
      setFormData(prev => ({ ...prev, risks: prev.risks.filter(r => r !== risk) }));
    }
  };

  const dataTypeOptions = getMetadataItems('personal-data-categories');
  const riskOptions = getMetadataItems('risk-levels');

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Create New DPIA</h1>
            <p className="text-gray-600">Data Protection Impact Assessment</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save DPIA
          </Button>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Enter the basic details for your DPIA assessment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Customer Analytics Platform"
                />
              </div>
              <div>
                <Label>Risk Level</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, riskLevel: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select risk level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the processing activity requiring assessment"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="assessor">Assessor</Label>
                <Input
                  id="assessor"
                  value={formData.assessor}
                  onChange={(e) => setFormData(prev => ({ ...prev, assessor: e.target.value }))}
                  placeholder="Name of the person conducting the assessment"
                />
              </div>
              <div>
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Types & Risks */}
        <Card>
          <CardHeader>
            <CardTitle>Data Types & Risks</CardTitle>
            <CardDescription>
              Select the types of data and associated risks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="text-base font-medium">Data Types Involved</Label>
              <Select onValueChange={(value) => handleDataTypeChange(value, true)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select data types" />
                </SelectTrigger>
                <SelectContent>
                  {dataTypeOptions.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formData.dataTypes.length > 0 && (
                <div className="mt-2 space-y-2">
                  {formData.dataTypes.map((type) => (
                    <div key={type} className="flex items-center justify-between p-2 bg-muted rounded">
                      <span className="text-sm">{type}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDataTypeChange(type, false)}
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div>
              <Label className="text-base font-medium">Risk Areas</Label>
              <Select onValueChange={(value) => handleRiskChange(value, true)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select risk areas" />
                </SelectTrigger>
                <SelectContent>
                  {riskOptions.map((risk) => (
                    <SelectItem key={risk} value={risk}>{risk}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formData.risks.length > 0 && (
                <div className="mt-2 space-y-2">
                  {formData.risks.map((risk) => (
                    <div key={risk} className="flex items-center justify-between p-2 bg-muted rounded">
                      <span className="text-sm">{risk}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRiskChange(risk, false)}
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* File Upload and External Link */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>File Upload</CardTitle>
                  <CardDescription>Upload documents from your computer</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="h-10 w-10 p-0">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/40 transition-colors relative">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <div className="space-y-2">
                  <p className="text-lg font-medium">Drop files here or click to browse</p>
                  <p className="text-sm text-muted-foreground">
                    Supports PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT (Max 50MB per file)
                  </p>
                </div>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>

              {isUploading && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Uploading...</span>
                    <span className="text-sm text-muted-foreground">{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} />
                </div>
              )}

              {uploadedFiles.length > 0 && (
                <div className="mt-6 space-y-3">
                  <h4 className="font-medium">Uploaded Files</h4>
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <File className="h-8 w-8 text-primary" />
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>External Link</CardTitle>
              <CardDescription>Add a link to an external document or resource</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="externalUrl">Document URL</Label>
                <div className="flex">
                  <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-muted">
                    <LinkIcon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input
                    id="externalUrl"
                    value={formData.externalUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, externalUrl: e.target.value }))}
                    placeholder="https://example.com/document.pdf"
                    className="rounded-l-none"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm text-amber-600">
                <AlertCircle className="h-4 w-4" />
                <span>External links will be validated for accessibility</span>
              </div>
              
              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Add any additional notes about this document..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Document Preview */}
        {(uploadedFiles.length > 0 || formData.externalUrl) && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Document Preview</CardTitle>
                  <CardDescription>
                    Preview of uploaded documents and external links
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" className="h-10 w-10 p-0">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {formData.externalUrl && (
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <LinkIcon className="h-8 w-8 text-primary" />
                      <div className="flex-1">
                        <p className="font-medium">External Document</p>
                        <p className="text-sm text-muted-foreground truncate">{formData.externalUrl}</p>
                        {formData.notes && (
                          <p className="text-sm text-muted-foreground mt-1">{formData.notes}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CreateDPIA;