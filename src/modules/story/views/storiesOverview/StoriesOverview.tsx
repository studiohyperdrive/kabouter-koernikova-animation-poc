import StoriesJson from "../../data/stories.json";
import { APP_PATHS } from "../../../app/app.paths";
import { useScenesApi } from "../../hooks";
import { IScene } from "../../types";
import { useNavigate } from "react-router";

export const StoriesOverview = () => {
  const navigate = useNavigate();
  const { setScenes, fetchScenes } = useScenesApi();
  const onClickStory = (scenes: IScene[]) => {
    setScenes(scenes);
    fetchScenes();
    navigate(APP_PATHS.story);
  };
  return (
    <div>
      {StoriesJson.map((story) => (
        <button
          onClick={() => onClickStory(story.scenes)}
          key={`story-${story.title}`}
        >
          <h1>{story.title}</h1>
          <img src={story.thumbnail} alt={story.title} />
        </button>
      ))}
    </div>
  );
};
