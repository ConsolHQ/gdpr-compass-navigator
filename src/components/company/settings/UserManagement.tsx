import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Users } from 'lucide-react';

const UserManagement = () => {
  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>User Management</span>
          </CardTitle>
          <CardDescription>Manage user access and roles within your organization</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Active Users</h3>
              <p className="text-sm text-muted-foreground">8 users with access to this workspace</p>
            </div>
            <Button>Invite User</Button>
          </div>
          <Separator />
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">John Smith</p>
                <p className="text-sm text-muted-foreground">john.smith@techcorp.com • Admin</p>
              </div>
              <Button variant="outline" size="sm">Edit</Button>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Sarah Johnson</p>
                <p className="text-sm text-muted-foreground">sarah.johnson@techcorp.com • Editor</p>
              </div>
              <Button variant="outline" size="sm">Edit</Button>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Mike Davis</p>
                <p className="text-sm text-muted-foreground">mike.davis@techcorp.com • Viewer</p>
              </div>
              <Button variant="outline" size="sm">Edit</Button>
            </div>
          </div>
          <Button variant="outline" className="w-full">View All Users</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;