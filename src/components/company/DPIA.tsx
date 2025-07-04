
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  Shield, 
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

const DPIA = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);
  const [visibleColumns, setVisibleColumns] = useState({
    title: true,
    status: true,
    riskLevel: true,
    progress: true,
    dueDate: true,
    assessor: true,
    dataTypes: true,
  });
  
  const dpiaAssessments = [
    {
      id: 'DPIA-001',
      title: 'Customer Analytics Platform',
      description: 'Implementation of new customer behavior analytics system',
      riskLevel: 'High',
      status: 'In Progress',
      progress: 65,
      dueDate: '2024-02-15',
      assessor: 'John Smith',
      lastUpdated: '2024-01-20',
      dataTypes: ['Behavioral data', 'Personal preferences', 'Transaction history'],
      risks: ['Profiling', 'Automated decision-making', 'Third-party access'],
    },
    {
      id: 'DPIA-002',
      title: 'Employee Monitoring System',
      description: 'Deployment of workplace productivity monitoring tools',
      riskLevel: 'High',
      status: 'Review Required',
      progress: 90,
      dueDate: '2024-01-25',
      assessor: 'Sarah Johnson',
      lastUpdated: '2024-01-18',
      dataTypes: ['Activity logs', 'Communication data', 'Location data'],
      risks: ['Surveillance', 'Privacy intrusion', 'Employee rights'],
    },
    {
      id: 'DPIA-003',
      title: 'Marketing Automation Upgrade',
      description: 'Enhanced personalization features for marketing campaigns',
      riskLevel: 'Medium',
      status: 'Completed',
      progress: 100,
      dueDate: '2024-01-10',
      assessor: 'Mike Davis',
      lastUpdated: '2024-01-10',
      dataTypes: ['Contact information', 'Purchase history', 'Website behavior'],
      risks: ['Consent management', 'Data accuracy', 'Opt-out mechanisms'],
    },
  ];

  const columns = [
    { key: 'title', label: 'Title', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'riskLevel', label: 'Risk Level', sortable: true },
    { key: 'progress', label: 'Progress', sortable: true },
    { key: 'dueDate', label: 'Due Date', sortable: true },
    { key: 'assessor', label: 'Assessor', sortable: true },
    { key: 'dataTypes', label: 'Data Types', sortable: false },
  ];

  const processedAssessments = useMemo(() => {
    let filtered = dpiaAssessments.filter(assessment =>
      assessment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assessment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assessment.assessor.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortColumn && sortDirection) {
      filtered.sort((a, b) => {
        let aValue = a[sortColumn as keyof typeof a];
        let bValue = b[sortColumn as keyof typeof b];
        
        if (sortColumn === 'progress') {
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
  }, [dpiaAssessments, searchTerm, sortColumn, sortDirection]);

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
      setSelectedRows(processedAssessments.map(assessment => assessment.id));
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

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High': return 'destructive';
      case 'Medium': return 'default';
      case 'Low': return 'secondary';
      default: return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'default';
      case 'In Progress': return 'secondary';
      case 'Review Required': return 'destructive';
      case 'Draft': return 'outline';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return CheckCircle;
      case 'In Progress': return Clock;
      case 'Review Required': return AlertTriangle;
      default: return Clock;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 mt-1">{processedAssessments.length} assessments</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New DPIA
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search DPIA assessments..."
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

      {/* DPIA Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total DPIAs</p>
                <p className="text-2xl font-bold">{dpiaAssessments.length}</p>
              </div>
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High Risk</p>
                <p className="text-2xl font-bold text-red-600">
                  {dpiaAssessments.filter(d => d.riskLevel === 'High').length}
                </p>
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
                <p className="text-2xl font-bold text-orange-600">
                  {dpiaAssessments.filter(d => d.status === 'In Progress').length}
                </p>
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
                <p className="text-2xl font-bold text-green-600">
                  {dpiaAssessments.filter(d => d.status === 'Completed').length}
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
                    checked={selectedRows.length === processedAssessments.length}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                {visibleColumns.title && (
                  <TableHead className="font-semibold">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('title')}
                      className="h-auto p-0 font-semibold"
                    >
                      Title
                      {getSortIcon('title')}
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
                {visibleColumns.riskLevel && (
                  <TableHead className="font-semibold">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('riskLevel')}
                      className="h-auto p-0 font-semibold"
                    >
                      Risk Level
                      {getSortIcon('riskLevel')}
                    </Button>
                  </TableHead>
                )}
                {visibleColumns.progress && (
                  <TableHead className="font-semibold">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('progress')}
                      className="h-auto p-0 font-semibold"
                    >
                      Progress
                      {getSortIcon('progress')}
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
                {visibleColumns.assessor && (
                  <TableHead className="font-semibold">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('assessor')}
                      className="h-auto p-0 font-semibold"
                    >
                      Assessor
                      {getSortIcon('assessor')}
                    </Button>
                  </TableHead>
                )}
                {visibleColumns.dataTypes && (
                  <TableHead className="font-semibold">Data Types</TableHead>
                )}
                <TableHead className="font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processedAssessments.map((assessment) => {
                const StatusIcon = getStatusIcon(assessment.status);
                return (
                  <TableRow key={assessment.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedRows.includes(assessment.id)}
                        onCheckedChange={(checked) => handleSelectRow(assessment.id, !!checked)}
                      />
                    </TableCell>
                    {visibleColumns.title && (
                      <TableCell>
                        <div>
                          <div className="font-medium">{assessment.title}</div>
                          <div className="text-sm text-gray-500">{assessment.id}</div>
                        </div>
                      </TableCell>
                    )}
                    {visibleColumns.status && (
                      <TableCell>
                        <Badge variant={getStatusColor(assessment.status)}>
                          <StatusIcon className="mr-1 h-3 w-3" />
                          {assessment.status}
                        </Badge>
                      </TableCell>
                    )}
                    {visibleColumns.riskLevel && (
                      <TableCell>
                        <Badge variant={getRiskColor(assessment.riskLevel)}>
                          {assessment.riskLevel}
                        </Badge>
                      </TableCell>
                    )}
                    {visibleColumns.progress && (
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm">{assessment.progress}%</div>
                          <Progress value={assessment.progress} className="h-2 w-16" />
                        </div>
                      </TableCell>
                    )}
                    {visibleColumns.dueDate && (
                      <TableCell>{assessment.dueDate}</TableCell>
                    )}
                    {visibleColumns.assessor && (
                      <TableCell>{assessment.assessor}</TableCell>
                    )}
                    {visibleColumns.dataTypes && (
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {assessment.dataTypes.slice(0, 2).map((type, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {type}
                            </Badge>
                          ))}
                          {assessment.dataTypes.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{assessment.dataTypes.length - 2}
                            </Badge>
                          )}
                        </div>
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
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {processedAssessments.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center">
            <Shield className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium">No DPIA assessments found</h3>
            <p className="text-gray-600">Create your first Data Protection Impact Assessment.</p>
            <Button className="mt-4">
              <Plus className="mr-2 h-4 w-4" />
              Create DPIA
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DPIA;
