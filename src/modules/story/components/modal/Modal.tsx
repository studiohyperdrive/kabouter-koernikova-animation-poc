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
  onOpen?: () => void;
}

export const Modal: FC<IModalProps> = ({
  children,
  isOpen,
  className,
  onClose,
  onOpen,
}) => {
  return (
    <Popup
      open={isOpen}
      position="center center"
      closeOnDocumentClick
      onClose={onClose}
      className="chapter-select"
      onOpen={onOpen}
    >
      <div className={cxBind("modal", className)}>{children}</div>
    </Popup>
  );
};
