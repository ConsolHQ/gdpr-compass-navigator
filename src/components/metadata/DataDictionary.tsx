import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Database, 
  Plus, 
  Search, 
  Shield, 
  Users, 
  Calendar, 
  Tag, 
  Link,
  Upload,
  Merge,
  AlertTriangle
} from 'lucide-react';
import { ConfidenceBadge } from '@/components/ai/ConfidenceBadge';
import { SourceChip } from '@/components/ai/SourceChip';
import { AutoFillButton } from '@/components/ai/AutoFillButton';

interface DataField {
  id: string;
  name: string;
  type: 'personal' | 'special-category' | 'pseudonymous' | 'anonymous';
  category: string;
  description: string;
  sensitivity: 'low' | 'medium' | 'high' | 'critical';
  retention: string;
  purpose: string[];
  linkedActivities: string[];
  detectedAt: Date;
  confidence: 'high' | 'medium' | 'low';
  sources: Array<{
    type: 'data-dictionary' | 'gdpr-article' | 'policy-template' | 'previous-dpia' | 'legal-basis' | 'company-policy';
    reference: string;
    description?: string;
  }>;
}

export const DataDictionary: React.FC = () => {
  const [fields, setFields] = useState<DataField[]>([
    {
      id: '1',
      name: 'email_address',
      type: 'personal',
      category: 'Contact Information',
      description: 'User email address for communication',
      sensitivity: 'medium',
      retention: '2 years after account closure',
      purpose: ['Communication', 'Account Management'],
      linkedActivities: ['User Registration', 'Marketing Communications'],
      detectedAt: new Date('2024-01-15'),
      confidence: 'high',
      sources: [
        { type: 'data-dictionary', reference: 'Contact Schema v2.1' },
        { type: 'gdpr-article', reference: 'Article 6(1)(b) - Contract' }
      ]
    },
    {
      id: '2',
      name: 'medical_diagnosis',
      type: 'special-category',
      category: 'Health Data',
      description: 'Patient medical diagnosis information',
      sensitivity: 'critical',
      retention: '10 years as per medical records law',
      purpose: ['Healthcare Provision'],
      linkedActivities: ['Patient Care', 'Medical Records'],
      detectedAt: new Date('2024-01-20'),
      confidence: 'medium',
      sources: [
        { type: 'gdpr-article', reference: 'Article 9(2)(h) - Health Care' },
        { type: 'company-policy', reference: 'Medical Data Handling Policy' }
      ]
    }
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [duplicateDetections, setDuplicateDetections] = useState([
    { 
      field1: 'email_address', 
      field2: 'user_email', 
      confidence: 0.89, 
      suggestion: 'email_address' 
    }
  ]);

  const filteredFields = fields.filter(field => {
    const matchesSearch = field.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         field.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || field.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getSensitivityColor = (sensitivity: string) => {
    switch (sensitivity) {
      case 'critical': return 'bg-red-50 text-red-700 border-red-200';
      case 'high': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'medium': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'low': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'special-category': return 'bg-red-50 text-red-700 border-red-200';
      case 'personal': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'pseudonymous': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'anonymous': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Data Dictionary</h1>
          <p className="text-muted-foreground">Manage your data fields and their classifications</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import Schema
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Field
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add Data Field</DialogTitle>
              </DialogHeader>
              <CreateFieldForm onClose={() => setIsCreateDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Duplicate Detections */}
      {duplicateDetections.length > 0 && (
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-800">
              <Merge className="h-5 w-5" />
              Duplicate Fields Detected
            </CardTitle>
          </CardHeader>
          <CardContent>
            {duplicateDetections.map((detection, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white rounded-md">
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className={getSensitivityColor('medium')}>
                    {Math.round(detection.confidence * 100)}% match
                  </Badge>
                  <span className="text-sm">
                    <code className="bg-muted px-1 rounded">{detection.field1}</code>
                    {' '} and {' '}
                    <code className="bg-muted px-1 rounded">{detection.field2}</code>
                    {' '} appear to be duplicates
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    Keep Separate
                  </Button>
                  <Button size="sm">
                    Merge as "{detection.suggestion}"
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="fields" className="space-y-4">
        <TabsList>
          <TabsTrigger value="fields">Data Fields</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="mappings">ROPA Mappings</TabsTrigger>
        </TabsList>

        <TabsContent value="fields" className="space-y-4">
          {/* Filters */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search fields..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="personal">Personal Data</SelectItem>
                <SelectItem value="special-category">Special Category</SelectItem>
                <SelectItem value="pseudonymous">Pseudonymous</SelectItem>
                <SelectItem value="anonymous">Anonymous</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Fields Table */}
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Field Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Sensitivity</TableHead>
                  <TableHead>Purpose</TableHead>
                  <TableHead>Linked Activities</TableHead>
                  <TableHead>AI Classification</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFields.map((field) => (
                  <TableRow key={field.id}>
                    <TableCell>
                      <div>
                        <code className="font-mono text-sm">{field.name}</code>
                        <p className="text-xs text-muted-foreground mt-1">{field.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getTypeColor(field.type)}>
                        {field.type.replace('-', ' ').toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getSensitivityColor(field.sensitivity)}>
                        {field.sensitivity.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {field.purpose.map((purpose, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {purpose}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          {field.linkedActivities.length} linked
                        </span>
                        <Button size="sm" variant="ghost">
                          <Link className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <ConfidenceBadge confidence={field.confidence} size="sm" />
                        <div className="flex flex-wrap gap-1">
                          {field.sources.slice(0, 2).map((source, index) => (
                            <SourceChip key={index} source={source} size="sm" />
                          ))}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>Data Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Manage data field categories and their mappings.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mappings">
          <Card>
            <CardHeader>
              <CardTitle>ROPA Activity Mappings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">View which data fields are linked to ROPA processing activities.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const CreateFieldForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fieldName">Field Name</Label>
          <Input id="fieldName" placeholder="e.g., email_address" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="fieldType">Data Type</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="personal">Personal Data</SelectItem>
              <SelectItem value="special-category">Special Category</SelectItem>
              <SelectItem value="pseudonymous">Pseudonymous</SelectItem>
              <SelectItem value="anonymous">Anonymous</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" placeholder="Describe this data field..." />
        <div className="flex justify-end">
          <AutoFillButton onAutoFill={async () => console.log('Auto-fill description')} />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button>Create Field</Button>
      </div>
    </div>
  );
};