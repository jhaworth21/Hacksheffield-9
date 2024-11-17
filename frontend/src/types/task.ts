type Task = {
  id: string;
  title: string;
  description: string;
  streak: number;
  lastCompleted: string | null;
  pending: boolean;
}

export default Task;
