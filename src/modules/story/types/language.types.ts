export enum ELanguage {
  NL = "nl",
  EN = "en",
  FR = "fr",
}

export interface ILanguage {
  id: ELanguage;
  name: string;
  asset: string;
}
