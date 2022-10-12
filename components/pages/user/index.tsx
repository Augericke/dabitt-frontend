import React, { useState } from "react";
import { UserModel } from "../../../types/user";
import { formatDate } from "../../../utils/dateComputer";
import ThemeSelector from "../../library/themeSelector";
import { onEnterDownBlur } from "../../../utils/formControllers";
import { useUpdateUser } from "../../../utils/hooks/query/user/useUpdateUser";
import Popover from "../../library/popover";
import { getUserMenuOptions } from "./userMenuOptions";
import DeleteModal from "../../library/modal/deleteModal";
import { useDeleteUser } from "../../../utils/hooks/query/user/useDeleteUser";
import ShowOnViewport from "../../library/animation/showOnViewport";

type UserViewProps = {
  user: UserModel;
};

const styles = require("./user.module.scss");

const UserView: React.FC<UserViewProps> = ({ user }) => {
  const deleteUser = useDeleteUser();
  const updateUser = useUpdateUser();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [username, setUsername] = useState(user.username);
  const joinedAt = formatDate(user.createdAt, "MMM e, yyyy");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const onBlur = () => {
    if (username !== user.username) {
      const newUsername = username === "" ? user.username : username.trim();
      setUsername(newUsername);

      updateUser.mutate({ username: newUsername });
    }
  };

  return (
    <>
      <ShowOnViewport customClass={styles.userViewContainer}>
        <>
          <h1 className={styles.settingsTitle}>settings</h1>
          <div className={styles.userSettingsContainer}>
            <div className={styles.userInfoHeader}>
              <h2 className={styles.userTitle}>user</h2>
              <Popover
                customMenuClass={styles.customMenuClass}
                menuItems={getUserMenuOptions(() => setShowDeleteModal(true))}
                iconType="gear"
              />
            </div>
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
        </>
      </ShowOnViewport>
      <DeleteModal
        isVisible={showDeleteModal}
        content="All data will be lost - are you sure you want to delete your account? "
        onClose={() => {
          setShowDeleteModal(false);
        }}
        onDelete={() => deleteUser.mutate()}
      />
    </>
  );
};

export default UserView;
