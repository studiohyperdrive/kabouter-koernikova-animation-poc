import { useEffect } from "react";
import { AnimationController } from "../../../story/components";
import { useScenesApi } from "../../../story/hooks";

export const AppView = () => {
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
};
