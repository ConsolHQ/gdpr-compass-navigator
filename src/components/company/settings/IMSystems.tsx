import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Download, Upload, Edit, Trash2, Database } from 'lucide-react';

interface IMSystem {
  id: string;
  name: string;
  description: string;
  location: string;
  storageLocation: 'internal' | 'external';
  vendor?: string;
  status: 'active' | 'inactive';
}

const IMSystems = () => {
  const [systems, setSystems] = useState<IMSystem[]>([
    {
      id: '1',
      name: 'CRM System',
      description: 'Customer relationship management platform',
      location: 'UK Data Center',
      storageLocation: 'internal',
      vendor: 'Salesforce',
      status: 'active'
    },
    {
      id: '2',
      name: 'Marketing Analytics',
      description: 'Marketing data and analytics platform',
      location: 'EU Data Center',
      storageLocation: 'external',
      vendor: 'Google Analytics',
      status: 'active'
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingSystem, setEditingSystem] = useState<IMSystem | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    storageLocation: '',
    vendor: '',
    status: 'active'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSystem) {
      // Update existing system
      setSystems(prev => prev.map(system => 
        system.id === editingSystem.id 
          ? { 
              ...system, 
              ...formData,
              storageLocation: formData.storageLocation as 'internal' | 'external',
              status: formData.status as 'active' | 'inactive'
            }
          : system
      ));
      setEditingSystem(null);
    } else {
      // Add new system
      const newSystem: IMSystem = {
        id: Date.now().toString(),
        name: formData.name,
        description: formData.description,
        location: formData.location,
        storageLocation: formData.storageLocation as 'internal' | 'external',
        vendor: formData.vendor,
        status: formData.status as 'active' | 'inactive'
      };
      setSystems(prev => [...prev, newSystem]);
    }
    setFormData({ name: '', description: '', location: '', storageLocation: '', vendor: '', status: 'active' });
    setIsAddDialogOpen(false);
  };

  const handleEdit = (system: IMSystem) => {
    setEditingSystem(system);
    setFormData({
      name: system.name,
      description: system.description,
      location: system.location,
      storageLocation: system.storageLocation,
      vendor: system.vendor || '',
      status: system.status
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setSystems(prev => prev.filter(system => system.id !== id));
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(systems, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'im-systems.json';
    link.click();
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target?.result as string);
          setSystems(importedData);
        } catch (error) {
          console.error('Error importing data:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">IM Systems</h1>
        <p className="text-gray-600 mt-2">Manage your Information Management Systems</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="h-5 w-5" />
            <span>IM Systems Management</span>
          </CardTitle>
          <CardDescription>Add, edit, and manage your information management systems</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => {
                    setEditingSystem(null);
                    setFormData({ name: '', description: '', location: '', storageLocation: '', vendor: '', status: 'active' });
                  }}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add IM System
                  </Button>
                </DialogTrigger>
                 <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                   <DialogHeader>
                     <DialogTitle>{editingSystem ? 'Edit IM System' : 'Add New IM System'}</DialogTitle>
                     <DialogDescription>
                       {editingSystem ? 'Update the information management system details' : 'Add a new information management system to your organization'}
                     </DialogDescription>
                   </DialogHeader>
                   <form onSubmit={handleSubmit} className="space-y-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div className="space-y-2">
                         <Label htmlFor="name">System Name *</Label>
                         <Input
                           id="name"
                           value={formData.name}
                           onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                           placeholder="e.g., CRM System"
                           required
                         />
                       </div>
                       <div className="space-y-2">
                         <Label htmlFor="vendor">Vendor</Label>
                         <Input
                           id="vendor"
                           value={formData.vendor}
                           onChange={(e) => setFormData(prev => ({ ...prev, vendor: e.target.value }))}
                           placeholder="e.g., Microsoft, Google"
                         />
                       </div>
                     </div>
                     
                     <div className="space-y-2">
                       <Label htmlFor="description">Description</Label>
                       <Textarea
                         id="description"
                         value={formData.description}
                         onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                         placeholder="Brief description of the system"
                         rows={3}
                         className="resize-none"
                       />
                     </div>
                     
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div className="space-y-2">
                         <Label htmlFor="location">Location</Label>
                         <Input
                           id="location"
                           value={formData.location}
                           onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                           placeholder="e.g., UK Data Center"
                         />
                       </div>
                       <div className="space-y-2">
                         <Label htmlFor="status">Status</Label>
                         <Select 
                           value={formData.status} 
                           onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
                         >
                           <SelectTrigger>
                             <SelectValue />
                           </SelectTrigger>
                           <SelectContent>
                             <SelectItem value="active">Active</SelectItem>
                             <SelectItem value="inactive">Inactive</SelectItem>
                           </SelectContent>
                         </Select>
                       </div>
                     </div>
                     
                     <div className="space-y-2">
                       <Label htmlFor="storageLocation">Storage Location</Label>
                       <Select 
                         value={formData.storageLocation} 
                         onValueChange={(value) => setFormData(prev => ({ ...prev, storageLocation: value }))}
                       >
                         <SelectTrigger>
                           <SelectValue placeholder="Select storage location" />
                         </SelectTrigger>
                         <SelectContent>
                           <SelectItem value="internal">Internal</SelectItem>
                           <SelectItem value="external">External</SelectItem>
                         </SelectContent>
                       </Select>
                     </div>
                     
                     <div className="flex justify-end space-x-2 pt-4 border-t">
                       <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                         Cancel
                       </Button>
                       <Button type="submit">
                         {editingSystem ? 'Update' : 'Add'} System
                       </Button>
                     </div>
                   </form>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <div className="relative">
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Button variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Import
                </Button>
              </div>
            </div>
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>System Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Storage</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {systems.map((system) => (
                  <TableRow key={system.id}>
                    <TableCell className="font-medium">{system.name}</TableCell>
                    <TableCell className="max-w-xs truncate">{system.description}</TableCell>
                    <TableCell>{system.location}</TableCell>
                    <TableCell>
                      <Badge variant={system.storageLocation === 'internal' ? 'default' : 'secondary'}>
                        {system.storageLocation}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={system.status === 'active' ? 'default' : 'secondary'}>
                        {system.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEdit(system)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDelete(system.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {systems.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Database className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <p>No IM Systems configured yet</p>
              <p className="text-sm">Add your first information management system to get started</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default IMSystems;