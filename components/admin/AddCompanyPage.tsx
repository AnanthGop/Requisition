
import React from 'react';

interface MasterItem {
  id: number;
  name: string;
  code: string;
}

interface AddCompanyPageProps {
  onCancel: () => void;
  masterLists: {
    funds: MasterItem[];
    grants: MasterItem[];
    functions: MasterItem[];
    projects: MasterItem[];
  };
}

export const AddCompanyPage: React.FC<AddCompanyPageProps> = ({ onCancel, masterLists }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Add Company</h1>
          <p className="text-slate-500">Register a new company entity linked to current organizational structures.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
        <div className="p-6">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
                  <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-indigo-500 outline-none" placeholder="Legal Entity Name" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Company Code</label>
                  <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-indigo-500 outline-none" placeholder="e.g. CORP-01" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Primary Fund</label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-indigo-500 outline-none bg-white">
                    <option value="">Select Fund</option>
                    {masterLists.funds.map(f => (
                      <option key={f.id} value={f.code}>{f.name} ({f.code})</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Default Grant</label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-indigo-500 outline-none bg-white">
                    <option value="">Select Grant</option>
                    {masterLists.grants.map(g => (
                      <option key={g.id} value={g.code}>{g.name} ({g.code})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Default Function</label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-indigo-500 outline-none bg-white">
                    <option value="">Select Function</option>
                    {masterLists.functions.map(f => (
                      <option key={f.id} value={f.code}>{f.name} ({f.code})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Primary Project</label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-indigo-500 outline-none bg-white">
                    <option value="">Select Project</option>
                    {masterLists.projects.map(p => (
                      <option key={p.id} value={p.code}>{p.name} ({p.code})</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
              <button onClick={onCancel} type="button" className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-md transition border border-slate-200">Cancel</button>
              <button type="button" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition shadow-sm">Save Company</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
