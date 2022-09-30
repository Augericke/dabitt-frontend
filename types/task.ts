export type TaskModel = {
  id: string;
  description: string;
  createdAt: Date;
  completedAt: Date;
  estimateMinutes: number;
};

export type CategoryModel = {
  id: string;
  name: string;
  tasks: TaskModel[];
};
