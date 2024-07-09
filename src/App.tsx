import { AnimationController } from "./modules/app/components";
import ScenesJson from "././modules/app/data/scenes.json";
import ScenesDataJson from "./modules/app/data/scenesData.json";
import { useEffect, useState } from "react";
import { IScene } from "./modules/app/types";

function App() {
  const [scenesData, setScenesData] = useState<IScene[]>(ScenesDataJson);

  const fetchAnimationData = (path: string) => {
    try {
      return fetch(`./assets/${path}/data.json`).then((res) => res.json());
    } catch (error) {
      console.log(error);
    }
  };

  const fetchScenesData = async () => {
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

    setScenesData(scenes);
  };

  useEffect(() => {
    fetchScenesData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      {scenesData?.length >= 0 ? (
        <AnimationController scenesData={scenesData} />
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

export default App;
