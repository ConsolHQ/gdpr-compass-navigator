
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Plus, Search, Download, Eye, Edit, Trash2, Upload, Folder, File } from 'lucide-react';

interface DocumentLibraryProps {
  onNavigate?: (path: string) => void;
}

const DocumentLibrary = ({ onNavigate }: DocumentLibraryProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentView, setCurrentView] = useState('all');
  
  const documents = [
    {
      id: 'DOC-001',
      name: 'Privacy Policy v2.1',
      type: 'Policy',
      category: 'Legal Documents',
      size: '245 KB',
      format: 'PDF',
      uploadDate: '2024-01-15',
      lastModified: '2024-01-15',
      version: '2.1',
      status: 'Current',
      uploadedBy: 'Sarah Johnson',
      tags: ['Privacy', 'External', 'Current'],
      description: 'Updated privacy policy reflecting GDPR compliance requirements',
    },
    {
      id: 'DOC-002',
      name: 'Data Processing Agreement - CloudCRM',
      type: 'Contract',
      category: 'Third Party Agreements',
      size: '892 KB',
      format: 'PDF',
      uploadDate: '2023-06-15',
      lastModified: '2023-06-15',
      version: '1.0',
      status: 'Active',
      uploadedBy: 'Mike Davis',
      tags: ['DPA', 'CloudCRM', 'Active'],
      description: 'Data processing agreement with CloudCRM Solutions Ltd',
    },
    {
      id: 'DOC-003',
      name: 'GDPR Training Materials',
      type: 'Training',
      category: 'Training & Awareness',
      size: '12.5 MB',
      format: 'ZIP',
      uploadDate: '2024-01-10',
      lastModified: '2024-01-10',
      version: '3.0',
      status: 'Current',
      uploadedBy: 'John Smith',
      tags: ['Training', 'GDPR', 'Internal'],
      description: 'Complete GDPR training package for employees',
    },
    {
      id: 'DOC-004',
      name: 'Incident Response Procedure',
      type: 'Procedure',
      category: 'Policies & Procedures',
      size: '156 KB',
      format: 'DOCX',
      uploadDate: '2023-12-20',
      lastModified: '2023-12-20',
      version: '1.2',
      status: 'Current',
      uploadedBy: 'Sarah Johnson',
      tags: ['Incident', 'Response', 'Procedure'],
      description: 'Step-by-step procedure for handling data breach incidents',
    },
    {
      id: 'DOC-005',
      name: 'Consent Management Framework',
      type: 'Framework',
      category: 'Policies & Procedures',
      size: '324 KB',
      format: 'PDF',
      uploadDate: '2024-01-08',
      lastModified: '2024-01-08',
      version: '2.0',
      status: 'Draft',
      uploadedBy: 'Mike Davis',
      tags: ['Consent', 'Framework', 'Draft'],
      description: 'Framework for managing user consent across digital platforms',
    },
    {
      id: 'DOC-006',
      name: 'Data Retention Schedule',
      type: 'Schedule',
      category: 'Policies & Procedures',
      size: '89 KB',
      format: 'XLSX',
      uploadDate: '2023-11-30',
      lastModified: '2024-01-05',
      version: '1.1',
      status: 'Current',
      uploadedBy: 'John Smith',
      tags: ['Retention', 'Schedule', 'Current'],
      description: 'Comprehensive data retention and deletion schedule',
    },
  ];

  const categories = [
    { id: 'all', name: 'All Documents', count: documents.length },
    { id: 'policies', name: 'Policies & Procedures', count: documents.filter(d => d.category === 'Policies & Procedures').length },
    { id: 'legal', name: 'Legal Documents', count: documents.filter(d => d.category === 'Legal Documents').length },
    { id: 'agreements', name: 'Third Party Agreements', count: documents.filter(d => d.category === 'Third Party Agreements').length },
    { id: 'training', name: 'Training & Awareness', count: documents.filter(d => d.category === 'Training & Awareness').length },
    { id: 'dpia', name: 'DPIA', count: documents.filter(d => d.category === 'DPIA').length },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Current': return 'default';
      case 'Active': return 'default';
      case 'Draft': return 'secondary';
      case 'Archived': return 'outline';
      default: return 'outline';
    }
  };

  const getFileIcon = (format: string) => {
    switch (format.toLowerCase()) {
      case 'pdf': return FileText;
      case 'docx': case 'doc': return FileText;
      case 'xlsx': case 'xls': return FileText;
      case 'zip': return Folder;
      default: return File;
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = currentView === 'all' || 
                           (currentView === 'policies' && doc.category === 'Policies & Procedures') ||
                           (currentView === 'legal' && doc.category === 'Legal Documents') ||
                           (currentView === 'agreements' && doc.category === 'Third Party Agreements') ||
                           (currentView === 'training' && doc.category === 'Training & Awareness') ||
                           (currentView === 'dpia' && doc.category === 'DPIA');
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div></div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Upload
          </Button>
          <Button onClick={() => onNavigate?.('/company/documents/new')}>
            <Plus className="mr-2 h-4 w-4" />
            New Document
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Categories */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={currentView === category.id ? 'default' : 'ghost'}
                    className="w-full justify-between"
                    onClick={() => setCurrentView(category.id)}
                  >
                    <span>{category.name}</span>
                    <Badge variant="secondary">{category.count}</Badge>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search */}
          <Card>
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search documents, tags, descriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Documents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDocuments.map((doc) => {
              const FileIcon = getFileIcon(doc.format);
              return (
                <Card key={doc.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileIcon className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-base leading-tight">{doc.name}</CardTitle>
                          <CardDescription className="text-sm">{doc.category}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600 line-clamp-2">{doc.description}</p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{doc.format} • {doc.size}</span>
                        <Badge variant={getStatusColor(doc.status)}>{doc.status}</Badge>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {doc.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {doc.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{doc.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t">
                        <span>v{doc.version}</span>
                        <span>Modified: {doc.lastModified}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredDocuments.length === 0 && (
            <Card>
              <CardContent className="py-8 text-center">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium">No documents found</h3>
                <p className="text-gray-600">Try adjusting your search or upload new documents.</p>
                <div className="flex justify-center space-x-2 mt-4">
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Document
                  </Button>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Document
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentLibrary;
