import React, { FormEvent, useEffect, useRef, useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { CategoryModel } from "../../../../types/category";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import taskService, { CreateTask } from "../../../../utils/services/task";
import Popover from "../../popover";
import { getSelectableColorClass } from "../../../../utils/selectableColorClass";
import { displayHourMinutes } from "../../../../utils/dateComputer";
import { getTimeEstimateMenuOptions } from "./timeEstimateMenuOptions";

const styles = require("./taskForm.module.scss");

type TaskFormProps = {
  selectedDate: Date;
  category: CategoryModel;
};

const TaskForm: React.FC<TaskFormProps> = ({ selectedDate, category }) => {
  const queryClient = useQueryClient();
  const { textColor, outlineColor } = getSelectableColorClass(
    styles,
    category.iconColor,
  );
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [taskTimeEstimate, setTaskTimeEstimate] = useState(15);

  const { mutate, isLoading, error } = useMutation(
    (newTask: CreateTask) => createTask(newTask),
    {
      onSuccess: () => {
        setNewTaskDescription("");
        setTaskTimeEstimate(15);
        queryClient.invalidateQueries(["tasks", category.id]);
      },
      onError: () => {
        console.log(error);
      },
    },
  );

  // Resize textArea based on description length
  const textRef = useRef<any>();
  useEffect(() => {
    textRef.current.style.height = "0px";
    const scrollHeight = textRef.current.scrollHeight;
    textRef.current.style.height = `${scrollHeight}px`;
  }, [newTaskDescription]);

  const createTask = async (data: CreateTask) => {
    const addedTask = await taskService.create(data);
    return addedTask;
  };

  const handleDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewTaskDescription(event.target.value.replace(/\n/g, ""));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newTaskDescription) {
      const newTaskData = {
        categoryId: category.id,
        description: newTaskDescription,
        estimateMinutes: taskTimeEstimate,
        startAt: selectedDate,
      };
      mutate({ categoryId: category.id, data: newTaskData });
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
