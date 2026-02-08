
import React, { useState, useEffect, useMemo } from 'react';
import { AddUserPage } from './admin/AddUserPage';
import { AddCompanyPage } from './admin/AddCompanyPage';
import { MasterDataPage } from './admin/MasterDataPage';
import { MapExpensesPage } from './admin/MapExpensesPage';
import { MasterDataForm } from './admin/MasterDataForm';

// Requisitions Module Components
import { ConsultantReqPage } from './requisitions/ConsultantReqPage';
import { ITSpendReqPage } from './requisitions/ITSpendReqPage';
import { ApproveReqPage } from './requisitions/ApproveReqPage';
import { ApprovalChainPage } from './requisitions/ApprovalChainPage';
import { ProfilePage } from './ProfilePage';

// Voucher Module Components
import { CreateVoucher } from './vouchers/CreateVoucher';
import { ApproveVoucher } from './vouchers/ApproveVoucher';
import { VoucherStatus } from './vouchers/VoucherStatus';

// Reconciliation & Cash Flow Components
import { UploadEntries } from './reconciliation/UploadEntries';
import { MapEntries } from './reconciliation/MapEntries';
import { CashFlowPage } from './cashflow/CashFlowPage';

interface AppShellProps {
  user: string | null;
  onLogout: () => void;
}

const INITIAL_MASTER_DATA = {
  Fund: [
    { id: 1, name: 'General Fund', code: 'GF-01', status: 'Active', creator: 'Admin', date: '2023-10-01' },
    { id: 2, name: 'Infrastructure Fund', code: 'IF-22', status: 'Active', creator: 'Admin', date: '2023-11-05' }
  ],
  Grant: [
    { id: 1, name: 'UNESCO Grant', code: 'UN-2024', status: 'Active', creator: 'Admin', date: '2023-10-15' },
    { id: 2, name: 'Tech Innovation', code: 'TECH-X', status: 'Active', creator: 'Admin', date: '2023-12-01' }
  ],
  Function: [
    { id: 1, name: 'Administration', code: 'ADM-01', status: 'Active', creator: 'Admin', date: '2023-09-20' },
    { id: 2, name: 'Field Operations', code: 'OPS-99', status: 'Active', creator: 'Admin', date: '2023-10-10' }
  ],
  Project: [
    { id: 1, name: 'Solar Grid 1', code: 'SOL-1', status: 'Active', creator: 'Admin', date: '2023-11-12' },
    { id: 2, name: 'Digital Literacy', code: 'DIG-LIT', status: 'Active', creator: 'Active', date: '2023-12-15' }
  ],
  User: [
    { 
      id: 1, 
      name: 'John Finance', 
      email: 'john.f@ngo-portal.org', 
      type: 'Employee', 
      role: 'Finance', 
      fund: 'GF-01', 
      grant: 'UN-2024', 
      func: 'ADM-01', 
      proj: 'SOL-1', 
      status: 'Active', 
      creator: 'Admin', 
      date: '2023-10-01' 
    },
    { 
      id: 2, 
      name: 'Sarah Admin', 
      email: 'sarah.a@ngo-portal.org', 
      type: 'Employee', 
      role: 'Admin', 
      fund: 'IF-22', 
      grant: 'TECH-X', 
      func: 'OPS-99', 
      proj: 'DIG-LIT', 
      status: 'Active', 
      creator: 'Admin', 
      date: '2023-11-15' 
    }
  ],
  Company: [
    { id: 1, name: 'Acme Corp', code: 'ACM-001', status: 'Active', creator: 'Admin', date: '2023-01-01' }
  ],
  'Chart of Accounts': [
    { id: 1, name: 'Salary Account', code: '5001', status: 'Active', creator: 'Admin', date: '2023-01-01' },
    { id: 2, name: 'Travel Expenses', code: '5002', status: 'Active', creator: 'Admin', date: '2023-01-01' }
  ]
};

