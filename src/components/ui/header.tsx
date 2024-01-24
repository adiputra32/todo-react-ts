type Props = {
  children?: JSX.Element | JSX.Element[];
  className?: string;
};

const Header = ({ children, className }: Props) => {
  return (
    <>
      <div className={className}>{children}</div>
    </>
  );
};

export default Header;
