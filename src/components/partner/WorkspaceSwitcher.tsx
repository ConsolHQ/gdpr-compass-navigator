import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Check, ChevronsUpDown, Building2, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

interface Workspace {
  id: string;
  name: string;
  company_name: string;
  status: string;
  sector?: string;
}

interface WorkspaceSwitcherProps {
  currentWorkspaceId?: string;
  onWorkspaceChange: (workspaceId: string) => void;
  onCreateWorkspace?: () => void;
}

export const WorkspaceSwitcher = ({ 
  currentWorkspaceId, 
  onWorkspaceChange,
  onCreateWorkspace 
}: WorkspaceSwitcherProps) => {
  const [open, setOpen] = useState(false);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState(true);

  const currentWorkspace = workspaces.find(w => w.id === currentWorkspaceId);

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const fetchWorkspaces = async () => {
    try {
      const { data, error } = await supabase
        .from('workspaces')
        .select('id, name, company_name, status, sector')
        .eq('status', 'active')
        .order('company_name');

      if (error) throw error;
      setWorkspaces(data || []);
    } catch (error) {
      console.error('Error fetching workspaces:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWorkspaceSelect = (workspaceId: string) => {
    onWorkspaceChange(workspaceId);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between"
        >
          {currentWorkspace ? (
            <div className="flex items-center space-x-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-xs">
                  {currentWorkspace.company_name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">
                  {currentWorkspace.company_name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {currentWorkspace.sector || 'No sector'}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span>Select workspace...</span>
            </div>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search workspaces..." />
          <CommandList>
            <CommandEmpty>
              {loading ? "Loading workspaces..." : "No workspaces found."}
            </CommandEmpty>
            <CommandGroup heading="Workspaces">
              {workspaces.map((workspace) => (
                <CommandItem
                  key={workspace.id}
                  value={workspace.company_name}
                  onSelect={() => handleWorkspaceSelect(workspace.id)}
                >
                  <div className="flex items-center space-x-2 flex-1">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">
                        {workspace.company_name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">
                          {workspace.company_name}
                        </span>
                        <Badge 
                          variant={workspace.status === 'active' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {workspace.status}
                        </Badge>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {workspace.sector || 'No sector specified'}
                      </span>
                    </div>
                  </div>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentWorkspaceId === workspace.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
            {onCreateWorkspace && (
              <CommandGroup>
                <CommandItem onSelect={onCreateWorkspace} className="text-blue-600">
                  <Plus className="mr-2 h-4 w-4" />
                  Create new workspace
                </CommandItem>
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};