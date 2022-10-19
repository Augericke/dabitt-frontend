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
import { useAuth0 } from "@auth0/auth0-react";

type UserViewProps = {
  user: UserModel;
};

const styles = require("./user.module.scss");

const UserView: React.FC<UserViewProps> = ({ user }) => {
  const { logout } = useAuth0();
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
      <div className={styles.userViewContainer}>
        <>
          <h1 className={styles.settingsTitle}>settings</h1>
          <ShowOnViewport>
            <div className={styles.userSettingsContainer}>
              <div className={styles.userInfoHeader}>
                <h2 className={styles.userTitle}>user</h2>
                <Popover
                  customMenuClass={styles.customMenuClass}
                  menuItems={getUserMenuOptions(
                    () => setShowDeleteModal(true),
                    logout,
                  )}
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
                <li className={styles.infoItemName}>
                  <button
                    className={styles.userButton}
                    onClick={() => logout({ returnTo: window.location.origin })}
                  >
                    logout
                  </button>
                </li>
              </ul>
              <h2 className={styles.settingsSubtitle}>themes</h2>
              <div className={styles.themeSectionContainer}>
                <ThemeSelector />
              </div>
            </div>
          </ShowOnViewport>
        </>
      </div>
      <DeleteModal
        isVisible={showDeleteModal}
        content="All data will be lost. Are you sure you want to delete your account? "
        onClose={() => {
          setShowDeleteModal(false);
        }}
        onDelete={() => deleteUser.mutate()}
      />
    </>
  );
};

export default UserView;
