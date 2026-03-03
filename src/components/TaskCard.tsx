import React from "react";
import { Task } from "../types/task";

interface Props {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

export default function TaskCard({ task, onEdit, onDelete }: Props) {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("taskId", String(task.id));
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="bg-white rounded-xl shadow-sm border border-slate-200 p-3 cursor-grab active:cursor-grabbing select-none"
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
