import React, { useState } from "react";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { Task, TaskStatus, TaskColor, TaskPayload } from "../../types/task";

const STATUSES: TaskStatus[] = ["BACKLOG", "TODO", "DOING", "DONE"];
const COLORS: TaskColor[] = [
  "red",
  "blue",
  "green",
  "yellow",
  "purple",
  "orange",
];
const COLOR_HEX: Record<TaskColor, string> = {
  red: "#f87171",
  blue: "#60a5fa",
  green: "#4ade80",
  yellow: "#facc15",
  purple: "#c084fc",
  orange: "#fb923c",
};

interface Props {
  task?: Task;
  defaultStatus?: TaskStatus;
  defaultColor?: TaskColor;
  onSave: (payload: TaskPayload, color: TaskColor) => Promise<void>;
  onClose: () => void;
}

export default function TaskFormModal({
  task,
  defaultStatus = "BACKLOG",
  defaultColor,
  onSave,
  onClose,
}: Props) {
  const [title, setTitle] = useState(task?.title ?? "");
  const [description, setDescription] = useState(task?.description ?? "");
  const [status, setStatus] = useState<TaskStatus>(
    task?.status ?? defaultStatus,
  );
  const [color, setColor] = useState<TaskColor>(defaultColor ?? "blue");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return setError("Title is required");
    setLoading(true);
    try {
      await onSave(
        { title: title.trim(), description: description.trim(), status },
        color,
      );
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title={task ? "Edit Task" : "New Task"} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Title
          </label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            className="w-full border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="Optional description"
            className="w-full border border-slate-200 rounded-xl px-4 py-2 text-sm resize-none outline-none focus:ring-2 focus:ring-slate-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as TaskStatus)}
            className="w-full border border-slate-200 rounded-xl px-4 py-2 text-sm"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Card color
          </label>
          <div className="flex gap-2">
            {COLORS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                style={{ backgroundColor: COLOR_HEX[c] }}
                className={`w-6 h-6 rounded-full transition-transform ${color === c ? "ring-2 ring-offset-1 ring-slate-500 scale-110" : ""}`}
              />
            ))}
          </div>
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-slate-900 text-white rounded-xl py-2 text-sm font-medium hover:bg-slate-700 disabled:opacity-50 transition-colors"
        >
          {loading ? "Saving..." : task ? "Update Task" : "Create Task"}
        </Button>
      </form>
    </Modal>
  );
}
