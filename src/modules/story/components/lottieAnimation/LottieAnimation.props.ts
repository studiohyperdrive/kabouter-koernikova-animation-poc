import { ELanguage, IAudio, IInteractivity } from "../../types";

export interface ILottieAnimationProps {
  animationData: any;
  animationAssetsPath: string;
  audio?: IAudio;
  interactive?: IInteractivity[];
  zIndex?: number;
  autoplay?: boolean;
  loop?: boolean;
  play?: boolean;
  isAmbientPlaying?: boolean;
  inTransition?: boolean;
  language: ELanguage;
}
