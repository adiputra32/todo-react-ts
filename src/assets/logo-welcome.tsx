type Props = {
  className?: string;
};

const LogoWelcome = ({ className }: Props) => {
  return (
    <>
      <svg
        width="72"
        height="56"
        viewBox="0 0 72 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M47.4003 1.88721H9.51875C4.78276 1.88721 0.943481 5.72649 0.943481 10.4625V46.5377C0.943481 51.2737 4.78276 55.113 9.51875 55.113H47.4003C52.1363 55.113 55.9756 51.2737 55.9756 46.5377V10.4625C55.9756 5.72649 52.1363 1.88721 47.4003 1.88721Z"
          fill="black"
          stroke="white"
          strokeWidth="1.77419"
        />
        <path
          className={className}
          d="M28.0723 14.4248L40.2414 28.3245L68.0565 4"
          stroke="white"
          strokeWidth="6.94984"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
};

export default LogoWelcome;
