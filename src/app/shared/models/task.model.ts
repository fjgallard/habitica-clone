export interface Task {
  id?: string;
  name: string;
  done: boolean;
  user: string;
  notes?: string;
}
