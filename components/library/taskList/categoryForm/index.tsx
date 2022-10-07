import React, { useState, FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BsPlusCircle } from "react-icons/bs";
import { colorList, IconColors } from "../../../../types/task";
import categoryService, {
  PostCategoryTask,
} from "../../../../utils/services/category";
import Popover from "../../popover";
import { getSelectableColorMenuOptions } from "../../popover/selectableColorMenuOptions";
import { getSelectableColorClass } from "../../../../utils/selectableColorClass";
import { startOfDay } from "date-fns";

const styles = require("./categoryForm.module.scss");

type CategoryFormProps = {
  selectedDate: Date;
};

const CategoryForm: React.FC<CategoryFormProps> = ({ selectedDate }) => {
  const queryClient = useQueryClient();
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryColor, setNewCategoryColor] = useState<IconColors>(
    colorList[0],
  );
  const { backgroundColor, borderColor, textColor } = getSelectableColorClass(
    styles,
    newCategoryColor,
  );

  const handleCategoryName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategoryName(event.target.value);
  };

  const createCategory = async ({ name, iconColor }: PostCategoryTask) => {
    const addedCategory = await categoryService.create({ name, iconColor });
    return addedCategory;
  };

  const { mutate, isLoading, error } = useMutation(
    (newCategory: PostCategoryTask) => createCategory(newCategory),
    {
      onSuccess: () => {
        setNewCategoryName("");
        queryClient.invalidateQueries([
          "category-tasks",
          startOfDay(new Date(selectedDate)),
        ]);
      },
      onError: () => {
        console.log(error);
      },
      onSettled: () => {
        queryClient.invalidateQueries(["category-tasks", selectedDate]);
      },
    },
  );

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newCategoryName) {
      mutate({ name: newCategoryName, iconColor: newCategoryColor });
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
