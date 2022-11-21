import React, { FormEvent, useEffect, useRef, useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { CategoryModel } from "../../../../types/category";
import Popover from "../../popover";
import { getSelectableColorClass } from "../../../../utils/selectableColorClass";
import { displayHourMinutes } from "../../../../utils/dateComputer";
import { getTimeEstimateMenuOptions } from "./timeEstimateMenuOptions";
import WordCount from "../../wordCount";
import { useCreateTask } from "../../../../utils/hooks/query/task/useCreateTask";
import { getLinkMenuItems } from "./taskLinkMenuOptions";

const styles = require("./taskForm.module.scss");

type TaskFormProps = {
  selectedDate: Date;
  category: CategoryModel;
};

const TaskForm: React.FC<TaskFormProps> = ({ selectedDate, category }) => {
  const createTask = useCreateTask(category.id, selectedDate);
  const { textColor, borderColor, outlineColor } = getSelectableColorClass(
    styles,
    category.iconColor,
  );
  const [newTaskDescription, setNewTaskDescription] = useState<
    string | undefined
  >("");
  const [taskTimeEstimate, setTaskTimeEstimate] = useState(15);
  const descriptionLimit = 140;

  // Resize textArea based on description length
  const textRef = useRef<any>();
  useEffect(() => {
    textRef.current.style.height = "0px";
    const scrollHeight = textRef.current.scrollHeight;
    textRef.current.style.height = `${scrollHeight}px`;
  }, [newTaskDescription]);

  const handleDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewTaskDescription(event.target.value.replace(/\n/g, ""));
  };

  // Task Link
  const [taskLink, setTaskLink] = useState("");
  const taskChanged = taskLink !== "";

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newTaskDescription) {
      const newTaskData = {
        categoryId: category.id,
        description: newTaskDescription,
        estimateMinutes: taskTimeEstimate,
        externalURL: taskLink,
        startAt: selectedDate,
      };

      createTask.mutate({ categoryId: category.id, data: newTaskData });
      setNewTaskDescription("");
      setTaskTimeEstimate(15);
    }
  };

  const taskEnterSubmit = (event: any) => {
    if (event.key === "Enter" && event.shiftKey == false) {
      event.preventDefault();
      return onSubmit(event);
    }
  };

  return (
    <form className={styles.taskForm} onSubmit={onSubmit}>
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
        <div className={styles.taskInputContainer}>
          <textarea
            ref={textRef}
            className={`${
              newTaskDescription
                ? `${styles.taskInputPopulated} ${borderColor}`
                : `${styles.taskInput} ${borderColor}`
            } ${outlineColor}`}
            placeholder="add task"
            value={newTaskDescription}
            onChange={handleDescription}
            onKeyDown={taskEnterSubmit}
            maxLength={descriptionLimit}
          />
          {newTaskDescription && (
            <>
              <WordCount
                content={newTaskDescription}
                characterLimit={descriptionLimit}
                color={category.iconColor}
                customClass={styles.customWordCount}
              />
            </>
          )}
        </div>
        {newTaskDescription && (
          <div className={styles.taskAdditionalInfoContainer}>
            <Popover
              iconType={taskChanged ? "link" : "unlink"}
              menuItems={getLinkMenuItems(
                taskLink,
                setTaskLink,
                taskChanged,
                () => {},
              )}
            />
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
        )}
      </div>
    </form>
  );
};

export default TaskForm;
