import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import categoryService from "../../../../utils/services/category";
import { CategoryModel, IconColors } from "../../../../types/task";
import Popover from "../../popover";
import { getMenuItems } from "./categoryMenuOptions";
import { getSelectableColorClass } from "../../../../utils/selectableColorClass";
import { getSelectableColorMenuOptions } from "../../popover/selectableColorMenuOptions";
import useFontFaceObserver from "use-font-face-observer";

const styles = require("./categoryHeader.module.scss");

type CategoryHeaderProps = {
  category: CategoryModel;
  categories: CategoryModel[] | null;
  setCategories: Dispatch<SetStateAction<CategoryModel[] | null>>;
  categoryColor: IconColors;
  setCategoryColor: React.Dispatch<React.SetStateAction<IconColors>>;
  count: number;
};

const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  category,
  categories,
  setCategories,
  categoryColor,
  setCategoryColor,
  count,
}) => {
  const { getAccessTokenSilently } = useAuth0();
  const { backgroundColor, borderColor } = getSelectableColorClass(
    styles,
    categoryColor,
  );
  const [categoryName, setCategoryName] = useState("loading...");

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value);
  };

  const onColorChangeHandler = (color: IconColors) => {
    setCategoryColor(color);
    updateCategory({ iconColor: color });
  };

  const onBlur = () => {
    if (categoryName !== category.name) {
      const newName = categoryName === "" ? category.name : categoryName.trim();
      setCategoryName(newName);
      updateCategory({ name: newName });
    }
  };

  const updateCategory = useCallback(
    async (body: { name?: string; iconColor?: IconColors }) => {
      try {
        const token = await getAccessTokenSilently({
          audience: "API/dabitt",
          scope: "",
        });

        const header = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        await categoryService.update(category.id, body, header);
      } catch (error) {
        console.error(error);
      }
    },
    [category.id, getAccessTokenSilently],
  );

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

  // Wait until fonts loaded before initial render so width matches
  const textRef = useRef<any>();
  const isFontListLoaded = useFontFaceObserver([{ family: `Poppins` }]);
  useEffect(() => {
    if (isFontListLoaded) {
      setCategoryName(category.name);
    }
  }, [isFontListLoaded, category.name]);

  // Expand text input horizontally with input
  useEffect(() => {
    textRef.current.style.width = "0px";
    const scrollWidth = textRef.current.scrollWidth;
    textRef.current.style.width = `${scrollWidth}px`;
  }, [categoryName]);

  return (
    <div className={styles.categoryHeaderContainer}>
      <hgroup className={styles.categoryTitleContainer}>
        <input
          ref={textRef}
          className={`${styles.categoryInput} ${borderColor}`}
          value={categoryName}
          onChange={onChangeHandler}
          onKeyDown={onEnterSubmit}
          onBlur={onBlur}
          maxLength={25}
        />
        <Popover
          customButtonClass={styles.customPopoverClass}
          customMenuClass={styles.customMenuClass}
          menuItems={getSelectableColorMenuOptions(onColorChangeHandler)}
          iconType="none"
          iconText={
            <span className={`${styles.categoryCount} ${backgroundColor}`}>
              {count}
            </span>
          }
        />
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
