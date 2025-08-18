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
  FileText,
  Tags,
  Wand2
} from 'lucide-react';
import DocumentGenerationAgent from './DocumentGenerationAgent';
import DocumentClassificationAgent from './DocumentClassificationAgent';

interface DocumentLibraryCopilotPanelProps {
  isOpen: boolean;
  onClose: () => void;
  formData: any;
  onFormUpdate: (updates: any) => void;
  onGeneratedDocumentApply: (generatedDocument: any) => void;
}

const DocumentLibraryCopilotPanel: React.FC<DocumentLibraryCopilotPanelProps> = ({
  isOpen,
  onClose,
  formData,
  onFormUpdate,
  onGeneratedDocumentApply
}) => {
  const [chatMessages, setChatMessages] = useState<any[]>([
    {
      id: 1,
      type: 'assistant',
      content: "I'm your Document Library AI Assistant! I can help you generate GDPR compliance documents, analyze and classify existing documents, and organize your privacy documentation efficiently.",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const getActiveAgents = () => {
    return {
      generation: true, // Always available
      classification: true // Always available for document analysis
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
        "I can help you create any GDPR compliance document you need! Privacy policies, data breach response plans, data retention policies - just tell me what you're looking for and I'll generate a comprehensive document.",
        "Need to organize your existing documents? I can analyze and classify them automatically, adding appropriate tags and compliance assessments. Just upload a document and I'll do the rest!",
        "For document generation, I can create industry-specific privacy policies, cookie policies, data processing agreements, and more. What type of document would be most helpful for your compliance needs?",
        "I can analyze uploaded documents for GDPR compliance, suggest improvements, and automatically tag them for easy organization. This helps maintain an organized and compliant document library."
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
    <Card className="fixed right-4 top-4 bottom-4 w-96 z-50 shadow-2xl border-teal-200">
      <CardHeader className="bg-gradient-to-r from-teal-50 to-green-50 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot className="h-5 w-5 text-teal-600" />
            <CardTitle className="text-sm">Document Library AI</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription className="text-xs">
          AI-powered document generation, classification, and organization
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0 flex flex-col h-full">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {/* AI Agents Section */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-4 w-4 text-teal-600" />
                <span className="text-sm font-medium text-teal-900">AI Agents</span>
              </div>
              
              <DocumentGenerationAgent
                isActive={activeAgents.generation}
                formData={formData}
                onFormUpdate={onFormUpdate}
                onGeneratedDocumentApply={onGeneratedDocumentApply}
              />
              
              <DocumentClassificationAgent
                isActive={activeAgents.classification}
                onClassificationResult={(result) => {
                  onFormUpdate({ ...formData, lastClassification: result });
                }}
              />
            </div>

            <Separator />

            {/* Chat Section */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4 text-teal-600" />
                <span className="text-sm font-medium text-teal-900">Chat Assistant</span>
              </div>
              
              <div className="space-y-3">
                {chatMessages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-lg text-xs ${
                      message.type === 'user' 
                        ? 'bg-teal-600 text-white' 
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
              placeholder="Ask about document generation, classification, compliance..."
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
                {activeAgents.generation && <Badge variant="outline" className="text-xs">Document Generation</Badge>}
                {activeAgents.classification && <Badge variant="outline" className="text-xs">Classification</Badge>}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentLibraryCopilotPanel;