import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { api } from "../../../utils/environmentManager";
import TaskList from "../../library/taskList";
import { CategoryModel } from "../../../types/task";

const styles = require("./dashboard.module.scss");

type DashboardViewProps = {};

const DashboardView: React.FC<DashboardViewProps> = (
  props: DashboardViewProps,
) => {
  const { user, isLoading, getAccessTokenSilently } = useAuth0();
  const [categories, setCategories] = useState<CategoryModel[]>();

  useEffect(() => {
    (async () => {
      try {
        if (!isLoading && user) {
          const token = await getAccessTokenSilently({
            audience: "API/dabitt",
            scope: "",
          });

          const id = "asf31cvz21"; //user.sub!.replace("|", "-");
          const headerConfig = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

          const response = await api.get<CategoryModel[]>(
            `/category/user/${id}`,
            headerConfig,
          );

          setCategories(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [getAccessTokenSilently, isLoading, user]);

  return (
    <div className={styles.placeHolderContainer}>
      {categories && (
        <>
          {categories.map((category, index) => {
            return <TaskList key={index} category={category} />;
          })}
        </>
      )}
    </div>
  );
};

export default DashboardView;
