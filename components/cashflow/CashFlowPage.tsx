
import React, { useState, useMemo } from 'react';
import { TransactionDetailsDrawer } from './TransactionDetailsDrawer';

interface Transaction {
  id: string;
  date: string;
  ref: string;
  description: string;
  amount: number;
}

interface Category {
  id: string;
  name: string;
  transactions: Transaction[];
}

interface CashFlowData {
  income: {
    categories: Category[];
  };
  expenses: {
    categories: Category[];
  };
}

export const CashFlowPage: React.FC<{ themeColor: string }> = ({ themeColor }) => {
  const [dateFrom, setDateFrom] = useState('2024-03-01');
  const [dateTo, setDateTo] = useState('2024-03-31');
  const [expanded, setExpanded] = useState<Set<string>>(new Set(['income', 'expenses']));
  const [selectedRef, setSelectedRef] = useState<string | null>(null);

  const data: CashFlowData = useMemo(() => ({
    income: {
      categories: [
        {
          id: 'inc_bank',
          name: 'Bank Credits',
          transactions: [
            { id: 't1', date: '2024-03-05', ref: 'CR-9921', description: 'UNESCO Grant Q1 Disbursement', amount: 45000 },
            { id: 't2', date: '2024-03-12', ref: 'DEP-881', description: 'Partner Contribution - Global Fund', amount: 12000 },
          ],
        },
        {
          id: 'inc_other',
          name: 'Other Income',
          transactions: [
            { id: 't3', date: '2024-03-20', ref: 'DIV-001', description: 'Interest Earned - Savings Account', amount: 450 },
          ],
        },
      ],
    },
    expenses: {
      categories: [
        {
          id: 'exp_rent',
          name: 'Rent & Facilities',
          transactions: [
            { id: 't4', date: '2024-03-01', ref: 'INV-L-01', description: 'Monthly Lease - Central Office', amount: 3500 },
          ],
        },
        {
          id: 'exp_it',
          name: 'IT Expenses',
          transactions: [
            { id: 't5', date: '2024-03-10', ref: 'AWS-MAR', description: 'Cloud Infrastructure Usage', amount: 1200 },
            { id: 't6', date: '2024-03-14', ref: 'MS-LIC', description: 'Office 365 Enterprise Subscription', amount: 850 },
          ],
        },
        {
          id: 'exp_utils',
          name: 'Utilities',
          transactions: [
            { id: 't7', date: '2024-03-15', ref: 'ELEC-99', description: 'Quarterly Power - Site A', amount: 450 },
          ],
        },
      ],
    },
  }), []);

  const toggle = (id: string) => {
    const next = new Set(expanded);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setExpanded(next);
  };

  const calculateCategoryTotal = (cat: Category) => cat.transactions.reduce((acc, t) => acc + t.amount, 0);
  const calculateSectionTotal = (cats: Category[]) => cats.reduce((acc, cat) => acc + calculateCategoryTotal(cat), 0);

  const totalIncome = calculateSectionTotal(data.income.categories);
  const totalExpenses = calculateSectionTotal(data.expenses.categories);
  const netCashFlow = totalIncome - totalExpenses;

  const handleExport = () => {
    alert("Exporting Hierarchical Cash Flow Report to Excel...");
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500 w-full max-w-7xl mx-auto relative">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-800 dark:text-white uppercase tracking-tight">Cash Flow Summary</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">Hierarchical analysis of inflows and outflows (Full Screen View)</p>
        </div>
        <div className="flex items-end gap-3 bg-white dark:bg-slate-800 p-4 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl">
           <div className="space-y-1">
             <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block ml-1">From Date</label>
             <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold dark:text-white outline-none" />
           </div>
           <div className="space-y-1">
             <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block ml-1">To Date</label>
             <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold dark:text-white outline-none" />
           </div>
           <div className="flex gap-2">
             <button className={`h-10 px-8 bg-brand-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:scale-105 transition transform`}>
               Calculate
             </button>
             <button 
                onClick={handleExport}
                className="h-10 px-8 bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg hover:scale-105 transition transform flex items-center gap-2"
             >
               📥 Export
             </button>
           </div>
        </div>
      </div>

      {/* Summary Table */}
      <div className="flex-1 overflow-hidden bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-2xl flex flex-col mb-4">
        <div className="overflow-y-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
                <th className="px-8 py-4">Account Hierarchy / Description</th>
                <th className="px-8 py-4 text-right w-48">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700 font-medium">
              
              {/* INCOME SECTION */}
              <tr 
                className="hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors"
                onClick={() => toggle('income')}
              >
                <td className="px-8 py-5 flex items-center gap-3">
                  <span className={`text-slate-400 transform transition-transform ${expanded.has('income') ? 'rotate-180' : 'rotate-90'}`}>▼</span>
                  <span className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">Income</span>
                </td>
                <td className="px-8 py-5 text-right text-sm font-black text-emerald-600">
                  ${totalIncome.toLocaleString()}
                </td>
              </tr>

              {expanded.has('income') && data.income.categories.map(cat => (
                <React.Fragment key={cat.id}>
                  <tr 
                    className="bg-slate-50/30 dark:bg-slate-900/10 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors"
                    onClick={() => toggle(cat.id)}
                  >
                    <td className="pl-16 pr-8 py-4 flex items-center gap-3">
                      <span className={`text-slate-400 text-[8px] transform transition-transform ${expanded.has(cat.id) ? 'rotate-180' : 'rotate-90'}`}>▼</span>
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{cat.name}</span>
                    </td>
                    <td className="px-8 py-4 text-right text-xs font-bold text-slate-500">
                      ${calculateCategoryTotal(cat).toLocaleString()}
                    </td>
                  </tr>

                  {expanded.has(cat.id) && (
                    <tr className="bg-white dark:bg-slate-900/30">
                      <td colSpan={2} className="p-0">
                        <table className="w-full text-[11px]">
                          <thead>
                            <tr className="text-slate-400 uppercase tracking-[0.15em] font-black bg-slate-50/50 dark:bg-slate-900/50">
                              <th className="pl-24 pr-4 py-2 w-32">Date</th>
                              <th className="px-4 py-2 w-32">Reference</th>
                              <th className="px-4 py-2">Description</th>
                              <th className="pl-4 pr-12 py-2 text-right w-48">Transaction Amount</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
                            {cat.transactions.map(t => (
                              <tr key={t.id} className="text-slate-500 dark:text-slate-400">
                                <td className="pl-24 pr-4 py-3 font-mono">{t.date}</td>
                                <td className="px-4 py-3 font-mono font-bold">
                                  <button 
                                    onClick={() => setSelectedRef(t.ref)}
                                    className="text-brand-600 hover:text-brand-800 underline decoration-brand-200 underline-offset-4 transition"
                                  >
                                    {t.ref}
                                  </button>
                                </td>
                                <td className="px-4 py-3">{t.description}</td>
                                <td className="pl-4 pr-12 py-3 text-right font-mono font-bold">${t.amount.toLocaleString()}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}

              {/* EXPENSES SECTION */}
              <tr 
                className="hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors"
                onClick={() => toggle('expenses')}
              >
                <td className="px-8 py-5 flex items-center gap-3">
                  <span className={`text-slate-400 transform transition-transform ${expanded.has('expenses') ? 'rotate-180' : 'rotate-90'}`}>▼</span>
                  <span className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">Expenses</span>
                </td>
                <td className="px-8 py-5 text-right text-sm font-black text-rose-600">
                  -${totalExpenses.toLocaleString()}
                </td>
              </tr>

              {expanded.has('expenses') && data.expenses.categories.map(cat => (
                <React.Fragment key={cat.id}>
                  <tr 
                    className="bg-slate-50/30 dark:bg-slate-900/10 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors"
                    onClick={() => toggle(cat.id)}
                  >
                    <td className="pl-16 pr-8 py-4 flex items-center gap-3">
                      <span className={`text-slate-400 text-[8px] transform transition-transform ${expanded.has(cat.id) ? 'rotate-180' : 'rotate-90'}`}>▼</span>
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{cat.name}</span>
                    </td>
                    <td className="px-8 py-4 text-right text-xs font-bold text-slate-500">
                      ${calculateCategoryTotal(cat).toLocaleString()}
                    </td>
                  </tr>

                  {expanded.has(cat.id) && (
                    <tr className="bg-white dark:bg-slate-900/30">
                      <td colSpan={2} className="p-0">
                        <table className="w-full text-[11px]">
                          <thead>
                            <tr className="text-slate-400 uppercase tracking-[0.15em] font-black bg-slate-50/50 dark:bg-slate-900/50">
                              <th className="pl-24 pr-4 py-2 w-32">Date</th>
                              <th className="px-4 py-2 w-32">Reference</th>
                              <th className="px-4 py-2">Description</th>
                              <th className="pl-4 pr-12 py-2 text-right w-48">Transaction Amount</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
                            {cat.transactions.map(t => (
                              <tr key={t.id} className="text-slate-500 dark:text-slate-400">
                                <td className="pl-24 pr-4 py-3 font-mono">{t.date}</td>
                                <td className="px-4 py-3 font-mono font-bold">
                                  <button 
                                    onClick={() => setSelectedRef(t.ref)}
                                    className="text-rose-500 hover:text-rose-700 underline decoration-rose-200 underline-offset-4 transition"
                                  >
                                    {t.ref}
                                  </button>
                                </td>
                                <td className="px-4 py-3">{t.description}</td>
                                <td className="pl-4 pr-12 py-3 text-right font-mono font-bold">${t.amount.toLocaleString()}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}

            </tbody>
          </table>
        </div>

        {/* Persistent Net Cash Flow Bar */}
        <div className="bg-slate-900 dark:bg-black p-8 flex justify-between items-center text-white sticky bottom-0 z-20">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-2xl">🏦</div>
             <div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Net Position</h3>
                <div className="text-xs font-bold text-white/80">Period Ending {dateTo}</div>
             </div>
          </div>
          <div className="text-right">
             <div className={`text-4xl font-black tracking-tighter ${netCashFlow >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                ${netCashFlow.toLocaleString()}
             </div>
             <div className="text-[9px] font-black uppercase tracking-widest text-white/30 mt-1">
               Total Available NGO Liquidity
             </div>
          </div>
        </div>
      </div>

      {/* Transaction Details Sidebar */}
      <TransactionDetailsDrawer 
        reference={selectedRef} 
        onClose={() => setSelectedRef(null)} 
      />
    </div>
  );
};
