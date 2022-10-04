import React, { useState, SetStateAction, Dispatch, FormEvent } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { BsPlusCircle } from "react-icons/bs";
import { CategoryModel, colorList, IconColors } from "../../../../types/task";
import categoryService from "../../../../utils/services/category";
import produce from "immer";
import Popover from "../../popover";
import { getSelectableColorMenuOptions } from "../../popover/selectableColorMenuOptions";
import { getSelectableColorClass } from "../../../../utils/selectableColorClass";

const styles = require("./categoryForm.module.scss");

type CategoryFormProps = {
  categories: CategoryModel[] | null;
  setCategories: Dispatch<SetStateAction<CategoryModel[] | null>>;
};

const CategoryForm: React.FC<CategoryFormProps> = ({
  categories,
  setCategories,
}) => {
  const { getAccessTokenSilently } = useAuth0();
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

  const addCategory = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (newCategoryName && categories) {
        const token = await getAccessTokenSilently({
          audience: "API/dabitt",
          scope: "",
        });

        const data = {
          name: newCategoryName,
          iconColor: newCategoryColor,
        };

        const header = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const addedCategory = await categoryService.create(data, header);
        setNewCategoryName("");
        setCategories(
          produce((draft) => {
            if (draft) {
              draft.push({ ...addedCategory, tasks: [] });
            }
          }),
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className={styles.categoryFormContainer} onSubmit={addCategory}>
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
