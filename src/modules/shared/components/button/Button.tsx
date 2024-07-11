import React, { FC } from "react";
import style from "./Button.module.scss";
import classNames from "classnames";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  icon?: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary";
}

export const Button: FC<IButtonProps> = ({ text, icon, variant, ...props }) => {
  return (
    <button
      {...props}
      className={classNames(props.className, style.button, {
        [style["button--secondary"]]: variant === "secondary",
        [style["button--tertiary"]]: variant === "tertiary",
      })}
    >
      {text}
      {icon}
    </button>
  );
};
