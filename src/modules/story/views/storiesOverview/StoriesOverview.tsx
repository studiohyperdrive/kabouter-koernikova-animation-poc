import { APP_PATHS } from "../../../app/app.paths";
import { useScenesApi, useStoriesApi } from "../../hooks";
import { IScene } from "../../types";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export const StoriesOverview = () => {
  const navigate = useNavigate();
  const { stories, fetchStories } = useStoriesApi();
  const { fetchScenes } = useScenesApi();
  const onClickStory = async (scenes: IScene[]) => {
    await fetchScenes(scenes);
    navigate(APP_PATHS.story);
  };

  useEffect(() => {
    fetchStories();
  }, []);

  return (
    <div>
      {stories.map((story) => (
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
