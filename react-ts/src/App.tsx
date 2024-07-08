import { useState } from "react";
import { LottiePlayer } from "./modules/app/components";
import ScenesJSON from "./modules/app/data/scenes.json";

function App() {
  const [sceneIndex, setSceneIndex] = useState<number>(0);
  const [currentScene, setCurrentScene] = useState<any>(ScenesJSON[sceneIndex]);

  const onSceneSelect = (index: number) => {
    setSceneIndex(index);
    setCurrentScene(ScenesJSON[index]);
  };

  const nextScene = () => {
    setSceneIndex((sceneIndex + 1) % ScenesJSON.length);
    setCurrentScene(ScenesJSON[sceneIndex]);
  };

  const previousScene = () => {
    setSceneIndex(sceneIndex === 0 ? ScenesJSON.length - 1 : sceneIndex - 1);
    setCurrentScene(ScenesJSON[sceneIndex]);
  };

  return (
    <div>
      <div>
        <button onClick={previousScene}>previous</button>

        <div>
          {ScenesJSON.map((scene, index) => (
            <button key={index} onClick={() => onSceneSelect(index)}>
              {index + 1}
            </button>
          ))}
        </div>

        <button onClick={nextScene}>next</button>
      </div>

      <LottiePlayer scene={currentScene} />
    </div>
  );
}

export default App;
