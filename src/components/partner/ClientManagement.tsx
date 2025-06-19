
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Upload, Archive, Filter, Eye, MoreHorizontal } from 'lucide-react';

interface Client {
  id: string;
  name: string;
  industry: string;
  status: 'active' | 'inactive' | 'archived';
  activeTasks: number;
  completedTasks: number;
  lastActivity: string;
  healthScore: number;
}

const mockClients: Client[] = [
  {
    id: '1',
    name: 'ACME Corporation',
    industry: 'Technology',
    status: 'active',
    activeTasks: 3,
    completedTasks: 12,
    lastActivity: '2 hours ago',
    healthScore: 85,
  },
  {
    id: '2',
    name: 'Global Healthcare Inc',
    industry: 'Healthcare',
    status: 'active',
    activeTasks: 1,
    completedTasks: 8,
    lastActivity: '1 day ago',
    healthScore: 92,
  },
  {
    id: '3',
    name: 'FinTech Solutions',
    industry: 'Finance',
    status: 'inactive',
    activeTasks: 0,
    completedTasks: 5,
    lastActivity: '1 week ago',
    healthScore: 78,
  },
];

interface ClientManagementProps {
  onViewClient: (clientId: string) => void;
}

const ClientManagement = ({ onViewClient }: ClientManagementProps) => {
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [clients, setClients] = useState<Client[]>(mockClients);

  const handleSelectClient = (clientId: string) => {
    setSelectedClients(prev => 
      prev.includes(clientId) 
        ? prev.filter(id => id !== clientId)
        : [...prev, clientId]
    );
  };

  const handleSelectAll = () => {
    setSelectedClients(
      selectedClients.length === clients.length 
        ? [] 
        : clients.map(client => client.id)
    );
  };

  const handleBulkArchive = () => {
    setClients(prev => 
      prev.map(client => 
        selectedClients.includes(client.id) 
          ? { ...client, status: 'archived' as const }
          : client
      )
    );
    setSelectedClients([]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Client Management</CardTitle>
            <CardDescription>Manage your GDPR compliance clients</CardDescription>
          </div>
          <div className="flex space-x-2">
            {selectedClients.length > 0 && (
              <>
                <Button onClick={handleBulkArchive} variant="outline">
                  <Archive className="mr-2 h-4 w-4" />
                  Archive Selected ({selectedClients.length})
                </Button>
              </>
            )}
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" />
              Import Clients
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Client
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-4">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Badge variant="outline">{clients.length} total clients</Badge>
          <Badge variant="outline">{clients.filter(c => c.status === 'active').length} active</Badge>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedClients.length === clients.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Client Name</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Active Tasks</TableHead>
              <TableHead>Completed Tasks</TableHead>
              <TableHead>Health Score</TableHead>
              <TableHead>Last Activity</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedClients.includes(client.id)}
                    onCheckedChange={() => handleSelectClient(client.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">{client.name}</TableCell>
                <TableCell>{client.industry}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(client.status)}>
                    {client.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{client.activeTasks}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{client.completedTasks}</Badge>
                </TableCell>
                <TableCell>
                  <span className={`font-medium ${getHealthScoreColor(client.healthScore)}`}>
                    {client.healthScore}%
                  </span>
                </TableCell>
                <TableCell className="text-sm text-gray-600">{client.lastActivity}</TableCell>
                <TableCell>
                  <div className="flex space-x-1">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onViewClient(client.id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ClientManagement;
