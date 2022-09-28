/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useEffect, useRef, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { api } from "../../../../utils/environmentManager";
import { CategoryModel } from "../../../../types/task";

const styles = require("./categoryHeader.module.scss");

type CategoryHeaderProps = {
  category: CategoryModel;
  count: number;
};

const CategoryHeader: React.FC<CategoryHeaderProps> = ({ category, count }) => {
  const { isLoading, getAccessTokenSilently } = useAuth0();
  const [categoryName, setCategoryName] = useState(category.name);
  const textRef = useRef<any>();

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value);
  };

  // Force loss of focus on enter (triggers updateCategory)
  const onEnterSubmit = (event: any) => {
    if (event.key === "Enter" && event.shiftKey == false) {
      event.target.blur();
    }
  };

  const onBlur = () => {
    if (!categoryName || categoryName === category.name) {
      setCategoryName(category.name);
    } else {
      setCategoryName(categoryName.trim());
      updateCategory();
    }
  };

  const updateCategory = async () => {
    try {
      if (!isLoading && categoryName) {
        const token = await getAccessTokenSilently({
          audience: "API/dabitt",
          scope: "",
        });

        const dataConfig = {
          name: categoryName,
        };

        const headerConfig = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        await api.put<CategoryModel>(
          `/category/${category.id}`,
          dataConfig,
          headerConfig,
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    textRef.current.style.width = "0px";
    const scrollWidth = textRef.current.scrollWidth;
    textRef.current.style.width = `${scrollWidth + 5}px`;
  }, [categoryName]);

  return (
    <hgroup className={styles.categoryHeaderContainer}>
      <input
        ref={textRef}
        className={styles.categoryInput}
        value={categoryName}
        onChange={onChangeHandler}
        onKeyDown={onEnterSubmit}
        onBlur={onBlur}
        maxLength={25}
      />
      <div className={styles.categoryCount}>{count}</div>
    </hgroup>
  );
};

export default CategoryHeader;
