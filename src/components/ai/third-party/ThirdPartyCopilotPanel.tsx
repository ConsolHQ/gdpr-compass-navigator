import React, { useState } from 'react';
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
  Sparkles,
  Building2,
  Shield
} from 'lucide-react';
import ThirdPartyGenerationAgent from './ThirdPartyGenerationAgent';
import ComplianceMonitoringAgent from './ComplianceMonitoringAgent';

interface ThirdPartyCopilotPanelProps {
  isOpen: boolean;
  onClose: () => void;
  formData: any;
  onFormUpdate: (updates: any) => void;
  onGeneratedThirdPartyApply: (generatedThirdParty: any) => void;
}

const ThirdPartyCopilotPanel: React.FC<ThirdPartyCopilotPanelProps> = ({
  isOpen,
  onClose,
  formData,
  onFormUpdate,
  onGeneratedThirdPartyApply
}) => {
  const [chatMessages, setChatMessages] = useState<any[]>([
    {
      id: 1,
      type: 'assistant',
      content: "I'm your Third Party Management AI Assistant! I can help you generate comprehensive vendor records, monitor compliance status, assess risks, and manage third-party relationships efficiently.",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const getActiveAgents = () => {
    return {
      generation: true, // Always available
      monitoring: true // Always available for compliance monitoring
    };
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

    setTimeout(() => {
      const responses = [
        "I can help you create detailed third-party vendor records with comprehensive risk assessments, compliance checks, and contract details. Just provide the company name and I'll generate a complete profile!",
        "Need to monitor your vendor compliance? I can analyze all your third-party relationships, identify risks, track contract renewals, and ensure GDPR compliance across your vendor ecosystem.",
        "For vendor onboarding, I can generate due diligence questionnaires, assess data processing activities, evaluate security measures, and create appropriate data processing agreements.",
        "I can continuously monitor your third-party compliance status, alert you to contract renewals, track certification updates, and identify potential risks before they become issues."
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
    <Card className="fixed right-4 top-4 bottom-4 w-96 z-50 shadow-2xl border-purple-200">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot className="h-5 w-5 text-purple-600" />
            <CardTitle className="text-sm">Third Party Management AI</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription className="text-xs">
          AI-powered vendor management, compliance monitoring, and risk assessment
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0 flex flex-col h-full">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {/* AI Agents Section */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-900">AI Agents</span>
              </div>
              
              <ThirdPartyGenerationAgent
                isActive={activeAgents.generation}
                formData={formData}
                onFormUpdate={onFormUpdate}
                onGeneratedThirdPartyApply={onGeneratedThirdPartyApply}
              />
              
              <ComplianceMonitoringAgent
                isActive={activeAgents.monitoring}
                onComplianceUpdate={(update) => {
                  onFormUpdate({ ...formData, lastComplianceUpdate: update });
                }}
              />
            </div>

            <Separator />

            {/* Chat Section */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-900">Chat Assistant</span>
              </div>
              
              <div className="space-y-3">
                {chatMessages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-lg text-xs ${
                      message.type === 'user' 
                        ? 'bg-purple-600 text-white' 
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
              placeholder="Ask about vendor management, compliance monitoring, risk assessment..."
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
                {activeAgents.monitoring && <Badge variant="outline" className="text-xs">Monitoring</Badge>}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThirdPartyCopilotPanel;