import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Database, 
  ChevronDown, 
  ChevronRight, 
  Plus, 
  Upload, 
  Download, 
  Edit, 
  Trash2,
  Search
} from 'lucide-react';

interface MetadataCategory {
  id: string;
  name: string;
  items: string[];
  count: number;
}

const MetadataSettings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set());
  const [showImportDialog, setShowImportDialog] = useState(false);

  const [metadataCategories, setMetadataCategories] = useState<MetadataCategory[]>([
    { id: 'agreement-role', name: 'Agreement role', items: ['Controller', 'Processor', 'Joint Controller', 'Sub-processor', 'Third Party'], count: 5 },
    { id: 'category', name: 'Category', items: [], count: 42 },
    { id: 'consequence', name: 'Consequence', items: [], count: 83 },
    { id: 'control-requirement-status', name: 'Control requirement status', items: ['Not Started', 'In Progress', 'Completed'], count: 3 },
    { id: 'cost-currency', name: 'Cost (currency)', items: ['USD', 'EUR', 'GBP'], count: 3 },
    { id: 'cost-frequency', name: 'Cost (frequency)', items: ['One-time', 'Monthly', 'Quarterly', 'Annually'], count: 4 },
    { id: 'country', name: 'Country', items: [], count: 203 },
    { id: 'data-access-type', name: 'Data Access Type', items: ['Read', 'Write'], count: 2 },
    { id: 'data-classification', name: 'Data classification', items: ['Public', 'Internal', 'Confidential', 'Restricted', 'Personal', 'Sensitive Personal', 'Special Category', 'Criminal', 'Health'], count: 9 },
    { id: 'data-disclosure-type', name: 'Data disclosure type', items: [], count: 8 },
    { id: 'data-subject-request-status', name: 'Data subject request status', items: ['Received', 'In Review', 'Approved', 'Rejected'], count: 4 },
    { id: 'data-subject-request-type', name: 'Data subject request type', items: ['Access', 'Rectification', 'Erasure', 'Restriction', 'Portability', 'Object', 'Automated Decision Making', 'Consent Withdrawal', 'Complaint', 'Other'], count: 10 },
    { id: 'data-transfer-format', name: 'Data transfer format', items: ['API', 'File Transfer', 'Database Sync'], count: 3 },
    { id: 'data-transfer-mechanism', name: 'Data transfer mechanism', items: [], count: 21 },
    { id: 'employee-function', name: 'Employee function', items: [], count: 73 },
    { id: 'incident-category', name: 'Incident category', items: [], count: 26 },
    { id: 'incident-status', name: 'Incident status', items: [], count: 10 },
    { id: 'information-management-system-status', name: 'Information management system status', items: ['Active', 'Inactive', 'Retired', 'Under Development'], count: 4 },
    { id: 'information-management-system-type', name: 'Information management system type', items: ['CRM', 'ERP', 'Database'], count: 3 },
    { id: 'justification', name: 'Justification', items: [], count: 15 },
    { id: 'legal-basis', name: 'Legal basis', items: ['Consent', 'Contract', 'Legal Obligation', 'Vital Interests', 'Public Task', 'Legitimate Interests', 'Explicit Consent'], count: 7 },
    { id: 'legal-ground', name: 'Legal ground', items: [], count: 26 },
    { id: 'legal-template-type', name: 'Legal template type', items: [], count: 10 },
    { id: 'material-category', name: 'Material category', items: [], count: 0 },
    { id: 'mitigation', name: 'Mitigation', items: ['Technical', 'Organizational'], count: 2 },
    { id: 'mitigation-status', name: 'Mitigation status', items: ['Not Started', 'In Progress', 'Completed', 'On Hold'], count: 4 },
    { id: 'policy-type', name: 'Policy Type', items: ['Privacy Policy', 'Cookie Policy', 'Terms of Service', 'Data Processing Agreement'], count: 4 },
    { id: 'risk-category', name: 'Risk category', items: [], count: 28 },
    { id: 'risk-handling-method', name: 'Risk handling method', items: [], count: 8 },
    { id: 'sector', name: 'Sector', items: [], count: 22 },
    { id: 'statuses', name: 'Statuses', items: ['Active', 'Inactive', 'Draft'], count: 3 },
    { id: 'tag', name: 'Tag', items: [], count: 74 },
    { id: 'task-priority', name: 'Task priority', items: [], count: 8 },
    { id: 'task-status', name: 'Task status', items: [], count: 8 }
  ]);

  const toggleCategory = (categoryId: string) => {
    const newOpenCategories = new Set(openCategories);
    if (newOpenCategories.has(categoryId)) {
      newOpenCategories.delete(categoryId);
    } else {
      newOpenCategories.add(categoryId);
    }
    setOpenCategories(newOpenCategories);
  };

  const filteredCategories = metadataCategories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleImportMetadata = () => {
    // Implementation for importing metadata
    console.log('Import metadata functionality');
    setShowImportDialog(false);
  };

  const handleExportMetadata = () => {
    // Implementation for exporting metadata
    console.log('Export metadata functionality');
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <div>
                <CardTitle>Meta Data Configuration</CardTitle>
                <CardDescription className="mt-1">
                  {metadataCategories.reduce((total, cat) => total + cat.count, 0)} items across {metadataCategories.length} categories
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={handleExportMetadata}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Import
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Import Metadata</DialogTitle>
                    <DialogDescription>
                      Upload a JSON or CSV file containing your metadata definitions
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="metadata-file">Select File</Label>
                      <Input id="metadata-file" type="file" accept=".json,.csv" className="mt-1" />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setShowImportDialog(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleImportMetadata}>
                        Import
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search metadata categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Categories */}
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredCategories.map((category) => (
              <Collapsible
                key={category.id}
                open={openCategories.has(category.id)}
                onOpenChange={() => toggleCategory(category.id)}
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-2">
                    {openCategories.has(category.id) ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                    <span className="font-medium text-left">{category.name}</span>
                  </div>
                  <Badge variant="secondary" className="ml-auto">
                    {category.count}
                  </Badge>
                </CollapsibleTrigger>
                <CollapsibleContent className="px-6 pb-3">
                  <div className="space-y-2">
                    {category.items.length > 0 ? (
                      <>
                        {category.items.map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-2 rounded border bg-background">
                            <span className="text-sm">{item}</span>
                            <div className="flex items-center space-x-1">
                              <Button variant="ghost" size="sm">
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-destructive">
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                        <Button variant="outline" size="sm" className="w-full">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Item
                        </Button>
                      </>
                    ) : (
                      <div className="text-center py-4 text-muted-foreground">
                        <p className="text-sm">No items defined</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          <Plus className="w-4 h-4 mr-2" />
                          Add First Item
                        </Button>
                      </div>
                    )}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetadataSettings;