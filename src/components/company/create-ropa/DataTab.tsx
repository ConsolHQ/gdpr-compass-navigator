import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Badge } from '@/components/ui/badge';
import { Info, Check, ChevronsUpDown, X } from 'lucide-react';
import { useMetadata } from '@/hooks/useMetadata';
import { cn } from '@/lib/utils';

interface DataTabProps {
  formData: any;
  setFormData: (data: any) => void;
  handleArrayFieldChange: (field: string, value: string, checked: boolean) => void;
}

const DataTab = ({ formData, setFormData, handleArrayFieldChange }: DataTabProps) => {
  const { getMetadataItems } = useMetadata();
  const dataSubjectTypes = getMetadataItems('data-subject-type');
  const personalDataTypes = getMetadataItems('personal-data-type');
  const specialCategoryGrounds = getMetadataItems('special-category-ground');
  
  const [subjectTypesOpen, setSubjectTypesOpen] = useState(false);
  const [personalDataOpen, setPersonalDataOpen] = useState(false);

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
        <CardTitle>Data Categories</CardTitle>
        <CardDescription>Define the types of data and data subjects involved</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-6">
          <div className="space-y-4">
            <Label>Categories of Data Subjects</Label>
            <MultiSelectDropdown
              options={dataSubjectTypes}
              selectedValues={formData.dataSubjectCategories || []}
              onSelectionChange={(values) => setFormData(prev => ({ ...prev, dataSubjectCategories: values }))}
              placeholder="Select data subject categories"
              isOpen={subjectTypesOpen}
              setIsOpen={setSubjectTypesOpen}
            />
          </div>
          
          <div className="space-y-4">
            <Label>Categories of Personal Data</Label>
            <MultiSelectDropdown
              options={personalDataTypes}
              selectedValues={formData.personalDataCategories || []}
              onSelectionChange={(values) => setFormData(prev => ({ ...prev, personalDataCategories: values }))}
              placeholder="Select personal data categories"
              isOpen={personalDataOpen}
              setIsOpen={setPersonalDataOpen}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Label>Special Category Data?</Label>
            <Info className="h-4 w-4 text-gray-400" />
          </div>
          <Select
            value={formData.specialCategoryData}
            onValueChange={(value) => setFormData(prev => ({ ...prev, specialCategoryData: value }))}
          >
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>

          {formData.specialCategoryData === 'Yes' && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <div className="space-y-2">
                <Label>Specify Special Categories</Label>
                <Textarea
                  value={formData.specialCategoryDetails}
                  onChange={(e) => setFormData(prev => ({ ...prev, specialCategoryDetails: e.target.value }))}
                  placeholder="Specify which special categories are processed"
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label>Legal Ground for Special Category</Label>
                <Select
                  value={formData.specialCategoryGround}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, specialCategoryGround: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select legal ground" />
                  </SelectTrigger>
                  <SelectContent>
                    {specialCategoryGrounds.map(ground => (
                      <SelectItem key={ground} value={ground}>{ground}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DataTab;