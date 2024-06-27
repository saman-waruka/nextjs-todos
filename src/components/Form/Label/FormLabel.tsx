import React, { LabelHTMLAttributes, ReactNode } from "react";

interface IFormLabelProps {
  className?: string;
  text?: string;
}

const FormLabel = ({ className, text }: IFormLabelProps) => {
  return <label className={className}>{text}</label>;
};

export default FormLabel;
