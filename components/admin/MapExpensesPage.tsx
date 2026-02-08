
import React from 'react';

export const MapExpensesPage: React.FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Map Expenses to COA</h1>
          <p className="text-slate-500">Associate expense types with their respective Chart of Account entries.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg shadow-sm mb-8">
        <div className="p-4 bg-slate-50 border-b border-slate-200 font-semibold text-slate-700 text-sm">
          New Mapping
        </div>
        <div className="p-6">
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[240px]">
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Expense Type</label>
              <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-indigo-500 outline-none" placeholder="e.g. Travel, Office Supplies" />
            </div>
            <div className="flex-1 min-w-[240px]">
              <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Chart of Accounts (COA)</label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-indigo-500 outline-none bg-white">
                <option>Select COA Account</option>
                <option>5001 - Personnel Services</option>
                <option>5002 - Maintenance and Ops</option>
              </select>
            </div>
            <button className="px-6 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition shadow-sm whitespace-nowrap">
              Add Mapping
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Expense Type</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Mapped COA Account</th>
              <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[1, 2, 3].map((i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-slate-900">Expense Category {i}</td>
                <td className="px-6 py-4 text-sm text-slate-500">COA-ACC-00{i} - Description Here</td>
                <td className="px-6 py-4 text-sm text-right">
                   <div className="flex justify-end gap-2">
                    <button className="p-1 hover:text-indigo-600 text-slate-400 transition"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg></button>
                    <button className="p-1 hover:text-red-600 text-slate-400 transition"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
