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
  Scale,
  Wand2
} from 'lucide-react';
import LIAGenerationAgent from './LIAGenerationAgent';
import BalancingTestAgent from './BalancingTestAgent';

interface LIACopilotPanelProps {
  isOpen: boolean;
  onClose: () => void;
  formData: any;
  onFormUpdate: (updates: any) => void;
  onGeneratedLIAApply: (generatedLIA: any) => void;
}

const LIACopilotPanel: React.FC<LIACopilotPanelProps> = ({
  isOpen,
  onClose,
  formData,
  onFormUpdate,
  onGeneratedLIAApply
}) => {
  const [chatMessages, setChatMessages] = useState<any[]>([
    {
      id: 1,
      type: 'assistant',
      content: "I'm your LIA AI Assistant! I can help you create comprehensive Legitimate Interest Assessments with proper balancing tests. Describe your processing activity and I'll analyze whether legitimate interest is the appropriate legal basis.",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const getActiveAgents = () => {
    return {
      generation: true, // Always available
      balancingTest: formData.name || formData.description
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
        "I can help you assess legitimate interest for this processing activity! Legitimate interest requires three tests: necessity, balancing, and safeguards. Let me analyze your specific case.",
        "For legitimate interest to be valid, your interests must outweigh the data subject's rights and freedoms. I can perform the balancing test and suggest appropriate safeguards.",
        "Legitimate interest is often appropriate for marketing to existing customers, fraud prevention, and network security. However, the balancing test is crucial - shall I analyze your case?",
        "Remember that legitimate interest doesn't override data subject rights. People can still object to processing. I can help you implement proper safeguards and objection mechanisms."
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
    <Card className="fixed right-4 top-4 bottom-4 w-96 z-50 shadow-2xl border-indigo-200">
      <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot className="h-5 w-5 text-indigo-600" />
            <CardTitle className="text-sm">LIA AI Assistant</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription className="text-xs">
          AI-powered Legitimate Interest Assessment creation and balancing
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0 flex flex-col h-full">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {/* AI Agents Section */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4 text-indigo-600" />
                <span className="text-sm font-medium text-indigo-900">AI Agents</span>
              </div>
              
              <LIAGenerationAgent
                isActive={activeAgents.generation}
                formData={formData}
                onFormUpdate={onFormUpdate}
                onGeneratedLIAApply={onGeneratedLIAApply}
              />
              
              <BalancingTestAgent
                isActive={activeAgents.balancingTest}
                formData={formData}
                onBalancingResult={(result) => {
                  onFormUpdate({ ...formData, balancingTest: result });
                }}
              />
            </div>

            <Separator />

            {/* Chat Section */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4 text-indigo-600" />
                <span className="text-sm font-medium text-indigo-900">Chat Assistant</span>
              </div>
              
              <div className="space-y-3">
                {chatMessages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-lg text-xs ${
                      message.type === 'user' 
                        ? 'bg-indigo-600 text-white' 
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
              placeholder="Ask about legitimate interest, balancing tests, safeguards..."
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
                {activeAgents.generation && <Badge variant="outline" className="text-xs">LIA Generation</Badge>}
                {activeAgents.balancingTest && <Badge variant="outline" className="text-xs">Balancing Test</Badge>}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LIACopilotPanel;