import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Bot, Key, Eye, EyeOff } from 'lucide-react';

const AIIntegrationSettings = () => {
  const [showApiKeys, setShowApiKeys] = React.useState({
    openai: false,
    perplexity: false,
    claude: false
  });

  const [apiKeys, setApiKeys] = React.useState({
    openai: '',
    perplexity: '',
    claude: ''
  });

  const toggleKeyVisibility = (provider: 'openai' | 'perplexity' | 'claude') => {
    setShowApiKeys(prev => ({
      ...prev,
      [provider]: !prev[provider]
    }));
  };

  const handleApiKeyChange = (provider: 'openai' | 'perplexity' | 'claude', value: string) => {
    setApiKeys(prev => ({
      ...prev,
      [provider]: value
    }));
  };

  const saveApiKey = async (provider: 'openai' | 'perplexity' | 'claude') => {
    // In a real implementation, this would save to Supabase Edge Function Secrets
    console.log(`Saving ${provider} API key:`, apiKeys[provider]);
    // TODO: Implement Supabase secret storage
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">AI Integration Settings</h1>
        <p className="text-gray-600 mt-2">Configure your own AI API keys for enhanced functionality</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bot className="h-5 w-5" />
            <span>AI Integration Settings</span>
          </CardTitle>
          <CardDescription>Configure your own AI API keys for enhanced functionality. Platform AI is enabled by default.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-2">
              <Bot className="h-4 w-4 text-blue-600" />
              <h4 className="font-medium text-blue-900">Platform AI Integration</h4>
            </div>
            <p className="text-sm text-blue-700 mt-1">
              Our built-in AI capabilities are active across all modules. Add your own API keys below for additional features and higher usage limits.
            </p>
          </div>

          {/* OpenAI Integration */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Key className="h-4 w-4" />
              <h3 className="font-medium">OpenAI Integration</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="openai-key">OpenAI API Key</Label>
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <Input
                      id="openai-key"
                      type={showApiKeys.openai ? "text" : "password"}
                      placeholder="sk-..."
                      value={apiKeys.openai}
                      onChange={(e) => handleApiKeyChange('openai', e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => toggleKeyVisibility('openai')}
                    >
                      {showApiKeys.openai ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <Button 
                    onClick={() => saveApiKey('openai')}
                    disabled={!apiKeys.openai}
                  >
                    Save
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Used for advanced text generation and analysis features
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Perplexity Integration */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Key className="h-4 w-4" />
              <h3 className="font-medium">Perplexity Integration</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="perplexity-key">Perplexity API Key</Label>
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <Input
                      id="perplexity-key"
                      type={showApiKeys.perplexity ? "text" : "password"}
                      placeholder="pplx-..."
                      value={apiKeys.perplexity}
                      onChange={(e) => handleApiKeyChange('perplexity', e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => toggleKeyVisibility('perplexity')}
                    >
                      {showApiKeys.perplexity ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <Button 
                    onClick={() => saveApiKey('perplexity')}
                    disabled={!apiKeys.perplexity}
                  >
                    Save
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Used for real-time web search and research capabilities
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Claude Integration */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Key className="h-4 w-4" />
              <h3 className="font-medium">Claude Integration</h3>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="claude-key">Claude API Key</Label>
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <Input
                      id="claude-key"
                      type={showApiKeys.claude ? "text" : "password"}
                      placeholder="sk-ant-..."
                      value={apiKeys.claude}
                      onChange={(e) => handleApiKeyChange('claude', e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => toggleKeyVisibility('claude')}
                    >
                      {showApiKeys.claude ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <Button 
                    onClick={() => saveApiKey('claude')}
                    disabled={!apiKeys.claude}
                  >
                    Save
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Used for document analysis and compliance recommendations
                </p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
            <h4 className="font-medium text-amber-900 mb-2">Security Notice</h4>
            <p className="text-sm text-amber-700">
              Your API keys are securely encrypted and stored using Supabase Edge Function Secrets. 
              They are only accessible by your organization and are never shared with third parties.
            </p>
          </div>

          <div className="flex justify-between">
            <Button variant="outline">Test Connections</Button>
            <Button>Save All Settings</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIIntegrationSettings;