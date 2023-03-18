import React from "react";

const Button = ({
  handleCLick,
  className,
  textStyles,
  btnText,
  type,
  isDisable,
}) => {
  const btnStyles =
    type === "primary"
      ? ` bg-green-500 rounded ${
          isDisable
            ? "bg-green-300 cursor-not-allowed"
            : "hover:bg-green-600 cursor-pointer"
        }`
      : ` bg-red-500 rounded ${
          isDisable
            ? "bg-red-300 cursor-not-allowed"
            : "hover:bg-red-600 cursor-pointer"
        }`;

  return (
    <>
      <div onClick={handleCLick} className={`${className} ${btnStyles}`}>
        <p className={textStyles}>{btnText}</p>
      </div>
    </>
  );
};
export default Button;
