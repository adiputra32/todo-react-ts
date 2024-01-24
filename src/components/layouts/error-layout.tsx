import styles from "../../styles/error-layout.module.css";

type Props = {
  error: string;
};

const ErrorLayout = ({ error }: Props) => {
  return (
    <>
      <div className={styles["error-layout"]}>
        <h1 className={styles["error-children"]}>{error}</h1>
      </div>
    </>
  );
};

export default ErrorLayout;
