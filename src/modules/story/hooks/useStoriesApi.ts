import { useContext } from "react";
import { StoriesContext } from "../providers";
import StoriesJson from "../data/stories.json";

export const useStoriesApi = () => {
  const { stories, setStories } = useContext(StoriesContext);

  const fetchStories = () => {
    setStories(StoriesJson);
  };

  return {
    stories,
    setStories,
    fetchStories,
  };
};
