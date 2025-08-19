import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, X, Send, AlertTriangle, Search } from 'lucide-react';
import DataBreachGenerationAgent from './DataBreachGenerationAgent';
import IncidentAssessmentAgent from './IncidentAssessmentAgent';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface DataBreachCopilotPanelProps {
  isOpen: boolean;
  onClose: () => void;
  formData?: any;
  onFormUpdate?: (data: any) => void;
  onGeneratedBreachApply?: (data: any) => void;
}

const DataBreachCopilotPanel: React.FC<DataBreachCopilotPanelProps> = ({
  isOpen,
  onClose,
  formData,
  onFormUpdate,
  onGeneratedBreachApply
}) => {
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "I'm your Data Breach Response AI Assistant. I can help you generate incident reports, assess breach impact, and ensure GDPR compliance. How can I assist with your data breach response today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const getActiveAgents = () => {
    // Both agents are always active for data breach management
    return ['generation', 'assessment'];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isProcessing) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsProcessing(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateResponse(inputMessage),
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, assistantMessage]);
      setIsProcessing(false);
    }, 1500);
  };

  const generateResponse = (userInput: string) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('generate') || input.includes('create') || input.includes('report')) {
      return "I can help you generate a comprehensive breach report. Use the Data Breach Generation Agent above to create incident documentation, notification templates, and response procedures automatically.";
    } else if (input.includes('assess') || input.includes('risk') || input.includes('impact')) {
      return "Let me help you assess the incident impact. The Incident Assessment Agent can analyze the severity, determine notification requirements, and provide compliance guidance for your breach.";
    } else if (input.includes('notification') || input.includes('authority') || input.includes('gdpr')) {
      return "For GDPR compliance, you typically need to notify supervisory authorities within 72 hours of becoming aware of a breach. Data subjects must be notified if there's a high risk to their rights. I can help assess whether your incident meets these thresholds.";
    } else if (input.includes('timeline') || input.includes('deadline')) {
      return "Here are the key GDPR deadlines: Authority notification within 72 hours, data subject notification 'without undue delay' if high risk. Document everything and act quickly to demonstrate compliance.";
    } else {
      return "I'm here to help with data breach response. I can assist with generating incident reports, assessing impact and risk levels, determining notification requirements, and ensuring GDPR compliance. What specific aspect would you like help with?";
    }
  };

  const handleGeneratedBreachApply = (generatedData: any) => {
    if (onFormUpdate) {
      onFormUpdate(generatedData);
    }
    if (onGeneratedBreachApply) {
      onGeneratedBreachApply(generatedData);
    }
  };

  const handleAssessmentComplete = (assessment: any) => {
    if (onFormUpdate) {
      onFormUpdate({ assessment });
    }
  };

  if (!isOpen) return null;

  const activeAgents = getActiveAgents();

  return (
    <Card className="fixed right-4 top-4 w-96 h-[calc(100vh-2rem)] flex flex-col shadow-2xl z-50">
      <CardHeader className="pb-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <div>
              <CardTitle className="text-lg">Data Breach AI Assistant</CardTitle>
              <CardDescription className="text-sm">
                Incident response and compliance guidance
              </CardDescription>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-4 overflow-hidden">
        <ScrollArea className="flex-1 mb-4">
          <div className="space-y-4">
            {/* AI Agents */}
            <div className="space-y-4">
              {activeAgents.includes('generation') && (
                <DataBreachGenerationAgent onApply={handleGeneratedBreachApply} />
              )}
              {activeAgents.includes('assessment') && (
                <IncidentAssessmentAgent onAssessmentComplete={handleAssessmentComplete} />
              )}
            </div>

            {/* Chat Messages */}
            <div className="space-y-3">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="bg-muted p-3 rounded-lg text-sm">
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-primary"></div>
                      Analyzing...
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="space-y-3">
          <div className="flex gap-2">
            <Input
              placeholder="Ask about breach response, compliance, or risk assessment..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={!inputMessage.trim() || isProcessing}
              size="sm"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Active Agents Indicator */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Bot className="h-3 w-3" />
            <span>Active agents:</span>
            {activeAgents.includes('generation') && (
              <Badge variant="outline" className="text-xs">
                <AlertTriangle className="h-2 w-2 mr-1" />
                Generation
              </Badge>
            )}
            {activeAgents.includes('assessment') && (
              <Badge variant="outline" className="text-xs">
                <Search className="h-2 w-2 mr-1" />
                Assessment
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataBreachCopilotPanel;