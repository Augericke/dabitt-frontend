/* eslint-disable @next/next/no-html-link-for-pages */
import React, { FormEvent, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { api } from "../../../../utils/environmentManager";
import { BsPlusCircle } from "react-icons/bs";
import { CategoryModel, TaskModel } from "../../../../types/task";

const styles = require("./taskForm.module.scss");

type TaskFormProps = {
  category: CategoryModel;
  tasks: TaskModel[];
  setTasks: React.Dispatch<React.SetStateAction<TaskModel[]>>;
};

const TaskForm: React.FC<TaskFormProps> = ({ category, tasks, setTasks }) => {
  const { isLoading, getAccessTokenSilently } = useAuth0();
  const [textRows, setTextRows] = useState(1);
  const [newTaskDescription, setNewTaskDescription] = useState("");

  const handleDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewTaskDescription(event.target.value.replace(/\n/g, ""));
  };
  const addTask = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!isLoading && newTaskDescription) {
        const token = await getAccessTokenSilently({
          audience: "API/dabitt",
          scope: "",
        });

        const dataConfig = {
          categoryId: category.id,
          description: newTaskDescription,
        };

        const headerConfig = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const addedTask = await api.post<TaskModel>(
          `/task`,
          dataConfig,
          headerConfig,
        );
        setTasks([...tasks, addedTask.data]);
        setNewTaskDescription("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className={styles.taskForm} onSubmit={addTask}>
      <button
        className={
          newTaskDescription
            ? styles.addTaskButtonPopulated
            : styles.addTaskButton
        }
        type="submit"
      >
        <span className={styles.addIcon}>
          <BsPlusCircle />
        </span>
      </button>
      <textarea
        className={styles.taskInput}
        placeholder="add task"
        value={newTaskDescription}
        onChange={handleDescription}
        onFocus={() => setTextRows(3)}
        onBlur={() => setTextRows(1)}
        rows={textRows}
        cols={20}
        wrap="soft"
        maxLength={140}
      />
    </form>
  );
};

export default TaskForm;
