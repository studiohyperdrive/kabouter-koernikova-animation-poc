import { FC, useEffect, useState } from "react";
import { ELanguage, IAnimation, IScene } from "../../types";
import { LottieAnimation } from "../lottieAnimation";
import styles from "./AnimationController.module.scss";
import cx from "classnames/bind";
import {
  BooksIcon,
  IconButton,
  MusicNoteIcon,
  PauseIcon,
  PlayButtonIcon,
} from "../../../shared/components";
import { useNavigate } from "react-router-dom";
import { APP_PATHS } from "../../../app/app.paths";
import { SceneSelect } from "../sceneSelect";
import { LanguageSelect } from "../languageSelect";
import LanguagesJson from "../../data/languages.json";
import { is, set } from "ramda";

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
  const [currentAnimation, setCurrentAnimation] = useState<
    IAnimation | undefined
  >(undefined);
  const [isAmbientPlaying, setIsAmbientPlaying] = useState<boolean>(true);
  const [language, setLanguage] = useState<ELanguage>(ELanguage.NL);
  const [isPaused, setIspaused] = useState<boolean>(false);
  const [isSceneIdle, setIsSceneIdle] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(isSceneIdle);
  }, [isSceneIdle]);

  const changeScene = (index: number) => {
    setIsSceneIdle(false);
    if (currentScene?.transitionAnimation) {
      setInTransition(true);
      setTimeout(() => {
        setSceneIndex(index);
        setCurrentScene(scenesData[index]);
        setCurrentAnimation(scenesData[index].animation);
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
      setCurrentAnimation(scenesData[index].animation);
    }
  };

  const onClickReturnToOverview = () => {
    navigate(APP_PATHS.overview);
  };

  const onLanguageChange = (languageId: ELanguage) => {
    setLanguage(languageId);
    setIspaused(false);
  };

  useEffect(() => {
    if (scenesData.length !== 0) {
      setLanguage(ELanguage.NL);
      const scene = scenesData[sceneIndex];
      setCurrentScene(scene);
      setCurrentAnimation(scene.animation);

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

              <IconButton
                icon={<MusicNoteIcon />}
                onClick={() => setIsAmbientPlaying(!isAmbientPlaying)}
                className={cxBind("btn", "btn-audio")}
              />

              <SceneSelect
                onSelectScene={(sceneIndex: number) => changeScene(sceneIndex)}
                scenes={scenesData}
                className={cxBind("btn", "btn-chapter")}
              />

              <IconButton
                icon={isPaused ? <PlayButtonIcon /> : <PauseIcon />}
                onClick={() => setIspaused(!isPaused)}
                className={cxBind("btn", "btn-pause")}
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
                  zIndex={10}
                  play={inTransition}
                  language={language}
                />
              )}

              {currentScene.idleAnimation && (
                <LottieAnimation
                  animationData={currentScene.idleAnimation.animationData}
                  animationAssetsPath={
                    currentScene.idleAnimation.animationAssetsPath
                  }
                  zIndex={isSceneIdle ? 10 : -10}
                  play={isSceneIdle ? true : false}
                  loop={true}
                  language={language}
                />
              )}

              {currentAnimation && (
                <LottieAnimation
                  animationData={currentScene.animation.animationData}
                  animationAssetsPath={
                    currentScene.animation.animationAssetsPath
                  }
                  audio={currentScene.animation.audio}
                  interactive={currentScene.interactive}
                  autoplay={true}
                  loop={false}
                  isAmbientPlaying={isAmbientPlaying}
                  inTransition={inTransition}
                  language={language}
                  isPaused={isPaused}
                  onCompleted={setIsSceneIdle}
                />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};
