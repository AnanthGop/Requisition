import React from "react";

interface MasterItem {
  id: number;
  name: string;
  code: string;
}

interface AddUserPageProps {
  onCancel: () => void;
  masterLists: {
    funds: MasterItem[];
    grants: MasterItem[];
    functions: MasterItem[];
    projects: MasterItem[];
  };
}

export const AddUserPage: React.FC<AddUserPageProps> = ({
  onCancel,
  masterLists,
}) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Add User
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Create a new system user and assign permissions based on current
            master data.
          </p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg shadow-sm">
        <div className="p-6">
          <form
            className="space-y-6"
            onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    User Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-indigo-500 outline-none"
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-indigo-500 outline-none"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    User Type
                  </label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-indigo-500 outline-none bg-white">
                    <option value="">Select User Type</option>
                    <option>Employee</option>
                    <option>Consultant</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Role
                  </label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-indigo-500 outline-none bg-white">
                    <option value="">Select Role</option>
                    <option>User</option>
                    <option>Admin</option>
                    <option>Approver</option>
                    <option>Finance</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Fund
                  </label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-indigo-500 outline-none bg-white">
                    <option value="">Select Fund</option>
                    {masterLists.funds.map((f) => (
                      <option
                        key={f.id}
                        value={f.code}>
                        {f.name} ({f.code})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Grant
                  </label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-indigo-500 outline-none bg-white">
                    <option value="">Select Grant</option>
                    {masterLists.grants.map((g) => (
                      <option
                        key={g.id}
                        value={g.code}>
                        {g.name} ({g.code})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Function
                  </label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-indigo-500 outline-none bg-white">
                    <option value="">Select Function</option>
                    {masterLists.functions.map((f) => (
                      <option
                        key={f.id}
                        value={f.code}>
                        {f.name} ({f.code})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Project
                  </label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-indigo-500 outline-none bg-white">
                    <option value="">Select Project</option>
                    {masterLists.projects.map((p) => (
                      <option
                        key={p.id}
                        value={p.code}>
                        {p.name} ({p.code})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
              <button
                onClick={onCancel}
                type="button"
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-md transition border border-slate-200">
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition shadow-sm">
                Save User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
