import bodymovin from "lottie-web";

// const bg = bodymovin.loadAnimation({
//   container: document.getElementById("bm"),
//   renderer: "canvas",
//   loop: false,
//   autoplay: true,
//   path: "./assets/Background.json",
// });

// const tocheck = bodymovin.loadAnimation({
//     container: document.getElementById('bm'),
//     renderer: 'canvas',
//     loop: true,
//     autoplay: true,
//     path: './assets/TOCHECK.json',
// });

const container = document.getElementById("bm");
// const deer = bodymovin.loadAnimation({
//   container: container,
//   renderer: "svg",
//   loop: true,
//   autoplay: true,
//   path: "./assets/Deer-Alt.json",
//   // animationData: deerJSON,
// });

if (container) {
}
const reindeerAndBackground = bodymovin.loadAnimation({
  container: container as HTMLElement,
  renderer: "svg",
  loop: true,
  autoplay: true,
  // path: "./assets/deerWithBackground/reindeer.json",
  path: "./assets/deerWithBackground/reindeer-and-background.json",
  // animationData: deerJSON,
});

// function event_handler(ev, expression_function) {
//   var thisComp = deer.renderer.compInterface;
//   var time = deer.renderer.renderedFrame / deer.renderer.globalData.frameRate;

//   console.log(ev.target);
//   const canvas = ev.target;
//   const ctx = canvas.getContext("2d");

//   function isPixelTransparent(mouseX, mouseY) {
//     // Get the pixel data from the canvas
//     console.log(ctx.getImageData(mouseX, mouseY, 1000, 1000));
//     const pixelData = ctx.getImageData(mouseX, mouseY, 1, 1).data;
//     // Check the alpha value (the fourth value in the array)
//     return pixelData[3] === 0;
//   }

//   const rect = canvas.getBoundingClientRect();
//   const mouseX = ev.clientX - rect.left;
//   const mouseY = ev.clientY - rect.top;
//   if (isPixelTransparent(mouseX, mouseY)) {
//     // The pixel is transparent
//     console.log("The pixel is transparent!");
//   } else {
//     // The pixel is not transparent (it has color)
//     console.log("The pixel is not transparent!");
//   }

//   expression_function(ev, thisComp, time);
// }

// for (let [ev_type, expression] of Object.entries(deerJSON.events)) {
//   let expression_function = Function("event", "thisComp", "time", expression);
//   container.addEventListener(ev_type, (ev) =>
//     event_handler(ev, expression_function)
//   );
// }

window.addEventListener("load", () => {
  console.log("page is fully loaded");
});

reindeerAndBackground.addEventListener("DOMLoaded", (e) => {
  const layers = reindeerAndBackground.renderer.layers;
  layers.forEach((layer: any) => {
    console.log(layer.nm);
    const element = document.querySelector(layer.nm);

    element.addEventListener("click", (e: any) => {
      console.log(`${element.id} clicked`);
    });
  });

  // const reindeer = document.querySelector("#reindeer");
  // const tail = document.querySelector("#tail");
  // const breath = document.querySelector("#breath");
  // const background = document.querySelector("#background");

  // [reindeer, tail, background].forEach((element) => {
  //   console.log(element);
  //   element.addEventListener("click", (e) => {
  //     console.log(`${element.id} clicked`);
  //   });
  // });

  // background.addEventListener("click", (e) => {
  //   console.log("background clicked");
  // });
  // const tail = document.querySelector("#staart");
  // const mountain = document.querySelector("#berg");
});

// deer.addEventListener("data_ready", (e) => {
//   const canvas = deer.renderer.canvasContext.canvas;
//   const ctx = deer.renderer.canvasContext;

//   canvas.style.zIndex = 10;

//   // Function to check if the pixel at (mouseX, mouseY) is transparent
//   function isPixelTransparent(mouseX, mouseY) {
//     // Get the pixel data from the canvas
//     const pixelData = ctx.getImageData(mouseX, mouseY, 1, 1).data;
//     // Check the alpha value (the fourth value in the array)
//     return pixelData[3] === 0;
//   }

//   // Event listener for mouse move
//   canvas.addEventListener("click", (event) => {
//     const rect = canvas.getBoundingClientRect();
//     const mouseX = event.clientX - rect.left;
//     const mouseY = event.clientY - rect.top;
//     if (isPixelTransparent(mouseX, mouseY)) {
//       // The pixel is transparent
//       console.log("The pixel is transparent!");
//     } else {
//       // The pixel is not transparent (it has color)
//       console.log("The pixel is not transparent!");
//     }
//   });
// });
