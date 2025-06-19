
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, CheckCircle, Clock, AlertTriangle, Filter } from 'lucide-react';

interface Task {
  id: string;
  name: string;
  module: string;
  assignedCompanies: string[];
  status: 'pending' | 'in-progress' | 'completed';
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
}

const mockTasks: Task[] = [
  {
    id: '1',
    name: 'ROPA Assessment',
    module: 'ROPA',
    assignedCompanies: ['ACME Corporation', 'Global Healthcare Inc'],
    status: 'pending',
    dueDate: '2025-07-15',
    priority: 'high',
  },
  {
    id: '2',
    name: 'DPIA Review',
    module: 'DPIA',
    assignedCompanies: ['FinTech Solutions'],
    status: 'in-progress',
    dueDate: '2025-07-01',
    priority: 'medium',
  },
  {
    id: '3',
    name: 'Vendor Assessment',
    module: 'Third-Party Management',
    assignedCompanies: ['ACME Corporation', 'FinTech Solutions'],
    status: 'completed',
    dueDate: '2025-06-20',
    priority: 'low',
  },
];

const TaskManagement = () => {
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  const handleSelectTask = (taskId: string) => {
    setSelectedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleSelectAll = () => {
    setSelectedTasks(
      selectedTasks.length === tasks.length 
        ? [] 
        : tasks.map(task => task.id)
    );
  };

  const handleBulkComplete = () => {
    setTasks(prev => 
      prev.map(task => 
        selectedTasks.includes(task.id) 
          ? { ...task, status: 'completed' as const }
          : task
      )
    );
    setSelectedTasks([]);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Task Management</CardTitle>
            <CardDescription>Manage GDPR compliance tasks across client companies</CardDescription>
          </div>
          <div className="flex space-x-2">
            {selectedTasks.length > 0 && (
              <Button onClick={handleBulkComplete} variant="outline">
                <CheckCircle className="mr-2 h-4 w-4" />
                Complete Selected ({selectedTasks.length})
              </Button>
            )}
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Task
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
          <Badge variant="outline">{tasks.length} total tasks</Badge>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedTasks.length === tasks.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Task Name</TableHead>
              <TableHead>Module</TableHead>
              <TableHead>Assigned Companies</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedTasks.includes(task.id)}
                    onCheckedChange={() => handleSelectTask(task.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">{task.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{task.module}</Badge>
                </TableCell>
                <TableCell>
                  <div className="max-w-48">
                    {task.assignedCompanies.map((company, index) => (
                      <Badge key={index} variant="secondary" className="mr-1 mb-1">
                        {company}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(task.status)}
                    <Badge className={getStatusColor(task.status)}>
                      {task.status}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getPriorityColor(task.priority)}>
                    {task.priority}
                  </Badge>
                </TableCell>
                <TableCell>{task.dueDate}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TaskManagement;
