import React, { useState, useEffect } from 'react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  FileText, 
  Shield, 
  Users, 
  AlertTriangle, 
  Database, 
  Settings, 
  Sparkles, 
  BookOpen,
  Eye,
  Plus,
  BarChart3
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onClose();
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [onClose]);

  const handleSelect = (action: () => void) => {
    action();
    onClose();
    setSearch('');
  };

  const commands = [
    // Navigation
    {
      group: 'Navigation',
      items: [
        { 
          icon: <BarChart3 className="h-4 w-4" />, 
          title: 'Dashboard', 
          action: () => navigate('/') 
        },
        { 
          icon: <FileText className="h-4 w-4" />, 
          title: 'ROPA Records', 
          action: () => navigate('/company/ropa') 
        },
        { 
          icon: <Shield className="h-4 w-4" />, 
          title: 'DPIAs', 
          action: () => navigate('/company/dpia') 
        },
        { 
          icon: <Users className="h-4 w-4" />, 
          title: 'Data Subject Requests', 
          action: () => navigate('/company/dsr') 
        },
        { 
          icon: <AlertTriangle className="h-4 w-4" />, 
          title: 'Data Breaches', 
          action: () => navigate('/company/breaches') 
        },
        { 
          icon: <Database className="h-4 w-4" />, 
          title: 'Third Parties', 
          action: () => navigate('/company/third-parties') 
        },
        { 
          icon: <BookOpen className="h-4 w-4" />, 
          title: 'Document Library', 
          action: () => navigate('/company/documents') 
        }
      ]
    },
    // Quick Actions
    {
      group: 'Quick Actions',
      items: [
        { 
          icon: <Plus className="h-4 w-4" />, 
          title: 'Create ROPA Record', 
          action: () => navigate('/company/ropa/create') 
        },
        { 
          icon: <Plus className="h-4 w-4" />, 
          title: 'Create DPIA', 
          action: () => navigate('/company/dpia/create') 
        },
        { 
          icon: <Plus className="h-4 w-4" />, 
          title: 'Report Data Breach', 
          action: () => navigate('/company/breaches/create') 
        },
        { 
          icon: <Eye className="h-4 w-4" />, 
          title: 'View Outstanding Items', 
          action: () => navigate('/company/ropa/outstanding') 
        }
      ]
    },
    // AI Copilot
    {
      group: 'AI Copilot',
      items: [
        { 
          icon: <Sparkles className="h-4 w-4" />, 
          title: 'Ask Privacy Copilot', 
          badge: 'AI',
          action: () => console.log('Open AI Copilot') 
        },
        { 
          icon: <Settings className="h-4 w-4" />, 
          title: 'Automation Center', 
          action: () => navigate('/company/ai-assist/automation-center') 
        },
        { 
          icon: <FileText className="h-4 w-4" />, 
          title: 'Generate ROPA Draft', 
          badge: 'AI',
          action: () => console.log('Generate ROPA') 
        },
        { 
          icon: <Shield className="h-4 w-4" />, 
          title: 'DPIA Risk Assessment', 
          badge: 'AI',
          action: () => console.log('DPIA Risk Assessment') 
        }
      ]
    },
    // Settings
    {
      group: 'Settings',
      items: [
        { 
          icon: <Settings className="h-4 w-4" />, 
          title: 'Company Settings', 
          action: () => navigate('/company/settings') 
        },
        { 
          icon: <Sparkles className="h-4 w-4" />, 
          title: 'AI Integration', 
          action: () => navigate('/company/settings/ai-integration') 
        },
        { 
          icon: <Database className="h-4 w-4" />, 
          title: 'Data Dictionary', 
          action: () => navigate('/company/settings/data-dictionary') 
        }
      ]
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden p-0 shadow-lg max-w-2xl">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandInput 
              placeholder="Type a command or search..." 
              value={search}
              onValueChange={setSearch}
            />
          </div>
          <CommandList className="max-h-[300px] overflow-y-auto">
            <CommandEmpty>No results found.</CommandEmpty>
            
            {commands.map((group, groupIndex) => (
              <React.Fragment key={group.group}>
                {groupIndex > 0 && <CommandSeparator />}
                <CommandGroup heading={group.group}>
                  {group.items.map((item, itemIndex) => (
                    <CommandItem
                      key={itemIndex}
                      onSelect={() => handleSelect(item.action)}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      {item.icon}
                      <span className="flex-1">{item.title}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </React.Fragment>
            ))}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
};