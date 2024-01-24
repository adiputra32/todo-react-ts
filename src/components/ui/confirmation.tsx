import Alert from "../../assets/alert";
import styles from "../../styles/confirmation.module.css";

type Props = {
  positiveBtnHandler: () => void;
  closeConfirmation: () => void;
  message: string;
};

const Confirmation = ({
  positiveBtnHandler,
  message,
  closeConfirmation,
}: Props) => {
  return (
    <>
      <div className={styles["confirmation-overlay"]}>
        <div className={styles["confirmation-container"]}>
          <Alert color={"#ff0000"} />
          <span className={styles["title"]}>Warning</span>
          <span className={styles["message"]}>{message}</span>
          <div className={styles["action-container"]}>
            <button
              className={`${styles["button"]} ${styles["positive"]}`}
              onClick={positiveBtnHandler}
            >
              OK
            </button>
            <button
              className={`${styles["button"]} ${styles["negative"]}`}
              onClick={closeConfirmation}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Confirmation;
