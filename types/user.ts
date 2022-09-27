export type UserPreferenceModel = {
  id: string;
  preferedTheme: string;
  userId: string;
};

export type UserModel = {
  id: string;
  completedSetup: boolean;
  username: string;
  userPreference: UserPreferenceModel;
};
