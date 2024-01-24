type Task = {
  title: string;
  label: string;
  color: string;
  details: TaskDetails[];
};

type TaskDetails = {
  todo: string;
  status: boolean;
};

export type { Task, TaskDetails };
