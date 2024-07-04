import bodymovin from "lottie-web";
import { Howl } from "howler";

interface IScene {
  name: string;
  animationPath: string;
  interactive?: IInteractivity[];
}

interface IInteractivity {
  trigger: string;
  effect: string;
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

  if (container && wrapper) {
    wrapper.firstChild?.remove();
    wrapper.appendChild(container);

    // Create Lottie animation
    const anim = bodymovin.loadAnimation({
      container: container,
      renderer: "svg",
      loop: false,
      autoplay: false,
      path: scene.animationPath,
      audioFactory: createAudio,
    });

    anim.addEventListener("DOMLoaded", () => {
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

        anim.goToAndStop(0, false, effect.nm.slice(1));
        const element = document.querySelector(layer.nm);

        element.addEventListener("mouse", () => {});

        element.addEventListener("click", () => {
          console.log(`${element.id} clicked`);
          anim.goToAndPlay(0, false, effect.nm.slice(1));
        });
      });
    });
  }
};
