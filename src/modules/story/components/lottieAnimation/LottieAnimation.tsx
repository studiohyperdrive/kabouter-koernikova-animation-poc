import Lottie from "lottie-react";
import { FC, useEffect, useRef } from "react";
import { ILottieAnimationProps } from "./LottieAnimation.props";
import { useAudio } from "../../hooks";
import styles from "./LottieAnimation.module.scss";
import cx from "classnames/bind";

const cxBind = cx.bind(styles);

export const LottieAnimation: FC<ILottieAnimationProps> = ({
  animationData,
  audio,
  interactive,
  animationAssetsPath,
  zIndex,
  autoplay = false,
  loop = false,
  play = true,
  isAmbientPlaying = true,
  inTransition = false,
  language,
  isPaused = false,
  onCompleted,
}) => {
  const animationRef = useRef<any>(null);
  const {
    audioTracks,
    createAudioTracks,
    playAllAudioTracks,
    pauseAllAudioTracks,
    unloadAllAudioTracks,
    fadeInAmbientTracks,
    fadeOutAllAudioTracks,
    fadeOutAmbientTracks,
    switchVoiceOverTrack,
  } = useAudio();

  useEffect(() => {
    createAudioTracks(audio, language);
  }, [animationData]);

  useEffect(() => {
    if (audioTracks) {
      playAllAudioTracks();
    }

    return () => {
      if (audioTracks) {
        unloadAllAudioTracks();
      }
    };
  }, [audioTracks]);

  useEffect(() => {
    if (animationRef.current?.animationLoaded) {
      setTimeout(() => {
        interactive?.forEach((interactivity) => {
          const interactiveElement = document.getElementById(
            interactivity.trigger
          );
          const effectElement = document.getElementById(interactivity.effect);

          if (interactiveElement && effectElement) {
            effectElement.style.display = "none";

            interactiveElement.addEventListener("click", () => {
              console.log(`${interactiveElement.id} click`);
              interactiveElement.style.display = "none";
              effectElement.style.display = "block";

              setTimeout(() => {
                interactiveElement.style.display = "block";
                effectElement.style.display = "none";
              }, 250);
            });
          }
        });
      }, 50);
    }
  }, [animationRef.current, animationData]);

  useEffect(() => {
    if (play) {
      animationRef.current.play();
    }
  }, [play]);

  useEffect(() => {
    if (isAmbientPlaying) {
      fadeInAmbientTracks();
    } else {
      fadeOutAmbientTracks();
    }
  }, [isAmbientPlaying]);

  useEffect(() => {
    if (inTransition) {
      fadeOutAllAudioTracks();
    }
  }, [inTransition]);

  useEffect(() => {
    switchVoiceOverTrack(audio, language);
    animationRef.current?.goToAndPlay(0, true);
  }, [language]);

  useEffect(() => {
    if (isPaused) {
      animationRef.current?.pause();
      pauseAllAudioTracks();
    } else {
      animationRef.current?.play();
      playAllAudioTracks();
    }
  }, [isPaused]);

  const onAnimationCompleted = () => {
    console.log("Animation completed");
    onCompleted && onCompleted(true);
  };

  return (
    <Lottie
      animationData={animationData}
      autoplay={autoplay}
      loop={loop}
      assetsPath={`assets/${animationAssetsPath}/images/`}
      lottieRef={animationRef}
      style={{ zIndex: zIndex, position: "absolute", top: 0, left: 0 }}
      className={cxBind("animation")}
      onComplete={() => onAnimationCompleted()}
    />
  );
};
