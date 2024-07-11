import { useContext } from "react";
import { ScenesContext } from "../providers";
import ScenesJson from "../data/scenes.json";

export const useScenesApi = () => {
  const { scenes, setScenes } = useContext(ScenesContext);

  const fetchAnimationData = (path: string) => {
    try {
      return fetch(`./assets/${path}/data.json`).then((res) => res.json());
    } catch (error) {
      console.log(error);
    }
  };

  const fetchScenes = async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const scenes: any = [];

    ScenesJson.forEach(async (scene) => {
      const animationData = await fetchAnimationData(
        scene.animation.animationAssetsPath
      );

      let transitionAnimationData = undefined;

      if (scene.transitionAnimation) {
        transitionAnimationData = await fetchAnimationData(
          scene.transitionAnimation.animationAssetsPath
        );
      }

      scenes.push({
        ...scene,
        animation: {
          ...scene.animation,
          animationData,
        },
        transitionAnimation: {
          ...scene.transitionAnimation,
          animationData: transitionAnimationData,
        },
      });
    });

    setScenes(scenes);
  };

  return {
    scenes,
    setScenes,
    fetchScenes,
  };
};
