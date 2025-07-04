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
  Building, 
  Plus, 
  Search, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Eye, 
  Edit, 
  Link,
  Columns,
  ChevronsUpDown,
  ChevronUp,
  ChevronDown,
  Archive,
  Copy,
  Download,
  X
} from 'lucide-react';

interface ThirdPartiesProps {
  onNavigate?: (path: string) => void;
}

const ThirdParties = ({ onNavigate }: ThirdPartiesProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);
  const [visibleColumns, setVisibleColumns] = useState({
    name: true,
    category: true,
    status: true,
    contractStatus: true,
    riskLevel: true,
    location: true,
    dpuSigned: true,
  });
  
  const thirdParties = [
    {
      id: 'TP-001',
      name: 'CloudCRM Solutions Ltd',
      type: 'Data Processor',
      category: 'CRM Platform',
      status: 'Active',
      contractStatus: 'Valid',
      relationship: 'Processor',
      dpuSigned: true,
      dpuDate: '2023-06-15',
      contractExpiry: '2025-06-14',
      dataTypes: ['Customer names', 'Email addresses', 'Phone numbers', 'Purchase history'],
      purposes: ['Customer relationship management', 'Sales analytics'],
      location: 'European Union',
      riskLevel: 'Low',
      lastReview: '2024-01-10',
      contact: 'legal@cloudcrm.com',
      website: 'https://cloudcrm.com',
    },
    {
      id: 'TP-002',
      name: 'Global Analytics Inc',
      type: 'Data Processor',
      category: 'Analytics Platform',
      status: 'Active',
      contractStatus: 'Expiring Soon',
      relationship: 'Processor',
      dpuSigned: true,
      dpuDate: '2022-03-20',
      contractExpiry: '2024-03-19',
      dataTypes: ['Website behavior', 'IP addresses', 'Device information'],
      purposes: ['Website analytics', 'User behavior analysis'],
      location: 'United States',
      riskLevel: 'Medium',
      lastReview: '2023-12-15',
      contact: 'privacy@globalanalytics.com',
      website: 'https://globalanalytics.com',
    },
    {
      id: 'TP-003',
      name: 'SecurePay Systems',
      type: 'Data Processor',
      category: 'Payment Processor',
      status: 'Active',
      contractStatus: 'Valid',
      relationship: 'Processor',
      dpuSigned: true,
      dpuDate: '2023-09-10',
      contractExpiry: '2026-09-09',
      dataTypes: ['Payment information', 'Billing addresses', 'Transaction data'],
      purposes: ['Payment processing', 'Fraud prevention'],
      location: 'European Union',
      riskLevel: 'High',
      lastReview: '2024-01-05',
      contact: 'compliance@securepay.com',
      website: 'https://securepay.com',
    },
    {
      id: 'TP-004',
      name: 'MailStream Marketing',
      type: 'Data Processor',
      category: 'Email Marketing',
      status: 'Under Review',
      contractStatus: 'Pending',
      relationship: 'Processor',
      dpuSigned: false,
      dpuDate: null,
      contractExpiry: null,
      dataTypes: ['Email addresses', 'Marketing preferences', 'Engagement data'],
      purposes: ['Email marketing', 'Campaign analytics'],
      location: 'United Kingdom',
      riskLevel: 'Medium',
      lastReview: '2024-01-20',
      contact: 'dpo@mailstream.co.uk',
      website: 'https://mailstream.co.uk',
    },
  ];

  const columns = [
    { key: 'name', label: 'Third Party', sortable: true },
    { key: 'category', label: 'Category', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'contractStatus', label: 'Contract Status', sortable: true },
    { key: 'riskLevel', label: 'Risk Level', sortable: true },
    { key: 'location', label: 'Location', sortable: true },
    { key: 'dpuSigned', label: 'DPU Signed', sortable: false },
  ];

  const processedThirdParties = useMemo(() => {
    let filtered = thirdParties.filter(tp =>
      tp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tp.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tp.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortColumn && sortDirection) {
      filtered.sort((a, b) => {
        let aValue = a[sortColumn as keyof typeof a];
        let bValue = b[sortColumn as keyof typeof b];
        
        aValue = String(aValue).toLowerCase();
        bValue = String(bValue).toLowerCase();
        
        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [thirdParties, searchTerm, sortColumn, sortDirection]);

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
      setSelectedRows(processedThirdParties.map(tp => tp.id));
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
      case 'Active': return 'default';
      case 'Under Review': return 'secondary';
      case 'Inactive': return 'outline';
      default: return 'outline';
    }
  };

  const getContractStatusColor = (status: string) => {
    switch (status) {
      case 'Valid': return 'default';
      case 'Expiring Soon': return 'destructive';
      case 'Pending': return 'secondary';
      case 'Expired': return 'destructive';
      default: return 'outline';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High': return 'destructive';
      case 'Medium': return 'default';
      case 'Low': return 'secondary';
      default: return 'outline';
    }
  };

  const stats = {
    total: thirdParties.length,
    active: thirdParties.filter(tp => tp.status === 'Active').length,
    highRisk: thirdParties.filter(tp => tp.riskLevel === 'High').length,
    expiringContracts: thirdParties.filter(tp => tp.contractStatus === 'Expiring Soon').length,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 mt-1">{processedThirdParties.length} third parties</p>
        </div>
        <Button onClick={() => onNavigate?.('/company/vendors/new')}>
          <Plus className="mr-2 h-4 w-4" />
          Add Third Party
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Third Parties</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Building className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High Risk</p>
                <p className="text-2xl font-bold text-red-600">{stats.highRisk}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Expiring Contracts</p>
                <p className="text-2xl font-bold text-orange-600">{stats.expiringContracts}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
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
              placeholder="Search third parties..."
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
                    checked={selectedRows.length === processedThirdParties.length}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                {visibleColumns.name && (
                  <TableHead className="font-semibold">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('name')}
                      className="h-auto p-0 font-semibold"
                    >
                      Third Party
                      {getSortIcon('name')}
                    </Button>
                  </TableHead>
                )}
                {visibleColumns.category && (
                  <TableHead className="font-semibold">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('category')}
                      className="h-auto p-0 font-semibold"
                    >
                      Category
                      {getSortIcon('category')}
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
                {visibleColumns.contractStatus && (
                  <TableHead className="font-semibold">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('contractStatus')}
                      className="h-auto p-0 font-semibold"
                    >
                      Contract Status
                      {getSortIcon('contractStatus')}
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
                {visibleColumns.location && (
                  <TableHead className="font-semibold">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort('location')}
                      className="h-auto p-0 font-semibold"
                    >
                      Location
                      {getSortIcon('location')}
                    </Button>
                  </TableHead>
                )}
                {visibleColumns.dpuSigned && (
                  <TableHead className="font-semibold">DPU Signed</TableHead>
                )}
                <TableHead className="font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {processedThirdParties.map((tp) => (
                <TableRow key={tp.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.includes(tp.id)}
                      onCheckedChange={(checked) => handleSelectRow(tp.id, !!checked)}
                    />
                  </TableCell>
                  {visibleColumns.name && (
                    <TableCell>
                      <div>
                        <div className="font-medium">{tp.name}</div>
                        <div className="text-sm text-gray-500">{tp.id}</div>
                      </div>
                    </TableCell>
                  )}
                  {visibleColumns.category && (
                    <TableCell>
                      <Badge variant="outline">{tp.category}</Badge>
                    </TableCell>
                  )}
                  {visibleColumns.status && (
                    <TableCell>
                      <Badge variant={getStatusColor(tp.status)}>
                        {tp.status}
                      </Badge>
                    </TableCell>
                  )}
                  {visibleColumns.contractStatus && (
                    <TableCell>
                      <Badge variant={getContractStatusColor(tp.contractStatus)}>
                        {tp.contractStatus}
                      </Badge>
                    </TableCell>
                  )}
                  {visibleColumns.riskLevel && (
                    <TableCell>
                      <Badge variant={getRiskColor(tp.riskLevel)}>
                        {tp.riskLevel}
                      </Badge>
                    </TableCell>
                  )}
                  {visibleColumns.location && (
                    <TableCell>{tp.location}</TableCell>
                  )}
                  {visibleColumns.dpuSigned && (
                    <TableCell>
                      <Badge variant={tp.dpuSigned ? 'default' : 'destructive'}>
                        {tp.dpuSigned ? 'Yes' : 'No'}
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
                        <Link className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {processedThirdParties.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center">
            <Building className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium">No third parties found</h3>
            <p className="text-gray-600">Add third party vendors and processors to manage compliance.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ThirdParties;