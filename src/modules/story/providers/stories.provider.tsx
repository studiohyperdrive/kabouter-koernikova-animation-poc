import { createContext, FC, useState } from "react";
import { IStory } from "../types";

interface StoriesContextProps {
  stories: IStory[];
  setStories: (stories: IStory[]) => void;
}

interface StoriesProviderProps {
  children?: React.ReactNode;
}

export const StoriesContext = createContext<StoriesContextProps>({
  stories: [],
  setStories: () => {},
});

export const StoriesProvider: FC<StoriesProviderProps> = ({ children }) => {
  const [stories, setStories] = useState<IStory[]>([]);
  const scenesContextValue = { stories, setStories };

  return (
    <StoriesContext.Provider value={scenesContextValue}>
      {children}
    </StoriesContext.Provider>
  );
};
