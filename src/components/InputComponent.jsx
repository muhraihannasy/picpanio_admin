import React from "react";

const InputComponent = ({
  label,
  field,
  type,
  placeHolder = "",
  style,
  require,
  setValue,
  value,
}) => {
  return (
    <div className="flex flex-col">
      {style == "outline" && (
        <>
          <label htmlFor={field} className="mb-[8px] text-[18px]">
            {label}
          </label>
          <input
            type={type}
            id={field}
            required={require}
            placeholder={placeHolder}
            className="h-[42px] border-2 rounded-[4px] pl-4 text-fivety outline-none"
            onChange={(e) => setValue({ ...value, [field]: e.target.value })}
            value={value[field]}
          />
        </>
      )}
      {style == "background" && (
        <>
          <label htmlFor={field} className="mb-[8px] text-[18px] text-white">
            {label}
          </label>
          <input
            type={type}
            id={field}
            required={require}
            placeholder={placeHolder}
            className="h-[42px] bg-white rounded-[4px] pl-4 text-fivety outline-none"
            onChange={(e) => setValue({ ...value, [field]: e.target.value })}
            value={value[field]}
          />
        </>
      )}
    </div>
  );
};

export default InputComponent;
