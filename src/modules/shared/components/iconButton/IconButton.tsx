import React, { FC } from "react";
import styles from "./IconButton.module.scss";
import cx from "classnames/bind";

const cxBind = cx.bind(styles);

interface IIconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
}

export const IconButton: FC<IIconButtonProps> = ({ icon, ...props }) => {
  return (
    <button {...props} className={cxBind(props.className, "button")}>
      {icon}
    </button>
  );
};
