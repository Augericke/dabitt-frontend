import React, { useState, FormEvent } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { colorList, IconColors } from "../../../../types/task";
import Popover from "../../popover";
import { getSelectableColorMenuOptions } from "../../popover/selectableColorMenuOptions";
import { getSelectableColorClass } from "../../../../utils/selectableColorClass";
import WordCount from "../../wordCount";
import { useCreateCategory } from "../../../../utils/hooks/query/category/useCreateCategory";

const styles = require("./categoryForm.module.scss");

type CategoryFormProps = {};

const CategoryForm: React.FC<CategoryFormProps> = () => {
  const createCategory = useCreateCategory();

  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryColor, setNewCategoryColor] = useState<IconColors>(
    colorList[0],
  );
  const headerLimit = 25;
  const { backgroundColor, borderColor, textColor } = getSelectableColorClass(
    styles,
    newCategoryColor,
  );

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

      createCategory.mutate(newCategoryData);
      setNewCategoryName("");
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
        maxLength={headerLimit}
      />
      {newCategoryName && (
        <>
          <WordCount
            content={newCategoryName}
            characterLimit={headerLimit}
            color={newCategoryColor}
            customClass={styles.customWordCount}
          />
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
        </>
      )}
    </form>
  );
};

export default CategoryForm;
