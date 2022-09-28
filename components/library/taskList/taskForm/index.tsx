/* eslint-disable @next/next/no-html-link-for-pages */
import React, { FormEvent, useEffect, useRef, useState } from "react";
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

  const taskEnterSubmit = (event: any) => {
    if (event.key === "Enter" && event.shiftKey == false) {
      event.preventDefault();
      return addTask(event);
    }
  };

  // Resize textArea based on description length
  const textRef = useRef<any>();
  useEffect(() => {
    textRef.current.style.height = "0px";
    const scrollHeight = textRef.current.scrollHeight;
    textRef.current.style.height = `${scrollHeight}px`;
  }, [newTaskDescription]);

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
        ref={textRef}
        className={styles.taskInput}
        placeholder="add task"
        value={newTaskDescription}
        onChange={handleDescription}
        onKeyDown={taskEnterSubmit}
        onBlur={() => setTextRows(1)}
        maxLength={140}
      />
    </form>
  );
};

export default TaskForm;
