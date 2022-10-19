import React, { useEffect, useRef, useState } from "react";
import { CategoryModel } from "../../../../types/category";
import { IconColors } from "../../../../types/task";
import Popover from "../../popover";
import { getMenuItems } from "./categoryMenuOptions";
import { getSelectableColorClass } from "../../../../utils/selectableColorClass";
import { getSelectableColorMenuOptions } from "../../popover/selectableColorMenuOptions";
import useFontFaceObserver from "use-font-face-observer";
import { useWindowSize } from "../../../../utils/hooks/useWindowSize";
import DeleteModal from "../../modal/deleteModal";
import { onEnterDownBlur } from "../../../../utils/formControllers";
import WordCount from "../../wordCount";
import { useUpdateCategory } from "../../../../utils/hooks/query/category/useUpdateCategory";
import { useDeleteCategory } from "../../../../utils/hooks/query/category/useDeleteCategory";

const styles = require("./categoryHeader.module.scss");

type CategoryHeaderProps = {
  category: CategoryModel;
  numTasks: number;
  modifiable?: boolean;
};

const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  category,
  numTasks,
  modifiable = true,
}) => {
  const deleteCategory = useDeleteCategory(category.id);
  const updateCategory = useUpdateCategory();

  const { backgroundColor, borderColor } = getSelectableColorClass(
    styles,
    category.iconColor,
  );
  const [categoryName, setCategoryName] = useState(category.name);
  const [showWordCount, setShowWordCount] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Expand text input horizontally with input
  const textRef = useRef<any>();
  const { width } = useWindowSize(); // ensure proper resize on screen change
  const isFontListLoaded = useFontFaceObserver([{ family: `Poppins` }]);
  const headerLimit = 25;

  useEffect(() => {
    if (isFontListLoaded) {
      textRef.current.style.width = "0px";
      const scrollWidth = textRef.current.scrollWidth;
      textRef.current.style.width = `${scrollWidth}px`;
    }
  }, [isFontListLoaded, categoryName, width]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value);
  };

  const onColorChange = (color: IconColors) => {
    if (modifiable) {
      updateCategory.mutate({ id: category.id, data: { iconColor: color } });
    }
  };

  const onBlur = () => {
    setShowWordCount(false);
    if (categoryName !== category.name) {
      const newName = categoryName === "" ? category.name : categoryName.trim();
      setCategoryName(newName);
      updateCategory.mutate({ id: category.id, data: { name: newName } });
    }
  };

  return (
    <>
      <div className={styles.categoryHeaderContainer}>
        <hgroup className={styles.categoryTitleContainer}>
          <input
            ref={textRef}
            className={`${styles.categoryInput} ${borderColor}`}
            value={categoryName}
            onChange={onChange}
            onKeyDown={onEnterDownBlur}
            onBlur={onBlur}
            onFocus={() => setShowWordCount(true)}
            maxLength={headerLimit}
            readOnly={!modifiable}
            disabled={!modifiable}
          />
          {showWordCount && (
            <WordCount
              content={categoryName}
              characterLimit={headerLimit}
              color={category.iconColor}
              customClass={styles.customWordCount}
            />
          )}

          <Popover
            customButtonClass={styles.customPopoverClass}
            customMenuClass={styles.customMenuClass}
            menuItems={getSelectableColorMenuOptions(onColorChange)}
            iconType="none"
            iconText={
              <span className={`${styles.categoryCount} ${backgroundColor}`}>
                {numTasks}
              </span>
            }
          />
        </hgroup>
        {modifiable && (
          <Popover
            customMenuClass={styles.customCategoryMenuClass}
            menuItems={getMenuItems(textRef, () => setShowDeleteModal(true))}
            iconType="gear"
          />
        )}
      </div>
      <DeleteModal
        isVisible={showDeleteModal}
        content="Are you sure you want to delete this category?"
        onClose={() => {
          setShowDeleteModal(false);
        }}
        onDelete={() => deleteCategory.mutate(category.id)}
      />
    </>
  );
};

export default CategoryHeader;
