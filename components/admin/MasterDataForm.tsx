
import React from 'react';

interface MasterDataFormProps {
  entityName: string;
  onCancel: () => void;
}

export const MasterDataForm: React.FC<MasterDataFormProps> = ({ entityName, onCancel }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Create {entityName}</h1>
          <p className="text-slate-500">Define a new {entityName.toLowerCase()} entry in the master records.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
        <div className="p-6">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">{entityName} Name</label>
                  <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-indigo-500 outline-none" placeholder={`Enter ${entityName.toLowerCase()} name`} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">{entityName} Code</label>
                  <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-indigo-500 outline-none" placeholder="e.g. CD-001" />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-indigo-500 outline-none bg-white">
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Description (Optional)</label>
                  <textarea className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-indigo-500 outline-none h-10" placeholder="Brief details..."></textarea>
                </div>
              </div>
            </div>
            <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
              <button onClick={onCancel} type="button" className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-md transition border border-slate-200">Cancel</button>
              <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition shadow-sm">Save {entityName}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
