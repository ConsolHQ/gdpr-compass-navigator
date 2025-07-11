import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Search, 
  Plus, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  Edit, 
  Trash2,
  ChevronsUpDown,
  ChevronUp,
  ChevronDown,
  Archive,
  Copy,
  Download,
  X,
  CheckSquare
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

// Mock data for LIA
const mockLIAs = [
  {
    id: 'LIA-001',
    title: 'Marketing Email Campaign Analysis',
    dataSubject: 'Email Subscribers',
    purpose: 'Direct Marketing',
    status: 'completed',
    legitimateInterest: 'Business Development',
    balancingTest: 'passed',
    createdDate: '2024-01-15',
    reviewer: 'John Smith'
  },
  {
    id: 'LIA-002',
    title: 'Customer Behavior Analytics',
    dataSubject: 'Website Visitors',
    purpose: 'Analytics & Insights',
    status: 'in-progress',
    legitimateInterest: 'Service Improvement',
    balancingTest: 'pending',
    createdDate: '2024-01-20',
    reviewer: 'Sarah Johnson'
  },
  {
    id: 'LIA-003',
    title: 'Fraud Detection System',
    dataSubject: 'Transaction Data',
    purpose: 'Security & Fraud Prevention',
    status: 'draft',
    legitimateInterest: 'Risk Management',
    balancingTest: 'not-started',
    createdDate: '2024-01-25',
    reviewer: 'Mike Davis'
  }
];

interface LIAProps {
  onNavigate?: (path: string) => void;
}

