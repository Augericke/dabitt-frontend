import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import categoryService from "../../../../utils/services/category";
import { CategoryModel } from "../../../../types/task";
import Popover from "../../popover";
import { getMenuItems } from "./categoryMenuOptions";

const styles = require("./categoryHeader.module.scss");

type CategoryHeaderProps = {
  category: CategoryModel;
  categories: CategoryModel[] | null;
  setCategories: Dispatch<SetStateAction<CategoryModel[] | null>>;
  count: number;
};

const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  category,
  categories,
  setCategories,
  count,
}) => {
  const { getAccessTokenSilently } = useAuth0();
  const [categoryName, setCategoryName] = useState(category.name);
  const textRef = useRef<any>();

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value);
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
      if (categoryName) {
        const token = await getAccessTokenSilently({
          audience: "API/dabitt",
          scope: "",
        });

        const header = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        await categoryService.update(
          category.id,
          { name: categoryName },
          header,
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCategory = async () => {
    try {
      if (categories) {
        const token = await getAccessTokenSilently({
          audience: "API/dabitt",
          scope: "",
        });

        const header = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const updatedCategories = categories.filter(
          (categories) => categories.id != category.id,
        );
        await categoryService.destroy(category.id, header);
        setCategories(updatedCategories);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //TODO: fix issue with initial render having wrong length
  useEffect(() => {
    textRef.current.style.width = `0px`;
    const scrollWidth = textRef.current.scrollWidth;
    textRef.current.style.width = `${scrollWidth}px`;
  }, [categoryName]);

  return (
    <div className={styles.categoryHeaderContainer}>
      <hgroup className={styles.categoryTitleContainer}>
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
      <Popover
        menuItems={getMenuItems(textRef, deleteCategory)}
        iconType="gear"
      />
    </div>
  );
};

export default CategoryHeader;

// Force loss of focus on enter (triggers updateCategory)
const onEnterSubmit = (event: any) => {
  if (event.key === "Enter" && event.shiftKey == false) {
    event.target.blur();
  }
};
