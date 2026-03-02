export type TaskStatus = "BACKLOG" | "TODO" | "DOING" | "DONE";
export type TaskColor =
  | "red"
  | "blue"
  | "green"
  | "yellow"
  | "purple"
  | "orange";

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
