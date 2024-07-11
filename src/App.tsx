import { AnimationController } from "./modules/story/components";
import { useEffect } from "react";
import { useScenesApi } from "./modules/story/hooks";

function App() {
  const { scenes, fetchScenes } = useScenesApi();

  useEffect(() => {
    fetchScenes();
  }, []);

  return (
    <div>
      {scenes?.length >= 0 ? (
        <AnimationController scenesData={scenes} />
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

export default App;
