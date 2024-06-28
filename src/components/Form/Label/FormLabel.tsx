import classNames from "classnames";
import React, { LabelHTMLAttributes, ReactNode } from "react";

interface IFormLabelProps {
  className?: string;
  text?: string;
}

const FormLabel = ({ className, text }: IFormLabelProps) => {
  return (
    <label className={classNames("mx-auto my-auto", className)}>{text}</label>
  );
};

export default FormLabel;
