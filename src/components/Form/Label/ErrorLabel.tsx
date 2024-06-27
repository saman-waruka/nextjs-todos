import React, { FC } from "react";
import FormLabel from "./FormLabel";
import classNames from "classnames";

interface IErrorLabelProps {
  text?: string;
  className?: string;
}

const ErrorLabel = ({ text, className }: IErrorLabelProps) => {
  return (
    <FormLabel className={classNames("text-red-600", className)} text={text} />
  );
};

export default ErrorLabel;
