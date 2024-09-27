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
import { flatten, indexOf, reverse, splitAt } from "ramda";

interface ISceneSelectProps {
  onSelectScene: (sceneIndex: number) => void;
  scenes: IScene[];
  currentSceneIndex: number;
  onOpen: () => void;
  onClose: () => void;
  className?: string;
}

const cxBind = cx.bind(styles);

export const SceneSelect: FC<ISceneSelectProps> = ({
  onSelectScene,
  scenes,
  currentSceneIndex,
  className,
  onOpen,
  onClose,
}) => {
  const [popupIsOpen, setPopupIsOpen] = useState<boolean>(false);
  const [selectedSceneIndex, setSelectedSceneIndex] = useState<number>(0);
  const [sceneList, setSceneList] = useState<IScene[]>(scenes);

  useEffect(() => {
    let orderedSceneList = scenes;

    if (currentSceneIndex !== 0) {
      orderedSceneList = flatten(reverse(splitAt(currentSceneIndex, scenes)));
    }

    setSceneList(orderedSceneList);
  }, [currentSceneIndex]);

  const onSelect = (scene: IScene) => {
    const sceneIndex = indexOf(scene, scenes);
    onSelectScene(sceneIndex);
    setPopupIsOpen(false);
  };

  const onModalClose = () => {
    setPopupIsOpen(false);
    onClose();
  };

  const onModalOpen = () => {
    setPopupIsOpen(true);
    onOpen();
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
        onOpen={onModalOpen}
        onClose={onModalClose}
        className={cxBind("modal")}
      >
        <h2>Kies een hoofstuk</h2>

        <BaseCarousel
          onSlideChange={setSelectedSceneIndex}
          dataLength={scenes.length}
        >
          {sceneList.map((scene, index) => (
            <div className={cxBind("scene")} key={index} data-index={index}>
              {scene.name === sceneList[selectedSceneIndex].name &&
                index !== 0 && (
                  <div
                    className={`react-multi-carousel-item-button ${cxBind(
                      "icon-container"
                    )}`}
                    onClick={() => onSelect(scene)}
                  >
                    <PlayButtonIcon />
                  </div>
                )}

              <div className={cxBind("scene-thumbnail-container")}>
                <img src={scene.thumbnail} alt={scene.name} />
              </div>

              <div className={cxBind("scene-index")}>{scene.name}</div>
            </div>
          ))}
        </BaseCarousel>
      </Modal>
    </>
  );
};
