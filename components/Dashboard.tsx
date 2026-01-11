
import React, { useState, useEffect } from 'react';
import { 
  Cpu, Database, Share2, Terminal, Globe, UserPlus, Zap, Filter, 
  ArrowRight, MessageSquareCode, Target, Users2
} from 'lucide-react';
import { Lead, CrawlBotStatus } from '../types';

const MOCK_LEADS: Lead[] = [
  { id: 'l1', name: 'Tan Ah Kow', source: 'Mudah.my', type: 'Target Customer', status: 'Pending Contact', propertyTitle: 'Single Storey Cheras' },
  { id: 'l2', name: 'Agent Sarah', source: 'iProperty', type: 'Partner Agent', status: 'Message Sent', propertyTitle: 'Mont Kiara Condo' },
  { id: 'l3', name: 'Wong Property', source: 'Facebook', type: 'Partner Agent', status: 'Converted', propertyTitle: 'Shoplot Bangsar' },
];

const BOTS: CrawlBotStatus[] = [
  { id: '1', name: 'Scraper-01', target: 'Mudah.my', status: 'Idle', lastRun: '2m ago', itemsFound: 1420 },
  { id: '2', name: 'Lead-Classifier', target: 'MongoDB AI', status: 'Processing', lastRun: 'Now', itemsFound: 42 },
];

const Dashboard: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([
    "[SYSTEM] MongoDB Atlas Connected Successfully",
    "[RAG] Re-building vector index for OUG listings...",
    "[CLASSIFIER] Found 3 Direct Owners in latest Mudah scrape",
    "[AUTOMATOR] TikTok posting scheduled for 6:00 PM"
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const actions = ["Classified listing", "Verified owner info", "Sent partner invite", "Updated sub-sale value"];
      const locations = ["Cyberjaya", "Puchong", "Kepong", "Petaling Jaya"];
      const newLog = `[${new Date().toLocaleTimeString()}] AI ${actions[Math.floor(Math.random() * actions.length)]} in ${locations[Math.floor(Math.random() * locations.length)]}`;
      setLogs(prev => [newLog, ...prev].slice(0, 6));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 pb-20">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Database Size', val: '1,420 units', icon: <Database className="text-blue-600" /> },
          { label: 'Target Owners', val: '84 Leads', icon: <Target className="text-red-600" /> },
          { label: 'Partner Agents', val: '128', icon: <Users2 className="text-green-600" /> },
          { label: 'AI Negotiations', val: '12 Active', icon: <MessageSquareCode className="text-indigo-600" /> },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-slate-50 rounded-2xl">{stat.icon}</div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-xl font-bold text-slate-900">{stat.val}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Step 3: Lead Intelligence */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Zap className="text-amber-500" size={20} />
                  Lead Intelligence (AI Classification)
                </h3>
                <p className="text-xs text-slate-400 font-medium">Automatic sorting of your MongoDB property table</p>
              </div>
              <button className="p-2 hover:bg-slate-50 rounded-xl"><Filter size={18} className="text-slate-400" /></button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    <th className="px-6 py-4">Source / Listing</th>
                    <th className="px-6 py-4">Classification</th>
                    <th className="px-6 py-4">AI Status</th>
                    <th className="px-6 py-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {MOCK_LEADS.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50/30 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-slate-800">{lead.propertyTitle}</p>
                        <p className="text-[10px] text-slate-400 font-medium">{lead.source}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] px-2 py-1 rounded-md font-black uppercase ${lead.type === 'Target Customer' ? 'bg-amber-100 text-amber-700' : 'bg-indigo-100 text-indigo-700'}`}>
                          {lead.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${lead.status === 'Converted' ? 'bg-green-500' : 'bg-slate-300'}`}></div>
                          <span className="text-xs font-semibold text-slate-600">{lead.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-indigo-600 hover:text-indigo-800 font-bold text-xs flex items-center gap-1">
                          Manage AI <ArrowRight size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Automation Bot Control */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-indigo-900 rounded-3xl p-6 text-white shadow-xl">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Share2 size={18} className="text-indigo-400" />
                Social Posting Bot (Step 4)
              </h3>
              <p className="text-sm text-indigo-200 mb-6">AI will auto-generate TikTok scripts and Facebook posts for your top 5 Direct Owner leads.</p>
              <div className="space-y-4">
                <button className="w-full bg-white text-indigo-900 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-50 transition-colors">
                  Run Posting Campaign
                </button>
                <div className="flex justify-between text-[10px] font-bold opacity-60">
                  <span>Last Run: Today 8:12 AM</span>
                  <span>Success Rate: 100%</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Globe size={18} className="text-indigo-600" />
                Crawler Health
              </h3>
              <div className="space-y-4">
                {BOTS.map(bot => (
                  <div key={bot.id} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-white shadow-sm ${bot.status === 'Processing' ? 'text-indigo-600 animate-pulse' : 'text-slate-400'}`}>
                        <Cpu size={14} />
                      </div>
                      <span className="text-xs font-bold text-slate-700">{bot.name}</span>
                    </div>
                    <span className="text-[10px] font-black text-indigo-600 uppercase">{bot.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Console & Activity */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-3xl p-6 shadow-2xl font-mono">
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-indigo-400" />
                <span className="text-[10px] font-bold text-white uppercase tracking-widest">RAG Engine Logs</span>
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
            </div>
            <div className="space-y-3">
              {logs.map((log, i) => (
                <div key={i} className={`text-[10px] leading-relaxed ${i === 0 ? 'text-white font-bold' : 'text-slate-500'}`}>
                  {log}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
               <UserPlus size={100} />
            </div>
            <h4 className="font-bold text-slate-800 mb-2">Automated Outreach</h4>
            <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6">
              AI found 12 new agents in the 'KL Luxury Condo' niche. Automatically send partnership invitation?
            </p>
            <button className="w-full bg-slate-900 text-white py-3 rounded-2xl font-bold text-xs uppercase hover:bg-indigo-600 transition-all">
              Invite 12 Partners
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
