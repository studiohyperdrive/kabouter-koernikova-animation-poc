import React, { FC } from "react";
import Popup from "reactjs-popup";
import cx from "classnames/bind";
import styles from "./Modal.module.scss";

const cxBind = cx.bind(styles);

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export const Modal: FC<IModalProps> = ({
  children,
  isOpen,
  className,
  onClose,
}) => {
  return (
    <Popup
      open={isOpen}
      position="center center"
      closeOnDocumentClick
      onClose={onClose}
      className="chapter-select"
    >
      <div className={cxBind("modal", className)}>{children}</div>
    </Popup>
  );
};
