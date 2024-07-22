import { FC, useEffect, useState } from "react";
import {
  PlayButtonIcon,
  IconButton,
  TilesIcon,
} from "../../../shared/components";
import styles from "./SceneSelect.module.scss";
import cx from "classnames/bind";
import { IScene } from "../../types";
import "react-multi-carousel/lib/styles.css";
import { Modal } from "../modal";
import { BaseCarousel } from "../baseCarousel";

interface ISceneSelectProps {
  onSelectScene: (sceneIndex: number) => void;
  scenes: IScene[];
  className?: string;
}

const cxBind = cx.bind(styles);

export const SceneSelect: FC<ISceneSelectProps> = ({
  onSelectScene,
  scenes,
  className,
}) => {
  const [popupIsOpen, setPopupIsOpen] = useState<boolean>(false);
  const [currentSceneIndex, setCurrentSceneIndex] = useState<number>(0);

  const onSelect = (sceneIndex: number) => {
    onSelectScene(sceneIndex);
    setPopupIsOpen(false);
  };

  return (
    <>
      <div className={cxBind("scene-select-container", className)}>
        <IconButton
          icon={<TilesIcon />}
          onClick={() => setPopupIsOpen(!popupIsOpen)}
          className={cxBind("button")}
        />
      </div>

      <Modal
        isOpen={popupIsOpen}
        onClose={() => setPopupIsOpen(false)}
        className={cxBind("modal")}
      >
        <h2>Kies een hoofstuk</h2>

        <BaseCarousel
          currentItemIndex={currentSceneIndex}
          onSlideChange={setCurrentSceneIndex}
          dataLength={scenes.length}
        >
          {scenes.map((scene, index) => (
            <div className={cxBind("scene")} key={index} data-index={index}>
              {index === currentSceneIndex && (
                <div
                  className={`react-multi-carousel-item-button ${cxBind(
                    "icon-container"
                  )}`}
                  onClick={() => onSelect(index)}
                >
                  <PlayButtonIcon />
                </div>
              )}

              <div className={cxBind("scene-thumbnail-container")}>
                <img src={scene.thumbnail} alt={scene.name} />
              </div>

              <div className={cxBind("scene-index")}>{index + 1}</div>
            </div>
          ))}
        </BaseCarousel>
      </Modal>
    </>
  );
};
