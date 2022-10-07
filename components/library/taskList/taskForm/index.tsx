import React, {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { BsPlusCircle } from "react-icons/bs";
import { CategoryModel } from "../../../../types/task";
import taskService from "../../../../utils/services/task";
import Popover from "../../popover";
import { getSelectableColorClass } from "../../../../utils/selectableColorClass";
import { displayHourMinutes } from "../../../../utils/dateComputer";
import { getTimeEstimateMenuOptions } from "./timeEstimateMenuOptions";
import produce from "immer";

const styles = require("./taskForm.module.scss");

type TaskFormProps = {
  category: CategoryModel;
  setCategories: Dispatch<SetStateAction<CategoryModel[] | null>>;
};

const TaskForm: React.FC<TaskFormProps> = ({ category, setCategories }) => {
  const { textColor, outlineColor } = getSelectableColorClass(
    styles,
    category.iconColor,
  );
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [taskTimeEstimate, setTaskTimeEstimate] = useState(15);

  const handleDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewTaskDescription(event.target.value.replace(/\n/g, ""));
  };

  const taskEnterSubmit = (event: any) => {
    if (event.key === "Enter" && event.shiftKey == false) {
      event.preventDefault();
      return addTask(event);
    }
  };

  const addTask = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (newTaskDescription) {
        const data = {
          categoryId: category.id,
          description: newTaskDescription,
          estimateMinutes: taskTimeEstimate,
        };

        const addedTask = await taskService.create(data);

        setNewTaskDescription("");
        setTaskTimeEstimate(15);
        setCategories(
          produce((draft) => {
            if (draft) {
              const index = draft?.findIndex(
                (updatedCategory) => updatedCategory.id === category.id,
              );
              if (index !== -1) draft[index].tasks.push(addedTask);
            }
          }),
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Resize textArea based on description length
  const textRef = useRef<any>();
  useEffect(() => {
    textRef.current.style.height = "0px";
    const scrollHeight = textRef.current.scrollHeight;
    textRef.current.style.height = `${scrollHeight}px`;
  }, [newTaskDescription]);

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
        <span className={`${styles.addIcon} ${textColor}`}>
          <BsPlusCircle />
        </span>
      </button>
      <div className={styles.inputsContainer}>
        <textarea
          ref={textRef}
          className={`${
            newTaskDescription ? styles.taskInputPopulated : styles.taskInput
          } ${outlineColor}`}
          placeholder="add task"
          value={newTaskDescription}
          onChange={handleDescription}
          onKeyDown={taskEnterSubmit}
          maxLength={140}
        />
        <div
          className={
            newTaskDescription
              ? styles.taskTimeEstimateContainer
              : styles.hideElement
          }
        >
          <Popover
            iconType="clock"
            iconText={
              <span className={styles.estimateLabel}>
                {displayHourMinutes(taskTimeEstimate)}
              </span>
            }
            menuItems={getTimeEstimateMenuOptions(setTaskTimeEstimate)}
          />
        </div>
      </div>
    </form>
  );
};

export default TaskForm;
