
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';

interface IncidentDetailsStepProps {
  data: any;
  onUpdate: (updates: any) => void;
}

const IncidentDetailsStep: React.FC<IncidentDetailsStepProps> = ({ data, onUpdate }) => {
  const categories = [
    'System Error',
    'Human Error',
    'External Breach',
    'Malicious Attack',
    'Physical Theft',
    'Accidental Disclosure',
    'Unauthorized Access',
    'Other'
  ];

  const handleCategoryToggle = (category: string) => {
    const updatedCategories = data.category.includes(category)
      ? data.category.filter((c: string) => c !== category)
      : [...data.category, category];
    onUpdate({ category: updatedCategories });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    onUpdate({ documents: [...data.documents, ...files] });
  };

  const removeFile = (index: number) => {
    const updatedFiles = data.documents.filter((_: any, i: number) => i !== index);
    onUpdate({ documents: updatedFiles });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Incident Name <span className="text-red-500">*</span>
          </label>
          <Input
            value={data.incidentName}
            onChange={(e) => onUpdate({ incidentName: e.target.value })}
            placeholder="Enter incident name"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Incident ID</label>
          <Input
            value={data.incidentId}
            onChange={(e) => onUpdate({ incidentId: e.target.value })}
            placeholder="Auto-generated ID"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Reported by</label>
          <Select value={data.reportedBy} onValueChange={(value) => onUpdate({ reportedBy: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select reporter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="john.doe">John Doe</SelectItem>
              <SelectItem value="jane.smith">Jane Smith</SelectItem>
              <SelectItem value="admin">System Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Submitted by</label>
          <Select value={data.submittedBy} onValueChange={(value) => onUpdate({ submittedBy: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select submitter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="john.doe">John Doe</SelectItem>
              <SelectItem value="jane.smith">Jane Smith</SelectItem>
              <SelectItem value="admin">System Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Incident Date <span className="text-red-500">*</span>
          </label>
          <Input
            type="datetime-local"
            value={data.incidentDate}
            onChange={(e) => onUpdate({ incidentDate: e.target.value })}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Detection Date <span className="text-red-500">*</span>
          </label>
          <Input
            type="datetime-local"
            value={data.detectionDate}
            onChange={(e) => onUpdate({ detectionDate: e.target.value })}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Reported Date</label>
          <Input
            type="date"
            value={data.reportedDate}
            onChange={(e) => onUpdate({ reportedDate: e.target.value })}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Reference URL</label>
          <Input
            value={data.referenceUrl}
            onChange={(e) => onUpdate({ referenceUrl: e.target.value })}
            placeholder="https://..."
            className="w-full"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Category</label>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={data.category.includes(category) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => handleCategoryToggle(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Description</label>
        <Textarea
          value={data.description}
          onChange={(e) => onUpdate({ description: e.target.value })}
          placeholder="Describe the incident in detail..."
          rows={4}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Supporting Documents</label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-2">
            <label className="cursor-pointer">
              <span className="text-blue-600 hover:text-blue-500">Upload files</span>
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
              />
            </label>
            <p className="text-sm text-gray-500 mt-1">
              PDF, DOC, TXT, JPG, PNG up to 10MB each
            </p>
          </div>
        </div>
        
        {data.documents.length > 0 && (
          <div className="space-y-2">
            {data.documents.map((file: File, index: number) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm">{file.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default IncidentDetailsStep;
