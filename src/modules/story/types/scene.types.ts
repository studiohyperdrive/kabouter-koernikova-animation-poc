export interface IScene {
  name: string;
  animation: IAnimation;
  thumbnail?: string;
  transitionAnimation?: IAnimation;
  interactive?: IInteractivity[];
}
export interface IInteractivity {
  trigger: string;
  effect: string;
}

export interface IAudio {
  ambient?: string;
  backgroundMusic?: string;
  voiceOver?: TVoiceOver;
}

export interface IAudioTracks {
  ambient: Howl;
  backgroundMusic: Howl;
  voiceOver: Howl;
}
export interface IAnimation {
  animationAssetsPath: string;
  animationData?: any;
  audio?: IAudio;
}

export type TVoiceOver = {
  [key in ELanguage]: string;
};

export type TVoiceOverTracks = {
  [key in ELanguage]: Howl;
};

export enum ELanguage {
  NL = "nl",
  EN = "en",
  FR = "fr",
}
