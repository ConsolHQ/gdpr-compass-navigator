
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { FileText, Users, AlertTriangle, Shield, Building, CheckCircle, Plus } from 'lucide-react';

interface GDPRModule {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  activeTasks: number;
  completedTasks: number;
  assignedClients: number;
}

const gdprModules: GDPRModule[] = [
  {
    id: 'ropa',
    name: 'ROPA',
    description: 'Records of Processing Activities',
    icon: FileText,
    activeTasks: 5,
    completedTasks: 12,
    assignedClients: 8,
  },
  {
    id: 'dpia',
    name: 'DPIA',
    description: 'Data Protection Impact Assessments',
    icon: Shield,
    activeTasks: 3,
    completedTasks: 7,
    assignedClients: 5,
  },
  {
    id: 'dsr',
    name: 'DSR',
    description: 'Data Subject Requests',
    icon: Users,
    activeTasks: 8,
    completedTasks: 23,
    assignedClients: 12,
  },
  {
    id: 'breach',
    name: 'Data Breaches',
    description: 'Breach Management & Reporting',
    icon: AlertTriangle,
    activeTasks: 1,
    completedTasks: 3,
    assignedClients: 3,
  },
  {
    id: 'vendor',
    name: 'Third-Party Management',
    description: 'Vendor & Processor Management',
    icon: Building,
    activeTasks: 4,
    completedTasks: 15,
    assignedClients: 9,
  },
];

const GDPRModules = () => {
  const [selectedModules, setSelectedModules] = useState<string[]>([]);

  const handleSelectModule = (moduleId: string) => {
    setSelectedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const handleBulkComplete = () => {
    console.log('Bulk completing tasks for modules:', selectedModules);
    setSelectedModules([]);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>GDPR Modules</CardTitle>
            <CardDescription>Manage compliance modules and create tasks</CardDescription>
          </div>
          {selectedModules.length > 0 && (
            <Button onClick={handleBulkComplete} variant="outline">
              <CheckCircle className="mr-2 h-4 w-4" />
              Complete Tasks ({selectedModules.length} modules)
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {gdprModules.map((module) => {
            const IconComponent = module.icon;
            const isSelected = selectedModules.includes(module.id);
            
            return (
              <Card 
                key={module.id} 
                className={`cursor-pointer transition-all ${
                  isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-md'
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => handleSelectModule(module.id)}
                      />
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <CardTitle className="text-lg">{module.name}</CardTitle>
                    <CardDescription className="text-sm">{module.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Active Tasks</span>
                      <Badge variant="outline">{module.activeTasks}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Completed</span>
                      <Badge variant="secondary">{module.completedTasks}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Assigned Clients</span>
                      <Badge>{module.assignedClients}</Badge>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <Button size="sm" className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Create Task
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      View All Tasks
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default GDPRModules;
