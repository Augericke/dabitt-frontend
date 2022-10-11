export interface TaskModel {
  id: string;
  description: string;
  createdAt: Date;
  completedAt: Date | null;
  startAt: Date | null;
  estimateMinutes: number;
}

export const colorList = [
  "default",
  "default_secondary",
  "forest",
  "tan",
  "space",
  "steel",
  "copper",
  "pine_cone",
] as const;

export type IconColors = typeof colorList[number];
