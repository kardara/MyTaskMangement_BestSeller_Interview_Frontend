import React, { useState } from "react";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { User, UserFormRequest } from "../../types/user";

interface Props {
  user?: User;
  onSave: (body: UserFormRequest) => Promise<void>;
  onClose: () => void;
}

export default function UserFormModal({ user, onSave, onClose }: Props) {
  const [form, setForm] = useState<UserFormRequest>({
    name: user?.name ?? "",
    email: user?.email ?? "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const field =
    (k: keyof UserFormRequest) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email)
      return setError("Name and email are required");
    if (!user && !form.password)
      return setError("Password is required for new users");
    setLoading(true);
    try {
      await onSave(form);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title={user ? "Edit User" : "Add User"} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Name
          </label>
          <Input
            value={form.name}
            onChange={field("name")}
            className="w-full border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Email
          </label>
          <Input
            type="email"
            value={form.email}
            onChange={field("email")}
            className="w-full border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Password{" "}
            {user && (
              <span className="font-normal text-slate-400">
                (leave blank to keep)
              </span>
            )}
          </label>
          <Input
            type="password"
            value={form.password}
            onChange={field("password")}
            className="w-full border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300"
          />
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-slate-900 text-white rounded-xl py-2 text-sm font-medium hover:bg-slate-700 disabled:opacity-50 transition-colors"
        >
          {loading ? "Saving..." : user ? "Update User" : "Add User"}
        </Button>
      </form>
    </Modal>
  );
}
