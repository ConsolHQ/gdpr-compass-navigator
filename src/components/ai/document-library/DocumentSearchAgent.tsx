import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { 
  Search, 
  FileText, 
  Sparkles, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  Eye,
  Download
} from 'lucide-react';

interface DocumentSearchAgentProps {
  isActive: boolean;
  onSearchResult: (results: any[]) => void;
}

const DocumentSearchAgent: React.FC<DocumentSearchAgentProps> = ({
  isActive,
  onSearchResult
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'clause' | 'policy' | 'term' | 'general'>('general');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [lastSearch, setLastSearch] = useState('');

  const searchTypes = [
    { id: 'general', label: 'General Search', description: 'Search across all document content' },
    { id: 'clause', label: 'Contract Clauses', description: 'Find specific contractual clauses' },
    { id: 'policy', label: 'Policy Sections', description: 'Locate policy provisions' },
    { id: 'term', label: 'Legal Terms', description: 'Search for legal definitions and terms' }
  ];

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setLastSearch(searchQuery);
    
    // Simulate AI-powered document search
    setTimeout(() => {
      const mockResults = [
        {
          id: 'DOC-001',
          name: 'Privacy Policy v2.1',
          category: 'Legal Documents',
          relevanceScore: 0.95,
          matchedSections: [
            {
              section: 'Data Processing Purposes',
              content: 'We process personal data for legitimate business purposes including...',
              confidence: 0.92
            },
            {
              section: 'Legal Basis',
              content: 'The legal basis for processing is Article 6(1)(f) GDPR - legitimate interests...',
              confidence: 0.88
            }
          ],
          tags: ['Privacy', 'GDPR', 'Current']
        },
        {
          id: 'DOC-002',
          name: 'Data Processing Agreement - CloudCRM',
          category: 'Third Party Agreements',
          relevanceScore: 0.87,
          matchedSections: [
            {
              section: 'Processing Purposes Clause',
              content: 'The Processor shall process Personal Data only for the specific purposes...',
              confidence: 0.85
            }
          ],
          tags: ['DPA', 'CloudCRM', 'Active']
        },
        {
          id: 'DOC-004',
          name: 'Incident Response Procedure',
          category: 'Policies & Procedures',
          relevanceScore: 0.74,
          matchedSections: [
            {
              section: 'Data Breach Notification',
              content: 'Upon detection of a personal data breach, the organization shall...',
              confidence: 0.79
            }
          ],
          tags: ['Incident', 'Response', 'Procedure']
        }
      ];
      
      setSearchResults(mockResults);
      onSearchResult(mockResults);
      setIsSearching(false);
    }, 2000);
  };

  if (!isActive) {
    return (
      <Card className="opacity-50">
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-gray-400" />
            <CardTitle className="text-sm text-gray-500">Document Search Agent</CardTitle>
          </div>
          <CardDescription className="text-xs">
            Intelligent search for clauses, policies, and terms (Inactive)
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="border-blue-200 bg-blue-50/30">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-blue-600" />
          <CardTitle className="text-sm text-blue-900">Document Search Agent</CardTitle>
          <Badge variant="secondary" className="text-xs">Active</Badge>
        </div>
        <CardDescription className="text-xs">
          AI-powered search for clauses, policies, terms, and content across all documents
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Search Type Selection */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-700">Search Type</label>
          <div className="grid grid-cols-2 gap-2">
            {searchTypes.map((type) => (
              <Button
                key={type.id}
                variant={searchType === type.id ? 'default' : 'outline'}
                size="sm"
                className="text-xs p-2 h-auto flex-col items-start"
                onClick={() => setSearchType(type.id as any)}
              >
                <span className="font-medium">{type.label}</span>
                <span className="text-xs opacity-70 text-left">{type.description}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Search Input */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-700">Search Query</label>
          <div className="space-y-2">
            <Textarea
              placeholder={`Search for ${searchType === 'clause' ? 'specific contract clauses' : 
                           searchType === 'policy' ? 'policy provisions and sections' :
                           searchType === 'term' ? 'legal terms and definitions' :
                           'any document content'}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="min-h-[80px] text-xs"
            />
            <Button 
              onClick={handleSearch}
              disabled={!searchQuery.trim() || isSearching}
              size="sm"
              className="w-full"
            >
              {isSearching ? (
                <>
                  <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                  Searching Documents...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-3 w-3" />
                  Search Documents
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-700">
                Search Results for "{lastSearch}"
              </span>
              <Badge variant="outline" className="text-xs">
                {searchResults.length} documents
              </Badge>
            </div>
            
            <ScrollArea className="h-64">
              <div className="space-y-3">
                {searchResults.map((result) => (
                  <Card key={result.id} className="p-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-blue-600" />
                          <span className="font-medium text-sm">{result.name}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Badge 
                            variant={result.relevanceScore > 0.8 ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {Math.round(result.relevanceScore * 100)}% match
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <p className="text-xs text-gray-600">{result.category}</p>
                      
                      {/* Matched Sections */}
                      <div className="space-y-2">
                        {result.matchedSections.map((section: any, index: number) => (
                          <div key={index} className="bg-yellow-50 p-2 rounded text-xs">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-yellow-800">{section.section}</span>
                              <Badge variant="outline" className="text-xs">
                                {Math.round(section.confidence * 100)}% confidence
                              </Badge>
                            </div>
                            <p className="text-yellow-700 italic">"{section.content}"</p>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {result.tags.map((tag: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}

        {isSearching && (
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <Sparkles className="h-8 w-8 text-blue-600 animate-pulse mx-auto mb-2" />
              <p className="text-sm text-blue-700">AI is analyzing all documents...</p>
              <p className="text-xs text-gray-600 mt-1">
                Searching for {searchType} content across your document library
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DocumentSearchAgent;