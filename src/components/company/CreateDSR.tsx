import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, Users, ArrowLeft, Save, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CreateDSRProps {
  onBack?: () => void;
}

const CreateDSR = ({ onBack }: CreateDSRProps) => {
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
  });

  const requestTypes = [
    { id: 'access', label: 'Data Access', description: 'Request to view personal data' },
    { id: 'rectification', label: 'Data Rectification', description: 'Request to correct personal data' },
    { id: 'erasure', label: 'Data Erasure', description: 'Request to delete personal data' },
    { id: 'portability', label: 'Data Portability', description: 'Request to transfer personal data' },
    { id: 'restriction', label: 'Restriction of Processing', description: 'Request to limit data processing' },
    { id: 'objection', label: 'Object to Processing', description: 'Request to object to data processing' },
  ];

  const dataCategories = [
    'Personal Information', 'Contact Details', 'Financial Data', 'Employment Records',
    'Marketing Data', 'Behavioral Data', 'Technical Data', 'Health Data', 'Other'
  ];

  const teamMembers = [
    'Sarah Johnson', 'Mike Davis', 'Emily Chen', 'David Wilson', 'Lisa Anderson'
  ];

  const handleDataCategoryChange = (category: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      dataCategories: checked 
        ? [...prev.dataCategories, category]
        : prev.dataCategories.filter(c => c !== category)
    }));
  };

  const handleSubmit = (action: 'save' | 'submit') => {
    console.log('DSR Form Data:', { ...formData, action });
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Request Type */}
          <Card>
            <CardHeader>
              <CardTitle>Request Type</CardTitle>
              <CardDescription>Select the type of data subject request</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {requestTypes.map((type) => (
                    <div key={type.id} className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-accent/50">
                      <RadioGroupItem value={type.id} id={type.id} className="mt-1" />
                      <div className="flex-1">
                        <Label htmlFor={type.id} className="font-medium cursor-pointer">{type.label}</Label>
                        <p className="text-sm text-muted-foreground mt-1">{type.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </RadioGroup>
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
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {dataCategories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        checked={formData.dataCategories.includes(category)}
                        onCheckedChange={(checked) => handleDataCategoryChange(category, checked as boolean)}
                      />
                      <Label htmlFor={category} className="text-sm cursor-pointer">{category}</Label>
                    </div>
                  ))}
                </div>
                {formData.dataCategories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formData.dataCategories.map((category) => (
                      <Badge key={category} variant="secondary">{category}</Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Assignment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Assignment</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Priority Level</Label>
                <Select value={formData.priority} onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
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
        </div>
      </div>
    </div>
  );
};

export default CreateDSR;