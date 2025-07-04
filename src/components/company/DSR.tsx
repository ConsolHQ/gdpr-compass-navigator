
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, Plus, Search, Clock, CheckCircle, AlertTriangle, Eye, MessageSquare, Download } from 'lucide-react';

const DSR = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
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

  const filteredRequests = dsrRequests.filter(request =>
    request.requester.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: dsrRequests.length,
    pending: dsrRequests.filter(r => r.status !== 'Completed').length,
    urgent: dsrRequests.filter(r => r.status === 'Urgent').length,
    overdue: dsrRequests.filter(r => r.daysRemaining < 0).length,
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div></div>
        <Button>
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

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by requester, type, or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* DSR Table */}
      <Card>
        <CardHeader>
          <CardTitle>Data Subject Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request Type</TableHead>
                <TableHead>Requester</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Days Remaining</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Legal Basis</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request) => {
                const StatusIcon = getStatusIcon(request.status);
                return (
                  <TableRow key={request.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{request.type}</div>
                        <div className="text-sm text-gray-500">{request.id}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{request.subject}</div>
                        <div className="text-sm text-gray-500">{request.requester}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(request.status)}>
                        <StatusIcon className="mr-1 h-3 w-3" />
                        {request.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getPriorityColor(request.priority)}>
                        {request.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>{request.dueDate}</TableCell>
                    <TableCell>
                      <span className={request.daysRemaining < 7 ? 'text-red-600 font-medium' : ''}>
                        {request.daysRemaining > 0 ? `${request.daysRemaining} days` : 'Overdue'}
                      </span>
                    </TableCell>
                    <TableCell>{request.assignedTo}</TableCell>
                    <TableCell>
                      <div className="text-sm">{request.legalBasis}</div>
                    </TableCell>
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

      {filteredRequests.length === 0 && (
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
