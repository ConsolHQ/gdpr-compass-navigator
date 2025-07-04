import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
import { Search, Plus, Filter, MoreHorizontal, Eye, Edit, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock data for LIA
const mockLIAs = [
  {
    id: '1',
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
    id: '2',
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
    id: '3',
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
  const [statusFilter, setStatusFilter] = useState('all');
  const [purposeFilter, setPurposeFilter] = useState('all');

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

  const filteredLIAs = mockLIAs.filter(lia => {
    const matchesSearch = lia.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lia.dataSubject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lia.purpose.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lia.status === statusFilter;
    const matchesPurpose = purposeFilter === 'all' || lia.purpose === purposeFilter;
    
    return matchesSearch && matchesStatus && matchesPurpose;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setPurposeFilter('all');
  };

  const hasActiveFilters = searchTerm !== '' || statusFilter !== 'all' || purposeFilter !== 'all';

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-end items-center">
        <Button onClick={() => onNavigate?.('/company/assessments/lia/new')} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New LIA
        </Button>
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
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>

              <Select value={purposeFilter} onValueChange={setPurposeFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Purpose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Purposes</SelectItem>
                  <SelectItem value="Direct Marketing">Direct Marketing</SelectItem>
                  <SelectItem value="Analytics & Insights">Analytics & Insights</SelectItem>
                  <SelectItem value="Security & Fraud Prevention">Security & Fraud Prevention</SelectItem>
                </SelectContent>
              </Select>

              {hasActiveFilters && (
                <Button variant="outline" onClick={clearFilters} className="whitespace-nowrap">
                  Clear filters
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Assessment Title</TableHead>
                <TableHead>Data Subject</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Legitimate Interest</TableHead>
                <TableHead>Balancing Test</TableHead>
                <TableHead>Created Date</TableHead>
                <TableHead>Reviewer</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLIAs.map((lia) => (
                <TableRow key={lia.id}>
                  <TableCell>
                    <div className="font-medium">{lia.title}</div>
                  </TableCell>
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

          {filteredLIAs.length === 0 && (
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