import React, { FC } from "react";
import styles from "./Button.module.scss";
import cx from "classnames/bind";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  icon?: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary";
}

const cxBind = cx.bind(styles);

export const Button: FC<IButtonProps> = ({ text, icon, variant, ...props }) => {
  return (
    <button
      {...props}
      className={cxBind(props.className, "button", {
        "button--secondary": variant === "secondary",
        "button--tertiary": variant === "tertiary",
      })}
    >
      {text}
      {icon}
    </button>
  );
};
