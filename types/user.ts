export type UserPreferenceModel = {
  id: string;
  preferedTheme: string;
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
