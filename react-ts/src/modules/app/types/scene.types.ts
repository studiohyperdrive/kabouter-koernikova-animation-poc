export interface IScene {
  name: string;
  animationPath: string;
  interactive?: IInteractivity[];
  audio?: IAudio;
}

export interface IInteractivity {
  trigger: string;
  effect: string;
}

export interface IAudio {
  ambient: string;
  backgroundMusic: string;
  voiceOver: string;
}

export interface IAudioTracks {
  ambient: Howl;
  backgroundMusic: Howl;
  voiceOver: Howl;
}
