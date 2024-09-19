import React from "react";

type StatButtonsProps = {
  handleClick: () => void;
  clicked: boolean;
  stat: number;
  Logo: React.ComponentType<React.SVGProps<SVGSVGElement>>; // Use ComponentType here
  fill: string;
};

const StatButtons: React.FC<StatButtonsProps> = ({
  handleClick,
  clicked,
  stat,
  Logo,
  fill,
}) => {
  return (
    <button
      onClick={handleClick}
      className={`flex items-center space-x-2 ${
        clicked === false
          ? "text-gray-600 dark:text-gray-400"
          : `text-${fill}-600`
      } transition-colors duration-300`}
    >
      <Logo fill={`${clicked ? fill : "none"}`} width={20} height={20} />
      <p className="text-gray-600 dark:text-gray-400 hover:text-black">
        {stat}{" "}
      </p>
    </button>
  );
};

export default StatButtons;
