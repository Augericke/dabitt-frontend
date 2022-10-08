import React, { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import categoryService, {
  UpdateCategory,
} from "../../../../utils/services/category";
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

const styles = require("./categoryHeader.module.scss");

type CategoryHeaderProps = {
  category: CategoryModel;
  numTasks: number;
};

const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  category,
  numTasks,
}) => {
  const queryClient = useQueryClient();
  const { backgroundColor, borderColor } = getSelectableColorClass(
    styles,
    category.iconColor,
  );
  const [categoryName, setCategoryName] = useState(category.name);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Expand text input horizontally with input
  const textRef = useRef<any>();
  const { width } = useWindowSize(); // ensure proper resize on screen change
  const isFontListLoaded = useFontFaceObserver([{ family: `Poppins` }]);

  useEffect(() => {
    if (isFontListLoaded) {
      textRef.current.style.width = "0px";
      const scrollWidth = textRef.current.scrollWidth;
      textRef.current.style.width = `${scrollWidth}px`;
    }
  }, [isFontListLoaded, categoryName, width]);

  const updateMutation = useMutation(
    (updatedCategory: UpdateCategory) => updateCategory(updatedCategory),
    {
      onSuccess: (data) => {
        queryClient.setQueryData<CategoryModel[]>(
          ["categories"],
          (oldCategories) =>
            oldCategories &&
            oldCategories.map((category) =>
              category.id !== data.id ? category : data,
            ),
        );
      },
      onError: () => {
        console.log(updateMutation.error);
      },
    },
  );

  const deleteMutation = useMutation((id: string) => deleteCategory(id), {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["categories"]);
      queryClient.setQueryData<CategoryModel[]>(
        ["categories"],
        (oldCategories) =>
          oldCategories &&
          oldCategories.filter((category) => category.id !== data.id),
      );
    },
    onError: () => {
      console.log(deleteMutation.error);
    },
  });

  const updateCategory = async (updateData: UpdateCategory) => {
    const updatedCategory = await categoryService.update(updateData);
    return updatedCategory;
  };

  const deleteCategory = async (id: string) => {
    const deletedCategory = await categoryService.destroy(id);
    return deletedCategory;
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(event.target.value);
  };

  const onColorChange = (color: IconColors) => {
    updateMutation.mutate({ id: category.id, data: { iconColor: color } });
  };

  const onBlur = () => {
    if (categoryName !== category.name) {
      const newName = categoryName === "" ? category.name : categoryName.trim();
      setCategoryName(newName);
      updateMutation.mutate({ id: category.id, data: { name: newName } });
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
            maxLength={25}
          />
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
        <Popover
          customMenuClass={styles.customCategoryMenuClass}
          menuItems={getMenuItems(textRef, () => setShowDeleteModal(true))}
          iconType="gear"
        />
      </div>
      <DeleteModal
        isVisible={showDeleteModal}
        content="Are you sure you want to delete this category?"
        onClose={() => {
          setShowDeleteModal(false);
        }}
        onDelete={() => deleteMutation.mutate(category.id)}
      />
    </>
  );
};

export default CategoryHeader;
