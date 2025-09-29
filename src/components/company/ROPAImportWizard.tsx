import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, ArrowRight, ArrowLeft, Check, X, AlertTriangle, Save, FileSpreadsheet } from "lucide-react";
import { toast } from "sonner";

interface ColumnMapping {
  fileColumn: string;
  mappedField: string | null;
  isNewField: boolean;
  suggestedType: string;
  label?: string;
  skip?: boolean;
}

interface ValidationError {
  row: number;
  column: string;
  value: string;
  error: string;
}

interface ROPAImportWizardProps {
  onBack: () => void;
  onImportComplete: (data: any) => void;
}

export const ROPAImportWizard = ({ onBack, onImportComplete }: ROPAImportWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [fileData, setFileData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [columnMappings, setColumnMappings] = useState<ColumnMapping[]>([]);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [showEditFieldDialog, setShowEditFieldDialog] = useState(false);
  const [editingColumn, setEditingColumn] = useState<ColumnMapping | null>(null);
  const [saveAsTemplate, setSaveAsTemplate] = useState(false);

  const totalSteps = 7;

  // Known GDPR fields for mapping
  const knownFields = [
    { value: "processing_activity_name", label: "Processing Activity Name" },
    { value: "purpose", label: "Purpose of Processing" },
    { value: "legal_basis", label: "Legal Basis" },
    { value: "data_categories", label: "Data Categories" },
    { value: "data_subjects", label: "Data Subjects" },
    { value: "recipients", label: "Recipients" },
    { value: "third_country_transfers", label: "Third Country Transfers" },
    { value: "retention_period", label: "Retention Period" },
    { value: "security_measures", label: "Security Measures" },
    { value: "dpia_required", label: "DPIA Required" },
    { value: "controller_name", label: "Controller Name" },
    { value: "dpo_contact", label: "DPO Contact" },
  ];

  const dataTypes = [
    { value: "text", label: "Text" },
    { value: "long_text", label: "Long Text" },
    { value: "number", label: "Number" },
    { value: "date", label: "Date" },
    { value: "datetime", label: "Date & Time" },
    { value: "boolean", label: "Yes/No" },
    { value: "email", label: "Email" },
    { value: "url", label: "URL" },
    { value: "phone", label: "Phone Number" },
    { value: "dropdown", label: "Dropdown" },
    { value: "multiselect", label: "Multi-select" },
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (!uploadedFile) return;

    const fileExtension = uploadedFile.name.split('.').pop()?.toLowerCase();
    if (fileExtension !== 'csv' && fileExtension !== 'xlsx' && fileExtension !== 'xls') {
      toast.error("Please upload a CSV or Excel file");
      return;
    }

    setFile(uploadedFile);
    parseFile(uploadedFile);
  };

  const parseFile = (file: File) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split('\n').filter(line => line.trim());
      
      if (lines.length === 0) {
        toast.error("File is empty");
        return;
      }

      // Parse headers
      const headerLine = lines[0];
      const parsedHeaders = headerLine.split(',').map(h => h.trim().replace(/^["']|["']$/g, ''));
      setHeaders(parsedHeaders);

      // Parse data (first 10 rows for preview)
      const data = lines.slice(1, 11).map(line => {
        const values = line.split(',').map(v => v.trim().replace(/^["']|["']$/g, ''));
        const row: any = {};
        parsedHeaders.forEach((header, index) => {
          row[header] = values[index] || '';
        });
        return row;
      });

      setFileData(data);
      setCurrentStep(2);
      autoMapColumns(parsedHeaders, data);
    };

    reader.readAsText(file);
  };

  const detectDataType = (columnName: string, values: string[]): string => {
    const sampleValues = values.filter(v => v && v.trim()).slice(0, 10);
    
    if (sampleValues.length === 0) return "text";

    // Boolean check
    const booleanValues = ['yes', 'no', 'true', 'false', 'y', 'n', '1', '0'];
    if (sampleValues.every(v => booleanValues.includes(v.toLowerCase()))) {
      return "boolean";
    }

    // Email check
    if (sampleValues.every(v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))) {
      return "email";
    }

    // URL check
    if (sampleValues.every(v => /^https?:\/\/.+/.test(v))) {
      return "url";
    }

    // Phone check
    if (sampleValues.every(v => /^[\d\s()+-]+$/.test(v) && v.length >= 7)) {
      return "phone";
    }

    // Date check
    if (sampleValues.every(v => !isNaN(Date.parse(v)))) {
      // Check if it includes time
      if (sampleValues.some(v => /\d{2}:\d{2}/.test(v))) {
        return "datetime";
      }
      return "date";
    }

    // Number check
    if (sampleValues.every(v => !isNaN(Number(v)))) {
      return "number";
    }

    // Multi-select check (comma or semicolon separated)
    if (sampleValues.some(v => /[,;]/.test(v))) {
      return "multiselect";
    }

    // Dropdown check (small set of unique values)
    const uniqueValues = new Set(sampleValues);
    if (uniqueValues.size >= 3 && uniqueValues.size <= 10) {
      return "dropdown";
    }

    // Long text check
    if (sampleValues.some(v => v.length > 255)) {
      return "long_text";
    }

    return "text";
  };

  const autoMapColumns = (headers: string[], data: any[]) => {
    const mappings: ColumnMapping[] = headers.map(header => {
      const normalizedHeader = header.toLowerCase().replace(/[_\s-]+/g, '_');
      
      // Try to find a matching known field
      const matchedField = knownFields.find(field => 
        field.value.includes(normalizedHeader) || 
        normalizedHeader.includes(field.value.split('_')[0])
      );

      // Get sample values for type detection
      const columnValues = data.map(row => row[header] || '');
      const suggestedType = detectDataType(header, columnValues);

      return {
        fileColumn: header,
        mappedField: matchedField?.value || null,
        isNewField: !matchedField,
        suggestedType,
        label: header,
        skip: false,
      };
    });

    setColumnMappings(mappings);
  };

  const handleMappingChange = (index: number, field: string) => {
    const newMappings = [...columnMappings];
    newMappings[index].mappedField = field;
    newMappings[index].isNewField = field === 'new_field';
    setColumnMappings(newMappings);
  };

  const handleSkipColumn = (index: number, skip: boolean) => {
    const newMappings = [...columnMappings];
    newMappings[index].skip = skip;
    setColumnMappings(newMappings);
  };

  const handleEditField = (mapping: ColumnMapping) => {
    setEditingColumn(mapping);
    setShowEditFieldDialog(true);
  };

  const handleSaveEditedField = () => {
    if (editingColumn) {
      const index = columnMappings.findIndex(m => m.fileColumn === editingColumn.fileColumn);
      const newMappings = [...columnMappings];
      newMappings[index] = editingColumn;
      setColumnMappings(newMappings);
    }
    setShowEditFieldDialog(false);
    setEditingColumn(null);
  };

  const handleValidation = () => {
    const errors: ValidationError[] = [];
    
    // Simulate validation
    fileData.forEach((row, index) => {
      columnMappings.forEach(mapping => {
        if (mapping.skip) return;
        
        const value = row[mapping.fileColumn];
        
        // Email validation
        if (mapping.suggestedType === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errors.push({
            row: index + 2, // +2 because index 0 is row 2 (after header)
            column: mapping.fileColumn,
            value,
            error: "Invalid email format"
          });
        }

        // Date validation
        if (mapping.suggestedType === 'date' && value && isNaN(Date.parse(value))) {
          errors.push({
            row: index + 2,
            column: mapping.fileColumn,
            value,
            error: "Invalid date format"
          });
        }
      });
    });

    setValidationErrors(errors);
    setCurrentStep(4);
  };

  const handleAcceptAllSuggestions = () => {
    toast.success("All suggestions accepted");
  };

  const handleImportConfirm = () => {
    const recordCount = fileData.length;
    const newFieldsCount = columnMappings.filter(m => m.isNewField && !m.skip).length;
    const skippedColumns = columnMappings.filter(m => m.skip).length;

    toast.success(`Import completed successfully. ${recordCount} records imported, ${newFieldsCount} new fields created.`);
    setCurrentStep(7);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <div className="mx-auto w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                <Upload className="w-12 h-12 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Upload Your File</h3>
                <p className="text-muted-foreground text-sm">
                  Upload an Excel or CSV file to import ROPA records
                </p>
              </div>
            </div>

            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
              <Input
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <Label htmlFor="file-upload" className="cursor-pointer">
                <FileSpreadsheet className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm font-medium mb-1">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground">CSV or Excel files (MAX. 10MB)</p>
              </Label>
            </div>

            {file && (
              <Alert>
                <Check className="h-4 w-4" />
                <AlertDescription>
                  File selected: {file.name}
                </AlertDescription>
              </Alert>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Auto-Mapping</h3>
              <p className="text-sm text-muted-foreground">
                We've automatically mapped your columns to GDPR fields. Review the suggestions below.
              </p>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>File Column</TableHead>
                    <TableHead>Mapped To</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {columnMappings.map((mapping, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{mapping.fileColumn}</TableCell>
                      <TableCell>
                        {mapping.mappedField ? (
                          <Badge variant="secondary">
                            {knownFields.find(f => f.value === mapping.mappedField)?.label}
                          </Badge>
                        ) : (
                          <Badge variant="outline">Unmapped</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{mapping.suggestedType}</Badge>
                      </TableCell>
                      <TableCell>
                        {mapping.mappedField ? (
                          <div className="flex items-center text-green-600">
                            <Check className="w-4 h-4 mr-1" />
                            <span className="text-sm">Auto-mapped</span>
                          </div>
                        ) : (
                          <Badge variant="secondary">New Field</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleAcceptAllSuggestions} variant="outline">
                <Check className="w-4 h-4 mr-2" />
                Accept All Suggestions
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Review & Confirm Mappings</h3>
              <p className="text-sm text-muted-foreground">
                Customize field mappings, edit new fields, or skip columns you don't need.
              </p>
            </div>

            <ScrollArea className="h-[500px] border rounded-lg">
              <div className="p-4 space-y-4">
                {columnMappings.map((mapping, index) => (
                  <Card key={index} className="p-4">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <Label className="text-sm font-medium">{mapping.fileColumn}</Label>
                          <p className="text-xs text-muted-foreground mt-1">
                            Sample: {fileData[0]?.[mapping.fileColumn]}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Checkbox
                            checked={mapping.skip}
                            onCheckedChange={(checked) => handleSkipColumn(index, checked as boolean)}
                          />
                          <Label className="text-sm">Skip</Label>
                        </div>
                      </div>

                      {!mapping.skip && (
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-xs">Map to Field</Label>
                            <Select
                              value={mapping.mappedField || 'new_field'}
                              onValueChange={(value) => handleMappingChange(index, value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="new_field">Create New Field</SelectItem>
                                {knownFields.map(field => (
                                  <SelectItem key={field.value} value={field.value}>
                                    {field.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          {mapping.isNewField && (
                            <div className="flex items-end">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditField(mapping)}
                                className="w-full"
                              >
                                Edit Field Details
                              </Button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Validation Results</h3>
              <p className="text-sm text-muted-foreground">
                Review any errors or warnings before importing.
              </p>
            </div>

            {validationErrors.length === 0 ? (
              <Alert>
                <Check className="h-4 w-4" />
                <AlertDescription>
                  All data validated successfully! No errors found.
                </AlertDescription>
              </Alert>
            ) : (
              <div className="space-y-4">
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Found {validationErrors.length} validation error(s). Please review below.
                  </AlertDescription>
                </Alert>

                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Row</TableHead>
                        <TableHead>Column</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>Error</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {validationErrors.map((error, index) => (
                        <TableRow key={index}>
                          <TableCell>{error.row}</TableCell>
                          <TableCell>{error.column}</TableCell>
                          <TableCell className="font-mono text-sm">{error.value}</TableCell>
                          <TableCell className="text-destructive">{error.error}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setCurrentStep(1)}>
                    Fix in File & Re-upload
                  </Button>
                  <Button variant="destructive" onClick={() => setCurrentStep(5)}>
                    Skip Invalid Rows
                  </Button>
                </div>
              </div>
            )}
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Save Mapping Template</h3>
              <p className="text-sm text-muted-foreground">
                Save this field mapping as a template for future imports.
              </p>
            </div>

            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <Checkbox
                  checked={saveAsTemplate}
                  onCheckedChange={(checked) => setSaveAsTemplate(checked as boolean)}
                  id="save-template"
                />
                <div className="flex-1">
                  <Label htmlFor="save-template" className="text-base font-medium cursor-pointer">
                    Save as template for future imports
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your field mappings will be automatically applied next time you import a similar file.
                  </p>
                </div>
              </div>

              {saveAsTemplate && (
                <div className="mt-4">
                  <Label>Template Name</Label>
                  <Input placeholder="e.g., Standard ROPA Import" className="mt-2" />
                </div>
              )}
            </Card>
          </div>
        );

      case 6:
        const recordCount = fileData.length;
        const newFieldsCount = columnMappings.filter(m => m.isNewField && !m.skip).length;
        const skippedColumns = columnMappings.filter(m => m.skip).length;

        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Import Confirmation</h3>
              <p className="text-sm text-muted-foreground">
                Review the summary before completing the import.
              </p>
            </div>

            <div className="grid gap-4">
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                      <Check className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{recordCount}</p>
                      <p className="text-sm text-muted-foreground">Records will be imported</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                      <Save className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{newFieldsCount}</p>
                      <p className="text-sm text-muted-foreground">New fields will be created</p>
                    </div>
                  </div>
                </div>
              </Card>

              {skippedColumns > 0 && (
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
                        <X className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{skippedColumns}</p>
                        <p className="text-sm text-muted-foreground">Columns will be skipped</p>
                      </div>
                    </div>
                  </div>
                </Card>
              )}
            </div>

            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                This action cannot be undone. Please ensure all mappings are correct before proceeding.
              </AlertDescription>
            </Alert>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6 text-center">
            <div className="mx-auto w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center">
              <Check className="w-12 h-12 text-green-600" />
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-2">Import Completed!</h3>
              <p className="text-muted-foreground">
                Your ROPA records have been successfully imported.
              </p>
            </div>

            <div className="grid gap-3 max-w-md mx-auto">
              <Card className="p-4">
                <p className="text-sm text-muted-foreground">Records Imported</p>
                <p className="text-2xl font-bold">{fileData.length}</p>
              </Card>
              <Card className="p-4">
                <p className="text-sm text-muted-foreground">New Fields Created</p>
                <p className="text-2xl font-bold">
                  {columnMappings.filter(m => m.isNewField && !m.skip).length}
                </p>
              </Card>
            </div>

            <div className="flex gap-3 justify-center">
              <Button onClick={onBack} variant="outline">
                View Imported Records
              </Button>
              <Button onClick={() => setCurrentStep(1)}>
                Import Another File
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-5xl">
      <Card className="p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Import ROPA Records</h2>
            <Badge variant="secondary">Step {currentStep} of {totalSteps}</Badge>
          </div>
          <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
        </div>

        {renderStepContent()}

        <div className="flex justify-between mt-8 pt-6 border-t">
          <Button
            variant="outline"
            onClick={() => {
              if (currentStep === 1) {
                onBack();
              } else {
                setCurrentStep(currentStep - 1);
              }
            }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {currentStep === 1 ? "Cancel" : "Back"}
          </Button>

          {currentStep < 7 && currentStep !== 1 && (
            <Button
              onClick={() => {
                if (currentStep === 3) {
                  handleValidation();
                } else if (currentStep === 6) {
                  handleImportConfirm();
                } else {
                  setCurrentStep(currentStep + 1);
                }
              }}
            >
              {currentStep === 6 ? "Confirm Import" : "Next"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </Card>

      {/* Edit Field Dialog */}
      <Dialog open={showEditFieldDialog} onOpenChange={setShowEditFieldDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Field Details</DialogTitle>
            <DialogDescription>
              Customize the properties for this new field.
            </DialogDescription>
          </DialogHeader>

          {editingColumn && (
            <div className="space-y-4 py-4">
              <div>
                <Label>Field Label</Label>
                <Input
                  value={editingColumn.label}
                  onChange={(e) => setEditingColumn({ ...editingColumn, label: e.target.value })}
                  placeholder="Enter field label"
                />
              </div>

              <div>
                <Label>Data Type</Label>
                <Select
                  value={editingColumn.suggestedType}
                  onValueChange={(value) => setEditingColumn({ ...editingColumn, suggestedType: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {dataTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditFieldDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEditedField}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
