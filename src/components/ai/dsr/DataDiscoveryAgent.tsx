import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Database, FileText, Shield, Download, Eye, AlertTriangle } from 'lucide-react';
import { ConfidenceBadge } from '../ConfidenceBadge';
import { AutoFillButton } from '../AutoFillButton';

interface DataDiscoveryAgentProps {
  requesterInfo: {
    name: string;
    email: string;
    phone?: string;
  };
  requestType: string;
  onDiscoveryComplete: (results: DiscoveryResults) => void;
}

interface DataRecord {
  id: string;
  system: string;
  dataType: string;
  category: string;
  records: number;
  lastUpdated: string;
  sensitivity: 'low' | 'medium' | 'high';
  status: 'found' | 'processing' | 'ready' | 'redacted';
  containsThirdParty: boolean;
}

interface DiscoveryResults {
  totalRecords: number;
  systemsSearched: number;
  dataCategories: string[];
  sensitiveDataFound: boolean;
  thirdPartyDataDetected: boolean;
  estimatedExportSize: string;
  records: DataRecord[];
  recommendations: string[];
}

export const DataDiscoveryAgent: React.FC<DataDiscoveryAgentProps> = ({
  requesterInfo,
  requestType,
  onDiscoveryComplete
}) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchProgress, setSearchProgress] = useState(0);
  const [discoveryResults, setDiscoveryResults] = useState<DiscoveryResults | null>(null);
  const [selectedRecords, setSelectedRecords] = useState<string[]>([]);
  const [currentSystem, setCurrentSystem] = useState('');

  const connectedSystems = [
    'CRM Database',
    'Email Server',
    'HR System',
    'Marketing Platform',
    'Support Tickets',
    'Analytics Platform',
    'Document Storage',
    'Backup Systems'
  ];

  const handleStartDiscovery = async () => {
    setIsSearching(true);
    setSearchProgress(0);

    // Simulate searching through different systems
    for (let i = 0; i < connectedSystems.length; i++) {
      setCurrentSystem(connectedSystems[i]);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSearchProgress(((i + 1) / connectedSystems.length) * 100);
    }

    // Mock discovery results
    const mockRecords: DataRecord[] = [
      {
        id: '1',
        system: 'CRM Database',
        dataType: 'Customer Profile',
        category: 'Identity Data',
        records: 1,
        lastUpdated: '2024-01-15',
        sensitivity: 'high',
        status: 'found',
        containsThirdParty: false
      },
      {
        id: '2',
        system: 'Email Server',
        dataType: 'Email Communications',
        category: 'Communication Data',
        records: 247,
        lastUpdated: '2024-01-18',
        sensitivity: 'medium',
        status: 'found',
        containsThirdParty: true
      },
      {
        id: '3',
        system: 'Support Tickets',
        dataType: 'Support Interactions',
        category: 'Service Data',
        records: 12,
        lastUpdated: '2024-01-10',
        sensitivity: 'low',
        status: 'found',
        containsThirdParty: false
      },
      {
        id: '4',
        system: 'Analytics Platform',
        dataType: 'Behavioral Data',
        category: 'Usage Data',
        records: 1543,
        lastUpdated: '2024-01-19',
        sensitivity: 'medium',
        status: 'found',
        containsThirdParty: false
      }
    ];

    const mockResults: DiscoveryResults = {
      totalRecords: mockRecords.reduce((sum, record) => sum + record.records, 0),
      systemsSearched: connectedSystems.length,
      dataCategories: [...new Set(mockRecords.map(r => r.category))],
      sensitiveDataFound: mockRecords.some(r => r.sensitivity === 'high'),
      thirdPartyDataDetected: mockRecords.some(r => r.containsThirdParty),
      estimatedExportSize: '2.4 MB',
      records: mockRecords,
      recommendations: [
        'Review all records before export',
        'Redact third-party personal data in email communications',
        'Verify identity data accuracy',
        'Consider data minimization for export'
      ]
    };

    setDiscoveryResults(mockResults);
    setIsSearching(false);
    onDiscoveryComplete(mockResults);
  };

  const handleRecordSelection = (recordId: string, checked: boolean) => {
    if (checked) {
      setSelectedRecords(prev => [...prev, recordId]);
    } else {
      setSelectedRecords(prev => prev.filter(id => id !== recordId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked && discoveryResults) {
      setSelectedRecords(discoveryResults.records.map(r => r.id));
    } else {
      setSelectedRecords([]);
    }
  };

  const getSensitivityColor = (sensitivity: string) => {
    switch (sensitivity) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      default: return 'secondary';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'default';
      case 'processing': return 'secondary';
      case 'redacted': return 'outline';
      default: return 'secondary';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5 text-primary" />
          Data Discovery Agent
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search Summary */}
        <div className="bg-muted/50 p-3 rounded-lg">
          <h4 className="font-medium text-sm mb-2">Search Parameters</h4>
          <div className="space-y-1 text-sm">
            <div><span className="font-medium">Subject:</span> {requesterInfo.name} ({requesterInfo.email})</div>
            <div><span className="font-medium">Request Type:</span> {requestType}</div>
            <div><span className="font-medium">Connected Systems:</span> {connectedSystems.length} systems</div>
          </div>
        </div>

        {!discoveryResults ? (
          <div className="text-center space-y-4">
            {isSearching ? (
              <div className="space-y-4">
                <Progress value={searchProgress} className="w-full" />
                <div className="space-y-2">
                  <p className="text-sm font-medium">Searching: {currentSystem}</p>
                  <p className="text-xs text-muted-foreground">
                    {Math.round(searchProgress)}% complete - scanning for personal data...
                  </p>
                </div>
              </div>
            ) : (
              <>
                <p className="text-muted-foreground text-sm">
                  Search across all connected systems to discover personal data for this requester.
                </p>
                <AutoFillButton
                  onAutoFill={handleStartDiscovery}
                  confidence="high"
                  description="Searches all connected data systems using advanced pattern matching and PII detection"
                  sources={connectedSystems}
                  variant="default"
                  size="default"
                >
                  Start Data Discovery
                </AutoFillButton>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {/* Discovery Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-primary">{discoveryResults.totalRecords}</div>
                <div className="text-sm text-muted-foreground">Total Records</div>
              </div>
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-primary">{discoveryResults.systemsSearched}</div>
                <div className="text-sm text-muted-foreground">Systems Searched</div>
              </div>
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-primary">{discoveryResults.dataCategories.length}</div>
                <div className="text-sm text-muted-foreground">Data Categories</div>
              </div>
              <div className="text-center p-3 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-primary">{discoveryResults.estimatedExportSize}</div>
                <div className="text-sm text-muted-foreground">Estimated Size</div>
              </div>
            </div>

            {/* Alerts */}
            {(discoveryResults.sensitiveDataFound || discoveryResults.thirdPartyDataDetected) && (
              <div className="space-y-2">
                {discoveryResults.sensitiveDataFound && (
                  <div className="flex items-center gap-2 p-2 bg-red-50 border border-red-200 rounded">
                    <Shield className="h-4 w-4 text-red-600" />
                    <span className="text-sm text-red-800">High sensitivity data detected - extra care required</span>
                  </div>
                )}
                {discoveryResults.thirdPartyDataDetected && (
                  <div className="flex items-center gap-2 p-2 bg-amber-50 border border-amber-200 rounded">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    <span className="text-sm text-amber-800">Third-party data found - redaction may be required</span>
                  </div>
                )}
              </div>
            )}

            {/* Data Categories */}
            <div className="space-y-2">
              <span className="text-sm font-medium">Data Categories Found</span>
              <div className="flex flex-wrap gap-2">
                {discoveryResults.dataCategories.map(category => (
                  <Badge key={category} variant="outline">{category}</Badge>
                ))}
              </div>
            </div>

            {/* Records Table */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Discovered Records</span>
                <div className="flex items-center gap-2">
                  {selectedRecords.length > 0 && (
                    <span className="text-sm text-muted-foreground">
                      {selectedRecords.length} selected
                    </span>
                  )}
                  <Button size="sm" variant="outline" disabled={selectedRecords.length === 0}>
                    <Download className="h-4 w-4 mr-2" />
                    Export Selected
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectedRecords.length === discoveryResults.records.length}
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead>System</TableHead>
                      <TableHead>Data Type</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Records</TableHead>
                      <TableHead>Sensitivity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {discoveryResults.records.map(record => (
                      <TableRow key={record.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedRecords.includes(record.id)}
                            onCheckedChange={(checked) => handleRecordSelection(record.id, checked as boolean)}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Database className="h-4 w-4 text-muted-foreground" />
                            {record.system}
                          </div>
                        </TableCell>
                        <TableCell>{record.dataType}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{record.category}</Badge>
                        </TableCell>
                        <TableCell>{record.records}</TableCell>
                        <TableCell>
                          <Badge variant={getSensitivityColor(record.sensitivity)}>
                            {record.sensitivity}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(record.status)}>
                            {record.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Recommendations */}
            <div className="space-y-2">
              <span className="text-sm font-medium">AI Recommendations</span>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <ul className="space-y-1">
                  {discoveryResults.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <FileText className="h-3 w-3 text-blue-600 mt-0.5" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};