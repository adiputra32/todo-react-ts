import { Task } from "../../types/Task";
import { useState } from "react";
import PlusFloating from "../../assets/plus-floating";
import Confirmation from "../../components/ui/confirmation";
import { useNavigate } from "react-router-dom";
import useTaskStore from "../../lib/task/store";
import styles from "../../styles/home-page.module.css";

type TaskListProps = {
  tasks: Task[];
};

const TaskList = ({ tasks }: TaskListProps) => {
  const navigate = useNavigate();
  const { removeTask } = useTaskStore();
  const [removeConfirmation, setRemoveConfirmation] = useState<boolean>(false);
  const [removeId, setRemoveId] = useState<number | null>(null);

  const handleRemove = (key: number) => {
    setRemoveConfirmation(true);
    setRemoveId(key);
  };

  const closeConfirmation = () => {
    setRemoveConfirmation(false);
    setRemoveId(null);
  };

  const positiveBtnHandler = () => {
    if (removeId !== null) {
      removeTask(removeId);
      setRemoveConfirmation(false);
    }
  };

  return (
    <>
      <div className={styles["task-list-wrapper"]}>
        <div className={styles["task-list"]}>
          {tasks.map((value, key) => (
            <div
              key={key}
              className={styles["task-item"]}
              style={{ backgroundColor: value.color }}
            >
              <div
                className={styles["task-item-content"]}
                onClick={() => navigate(`/edit-list/${key}`)}
              >
                <span className={styles["task-item-title"]}>{value.title}</span>
                <span className={styles["task-item-label"]}>{value.label}</span>
              </div>
              <button
                className={`${styles["task-item-remove"]} ${
                  removeId === key && styles["active"]
                }`}
                onClick={() => handleRemove(key)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-trash"
                >
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      <button
        className={styles["button-new-list-floating"]}
        onClick={() => navigate("/new-list")}
      >
        <PlusFloating />
      </button>

      {removeConfirmation && (
        <Confirmation
          positiveBtnHandler={positiveBtnHandler}
          message="Deleting your data is irreversible. Confirm delete?"
          closeConfirmation={closeConfirmation}
        />
      )}
    </>
  );
};

export default TaskList;
