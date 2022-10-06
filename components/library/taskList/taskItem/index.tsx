import React, {
  useRef,
  useEffect,
  useState,
  SetStateAction,
  Dispatch,
} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import TickBox from "../../tickBox";
import Popover from "../../popover";
import { getMenuItems } from "./taskMenuOptions";
import { CategoryModel, TaskModel } from "../../../../types/task";
import taskService from "../../../../utils/services/task";
import { getSelectableColorClass } from "../../../../utils/selectableColorClass";
import useFontFaceObserver from "use-font-face-observer";
import {
  displayHourMinutes,
  getTomorrow,
} from "../../../../utils/dateComputer";
import { getTimeEstimateMenuOptions } from "../taskForm/timeEstimateMenuOptions";
import produce from "immer";
import { useWindowSize } from "../../../../utils/hooks/useWindowSize";
import DeleteModal from "../../modal/deleteModal";

const styles = require("./taskItem.module.scss");

type TaskItemProps = {
  category: CategoryModel;
  categories: CategoryModel[] | null;
  setCategories: Dispatch<SetStateAction<CategoryModel[] | null>>;
  task: TaskModel;
};

const TaskItem: React.FC<TaskItemProps> = ({
  category,
  setCategories,
  task,
}) => {
  // Modal
  const [showModal, setShowModal] = useState(false);
  // Requests
  const { getAccessTokenSilently } = useAuth0();

  // Text Area
  const { borderColor } = getSelectableColorClass(styles, category.iconColor);
  const [taskDescription, setTaskDescription] = useState(task.description);
  const [checkSpelling, setCheckSpelling] = useState(false);

  // Time Estimate
  const [taskTimeEstimate, setTaskTimeEstimate] = useState(
    task.estimateMinutes,
  );

  // Tick Box
  const [isTicked, setIsTicked] = useState(task.completedAt != null);

  // Avoid users adding line breaks
  const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTaskDescription(event.target.value.replace(/\n/g, ""));
  };

  // Only update and trim whitespace if there is a task description / task description has changed
  const onBlur = () => {
    const newDescription =
      taskDescription === "" ? task.description : taskDescription.trim();
    if (newDescription && newDescription !== task.description) {
      const updateData = {
        description: taskDescription,
      };

      updateTask(updateData);
      setCategories(
        produce((draft) => {
          if (draft) {
            const index = draft?.findIndex(
              (updatedCategory) => updatedCategory.id === category.id,
            );
            if (index !== -1) {
              const taskIndex = draft[index].tasks.findIndex(
                (updatedTask) => updatedTask.id === task.id,
              );

              if (taskIndex !== -1)
                draft[index].tasks[taskIndex].description = taskDescription;
            }
          }
        }),
      );
    }

    setTaskDescription(newDescription);
    setCheckSpelling(false);
  };

  const handleTickBox = () => {
    let completedAt: Date | null = null;
    if (!isTicked) {
      completedAt = new Date();
    }

    setIsTicked(!isTicked);
    updateTask({ completedAt: completedAt });
    setCategories(
      produce((draft) => {
        if (draft) {
          const index = draft?.findIndex(
            (updatedCategory) => updatedCategory.id === category.id,
          );
          if (index !== -1) {
            const taskIndex = draft[index].tasks.findIndex(
              (updatedTask) => updatedTask.id === task.id,
            );

            if (taskIndex !== -1)
              draft[index].tasks[taskIndex].completedAt = completedAt;
          }
        }
      }),
    );
  };

  const handleTimeChange = (newEstimate: number) => {
    const updateData = {
      estimateMinutes: newEstimate,
    };

    updateTask(updateData);
    setTaskTimeEstimate(newEstimate);
    setCategories(
      produce((draft) => {
        if (draft) {
          const index = draft?.findIndex(
            (updatedCategory) => updatedCategory.id === category.id,
          );
          if (index !== -1) {
            const taskIndex = draft[index].tasks.findIndex(
              (updatedTask) => updatedTask.id === task.id,
            );

            if (taskIndex !== -1)
              draft[index].tasks[taskIndex].estimateMinutes = newEstimate;
          }
        }
      }),
    );
  };

  const handleCanKick = () => {
    const tomorrow = getTomorrow(new Date());
    const updateData = {
      startAt: tomorrow,
    };

    updateTask(updateData);
    setCategories(
      produce((draft) => {
        if (draft) {
          const index = draft?.findIndex(
            (updatedCategory) => updatedCategory.id === category.id,
          );
          if (index !== -1) {
            const taskIndex = draft[index].tasks.findIndex(
              (updatedTask) => updatedTask.id === task.id,
            );

            if (taskIndex !== -1)
              draft[index].tasks[taskIndex].startAt = tomorrow;
          }
        }
      }),
    );
  };

  const updateTask = async (updateData: {}) => {
    try {
      if (taskDescription) {
        const token = await getAccessTokenSilently({
          audience: "API/dabitt",
          scope: "",
        });

        const header = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        await taskService.update(task.id, updateData, header);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async () => {
    try {
      const token = await getAccessTokenSilently({
        audience: "API/dabitt",
        scope: "",
      });

      const header = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await taskService.destroy(task.id, header);
      setCategories(
        produce((draft) => {
          if (draft) {
            const index = draft?.findIndex(
              (updatedCategory) => updatedCategory.id === category.id,
            );
            if (index !== -1) {
              const taskIndex = draft[index].tasks.findIndex(
                (updatedTask) => updatedTask.id === task.id,
              );

              if (taskIndex !== -1) draft[index].tasks.splice(taskIndex, 1);
            }
          }
        }),
      );
    } catch (error) {
      console.error(error);
    }
  };

  // Resize textArea based on description length
  const textRef = useRef<any>();
  const { width, height } = useWindowSize(); // ensure proper resize on screen change
  const isFontListLoaded = useFontFaceObserver([{ family: `Poppins` }]);

  // Expand Textarea to input length
  useEffect(() => {
    if (isFontListLoaded) {
      textRef.current.style.height = "0px";
      const scrollHeight = textRef.current.scrollHeight;
      textRef.current.style.height = `${scrollHeight}px`;
    }
  }, [isFontListLoaded, taskDescription, width, height]);

  return (
    <>
      <li className={styles.taskItem}>
        <TickBox
          isTicked={isTicked}
          onClick={handleTickBox}
          categoryColor={category.iconColor}
        />
        <textarea
          ref={textRef}
          id="textarea"
          className={`${styles.taskInput} ${borderColor}`}
          placeholder="add task"
          spellCheck={checkSpelling}
          value={taskDescription}
          onChange={onChangeHandler}
          onKeyDown={onEnterSubmit}
          onFocus={() => setCheckSpelling(true)}
          onBlur={onBlur}
          maxLength={140}
        />
        <div className={styles.taskTimeEstimateContainer}>
          <Popover
            iconType="clock"
            iconText={
              <span className={styles.estimateLabel}>
                {displayHourMinutes(taskTimeEstimate)}
              </span>
            }
            menuItems={getTimeEstimateMenuOptions(handleTimeChange)}
          />
        </div>
        <span className={styles.popoverContainer}>
          <Popover
            customMenuClass={styles.customTaskMenu}
            menuItems={getMenuItems(textRef, handleCanKick, () => {
              setShowModal(true);
            })}
          />
        </span>
      </li>
      <DeleteModal
        isVisible={showModal}
        content="Are you sure you want to delete this task?"
        onClose={() => {
          setShowModal(false);
        }}
        onDelete={() => deleteTask()}
      />
    </>
  );
};

export default TaskItem;

// Force loss of focus on enter (triggers updateTask)
const onEnterSubmit = (event: any) => {
  if (event.key === "Enter" && event.shiftKey == false) {
    event.target.blur();
  }
};
