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
  iconColor: IconColors;
};

export const colorList = [
  "default",
  "default_secondary",
  "forest",
  "coffee",
  "blush",
  "tan",
  "space",
  "steel",
  "copper",
  "pine_cone",
] as const;

export type IconColors = typeof colorList[number];
