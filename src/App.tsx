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
    let scenes: any = [];
    ScenesJson.forEach(async (scene) => {
      const animationData = await fetchAnimationData(
        scene.animation.animationPath
      );

      let transitionAnimationData = undefined;
      if (scene.transitionAnimation) {
        transitionAnimationData = await fetchAnimationData(
          scene.transitionAnimation.animationPath
        );
      }

      await Promise.all([animationData, transitionAnimationData]).then(
        (values) => {
          scenes.push({
            ...scene,
            animation: {
              ...scene.animation,
              animationData: values[0],
            },
            transitionAnimation: {
              ...scene.transitionAnimation,
              animationData: values[1],
            },
          });
        }
      );
    });

    setScenesData(scenes);
  };

  useEffect(() => {
    console.log(scenesData);
    // fetchScenesData();
  }, []);

  // useEffect(() => {
  //   console.log("scenesData changed", scenesData);
  //   if (scenesData && scenesData.length !== 0) {
  //     console.log(scenesData);
  //   }
  // }, [scenesData]);

  return (
    <div>
      {scenesData ? (
        scenesData.length !== 0 && (
          <AnimationController scenesData={scenesData} />
        )
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

export default App;
