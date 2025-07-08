import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, ExternalLink, AlertTriangle, FileEdit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OutstandingItems = () => {
  const navigate = useNavigate();

  const outstandingItems = [
    {
      id: 1,
      type: 'DPIA Required',
      description: 'Marketing Analytics requires a DPIA assessment',
      ropaId: 'ROPA-003',
      priority: 'High',
      action: 'Create DPIA',
      route: '/company/dpia/create',
      variant: 'destructive' as const
    },
    {
      id: 2,
      type: 'Draft ROPA',
      description: 'Vendor Management ROPA is incomplete',
      ropaId: 'ROPA-004',
      priority: 'Medium',
      action: 'Complete ROPA',
      route: '/company/ropa/edit/ROPA-004',
      variant: 'secondary' as const
    }
  ];

  const handleItemClick = (item: typeof outstandingItems[0]) => {
    if (item.route) {
      navigate(item.route);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'secondary';
      case 'low':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getTypeIcon = (type: string) => {
    if (type.includes('DPIA')) {
      return <AlertTriangle className="h-4 w-4" />;
    }
    return <FileEdit className="h-4 w-4" />;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" onClick={() => navigate('/company/ropa')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to ROPA
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Outstanding Items</h1>
          <p className="text-gray-600 mt-1">Items requiring attention across your ROPA activities</p>
        </div>
      </div>

      {/* Outstanding Items Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-2xl font-bold text-red-600">1</p>
                <p className="text-sm text-gray-600">High Priority</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <FileEdit className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold text-yellow-600">1</p>
                <p className="text-sm text-gray-600">Medium Priority</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="h-5 w-5 rounded-full bg-green-500" />
              <div>
                <p className="text-2xl font-bold text-green-600">0</p>
                <p className="text-sm text-gray-600">Low Priority</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Outstanding Items Table */}
      <Card>
        <CardHeader>
          <CardTitle>Outstanding Items ({outstandingItems.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>ROPA ID</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {outstandingItems.map((item) => (
                <TableRow 
                  key={item.id} 
                  className="cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => handleItemClick(item)}
                >
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(item.type)}
                      <Badge variant={item.variant}>{item.type}</Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-md">
                      <p className="text-sm">{item.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-mono">{item.ropaId}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getPriorityColor(item.priority) as any}>
                      {item.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" className="flex items-center space-x-1">
                      <span>{item.action}</span>
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Empty State */}
      {outstandingItems.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <div className="h-6 w-6 rounded-full bg-green-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">All caught up!</h3>
            <p className="text-gray-600">
              No outstanding items requiring attention at this time.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OutstandingItems;