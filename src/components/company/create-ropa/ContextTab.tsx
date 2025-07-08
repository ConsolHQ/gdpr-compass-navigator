import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Badge } from '@/components/ui/badge';
import { Plus, Check, ChevronsUpDown, X } from 'lucide-react';
import { useMetadata } from '@/hooks/useMetadata';
import { cn } from '@/lib/utils';

interface ContextTabProps {
  formData: any;
  setFormData: (data: any) => void;
  handleArrayFieldChange: (field: string, value: string, checked: boolean) => void;
}

const ContextTab = ({ formData, setFormData, handleArrayFieldChange }: ContextTabProps) => {
  const [showNewIMSystem, setShowNewIMSystem] = useState(false);
  const [internalRecipientsOpen, setInternalRecipientsOpen] = useState(false);
  const [externalRecipientsOpen, setExternalRecipientsOpen] = useState(false);
  const [countriesOpen, setCountriesOpen] = useState(false);
  const { getMetadataItems } = useMetadata();
  
  const departments = getMetadataItems('department');
  const vendors = getMetadataItems('vendor');
  const countries = getMetadataItems('country');

  const MultiSelectDropdown = ({ 
    options, 
    selectedValues, 
    onSelectionChange, 
    placeholder, 
    isOpen, 
    setIsOpen 
  }: {
    options: string[];
    selectedValues: string[];
    onSelectionChange: (values: string[]) => void;
    placeholder: string;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
  }) => {
    const handleSelect = (value: string) => {
      const newValues = selectedValues.includes(value)
        ? selectedValues.filter(v => v !== value)
        : [...selectedValues, value];
      onSelectionChange(newValues);
    };

    const removeValue = (valueToRemove: string) => {
      onSelectionChange(selectedValues.filter(v => v !== valueToRemove));
    };

    return (
      <div className="space-y-2">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={isOpen}
              className="w-full justify-between"
            >
              {selectedValues.length > 0 ? `${selectedValues.length} selected` : placeholder}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder={`Search ${placeholder.toLowerCase()}...`} />
              <CommandList>
                <CommandEmpty>No options found.</CommandEmpty>
                <CommandGroup>
                  {options.map((option) => (
                    <CommandItem
                      key={option}
                      onSelect={() => handleSelect(option)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedValues.includes(option) ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {option}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        
        {selectedValues.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedValues.map((value) => (
              <Badge key={value} variant="secondary" className="flex items-center gap-1">
                {value}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => removeValue(value)}
                />
              </Badge>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Context and Scope</CardTitle>
        <CardDescription>Define the context, systems, and recipients involved</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Why did the processing occur?</Label>
          <Textarea
            value={formData.processingReason}
            onChange={(e) => setFormData(prev => ({ ...prev, processingReason: e.target.value }))}
            placeholder="Explain the reason for processing"
            rows={3}
          />
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <Label>Data Recipients - Internal</Label>
            <MultiSelectDropdown
              options={departments}
              selectedValues={formData.internalRecipients || []}
              onSelectionChange={(values) => setFormData(prev => ({ ...prev, internalRecipients: values }))}
              placeholder="Select internal recipients"
              isOpen={internalRecipientsOpen}
              setIsOpen={setInternalRecipientsOpen}
            />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Data Recipients - External</Label>
              <Button variant="outline" size="sm" onClick={() => setShowNewIMSystem(!showNewIMSystem)}>
                <Plus className="mr-2 h-4 w-4" />
                Add New IM System
              </Button>
            </div>
            <MultiSelectDropdown
              options={vendors}
              selectedValues={formData.externalRecipients || []}
              onSelectionChange={(values) => setFormData(prev => ({ ...prev, externalRecipients: values }))}
              placeholder="Select external recipients"
              isOpen={externalRecipientsOpen}
              setIsOpen={setExternalRecipientsOpen}
            />
            
            {showNewIMSystem && (
              <Card className="p-4 bg-gray-50">
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="System Name *" />
                  <Input placeholder="Description" />
                  <Input placeholder="Location" />
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Storage Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="internal">Internal</SelectItem>
                      <SelectItem value="external">External</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </Card>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <Label>International Transfers/Transfer outside the EEA</Label>
          <Select
            value={formData.internationalTransfers}
            onValueChange={(value) => setFormData(prev => ({ ...prev, internationalTransfers: value }))}
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>

          {formData.internationalTransfers === 'Yes' && (
            <div className="space-y-4">
              <Label>Select Countries</Label>
              <MultiSelectDropdown
                options={countries}
                selectedValues={formData.transferCountries || []}
                onSelectionChange={(values) => setFormData(prev => ({ ...prev, transferCountries: values }))}
                placeholder="Select transfer countries"
                isOpen={countriesOpen}
                setIsOpen={setCountriesOpen}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContextTab;