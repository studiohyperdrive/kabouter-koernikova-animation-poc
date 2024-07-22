import { APP_PATHS } from "../../../app/app.paths";
import { useScenesApi, useStoriesApi } from "../../hooks";
import { IScene } from "../../types";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import styles from "./StoriesOverview.module.scss";
import cx from "classnames/bind";

const cxBind = cx.bind(styles);

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
    <div className={cxBind("overview-container")}>
      <div className={cxBind("stories-container")}>
        {stories.map((story) => (
          <button
            onClick={() => onClickStory(story.scenes)}
            key={`story-${story.title}`}
            className={cxBind("story")}
          >
            <h2>{story.title}</h2>
            <img src={story.thumbnail} alt={story.title} />
          </button>
        ))}
      </div>
    </div>
  );
};
