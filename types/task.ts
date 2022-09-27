export type TaskModel = {
  id: string;
  description: string;
  createdAt: Date;
  completedAt: Date;
};

export type CategoryModel = {
  id: string;
  name: string;
  tasks: TaskModel[];
};
