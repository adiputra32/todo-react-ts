type Props = {
  children: string | JSX.Element | JSX.Element[];
};

const ErrorLayout = ({ children }: Props) => {
  return (
    <>
      <div className="error-layout">{children}</div>
    </>
  );
};

export default ErrorLayout;
