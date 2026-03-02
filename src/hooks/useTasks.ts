import { useState, useEffect, useCallback } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../api/tasks";
import { Task, TaskStatus, TaskPayload } from "../types/task";
import { parseBackendError } from "../api/client";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      setTasks(await getTasks());
    } catch (err) {
      setError(parseBackendError(err, "Failed to load tasks"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const add = async (body: TaskPayload): Promise<Task> => {
    const task = await createTask(body);
    setTasks((prev) => [...prev, task]);
    return task;
  };

  const update = async (id: number, body: TaskPayload) => {
    await updateTask(id, body);
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...body } : t)));
  };

  const remove = async (id: number) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const moveTask = (id: number, status: TaskStatus) => {
    setTasks((prev) => {
      const task = prev.find((t) => t.id === id);
      if (!task) return prev;
      updateTask(id, { ...task, status }).catch(fetchAll);
      return prev.map((t) => (t.id === id ? { ...t, status } : t));
    });
  };

  return { tasks, loading, error, add, update, remove, moveTask };
}
