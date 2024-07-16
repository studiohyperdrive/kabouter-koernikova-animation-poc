import { AnimationController } from "./modules/story/components";
import { useScenesApi } from "./modules/story/hooks";

function App() {
  const { scenes } = useScenesApi();

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
