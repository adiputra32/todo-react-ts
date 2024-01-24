import styles from "../../styles/error-layout.module.css";

type Props = {
  children: string | JSX.Element | JSX.Element[];
};

const ErrorLayout = ({ children }: Props) => {
  return (
    <>
      <div className={styles["error-layout"]}>{children}</div>
    </>
  );
};

export default ErrorLayout;
