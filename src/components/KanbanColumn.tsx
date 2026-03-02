import React from "react";
import { Task, TaskStatus, TaskColor } from "../types/task";
import TaskCard from "./TaskCard";

interface Props {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  colorMap: Record<number, TaskColor>;
  onDrop: (taskId: number, status: TaskStatus) => void;
  onAdd: (status: TaskStatus) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

export default function KanbanColumn({
  title,
  status,
  tasks,
  colorMap,
  onDrop,
  onAdd,
  onEdit,
  onDelete,
}: Props) {
  const [over, setOver] = React.useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setOver(true);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setOver(false);
    const id = Number(e.dataTransfer.getData("taskId"));
    if (id) onDrop(id, status);
  };

  return (
    <div
      className={`flex-1 min-w-55 max-w-70 rounded-2xl p-3 flex flex-col gap-2 transition-colors ${over ? "bg-slate-200" : "bg-slate-100"}`}
      onDragOver={handleDragOver}
      onDragLeave={() => setOver(false)}
      onDrop={handleDrop}
    >
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {title}
        </h3>
        <span className="text-xs bg-slate-300 text-slate-600 rounded-full px-2 py-0.5">
          {tasks.length}
        </span>
      </div>

      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          color={colorMap[task.id]}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}

      <button
        onClick={() => onAdd(status)}
        className="mt-1 text-sm text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-xl py-2 transition-colors"
      >
        + Add card
      </button>
    </div>
  );
}
