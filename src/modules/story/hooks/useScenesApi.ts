import { useContext, useState } from "react";
import { ScenesContext } from "../providers";
import { IScene } from "../types";

export const useScenesApi = () => {
  const { scenes, setScenes } = useContext(ScenesContext);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAnimationData = (path: string) => {
    try {
      return fetch(`./assets/${path}/data.json`).then((res) => res.json());
    } catch (error) {
      console.log(error);
    }
  };

  const fetchScenes = async (scenes: IScene[]) => {
    setIsLoading(true);

    await Promise.all(
      scenes.map(async (scene) => {
        const animationData = await fetchAnimationData(
          scene.animation.animationAssetsPath
        );

        let transitionAnimationData = undefined;

        if (scene.transitionAnimation) {
          transitionAnimationData = await fetchAnimationData(
            scene.transitionAnimation.animationAssetsPath
          );
        }

        return {
          ...scene,
          animation: {
            ...scene.animation,
            animationData,
          },
          ...(scene.transitionAnimation
            ? {
                transitionAnimation: {
                  ...scene.transitionAnimation,
                  animationData: transitionAnimationData,
                },
              }
            : {}),
        };
      })
    ).then((data) => {
      setScenes(data);
      setIsLoading(false);
    });
  };

  return {
    scenes,
    setScenes,
    fetchScenes,
    isLoading,
  };
};
