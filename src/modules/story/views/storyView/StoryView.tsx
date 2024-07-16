import { FC } from "react";
import { AnimationController } from "../../components";
import { useScenesApi } from "../../hooks";

export const StoryView: FC = () => {
  const { scenes } = useScenesApi();

  return (
    <main>
      {scenes ? (
        <AnimationController scenesData={scenes} />
      ) : (
        <h1>Loading...</h1>
      )}
    </main>
  );
};
