import { ELanguage, IAudio, IInteractivity } from "../../types";

export interface ILottieAnimationProps {
  animationData: any;
  animationAssetsPath: string;
  language: ELanguage;
  audio?: IAudio;
  interactive?: IInteractivity[];
  zIndex?: number;
  autoplay?: boolean;
  loop?: boolean;
  play?: boolean;
  isAmbientPlaying?: boolean;
  inTransition?: boolean;
  isPaused?: boolean;
}
