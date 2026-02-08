
import React, { useState, useMemo } from 'react';
import { RequisitionDetailsDrawer } from './RequisitionDetailsDrawer';
import { VoucherDetailsDrawer } from './VoucherDetailsDrawer';

interface ApproveVoucherProps {
  type: 'Expense' | 'Bank';
  themeColor: string;
}

export const ApproveVoucher: React.FC<ApproveVoucherProps> = ({ type, themeColor }) => {
  const [selectedVoucher, setSelectedVoucher] = useState<any>(null);
  const [viewingReqId, setViewingReqId] = useState<string | null>(null);
  const [viewingVoucherId, setViewingVoucherId] = useState<string | null>(null);

  // Filter states
  const [filterId, setFilterId] = useState('');
  const [filterPayee, setFilterPayee] = useState('');

  const mockVouchers = useMemo(() => [
    { 
      id: `${type.charAt(0)}V-2024-001`, 
      date: '2024-03-20', 
      total: '$5,000', 
      payee: 'Dr. Sarah Miller', 
      status: 'Pending Review', 
      linkedReq: 'REQ-501',
      linkedVoucher: type === 'Bank' ? 'EV-2024-001' : null,
      project: 'Solar Grid 1',
      fund: 'General Fund',
      function: 'Administration',
      grant: 'UNESCO Grant'
    },
    { 
      id: `${type.charAt(0)}V-2024-002`, 
      date: '2024-03-21', 
      total: '$2,500', 
      payee: 'Apex Consulting', 
      status: 'Awaiting Supervisor', 
      linkedReq: 'REQ-503',
      linkedVoucher: type === 'Bank' ? 'EV-2024-002' : null,
      project: 'Solar Grid 1',
      fund: 'General Fund',
      function: 'Administration',
      grant: 'UNESCO Grant'
    },
    { 
      id: `${type.charAt(0)}V-2024-003`, 
      date: '2024-03-22', 
      total: '$12,400', 
      payee: 'James Wilson', 
      status: 'Pending Review', 
      linkedReq: 'REQ-502',
      linkedVoucher: type === 'Bank' ? 'EV-2024-003' : null,
      project: 'Digital Literacy',
      fund: 'Infrastructure Fund',
      function: 'Field Operations',
      grant: 'Tech Innovation'
    },
  ], [type]);

  const filteredVouchers = useMemo(() => {
    return mockVouchers.filter(v => 
      v.id.toLowerCase().includes(filterId.toLowerCase()) &&
      v.payee.toLowerCase().includes(filterPayee.toLowerCase())
    );
  }, [mockVouchers, filterId, filterPayee]);

  const mainIdLabel = type === 'Bank' ? 'Bank Voucher' : 'Expense Voucher';

  return (
    <div className="animate-in fade-in duration-500 flex flex-col h-full gap-6 relative">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tight">Approve {mainIdLabel}s</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-1 text-xs">Review entries and authorize disbursement.</p>
        </div>
        <button onClick={() => alert("Exporting list to Excel...")} className="px-6 py-2 bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg transform hover:scale-105 transition">📥 Export List to Excel</button>
      </div>

      <div className="flex gap-6 items-start h-[calc(100vh-250px)]">
        <div className="w-1/2 h-full bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden flex flex-col">
          <div className="p-5 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 flex justify-between items-center">
             <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pending {mainIdLabel}s</h3>
             <span className="text-[10px] font-black text-brand-600 bg-brand-50 px-2 py-1 rounded-lg">{filteredVouchers.length} Items</span>
          </div>
          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/30 dark:bg-slate-900/30 text-[9px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-700">
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Payee</th>
                  <th className="px-6 py-4 text-right">Amount</th>
                </tr>
                <tr className="bg-slate-50/20 border-b dark:border-slate-700">
                   <th className="px-6 py-2"><input type="text" value={filterId} onChange={(e) => setFilterId(e.target.value)} placeholder="Filter ID" className="w-full px-2 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-[9px] outline-none dark:text-white" /></th>
                   <th className="px-6 py-2"><input type="text" value={filterPayee} onChange={(e) => setFilterPayee(e.target.value)} placeholder="Filter Payee" className="w-full px-2 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-[9px] outline-none dark:text-white" /></th>
                   <th className="px-6 py-2"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-700">
                {filteredVouchers.map((v) => (
                  <tr key={v.id} onClick={() => setSelectedVoucher(v)} className={`cursor-pointer transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50 ${selectedVoucher?.id === v.id ? 'bg-brand-50/40 dark:bg-brand-900/10' : ''}`}>
                    <td className="px-6 py-4">
                      <div className="text-[10px] font-mono font-bold text-brand-600">{v.id}</div>
                      <div className="text-[9px] text-slate-400 font-medium">{v.date}</div>
                    </td>
                    <td className="px-6 py-4 text-xs font-bold text-slate-700 dark:text-slate-200">{v.payee}</td>
                    <td className="px-6 py-4 text-right text-xs font-black text-slate-900 dark:text-white">{v.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex-1 h-full">
          {selectedVoucher ? (
            <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden h-full flex flex-col">
              <div className={`bg-${themeColor} px-8 py-6 text-white`}><h2 className="text-xl font-black uppercase tracking-tight">{selectedVoucher.id}</h2></div>
              <div className="p-8 flex-1 overflow-y-auto space-y-6">
                <div className="grid grid-cols-2 gap-6">
                   <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-700"><label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Status</label><span className="text-[9px] font-black uppercase text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-lg border border-yellow-100">{selectedVoucher.status}</span></div>
                   <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-700"><label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Date</label><div className="text-sm font-bold dark:text-white">{selectedVoucher.date}</div></div>
                </div>
                <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-700 text-center"><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Total amount</label><div className="text-4xl font-black text-brand-600 dark:text-brand-400">{selectedVoucher.total}</div></div>
                <div className="space-y-4">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Links</h3>
                  <div className="grid grid-cols-1 gap-2">
                    <div onClick={() => setViewingReqId(selectedVoucher.linkedReq)} className="flex items-center justify-between p-4 border border-slate-100 dark:border-slate-700 rounded-2xl bg-white dark:bg-slate-800 hover:border-brand-500 cursor-pointer transition-all shadow-sm">
                      <div className="flex items-center gap-4"><span>📄</span><div><div className="text-xs font-black text-brand-600 font-mono">{selectedVoucher.linkedReq}</div><div className="text-[9px] text-slate-400 font-bold uppercase">Requisition</div></div></div>
                      <span className="text-[9px] font-black text-slate-400 uppercase">View →</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-8 border-t border-slate-100 dark:border-slate-700 flex gap-4 bg-slate-50/30">
                <button className="flex-1 py-4 bg-emerald-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg">Approve</button>
                <button className="flex-1 py-4 bg-rose-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg">Reject</button>
              </div>
            </div>
          ) : (
             <div className="h-full border-4 border-dashed border-slate-100 dark:border-slate-800 rounded-3xl flex flex-col items-center justify-center text-slate-300 p-10 text-center">
                <div className="text-6xl mb-4 opacity-30">📂</div>
                <h3 className="text-lg font-black uppercase tracking-widest">Select an item</h3>
             </div>
          )}
        </div>
      </div>
      <RequisitionDetailsDrawer reqId={viewingReqId} onClose={() => setViewingReqId(null)} />
      <VoucherDetailsDrawer voucherId={viewingVoucherId} onClose={() => setViewingVoucherId(null)} />
    </div>
  );
};
