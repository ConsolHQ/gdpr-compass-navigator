import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Bot, 
  Settings, 
  Activity, 
  Zap, 
  FileText, 
  Shield, 
  UserCheck, 
  AlertTriangle,
  Book,
  Link,
  BarChart3,
  Play,
  Pause,
  Eye,
  History
} from 'lucide-react';

interface AutomationAgent {
  id: string;
  name: string;
  description: string;
  module: string;
  status: 'active' | 'inactive' | 'paused';
  confidence: 'high' | 'medium' | 'low';
  lastRun?: string;
  runsToday: number;
  successRate: number;
  triggers: string[];
  icon: React.ComponentType<any>;
}

const mockAgents: AutomationAgent[] = [
  {
    id: 'dsr-triage',
    name: 'DSR Triage Agent',
    description: 'Automatically classifies and prioritizes data subject requests',
    module: 'DSR',
    status: 'active',
    confidence: 'high',
    lastRun: '2 minutes ago',
    runsToday: 23,
    successRate: 94,
    triggers: ['dsr.created', 'dsr.updated'],
    icon: UserCheck
  },
  {
    id: 'ropa-drafter',
    name: 'ROPA Drafting Agent',
    description: 'Generates ROPA entries from data dictionary and templates',
    module: 'ROPA',
    status: 'active',
    confidence: 'medium',
    lastRun: '15 minutes ago',
    runsToday: 7,
    successRate: 87,
    triggers: ['ropa.create_new', 'data_dictionary.updated'],
    icon: FileText
  },
  {
    id: 'dpia-copilot',
    name: 'DPIA Co-Pilot',
    description: 'Assists with risk assessment and mitigation suggestions',
    module: 'DPIA',
    status: 'active',
    confidence: 'high',
    lastRun: '1 hour ago',
    runsToday: 4,
    successRate: 91,
    triggers: ['dpia.created', 'dpia.risk_assessment'],
    icon: Shield
  },
  {
    id: 'breach-triage',
    name: 'Breach Triage Agent',
    description: 'Evaluates breach severity and notification requirements',
    module: 'Breaches',
    status: 'paused',
    confidence: 'medium',
    lastRun: '2 days ago',
    runsToday: 0,
    successRate: 89,
    triggers: ['breach.created', 'incident.reported'],
    icon: AlertTriangle
  },
  {
    id: 'doc-classifier',
    name: 'Document Classifier',
    description: 'Auto-tags and extracts clauses from uploaded documents',
    module: 'Documents',
    status: 'active',
    confidence: 'high',
    lastRun: '30 minutes ago',
    runsToday: 12,
    successRate: 96,
    triggers: ['document.uploaded', 'document.updated'],
    icon: Book
  }
];

export const AutomationCenter: React.FC = () => {
  const [agents, setAgents] = useState(mockAgents);
  const [selectedAgent, setSelectedAgent] = useState<AutomationAgent | null>(null);

  const toggleAgentStatus = (agentId: string) => {
    setAgents(prev => prev.map(agent => 
      agent.id === agentId 
        ? { ...agent, status: agent.status === 'active' ? 'inactive' : 'active' }
        : agent
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-emerald-100 text-emerald-800';
      case 'paused': return 'bg-amber-100 text-amber-800';
      case 'inactive': return 'bg-slate-100 text-slate-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const getModuleIcon = (module: string) => {
    switch (module) {
      case 'DSR': return UserCheck;
      case 'ROPA': return FileText;
      case 'DPIA': return Shield;
      case 'Breaches': return AlertTriangle;
      case 'Documents': return Book;
      case 'Vendors': return Link;
      default: return Bot;
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Automation Center</h1>
          <p className="text-muted-foreground">
            Manage and monitor AI agents across your privacy compliance workflows
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-2xl font-bold text-emerald-600">
              {agents.filter(a => a.status === 'active').length}
            </div>
            <div className="text-sm text-muted-foreground">Active Agents</div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">
              {agents.reduce((sum, a) => sum + a.runsToday, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Runs Today</div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="agents">Agents</TabsTrigger>
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
          <TabsTrigger value="logs">Activity Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
                <Bot className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{agents.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Today</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-600">
                  {agents.filter(a => a.runsToday > 0).length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round(agents.reduce((sum, a) => sum + a.successRate, 0) / agents.length)}%
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Runs</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {agents.reduce((sum, a) => sum + a.runsToday, 0)}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Most Active Agents</CardTitle>
                <CardDescription>Agents with the highest activity today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {agents
                    .sort((a, b) => b.runsToday - a.runsToday)
                    .slice(0, 3)
                    .map((agent) => {
                      const IconComponent = agent.icon;
                      return (
                        <div key={agent.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <IconComponent className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <div className="font-medium">{agent.name}</div>
                              <div className="text-sm text-muted-foreground">{agent.module}</div>
                            </div>
                          </div>
                          <Badge variant="secondary">{agent.runsToday} runs</Badge>
                        </div>
                      );
                    })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Agent Status</CardTitle>
                <CardDescription>Current status of all automation agents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {agents.map((agent) => {
                    const IconComponent = agent.icon;
                    return (
                      <div key={agent.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <IconComponent className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{agent.name}</div>
                            <div className="text-sm text-muted-foreground">{agent.lastRun}</div>
                          </div>
                        </div>
                        <Badge className={getStatusColor(agent.status)}>
                          {agent.status}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="agents" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {agents.map((agent) => {
              const IconComponent = agent.icon;
              return (
                <Card key={agent.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <IconComponent className="h-6 w-6 text-primary" />
                        <div>
                          <CardTitle className="text-lg">{agent.name}</CardTitle>
                          <CardDescription>{agent.module}</CardDescription>
                        </div>
                      </div>
                      <Switch
                        checked={agent.status === 'active'}
                        onCheckedChange={() => toggleAgentStatus(agent.id)}
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{agent.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <Badge className={getStatusColor(agent.status)}>
                        {agent.status}
                      </Badge>
                      <div className="text-sm text-muted-foreground">
                        {agent.successRate}% success rate
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-medium">Runs Today</div>
                        <div className="text-muted-foreground">{agent.runsToday}</div>
                      </div>
                      <div>
                        <div className="font-medium">Last Run</div>
                        <div className="text-muted-foreground">{agent.lastRun}</div>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-1" />
                        Configure
                      </Button>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <History className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="workflows">
          <Card>
            <CardHeader>
              <CardTitle>Workflow Builder</CardTitle>
              <CardDescription>
                Create custom automation workflows by connecting agents and triggers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Zap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Workflow Builder Coming Soon</h3>
                <p className="text-muted-foreground mb-4">
                  Design custom automation flows with drag-and-drop interface
                </p>
                <Button variant="outline">
                  Request Early Access
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle>Activity Logs</CardTitle>
              <CardDescription>
                Monitor agent activities and system events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Activity Logs</h3>
                <p className="text-muted-foreground mb-4">
                  Detailed logging and audit trail functionality
                </p>
                <Button variant="outline">
                  View Full Logs
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};