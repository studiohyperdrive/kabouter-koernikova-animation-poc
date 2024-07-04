import { renderScene } from "./renderScene";
import scenesJSON from "./scenes.json";

let sceneIndex = 0;
let scene = scenesJSON[sceneIndex];

renderScene(scene);

const sceneSelectContainer = document.getElementById("scene-select-container");

if (sceneSelectContainer && scenesJSON.length !== 0) {
  scenesJSON.forEach((scene, index) => {
    const selectButton = document.createElement("button");

    selectButton.id = `select-scene-${index}-btn`;
    selectButton.textContent = (index + 1).toString();
    selectButton.addEventListener("click", (e: MouseEvent) => {
      e.preventDefault();
      sceneIndex = index;
      renderScene(scene);
    });

    sceneSelectContainer.appendChild(selectButton);
  });
}

const nextScene = (e: MouseEvent) => {
  e.preventDefault();
  sceneIndex = (sceneIndex + 1) % scenesJSON.length;
  scene = scenesJSON[sceneIndex];
  renderScene(scene);
  console.log(sceneIndex);
};

const previousScene = (e: MouseEvent) => {
  e.preventDefault();
  sceneIndex = sceneIndex === 0 ? scenesJSON.length - 1 : sceneIndex - 1;
  scene = scenesJSON[sceneIndex];
  renderScene(scene);
  console.log(sceneIndex);
};

const nextButton = document.getElementById("next-btn");
const previousButton = document.getElementById("previous-btn");

nextButton?.addEventListener("click", nextScene);
previousButton?.addEventListener("click", previousScene);
