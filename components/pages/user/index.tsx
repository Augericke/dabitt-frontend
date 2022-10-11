import React, { useState } from "react";
import { UserModel } from "../../../types/user";
import { formatDate } from "../../../utils/dateComputer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import userService, { UpdateUser } from "../../../utils/services/user";
import ThemeSelector from "../../library/themeSelector";
import { onEnterDownBlur } from "../../../utils/formControllers";

type UserViewProps = {
  user: UserModel;
};

const styles = require("./user.module.scss");

const UserView: React.FC<UserViewProps> = ({ user }) => {
  const queryClient = useQueryClient();

  const [username, setUsername] = useState(user.username);
  const joinedAt = formatDate(user.createdAt, "MMM e, yyyy");

  const updateMutation = useMutation(
    (updatedUser: UpdateUser) => updateUser(updatedUser),
    {
      onSuccess: (data) => {
        queryClient.setQueryData<UserModel>(["user"], data);
      },
      onError: () => {
        console.log(updateMutation.error);
      },
    },
  );

  const updateUser = async (updateData: UpdateUser) => {
    const updatedUser = await userService.update(updateData);
    return updatedUser;
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const onBlur = () => {
    if (username !== user.username) {
      const newUsername = username === "" ? user.username : username.trim();
      setUsername(newUsername);

      updateMutation.mutate({ username: newUsername });
    }
  };

  return (
    <section className={styles.userViewContainer}>
      <h1 className={styles.settingsTitle}>settings</h1>
      <div className={styles.userSettingsContainer}>
        <h2 className={styles.settingsSubtitle}>user</h2>
        <ul className={styles.infoItemsContainer}>
          <li className={styles.infoItemName}>
            username
            <input
              className={styles.infoItemInput}
              value={username}
              onKeyDown={onEnterDownBlur}
              onChange={onChange}
              onBlur={onBlur}
            />
          </li>
          <li className={styles.infoItemName}>
            member since
            <span className={styles.infoItemValue}>{joinedAt}</span>
          </li>
        </ul>
        <h2 className={styles.settingsSubtitle}>themes</h2>
        <div className={styles.themeSectionContainer}>
          <ThemeSelector />
        </div>
      </div>
    </section>
  );
};

export default UserView;
