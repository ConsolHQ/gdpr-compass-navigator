import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book } from 'lucide-react';

const DataDictionary = () => {
  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Book className="h-5 w-5" />
            <span>Data Dictionary</span>
          </CardTitle>
          <CardDescription>Define and manage your data processing terminology</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Dictionary Entries</h3>
              <p className="text-sm text-muted-foreground">45 terms defined</p>
            </div>
            <Button>Add Term</Button>
          </div>
          <div className="space-y-3">
            <div className="p-3 border rounded-lg">
              <h4 className="font-medium">Personal Data</h4>
              <p className="text-sm text-muted-foreground">Any information relating to an identified or identifiable natural person</p>
            </div>
            <div className="p-3 border rounded-lg">
              <h4 className="font-medium">Data Controller</h4>
              <p className="text-sm text-muted-foreground">The entity that determines the purposes and means of processing personal data</p>
            </div>
            <div className="p-3 border rounded-lg">
              <h4 className="font-medium">Data Processor</h4>
              <p className="text-sm text-muted-foreground">The entity that processes personal data on behalf of the controller</p>
            </div>
          </div>
          <Button variant="outline" className="w-full">View All Terms</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataDictionary;