export type TaskStatus = "BACKLOG" | "TODO" | "DOING" | "DONE";

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
}

export interface TaskPayload {
  title: string;
  description: string;
  status: TaskStatus;
}