const MENU_THEMES: Record<string, { gradient: string, accent: string }> = {
  'Requisitions': { gradient: 'from-brand-600 to-indigo-500', accent: 'brand-600' },
  'Expense Voucher': { gradient: 'from-brand-600 to-indigo-500', accent: 'brand-600' },
  'Bank Voucher': { gradient: 'from-brand-600 to-indigo-500', accent: 'brand-600' },
  'Bank Reconciliation': { gradient: 'from-brand-600 to-indigo-500', accent: 'brand-600' },
  'Cash Flow': { gradient: 'from-brand-600 to-indigo-500', accent: 'brand-600' },
  'Admin': { gradient: 'from-slate-800 to-slate-600', accent: 'slate-800' },
  'Profile': { gradient: 'from-indigo-600 to-brand-500', accent: 'indigo-600' }
};

export const AppShell: React.FC<AppShellProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('Requisitions');
  const [activeAdminSubTab, setActiveAdminSubTab] = useState('Add User');
  const [activeReqSubTab, setActiveReqSubTab] = useState('Consultants');
  const [activeExpenseSubTab, setActiveExpenseSubTab] = useState('Create Expense Voucher');
  const [activeBankSubTab, setActiveBankSubTab] = useState('Create Bank Voucher');
  const [activeReconSubTab, setActiveReconSubTab] = useState('Upload Bank Entries');
  const [isAdminCreating, setIsAdminCreating] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [masterData, setMasterData] = useState(INITIAL_MASTER_DATA);

  const currentTheme = useMemo(() => MENU_THEMES[activeTab] || MENU_THEMES['Admin'], [activeTab]);

  useEffect(() => {
    setIsAdminCreating(false);
  }, [activeAdminSubTab, activeTab]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const menuItems = [
    'Requisitions',
    'Expense Voucher',
    'Bank Voucher',
    'Bank Reconciliation',
    'Cash Flow',
    'Admin',
    'Profile'
  ];

  const renderAdminContent = () => {
    const handleAdd = () => setIsAdminCreating(true);
    const handleCancel = () => setIsAdminCreating(false);
    const entityKeyMap: Record<string, keyof typeof INITIAL_MASTER_DATA> = {
      'Add User': 'User',
      'Add Company': 'Company',
      'Add Fund': 'Fund',
      'Add Grant': 'Grant',
      'Add Function': 'Function',
      'Add Project': 'Project',
      'Add Chart of Accounts': 'Chart of Accounts'
    };
    const entityKey = entityKeyMap[activeAdminSubTab];
    const themeColor = currentTheme.accent;

    if (activeAdminSubTab === 'Map Expenses to COA') return <MapExpensesPage themeColor={themeColor} />;

    if (!isAdminCreating) {
      return (
        <MasterDataPage 
          entityName={entityKey} 
          onAddNew={handleAdd} 
          data={masterData[entityKey] || []} 
          themeColor={themeColor}
        />
      );
    }

    switch (activeAdminSubTab) {
      case 'Add User':
        return (
          <AddUserPage 
            onCancel={handleCancel} 
            masterLists={{
              funds: masterData.Fund,
              grants: masterData.Grant,
              functions: masterData.Function,
              projects: masterData.Project
            }} 
            themeColor={themeColor}
          />
        );
      case 'Add Company':
        return (
          <AddCompanyPage 
            onCancel={handleCancel} 
            masterLists={{
              funds: masterData.Fund,
              grants: masterData.Grant,
              functions: masterData.Function,
              projects: masterData.Project
            }} 
            themeColor={themeColor}
          />
        );
      default:
        return <MasterDataForm entityName={entityKey} onCancel={handleCancel} themeColor={themeColor} />;
    }
  };

  const renderRequisitionContent = () => {
    const themeColor = currentTheme.accent;
    switch (activeReqSubTab) {
      case 'Consultants': return <ConsultantReqPage themeColor={themeColor} />;
      case 'IT Spend': return <ITSpendReqPage themeColor={themeColor} />;
      case 'Approve Requisition': return <ApproveReqPage themeColor={themeColor} />;
      case 'Approval Chain': return <ApprovalChainPage themeColor={themeColor} />;
      default: return <ConsultantReqPage themeColor={themeColor} />;
    }
  };

  const renderExpenseVoucherContent = () => {
    const themeColor = currentTheme.accent;
    switch (activeExpenseSubTab) {
      case 'Create Expense Voucher': return <CreateVoucher type="Expense" themeColor={themeColor} />;
      case 'Approve Expense': return <ApproveVoucher type="Expense" themeColor={themeColor} />;
      case 'Approval Status': return <VoucherStatus type="Expense" themeColor={themeColor} />;
      default: return <CreateVoucher type="Expense" themeColor={themeColor} />;
    }
  };

  const renderBankVoucherContent = () => {
    const themeColor = currentTheme.accent;
    switch (activeBankSubTab) {
      case 'Create Bank Voucher': return <CreateVoucher type="Bank" themeColor={themeColor} />;
      case 'Approve Bank Voucher': return <ApproveVoucher type="Bank" themeColor={themeColor} />;
      case 'Approval Status': return <VoucherStatus type="Bank" themeColor={themeColor} />;
      default: return <CreateVoucher type="Bank" themeColor={themeColor} />;
    }
  };

  const renderReconciliationContent = () => {
    const themeColor = currentTheme.accent;
    switch (activeReconSubTab) {
      case 'Upload Bank Entries': return <UploadEntries themeColor={themeColor} />;
      case 'Map Entries': return <MapEntries themeColor={themeColor} />;
      default: return <UploadEntries themeColor={themeColor} />;
    }
  };

  const renderMainContent = () => {
    if (activeTab === 'Admin') return renderAdminContent();
    if (activeTab === 'Requisitions') return renderRequisitionContent();
    if (activeTab === 'Expense Voucher') return renderExpenseVoucherContent();
    if (activeTab === 'Bank Voucher') return renderBankVoucherContent();
    if (activeTab === 'Bank Reconciliation') return renderReconciliationContent();
    if (activeTab === 'Cash Flow') return <CashFlowPage themeColor={currentTheme.accent} />;
    if (activeTab === 'Profile') return <ProfilePage user={user} themeColor={currentTheme.accent} />;

    return (
      <div className="animate-in fade-in duration-500">
        <h1 className="text-3xl font-black text-slate-800 dark:text-white mb-2 uppercase tracking-tight leading-tight">Welcome Back, {user || 'Admin'}</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium">Select a module from the menu to get started.</p>
        <div className="bg-white dark:bg-slate-800 p-20 border-4 border-dashed border-slate-200 dark:border-slate-700 rounded-3xl text-center text-slate-300">
          <div className="text-6xl mb-4">🏗️</div>
          <h3 className="text-xl font-bold uppercase tracking-widest leading-normal whitespace-normal">Module Under Construction</h3>
          <p className="text-base font-medium mt-2 whitespace-normal">The {activeTab} workspace is being finalized by our engineering team.</p>
        </div>
      </div>
    );
  };

  const showSidebar = activeTab !== 'Cash Flow';

  return (
    <div className="flex h-screen flex-col overflow-hidden max-w-[1440px] mx-auto bg-slate-50 dark:bg-slate-900 shadow-2xl transition-all duration-500">
      <header className={`h-20 shrink-0 z-50 flex items-center justify-between px-8 bg-gradient-to-r ${currentTheme.gradient} transition-all duration-700 shadow-lg`}>
        <div className="flex items-center gap-4 shrink-0">
           <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-brand-700 font-black text-xl shadow-lg transform hover:scale-105 transition-transform">N</div>
           <span className="text-lg font-black text-white tracking-tight hidden xl:block uppercase whitespace-normal break-words max-w-[100px] leading-tight">NGO Portal</span>
        </div>
        
        <nav className="flex items-center gap-1 bg-white/10 p-1.5 rounded-2xl backdrop-blur-md overflow-x-auto mx-4 scrollbar-hide">
          {menuItems.map((item) => (
            <button
              key={item}
              onClick={() => setActiveTab(item)}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-normal break-words text-center min-w-[100px] max-w-[140px] leading-tight ${
                activeTab === item 
                  ? 'bg-white text-brand-700 shadow-xl scale-105' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-3 mr-4 group cursor-pointer" onClick={() => setActiveTab('Profile')}>
            <div className="flex flex-col text-right">
               <span className="text-sm font-black text-white leading-none whitespace-normal break-words max-w-[80px]">{user || 'Admin'}</span>
               <span className="text-[9px] text-white/60 font-bold uppercase tracking-widest mt-1">Super User</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-white/20 border-2 border-white/20 flex items-center justify-center text-white font-black text-sm overflow-hidden group-hover:border-white transition-all">
              {user?.[0]?.toUpperCase() || 'A'}
            </div>
          </div>
          
          <div className="flex items-center gap-1 bg-black/10 p-1 rounded-xl">
             <button 
                onClick={() => setIsDarkMode(!isDarkMode)} 
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-white transition-all"
                title="Toggle Theme"
             >
               {isDarkMode ? '☀️' : '🌙'}
             </button>
             <div className="w-px h-6 bg-white/20 mx-1"></div>
             <button
               onClick={onLogout}
               className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-rose-500 text-white transition-all"
               title="Logout"
             >
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
             </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {showSidebar && (
          <aside className={`${isSidebarCollapsed ? 'w-20' : 'w-72'} bg-brand-50 dark:bg-slate-950 flex flex-col shrink-0 shadow-2xl transition-all duration-300 border-r border-brand-100 dark:border-slate-900 overflow-hidden`}>
            <div className={`p-6 flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'} border-b border-brand-100 dark:border-indigo-900/30`}>
              <button 
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="w-10 h-10 bg-brand-500/10 dark:bg-indigo-500/20 rounded-xl flex items-center justify-center text-brand-600 dark:text-indigo-400 hover:bg-brand-500/20 transition-colors shrink-0"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
              </button>
              {!isSidebarCollapsed && (
                <span className="text-sm font-black text-brand-900 dark:text-white uppercase tracking-[0.1em] whitespace-normal break-words leading-tight animate-in fade-in duration-300">
                  {activeTab}
                </span>
              )}
            </div>

            <div className="flex-1 overflow-y-auto py-6 px-3">
              {activeTab === 'Requisitions' ? (
                <div className="animate-in slide-in-from-left duration-500">
                  {!isSidebarCollapsed && <div className="px-4 mb-3 text-[10px] font-black text-brand-400 dark:text-indigo-500 uppercase tracking-widest">Create Entry</div>}
                  <nav className="space-y-1 mb-6">
                    <button onClick={() => setActiveReqSubTab('Consultants')} className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3 px-4'} py-3 rounded-xl text-sm font-bold transition-all whitespace-normal break-words text-left ${activeReqSubTab === 'Consultants' ? 'bg-white text-brand-900 shadow-lg border border-brand-100' : 'text-brand-700/70 dark:text-indigo-400 hover:text-brand-900 hover:bg-white/60 dark:hover:text-white dark:hover:bg-indigo-900'}`}>
                      <span className="text-xl shrink-0">👨‍💼</span> 
                      {!isSidebarCollapsed && <span className="leading-tight">Consultants</span>}
                    </button>
                    <button onClick={() => setActiveReqSubTab('IT Spend')} className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3 px-4'} py-3 rounded-xl text-sm font-bold transition-all whitespace-normal break-words text-left ${activeReqSubTab === 'IT Spend' ? 'bg-white text-brand-900 shadow-lg border border-brand-100' : 'text-brand-700/70 dark:text-indigo-400 hover:text-brand-900 hover:bg-white/60 dark:hover:text-white dark:hover:bg-indigo-900'}`}>
                      <span className="text-xl shrink-0">💻</span> 
                      {!isSidebarCollapsed && <span className="leading-tight">IT Spend</span>}
                    </button>
                  </nav>

                  {!isSidebarCollapsed && <div className="px-4 mb-3 text-[10px] font-black text-brand-400 dark:text-indigo-500 uppercase tracking-widest">Operations</div>}
                  <nav className="space-y-1">
                    <button onClick={() => setActiveReqSubTab('Approve Requisition')} className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3 px-4'} py-3 rounded-xl text-sm font-bold transition-all whitespace-normal break-words text-left ${activeReqSubTab === 'Approve Requisition' ? 'bg-white text-brand-900 shadow-lg border border-brand-100' : 'text-brand-700/70 dark:text-indigo-400 hover:text-brand-900 hover:bg-white/60 dark:hover:text-white dark:hover:bg-indigo-900'}`}>
                      <span className="text-xl shrink-0">✅</span> 
                      {!isSidebarCollapsed && <span className="leading-tight">Approvals</span>}
                    </button>
                    <button onClick={() => setActiveReqSubTab('Approval Chain')} className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3 px-4'} py-3 rounded-xl text-sm font-bold transition-all whitespace-normal break-words text-left ${activeReqSubTab === 'Approval Chain' ? 'bg-white text-brand-900 shadow-lg border border-brand-100' : 'text-brand-700/70 dark:text-indigo-400 hover:text-brand-900 hover:bg-white/60 dark:hover:text-white dark:hover:bg-indigo-900'}`}>
                      <span className="text-xl shrink-0">⛓️</span> 
                      {!isSidebarCollapsed && <span className="leading-tight">Tracker</span>}
                    </button>
                  </nav>
                </div>
              ) : (activeTab === 'Expense Voucher' || activeTab === 'Bank Voucher') ? (
                 <div className="animate-in slide-in-from-left duration-500">
                  {!isSidebarCollapsed && <div className="px-4 mb-3 text-[10px] font-black text-brand-400 dark:text-indigo-500 uppercase tracking-widest">Processing</div>}
                  <nav className="space-y-1 mb-6">
                    <button onClick={() => activeTab === 'Expense Voucher' ? setActiveExpenseSubTab('Create Expense Voucher') : setActiveBankSubTab(`Create Bank Voucher`)} className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3 px-4'} py-3 rounded-xl text-sm font-bold transition-all whitespace-normal break-words text-left ${(activeTab === 'Expense Voucher' ? activeExpenseSubTab : activeBankSubTab).includes('Create') ? 'bg-white text-brand-900 shadow-lg border border-brand-100' : 'text-brand-700/70 dark:text-indigo-400 hover:text-brand-900 hover:bg-white/60 dark:hover:text-white dark:hover:bg-indigo-900'}`}>
                      <span className="text-xl shrink-0">🧾</span> 
                      {!isSidebarCollapsed && <span className="leading-tight text-xs">Create Voucher</span>}
                    </button>
                    <button onClick={() => activeTab === 'Expense Voucher' ? setActiveExpenseSubTab('Approve Expense') : setActiveBankSubTab('Approve Bank Voucher')} className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3 px-4'} py-3 rounded-xl text-sm font-bold transition-all whitespace-normal break-words text-left ${(activeTab === 'Expense Voucher' ? activeExpenseSubTab : activeBankSubTab).includes('Approve') ? 'bg-white text-brand-900 shadow-lg border border-brand-100' : 'text-brand-700/70 dark:text-indigo-400 hover:text-brand-900 hover:bg-white/60 dark:hover:text-white dark:hover:bg-indigo-900'}`}>
                      <span className="text-xl shrink-0">✅</span> 
                      {!isSidebarCollapsed && <span className="leading-tight text-xs">Approve Items</span>}
                    </button>
                    <button onClick={() => activeTab === 'Expense Voucher' ? setActiveExpenseSubTab('Approval Status') : setActiveBankSubTab('Approval Status')} className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3 px-4'} py-3 rounded-xl text-sm font-bold transition-all whitespace-normal break-words text-left ${(activeTab === 'Expense Voucher' ? activeExpenseSubTab : activeBankSubTab).includes('Status') ? 'bg-white text-brand-900 shadow-lg border border-brand-100' : 'text-brand-700/70 dark:text-indigo-400 hover:text-brand-900 hover:bg-white/60 dark:hover:text-white dark:hover:bg-indigo-900'}`}>
                      <span className="text-xl shrink-0">📊</span> 
                      {!isSidebarCollapsed && <span className="leading-tight text-xs">Status Tracker</span>}
                    </button>
                  </nav>
                </div>
              ) : activeTab === 'Bank Reconciliation' ? (
                <div className="animate-in slide-in-from-left duration-500">
                  {!isSidebarCollapsed && <div className="px-4 mb-3 text-[10px] font-black text-brand-400 dark:text-indigo-500 uppercase tracking-widest">Banking</div>}
                  <nav className="space-y-1">
                    <button onClick={() => setActiveReconSubTab('Upload Bank Entries')} className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3 px-4'} py-3 rounded-xl text-sm font-bold transition-all whitespace-normal break-words text-left ${activeReconSubTab === 'Upload Bank Entries' ? 'bg-white text-brand-900 shadow-lg border border-brand-100' : 'text-brand-700/70 dark:text-indigo-400 hover:text-brand-900 hover:bg-white/60 dark:hover:text-white dark:hover:bg-indigo-900'}`}>
                      <span className="text-xl shrink-0">📤</span> 
                      {!isSidebarCollapsed && <span className="leading-tight text-xs">Upload Bank Entries</span>}
                    </button>
                    <button onClick={() => setActiveReconSubTab('Map Entries')} className={`w-full flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3 px-4'} py-3 rounded-xl text-sm font-bold transition-all whitespace-normal break-words text-left ${activeReconSubTab === 'Map Entries' ? 'bg-white text-brand-900 shadow-lg border border-brand-100' : 'text-brand-700/70 dark:text-indigo-400 hover:text-brand-900 hover:bg-white/60 dark:hover:text-white dark:hover:bg-indigo-900'}`}>
                      <span className="text-xl shrink-0">🧩</span> 
                      {!isSidebarCollapsed && <span className="leading-tight text-xs">Map Entries</span>}
                    </button>
                  </nav>
                </div>
              ) : activeTab === 'Admin' ? (
                <div className="animate-in slide-in-from-left duration-500">
                  {!isSidebarCollapsed && <div className="px-4 mb-3 text-[10px] font-black text-brand-400 dark:text-indigo-500 uppercase tracking-widest whitespace-normal break-words">Configuration</div>}
                  <nav className="space-y-1">
                    {[
                      'Add User', 'Add Company', 'Add Fund', 'Add Grant', 
                      'Add Function', 'Add Project', 'Add Chart of Accounts', 
                      'Map Expenses to COA'
                    ].map((item) => (
                      <button
                        key={item}
                        onClick={() => setActiveAdminSubTab(item)}
                        className={`w-full text-left rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-normal break-words ${isSidebarCollapsed ? 'flex justify-center py-4' : 'px-4 py-2.5'} ${
                          activeAdminSubTab === item 
                            ? 'bg-white text-brand-900 shadow-lg border border-brand-100 scale-[1.02]' 
                            : 'text-brand-700/70 dark:text-indigo-300 hover:text-brand-900 hover:bg-white/60 dark:hover:text-white dark:hover:bg-indigo-900'
                        }`}
                      >
                        {isSidebarCollapsed ? item.charAt(0) : item}
                      </button>
                    ))}
                  </nav>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-48 text-center p-4 border-2 border-dashed border-brand-200 dark:border-indigo-900/30 rounded-2xl animate-pulse">
                  <div className="text-3xl mb-2 opacity-30 grayscale">📂</div>
                  {!isSidebarCollapsed && (
                    <>
                      <p className="text-xs font-black text-brand-500 dark:text-indigo-500 uppercase tracking-[0.2em] whitespace-normal break-words leading-tight">{activeTab}</p>
                      <p className="text-[10px] text-brand-400/60 dark:text-indigo-400/40 font-bold mt-1 px-4 leading-tight whitespace-normal break-words">Tools loading...</p>
                    </>
                  )}
                </div>
              )}
            </div>

            {!isSidebarCollapsed && (
              <div className="p-6 border-t border-brand-100 dark:border-indigo-900/30 bg-brand-100/30 dark:bg-black/10">
                 <div className="flex items-center gap-2 whitespace-normal break-words">
                   <div className="w-8 h-8 shrink-0 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-500 text-xs animate-pulse">●</div>
                   <span className="text-[10px] font-black text-brand-700 dark:text-indigo-300 uppercase tracking-[0.1em] leading-none">Status: Active</span>
                 </div>
              </div>
            )}
          </aside>
        )}

        <main className={`flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900 p-8 transition-colors duration-500`}>
          <div className="max-w-6xl mx-auto min-h-full">
            {renderMainContent()}
          </div>
        </main>
      </div>
    </div>
  );
};
