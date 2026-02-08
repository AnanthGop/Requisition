
import React, { useState } from 'react';

interface CreateVoucherProps {
  type: 'Expense' | 'Bank';
  themeColor: string;
}

interface SelectedReq {
  id: string;
  consultant: string;
  amount: number;
  date: string;
  status: string;
}

export const CreateVoucher: React.FC<CreateVoucherProps> = ({ type, themeColor }) => {
  const [selectedItems, setSelectedItems] = useState<SelectedReq[]>([]);
  const [step, setStep] = useState<1 | 2>(1);
  const [attachedFiles, setAttachedFiles] = useState<string[]>([]);
  
  const idLabel = type === 'Bank' ? 'Expense Voucher ID' : 'Requisition ID';
  // User requested Expense vouchers be single selection as well
  const isSingleSelect = true; 

  const mockData: SelectedReq[] = type === 'Bank' ? [
    { id: 'EV-2024-001', consultant: 'Dr. Sarah Miller', amount: 5000, date: '2024-03-24', status: 'Approved' },
    { id: 'EV-2024-002', consultant: 'James Wilson', amount: 12400, date: '2024-03-25', status: 'Approved' },
    { id: 'EV-2024-003', consultant: 'Apex Consulting', amount: 2500, date: '2024-03-26', status: 'Approved' },
  ] : [
    { id: 'REQ-501', consultant: 'Dr. Sarah Miller', amount: 5000, date: '2024-03-20', status: 'Approved' },
    { id: 'REQ-502', consultant: 'James Wilson', amount: 12400, date: '2024-03-21', status: 'Approved' },
    { id: 'REQ-503', consultant: 'Apex Consulting', amount: 2500, date: '2024-03-22', status: 'Approved' },
    { id: 'REQ-504', consultant: 'Solar Grid Partners', amount: 8900, date: '2024-03-23', status: 'Approved' },
  ];

  const toggleSelect = (req: SelectedReq) => {
    if (isSingleSelect) {
      setSelectedItems([req]);
    } else {
      setSelectedItems(prev => prev.find(x => x.id === req.id) ? prev.filter(x => x.id !== req.id) : [...prev, req]);
    }
  };

  const handleUpdateAmount = (id: string, newAmount: number) => {
    setSelectedItems(prev => prev.map(item => item.id === id ? { ...item, amount: newAmount } : item));
  };

  const handleUpdateDate = (id: string, newDate: string) => {
    setSelectedItems(prev => prev.map(item => item.id === id ? { ...item, date: newDate } : item));
  };

  const handleExport = () => {
    alert("Exporting voucher details to Excel...");
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className={`bg-${themeColor} px-10 py-6 flex items-center justify-between text-white`}>
          <div>
             <h2 className="text-2xl font-black uppercase tracking-tight">Generate {type} Voucher</h2>
             <p className="text-white/70 text-xs font-bold uppercase tracking-widest mt-1">
               {step === 1 ? `Step 1: Selection` : 'Step 2: Review & Finalize'}
             </p>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={handleExport} className="px-6 py-2 bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:bg-emerald-600 transition">📥 Excel</button>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${step === 1 ? 'bg-white' : 'bg-white/30'}`}></div>
              <div className={`w-3 h-3 rounded-full ${step === 2 ? 'bg-white' : 'bg-white/30'}`}></div>
            </div>
          </div>
        </div>

        <div className="p-10">
          {step === 1 ? (
            <div className="animate-in fade-in slide-in-from-left-4">
              <div className="mb-10 flex justify-between items-end">
                <div>
                  <h3 className="text-lg font-black text-slate-800 dark:text-white mb-2">Select Approved {type === 'Bank' ? 'Expense Voucher' : 'Requisition'}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium max-w-lg leading-relaxed">
                    Choose one approved item to generate the {type.toLowerCase()} voucher record.
                  </p>
                </div>
                <button 
                  onClick={() => setStep(2)}
                  disabled={selectedItems.length === 0}
                  className={`px-10 py-4 bg-${themeColor} text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl transform hover:scale-[1.05] transition disabled:opacity-50`}
                >
                  Continue with Selection
                </button>
              </div>

              <div className="overflow-x-auto rounded-3xl border border-slate-100 dark:border-slate-700">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50/50 dark:bg-slate-900/50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-200 dark:border-slate-700">
                      <th className="px-8 py-5 w-12 text-center">Select</th>
                      <th className="px-8 py-5">{idLabel}</th>
                      <th className="px-8 py-5">Payee / Entity</th>
                      <th className="px-8 py-5 text-right">Amount</th>
                      <th className="px-8 py-5">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                    {mockData.map((req) => (
                      <tr 
                        key={req.id} 
                        onClick={() => toggleSelect(req)}
                        className={`cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors ${selectedItems.find(i => i.id === req.id) ? 'bg-brand-50/40 dark:bg-brand-900/10' : ''}`}
                      >
                        <td className="px-8 py-5 text-center">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedItems.find(i => i.id === req.id) ? 'border-brand-600 bg-brand-600' : 'border-slate-300'}`}>
                            {selectedItems.find(i => i.id === req.id) && <div className="w-2 h-2 bg-white rounded-full"></div>}
                          </div>
                        </td>
                        <td className="px-8 py-5 text-sm font-mono font-bold text-brand-600">{req.id}</td>
                        <td className="px-8 py-5 text-base font-bold text-slate-700 dark:text-slate-200">{req.consultant}</td>
                        <td className="px-8 py-5 text-right text-base font-black text-slate-900 dark:text-white">${req.amount.toLocaleString()}</td>
                        <td className="px-8 py-5 text-sm font-medium text-slate-400">{req.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-right-4">
              <div className="flex justify-between items-center mb-10">
                 <button onClick={() => setStep(1)} className="text-[10px] font-black text-slate-400 hover:text-brand-600 uppercase tracking-widest transition flex items-center gap-2">← Back to Selection</button>
                 <h3 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tight">Review Voucher Details</h3>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-8 border border-slate-100 dark:border-slate-700">
                    {selectedItems.map((item) => (
                      <div key={item.id} className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 flex flex-wrap items-center gap-8 shadow-sm">
                        <div className="flex-1 min-w-[120px]">
                          <label className="block text-[9px] font-black text-slate-400 uppercase mb-1">Payee</label>
                          <div className="text-sm font-bold dark:text-white">{item.consultant} ({item.id})</div>
                        </div>
                        <div className="w-48">
                          <label className="block text-[9px] font-black text-brand-600 uppercase mb-1">Date</label>
                          <input type="date" value={item.date} onChange={(e) => handleUpdateDate(item.id, e.target.value)} className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-xs dark:text-white focus:ring-2 focus:ring-brand-500/20 outline-none" />
                        </div>
                        <div className="w-48">
                          <label className="block text-[9px] font-black text-brand-600 uppercase mb-1">Amount ($)</label>
                          <input type="number" value={item.amount} onChange={(e) => handleUpdateAmount(item.id, parseFloat(e.target.value))} className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-xs dark:text-white focus:ring-2 focus:ring-brand-500/20 outline-none" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={`bg-${themeColor} rounded-3xl p-8 text-white shadow-2xl h-fit`}>
                   <h4 className="text-[10px] font-black text-white/60 uppercase tracking-[0.2em] mb-4">Summary</h4>
                   <div className="flex justify-between items-end mb-8">
                      <span className="text-sm font-bold">Total Amount</span>
                      <span className="text-3xl font-black">${selectedItems.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}</span>
                   </div>
                   <button className="w-full py-5 bg-white text-brand-700 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg transform hover:scale-[1.03] transition">Finalize Voucher</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
