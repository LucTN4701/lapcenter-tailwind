import React from "react";

//text => text, number
//value => gia tri cua input
//onChange => function
// field => ten gia tri

const Input = ({
  type,
  value,
  handleChange,
  placeholder,
  className,
  field,
  isTextarea,
  rows,
}) => {
  return (
    <>
      {isTextarea ? (
        <textarea
          type="text"
          rows={rows}
          value={value}
          onChange={(e) => handleChange(e.target.value, field)}
          placeholder={placeholder}
          className={className}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => handleChange(e.target.value, field)}
          placeholder={placeholder}
          className={className}
        />
      )}
      
    </>
  );
};

export default Input;
