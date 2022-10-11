export type UserPreferenceModel = {
  id: string;
  preferedTheme: ThemeColors;
  userId: string;
  updatedAt: Date;
};

export type UserModel = {
  id: string;
  createdAt: Date;
  completedSetup: boolean;
  username: string;
  userPreference: UserPreferenceModel;
};

export const themeList = [
  "dark",
  "light",
  "sea",
  "lobby",
  "cappuccino",
] as const;

export type ThemeColors = typeof themeList[number];
