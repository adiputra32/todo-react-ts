import EmptyTaskList from "../../assets/empty-task-list";
import styles from "../../styles/home-page.module.css";
import Plus from "../../assets/plus";
import { useNavigate } from "react-router-dom";

const TaskListEmpty = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles["empty-list"]}>
        <EmptyTaskList />

        <div className={styles["empty-list-description-wrapper"]}>
          <span className={styles["empty-list-description"]}>
            Create your first to-do list...
          </span>
          <button
            className={styles["button-new-list"]}
            onClick={() => navigate("/new-list")}
          >
            <Plus />
            New List
          </button>
        </div>
      </div>
    </>
  );
};

export default TaskListEmpty;
