import React, { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CreateDSR from './CreateDSR';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuCheckboxItem } from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  UserCheck, 
  Plus, 
  Search, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Eye, 
  Edit,
  Filter,
  Columns,
  ChevronsUpDown,
  ChevronUp,
  ChevronDown,
  X,
  Archive,
  Copy,
  Download
} from 'lucide-react';

const DSR = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);
  const [visibleColumns, setVisibleColumns] = useState({
    id: true,
    requestType: true,
    status: true,
    priority: true,
    requester: true,
    assignee: true,
    submissionDate: true,
    dueDate: true,
  });
  const [columnFilters, setColumnFilters] = useState<Record<string, string[]>>({});
  
  const dsrRequests = [
    {
      id: 'DSR-001',
      requestType: 'Data Access',
      status: 'In Progress',
      priority: 'High',
      requester: 'John Smith',
      requesterEmail: 'john.smith@email.com', 
      assignee: 'Sarah Johnson',
      submissionDate: '2024-01-15',
      dueDate: '2024-02-14',
      description: 'Request for all personal data held by the organization',
    },
    {
      id: 'DSR-002', 
      requestType: 'Data Deletion',
      status: 'Completed',
      priority: 'Medium',
      requester: 'Jane Doe',
      requesterEmail: 'jane.doe@email.com',
      assignee: 'Mike Davis',
      submissionDate: '2024-01-10',
      dueDate: '2024-02-09',
      description: 'Request to delete all personal information from systems',
    },
    {
      id: 'DSR-003',
      requestType: 'Data Portability',
      status: 'Under Review',
      priority: 'Low',
      requester: 'Bob Wilson',
      requesterEmail: 'bob.wilson@email.com',
      assignee: 'Emma Brown',
      submissionDate: '2024-01-20',
      dueDate: '2024-02-19',
      description: 'Request for data in machine-readable format',
    },
    {
      id: 'DSR-004',
      requestType: 'Data Rectification',
      status: 'Pending',
      priority: 'High',
      requester: 'Alice Johnson',
      requesterEmail: 'alice.johnson@email.com',
      assignee: 'Tom Anderson',
      submissionDate: '2024-01-18',
      dueDate: '2024-02-17',
      description: 'Request to correct inaccurate personal information',
    },
  ];

  const columns = [
    { key: 'id', label: 'Identifier', sortable: true },
    { key: 'requestType', label: 'Request Type', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'priority', label: 'Priority', sortable: true },
    { key: 'requester', label: 'Requester', sortable: true },
    { key: 'assignee', label: 'Assignee', sortable: true },
    { key: 'submissionDate', label: 'Submitted', sortable: true },
    { key: 'dueDate', label: 'Due Date', sortable: true },
  ];

  // Get unique values for filters
  const getUniqueValues = (key: string) => {
    return [...new Set(dsrRequests.map(request => {
      const value = request[key as keyof typeof request];
      return String(value);
    }))];
  };

  const processedRequests = useMemo(() => {
    let filtered = dsrRequests.filter(request =>
      request.requestType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.requester.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.assignee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Apply column filters
    Object.entries(columnFilters).forEach(([column, filterValues]) => {
      if (filterValues && filterValues.length > 0) {
        filtered = filtered.filter(request => {
          const value = String(request[column as keyof typeof request]);
          return filterValues.includes(value);
        });
      }
    });

    if (sortColumn && sortDirection) {
      filtered.sort((a, b) => {
        let aValue = a[sortColumn as keyof typeof a];
        let bValue = b[sortColumn as keyof typeof b];
        
        if (sortColumn === 'submissionDate' || sortColumn === 'dueDate') {
          aValue = new Date(aValue as string).getTime().toString();
          bValue = new Date(bValue as string).getTime().toString();
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
  }, [dsrRequests, searchTerm, sortColumn, sortDirection, columnFilters]);

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
      setSelectedRows(processedRequests.map(request => request.id));
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

  const clearAllFilters = () => {
    setColumnFilters({});
    setSearchTerm('');
  };

  const hasActiveFilters = Object.values(columnFilters).some(filter => 
    filter && filter.length > 0
  ) || searchTerm;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'default';
      case 'In Progress': return 'secondary';
      case 'Under Review': return 'default';
      case 'Pending': return 'destructive';
      default: return 'outline';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'destructive';
      case 'Medium': return 'default';
      case 'Low': return 'secondary';
      default: return 'outline';
    }
  };

  const stats = {
    total: dsrRequests.length,
    pending: dsrRequests.filter(r => r.status === 'Pending').length,
    inProgress: dsrRequests.filter(r => r.status === 'In Progress').length,
    completed: dsrRequests.filter(r => r.status === 'Completed').length,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 mt-1">{processedRequests.length} data subject requests</p>
        </div>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New DSR
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Requests</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <UserCheck className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-red-600">{stats.pending}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-orange-600">{stats.inProgress}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search DSR requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-80"
            />
          </div>

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
                        setVisibleColumns(prev => ({ ...prev, [column.key]: checked }));
                      }}
                    />
                    <label htmlFor={column.key} className="text-sm">{column.label}</label>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={clearAllFilters}>
              <X className="mr-2 h-4 w-4" />
              Clear filters
            </Button>
          )}
        </div>

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
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-b bg-gray-50">
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedRows.length === processedRequests.length}
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
                    </div>
                  </TableHead>
                )}
                {visibleColumns.requestType && (
                  <TableHead className="font-semibold">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSort('requestType')}
                        className="h-auto p-0 font-semibold"
                      >
                        Request Type
                        {getSortIcon('requestType')}
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-auto p-1">
                            <Filter className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {getUniqueValues('requestType').map(value => (
                            <DropdownMenuCheckboxItem
                              key={value}
                              checked={(columnFilters.requestType || []).includes(value)}
                              onCheckedChange={(checked) => {
                                const current = columnFilters.requestType || [];
                                if (checked) {
                                  setColumnFilters(prev => ({ ...prev, requestType: [...current, value] }));
                                } else {
                                  setColumnFilters(prev => ({ ...prev, requestType: current.filter(v => v !== value) }));
                                }
                              }}
                            >
                              {value}
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
                              key={value}
                              checked={(columnFilters.status || []).includes(value)}
                              onCheckedChange={(checked) => {
                                const current = columnFilters.status || [];
                                if (checked) {
                                  setColumnFilters(prev => ({ ...prev, status: [...current, value] }));
                                } else {
                                  setColumnFilters(prev => ({ ...prev, status: current.filter(v => v !== value) }));
                                }
                              }}
                            >
                              {value}
                            </DropdownMenuCheckboxItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableHead>
                )}
                {visibleColumns.priority && (
                  <TableHead className="font-semibold">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSort('priority')}
                        className="h-auto p-0 font-semibold"
                      >
                        Priority
                        {getSortIcon('priority')}
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-auto p-1">
                            <Filter className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          {getUniqueValues('priority').map(value => (
                            <DropdownMenuCheckboxItem
                              key={value}
                              checked={(columnFilters.priority || []).includes(value)}
                              onCheckedChange={(checked) => {
                                const current = columnFilters.priority || [];
                                if (checked) {
                                  setColumnFilters(prev => ({ ...prev, priority: [...current, value] }));
                                } else {
                                  setColumnFilters(prev => ({ ...prev, priority: current.filter(v => v !== value) }));
                                }
                              }}
                            >
                              {value}
                            </DropdownMenuCheckboxItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableHead>
                )}
                {visibleColumns.requester && (
                  <TableHead className="font-semibold">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSort('requester')}
                        className="h-auto p-0 font-semibold"
                      >
                        Requester
                        {getSortIcon('requester')}
                      </Button>
                    </div>
                  </TableHead>
                )}
                {visibleColumns.assignee && (
                  <TableHead className="font-semibold">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSort('assignee')}
                        className="h-auto p-0 font-semibold"
                      >
                        Assignee
                        {getSortIcon('assignee')}
                      </Button>
                    </div>
                  </TableHead>
                )}
                {visibleColumns.submissionDate && (
                  <TableHead className="font-semibold">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSort('submissionDate')}
                        className="h-auto p-0 font-semibold"
                      >
                        Submitted
                        {getSortIcon('submissionDate')}
                      </Button>
                    </div>
                  </TableHead>
                )}
                {visibleColumns.dueDate && (
                  <TableHead className="font-semibold">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSort('dueDate')}
                        className="h-auto p-0 font-semibold"
                      >
                        Due Date
                        {getSortIcon('dueDate')}
                      </Button>
                    </div>
                  </TableHead>
                )}
                <TableHead className="font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processedRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.includes(request.id)}
                      onCheckedChange={(checked) => handleSelectRow(request.id, !!checked)}
                    />
                   </TableCell>
                   {visibleColumns.id && (
                     <TableCell>
                       <span className="text-sm font-mono">{request.id}</span>
                     </TableCell>
                   )}
                   {visibleColumns.requestType && (
                     <TableCell>
                       <div className="font-medium">{request.requestType}</div>
                     </TableCell>
                   )}
                   {visibleColumns.status && (
                     <TableCell>
                       <Badge variant={getStatusColor(request.status)}>{request.status}</Badge>
                     </TableCell>
                   )}
                   {visibleColumns.priority && (
                     <TableCell>
                       <Badge variant={getPriorityColor(request.priority)}>{request.priority}</Badge>
                     </TableCell>
                   )}
                   {visibleColumns.requester && (
                     <TableCell>
                       <div>
                         <div className="font-medium">{request.requester}</div>
                         <div className="text-sm text-muted-foreground">{request.requesterEmail}</div>
                       </div>
                     </TableCell>
                   )}
                   {visibleColumns.assignee && (
                     <TableCell>
                       <div className="font-medium">{request.assignee}</div>
                     </TableCell>
                   )}
                   {visibleColumns.submissionDate && (
                     <TableCell>
                       <div className="text-sm">{request.submissionDate}</div>
                     </TableCell>
                   )}
                   {visibleColumns.dueDate && (
                     <TableCell>
                       <div className="text-sm">{request.dueDate}</div>
                     </TableCell>
                   )}
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Conditionally render CreateDSR form */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-background z-50 overflow-auto">
          <CreateDSR onBack={() => setShowCreateForm(false)} />
        </div>
      )}
    </div>
  );
};

export default DSR;