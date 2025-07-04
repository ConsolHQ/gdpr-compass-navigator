
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Users, 
  Plus, 
  Search, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Eye, 
  MessageSquare, 
  Download,
  Columns,
  ChevronsUpDown,
  ChevronUp,
  ChevronDown,
  Archive,
  Copy,
  X
} from 'lucide-react';

const DSR = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);
  const [visibleColumns, setVisibleColumns] = useState({
    type: true,
    requester: true,
    status: true,
    priority: true,
    dueDate: true,
    daysRemaining: true,
    assignedTo: true,
    legalBasis: true,
  });
  
  const dsrRequests = [
    {
      id: 'DSR-001',
      type: 'Data Access',
      requester: 'john.doe@email.com',
      subject: 'John Doe',
      description: 'Request for copy of all personal data held',
      status: 'In Progress',
      priority: 'Medium',
      submittedDate: '2024-01-20',
      dueDate: '2024-02-19',
      assignedTo: 'Sarah Johnson',
      daysRemaining: 25,
      legalBasis: 'Article 15 - Right of Access',
    },
    {
      id: 'DSR-002',
      type: 'Data Deletion',
      requester: 'jane.smith@email.com',
      subject: 'Jane Smith',
      description: 'Request to delete all personal data - account closure',
      status: 'Urgent',
      priority: 'High',
      submittedDate: '2024-01-22',
      dueDate: '2024-02-21',
      assignedTo: 'Mike Davis',
      daysRemaining: 23,
      legalBasis: 'Article 17 - Right to Erasure',
    },
    {
      id: 'DSR-003',
      type: 'Data Rectification',
      requester: 'bob.wilson@email.com',
      subject: 'Bob Wilson',
      description: 'Request to correct incorrect address information',
      status: 'Pending Review',
      priority: 'Low',
      submittedDate: '2024-01-25',
      dueDate: '2024-02-24',
      assignedTo: 'John Smith',
      daysRemaining: 20,
      legalBasis: 'Article 16 - Right to Rectification',
    },
    {
      id: 'DSR-004',
      type: 'Data Portability',
      requester: 'alice.brown@email.com',
      subject: 'Alice Brown',
      description: 'Request for data export in machine-readable format',
      status: 'Completed',
      priority: 'Medium',
      submittedDate: '2024-01-15',
      dueDate: '2024-02-14',
      assignedTo: 'Sarah Johnson',
      daysRemaining: 0,
      legalBasis: 'Article 20 - Right to Data Portability',
    },
    {
      id: 'DSR-005',
      type: 'Processing Objection',
      requester: 'charlie.davis@email.com',
      subject: 'Charlie Davis',
      description: 'Objection to marketing data processing',
      status: 'In Progress',
      priority: 'Medium',
      submittedDate: '2024-01-18',
      dueDate: '2024-02-17',
      assignedTo: 'Mike Davis',
      daysRemaining: 27,
      legalBasis: 'Article 21 - Right to Object',
    },
  ];

  const columns = [
    { key: 'type', label: 'Request Type', sortable: true },
    { key: 'requester', label: 'Requester', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'priority', label: 'Priority', sortable: true },
    { key: 'dueDate', label: 'Due Date', sortable: true },
    { key: 'daysRemaining', label: 'Days Remaining', sortable: true },
    { key: 'assignedTo', label: 'Assigned To', sortable: true },
    { key: 'legalBasis', label: 'Legal Basis', sortable: false },
  ];

  const processedRequests = useMemo(() => {
    let filtered = dsrRequests.filter(request =>
      request.requester.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortColumn && sortDirection) {
      filtered.sort((a, b) => {
        let aValue = a[sortColumn as keyof typeof a];
        let bValue = b[sortColumn as keyof typeof b];
        
        if (sortColumn === 'daysRemaining') {
          aValue = Number(aValue);
          bValue = Number(bValue);
        } else if (sortColumn === 'dueDate') {
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
  }, [dsrRequests, searchTerm, sortColumn, sortDirection]);

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'default';
      case 'In Progress': return 'secondary';
      case 'Urgent': return 'destructive';
      case 'Pending Review': return 'outline';
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return CheckCircle;
      case 'Urgent': return AlertTriangle;
      default: return Clock;
    }
  };

  const stats = {
    total: dsrRequests.length,
    pending: dsrRequests.filter(r => r.status !== 'Completed').length,
    urgent: dsrRequests.filter(r => r.status === 'Urgent').length,
    overdue: dsrRequests.filter(r => r.daysRemaining < 0).length,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 mt-1">{processedRequests.length} requests</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New DSR
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by requester, type, or subject..."
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
                        setVisibleColumns(prev => ({ ...prev, [column.key]: checked }));
                      }}
                    />
                    <label htmlFor={column.key} className="text-sm">{column.label}</label>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
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
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
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
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-orange-600">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Urgent</p>
                <p className="text-2xl font-bold text-red-600">{stats.urgent}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">
                  {dsrRequests.filter(r => r.status === 'Completed').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Table */}
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
                {visibleColumns.type && (
                  <TableHead className="font-semibold">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('type')}
                      className="h-auto p-0 font-semibold"
                    >
                      Request Type
                      {getSortIcon('type')}
                    </Button>
                  </TableHead>
                )}
                {visibleColumns.requester && (
                  <TableHead className="font-semibold">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('requester')}
                      className="h-auto p-0 font-semibold"
                    >
                      Requester
                      {getSortIcon('requester')}
                    </Button>
                  </TableHead>
                )}
                {visibleColumns.status && (
                  <TableHead className="font-semibold">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('status')}
                      className="h-auto p-0 font-semibold"
                    >
                      Status
                      {getSortIcon('status')}
                    </Button>
                  </TableHead>
                )}
                {visibleColumns.priority && (
                  <TableHead className="font-semibold">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('priority')}
                      className="h-auto p-0 font-semibold"
                    >
                      Priority
                      {getSortIcon('priority')}
                    </Button>
                  </TableHead>
                )}
                {visibleColumns.dueDate && (
                  <TableHead className="font-semibold">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('dueDate')}
                      className="h-auto p-0 font-semibold"
                    >
                      Due Date
                      {getSortIcon('dueDate')}
                    </Button>
                  </TableHead>
                )}
                {visibleColumns.daysRemaining && (
                  <TableHead className="font-semibold">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('daysRemaining')}
                      className="h-auto p-0 font-semibold"
                    >
                      Days Remaining
                      {getSortIcon('daysRemaining')}
                    </Button>
                  </TableHead>
                )}
                {visibleColumns.assignedTo && (
                  <TableHead className="font-semibold">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('assignedTo')}
                      className="h-auto p-0 font-semibold"
                    >
                      Assigned To
                      {getSortIcon('assignedTo')}
                    </Button>
                  </TableHead>
                )}
                {visibleColumns.legalBasis && (
                  <TableHead className="font-semibold">Legal Basis</TableHead>
                )}
                <TableHead className="font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processedRequests.map((request) => {
                const StatusIcon = getStatusIcon(request.status);
                return (
                  <TableRow key={request.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedRows.includes(request.id)}
                        onCheckedChange={(checked) => handleSelectRow(request.id, !!checked)}
                      />
                    </TableCell>
                    {visibleColumns.type && (
                      <TableCell>
                        <div>
                          <div className="font-medium">{request.type}</div>
                          <div className="text-sm text-gray-500">{request.id}</div>
                        </div>
                      </TableCell>
                    )}
                    {visibleColumns.requester && (
                      <TableCell>
                        <div>
                          <div className="font-medium">{request.subject}</div>
                          <div className="text-sm text-gray-500">{request.requester}</div>
                        </div>
                      </TableCell>
                    )}
                    {visibleColumns.status && (
                      <TableCell>
                        <Badge variant={getStatusColor(request.status)}>
                          <StatusIcon className="mr-1 h-3 w-3" />
                          {request.status}
                        </Badge>
                      </TableCell>
                    )}
                    {visibleColumns.priority && (
                      <TableCell>
                        <Badge variant={getPriorityColor(request.priority)}>
                          {request.priority}
                        </Badge>
                      </TableCell>
                    )}
                    {visibleColumns.dueDate && (
                      <TableCell>{request.dueDate}</TableCell>
                    )}
                    {visibleColumns.daysRemaining && (
                      <TableCell>
                        <span className={request.daysRemaining < 7 ? 'text-red-600 font-medium' : ''}>
                          {request.daysRemaining > 0 ? `${request.daysRemaining} days` : 'Overdue'}
                        </span>
                      </TableCell>
                    )}
                    {visibleColumns.assignedTo && (
                      <TableCell>{request.assignedTo}</TableCell>
                    )}
                    {visibleColumns.legalBasis && (
                      <TableCell>
                        <div className="text-sm">{request.legalBasis}</div>
                      </TableCell>
                    )}
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {processedRequests.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium">No DSR requests found</h3>
            <p className="text-gray-600">Data subject requests will appear here when submitted.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DSR;
