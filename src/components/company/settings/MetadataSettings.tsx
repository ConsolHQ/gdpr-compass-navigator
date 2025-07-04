import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Database } from 'lucide-react';

const MetadataSettings = () => {
  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="h-5 w-5" />
            <span>Meta Data Configuration</span>
          </CardTitle>
          <CardDescription>Configure data categories, legal bases, and processing purposes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-medium mb-3">Data Categories</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 border rounded">
                <span className="text-sm">Personal identifiers</span>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
              <div className="flex items-center justify-between p-2 border rounded">
                <span className="text-sm">Contact information</span>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
              <div className="flex items-center justify-between p-2 border rounded">
                <span className="text-sm">Financial data</span>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
            </div>
            <Button variant="outline" size="sm" className="mt-2">Add Category</Button>
          </div>
          <Separator />
          <div>
            <h3 className="font-medium mb-3">Legal Bases</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 border rounded">
                <span className="text-sm">Consent</span>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
              <div className="flex items-center justify-between p-2 border rounded">
                <span className="text-sm">Contract performance</span>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
              <div className="flex items-center justify-between p-2 border rounded">
                <span className="text-sm">Legal obligation</span>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
            </div>
            <Button variant="outline" size="sm" className="mt-2">Add Legal Basis</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetadataSettings;