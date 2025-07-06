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
import { useMetadata } from '@/hooks/useMetadata';

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
  const { metadataCategories } = useMetadata();

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