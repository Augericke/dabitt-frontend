import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { BsPlusCircle } from "react-icons/bs";
import { CategoryModel, IconColors, TaskModel } from "../../../../types/task";
import taskService from "../../../../utils/services/task";
import Popover from "../../popover";
import { getSelectableColorClass } from "../../../../utils/selectableColorClass";

const styles = require("./taskForm.module.scss");

type TaskFormProps = {
  category: CategoryModel;
  tasks: TaskModel[];
  setTasks: React.Dispatch<React.SetStateAction<TaskModel[]>>;
  categoryColor: IconColors;
};

const TaskForm: React.FC<TaskFormProps> = ({
  category,
  tasks,
  setTasks,
  categoryColor,
}) => {
  const { getAccessTokenSilently } = useAuth0();
  const { textColor, outlineColor } = getSelectableColorClass(
    styles,
    categoryColor,
  );
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [taskTimeEstimate, setTaskTimeEstimate] = useState({
    displayText: "15 minutes",
    minutes: 15,
  });

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
      if (newTaskDescription) {
        const token = await getAccessTokenSilently({
          audience: "API/dabitt",
          scope: "",
        });

        const data = {
          categoryId: category.id,
          description: newTaskDescription,
          estimateMinutes: taskTimeEstimate.minutes,
        };

        const header = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const addedTask = await taskService.create(data, header);

        setTasks([...tasks, addedTask]);
        setNewTaskDescription("");
        setTaskTimeEstimate({
          displayText: "15 minutes",
          minutes: 15,
        });
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
        <span className={`${styles.addIcon} ${textColor}`}>
          <BsPlusCircle />
        </span>
      </button>
      <div className={styles.inputsContainer}>
        <textarea
          ref={textRef}
          className={`${styles.taskInput} ${outlineColor}`}
          placeholder="add task"
          value={newTaskDescription}
          onChange={handleDescription}
          onKeyDown={taskEnterSubmit}
          maxLength={140}
        />
        {/* TODO: break inputs into their own components */}
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
                {taskTimeEstimate.displayText}
              </span>
            }
            menuItems={[
              {
                content: <span>15 minutes</span>,
                onClick: () =>
                  setTaskTimeEstimate({
                    displayText: "15 minutes",
                    minutes: 15,
                  }),
              },
              {
                content: <span>30 minutes</span>,
                onClick: () =>
                  setTaskTimeEstimate({
                    displayText: "30 minutes",
                    minutes: 30,
                  }),
              },
              {
                content: <span>1 hour</span>,
                onClick: () =>
                  setTaskTimeEstimate({
                    displayText: "1 hour",
                    minutes: 60,
                  }),
              },
              {
                content: <span>2 hour</span>,
                onClick: () =>
                  setTaskTimeEstimate({
                    displayText: "2 hours",
                    minutes: 120,
                  }),
              },
            ]}
          />
        </div>
      </div>
    </form>
  );
};

export default TaskForm;