const LIA = ({ onNavigate }: LIAProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);
  const [columnFilters, setColumnFilters] = useState<{[key: string]: string[]}>({});

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'completed': { color: 'bg-green-100 text-green-800', label: 'Completed' },
      'in-progress': { color: 'bg-blue-100 text-blue-800', label: 'In Progress' },
      'draft': { color: 'bg-gray-100 text-gray-800', label: 'Draft' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const getBalancingTestBadge = (test: string) => {
    const testConfig = {
      'passed': { color: 'bg-green-100 text-green-800', label: 'Passed' },
      'pending': { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
      'not-started': { color: 'bg-gray-100 text-gray-800', label: 'Not Started' }
    };
    
    const config = testConfig[test as keyof typeof testConfig] || testConfig['not-started'];
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  // Get unique values for filters
  const getUniqueValues = (key: string) => {
    return [...new Set(mockLIAs.map(lia => {
      return lia[key as keyof typeof lia];
    }))];
  };

  // Filter and sort data
  const processedLIAs = useMemo(() => {
    let filtered = mockLIAs.filter(lia => {
      // Search filter
      const searchMatch = lia.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lia.dataSubject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lia.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lia.reviewer.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (!searchMatch) return false;

      // Column filters
      for (const [column, filterValues] of Object.entries(columnFilters)) {
        if (!filterValues || filterValues.length === 0) continue;
        
        const liaValue = lia[column as keyof typeof lia];
        if (!filterValues.includes(liaValue as string)) return false;
      }
      
      return true;
    });

    // Sort data
    if (sortColumn && sortDirection) {
      filtered.sort((a, b) => {
        let aValue: any = a[sortColumn as keyof typeof a];
        let bValue: any = b[sortColumn as keyof typeof b];
        
        if (sortColumn === 'createdDate') {
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
  }, [mockLIAs, searchTerm, columnFilters, sortColumn, sortDirection]);

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
      setSelectedRows(processedLIAs.map(lia => lia.id));
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

  const getSortIcon = (column: string) => {
    if (sortColumn !== column) return <ChevronsUpDown className="h-4 w-4" />;
    if (sortDirection === 'asc') return <ChevronUp className="h-4 w-4" />;
    if (sortDirection === 'desc') return <ChevronDown className="h-4 w-4" />;
    return <ChevronsUpDown className="h-4 w-4" />;
  };

  const clearFilters = () => {
    setSearchTerm('');
    setColumnFilters({});
  };

  const hasActiveFilters = Object.values(columnFilters).some(filter => 
    filter && filter.length > 0
  ) || searchTerm;

  const [visibleColumns, setVisibleColumns] = useState({
    id: true,
    title: true,
    dataSubject: true,
    purpose: true,
    status: true,
    legitimateInterest: true,
    balancingTest: true,
    reviewer: true,
  });

  const columns = [
    { key: 'id', label: 'Identifier', sortable: true },
    { key: 'title', label: 'Assessment Title', sortable: true },
    { key: 'dataSubject', label: 'Data Subject', sortable: true },
    { key: 'purpose', label: 'Purpose', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'legitimateInterest', label: 'Legitimate Interest', sortable: true },
    { key: 'balancingTest', label: 'Balancing Test', sortable: true },
    { key: 'reviewer', label: 'Reviewer', sortable: true },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-600 mt-1">{processedLIAs.length} legitimate interest assessments</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => onNavigate?.('/company/lia/outstanding')}
            className="relative"
          >
            <CheckSquare className="h-4 w-4" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </Button>
          <Button onClick={() => onNavigate?.('/company/assessments/lia/new')} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New LIA
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total LIAs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockLIAs.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {mockLIAs.filter(lia => lia.status === 'completed').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {mockLIAs.filter(lia => lia.status === 'in-progress').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Drafts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">
              {mockLIAs.filter(lia => lia.status === 'draft').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search LIAs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>

              {hasActiveFilters && (
                <Button variant="outline" onClick={clearFilters} className="whitespace-nowrap">
                  <X className="mr-2 h-4 w-4" />
                  Clear filters
                </Button>
              )}
            </div>

            {/* Bulk Actions */}
            {selectedRows.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">{selectedRows.length} selected</span>
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
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Selected
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-b bg-muted/50">
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedRows.length === processedLIAs.length && processedLIAs.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                 </TableHead>
                {visibleColumns.id && (
                  <TableHead className="font-semibold">
                    <Button
                      variant="ghost" 
                      onClick={() => handleSort('id')}
                      className="h-auto p-0 font-semibold hover:bg-transparent"
                    >
                      Identifier {getSortIcon('id')}
                    </Button>
                  </TableHead>
                )}
                {visibleColumns.title && (
                  <TableHead className="font-semibold">
                    <Button
                      variant="ghost" 
                      onClick={() => handleSort('title')}
                      className="h-auto p-0 font-semibold hover:bg-transparent"
                    >
                      Assessment Title {getSortIcon('title')}
                    </Button>
                  </TableHead>
                )}
                <TableHead className="font-semibold">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost" 
                      onClick={() => handleSort('dataSubject')}
                      className="h-auto p-0 font-semibold hover:bg-transparent"
                    >
                      Data Subject {getSortIcon('dataSubject')}
                    </Button>
                  </div>
                </TableHead>
                <TableHead className="font-semibold">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost" 
                      onClick={() => handleSort('purpose')}
                      className="h-auto p-0 font-semibold hover:bg-transparent"
                    >
                      Purpose {getSortIcon('purpose')}
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-auto p-1">
                          <Filter className="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {getUniqueValues('purpose').map(value => (
                          <DropdownMenuCheckboxItem
                            key={String(value)}
                            checked={(columnFilters.purpose || []).includes(value as string)}
                            onCheckedChange={(checked) => {
                              const current = columnFilters.purpose || [];
                              if (checked) {
                                setColumnFilters(prev => ({ ...prev, purpose: [...current, value as string] }));
                              } else {
                                setColumnFilters(prev => ({ ...prev, purpose: current.filter(v => v !== value) }));
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
                <TableHead className="font-semibold">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost" 
                      onClick={() => handleSort('status')}
                      className="h-auto p-0 font-semibold hover:bg-transparent"
                    >
                      Status {getSortIcon('status')}
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
                            checked={(columnFilters.status || []).includes(value as string)}
                            onCheckedChange={(checked) => {
                              const current = columnFilters.status || [];
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
                <TableHead className="font-semibold">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost" 
                      onClick={() => handleSort('legitimateInterest')}
                      className="h-auto p-0 font-semibold hover:bg-transparent"
                    >
                      Legitimate Interest {getSortIcon('legitimateInterest')}
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-auto p-1">
                          <Filter className="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {getUniqueValues('legitimateInterest').map(value => (
                          <DropdownMenuCheckboxItem
                            key={String(value)}
                            checked={(columnFilters.legitimateInterest || []).includes(value as string)}
                            onCheckedChange={(checked) => {
                              const current = columnFilters.legitimateInterest || [];
                              if (checked) {
                                setColumnFilters(prev => ({ ...prev, legitimateInterest: [...current, value as string] }));
                              } else {
                                setColumnFilters(prev => ({ ...prev, legitimateInterest: current.filter(v => v !== value) }));
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
                <TableHead className="font-semibold">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost" 
                      onClick={() => handleSort('balancingTest')}
                      className="h-auto p-0 font-semibold hover:bg-transparent"
                    >
                      Balancing Test {getSortIcon('balancingTest')}
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-auto p-1">
                          <Filter className="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {getUniqueValues('balancingTest').map(value => (
                          <DropdownMenuCheckboxItem
                            key={String(value)}
                            checked={(columnFilters.balancingTest || []).includes(value as string)}
                            onCheckedChange={(checked) => {
                              const current = columnFilters.balancingTest || [];
                              if (checked) {
                                setColumnFilters(prev => ({ ...prev, balancingTest: [...current, value as string] }));
                              } else {
                                setColumnFilters(prev => ({ ...prev, balancingTest: current.filter(v => v !== value) }));
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
                <TableHead className="font-semibold">
                  <Button
                    variant="ghost" 
                    onClick={() => handleSort('createdDate')}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                  >
                    Created Date {getSortIcon('createdDate')}
                  </Button>
                </TableHead>
                <TableHead className="font-semibold">
                  <Button
                    variant="ghost" 
                    onClick={() => handleSort('reviewer')}
                    className="h-auto p-0 font-semibold hover:bg-transparent"
                  >
                    Reviewer {getSortIcon('reviewer')}
                  </Button>
                </TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processedLIAs.map((lia) => (
                <TableRow key={lia.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.includes(lia.id)}
                      onCheckedChange={(checked) => handleSelectRow(lia.id, checked as boolean)}
                    />
                  </TableCell>
                  {visibleColumns.id && (
                    <TableCell>
                      <div className="font-medium">{lia.id}</div>
                    </TableCell>
                  )}
                  {visibleColumns.title && (
                    <TableCell>
                      <div className="font-medium">{lia.title}</div>
                    </TableCell>
                  )}
                  <TableCell>{lia.dataSubject}</TableCell>
                  <TableCell>{lia.purpose}</TableCell>
                  <TableCell>{getStatusBadge(lia.status)}</TableCell>
                  <TableCell>{lia.legitimateInterest}</TableCell>
                  <TableCell>{getBalancingTestBadge(lia.balancingTest)}</TableCell>
                  <TableCell>{new Date(lia.createdDate).toLocaleDateString()}</TableCell>
                  <TableCell>{lia.reviewer}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="cursor-pointer">
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {processedLIAs.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No legitimate interest assessments found matching your criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LIA;