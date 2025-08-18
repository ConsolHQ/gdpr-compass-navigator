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
  Shield,
  AlertTriangle,
  Wand2
} from 'lucide-react';
import DPIAGenerationAgent from './DPIAGenerationAgent';
import RiskAssessmentAgent from './RiskAssessmentAgent';

interface DPIACopilotPanelProps {
  isOpen: boolean;
  onClose: () => void;
  formData: any;
  onFormUpdate: (updates: any) => void;
  onGeneratedDPIAApply: (generatedDPIA: any) => void;
}

const DPIACopilotPanel: React.FC<DPIACopilotPanelProps> = ({
  isOpen,
  onClose,
  formData,
  onFormUpdate,
  onGeneratedDPIAApply
}) => {
  const [chatMessages, setChatMessages] = useState<any[]>([
    {
      id: 1,
      type: 'assistant',
      content: "I'm your DPIA AI Assistant! I can help you create comprehensive Data Protection Impact Assessments for high-risk processing activities. Describe your processing activity or ask me about privacy risk assessment.",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const getActiveAgents = () => {
    return {
      generation: true, // Always available
      riskAssessment: formData.name || formData.description
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
        "I can help you assess the privacy risks of this processing activity! A DPIA is required when processing is likely to result in high risk to individuals. Would you like me to analyze your specific case?",
        "Based on what you've described, this processing activity involves automated decision-making which triggers DPIA requirements under GDPR Article 35. Let me help you create a comprehensive assessment.",
        "For high-risk processing like profiling or large-scale monitoring, a thorough DPIA is essential. I can generate the complete assessment including risk analysis and mitigation measures.",
        "DPIA requirements depend on the scale, nature, and impact of processing. I can help determine if your activity requires a DPIA and guide you through the assessment process."
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
    <Card className="fixed right-4 top-4 bottom-4 w-96 z-50 shadow-2xl border-red-200">
      <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot className="h-5 w-5 text-red-600" />
            <CardTitle className="text-sm">DPIA AI Assistant</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription className="text-xs">
          AI-powered Data Protection Impact Assessment creation
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0 flex flex-col h-full">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {/* AI Agents Section */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4 text-red-600" />
                <span className="text-sm font-medium text-red-900">AI Agents</span>
              </div>
              
              <DPIAGenerationAgent
                isActive={activeAgents.generation}
                formData={formData}
                onFormUpdate={onFormUpdate}
                onGeneratedDPIAApply={onGeneratedDPIAApply}
              />
              
              <RiskAssessmentAgent
                isActive={activeAgents.riskAssessment}
                formData={formData}
                onRiskAssessment={(assessment) => {
                  onFormUpdate({ ...formData, riskAssessment: assessment });
                }}
              />
            </div>

            <Separator />

            {/* Chat Section */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4 text-red-600" />
                <span className="text-sm font-medium text-red-900">Chat Assistant</span>
              </div>
              
              <div className="space-y-3">
                {chatMessages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-lg text-xs ${
                      message.type === 'user' 
                        ? 'bg-red-600 text-white' 
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
              placeholder="Ask about DPIA requirements, risk assessment, compliance..."
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
                {activeAgents.generation && <Badge variant="outline" className="text-xs">DPIA Generation</Badge>}
                {activeAgents.riskAssessment && <Badge variant="outline" className="text-xs">Risk Assessment</Badge>}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DPIACopilotPanel;