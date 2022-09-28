import React, { useState, SetStateAction, Dispatch, FormEvent } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { api } from "../../../utils/environmentManager";
import { BsPlusCircle } from "react-icons/bs";
import { CategoryModel } from "../../../types/task";

const styles = require("./categoryForm.module.scss");

type CategoryFormProps = {
  categories: CategoryModel[];
  setCategories: Dispatch<SetStateAction<CategoryModel[]>>;
};

const CategoryForm: React.FC<CategoryFormProps> = ({
  categories,
  setCategories,
}) => {
  const { isLoading, getAccessTokenSilently } = useAuth0();
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleCategoryName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategoryName(event.target.value);
  };

  const addCategory = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!isLoading && newCategoryName) {
        const token = await getAccessTokenSilently({
          audience: "API/dabitt",
          scope: "",
        });

        const dataConfig = {
          name: newCategoryName,
        };

        const headerConfig = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const addedCategory = await api.post<CategoryModel>(
          "/category",
          dataConfig,
          headerConfig,
        );

        setCategories([...categories, { ...addedCategory.data, tasks: [] }]);
        setNewCategoryName("");
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
            ? styles.addCategoryButtonPopulated
            : styles.addCategoryButton
        }
        type="submit"
      >
        <span className={styles.addIcon}>
          <BsPlusCircle />
        </span>
      </button>
      <input
        className={
          newCategoryName ? styles.categoryInputPopulated : styles.categoryInput
        }
        placeholder="add category"
        value={newCategoryName}
        onChange={handleCategoryName}
        maxLength={25}
      />
    </form>
  );
};

export default CategoryForm;
