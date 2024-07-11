import { FC, useEffect } from "react";
import { AnimationController } from "../../components";
import { useScenesApi } from "../../hooks";

export const StoryView: FC = () => {
  const { scenes, fetchScenes } = useScenesApi();

  useEffect(() => {
    fetchScenes();
  }, []);

  return (
    <main>
      {scenes?.length >= 0 ? (
        <AnimationController scenesData={scenes} />
      ) : (
        <h1>Loading...</h1>
      )}
    </main>
  );
};
