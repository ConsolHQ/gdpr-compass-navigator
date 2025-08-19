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
  AlertTriangle, 
  Plus, 
  Search, 
  Clock, 
  CheckCircle, 
  Shield, 
  Eye, 
  Edit, 
  FileText,
  Columns,
  ChevronsUpDown,
  ChevronUp,
  ChevronDown,
  Archive,
  Copy,
  Download,
  X,
  Filter,
  Bot
} from 'lucide-react';
import { DataBreachCopilotPanel } from '@/components/ai/data-breach';

interface DataBreachesProps {
  onNavigate?: (path: string) => void;
}

const DataBreaches: React.FC<DataBreachesProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [visibleColumns, setVisibleColumns] = useState({
    id: true,
    title: true,
    severity: true,
    status: true,
    affectedRecords: true,
    reportedDate: true,
    investigator: true,
    reportedToAuthority: true,
  });
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});
  const [showFilters, setShowFilters] = useState<Record<string, boolean>>({});
  
  const breachIncidents = [
    {
      id: 'BREACH-001',
      title: 'Email Database Exposure',
      description: 'Unauthorized access to customer email database through compromised admin account',
      severity: 'High',
      status: 'Under Investigation',
      reportedDate: '2024-01-22',
      discoveredDate: '2024-01-21',
      affectedRecords: 1250,
      dataTypes: ['Email addresses', 'Names', 'Phone numbers'],
      reportedToAuthority: true,
      authorityReportDate: '2024-01-22',
      dataSubjectsNotified: false,
      investigator: 'Sarah Johnson',
      containmentStatus: 'In Progress',
      riskAssessment: 'Medium likelihood of harm',
    },
    {
      id: 'BREACH-002',
      title: 'Laptop Theft - HR Department',
      description: 'Company laptop containing employee data stolen from HR office',
      severity: 'Medium',
      status: 'Contained',
      reportedDate: '2024-01-15',
      discoveredDate: '2024-01-15',
      affectedRecords: 85,
      dataTypes: ['Employee records', 'Social security numbers', 'Bank details'],
      reportedToAuthority: true,
      authorityReportDate: '2024-01-16',
      dataSubjectsNotified: true,
      investigator: 'Mike Davis',
      containmentStatus: 'Complete',
      riskAssessment: 'Low likelihood of harm - encrypted device',
    },
    {
      id: 'BREACH-003',
      title: 'Website Form Vulnerability',
      description: 'SQL injection vulnerability exposed customer contact information',
      severity: 'Low',
      status: 'Resolved',
      reportedDate: '2024-01-10',
      discoveredDate: '2024-01-09',
      affectedRecords: 45,
      dataTypes: ['Contact forms', 'Email addresses', 'Message content'],
      reportedToAuthority: false,
      authorityReportDate: null,
      dataSubjectsNotified: true,
      investigator: 'John Smith',
      containmentStatus: 'Complete',
      riskAssessment: 'Minimal risk - limited data exposure',
    },
  ];

  const columns = [
    { key: 'id', label: 'Identifier', sortable: true },
    { key: 'title', label: 'Incident Title', sortable: true },
    { key: 'severity', label: 'Severity', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'affectedRecords', label: 'Affected Records', sortable: true },
    { key: 'reportedDate', label: 'Reported Date', sortable: true },
    { key: 'investigator', label: 'Investigator', sortable: true },
    { key: 'reportedToAuthority', label: 'Authority Reported', sortable: false },
  ];

  const processedBreaches = useMemo(() => {
    let filtered = breachIncidents.filter(breach =>
      breach.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      breach.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      breach.investigator.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Apply column filters
    Object.entries(columnFilters).forEach(([column, filterValue]) => {
      if (filterValue) {
        filtered = filtered.filter(breach => {
          const value = breach[column as keyof typeof breach];
          return String(value).toLowerCase().includes(filterValue.toLowerCase());
        });
      }
    });

    if (sortColumn && sortDirection) {
      filtered.sort((a, b) => {
        let aValue = a[sortColumn as keyof typeof a];
        let bValue = b[sortColumn as keyof typeof b];
        
        if (sortColumn === 'affectedRecords') {
          aValue = Number(aValue);
          bValue = Number(bValue);
        } else if (sortColumn === 'reportedDate') {
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
  }, [breachIncidents, searchTerm, sortColumn, sortDirection, columnFilters]);

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
      setSelectedRows(processedBreaches.map(breach => breach.id));
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

  const toggleFilter = (column: string) => {
    setShowFilters(prev => ({ ...prev, [column]: !prev[column] }));
  };

  const handleFilterChange = (column: string, value: string) => {
    setColumnFilters(prev => ({ ...prev, [column]: value }));
  };

  const clearFilter = (column: string) => {
    setColumnFilters(prev => ({ ...prev, [column]: '' }));
    setShowFilters(prev => ({ ...prev, [column]: false }));
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'destructive';
      case 'Medium': return 'default';
      case 'Low': return 'secondary';
      default: return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved': return 'default';
      case 'Contained': return 'secondary';
      case 'Under Investigation': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Resolved': return CheckCircle;
      case 'Under Investigation': return AlertTriangle;
      default: return Clock;
    }
  };

  const stats = {
    total: breachIncidents.length,
    highSeverity: breachIncidents.filter(b => b.severity === 'High').length,
    underInvestigation: breachIncidents.filter(b => b.status === 'Under Investigation').length,
    resolved: breachIncidents.filter(b => b.status === 'Resolved').length,
  };

  const handleReportBreach = () => {
    if (onNavigate) {
      onNavigate('/company/breaches/report');
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 mt-1">{processedBreaches.length} incidents</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            onClick={() => setIsCopilotOpen(true)}
          >
            <Bot className="mr-2 h-4 w-4" />
            AI Assist
          </Button>
          <Button className="bg-red-600 hover:bg-red-700" onClick={handleReportBreach}>
            <Plus className="mr-2 h-4 w-4" />
            Report Breach
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Incidents</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High Severity</p>
                <p className="text-2xl font-bold text-red-600">{stats.highSeverity}</p>
              </div>
              <Shield className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Under Investigation</p>
                <p className="text-2xl font-bold text-orange-600">{stats.underInvestigation}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Resolved</p>
                <p className="text-2xl font-bold text-green-600">{stats.resolved}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search data breaches..."
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
                  <Download className="mr-2 h-4 w-4" />
                  Export
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
                    checked={selectedRows.length === processedBreaches.length}
                    onCheckedChange={handleSelectAll}
                  />
                 </TableHead>
                {visibleColumns.id && (
                  <TableHead className="font-semibold">
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        onClick={() => handleSort('id')}
                        className="h-auto p-0 font-semibold"
                      >
                        Identifier
                        {getSortIcon('id')}
                      </Button>
                    </div>
                  </TableHead>
                )}
                {visibleColumns.title && (
                  <TableHead className="font-semibold">
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        onClick={() => handleSort('title')}
                        className="h-auto p-0 font-semibold"
                      >
                        Incident Title
                        {getSortIcon('title')}
                      </Button>
                      <Popover open={showFilters.title} onOpenChange={(open) => setShowFilters(prev => ({ ...prev, title: open }))}>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => toggleFilter('title')}>
                            <Filter className="h-3 w-3" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-56">
                          <div className="space-y-2">
                            <h4 className="font-medium">Filter Title</h4>
                            <Input
                              placeholder="Filter by title..."
                              value={columnFilters.title || ''}
                              onChange={(e) => handleFilterChange('title', e.target.value)}
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => clearFilter('title')}
                              className="w-full"
                            >
                              Clear Filter
                            </Button>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </TableHead>
                )}
                {visibleColumns.severity && (
                  <TableHead className="font-semibold">
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        onClick={() => handleSort('severity')}
                        className="h-auto p-0 font-semibold"
                      >
                        Severity
                        {getSortIcon('severity')}
                      </Button>
                      <Popover open={showFilters.severity} onOpenChange={(open) => setShowFilters(prev => ({ ...prev, severity: open }))}>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => toggleFilter('severity')}>
                            <Filter className="h-3 w-3" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-56">
                          <div className="space-y-2">
                            <h4 className="font-medium">Filter Severity</h4>
                            <Input
                              placeholder="Filter by severity..."
                              value={columnFilters.severity || ''}
                              onChange={(e) => handleFilterChange('severity', e.target.value)}
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => clearFilter('severity')}
                              className="w-full"
                            >
                              Clear Filter
                            </Button>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </TableHead>
                )}
                {visibleColumns.status && (
                  <TableHead className="font-semibold">
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        onClick={() => handleSort('status')}
                        className="h-auto p-0 font-semibold"
                      >
                        Status
                        {getSortIcon('status')}
                      </Button>
                      <Popover open={showFilters.status} onOpenChange={(open) => setShowFilters(prev => ({ ...prev, status: open }))}>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => toggleFilter('status')}>
                            <Filter className="h-3 w-3" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-56">
                          <div className="space-y-2">
                            <h4 className="font-medium">Filter Status</h4>
                            <Input
                              placeholder="Filter by status..."
                              value={columnFilters.status || ''}
                              onChange={(e) => handleFilterChange('status', e.target.value)}
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => clearFilter('status')}
                              className="w-full"
                            >
                              Clear Filter
                            </Button>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </TableHead>
                )}
                {visibleColumns.affectedRecords && (
                  <TableHead className="font-semibold">
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        onClick={() => handleSort('affectedRecords')}
                        className="h-auto p-0 font-semibold"
                      >
                        Affected Records
                        {getSortIcon('affectedRecords')}
                      </Button>
                      <Popover open={showFilters.affectedRecords} onOpenChange={(open) => setShowFilters(prev => ({ ...prev, affectedRecords: open }))}>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => toggleFilter('affectedRecords')}>
                            <Filter className="h-3 w-3" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-56">
                          <div className="space-y-2">
                            <h4 className="font-medium">Filter Affected Records</h4>
                            <Input
                              placeholder="Filter by records count..."
                              value={columnFilters.affectedRecords || ''}
                              onChange={(e) => handleFilterChange('affectedRecords', e.target.value)}
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => clearFilter('affectedRecords')}
                              className="w-full"
                            >
                              Clear Filter
                            </Button>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </TableHead>
                )}
                {visibleColumns.reportedDate && (
                  <TableHead className="font-semibold">
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        onClick={() => handleSort('reportedDate')}
                        className="h-auto p-0 font-semibold"
                      >
                        Reported Date
                        {getSortIcon('reportedDate')}
                      </Button>
                      <Popover open={showFilters.reportedDate} onOpenChange={(open) => setShowFilters(prev => ({ ...prev, reportedDate: open }))}>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => toggleFilter('reportedDate')}>
                            <Filter className="h-3 w-3" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-56">
                          <div className="space-y-2">
                            <h4 className="font-medium">Filter Reported Date</h4>
                            <Input
                              placeholder="Filter by date..."
                              value={columnFilters.reportedDate || ''}
                              onChange={(e) => handleFilterChange('reportedDate', e.target.value)}
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => clearFilter('reportedDate')}
                              className="w-full"
                            >
                              Clear Filter
                            </Button>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </TableHead>
                )}
                {visibleColumns.investigator && (
                  <TableHead className="font-semibold">
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        onClick={() => handleSort('investigator')}
                        className="h-auto p-0 font-semibold"
                      >
                        Investigator
                        {getSortIcon('investigator')}
                      </Button>
                      <Popover open={showFilters.investigator} onOpenChange={(open) => setShowFilters(prev => ({ ...prev, investigator: open }))}>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => toggleFilter('investigator')}>
                            <Filter className="h-3 w-3" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-56">
                          <div className="space-y-2">
                            <h4 className="font-medium">Filter Investigator</h4>
                            <Input
                              placeholder="Filter by investigator..."
                              value={columnFilters.investigator || ''}
                              onChange={(e) => handleFilterChange('investigator', e.target.value)}
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => clearFilter('investigator')}
                              className="w-full"
                            >
                              Clear Filter
                            </Button>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </TableHead>
                )}
                {visibleColumns.reportedToAuthority && (
                  <TableHead className="font-semibold">Authority Reported</TableHead>
                )}
                <TableHead className="font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processedBreaches.map((breach) => {
                const StatusIcon = getStatusIcon(breach.status);
                return (
                  <TableRow key={breach.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedRows.includes(breach.id)}
                        onCheckedChange={(checked) => handleSelectRow(breach.id, !!checked)}
                      />
                     </TableCell>
                     {visibleColumns.id && (
                       <TableCell>
                         <span className="text-sm font-mono">{breach.id}</span>
                       </TableCell>
                     )}
                     {visibleColumns.title && (
                       <TableCell>
                         <div className="font-medium">{breach.title}</div>
                       </TableCell>
                     )}
                    {visibleColumns.severity && (
                      <TableCell>
                        <Badge variant={getSeverityColor(breach.severity)}>
                          {breach.severity}
                        </Badge>
                      </TableCell>
                    )}
                    {visibleColumns.status && (
                      <TableCell>
                        <Badge variant={getStatusColor(breach.status)}>
                          <StatusIcon className="mr-1 h-3 w-3" />
                          {breach.status}
                        </Badge>
                      </TableCell>
                    )}
                    {visibleColumns.affectedRecords && (
                      <TableCell>
                        <span className="font-medium">{breach.affectedRecords.toLocaleString()}</span>
                      </TableCell>
                    )}
                    {visibleColumns.reportedDate && (
                      <TableCell>{breach.reportedDate}</TableCell>
                    )}
                    {visibleColumns.investigator && (
                      <TableCell>{breach.investigator}</TableCell>
                    )}
                    {visibleColumns.reportedToAuthority && (
                      <TableCell>
                        <Badge variant={breach.reportedToAuthority ? 'default' : 'secondary'}>
                          {breach.reportedToAuthority ? 'Yes' : 'No'}
                        </Badge>
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
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4" />
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

      {processedBreaches.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center">
            <AlertTriangle className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium">No data breaches found</h3>
            <p className="text-gray-600">Data breach incidents will appear here when reported.</p>
          </CardContent>
        </Card>
      )}

      {/* AI Copilot Panel */}
      <DataBreachCopilotPanel
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        formData={formData}
        onFormUpdate={setFormData}
        onGeneratedBreachApply={(generatedData) => {
          setFormData(prev => ({ ...prev, ...generatedData }));
          setIsCopilotOpen(false);
        }}
      />
    </div>
  );
};

export default DataBreaches;