import { FC, useEffect, useState } from "react";
import { ELanguage, IAnimation, IScene } from "../../types";
import { LottieAnimation } from "../lottieAnimation";
import styles from "./AnimationController.module.scss";
import cx from "classnames/bind";
import {
  BooksIcon,
  IconButton,
  PauseIcon,
  PlayButtonIcon,
} from "../../../shared/components";
import { useNavigate } from "react-router-dom";
import { APP_PATHS } from "../../../app/app.paths";
import { SceneSelect } from "../sceneSelect";
import { LanguageSelect } from "../languageSelect";
import LanguagesJson from "../../data/languages.json";
import Popup from "reactjs-popup";
import { isNil, reject } from "ramda";

interface IAnimationControllerProps {
  scenesData: IScene[];
}

const cxBind = cx.bind(styles);

export const AnimationController: FC<IAnimationControllerProps> = ({
  scenesData,
}) => {
  const [sceneIndex, setSceneIndex] = useState<number>(0);
  const [currentScene, setCurrentScene] = useState<IScene>();
  const [inTransition, setInTransition] = useState<boolean>(false);
  const [currentTransition, setCurrentTransition] = useState<
    IAnimation | undefined
  >(undefined);
  // Uncomment the following line to enable ambient audio pausing
  // const [isAmbientPlaying, setIsAmbientPlaying] = useState<boolean>(true);
  const [language, setLanguage] = useState<ELanguage>(ELanguage.NL);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [selectingScene, setSelectingScene] = useState<boolean>(false);
  const navigate = useNavigate();

  const onSceneComplete = (completed: boolean, isCurrentScene: boolean) => {
    const nextSceneIndex = sceneIndex + 1;

    if (completed && nextSceneIndex < scenesData.length && isCurrentScene) {
      changeScene(nextSceneIndex);
    }
  };

  const onSceneSelectOpen = () => {
    setSelectingScene(true);
    setIsPaused(true);
  };

  const onSceneSelectClose = () => {
    setSelectingScene(false);
    setIsPaused(false);
  };

  const changeScene = (index: number) => {
    setIsPaused(false);
    if (currentScene?.transitionAnimation) {
      setInTransition(true);

      setSceneIndex(index);
      setCurrentScene(scenesData[index]);

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
      }, 500);
    } else {
      setSceneIndex(index);
      setCurrentScene(scenesData[index]);
    }
  };

  const renderScenes = () => {
    if (currentScene) {
      const nextScene = scenesData[sceneIndex + 1];

      return reject(isNil, [currentScene, nextScene]).map((scene, index) => {
        const isCurrentScene = currentScene.name === scene.name;

        return (
          <LottieAnimation
            key={`scene-${index}`}
            animationData={scene.animation.animationData}
            animationAssetsPath={scene.animation.animationAssetsPath}
            audio={scene.animation.audio}
            interactive={scene.interactive}
            autoplay={true}
            play={isCurrentScene}
            zIndex={isCurrentScene ? 10 : 0}
            loop={false}
            // Uncomment the following line to enable ambient audio pausing
            // isAmbientPlaying={isAmbientPlaying}
            inTransition={inTransition}
            language={language}
            isPaused={isCurrentScene ? isPaused : true}
            onCompleted={(completed) =>
              onSceneComplete(completed, isCurrentScene)
            }
          />
        );
      });
    }
  };

  const onClickReturnToOverview = () => {
    navigate(APP_PATHS.overview);
  };

  const onLanguageChange = (languageId: ELanguage) => {
    setLanguage(languageId);
    setIsPaused(false);
  };

  useEffect(() => {
    if (scenesData.length !== 0) {
      setLanguage(ELanguage.NL);
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
    <div className={cxBind("story-container")}>
      {scenesData && (
        <>
          {currentScene && (
            <div className={cxBind("animation-container")}>
              <IconButton
                icon={<BooksIcon />}
                onClick={onClickReturnToOverview}
                className={cxBind("btn", "btn-back")}
              />

              {/* Uncomment the following lines to enable ambient audio pausing */}
              {/* <IconButton
                icon={<MusicNoteIcon />}
                onClick={() => setIsAmbientPlaying(!isAmbientPlaying)}
                className={cxBind("btn", "btn-audio")}
              /> */}

              <SceneSelect
                onSelectScene={(sceneIndex: number) => changeScene(sceneIndex)}
                scenes={scenesData}
                currentSceneIndex={sceneIndex}
                onOpen={onSceneSelectOpen}
                onClose={onSceneSelectClose}
                className={cxBind("btn", "btn-chapter")}
              />

              <Popup
                open={selectingScene ? false : isPaused}
                onClose={() => setIsPaused(false)}
              >
                <IconButton
                  icon={<PlayButtonIcon />}
                  onClick={() => setIsPaused(false)}
                  className={cxBind("btn")}
                />
              </Popup>

              <IconButton
                icon={isPaused ? <PlayButtonIcon /> : <PauseIcon />}
                onClick={() => setIsPaused(!isPaused)}
                className={cxBind("btn", "btn-pause", isPaused && "hidden")}
              />

              <LanguageSelect
                currentLanguageId={language}
                languages={LanguagesJson.map((language) => ({
                  ...language,
                  id: language.id as ELanguage,
                }))}
                onSelectLanguage={(languageId: ELanguage) =>
                  onLanguageChange(languageId)
                }
                className={cxBind("btn", "btn-language")}
              />

              {inTransition && currentTransition && (
                <LottieAnimation
                  animationData={currentTransition.animationData}
                  animationAssetsPath={currentTransition.animationAssetsPath}
                  zIndex={15}
                  play={inTransition}
                  language={language}
                />
              )}

              {renderScenes()}
            </div>
          )}
        </>
      )}
    </div>
  );
};
