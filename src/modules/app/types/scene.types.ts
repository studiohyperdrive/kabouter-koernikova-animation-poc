export interface IScene {
  name: string;
  animation: IAnimation;
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
  voiceOver?: string;
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
