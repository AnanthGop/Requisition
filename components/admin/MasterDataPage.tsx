
import React, { useState, useMemo } from 'react';

interface DataItem {
  id: number;
  name: string;
  code?: string;
  status: string;
  creator: string;
  date: string;
  // Specific for User
  email?: string;
  type?: string;
  role?: string;
  fund?: string;
  grant?: string;
  func?: string;
  proj?: string;
}

interface MasterDataPageProps {
  entityName: string;
  onAddNew: () => void;
  data: DataItem[];
  themeColor?: string;
}

export const MasterDataPage: React.FC<MasterDataPageProps> = ({ entityName, onAddNew, data, themeColor = 'indigo-800' }) => {
  const isUserEntity = entityName === 'User';
  
  // Filter states
  const [filterName, setFilterName] = useState('');
  const [filterIdentifier, setFilterIdentifier] = useState(''); // Code or Email
  const [filterRole, setFilterRole] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesName = item.name.toLowerCase().includes(filterName.toLowerCase());
      const identifier = isUserEntity ? (item.email || '') : (item.code || '');
      const matchesIdentifier = identifier.toLowerCase().includes(filterIdentifier.toLowerCase());
      const matchesRole = filterRole === '' || (item.role || '').toLowerCase().includes(filterRole.toLowerCase());
      const matchesStatus = filterStatus === '' || item.status === filterStatus;
      
      return matchesName && matchesIdentifier && matchesRole && matchesStatus;
    });
  }, [data, filterName, filterIdentifier, filterRole, filterStatus, isUserEntity]);

  const handleExport = () => {
    alert(`Exporting ${entityName} data to Excel...`);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        {/* Ribbon Header */}
        <div className={`bg-${themeColor} px-8 py-5 flex items-center justify-between text-white`}>
          <h2 className="text-xl font-extrabold tracking-tight">{entityName} Master</h2>
          <button className="opacity-60 hover:opacity-100 transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
          </button>
        </div>

        <div className="p-8">
          <div className="flex flex-wrap gap-4 items-center mb-8">
             <div className="relative flex-1 min-w-[320px]">
               <input 
                  type="text" 
                  value={filterName}
                  onChange={(e) => setFilterName(e.target.value)}
                  placeholder={`Search ${entityName.toLowerCase()} by name...`} 
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 outline-none transition dark:text-white font-medium"
               />
               <svg className="w-5 h-5 absolute left-4 top-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
             </div>
             
             <div className="flex items-center gap-2">
               <button className="flex items-center gap-2 px-5 py-3 border border-slate-200 dark:border-slate-700 rounded-2xl bg-white dark:bg-slate-800 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition">
                  ⚙️ Columns
               </button>
               <button 
                  onClick={onAddNew}
                  className={`flex items-center gap-2 px-8 py-3 bg-${themeColor} text-white rounded-2xl text-sm font-extrabold shadow-lg hover:shadow-xl transition transform hover:scale-105`}
               >
                  <span className="text-lg">+</span> Add
               </button>
               <button 
                  onClick={handleExport}
                  className="flex items-center gap-2 px-5 py-3 bg-emerald-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition shadow-md"
               >
                  📥 Export to Excel
               </button>
             </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-slate-700">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-900/50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-200 dark:border-slate-700">
                  <th className="px-6 py-5 w-12"><input type="checkbox" className="rounded-md border-slate-300 text-indigo-600 focus:ring-indigo-500" /></th>
                  <th className="px-6 py-5">Actions</th>
                  <th className="px-6 py-5">{isUserEntity ? 'Full Name' : 'Name'}</th>
                  {isUserEntity && <th className="px-6 py-5">Work Email</th>}
                  {!isUserEntity && <th className="px-6 py-5">Code / ID</th>}
                  {isUserEntity && (
                    <>
                      <th className="px-6 py-5">Type</th>
                      <th className="px-6 py-5">Role</th>
                    </>
                  )}
                  <th className="px-6 py-5">Status</th>
                  {!isUserEntity && <th className="px-6 py-5">Address</th>}
                </tr>
                {/* Column Filters Row */}
                <tr className="bg-slate-50/20 dark:bg-slate-900/20 border-b border-slate-100 dark:border-slate-700">
                  <th className="px-6 py-2"></th>
                  <th className="px-6 py-2"></th>
                  <th className="px-6 py-2">
                    <input 
                      type="text" 
                      value={filterName}
                      onChange={(e) => setFilterName(e.target.value)}
                      placeholder="Filter Name" 
                      className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md px-2 py-1 text-[10px] outline-none" 
                    />
                  </th>
                  <th className="px-6 py-2">
                    <input 
                      type="text" 
                      value={filterIdentifier}
                      onChange={(e) => setFilterIdentifier(e.target.value)}
                      placeholder={isUserEntity ? "Filter Email" : "Filter Code"} 
                      className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md px-2 py-1 text-[10px] outline-none" 
                    />
                  </th>
                  {isUserEntity && (
                    <>
                      <th className="px-6 py-2"></th>
                      <th className="px-6 py-2">
                         <input 
                          type="text" 
                          value={filterRole}
                          onChange={(e) => setFilterRole(e.target.value)}
                          placeholder="Filter Role" 
                          className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md px-2 py-1 text-[10px] outline-none" 
                        />
                      </th>
                    </>
                  )}
                  <th className="px-6 py-2">
                    <select 
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md px-2 py-1 text-[10px]"
                    >
                      <option value="">All Status</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </th>
                  {!isUserEntity && <th className="px-6 py-2"></th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {filteredData.length > 0 ? filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group">
                    <td className="px-6 py-4"><input type="checkbox" className="rounded-md border-slate-300 text-indigo-600 focus:ring-indigo-500" /></td>
                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        <button className="text-indigo-400 hover:text-indigo-600 transition" title="Edit">✏️</button>
                        <button className="text-rose-400 hover:text-rose-600 transition" title="Delete">🗑️</button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-200">{item.name}</td>
                    
                    {isUserEntity ? (
                      <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{item.email}</td>
                    ) : (
                      <td className="px-6 py-4 text-sm text-slate-500 font-mono text-xs">{item.code}</td>
                    )}
                    
                    {isUserEntity && (
                      <>
                        <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{item.type}</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-0.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-md text-[10px] font-black uppercase tracking-wider">
                            {item.role}
                          </span>
                        </td>
                      </>
                    )}

                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${item.status === 'Active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-slate-100 text-slate-500'}`}>
                        {item.status}
                      </span>
                    </td>
                    {!isUserEntity && <td className="px-6 py-4 text-xs text-slate-500 dark:text-slate-400 truncate max-w-[200px]">123 Primary Avenue, Hub 4, Suite 101</td>}
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={10} className="px-6 py-10 text-center text-slate-400 text-sm font-medium">No records found matching filters.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-center justify-between mt-8 px-4 gap-4">
             <div className="flex items-center gap-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
               <span>Showing {filteredData.length} of {data.length} results</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
