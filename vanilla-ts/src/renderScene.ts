import bodymovin from "lottie-web";
import { Howl } from "howler";

interface IScene {
  name: string;
  animationPath: string;
  interactive?: IInteractivity[];
  audio?: IAudio;
}

interface IInteractivity {
  trigger: string;
  effect: string;
}

interface IAudio {
  ambient: string;
  backgroundMusic: string;
  voiceOver: string;
}

interface IAudioTracks {
  ambient: Howl;
  backgroundMusic: Howl;
  voiceOver: Howl;
}

const createAudio = (assetPath: string) => {
  const sound = new Howl({
    src: [assetPath],
    autoplay: true,
  });

  return {
    play: sound.play,
    seek: sound.seek,
    playing: sound.playing,
    rate: sound.rate,
    setVolume: sound.volume,
  };
};

export const renderScene = (scene: IScene) => {
  const wrapper = document.getElementById("bm");
  const container = document.createElement("div");
  container.id = `bm-${scene.name}`;

  const audioTracks: IAudioTracks = {
    ambient: new Howl({
      src: [scene.audio?.ambient || ""],
      autoplay: true,
      loop: true,
      volume: 0.35,
    }),
    backgroundMusic: new Howl({
      src: [scene.audio?.backgroundMusic || ""],
      autoplay: true,
      loop: true,
      volume: 0.1,
    }),
    voiceOver: new Howl({
      src: [scene.audio?.voiceOver || ""],
      autoplay: true,
      loop: false,
      volume: 0.5,
    }),
  };

  if (container && wrapper) {
    wrapper.firstChild?.remove();
    wrapper.appendChild(container);

    // Create Lottie animation
    const anim = bodymovin.loadAnimation({
      container: container,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: scene.animationPath,
      audioFactory: createAudio,
    });

    anim.addEventListener("DOMLoaded", () => {
      audioTracks.ambient.play();
      audioTracks.backgroundMusic.play();
      // Get all layers and filter out the interactive layers
      const layers = anim.renderer.layers;

      const interactiveLayers = layers.filter((layer: any) =>
        (scene.interactive || [])
          .map((activity) => activity.trigger)
          .includes(layer.nm.slice(1))
      );

      interactiveLayers.forEach((layer: any) => {
        // Get scene interactivity object in order to get the effect
        const interactive = (scene.interactive || []).find(
          (activity) => activity.trigger === layer.nm.slice(1)
        );

        if (!interactive) {
          return;
        }

        // Get effect layer
        const effect = layers.find(
          (layer: any) => layer.nm.slice(1) === interactive?.effect
        );

        // anim.goToAndStop(0, false, effect.nm.slice(1));
        const interactiveElement = document.querySelector(layer.nm);
        const effectElement = document.querySelector(effect.nm);

        effectElement.style.display = "none";

        interactiveElement.addEventListener("click", () => {
          console.log(`${interactiveElement.id} clicked`);
          anim.goToAndPlay(0, false, effect.nm.slice(1));
          interactiveElement.style.display = "none";
          effectElement.style.display = "block";

          setTimeout(() => {
            interactiveElement.style.display = "block";
            effectElement.style.display = "none";
          }, 250);
        });
      });
    });
  }
};
