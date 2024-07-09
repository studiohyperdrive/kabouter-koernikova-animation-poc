import Lottie from "lottie-react";
import { FC, useEffect, useRef, useState } from "react";
import { ILottieAnimationProps } from "./LottieAnimation.props";
import { IAudioTracks } from "../../types";
import { Howl } from "howler";

export const LottieAnimation: FC<ILottieAnimationProps> = ({
  animationData,
  audio,
  interactive,
  animationAssetsPath,
  zIndex,
  autoplay = false,
  loop = false,
  play = true,
  isPlaying = true,
  inTransition = false,
}) => {
  const animationRef = useRef<any>(null);
  const [audioTracks, setAudioTracks] = useState<IAudioTracks | undefined>();

  useEffect(() => {
    if (audio) {
      const sceneAudioTracks: IAudioTracks = {
        ambient: new Howl({
          src: [audio?.ambient || ""],
          autoplay: false,
          loop: true,
          volume: 0.25,
        }),
        backgroundMusic: new Howl({
          src: [audio?.backgroundMusic || ""],
          autoplay: false,
          loop: true,
          volume: 0.35,
        }),
        voiceOver: new Howl({
          src: [audio?.voiceOver || ""],
          autoplay: false,
          loop: false,
          volume: 0.5,
        }),
      };

      setAudioTracks(sceneAudioTracks);
    } else {
      setAudioTracks(undefined);
    }
  }, [animationData]);

  useEffect(() => {
    if (audioTracks) {
      audioTracks.ambient.play();
      audioTracks.backgroundMusic.play();
      audioTracks.voiceOver.play();
    }

    return () => {
      if (audioTracks) {
        audioTracks.ambient.unload();
        audioTracks.backgroundMusic.unload();
        audioTracks.voiceOver.unload();
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
    if (isPlaying) {
      animationRef.current.play();
      audioTracks?.backgroundMusic.play();
      audioTracks?.voiceOver.play();
    } else {
      animationRef.current.pause();
      audioTracks?.ambient.pause();
      audioTracks?.backgroundMusic.pause();
      audioTracks?.voiceOver.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (inTransition) {
      audioTracks?.ambient.fade(0.25, 0, 1000);
      audioTracks?.backgroundMusic.fade(0.35, 0, 1000);
      audioTracks?.voiceOver.fade(0.5, 0, 1000);
    }
  }, [inTransition]);

  return (
    <Lottie
      animationData={animationData}
      autoplay={autoplay}
      loop={loop}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: zIndex || 0,
      }}
      assetsPath={`assets/${animationAssetsPath}/images/`}
      lottieRef={animationRef}
    />
  );
};
