import { useState, useMemo } from "react";
import { useTasks } from "../../hooks/useTasks";
import KanbanColumn from "../../components/KanbanColumn";
import TaskFormModal from "../tasks/TaskFormModal";
import { Task, TaskStatus, TaskPayload } from "../../types/task";

const COLUMNS: { label: string; status: TaskStatus }[] = [
  { label: "Backlog", status: "BACKLOG" },
  { label: "To Do", status: "TODO" },
  { label: "Doing", status: "DOING" },
  { label: "Done", status: "DONE" },
];

export default function Board() {
  const { tasks, loading, error, add, update, remove, moveTask } = useTasks();
  const [modal, setModal] = useState<{
    task?: Task;
    defaultStatus?: TaskStatus;
  } | null>(null);

  // useMemo: recompute filtered task lists only when tasks array changes
  const tasksByStatus = useMemo(
    () =>
      new Map(
        COLUMNS.map(({ status }) => [
          status,
          tasks.filter((t) => t.status === status),
        ]),
      ),
    [tasks],
  );

  const handleSave = async (payload: TaskPayload) => {
    if (modal?.task) {
      await update(modal.task.id, payload);
    } else {
      await add(payload);
    }
  };

  if (loading)
    return (
      <div className="flex-1 text-slate-400 text-center mt-20 text-sm">
        Loading tasks...
      </div>
    );
  if (error)
    return (
      <div className="flex-1 text-red-500 text-center mt-20 text-sm">
        {error}
      </div>
    );

  return (
    <div className="flex gap-4 p-6 overflow-x-auto min-h-full">
      {COLUMNS.map(({ label, status }) => (
        <KanbanColumn
          key={status}
          title={label}
          status={status}
          tasks={tasksByStatus.get(status) ?? []}
          onDrop={moveTask}
          onAdd={(s) => setModal({ defaultStatus: s })}
          onEdit={(task) => setModal({ task })}
          onDelete={remove}
        />
      ))}
      {modal !== null && (
        <TaskFormModal
          task={modal.task}
          defaultStatus={modal.defaultStatus}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
