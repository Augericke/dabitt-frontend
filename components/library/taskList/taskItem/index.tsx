import React, { useRef, useEffect, useState } from "react";
import TickBox from "../../tickBox";
import Popover from "../../popover";
import { motion } from "framer-motion";
import { CategoryModel } from "../../../../types/category";
import { TaskModel } from "../../../../types/task";
import DeleteModal from "../../modal/deleteModal";
import { add } from "date-fns";
import { displayHourMinutes } from "../../../../utils/dateComputer";
import { onEnterDownBlur } from "../../../../utils/formControllers";
import WordCount from "../../wordCount";
import { getSelectableColorClass } from "../../../../utils/selectableColorClass";
import { getMenuItems } from "./taskMenuOptions";
import { getLinkMenuItems } from "../taskForm/taskLinkMenuOptions";
import { getTimeEstimateMenuOptions } from "../taskForm/timeEstimateMenuOptions";
import useFontFaceObserver from "use-font-face-observer";
import { useWindowSize } from "../../../../utils/hooks/useWindowSize";
import { useUpdateTask } from "../../../../utils/hooks/query/task/useUpdateTask";
import { useKickTask } from "../../../../utils/hooks/query/task/useKickTask";
import { useDeleteTask } from "../../../../utils/hooks/query/task/useDeleteTask";

const styles = require("./taskItem.module.scss");

type TaskItemProps = {
  selectedDate: Date;
  category: CategoryModel;
  task: TaskModel;
};

const TaskItem: React.FC<TaskItemProps> = ({
  selectedDate,
  category,
  task,
}) => {
  // Task Mutations
  const updateTask = useUpdateTask(category.id, selectedDate);
  const updateTaskToCurrent = useUpdateTask(category.id, selectedDate, true);
  const kickTask = useKickTask(category.id, task.id, selectedDate);
  const deleteTask = useDeleteTask(category.id, task.id, selectedDate);

  // Modal / Tick Box
  const [showModal, setShowModal] = useState(false);
  const isTicked = task.completedAt != null;

  // Text Area
  const { borderColor } = getSelectableColorClass(styles, category.iconColor);
  const [taskDescription, setTaskDescription] = useState(task.description);
  const descriptionLimit = 140;
  const [inFocus, setInFocus] = useState(false);

  // Task Link
  const [taskLink, setTaskLink] = useState(task.externalURL ?? "");
  const taskChanged = taskLink !== task.externalURL && taskLink !== "";

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

  // Avoid users adding line breaks
  const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTaskDescription(event.target.value.replace(/\n/g, ""));
  };

  // Only update and trim whitespace if there is a task description / task description has changed
  const onBlur = () => {
    const newDescription =
      taskDescription === "" ? task.description : taskDescription.trim();
    if (newDescription && newDescription !== task.description) {
      updateTask.mutate({
        categoryId: category.id,
        taskId: task.id,
        data: { description: taskDescription },
      });
    }

    setTaskDescription(newDescription);
    setInFocus(false);
  };

  const onTick = () => {
    let completedAt: Date | null = null;
    let startAt = task.startAt;
    if (!isTicked) {
      completedAt = new Date();
      startAt = null;
    }

    updateTaskToCurrent.mutate({
      categoryId: category.id,
      taskId: task.id,
      data: { completedAt, startAt },
    });
  };

  const onTimeChange = (newEstimate: number) => {
    updateTask.mutate({
      categoryId: category.id,
      taskId: task.id,
      data: { estimateMinutes: newEstimate },
    });
  };

  const onCanKick = () => {
    const tomorrow = add(new Date(), { days: 1 });
    kickTask.mutate({
      categoryId: category.id,
      taskId: task.id,
      data: { startAt: tomorrow },
    });
  };

  const onLinkChange = (newLink: string) => {
    updateTask.mutate({
      categoryId: category.id,
      taskId: task.id,
      data: { externalURL: newLink },
    });
  };

  return (
    <>
      <motion.li
        className={styles.taskItem}
        key={task.id}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
        }}
        exit={{
          margin: 0,
          padding: 0,
          height: 0,
          opacity: 0,
          transition: { duration: 0.33 },
        }}
        transition={{ duration: 0.33, delay: 0.33 }}
      >
        <TickBox
          isTicked={isTicked}
          onClick={onTick}
          categoryColor={category.iconColor}
        />
        <div className={styles.taskInputContainer}>
          <textarea
            ref={textRef}
            id="textarea"
            className={`${styles.taskInput} ${borderColor}`}
            placeholder="add task"
            spellCheck={inFocus}
            value={taskDescription}
            onChange={onChangeHandler}
            onKeyDown={onEnterDownBlur}
            onFocus={() => setInFocus(true)}
            onBlur={onBlur}
            maxLength={descriptionLimit}
          />
          {inFocus && (
            <>
              <WordCount
                content={taskDescription}
                characterLimit={descriptionLimit}
                color={category.iconColor}
                customClass={styles.customWordCount}
              />
            </>
          )}
        </div>
        <div className={styles.taskAdditionalInfoContainer}>
          <Popover
            iconType={task.externalURL ? "link" : "unlink"}
            menuItems={getLinkMenuItems(
              taskLink,
              setTaskLink,
              onLinkChange,
              task.externalURL,
            )}
          />
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
            menuItems={getMenuItems(
              isTicked,
              textRef,
              selectedDate,
              onCanKick,
              onTick,
              () => {
                setShowModal(true);
              },
            )}
          />
        </span>
      </motion.li>
      <DeleteModal
        isVisible={showModal}
        content="Are you sure you want to delete this task?"
        onClose={() => {
          setShowModal(false);
        }}
        onDelete={() =>
          deleteTask.mutate({ categoryId: category.id, taskId: task.id })
        }
      />
    </>
  );
};

export default TaskItem;
