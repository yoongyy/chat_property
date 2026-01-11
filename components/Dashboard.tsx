
import React, { useState, useEffect } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  TrendingUp, Users, MessageSquare, CheckCircle, Clock, 
  Cpu, Database, Share2, AlertCircle, RefreshCw, Terminal, Globe 
} from 'lucide-react';
import { Negotiation, CrawlBotStatus } from '../types';

const DATA = [
  { name: 'Mon', value: 400 },
  { name: 'Tue', value: 550 },
  { name: 'Wed', value: 480 },
  { name: 'Thu', value: 700 },
  { name: 'Fri', value: 850 },
  { name: 'Sat', value: 920 },
  { name: 'Sun', value: 880 },
];

const BOTS: CrawlBotStatus[] = [
  { id: '1', name: 'Scraper-01', target: 'Mudah.my', status: 'Scraping', lastRun: '10m ago', itemsFound: 142 },
  { id: '2', name: 'Scraper-02', target: 'iProperty', status: 'Processing', lastRun: '2h ago', itemsFound: 89 },
  { id: '3', name: 'RAG-Indexer', target: 'MongoDB Atlas', status: 'Idle', lastRun: '1h ago', itemsFound: 231 },
  { id: '4', name: 'Lead-Gen', target: 'FB Groups', status: 'Processing', lastRun: 'Active', itemsFound: 12 },
];

const MOCK_NEGOTIATIONS: Negotiation[] = [
  { id: '1', propertyName: 'Suasana Residences', status: 'Offer Pending', buyerName: 'Ahmad Tan', currentOffer: 'RM 580k', lastUpdate: '2 mins ago' },
  { id: '2', propertyName: 'D\'Island Puchong', status: 'Active', buyerName: 'Sarah Lim', currentOffer: 'RM 1.2M', lastUpdate: '1 hour ago' },
];

const Dashboard: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([
    "[SYSTEM] AI Backend Online",
    "[BOT-1] Connecting to Mudah.my proxy pool...",
    "[RAG] Re-indexing Bangsar sub-sale data...",
    "[LEAD] Found 3 potential sellers in 'KL Property Group'"
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newLog = `[${new Date().toLocaleTimeString()}] ${Math.random() > 0.5 ? 'Found new listing' : 'Updating sub-sale value'} for ${['Cheras', 'Mont Kiara', 'Subang'][Math.floor(Math.random() * 3)]}`;
      setLogs(prev => [newLog, ...prev].slice(0, 5));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4">
      {/* Bot Control Center */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Cpu className="text-indigo-600" size={20} />
                Crawl Bot Infrastructure
              </h3>
              <button className="flex items-center gap-2 text-xs font-bold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-full hover:bg-indigo-100 transition-colors">
                <RefreshCw size={14} />
                Force Re-crawl All
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {BOTS.map((bot) => (
                <div key={bot.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${bot.status === 'Scraping' ? 'bg-green-500 animate-pulse' : 'bg-slate-300'}`}></div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{bot.name}</p>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">{bot.target}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-indigo-600">+{bot.itemsFound} items</p>
                    <p className="text-[10px] text-slate-400">{bot.lastRun}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Real-time Negotiations */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                <MessageSquare className="text-indigo-600" size={18} />
                AI Negotiations (Active)
              </h3>
              <div className="space-y-4">
                {MOCK_NEGOTIATIONS.map((neg) => (
                  <div key={neg.id} className="p-4 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-all cursor-pointer group">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-sm font-bold text-slate-800">{neg.propertyName}</h4>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-indigo-50 text-indigo-600">
                        {neg.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500 font-medium">{neg.buyerName}</span>
                      <span className="font-bold text-slate-800">{neg.currentOffer}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Post Automator */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Share2 className="text-indigo-600" size={18} />
                Automated Posting
              </h3>
              <div className="space-y-3">
                {[
                  { site: 'Facebook Groups', reach: '2.4k', status: 'Scheduled' },
                  { site: 'TikTok Shop', reach: '12k', status: 'Posted' },
                  { site: 'Instagram Reels', reach: '5.1k', status: 'Posted' },
                  { site: 'XiaoHongShu', reach: '800', status: 'Draft' },
                ].map((post, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                        <Globe size={14} className="text-indigo-400" />
                      </div>
                      <span className="text-xs font-bold text-slate-700">{post.site}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">{post.reach} reach</p>
                      <p className={`text-[10px] font-black ${post.status === 'Posted' ? 'text-green-500' : 'text-orange-500'}`}>{post.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Status & Logs */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-3xl p-6 shadow-xl text-indigo-400 font-mono text-[10px]">
            <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-2">
              <Terminal size={14} />
              <span className="font-bold uppercase tracking-widest text-white">Live Activity Log</span>
            </div>
            <div className="space-y-2">
              {logs.map((log, i) => (
                <div key={i} className={i === 0 ? 'text-white font-bold' : ''}>{log}</div>
              ))}
            </div>
          </div>

          <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-lg shadow-indigo-100">
            <div className="flex justify-between items-start mb-6">
              <div className="p-2 bg-indigo-500 rounded-xl">
                <Database size={24} />
              </div>
              <span className="text-[10px] font-bold bg-indigo-500/50 px-2 py-1 rounded-full uppercase">Synced</span>
            </div>
            <h4 className="text-xs font-bold uppercase tracking-widest opacity-70 mb-1">RAG Data Index</h4>
            <p className="text-3xl font-black mb-4">1.2M+</p>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold">
                <span>Total Properties</span>
                <span>842,019</span>
              </div>
              <div className="w-full bg-indigo-500 h-1.5 rounded-full overflow-hidden">
                <div className="bg-white h-full w-[85%]"></div>
              </div>
              <p className="text-[10px] font-medium opacity-60 italic">Next deep-crawl in 4 hours</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-2 text-red-500 mb-3">
              <AlertCircle size={16} />
              <h4 className="text-xs font-bold uppercase tracking-wider">Unverified Leads</h4>
            </div>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">
              Found 8 direct owners on Facebook. AI is currently verifying ownership via land title matching.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
