import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Building, 
  ExternalLink, 
  Plus, 
  X, 
  Mail, 
  CreditCard, 
  Users,
  AlertTriangle,
  CheckCircle,
  Eye,
  Import
} from 'lucide-react';
import { ConfidenceBadge } from '@/components/ai/ConfidenceBadge';
import { SourceChip } from '@/components/ai/SourceChip';

interface DiscoveredVendor {
  id: string;
  name: string;
  domain: string;
  type: 'email' | 'sso' | 'finance' | 'api' | 'manual';
  confidence: 'high' | 'medium' | 'low';
  discoverySource: string;
  suggestedCategory: string;
  estimatedRisk: 'low' | 'medium' | 'high' | 'critical';
  dataProcessed: string[];
  lastSeen: Date;
  existsInSystem: boolean;
}

export const VendorDiscovery: React.FC = () => {
  const [discoveredVendors] = useState<DiscoveredVendor[]>([
    {
      id: '1',
      name: 'Slack Technologies',
      domain: 'slack.com',
      type: 'sso',
      confidence: 'high',
      discoverySource: 'SSO Login Events',
      suggestedCategory: 'Communication Platform',
      estimatedRisk: 'medium',
      dataProcessed: ['Employee Names', 'Email Addresses', 'Messages'],
      lastSeen: new Date('2024-01-20'),
      existsInSystem: false
    },
    {
      id: '2',
      name: 'Stripe Inc.',
      domain: 'stripe.com',
      type: 'finance',
      confidence: 'high',
      discoverySource: 'Finance Export - January',
      suggestedCategory: 'Payment Processor',
      estimatedRisk: 'high',
      dataProcessed: ['Payment Data', 'Customer Names', 'Credit Card Info'],
      lastSeen: new Date('2024-01-22'),
      existsInSystem: true
    },
    {
      id: '3',
      name: 'Mailchimp',
      domain: 'mailchimp.com',
      type: 'email',
      confidence: 'medium',
      discoverySource: 'Email Pattern Analysis',
      suggestedCategory: 'Marketing Automation',
      estimatedRisk: 'medium',
      dataProcessed: ['Email Addresses', 'Names', 'Marketing Preferences'],
      lastSeen: new Date('2024-01-18'),
      existsInSystem: false
    },
    {
      id: '4',
      name: 'Unknown Vendor (analytics-api.example.com)',
      domain: 'analytics-api.example.com',
      type: 'api',
      confidence: 'low',
      discoverySource: 'API Call Logs',
      suggestedCategory: 'Analytics Service',
      estimatedRisk: 'medium',
      dataProcessed: ['User Behavior', 'Device Info'],
      lastSeen: new Date('2024-01-21'),
      existsInSystem: false
    }
  ]);

  const [dismissedVendors, setDismissedVendors] = useState<string[]>([]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'sso': return <Users className="h-4 w-4" />;
      case 'finance': return <CreditCard className="h-4 w-4" />;
      case 'email': return <Mail className="h-4 w-4" />;
      case 'api': return <ExternalLink className="h-4 w-4" />;
      default: return <Building className="h-4 w-4" />;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'critical': return 'bg-red-50 text-red-700 border-red-200';
      case 'high': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'medium': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'low': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'sso': return 'SSO';
      case 'finance': return 'Finance';
      case 'email': return 'Email';
      case 'api': return 'API';
      default: return 'Manual';
    }
  };

  const handleAddVendor = (vendor: DiscoveredVendor) => {
    console.log('Adding vendor:', vendor.name);
    // In a real app, this would add to the vendor list
  };

  const handleDismiss = (vendorId: string) => {
    setDismissedVendors([...dismissedVendors, vendorId]);
  };

  const handleViewDetails = (vendor: DiscoveredVendor) => {
    console.log('View vendor details:', vendor);
  };

  const visibleVendors = discoveredVendors.filter(v => !dismissedVendors.includes(v.id));
  const newVendors = visibleVendors.filter(v => !v.existsInSystem);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Discovered Vendors
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              AI has automatically discovered {newVendors.length} potential new vendors from your systems
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Import className="h-4 w-4 mr-2" />
              Import All
            </Button>
            <Button variant="outline" size="sm">
              Configure Sources
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {visibleVendors.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Building className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No new vendors discovered</p>
          </div>
        ) : (
          <div className="space-y-4">
            {visibleVendors.map((vendor) => (
              <div key={vendor.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="p-2 bg-muted rounded-md">
                      {getTypeIcon(vendor.type)}
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-medium">{vendor.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {getTypeLabel(vendor.type)}
                        </Badge>
                        <ConfidenceBadge confidence={vendor.confidence} size="sm" />
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getRiskColor(vendor.estimatedRisk)}`}
                        >
                          {vendor.estimatedRisk.toUpperCase()} Risk
                        </Badge>
                        {vendor.existsInSystem && (
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            In System
                          </Badge>
                        )}
                      </div>
                      
                      <div className="text-sm text-muted-foreground">
                        <span className="font-medium">Domain:</span> {vendor.domain} • 
                        <span className="font-medium ml-2">Category:</span> {vendor.suggestedCategory} • 
                        <span className="font-medium ml-2">Last Seen:</span> {vendor.lastSeen.toLocaleDateString()}
                      </div>
                      
                      <div className="space-y-2">
                        <div>
                          <span className="text-xs font-medium text-muted-foreground">Discovery Source:</span>
                          <SourceChip 
                            source={{
                              type: 'data-dictionary',
                              reference: vendor.discoverySource,
                              description: `Discovered via ${vendor.discoverySource}`
                            }}
                            size="sm"
                          />
                        </div>
                        
                        <div>
                          <span className="text-xs font-medium text-muted-foreground">Estimated Data Processed:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {vendor.dataProcessed.map((data, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {data}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      {vendor.estimatedRisk === 'high' || vendor.estimatedRisk === 'critical' ? (
                        <div className="flex items-center gap-2 p-2 bg-orange-50 border border-orange-200 rounded-md">
                          <AlertTriangle className="h-4 w-4 text-orange-600" />
                          <span className="text-sm text-orange-800">
                            High-risk vendor - DPA review recommended
                          </span>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => handleViewDetails(vendor)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => handleDismiss(vendor.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    {!vendor.existsInSystem && (
                      <Button 
                        size="sm" 
                        onClick={() => handleAddVendor(vendor)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Vendor
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};