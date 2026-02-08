
import React, { useState } from 'react';

interface ApproveReqPageProps {
  themeColor?: string;
}

export const ApproveReqPage: React.FC<ApproveReqPageProps> = ({ themeColor = 'purple-600' }) => {
  const [selectedReq, setSelectedReq] = useState<any>(null);

  const mockRequisitions = [
    { id: 'REQ-101', name: 'Dr. Sarah Miller', amount: '$5,000', status: 'Pending', project: 'Solar Grid 1', fund: 'General Fund', function: 'Administration', grant: 'UNESCO Grant', remarks: 'Technical audit for Q1', files: ['Contract.pdf', 'Proposal.jpg'] },
    { id: 'REQ-102', name: 'James Wilson', amount: '$12,400', status: 'Pending', project: 'Digital Literacy', fund: 'Infrastructure Fund', function: 'Field Operations', grant: 'Tech Innovation', remarks: 'Infrastructure scaling plan', files: ['Quote.pdf'] },
    { id: 'REQ-103', name: 'Apex Consulting', amount: '$2,500', status: 'Awaiting Info', project: 'Solar Grid 1', fund: 'General Fund', function: 'Administration', grant: 'UNESCO Grant', remarks: 'Final sign-off documentation', files: [] },
  ];

  return (
    <div className="animate-in fade-in duration-500 flex flex-col h-full gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white mb-2 uppercase tracking-tighter">Review & Approve</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Verify requisition details and view attached evidence.</p>
        </div>
        <button className="px-6 py-2.5 bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg transform hover:scale-105 transition">
          📥 Export to Excel
        </button>
      </div>

      <div className="flex gap-8 items-start h-[calc(100vh-280px)]">
        {/* Left Panel: List */}
        <div className="w-1/2 h-full bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50">
             <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Pending List</h3>
          </div>
          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-700">
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Requestor</th>
                  <th className="px-6 py-4 text-right">Amount</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
                <tr className="bg-slate-50/50 border-b">
                   <th className="px-6 py-2"><input type="text" placeholder="ID" className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-[9px] outline-none" /></th>
                   <th className="px-6 py-2"><input type="text" placeholder="Name" className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-[9px] outline-none" /></th>
                   <th className="px-6 py-2"><input type="text" placeholder="Amount" className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-[9px] outline-none text-right" /></th>
                   <th className="px-6 py-2"><input type="text" placeholder="Stat" className="w-full px-2 py-1 bg-white border border-slate-200 rounded text-[9px] outline-none" /></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {mockRequisitions.map((req) => (
                  <tr 
                    key={req.id} 
                    onClick={() => setSelectedReq(req)}
                    className={`cursor-pointer transition-all hover:bg-slate-50 dark:hover:bg-slate-700/50 ${selectedReq?.id === req.id ? 'bg-indigo-50 dark:bg-indigo-900/20' : ''}`}
                  >
                    <td className="px-6 py-5 font-mono text-xs font-bold text-indigo-500">{req.id}</td>
                    <td className="px-6 py-5 font-bold text-slate-700 dark:text-slate-200">{req.name}</td>
                    <td className="px-6 py-5 text-right font-black text-slate-900 dark:text-white">{req.amount}</td>
                    <td className="px-6 py-5">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-yellow-100 text-yellow-700">
                        {req.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Panel: Details */}
        <div className="w-1/2 h-full">
          {selectedReq ? (
            <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden h-full flex flex-col">
              <div className={`bg-${themeColor} px-8 py-6 text-white`}>
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-black">{selectedReq.id}</h2>
                  <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-lg uppercase tracking-widest">Details View</span>
                </div>
              </div>

              <div className="p-8 flex-1 overflow-y-auto space-y-8">
                <div className="grid grid-cols-2 gap-8">
                  <div className="bg-slate-50 dark:bg-slate-900/30 p-4 rounded-2xl">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Consultant</label>
                    <div className="font-bold text-slate-900 dark:text-white text-base">{selectedReq.name}</div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-900/30 p-4 rounded-2xl">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Amount</label>
                    <div className="font-black text-2xl text-slate-900 dark:text-white">{selectedReq.amount}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Project</label>
                    <div className="text-xs font-bold text-slate-700 dark:text-slate-300">{selectedReq.project}</div>
                  </div>
                  <div>
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Fund</label>
                    <div className="text-xs font-bold text-slate-700 dark:text-slate-300">{selectedReq.fund}</div>
                  </div>
                </div>
                
                <div className="p-6 bg-slate-50 dark:bg-slate-900/30 rounded-2xl border-l-4 border-brand-500">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2">Remarks</label>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed italic">
                    "{selectedReq.remarks}"
                  </p>
                </div>

                <div>
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-4">Attachments ({selectedReq.files?.length || 0})</label>
                  <div className="grid grid-cols-1 gap-3">
                    {selectedReq.files && selectedReq.files.length > 0 ? (
                      selectedReq.files.map((file: string, idx: number) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-white dark:bg-slate-700/50 border border-slate-100 dark:border-slate-700 rounded-2xl group hover:border-brand-500 transition cursor-pointer">
                           <div className="flex items-center gap-3">
                             <span className="text-xl">📄</span>
                             <span className="text-xs font-black text-slate-700 dark:text-white uppercase tracking-wider">{file}</span>
                           </div>
                           <button className="px-4 py-2 bg-slate-100 dark:bg-slate-700 group-hover:bg-brand-500 group-hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition">
                             Open File
                           </button>
                        </div>
                      ))
                    ) : (
                      <div className="text-xs text-slate-400 font-medium italic p-4 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-2xl text-center">No files attached to this requisition.</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-8 border-t border-slate-100 dark:border-slate-700 flex gap-4">
                <button className="flex-1 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition shadow-lg">Approve</button>
                <button className="flex-1 py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition shadow-lg">Reject</button>
              </div>
            </div>
          ) : (
            <div className="h-full border-4 border-dashed border-slate-200 dark:border-slate-700 rounded-3xl flex flex-col items-center justify-center text-slate-300 p-10 text-center">
              <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 text-4xl">🔎</div>
              <h3 className="text-xl font-bold uppercase tracking-widest">Select Requisition</h3>
              <p className="text-sm mt-2 font-medium">Pick an item from the left to review files and details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
