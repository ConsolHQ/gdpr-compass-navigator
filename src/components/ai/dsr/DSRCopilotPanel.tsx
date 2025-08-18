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
  Shield,
  Search,
  Mail,
  Wand2
} from 'lucide-react';
import { DSRTriageAgent } from './DSRTriageAgent';
import { IdentityVerificationAgent } from './IdentityVerificationAgent';
import { DataDiscoveryAgent } from './DataDiscoveryAgent';
import { ResponseLetterAgent } from './ResponseLetterAgent';
import DSRGenerationAgent from './DSRGenerationAgent';

interface DSRCopilotPanelProps {
  isOpen: boolean;
  onClose: () => void;
  formData: any;
  onFormUpdate: (updates: any) => void;
  onGeneratedDSRApply: (generatedDSR: any) => void;
}

const DSRCopilotPanel: React.FC<DSRCopilotPanelProps> = ({
  isOpen,
  onClose,
  formData,
  onFormUpdate,
  onGeneratedDSRApply
}) => {
  const [chatMessages, setChatMessages] = useState<any[]>([
    {
      id: 1,
      type: 'assistant',
      content: "I'm your DSR AI Assistant! I can help you process Data Subject Requests efficiently. Paste an email from a data subject, describe the request, or ask me about GDPR compliance requirements.",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Determine which agents should be active based on form data
  const getActiveAgents = () => {
    const agents = {
      generation: true, // Always available for complete DSR generation
      triage: !formData.type || !formData.priority,
      identityVerification: formData.requesterName && formData.requesterEmail,
      dataDiscovery: formData.type && formData.requesterName,
      responseTemplate: formData.type && formData.requesterName
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
        "I can help you process this DSR! Based on the request details, I recommend starting with identity verification. Would you like me to generate the verification requirements?",
        "This looks like a data access request under GDPR Article 15. I'll need to search multiple systems. Let me help identify which systems contain this person's data.",
        "For GDPR compliance, you have 30 days to respond. I can help draft the response letter and identify all personal data categories involved.",
        "I notice this request might need legal review due to its scope. Would you like me to flag this for the legal team and prepare a comprehensive response?"
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

  if (!isOpen) return null;

  return (
    <Card className="fixed right-4 top-4 bottom-4 w-96 z-50 shadow-2xl border-emerald-200">
      <CardHeader className="bg-gradient-to-r from-emerald-50 to-blue-50 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot className="h-5 w-5 text-emerald-600" />
            <CardTitle className="text-sm">DSR AI Assistant</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription className="text-xs">
          AI-powered data subject request processing and compliance
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0 flex flex-col h-full">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {/* AI Agents Section */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-900">AI Agents</span>
              </div>
              
              <DSRGenerationAgent
                isActive={activeAgents.generation}
                formData={formData}
                onFormUpdate={onFormUpdate}
                onGeneratedDSRApply={onGeneratedDSRApply}
              />
              
              {activeAgents.triage && (
                <Card className="border-blue-200 bg-blue-50/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center space-x-2 text-sm">
                      <Brain className="h-4 w-4 text-blue-600" />
                      <span>Triage Agent</span>
                      <Badge className="bg-blue-100 text-blue-800 text-xs">Active</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <DSRTriageAgent
                      requestData={{
                        type: formData.type,
                        description: formData.description,
                        requesterEmail: formData.requesterEmail,
                        requesterName: formData.requesterName
                      }}
                      onTriageComplete={(results) => {
                        if (results.priority.level) {
                          onFormUpdate({ ...formData, priority: results.priority.level });
                        }
                      }}
                    />
                  </CardContent>
                </Card>
              )}
              
              {activeAgents.identityVerification && (
                <Card className="border-purple-200 bg-purple-50/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center space-x-2 text-sm">
                      <Shield className="h-4 w-4 text-purple-600" />
                      <span>Identity Verification</span>
                      <Badge className="bg-purple-100 text-purple-800 text-xs">Active</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <IdentityVerificationAgent
                      requesterInfo={{
                        name: formData.requesterName,
                        email: formData.requesterEmail,
                        phone: formData.requesterPhone
                      }}
                      onVerificationComplete={(results) => {
                        console.log('Verification completed:', results);
                      }}
                    />
                  </CardContent>
                </Card>
              )}
              
              {activeAgents.dataDiscovery && (
                <Card className="border-orange-200 bg-orange-50/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center space-x-2 text-sm">
                      <Search className="h-4 w-4 text-orange-600" />
                      <span>Data Discovery</span>
                      <Badge className="bg-orange-100 text-orange-800 text-xs">Active</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <DataDiscoveryAgent
                      requesterInfo={{
                        name: formData.requesterName,
                        email: formData.requesterEmail,
                        phone: formData.requesterPhone
                      }}
                      requestType={formData.type}
                      onDiscoveryComplete={(results) => {
                        console.log('Discovery completed:', results);
                      }}
                    />
                  </CardContent>
                </Card>
              )}
              
              {activeAgents.responseTemplate && (
                <Card className="border-green-200 bg-green-50/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center space-x-2 text-sm">
                      <Mail className="h-4 w-4 text-green-600" />
                      <span>Response Generator</span>
                      <Badge className="bg-green-100 text-green-800 text-xs">Active</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ResponseLetterAgent
                      requestType={formData.type}
                      requesterInfo={{
                        name: formData.requesterName,
                        email: formData.requesterEmail
                      }}
                      verificationStatus="verified"
                      onLetterComplete={(letter) => {
                        console.log('Letter generated:', letter);
                      }}
                    />
                  </CardContent>
                </Card>
              )}
            </div>

            <Separator />

            {/* Chat Section */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-900">Chat Assistant</span>
              </div>
              
              <div className="space-y-3">
                {chatMessages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-lg text-xs ${
                      message.type === 'user' 
                        ? 'bg-emerald-600 text-white' 
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
            <Input
              placeholder="Ask about DSR processing, GDPR compliance, deadlines..."
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
                {activeAgents.generation && <Badge variant="outline" className="text-xs">Generation</Badge>}
                {activeAgents.triage && <Badge variant="outline" className="text-xs">Triage</Badge>}
                {activeAgents.identityVerification && <Badge variant="outline" className="text-xs">Identity</Badge>}
                {activeAgents.dataDiscovery && <Badge variant="outline" className="text-xs">Discovery</Badge>}
                {activeAgents.responseTemplate && <Badge variant="outline" className="text-xs">Response</Badge>}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DSRCopilotPanel;