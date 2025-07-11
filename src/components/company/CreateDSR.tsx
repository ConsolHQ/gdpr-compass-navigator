import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Progress } from '@/components/ui/progress';
import { format } from 'date-fns';
import { CalendarIcon, Users, ArrowLeft, Save, Send, X, Upload, File, CheckCircle, AlertCircle, Link as LinkIcon, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMetadata } from '@/hooks/useMetadata';

interface CreateDSRProps {
  onBack?: () => void;
}

const CreateDSR = ({ onBack }: CreateDSRProps) => {
  const { getMetadataItems } = useMetadata();
  
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  
  const [formData, setFormData] = useState({
    type: '',
    requesterName: '',
    requesterEmail: '',
    requesterPhone: '',
    priority: 'medium',
    description: '',
    dataCategories: [] as string[],
    assignedTo: '',
    dueDate: undefined as Date | undefined,
    internalNotes: '',
    externalUrl: '',
  });

  // Get values from metadata
  const requestTypes = getMetadataItems('data-subject-request-type');
  const dataCategories = getMetadataItems('personal-data-categories');
  const priorityLevels = getMetadataItems('priority-levels');

  const teamMembers = [
    'Sarah Johnson', 'Mike Davis', 'Emily Chen', 'David Wilson', 'Lisa Anderson'
  ];

  const handleDataCategoryAdd = (category: string) => {
    if (!formData.dataCategories.includes(category)) {
      setFormData(prev => ({
        ...prev,
        dataCategories: [...prev.dataCategories, category]
      }));
    }
  };

  const handleDataCategoryRemove = (category: string) => {
    setFormData(prev => ({
      ...prev,
      dataCategories: prev.dataCategories.filter(c => c !== category)
    }));
  };

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

  const handleSubmit = (action: 'save' | 'submit') => {
    console.log('DSR Form Data:', { ...formData, files: uploadedFiles, action });
    // Handle form submission
    if (onBack) onBack();
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">New Data Subject Request</h1>
            <p className="text-muted-foreground">Create a new data subject request under GDPR Article 15-22</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => handleSubmit('save')}>
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button onClick={() => handleSubmit('submit')}>
            <Send className="h-4 w-4 mr-2" />
            Submit Request
          </Button>
        </div>
      </div>

      {/* Vertical Layout */}
      <div className="space-y-6">
        {/* Request Type */}
        <Card>
          <CardHeader>
            <CardTitle>Request Type</CardTitle>
            <CardDescription>Select the type of data subject request</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <Label>Request Type *</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select request type" />
                </SelectTrigger>
                <SelectContent>
                  {requestTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Requester Information */}
        <Card>
          <CardHeader>
            <CardTitle>Requester Information</CardTitle>
            <CardDescription>Details of the person making the request</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="requesterName">Full Name *</Label>
                <Input
                  id="requesterName"
                  value={formData.requesterName}
                  onChange={(e) => setFormData(prev => ({ ...prev, requesterName: e.target.value }))}
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <Label htmlFor="requesterEmail">Email Address *</Label>
                <Input
                  id="requesterEmail"
                  type="email"
                  value={formData.requesterEmail}
                  onChange={(e) => setFormData(prev => ({ ...prev, requesterEmail: e.target.value }))}
                  placeholder="Enter email address"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="requesterPhone">Phone Number</Label>
              <Input
                id="requesterPhone"
                value={formData.requesterPhone}
                onChange={(e) => setFormData(prev => ({ ...prev, requesterPhone: e.target.value }))}
                placeholder="Enter phone number"
              />
            </div>
          </CardContent>
        </Card>

        {/* Request Details */}
        <Card>
          <CardHeader>
            <CardTitle>Request Details</CardTitle>
            <CardDescription>Specific details about the data subject request</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="description">Request Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Provide a detailed description of the request..."
                rows={4}
              />
            </div>

            <div>
              <Label>Data Categories Involved</Label>
              <p className="text-sm text-muted-foreground mb-3">Select all categories of personal data that this request relates to</p>
              <Select onValueChange={handleDataCategoryAdd}>
                <SelectTrigger>
                  <SelectValue placeholder="Select data categories" />
                </SelectTrigger>
                <SelectContent>
                  {dataCategories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formData.dataCategories.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.dataCategories.map((category) => (
                    <Badge key={category} variant="secondary" className="flex items-center gap-1">
                      {category}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => handleDataCategoryRemove(category)} 
                      />
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Assignment */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Assignment & Priority</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Priority Level</Label>
                <Select value={formData.priority} onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {priorityLevels.map((priority) => (
                      <SelectItem key={priority} value={priority.toLowerCase()}>{priority}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Assign To</Label>
                <Select value={formData.assignedTo} onValueChange={(value) => setFormData(prev => ({ ...prev, assignedTo: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select team member" />
                  </SelectTrigger>
                  <SelectContent>
                    {teamMembers.map((member) => (
                      <SelectItem key={member} value={member}>{member}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.dueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.dueDate ? format(formData.dueDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.dueDate}
                    onSelect={(date) => setFormData(prev => ({ ...prev, dueDate: date }))}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
        </Card>

        {/* Internal Notes */}
        <Card>
          <CardHeader>
            <CardTitle>Internal Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.internalNotes}
              onChange={(e) => setFormData(prev => ({ ...prev, internalNotes: e.target.value }))}
              placeholder="Add internal notes for team members..."
              rows={4}
            />
          </CardContent>
        </Card>

        {/* Supporting Documents */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                File Upload
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  <Eye className="h-4 w-4" />
                </Button>
              </CardTitle>
              <CardDescription>Upload documents from your computer</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors relative">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <div className="space-y-2">
                  <p className="text-lg font-medium">Drop files here or click to browse</p>
                  <p className="text-sm text-gray-500">
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
                    <span className="text-sm text-gray-500">{uploadProgress}%</span>
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
                        <File className="h-8 w-8 text-blue-600" />
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
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
                  <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-gray-50">
                    <LinkIcon className="h-4 w-4 text-gray-500" />
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateDSR;