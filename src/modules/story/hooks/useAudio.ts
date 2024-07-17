import { useState } from "react";
import { ELanguage, IAudio, IAudioTracks } from "../types";
import { Howl } from "howler";

export const useAudio = () => {
  const [audioTracks, setAudioTracks] = useState<IAudioTracks | undefined>();

  const createAudioTracks = (audio: IAudio | undefined, lng: ELanguage) => {
    if (audio) {
      const sceneAudioTracks: IAudioTracks = {
        ambient: new Howl({
          src: [audio?.ambient || ""],
          autoplay: false,
          loop: true,
          volume: 0.25,
        }),
        backgroundMusic: new Howl({
          src: [audio?.backgroundMusic || ""],
          autoplay: false,
          loop: true,
          volume: 0.35,
        }),
        voiceOver: new Howl({
          src: [audio?.voiceOver?.[lng] || ""],
          autoplay: false,
          loop: false,
          volume: 0.5,
        }),
      };

      setAudioTracks(sceneAudioTracks);
    } else {
      setAudioTracks(undefined);
    }
  };

  const playAllAudioTracks = () => {
    if (audioTracks) {
      fadeInAllAudioTracks();
      audioTracks.ambient.play();
      audioTracks.backgroundMusic.play();
      audioTracks.voiceOver.play();
    }
  };

  const pauseAllAudioTracks = () => {
    if (audioTracks) {
      audioTracks.ambient.pause();
      audioTracks.backgroundMusic.pause();
      audioTracks.voiceOver.pause();
    }
  };

  const unloadAllAudioTracks = () => {
    if (audioTracks) {
      fadeOutAllAudioTracks();
      setTimeout(() => {
        audioTracks.ambient.unload();
        audioTracks.backgroundMusic.unload();
        audioTracks.voiceOver.unload();
      }, 1000);
    }
  };

  const fadeInAmbientTracks = () => {
    if (audioTracks) {
      audioTracks.ambient.play();
      audioTracks.backgroundMusic.play();
      audioTracks.ambient.fade(0, 0.25, 1500);
      audioTracks.backgroundMusic.fade(0, 0.35, 1500);
    }
  };

  const fadeOutAmbientTracks = () => {
    if (audioTracks) {
      audioTracks.ambient.fade(0.25, 0, 1000);
      audioTracks.backgroundMusic.fade(0.35, 0, 1000);
    }

    setTimeout(() => {
      if (audioTracks) {
        audioTracks.ambient.pause();
        audioTracks.backgroundMusic.pause();
      }
    }, 1500);
  };

  const fadeInAllAudioTracks = () => {
    if (audioTracks) {
      audioTracks.ambient.fade(0, 0.25, 1000);
      audioTracks.backgroundMusic.fade(0, 0.35, 1000);
      audioTracks.voiceOver.fade(0, 0.5, 1000);
    }
  };

  const fadeOutAllAudioTracks = () => {
    if (audioTracks) {
      audioTracks.ambient.fade(0.25, 0, 1000);
      audioTracks.backgroundMusic.fade(0.35, 0, 1000);
      audioTracks.voiceOver.fade(0.5, 0, 1000);
    }
  };

  const switchVoiceOverTrack = (
    audio: IAudio | undefined,
    language: ELanguage
  ) => {
    if (audioTracks) {
      unloadAllAudioTracks();
      createAudioTracks(audio, language);
    }
  };

  return {
    audioTracks,
    setAudioTracks,
    createAudioTracks,
    playAllAudioTracks,
    pauseAllAudioTracks,
    unloadAllAudioTracks,
    fadeInAmbientTracks,
    fadeOutAmbientTracks,
    fadeOutAllAudioTracks,
    switchVoiceOverTrack,
  };
};
