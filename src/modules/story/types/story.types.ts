import { IScene } from "./scene.types";

export interface IStory {
  title: string;
  thumbnail: string;
  scenes: IScene[];
}
