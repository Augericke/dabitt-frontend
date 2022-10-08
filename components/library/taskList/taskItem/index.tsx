import React, { useRef, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import TickBox from "../../tickBox";
import Popover from "../../popover";
import { getMenuItems } from "./taskMenuOptions";
import { CategoryModel } from "../../../../types/category";
import { TaskModel } from "../../../../types/task";
import taskService, {
  DeleteTask,
  UpdateTask,
} from "../../../../utils/services/task";
import { getSelectableColorClass } from "../../../../utils/selectableColorClass";
import useFontFaceObserver from "use-font-face-observer";
import { add } from "date-fns";
import { displayHourMinutes } from "../../../../utils/dateComputer";
import { getTimeEstimateMenuOptions } from "../taskForm/timeEstimateMenuOptions";
import { useWindowSize } from "../../../../utils/hooks/useWindowSize";
import DeleteModal from "../../modal/deleteModal";
import { onEnterDownBlur } from "../../../../utils/formControllers";

const styles = require("./taskItem.module.scss");

type TaskItemProps = {
  category: CategoryModel;
  task: TaskModel;
};

const TaskItem: React.FC<TaskItemProps> = ({ category, task }) => {
  const queryClient = useQueryClient();

  // Modal / Tick Box
  const [showModal, setShowModal] = useState(false);
  const isTicked = task.completedAt != null;

  // Text Area
  const { borderColor } = getSelectableColorClass(styles, category.iconColor);
  const [taskDescription, setTaskDescription] = useState(task.description);
  const [checkSpelling, setCheckSpelling] = useState(false);

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

  const updateMutation = useMutation(
    (updatedTask: UpdateTask) => updateTask(updatedTask),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["tasks", category.id]);
      },
      onError: () => {
        console.log(updateMutation.error);
      },
    },
  );

  const deleteMutation = useMutation(
    (deletedTask: DeleteTask) => deleteTask(deletedTask),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["tasks", category.id]);
      },
      onError: () => {
        console.log(deleteMutation.error);
      },
    },
  );

  // Avoid users adding line breaks
  const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTaskDescription(event.target.value.replace(/\n/g, ""));
  };

  // Only update and trim whitespace if there is a task description / task description has changed
  const onBlur = () => {
    const newDescription =
      taskDescription === "" ? task.description : taskDescription.trim();
    if (newDescription && newDescription !== task.description) {
      updateMutation.mutate({
        categoryId: category.id,
        taskId: task.id,
        data: { description: taskDescription },
      });
    }

    setTaskDescription(newDescription);
    setCheckSpelling(false);
  };

  const onTick = () => {
    let completedAt: Date | null = null;
    if (!isTicked) {
      completedAt = new Date();
    }

    updateMutation.mutate({
      categoryId: category.id,
      taskId: task.id,
      data: { completedAt },
    });
  };

  const onTimeChange = (newEstimate: number) => {
    updateMutation.mutate({
      categoryId: category.id,
      taskId: task.id,
      data: { estimateMinutes: newEstimate },
    });
  };

  const onCanKick = () => {
    const tomorrow = add(new Date(), { days: 1 });
    updateMutation.mutate({
      categoryId: category.id,
      taskId: task.id,
      data: { startAt: tomorrow },
    });
  };

  const updateTask = async (updateData: UpdateTask) => {
    const updatedTask = await taskService.update(updateData);
    return updatedTask;
  };

  const deleteTask = async ({ categoryId, taskId }: DeleteTask) => {
    const deletedTask = await taskService.destroy({ categoryId, taskId });
    return deletedTask;
  };

  return (
    <>
      <li className={styles.taskItem}>
        <TickBox
          isTicked={isTicked}
          onClick={onTick}
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
          onKeyDown={onEnterDownBlur}
          onFocus={() => setCheckSpelling(true)}
          onBlur={onBlur}
          maxLength={140}
        />
        <div className={styles.taskTimeEstimateContainer}>
          <Popover
            iconType="clock"
            iconText={
              <span className={styles.estimateLabel}>
                {displayHourMinutes(task.estimateMinutes)}
              </span>
            }
            menuItems={getTimeEstimateMenuOptions(onTimeChange)}
          />
        </div>
        <span className={styles.popoverContainer}>
          <Popover
            customMenuClass={styles.customTaskMenu}
            menuItems={getMenuItems(textRef, onCanKick, () => {
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
        onDelete={() =>
          deleteMutation.mutate({ categoryId: category.id, taskId: task.id })
        }
      />
    </>
  );
};

export default TaskItem;
