import { useState } from "react";
import { useUsers } from "../../hooks/useUsers";
import { User, UserFormRequest } from "../../types/user";
import DashboardLayout from "../../layouts/DashboardLayout";
import Button from "../../components/Button";
import UserFormModal from "./UserFormModal";

export default function UserManagement() {
  const {
    page,
    loading,
    error,
    currentPage,
    setCurrentPage,
    add,
    update,
    toggleBlock,
  } = useUsers();
  const [modal, setModal] = useState<{ user?: User } | null>(null);
  const [blockingId, setBlockingId] = useState<number | null>(null);

  const handleSave = async (body: UserFormRequest) => {
    if (modal?.user) await update(modal.user.userId, body);
    else await add(body);
  };

  const handleToggleBlock = async (u: User) => {
    setBlockingId(u.userId);
    await toggleBlock(u);
    setBlockingId(null);
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-slate-800">
            User Management
          </h2>
          <Button
            onClick={() => setModal({})}
            className="bg-slate-900 text-white text-sm px-4 py-2 rounded-xl hover:bg-slate-700 transition-colors"
          >
            + Add User
          </Button>
        </div>
        {loading && <p className="text-slate-400 text-sm">Loading...</p>}
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-slate-100">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
              <tr>
                {["Name", "Email", "Role", "Status", ""].map((h, i) => (
                  <th key={i} className="px-4 py-3 text-left">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {page?.content.map((u) => (
                <tr
                  key={u.userId}
                  className="border-t border-slate-100 hover:bg-slate-50"
                >
                  <td className="px-4 py-3 font-medium">{u.name}</td>
                  <td className="px-4 py-3 text-slate-500">{u.email}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${u.role === "ADMIN" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${u.deleted ? "bg-red-100 text-red-600" : "bg-green-100 text-green-700"}`}
                    >
                      {u.deleted ? "Blocked" : "Active"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-3">
                      <button
                        onClick={() => setModal({ user: u })}
                        className="text-xs text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleToggleBlock(u)}
                        disabled={u.role === "ADMIN" || blockingId === u.userId}
                        title={
                          u.role === "ADMIN"
                            ? "Cannot block an admin"
                            : undefined
                        }
                        className={`text-xs hover:underline disabled:opacity-30 disabled:cursor-not-allowed ${u.deleted ? "text-green-600" : "text-orange-400"}`}
                      >
                        {blockingId === u.userId
                          ? "..."
                          : u.deleted
                            ? "Unblock"
                            : "Block"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex gap-2 mt-4 items-center justify-center">
          <Button
            onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
            disabled={currentPage === 0}
            className="px-3 py-1 bg-slate-200 rounded-lg text-sm disabled:opacity-40 hover:bg-slate-300"
          >
            Prev
          </Button>
          <span className="text-sm text-slate-500">
            {currentPage + 1} / {page?.totalPages ?? 1}
          </span>
          <Button
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={currentPage + 1 >= (page?.totalPages ?? 1)}
            className="px-3 py-1 bg-slate-200 rounded-lg text-sm disabled:opacity-40 hover:bg-slate-300"
          >
            Next
          </Button>
        </div>
      </div>
      {modal !== null && (
        <UserFormModal
          user={modal.user}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}
    </DashboardLayout>
  );
}
