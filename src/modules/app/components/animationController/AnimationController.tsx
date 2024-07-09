import { FC, useEffect, useState } from "react";
import { IAnimation, IScene } from "../../types";
import { LottieAnimation } from "../lottieAnimation";

interface IAnimationControllerProps {
  scenesData: IScene[];
}

enum ESceneChangeAction {
  NEXT = "NEXT",
  PREVIOUS = "PREVIOUS",
  SELECT = "SELECT",
}

export const AnimationController: FC<IAnimationControllerProps> = ({
  scenesData,
}) => {
  const [sceneIndex, setSceneIndex] = useState<number>(0);
  const [currentScene, setCurrentScene] = useState<IScene>();
  const [inTransition, setInTransition] = useState<boolean>(false);
  const [currentTransition, setCurrentTransition] = useState<
    IAnimation | undefined
  >(undefined);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    console.log("mounted");

    return () => {
      console.log("unmounted");
    };
  }, []);

  useEffect(() => {
    console.log(scenesData);
  }, [scenesData]);

  const sceneChange = (index: number) => {
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

  const onSceneChange = (action: ESceneChangeAction, index?: number) => {
    switch (action) {
      case ESceneChangeAction.NEXT:
        sceneChange((sceneIndex + 1) % scenesData.length);
        break;
      case ESceneChangeAction.PREVIOUS:
        sceneChange(sceneIndex === 0 ? scenesData.length - 1 : sceneIndex - 1);
        break;
      case ESceneChangeAction.SELECT:
        sceneChange(index as number);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (scenesData.length !== 0) {
      const scene = scenesData[sceneIndex];
      setCurrentScene(scene);

      if (scene.transitionAnimation) {
        console.log(scene.transitionAnimation);
        setCurrentTransition({
          animationData: scene.transitionAnimation.animationData,
          animationAssetsPath: scene.transitionAnimation.animationAssetsPath,
        });
      } else {
        setCurrentTransition(undefined);
      }
    }
  }, []);

  return (
    <>
      {scenesData && (
        <>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              margin: "1rem auto 0rem auto",
            }}
          >
            <button onClick={() => onSceneChange(ESceneChangeAction.PREVIOUS)}>
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

            <button onClick={() => onSceneChange(ESceneChangeAction.PREVIOUS)}>
              next
            </button>

            <button onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? "Pause" : "Play"}
            </button>
          </div>

          {currentScene && (
            <div
              style={{
                position: "relative",
                width: "100vw",
                height: "100vh",
                maxHeight: "1080px",
                maxWidth: "1920px",
              }}
            >
              {inTransition && currentTransition && (
                <>
                  <LottieAnimation
                    animationData={currentTransition.animationData}
                    animationAssetsPath={currentTransition.animationAssetsPath}
                    zIndex={10}
                    play={inTransition}
                  />
                </>
              )}

              <LottieAnimation
                animationData={currentScene.animation.animationData}
                animationAssetsPath={currentScene.animation.animationAssetsPath}
                audio={currentScene.animation.audio}
                interactive={currentScene.interactive}
                autoplay={true}
                loop={true}
                isPlaying={isPlaying}
                inTransition={inTransition}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};
