
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Search, ExternalLink, MapPin, Sparkles, Plus, Mic, History } from 'lucide-react';
import { Message, Property } from '../types';
import { geminiService } from '../services/geminiService';
import PropertyCard from './PropertyCard';

const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'The Tropika Bukit Jalil',
    price: '650,000',
    location: 'Bukit Jalil, Kuala Lumpur',
    type: 'New',
    bedrooms: 2,
    bathrooms: 2,
    sqft: 732,
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    description: 'Modern luxury lifestyle near recreational park.'
  },
  {
    id: '2',
    title: 'Tropicana Gardens',
    price: '980,000',
    location: 'Kota Damansara, Selangor',
    type: 'Subsale',
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1200,
    imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80',
    description: 'Integrated development with direct access to MRT.'
  }
];

const SUGGESTIONS = [
  "New condos in Mont Kiara under RM 1.2M",
  "Is it a good time to sell in Bangsar?",
  "Calculate RPGT for a 5-year property",
  "Find landed houses in Johor Bahru near CIQ"
];

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | undefined>();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isFirstInteraction = messages.length === 0;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setUserLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
      });
    }
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
      const response = await geminiService.chatWithAssistant(query, messages, userLocation);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.text,
        timestamp: new Date(),
        groundingSources: response.sources,
        properties: query.toLowerCase().includes('search') || query.toLowerCase().includes('condo') || query.toLowerCase().includes('house') || query.toLowerCase().includes('find') ? MOCK_PROPERTIES : undefined
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I apologize, but I'm having trouble accessing the real-time property market right now. Please try again in a moment.",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 w-full">
      {isFirstInteraction ? (
        <div className="flex flex-col items-center justify-center py-12 md:py-24 text-center animate-in fade-in zoom-in-95 duration-700">
          <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-indigo-200 mb-8 rotate-3">
            <Sparkles size={40} />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Find your next property, <span className="text-indigo-600">AI first.</span>
          </h2>
          <p className="text-slate-500 max-w-lg mb-12 text-lg font-medium">
            No more endless lists. Just tell me what you're looking for, or ask about market values in any Malaysian neighborhood.
          </p>
          
          <div className="w-full max-w-2xl bg-white p-2 rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 mb-8 focus-within:ring-4 ring-indigo-50 transition-all">
            <div className="flex items-center px-4 py-2">
              <Search className="text-slate-400 mr-3" size={24} />
              <input 
                autoFocus
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask anything about Malaysia property..."
                className="flex-1 text-lg outline-none bg-transparent placeholder:text-slate-300 py-4 font-medium"
              />
              <button 
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
                className="bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-[1.8rem] shadow-lg shadow-indigo-100 transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="animate-spin" size={24} /> : <Send size={24} />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
            {SUGGESTIONS.map((s, i) => (
              <button 
                key={i}
                onClick={() => handleSend(s)}
                className="text-left px-5 py-4 rounded-2xl bg-white border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 text-slate-600 text-sm font-semibold transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="group-hover:text-indigo-600 transition-colors">{s}</span>
                  <Plus size={14} className="text-slate-300 group-hover:text-indigo-400" />
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-[calc(100vh-200px)]">
          <div className="flex-1 overflow-y-auto space-y-8 pr-4 custom-scrollbar scroll-smooth">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
                <div className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${msg.role === 'assistant' ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-500'}`}>
                    {msg.role === 'assistant' ? <Bot size={22} /> : <User size={22} />}
                  </div>
                  <div className="space-y-4">
                    <div className={`p-5 rounded-3xl text-[15px] leading-relaxed font-medium shadow-sm border ${
                      msg.role === 'assistant' 
                        ? 'bg-white text-slate-800 border-slate-100' 
                        : 'bg-indigo-600 text-white border-transparent shadow-indigo-100 shadow-xl'
                    }`}>
                      {msg.content}
                    </div>
                    
                    {msg.groundingSources && msg.groundingSources.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {msg.groundingSources.map((source, i) => (
                          <a 
                            key={i}
                            href={source.uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-[11px] font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full transition-all border border-slate-200/50"
                          >
                            <ExternalLink size={12} />
                            {source.title.length > 25 ? source.title.substring(0, 25) + '...' : source.title}
                          </a>
                        ))}
                      </div>
                    )}

                    {msg.properties && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {msg.properties.map(prop => (
                          <PropertyCard key={prop.id} property={prop} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-4 max-w-[85%]">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
                    <Bot size={22} />
                  </div>
                  <div className="p-5 bg-white rounded-3xl shadow-sm border border-slate-100 flex items-center gap-3">
                    <Loader2 className="animate-spin text-indigo-500" size={20} />
                    <span className="text-sm font-bold text-slate-400 animate-pulse">Consulting real estate database...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <div className="max-w-3xl mx-auto relative group">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Follow up or ask something else..."
                className="w-full pl-14 pr-16 py-5 bg-white border border-slate-200 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all text-[15px] font-semibold shadow-xl shadow-slate-200/50"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex gap-2">
                <button className="p-2 text-slate-300 hover:text-indigo-500 transition-colors">
                  <Plus size={20} />
                </button>
              </div>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                 <button className="p-2 text-slate-300 hover:text-indigo-500 transition-colors">
                  <Mic size={20} />
                </button>
                <button 
                  onClick={() => handleSend()}
                  disabled={isLoading || !input.trim()}
                  className={`p-3 rounded-[1.3rem] transition-all ${input.trim() ? 'bg-indigo-600 text-white shadow-lg hover:scale-105 active:scale-95' : 'text-slate-300 cursor-not-allowed'}`}
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
