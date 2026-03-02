import React from "react";
import { Task, TaskColor } from "../types/task";

const colorHex: Record<TaskColor, string> = {
  red: "#f87171",
  blue: "#60a5fa",
  green: "#4ade80",
  yellow: "#facc15",
  purple: "#c084fc",
  orange: "#fb923c",
};

interface Props {
  task: Task;
  color?: TaskColor;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

export default function TaskCard({ task, color, onEdit, onDelete }: Props) {
  const borderColor = color ? colorHex[color] : "#e2e8f0";

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("taskId", String(task.id));
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      style={{ borderLeftColor: borderColor }}
      className="bg-white rounded-xl shadow-sm border border-slate-200 border-l-4 p-3 cursor-grab active:cursor-grabbing select-none"
    >
      <p className="text-sm font-medium text-slate-800 mb-1">{task.title}</p>
      {task.description && (
        <p className="text-xs text-slate-500 line-clamp-2">
          {task.description}
        </p>
      )}
      <div className="flex gap-2 mt-2 justify-end">
        <button
          onClick={() => onEdit(task)}
          className="text-xs text-blue-500 hover:underline"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-xs text-red-400 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
