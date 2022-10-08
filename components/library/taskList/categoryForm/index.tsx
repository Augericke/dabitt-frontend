import React, { useState, FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BsPlusCircle } from "react-icons/bs";
import { colorList, IconColors } from "../../../../types/task";
import categoryService, {
  CreateCategory,
} from "../../../../utils/services/category";
import Popover from "../../popover";
import { getSelectableColorMenuOptions } from "../../popover/selectableColorMenuOptions";
import { getSelectableColorClass } from "../../../../utils/selectableColorClass";
import { CategoryModel } from "../../../../types/category";

const styles = require("./categoryForm.module.scss");

type CategoryFormProps = {};

const CategoryForm: React.FC<CategoryFormProps> = () => {
  const queryClient = useQueryClient();
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryColor, setNewCategoryColor] = useState<IconColors>(
    colorList[0],
  );
  const { backgroundColor, borderColor, textColor } = getSelectableColorClass(
    styles,
    newCategoryColor,
  );

  const { mutate, isLoading, error } = useMutation(
    (newCategory: CreateCategory) => createCategory(newCategory),
    {
      onSuccess: (data) => {
        setNewCategoryName("");
        queryClient.setQueryData<CategoryModel[] | undefined>(
          ["categories"],
          (oldCategories) => oldCategories && [...oldCategories, data],
        );
      },
      onError: () => {
        console.log(error);
      },
    },
  );

  const createCategory = async (data: CreateCategory) => {
    const addedCategory = await categoryService.create(data);
    return addedCategory;
  };

  const handleCategoryName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategoryName(event.target.value);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newCategoryName) {
      const newCategoryData = {
        name: newCategoryName,
        iconColor: newCategoryColor,
      };
      mutate(newCategoryData);
    }
  };

  return (
    <form className={styles.categoryFormContainer} onSubmit={onSubmit}>
      <button
        className={
          newCategoryName
            ? `${styles.addCategoryButtonPopulated} ${textColor}`
            : `${styles.addCategoryButton} ${textColor}`
        }
        type="submit"
      >
        <span className={styles.addIcon}>
          <BsPlusCircle />
        </span>
      </button>
      <input
        className={
          newCategoryName
            ? `${styles.categoryInputPopulated} ${borderColor}`
            : `${styles.categoryInput} ${borderColor}`
        }
        placeholder="add category"
        value={newCategoryName}
        onChange={handleCategoryName}
        maxLength={25}
      />
      {newCategoryName && (
        <Popover
          customButtonClass={styles.customPopoverClass}
          customMenuClass={styles.customColorMenuClass}
          menuItems={getSelectableColorMenuOptions((color: IconColors) =>
            setNewCategoryColor(color),
          )}
          iconType="none"
          iconText={
            <span
              className={`${styles.colorSelectorContainer} ${backgroundColor}`}
            />
          }
        />
      )}
    </form>
  );
};

export default CategoryForm;
