import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { BarChart } from 'lucide-react';

const ReportsSettings = () => {
  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart className="h-5 w-5" />
            <span>Reports Configuration</span>
          </CardTitle>
          <CardDescription>Configure automated reports and compliance monitoring</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-medium mb-3">Automated Reports</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Monthly Compliance Report</Label>
                  <p className="text-sm text-muted-foreground">Automated monthly compliance summary</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>ROPA Status Report</Label>
                  <p className="text-sm text-muted-foreground">Weekly ROPA completion status</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>DSR Processing Report</Label>
                  <p className="text-sm text-muted-foreground">Daily DSR processing updates</p>
                </div>
                <Switch />
              </div>
            </div>
          </div>
          <Separator />
          <div>
            <h3 className="font-medium mb-3">Report Recipients</h3>
            <div className="space-y-2">
              <Input placeholder="Add email address" />
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-primary/10 text-primary rounded text-sm">dpo@techcorp.com</span>
                <span className="px-2 py-1 bg-primary/10 text-primary rounded text-sm">admin@techcorp.com</span>
              </div>
            </div>
          </div>
          <Button>Save Report Settings</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsSettings;