import Lottie from "lottie-react";
import { FC, useEffect, useRef, useState } from "react";
import { ILottiePlayerProps } from "./LottiePlayer.props";
import { IAudioTracks } from "../../types";
import { Howl } from "howler";

export const LottiePlayer: FC<ILottiePlayerProps> = ({ scene }) => {
  const [animationData, setAnimationData] = useState<any | undefined>(
    undefined
  );
  const [audioTracks, setAudioTracks] = useState<IAudioTracks | undefined>();
  const lottieRef = useRef<any>(null);

  useEffect(() => {
    fetch(`./assets/${scene.animationPath}/data.json`)
      .then((res) => res.json())
      .then((res) => setAnimationData(res))
      .catch((_) => console.log(_));

    if (scene.audio) {
      const sceneAudioTracks: IAudioTracks = {
        ambient: new Howl({
          src: [scene.audio?.ambient || ""],
          autoplay: false,
          loop: true,
          volume: 0.35,
        }),
        backgroundMusic: new Howl({
          src: [scene.audio?.backgroundMusic || ""],
          autoplay: false,
          loop: true,
          volume: 0.1,
        }),
        voiceOver: new Howl({
          src: [scene.audio?.voiceOver || ""],
          autoplay: false,
          loop: false,
          volume: 0.5,
        }),
      };

      setAudioTracks(sceneAudioTracks);
    } else {
      setAudioTracks(undefined);
    }
  }, [scene]);

  useEffect(() => {
    audioTracks?.ambient.play();
    audioTracks?.backgroundMusic.play();
    audioTracks?.voiceOver.play();

    return () => {
      audioTracks?.ambient.unload();
      audioTracks?.backgroundMusic.unload();
      audioTracks?.voiceOver.unload();
    };
  }, [audioTracks]);

  useEffect(() => {
    if (lottieRef.current?.animationLoaded) {
      scene.interactive?.forEach((interactivity) => {
        const interactiveElement = document.getElementById(
          interactivity.trigger
        );
        const effectElement = document.getElementById(interactivity.effect);

        console.log(interactiveElement);
        console.log(effectElement);

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
    }
  }, [lottieRef.current]);

  return (
    <>
      <button onClick={() => audioTracks?.voiceOver.play()}>
        Play Voice Over
      </button>

      <button
        onClick={() => {
          audioTracks?.ambient.unload();
          audioTracks?.backgroundMusic.unload();
        }}
      >
        Stop Audio
      </button>
      {animationData && (
        <Lottie
          animationData={animationData}
          autoPlay={true}
          loop={true}
          style={{ width: "100%", height: "100%" }}
          assetsPath={`assets/${scene.animationPath}/images/`}
          lottieRef={lottieRef}
        />
      )}
    </>
  );
};
