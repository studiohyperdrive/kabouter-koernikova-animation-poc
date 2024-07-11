import { FC, useState } from "react";
import {
  Button,
  BookmarkIcon,
  CloseIcon,
  SceneBookmarkIcon,
  CurrentSceneBookmarkIcon,
  PlayButtonIcon,
} from "../../../shared/components";
import styles from "./SceneSelect.module.scss";
import classNames from "classnames";
import Popup from "reactjs-popup";
import { IScene } from "../../types";

interface ISceneSelectProps {
  onSelectScene: (sceneIndex: number) => void;
  totalScenes: number;
  currentSceneIndex: number;
  scenes: IScene[];
}

export const SceneSelect: FC<ISceneSelectProps> = ({
  onSelectScene,
  currentSceneIndex,
  totalScenes,
  scenes,
}) => {
  const [popupIsOpen, setPopupIsOpen] = useState<boolean>(false);

  const onSelect = (sceneIndex: number) => {
    onSelectScene(sceneIndex);
    setPopupIsOpen(false);
  };

  return (
    <>
      <div className={classNames(styles["scene-select-container"])}>
        <Button
          icon={<BookmarkIcon />}
          onClick={() => setPopupIsOpen(!popupIsOpen)}
          variant="secondary"
          className={classNames(styles.button)}
        />
        <div className={classNames(styles.pagination)}>
          {currentSceneIndex}/{totalScenes}
        </div>
      </div>

      <Popup open={popupIsOpen} position="center center" className="my-popup">
        <div className={classNames(styles.modal)}>
          <Button
            icon={<CloseIcon />}
            className={classNames(styles["close-btn"])}
            variant="tertiary"
            onClick={() => setPopupIsOpen(false)}
          />

          <div className={classNames(styles["scene-select-grid"])}>
            {scenes.map((scene, index) => (
              <div
                className={classNames(styles.scene)}
                onClick={() => onSelect(index)}
              >
                <div className={classNames(styles["icon-container"])}>
                  <PlayButtonIcon />
                </div>

                <div className={classNames(styles["bookmark-container"])}>
                  {currentSceneIndex === index + 1 ? (
                    <CurrentSceneBookmarkIcon />
                  ) : (
                    <SceneBookmarkIcon />
                  )}

                  <span>{index + 1}</span>
                </div>

                <div
                  className={classNames(styles["scene-thumbnail-container"])}
                >
                  <img src={scene.thumbnail} alt={scene.name} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Popup>
    </>
  );
};
