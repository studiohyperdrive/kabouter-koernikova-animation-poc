import { FC, useEffect, useState } from "react";
import { IAnimation, IScene } from "../../types";
import { LottieAnimation } from "../lottieAnimation";
import styles from "./AnimationController.module.scss";
import classNames from "classnames";
import { Button, HomeIcon, MusicNoteIcon } from "../../../shared/components";
import { useNavigate } from "react-router-dom";
import { APP_PATHS } from "../../../app/app.paths";
import { SceneSelect } from "../sceneSelect";

interface IAnimationControllerProps {
  scenesData: IScene[];
}

// enum ESceneChangeAction {
//   NEXT = "NEXT",
//   PREVIOUS = "PREVIOUS",
//   SELECT = "SELECT",
// }

export const AnimationController: FC<IAnimationControllerProps> = ({
  scenesData,
}) => {
  const [sceneIndex, setSceneIndex] = useState<number>(0);
  const [currentScene, setCurrentScene] = useState<IScene>();
  const [inTransition, setInTransition] = useState<boolean>(false);
  const [currentTransition, setCurrentTransition] = useState<
    IAnimation | undefined
  >(undefined);
  // const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const navigate = useNavigate();

  const changeScene = (index: number) => {
    if (currentScene?.transitionAnimation) {
      setInTransition(true);
      setTimeout(() => {
        setSceneIndex(index);
        setCurrentScene(scenesData[index]);
      }, 1000);

      setTimeout(() => {
        if (currentScene.transitionAnimation) {
          setCurrentTransition({
            animationData: currentScene.transitionAnimation?.animationData,
            animationAssetsPath:
              currentScene.transitionAnimation?.animationAssetsPath,
          });
        } else {
          setCurrentTransition(undefined);
        }
        setInTransition(false);
      }, 2000);
    } else {
      setSceneIndex(index);
      setCurrentScene(scenesData[index]);
    }
  };

  // const onSceneChange = (action: ESceneChangeAction, index?: number) => {
  //   switch (action) {
  //     case ESceneChangeAction.NEXT:
  //       changeScene((sceneIndex + 1) % scenesData.length);
  //       break;
  //     case ESceneChangeAction.PREVIOUS:
  //       changeScene(sceneIndex === 0 ? scenesData.length - 1 : sceneIndex - 1);
  //       break;
  //     case ESceneChangeAction.SELECT:
  //       changeScene(index as number);
  //       break;
  //     default:
  //       break;
  //   }
  // };

  const onClickReturnToOverview = () => {
    navigate(APP_PATHS.overview);
  };

  useEffect(() => {
    if (scenesData.length !== 0) {
      const scene = scenesData[sceneIndex];
      setCurrentScene(scene);

      if (scene?.transitionAnimation) {
        setCurrentTransition({
          animationData: scene.transitionAnimation.animationData,
          animationAssetsPath: scene.transitionAnimation.animationAssetsPath,
        });
      } else {
        setCurrentTransition(undefined);
      }
    }
  }, [scenesData]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={classNames(styles["story-container"])}>
      {scenesData && (
        <>
          {currentScene && (
            <div className={classNames(styles["animation-container"])}>
              <div className={classNames(styles["scene-navigation"])}>
                <div>
                  <Button
                    icon={<HomeIcon />}
                    onClick={onClickReturnToOverview}
                    className={styles["back-btn"]}
                  />

                  <SceneSelect
                    onSelectScene={(sceneIndex: number) =>
                      changeScene(sceneIndex)
                    }
                    currentSceneIndex={sceneIndex + 1}
                    totalScenes={scenesData.length}
                    scenes={scenesData}
                  />
                </div>

                {/* <div>language select</div> */}

                <div>
                  <Button icon={<MusicNoteIcon />} />
                </div>

                {/* <button
                  onClick={() => onSceneChange(ESceneChangeAction.PREVIOUS)}
                >
                  previous
                </button>

                <div style={{ display: "flex", gap: ".5rem" }}>
                  {scenesData.map((_scene, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        onSceneChange(ESceneChangeAction.SELECT, index)
                      }
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => onSceneChange(ESceneChangeAction.PREVIOUS)}
                >
                  next
                </button>

                <button onClick={() => setIsPlaying(!isPlaying)}>
                  {isPlaying ? "Pause" : "Play"}
                </button> */}
              </div>

              {inTransition && currentTransition && (
                <LottieAnimation
                  animationData={currentTransition.animationData}
                  animationAssetsPath={currentTransition.animationAssetsPath}
                  zIndex={10}
                  play={inTransition}
                />
              )}

              <LottieAnimation
                animationData={currentScene.animation.animationData}
                animationAssetsPath={currentScene.animation.animationAssetsPath}
                audio={currentScene.animation.audio}
                interactive={currentScene.interactive}
                autoplay={true}
                loop={true}
                // isPlaying={isPlaying}
                inTransition={inTransition}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
