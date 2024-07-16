import { createContext, FC, useState } from "react";
import { IScene } from "../types";
import Story2 from "../data/story2.json";

interface ScenesContextProps {
  scenes: IScene[];
  setScenes: (scenes: IScene[]) => void;
}

interface ScenesProviderProps {
  children?: React.ReactNode;
}

export const ScenesContext = createContext<ScenesContextProps>({
  scenes: [],
  setScenes: () => {},
});

export const ScenesProvider: FC<ScenesProviderProps> = ({ children }) => {
  const [scenes, setScenes] = useState<IScene[]>(Story2);
  const scenesContextValue = { scenes, setScenes };

  return (
    <ScenesContext.Provider value={scenesContextValue}>
      {children}
    </ScenesContext.Provider>
  );
};
