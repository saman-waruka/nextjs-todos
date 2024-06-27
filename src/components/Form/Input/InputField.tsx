import classNames from "classnames";
import React, {
  ChangeEventHandler,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
} from "react";

interface IInputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  type?: HTMLInputTypeAttribute;
  className?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const InputField = ({
  id,
  type,
  className,
  onChange,
  ...rest
}: IInputFieldProps) => {
  return (
    <input
      {...rest}
      className={classNames("bg-gray-200 rounded-sm p-2", className)}
      id={id}
      type={type ?? "text"}
      onChange={onChange}
    />
  );
};

export default InputField;
