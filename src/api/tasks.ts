import { api } from "./client";
import { Task, TaskPayload } from "../types/task";

export const getTasks = async (): Promise<Task[]> =>
  (await api.get<Task[]>("/tasks")).data;

export const createTask = async (body: TaskPayload): Promise<Task> =>
  (await api.post<Task>("/tasks", body)).data;

export const updateTask = async (
  id: number,
  body: TaskPayload,
): Promise<string> =>
  (await api.put<string>(`/tasks/${id}`, body, { responseType: "text" })).data;

export const deleteTask = async (id: number): Promise<string> =>
  (await api.delete<string>(`/tasks/${id}`, { responseType: "text" })).data;
