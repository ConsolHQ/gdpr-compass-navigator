
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, Users, Database, Shield, AlertTriangle, FileText } from 'lucide-react';

interface SummaryStepProps {
  data: any;
  onUpdate: (updates: any) => void;
}

const SummaryStep: React.FC<SummaryStepProps> = ({ data, onUpdate }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'destructive';
      case 'Medium': return 'default';
      case 'Low': return 'secondary';
      default: return 'outline';
    }
  };

  const totalAffected = data.dataSubjects.reduce((sum: number, subject: any) => 
    sum + (subject.numberAffected || 0), 0
  );

  const yesAnswersCount = Object.values(data.circumstances).filter((answer: any) => answer.answer).length;

  return (
    <div className="space-y-6">
      {/* Incident Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Incident Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-600">Incident Name</Label>
              <p className="text-sm font-semibold">{data.incidentName || 'Unnamed Incident'}</p>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-600">Incident ID</Label>
              <p className="text-sm font-mono">{data.incidentId}</p>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-600">Origin</Label>
              <p className="text-sm capitalize">{data.origin}</p>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-600">Privacy Role</Label>
              <p className="text-sm capitalize">{data.privacyRole}</p>
            </div>
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <div>
                <Label className="text-xs text-gray-600">Incident Date</Label>
                <p className="text-sm">{data.incidentDate ? new Date(data.incidentDate).toLocaleDateString() : 'Not set'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-gray-500" />
              <div>
                <Label className="text-xs text-gray-600">Affected Individuals</Label>
                <p className="text-sm font-semibold">{totalAffected.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Database className="h-4 w-4 text-gray-500" />
              <div>
                <Label className="text-xs text-gray-600">Data Subject Types</Label>
                <p className="text-sm">{data.dataSubjects.length}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Assessment */}
      <Card className="border-2 border-orange-200">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Risk Assessment Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-sm font-medium text-gray-600">Final Impact Score</Label>
              <p className="text-2xl font-bold">{(data.scoreAgreed ? data.autoScore : data.manualScore).toFixed(2)}</p>
            </div>
            <Badge variant={getSeverityColor(data.severity)} className="text-lg px-4 py-2">
              <AlertTriangle className="h-4 w-4 mr-2" />
              {data.severity} Risk
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium text-gray-600">Identifiability Level</Label>
              <p className="text-sm">{data.identifiabilityLevel} ({data.identifiabilityLevel >= 0.75 ? 'High' : data.identifiabilityLevel >= 0.5 ? 'Medium' : 'Low'})</p>
            </div>
            <div>
              <Label className="text-sm font-medium text-gray-600">Aggravating Circumstances</Label>
              <p className="text-sm">{yesAnswersCount} factors identified</p>
            </div>
          </div>
          
          {!data.scoreAgreed && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> Manual score override applied. Original calculated score was {data.autoScore.toFixed(2)}.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Summary Sections */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Final Report Sections</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium">
              Executive Summary <span className="text-red-500">*</span>
            </Label>
            <Textarea
              value={data.summary}
              onChange={(e) => onUpdate({ summary: e.target.value })}
              placeholder="Provide a comprehensive summary of the incident, its impact, and key findings..."
              rows={4}
              className="w-full"
            />
            <p className="text-xs text-gray-500">
              This will be the main summary section of your incident report
            </p>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Planned Next Steps</Label>
            <Textarea
              value={data.nextSteps}
              onChange={(e) => onUpdate({ nextSteps: e.target.value })}
              placeholder="Describe the immediate actions to be taken, remediation steps, and follow-up activities..."
              rows={3}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Internal Notes</Label>
            <Textarea
              value={data.internalNotes}
              onChange={(e) => onUpdate({ internalNotes: e.target.value })}
              placeholder="Add any internal notes or observations that should not be included in external reports..."
              rows={3}
              className="w-full"
            />
            <p className="text-xs text-gray-500">
              These notes will be for internal use only and not included in regulatory submissions
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Submission Checklist */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-lg text-blue-800">Pre-Submission Checklist</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <input type="checkbox" checked={!!data.incidentName} readOnly />
              <span>Incident details completed</span>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" checked={data.personalDataLeaked !== undefined} readOnly />
              <span>Personal data impact assessed</span>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" checked={data.dataSubjects.length > 0 || !data.personalDataLeaked} readOnly />
              <span>Affected data subjects identified</span>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" checked={Object.keys(data.circumstances).length > 0} readOnly />
              <span>Circumstances assessment completed</span>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" checked={!!data.summary} readOnly />
              <span>Executive summary provided</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryStep;
