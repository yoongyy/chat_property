
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Search, ExternalLink, Sparkles, Plus, Mic, Database, ShieldCheck } from 'lucide-react';
import { Message, Property } from '../types';
import { geminiService } from '../services/geminiService';
import PropertyCard from './PropertyCard';

// Simulated RAG results from your actual MongoDB Crawler
const MOCK_DB_PROPERTIES: Property[] = [
  {
    id: 'db_1',
    title: 'Direct Owner: Residensi Waltz',
    price: '720,000',
    location: 'OUG, Kuala Lumpur',
    type: 'Subsale',
    bedrooms: 3,
    bathrooms: 3,
    sqft: 1088,
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    description: 'Freshly crawled from Mudah.my. High floor, move-in condition.',
    source: 'Mudah.my',
    uploaderType: 'Owner'
  }
];

const SUGGESTIONS = [
  "Search my MongoDB for direct owner units in KL",
  "Is the OUG market overvalued right now?",
  "Setup AI negotiator for my property",
  "Find agent partners in Penang"
];

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (customInput?: string) => {
    const query = customInput || input;
    if (!query.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: query,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Simulate RAG check
      const isSearchQuery = query.toLowerCase().includes('search') || query.toLowerCase().includes('find') || query.toLowerCase().includes('unit');
      
      const response = await geminiService.chatWithAssistant(query, messages);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: isSearchQuery 
          ? `I've checked your MongoDB RAG index. I found a Direct Owner listing that matches your criteria perfectly.` 
          : response.text,
        timestamp: new Date(),
        groundingSources: response.sources,
        isRAGHit: isSearchQuery,
        properties: isSearchQuery ? MOCK_DB_PROPERTIES : undefined
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "API Error. Please check your backend connection.",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 w-full">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 md:py-20 text-center animate-in fade-in duration-700">
          <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center text-white shadow-2xl mb-8">
            <Sparkles size={40} />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Welcome to <span className="text-indigo-600">ChatProperty</span>
          </h2>
          <p className="text-slate-500 max-w-lg mb-12 text-lg font-medium">
            Your MongoDB is connected. I am ready to analyze your {MOCK_DB_PROPERTIES.length} crawled units and start negotiating.
          </p>
          
          <div className="w-full max-w-2xl bg-white p-2 rounded-[2.5rem] shadow-2xl border border-slate-100 mb-8">
            <div className="flex items-center px-4 py-2">
              <Search className="text-slate-400 mr-3" size={24} />
              <input 
                autoFocus
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask your AI Assistant anything..."
                className="flex-1 text-lg outline-none bg-transparent py-4 font-medium"
              />
              <button 
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
                className="bg-indigo-600 text-white p-4 rounded-[1.8rem] hover:scale-105 transition-all"
              >
                {isLoading ? <Loader2 className="animate-spin" size={24} /> : <Send size={24} />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
            {SUGGESTIONS.map((s, i) => (
              <button key={i} onClick={() => handleSend(s)} className="text-left px-5 py-4 rounded-2xl bg-white border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 text-slate-600 text-sm font-semibold transition-all">
                {s}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-[calc(100vh-220px)]">
          <div className="flex-1 overflow-y-auto space-y-8 pr-4 custom-scrollbar">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${msg.role === 'assistant' ? 'bg-indigo-600 text-white' : 'bg-white border text-slate-500'}`}>
                    {msg.role === 'assistant' ? <Bot size={22} /> : <User size={22} />}
                  </div>
                  <div className="space-y-4">
                    <div className={`p-5 rounded-3xl text-[15px] font-medium shadow-sm border ${msg.role === 'assistant' ? 'bg-white text-slate-800' : 'bg-indigo-600 text-white border-transparent'}`}>
                      {msg.content}
                    </div>
                    
                    {msg.isRAGHit && (
                      <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full border border-green-100 text-xs font-bold w-fit animate-pulse">
                        <Database size={14} />
                        MATCH FOUND IN MONGODB PROPERTY TABLE
                      </div>
                    )}

                    {msg.properties && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {msg.properties.map(prop => (
                          <div key={prop.id} className="relative">
                            <PropertyCard property={prop} />
                            {prop.uploaderType === 'Owner' && (
                              <div className="absolute top-2 right-2 bg-amber-500 text-white text-[10px] font-black px-2 py-1 rounded-md shadow-lg">
                                TARGET LEAD
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 bg-white/50 backdrop-blur-sm sticky bottom-0">
            <div className="max-w-3xl mx-auto relative">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Talk to your property database..."
                className="w-full pl-6 pr-16 py-5 bg-white border border-slate-200 rounded-[2rem] focus:ring-4 focus:ring-indigo-50 shadow-xl"
              />
              <button 
                onClick={() => handleSend()}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-indigo-600 text-white rounded-full hover:scale-105"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
