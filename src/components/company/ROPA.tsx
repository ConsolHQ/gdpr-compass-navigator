import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuCheckboxItem } from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Archive, 
  Copy,
  MoreHorizontal,
  AlertCircle,
  Building2,
  User,
  Shield,
  Columns,
  ChevronsUpDown,
  ChevronUp,
  ChevronDown,
  Download,
  Merge,
  BookmarkPlus,
  X,
  Trash2,
  CheckSquare,
  Upload,
  Bot
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CreateROPA from './CreateROPA';
import ROPATemplateImport from './ROPATemplateImport';
import { ROPACopilotPanel } from '@/components/ai/ropa';
import { ROPAImportWizard } from './ROPAImportWizard';

const ROPATemplates = () => {
  const templates = [
    {
      id: 'template-001',
      name: 'Customer Data Processing',
      description: 'Standard template for customer data management activities',
      category: 'Customer Service',
      usageCount: 15
    },
    {
      id: 'template-002', 
      name: 'Employee HR Template',
      description: 'Template for HR-related data processing activities',
      category: 'Human Resources',
      usageCount: 8
    },
    {
      id: 'template-003',
      name: 'Marketing Analytics',
      description: 'Template for marketing and analytics data processing',
      category: 'Marketing',
      usageCount: 12
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">ROPA Templates</h1>
          <p className="text-gray-600 mt-1">Choose a template to get started quickly</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-lg">{template.name}</h3>
                  <Badge variant="outline">{template.category}</Badge>
                </div>
                <p className="text-gray-600 text-sm">{template.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">Used {template.usageCount} times</span>
                  <Button size="sm">Use Template</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

type SortDirection = 'asc' | 'desc' | null;
type FilterValue = string | string[];

interface ColumnFilter {
  [key: string]: FilterValue;
}

const ROPA = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showImportTemplate, setShowImportTemplate] = useState(false);
  const [showImportWizard, setShowImportWizard] = useState(false);
  const [showAIAssist, setShowAIAssist] = useState(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [columnFilters, setColumnFilters] = useState<ColumnFilter>({});
  const [visibleColumns, setVisibleColumns] = useState(() => {
    const saved = localStorage.getItem('ropa-visible-columns');
    return saved ? JSON.parse(saved) : {
      id: true,
      processingActivity: true,
      description: true,
      department: true,
      status: true,
      role: true,
      legalBasis: true,
      dataSubjects: true,
      specialCategory: true,
      progress: true,
      owner: true,
    };
  });
  const navigate = useNavigate();
  
  const ropaEntries = [
    {
      id: 'ROPA-001',
      name: 'Customer Data Management',
      description: 'Processing customer information for service delivery and support',
      department: 'Customer Service',
      status: 'Active',
      role: 'Controller',
      legalBasis: 'Legitimate Interest',
      dataSubjects: 'Customers',
      personalDataCategories: 'Contact Info, Transaction Data',
      specialCategory: false,
      lastUpdated: '2024-01-15',
      owner: 'Sarah Johnson',
      progress: 85,
    },
    {
      id: 'ROPA-002',
      name: 'Employee HR Records',
      description: 'Managing employee personal data for HR purposes',
      department: 'Human Resources',
      status: 'Active',
      role: 'Controller',
      legalBasis: 'Contract',
      dataSubjects: 'Employees',
      personalDataCategories: 'Personal Details, Employment Data',
      specialCategory: true,
      lastUpdated: '2024-01-12',
      owner: 'Mike Chen',
      progress: 92,
    },
    {
      id: 'ROPA-003',
      name: 'Marketing Analytics',
      description: 'Website visitor tracking and marketing analysis',
      department: 'Marketing',
      status: 'Review Required',
      role: 'Controller',
      legalBasis: 'Consent',
      dataSubjects: 'Website Visitors',
      personalDataCategories: 'Behavioral Data, IP Addresses',
      specialCategory: false,
      lastUpdated: '2023-12-20',
      owner: 'Emma Davis',
      progress: 67,
    },
    {
      id: 'ROPA-004',
      name: 'Vendor Management',
      description: 'Managing vendor and supplier information',
      department: 'Procurement',
      status: 'Draft',
      role: 'Processor',
      legalBasis: 'Legitimate Interest',
      dataSubjects: 'Business Contacts',
      personalDataCategories: 'Contact Information',
      specialCategory: false,
      lastUpdated: '2024-01-08',
      owner: 'Alex Thompson',
      progress: 43,
    },
    {
      id: 'ROPA-005',
      name: 'Customer Support Tickets',
      description: 'Processing customer support requests and communications',
      department: 'Support',
      status: 'Active',
      role: 'Controller',
      legalBasis: 'Contract',
      dataSubjects: 'Customers',
      personalDataCategories: 'Contact Info, Support History',
      specialCategory: false,
      lastUpdated: '2024-01-10',
      owner: 'Lisa Wang',
      progress: 78,
    },
  ];

  const columns = [
    { key: 'id', label: 'Identifier', sortable: true },
    { key: 'processingActivity', label: 'Processing Activity', sortable: true },
    { key: 'description', label: 'Description', sortable: true },
    { key: 'department', label: 'Department', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
    { key: 'legalBasis', label: 'Legal Basis', sortable: true },
    { key: 'dataSubjects', label: 'Data Subjects', sortable: true },
    { key: 'specialCategory', label: 'Special Category', sortable: true },
    { key: 'progress', label: 'Progress', sortable: true },
    { key: 'owner', label: 'Owner', sortable: true },
  ];

  // Get unique values for filters
  const getUniqueValues = (key: string) => {
    return [...new Set(ropaEntries.map(entry => {
      if (key === 'specialCategory') return entry[key] ? 'Yes' : 'No';
      return entry[key as keyof typeof entry];
    }))];
  };

  // Filter and sort data
  const processedEntries = useMemo(() => {
    let filtered = ropaEntries.filter(entry => {
      // Search filter
      const searchMatch = entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.owner.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (!searchMatch) return false;

      // Column filters
      for (const [column, filterValue] of Object.entries(columnFilters)) {
        if (!filterValue || (Array.isArray(filterValue) && filterValue.length === 0)) continue;
        
        let entryValue = entry[column as keyof typeof entry];
        if (column === 'specialCategory') {
          entryValue = entry.specialCategory ? 'Yes' : 'No';
        }
        
        if (Array.isArray(filterValue)) {
          if (!filterValue.includes(entryValue as string)) return false;
        } else {
          if (entryValue !== filterValue) return false;
        }
      }
      
      return true;
    });

    // Sort data
    if (sortColumn && sortDirection) {
      filtered.sort((a, b) => {
        let aValue = a[sortColumn as keyof typeof a];
        let bValue = b[sortColumn as keyof typeof b];
        
        if (sortColumn === 'progress') {
          aValue = Number(aValue);
          bValue = Number(bValue);
        } else if (sortColumn === 'lastUpdated') {
          aValue = new Date(aValue as string).getTime();
          bValue = new Date(bValue as string).getTime();
        } else {
          aValue = String(aValue).toLowerCase();
          bValue = String(bValue).toLowerCase();
        }
        
        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [ropaEntries, searchTerm, columnFilters, sortColumn, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(processedEntries.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedEntries = processedEntries.slice(startIndex, startIndex + pageSize);

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : sortDirection === 'desc' ? null : 'asc');
      if (sortDirection === 'desc') setSortColumn(null);
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(paginatedEntries.map(entry => entry.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    }
  };

  const clearAllFilters = () => {
    setColumnFilters({});
    setSearchTerm('');
  };

  const hasActiveFilters = Object.values(columnFilters).some(filter => 
    filter && (Array.isArray(filter) ? filter.length > 0 : true)
  ) || searchTerm;

  const getStatusBadge = (status: string) => {
    const variants = {
      'Active': 'default',
      'Review Required': 'secondary',
      'Draft': 'outline'
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || 'outline'} className="text-xs">
        {status}
      </Badge>
    );
  };

  const getRoleIcon = (role: string) => {
    return role === 'Controller' ? 
      <Shield className="h-4 w-4 text-blue-600" /> : 
      <User className="h-4 w-4 text-gray-600" />;
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getSortIcon = (column: string) => {
    if (sortColumn !== column) return <ChevronsUpDown className="h-4 w-4" />;
    if (sortDirection === 'asc') return <ChevronUp className="h-4 w-4" />;
    if (sortDirection === 'desc') return <ChevronDown className="h-4 w-4" />;
    return <ChevronsUpDown className="h-4 w-4" />;
  };

  const handleTemplateImport = (templateData: any) => {
    console.log('Importing template:', templateData);
    // Here you would create a new ROPA with the imported data
    setShowImportTemplate(false);
    setShowCreateForm(true);
  };

  if (showCreateForm) {
    return <CreateROPA onBack={() => setShowCreateForm(false)} />;
  }

  if (showImportTemplate) {
    return (
      <ROPATemplateImport 
        onBack={() => setShowImportTemplate(false)}
        onImport={handleTemplateImport}
      />
    );
  }

  if (showImportWizard) {
    return (
      <ROPAImportWizard
        onBack={() => setShowImportWizard(false)}
        onImportComplete={(data) => {
          console.log('Import completed:', data);
          setShowImportWizard(false);
        }}
      />
    );
  }

  if (showTemplates) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => setShowTemplates(false)}>
            ← Back to ROPA
          </Button>
          <Button onClick={() => setShowImportTemplate(true)}>
            <Upload className="mr-2 h-4 w-4" />
            Import Template
          </Button>
        </div>
        <ROPATemplates />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 mt-1">{processedEntries.length} processing activities</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => navigate('/company/ropa/outstanding')}
            className="relative"
          >
            <CheckSquare className="h-4 w-4" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              2
            </span>
          </Button>
          <Button variant="outline" onClick={() => setShowAIAssist(true)}>
            <Bot className="mr-2 h-4 w-4" />
            AI Assist
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-teal-600 hover:bg-teal-700">
                <Plus className="mr-2 h-4 w-4" />
                Create New ROPA
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setShowCreateForm(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create New
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowTemplates(true)}>
                <FileText className="mr-2 h-4 w-4" />
                Create from Template
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" onClick={() => setShowImportWizard(true)}>
            <Upload className="mr-2 h-4 w-4" />
            Import ROPA
          </Button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search processing activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-80"
            />
          </div>

          {/* Column Visibility */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <Columns className="mr-2 h-4 w-4" />
                Columns
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56">
              <div className="space-y-2">
                <h4 className="font-medium">Toggle columns</h4>
                {columns.map(column => (
                  <div key={column.key} className="flex items-center space-x-2">
                    <Checkbox
                      id={column.key}
                      checked={visibleColumns[column.key as keyof typeof visibleColumns]}
                      onCheckedChange={(checked) => {
                        const updated = { ...visibleColumns, [column.key]: checked };
                        setVisibleColumns(updated);
                        localStorage.setItem('ropa-visible-columns', JSON.stringify(updated));
                      }}
                    />
                    <label htmlFor={column.key} className="text-sm">{column.label}</label>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={clearAllFilters}>
              <X className="mr-2 h-4 w-4" />
              Clear filters
            </Button>
          )}
        </div>

        {/* Bulk Actions */}
        {selectedRows.length > 0 && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">{selectedRows.length} selected</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Bulk Actions
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Archive className="mr-2 h-4 w-4" />
                  Archive
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Copy className="mr-2 h-4 w-4" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Merge className="mr-2 h-4 w-4" />
                  Merge
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Task
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>

      {/* Enhanced Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-b bg-gray-50">
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedRows.length === paginatedEntries.length}
                    onCheckedChange={handleSelectAll}
                  />
                 </TableHead>
                {visibleColumns.id && (
                  <TableHead className="font-semibold">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSort('id')}
                        className="h-auto p-0 font-semibold"
                      >
                        Identifier
                        {getSortIcon('id')}
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-auto p-1">
                            <Filter className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {getUniqueValues('id').map(value => (
                            <DropdownMenuCheckboxItem
                              key={String(value)}
                              checked={(columnFilters.id as string[])?.includes(value as string) || false}
                              onCheckedChange={(checked) => {
                                const current = (columnFilters.id as string[]) || [];
                                if (checked) {
                                  setColumnFilters(prev => ({ ...prev, id: [...current, value as string] }));
                                } else {
                                  setColumnFilters(prev => ({ ...prev, id: current.filter(v => v !== value) }));
                                }
                              }}
                            >
                              {value as string}
                            </DropdownMenuCheckboxItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableHead>
                )}
                {visibleColumns.processingActivity && (
                  <TableHead className="font-semibold">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSort('name')}
                        className="h-auto p-0 font-semibold"
                      >
                        Processing Activity
                        {getSortIcon('name')}
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-auto p-1">
                            <Filter className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {getUniqueValues('name').map(value => (
                            <DropdownMenuCheckboxItem
                              key={String(value)}
                              checked={(columnFilters.name as string[])?.includes(value as string) || false}
                              onCheckedChange={(checked) => {
                                const current = (columnFilters.name as string[]) || [];
                                if (checked) {
                                  setColumnFilters(prev => ({ ...prev, name: [...current, value as string] }));
                                } else {
                                  setColumnFilters(prev => ({ ...prev, name: current.filter(v => v !== value) }));
                                }
                              }}
                            >
                              {value as string}
                            </DropdownMenuCheckboxItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableHead>
                )}
                {visibleColumns.description && (
                  <TableHead className="font-semibold">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSort('description')}
                        className="h-auto p-0 font-semibold"
                      >
                        Description
                        {getSortIcon('description')}
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-auto p-1">
                            <Filter className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {getUniqueValues('description').map(value => (
                            <DropdownMenuCheckboxItem
                              key={String(value)}
                              checked={(columnFilters.description as string[])?.includes(value as string) || false}
                              onCheckedChange={(checked) => {
                                const current = (columnFilters.description as string[]) || [];
                                if (checked) {
                                  setColumnFilters(prev => ({ ...prev, description: [...current, value as string] }));
                                } else {
                                  setColumnFilters(prev => ({ ...prev, description: current.filter(v => v !== value) }));
                                }
                              }}
                            >
                              {value as string}
                            </DropdownMenuCheckboxItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableHead>
                )}
                {visibleColumns.department && (
                  <TableHead className="font-semibold">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSort('department')}
                        className="h-auto p-0 font-semibold"
                      >
                        Department
                        {getSortIcon('department')}
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-auto p-1">
                            <Filter className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {getUniqueValues('department').map(value => (
                            <DropdownMenuCheckboxItem
                              key={String(value)}
                              checked={(columnFilters.department as string[])?.includes(value as string) || false}
                              onCheckedChange={(checked) => {
                                const current = (columnFilters.department as string[]) || [];
                                if (checked) {
                                  setColumnFilters(prev => ({ ...prev, department: [...current, value as string] }));
                                } else {
                                  setColumnFilters(prev => ({ ...prev, department: current.filter(v => v !== value) }));
                                }
                              }}
                            >
                              {value as string}
                            </DropdownMenuCheckboxItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableHead>
                )}
                {visibleColumns.status && (
                  <TableHead className="font-semibold">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSort('status')}
                        className="h-auto p-0 font-semibold"
                      >
                        Status
                        {getSortIcon('status')}
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-auto p-1">
                            <Filter className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {getUniqueValues('status').map(value => (
                            <DropdownMenuCheckboxItem
                              key={String(value)}
                              checked={(columnFilters.status as string[])?.includes(value as string) || false}
                              onCheckedChange={(checked) => {
                                const current = (columnFilters.status as string[]) || [];
                                if (checked) {
                                  setColumnFilters(prev => ({ ...prev, status: [...current, value as string] }));
                                } else {
                                  setColumnFilters(prev => ({ ...prev, status: current.filter(v => v !== value) }));
                                }
                              }}
                            >
                              {value as string}
                            </DropdownMenuCheckboxItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableHead>
                )}
                {visibleColumns.role && (
                  <TableHead className="font-semibold">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSort('role')}
                        className="h-auto p-0 font-semibold"
                      >
                        Role
                        {getSortIcon('role')}
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-auto p-1">
                            <Filter className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {getUniqueValues('role').map(value => (
                            <DropdownMenuCheckboxItem
                              key={String(value)}
                              checked={(columnFilters.role as string[])?.includes(value as string) || false}
                              onCheckedChange={(checked) => {
                                const current = (columnFilters.role as string[]) || [];
                                if (checked) {
                                  setColumnFilters(prev => ({ ...prev, role: [...current, value as string] }));
                                } else {
                                  setColumnFilters(prev => ({ ...prev, role: current.filter(v => v !== value) }));
                                }
                              }}
                            >
                              {value as string}
                            </DropdownMenuCheckboxItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableHead>
                )}
                {visibleColumns.legalBasis && (
                  <TableHead className="font-semibold">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSort('legalBasis')}
                        className="h-auto p-0 font-semibold"
                      >
                        Legal Basis
                        {getSortIcon('legalBasis')}
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-auto p-1">
                            <Filter className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {getUniqueValues('legalBasis').map(value => (
                            <DropdownMenuCheckboxItem
                              key={String(value)}
                              checked={(columnFilters.legalBasis as string[])?.includes(value as string) || false}
                              onCheckedChange={(checked) => {
                                const current = (columnFilters.legalBasis as string[]) || [];
                                if (checked) {
                                  setColumnFilters(prev => ({ ...prev, legalBasis: [...current, value as string] }));
                                } else {
                                  setColumnFilters(prev => ({ ...prev, legalBasis: current.filter(v => v !== value) }));
                                }
                              }}
                            >
                              {value as string}
                            </DropdownMenuCheckboxItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableHead>
                )}
                {visibleColumns.dataSubjects && (
                  <TableHead className="font-semibold">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSort('dataSubjects')}
                        className="h-auto p-0 font-semibold"
                      >
                        Data Subjects
                        {getSortIcon('dataSubjects')}
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-auto p-1">
                            <Filter className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {getUniqueValues('dataSubjects').map(value => (
                            <DropdownMenuCheckboxItem
                              key={String(value)}
                              checked={(columnFilters.dataSubjects as string[])?.includes(value as string) || false}
                              onCheckedChange={(checked) => {
                                const current = (columnFilters.dataSubjects as string[]) || [];
                                if (checked) {
                                  setColumnFilters(prev => ({ ...prev, dataSubjects: [...current, value as string] }));
                                } else {
                                  setColumnFilters(prev => ({ ...prev, dataSubjects: current.filter(v => v !== value) }));
                                }
                              }}
                            >
                              {value as string}
                            </DropdownMenuCheckboxItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableHead>
                )}
                {visibleColumns.specialCategory && (
                  <TableHead className="font-semibold">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSort('specialCategory')}
                        className="h-auto p-0 font-semibold"
                      >
                        Special Category
                        {getSortIcon('specialCategory')}
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-auto p-1">
                            <Filter className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {getUniqueValues('specialCategory').map(value => (
                            <DropdownMenuCheckboxItem
                              key={String(value)}
                              checked={(columnFilters.specialCategory as string[])?.includes(value as string) || false}
                              onCheckedChange={(checked) => {
                                const current = (columnFilters.specialCategory as string[]) || [];
                                if (checked) {
                                  setColumnFilters(prev => ({ ...prev, specialCategory: [...current, value as string] }));
                                } else {
                                  setColumnFilters(prev => ({ ...prev, specialCategory: current.filter(v => v !== value) }));
                                }
                              }}
                            >
                              {value as string}
                            </DropdownMenuCheckboxItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableHead>
                )}
                {visibleColumns.progress && (
                  <TableHead className="font-semibold">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort('progress')}
                      className="h-auto p-0 font-semibold"
                    >
                      Progress
                      {getSortIcon('progress')}
                    </Button>
                  </TableHead>
                )}
                {visibleColumns.owner && (
                  <TableHead className="font-semibold">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSort('owner')}
                        className="h-auto p-0 font-semibold"
                      >
                        Owner
                        {getSortIcon('owner')}
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-auto p-1">
                            <Filter className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {getUniqueValues('owner').map(value => (
                            <DropdownMenuCheckboxItem
                              key={String(value)}
                              checked={(columnFilters.owner as string[])?.includes(value as string) || false}
                              onCheckedChange={(checked) => {
                                const current = (columnFilters.owner as string[]) || [];
                                if (checked) {
                                  setColumnFilters(prev => ({ ...prev, owner: [...current, value as string] }));
                                } else {
                                  setColumnFilters(prev => ({ ...prev, owner: current.filter(v => v !== value) }));
                                }
                              }}
                            >
                              {value as string}
                            </DropdownMenuCheckboxItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableHead>
                )}
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedEntries.map((entry) => (
                <TableRow key={entry.id} className="hover:bg-gray-50 transition-colors">
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.includes(entry.id)}
                      onCheckedChange={(checked) => handleSelectRow(entry.id, checked as boolean)}
                   />
                  </TableCell>
                  {visibleColumns.id && (
                    <TableCell>
                      <span className="text-sm font-mono">{entry.id}</span>
                    </TableCell>
                  )}
                  {visibleColumns.processingActivity && (
                    <TableCell>
                      <div className="font-medium text-gray-900">{entry.name}</div>
                    </TableCell>
                  )}
                  {visibleColumns.description && (
                    <TableCell className="max-w-xs">
                      <div className="text-sm text-gray-500 truncate">{entry.description}</div>
                    </TableCell>
                  )}
                  {visibleColumns.department && (
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Building2 className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{entry.department}</span>
                      </div>
                    </TableCell>
                  )}
                  {visibleColumns.status && (
                    <TableCell>
                      {getStatusBadge(entry.status)}
                    </TableCell>
                  )}
                  {visibleColumns.role && (
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getRoleIcon(entry.role)}
                        <span className="text-sm">{entry.role}</span>
                      </div>
                    </TableCell>
                  )}
                  {visibleColumns.legalBasis && (
                    <TableCell>
                      <span className="text-sm">{entry.legalBasis}</span>
                    </TableCell>
                  )}
                  {visibleColumns.dataSubjects && (
                    <TableCell>
                      <span className="text-sm">{entry.dataSubjects}</span>
                    </TableCell>
                  )}
                  {visibleColumns.specialCategory && (
                    <TableCell className="text-center">
                      {entry.specialCategory ? (
                        <AlertCircle className="h-4 w-4 text-amber-500 mx-auto" />
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </TableCell>
                  )}
                  {visibleColumns.progress && (
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${getProgressColor(entry.progress)}`}
                            style={{ width: `${entry.progress}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 min-w-[3rem]">{entry.progress}%</span>
                      </div>
                    </TableCell>
                  )}
                  {visibleColumns.owner && (
                    <TableCell>
                      <span className="text-sm">{entry.owner}</span>
                    </TableCell>
                  )}
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Archive className="mr-2 h-4 w-4" />
                          Archive
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <BookmarkPlus className="mr-2 h-4 w-4" />
                          Store as template
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Show</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  {pageSize}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {[10, 25, 50, 100].map(size => (
                  <DropdownMenuItem key={size} onSelect={() => {
                    setPageSize(size);
                    setCurrentPage(1);
                  }}>
                    {size}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <span className="text-sm text-gray-600">
              of {processedEntries.length} entries
            </span>
          </div>
          
          <Pagination>
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious onClick={() => setCurrentPage(currentPage - 1)} />
                </PaginationItem>
              )}
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      onClick={() => setCurrentPage(pageNum)}
                      isActive={currentPage === pageNum}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              
              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationNext onClick={() => setCurrentPage(currentPage + 1)} />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Empty State */}
      {processedEntries.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No processing activities found</h3>
            <p className="text-gray-600 mb-4">
              {hasActiveFilters ? 'Try adjusting your filters or search terms.' : 'Get started by creating your first ROPA entry.'}
            </p>
            {!hasActiveFilters && (
              <Button onClick={() => setShowCreateForm(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create New ROPA
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      <ROPACopilotPanel
        isOpen={showAIAssist}
        onClose={() => setShowAIAssist(false)}
        formData={{}}
        onFormUpdate={() => {}}
        onArrayFieldChange={() => {}}
        onGeneratedROPAApply={() => {}}
        currentTab="general"
      />
    </div>
  );
};

export default ROPA;