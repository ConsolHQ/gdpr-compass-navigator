import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Bot, 
  MessageSquare, 
  Send, 
  X, 
  Upload,
  FileText,
  Sparkles,
  Brain,
  Database,
  Shield,
  CheckCircle
} from 'lucide-react';
import ROPATriageAgent from './ROPATriageAgent';
import DataClassificationAgent from './DataClassificationAgent';
import ComplianceAssessmentAgent from './ComplianceAssessmentAgent';

interface ROPACopilotPanelProps {
  isOpen: boolean;
  onClose: () => void;
  formData: any;
  onFormUpdate: (updates: any) => void;
  onArrayFieldChange: (field: string, value: string, checked: boolean) => void;
  currentTab: string;
}

const ROPACopilotPanel: React.FC<ROPACopilotPanelProps> = ({
  isOpen,
  onClose,
  formData,
  onFormUpdate,
  onArrayFieldChange,
  currentTab
}) => {
  const [chatMessages, setChatMessages] = useState<any[]>([
    {
      id: 1,
      type: 'assistant',
      content: "I'm your ROPA AI Assistant! I can help you create comprehensive Records of Processing Activities. Upload a document, describe your processing activity, or ask me anything about GDPR compliance.",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Determine which agents should be active based on current tab and form data
  const getActiveAgents = () => {
    const agents = {
      triage: currentTab === 'general' || !formData.name,
      dataClassification: currentTab === 'data' || (formData.name && !formData.personalDataCategories?.length),
      compliance: currentTab === 'principles' || Object.keys(formData).length > 5
    };
    return agents;
  };

  const activeAgents = getActiveAgents();

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsProcessing(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I can help you with that! Based on your current ROPA form, I notice you're working on the processing activity details. Would you like me to suggest some data categories or help identify the appropriate legal basis?",
        "Great question! For GDPR compliance, you'll need to consider the lawfulness of processing. Based on what you've described, 'Legitimate Interest' might be appropriate, but let me analyze your specific use case.",
        "I can see you're defining personal data categories. Let me help classify these and identify any special category data that might require additional protections.",
        "For retention periods, it's important to align with your processing purpose. Can you tell me more about why you need to keep this data and for how long it's typically needed?"
      ];

      const assistantMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, assistantMessage]);
      setIsProcessing(false);
    }, 1500);
  };

  const handleFileUpload = () => {
    // TODO: Implement file upload for ROPA document analysis
    const fileMessage = {
      id: Date.now(),
      type: 'assistant',
      content: "File upload feature will allow you to upload existing privacy policies, data mapping documents, or processing records. I'll analyze them and pre-fill your ROPA form with relevant information.",
      timestamp: new Date()
    };
    setChatMessages(prev => [...prev, fileMessage]);
  };

  if (!isOpen) return null;

  return (
    <Card className="fixed right-4 top-4 bottom-4 w-96 z-50 shadow-2xl border-blue-200">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-sm">ROPA AI Assistant</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription className="text-xs">
          AI-powered ROPA creation and compliance assistance
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0 flex flex-col h-full">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {/* AI Agents Section */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">AI Agents</span>
              </div>
              
              <ROPATriageAgent
                isActive={activeAgents.triage}
                formData={formData}
                onFormUpdate={onFormUpdate}
              />
              
              <DataClassificationAgent
                isActive={activeAgents.dataClassification}
                formData={formData}
                onFormUpdate={onFormUpdate}
                onArrayFieldChange={onArrayFieldChange}
              />
              
              <ComplianceAssessmentAgent
                isActive={activeAgents.compliance}
                formData={formData}
                onFormUpdate={onFormUpdate}
              />
            </div>

            <Separator />

            {/* Chat Section */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Chat Assistant</span>
              </div>
              
              <div className="space-y-3">
                {chatMessages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-lg text-xs ${
                      message.type === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      {message.content}
                    </div>
                  </div>
                ))}
                {isProcessing && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-900 p-3 rounded-lg text-xs">
                      <div className="flex items-center space-x-2">
                        <Sparkles className="h-3 w-3 animate-spin" />
                        <span>AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Input Section */}
        <div className="border-t p-4 space-y-3">
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={handleFileUpload}
              className="flex-shrink-0"
            >
              <Upload className="h-3 w-3" />
            </Button>
            <Input
              placeholder="Ask about ROPA creation, GDPR compliance..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="text-xs"
            />
            <Button 
              size="sm" 
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isProcessing}
            >
              <Send className="h-3 w-3" />
            </Button>
          </div>
          
          <div className="text-xs text-gray-600">
            <div className="flex items-center justify-between">
              <span>Active Agents:</span>
              <div className="flex space-x-1">
                {activeAgents.triage && <Badge variant="outline" className="text-xs">Triage</Badge>}
                {activeAgents.dataClassification && <Badge variant="outline" className="text-xs">Data</Badge>}
                {activeAgents.compliance && <Badge variant="outline" className="text-xs">Compliance</Badge>}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ROPACopilotPanel;