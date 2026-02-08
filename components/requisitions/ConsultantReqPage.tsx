
import React, { useState, useMemo } from 'react';

interface ConsultantReqPageProps {
  themeColor?: string;
}

export const ConsultantReqPage: React.FC<ConsultantReqPageProps> = ({ themeColor = 'brand-600' }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<string[]>([]);
  const [dateFrom, setDateFrom] = useState('2024-01-01');
  const [dateTo, setDateTo] = useState('2024-12-31');

  // Specific Table Filters
  const [filterId, setFilterId] = useState('');
  const [filterConsultant, setFilterConsultant] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const mockHistory = useMemo(() => [
    { id: 'REQ-001', date: '2024-03-15', consultant: 'Dr. Sarah Miller', amount: 5000, status: 'Approved', hasFile: true },
    { id: 'REQ-005', date: '2024-03-18', consultant: 'Apex Consulting', amount: 2500, status: 'Pending', hasFile: false },
    { id: 'REQ-008', date: '2024-03-20', consultant: 'James Wilson', amount: 12400, status: 'Pending', hasFile: true },
    { id: 'REQ-012', date: '2024-04-02', consultant: 'Dr. Sarah Miller', amount: 3200, status: 'Approved', hasFile: true },
    { id: 'REQ-015', date: '2024-04-10', consultant: 'Global Tech Solutions', amount: 15000, status: 'Pending', hasFile: true },
  ], []);

  const filteredHistory = useMemo(() => {
    return mockHistory.filter(item => {
      const matchesId = item.id.toLowerCase().includes(filterId.toLowerCase());
      const matchesConsultant = item.consultant.toLowerCase().includes(filterConsultant.toLowerCase());
      const matchesStatus = filterStatus === '' || item.status === filterStatus;
      
      const itemDate = new Date(item.date);
      const fromDate = new Date(dateFrom);
      const toDate = new Date(dateTo);
      const matchesDateRange = itemDate >= fromDate && itemDate <= toDate;

      return matchesId && matchesConsultant && matchesStatus && matchesDateRange;
    });
  }, [filterId, filterConsultant, filterStatus, dateFrom, dateTo, mockHistory]);

  const handleExport = () => {
    alert("Exporting " + filteredHistory.length + " filtered records to Excel...");
  };

  if (isCreating) {
    return (
      <div className="animate-in fade-in slide-in-from-right-4 duration-500">
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className={`bg-${themeColor} px-10 py-8 text-white flex justify-between items-center`}>
            <div>
              <h1 className="text-2xl font-black tracking-tight uppercase">Create Requisition - Consultants</h1>
              <p className="text-white/70 text-xs font-medium mt-1">Submit a new request for consultant services.</p>
            </div>
            <button onClick={() => setIsCreating(false)} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition">Back to List</button>
          </div>
          <div className="p-10">
            <form className="max-w-2xl mx-auto space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-4">
                <div>
                  <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 px-1">Consultant</label>
                  <select className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500/20 outline-none transition dark:text-white font-bold text-xs">
                    <option value="">Select Consultant</option>
                    <option>Dr. Sarah Miller</option>
                    <option>James Wilson</option>
                    <option>Apex Consulting</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 px-1">Requisition Date</label>
                    <input type="date" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-xs" />
                  </div>
                  <div>
                    <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 px-1">Amount ($)</label>
                    <input type="number" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-xs" placeholder="0.00" />
                  </div>
                </div>
              </div>
              <div className="pt-6 border-t border-slate-100 flex justify-end gap-4">
                <button onClick={() => setIsCreating(false)} className="px-6 py-3 border border-slate-200 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest">Cancel</button>
                <button className={`px-10 py-3 bg-${themeColor} text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg`}>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className={`bg-${themeColor} px-8 py-5 text-white flex justify-between items-center`}>
          <div>
            <h1 className="text-xl font-black tracking-tight uppercase">Consultant Requisitions</h1>
            <p className="text-white/70 text-[10px] font-medium mt-1">Total Records: {filteredHistory.length}</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={handleExport} className="px-6 py-2.5 bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg transform hover:scale-105 transition">📥 Export to Excel</button>
            <button onClick={() => setIsCreating(true)} className="px-6 py-2.5 bg-white text-brand-700 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg transform hover:scale-105 transition">+ New Request</button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-end gap-4 mb-6 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
            <div className="flex-1">
              <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-1">Period From</label>
              <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold dark:text-white" />
            </div>
            <div className="flex-1">
              <label className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 ml-1">Period To</label>
              <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold dark:text-white" />
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-100 dark:border-slate-700">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/50 text-[9px] font-black text-slate-400 uppercase tracking-widest border-b dark:border-slate-700">
                  <th className="px-6 py-4">Req ID</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Consultant</th>
                  <th className="px-6 py-4 text-right">Amount</th>
                  <th className="px-6 py-4 text-center">Files</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
                <tr className="bg-slate-50/50 dark:bg-slate-900/30 border-b dark:border-slate-700">
                  <th className="px-6 py-2">
                    <input type="text" value={filterId} onChange={(e) => setFilterId(e.target.value)} placeholder="Filter ID" className="w-full px-2 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-[9px] outline-none dark:text-white" />
                  </th>
                  <th className="px-6 py-2"></th>
                  <th className="px-6 py-2">
                    <input type="text" value={filterConsultant} onChange={(e) => setFilterConsultant(e.target.value)} placeholder="Filter Consultant" className="w-full px-2 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-[9px] outline-none dark:text-white" />
                  </th>
                  <th className="px-6 py-2"></th>
                  <th className="px-6 py-2"></th>
                  <th className="px-6 py-2">
                    <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="w-full px-2 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-[9px] outline-none dark:text-white">
                      <option value="">All Status</option>
                      <option value="Approved">Approved</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {filteredHistory.length > 0 ? filteredHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="px-6 py-3 font-mono text-[10px] font-bold text-brand-600">{item.id}</td>
                    <td className="px-6 py-3 text-[10px] font-medium text-slate-500">{item.date}</td>
                    <td className="px-6 py-3 text-xs font-bold text-slate-700 dark:text-slate-200">{item.consultant}</td>
                    <td className="px-6 py-3 text-xs text-right font-black text-slate-900 dark:text-white">${item.amount.toLocaleString()}</td>
                    <td className="px-6 py-3 text-center">{item.hasFile && <span>📎</span>}</td>
                    <td className="px-6 py-3">
                      <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest ${item.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan={6} className="px-6 py-10 text-center text-slate-400 text-xs font-medium">No results found matching filters.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
