// const bg = bodymovin.loadAnimation({
//     container: document.getElementById('bm'),
//     renderer: 'canvas',
//     loop: true,
//     autoplay: true,
//     path: './assets/Background.json',
// });

// const tocheck = bodymovin.loadAnimation({
//     container: document.getElementById('bm'),
//     renderer: 'canvas',
//     loop: true,
//     autoplay: true,
//     path: './assets/TOCHECK.json',
// });

const deer = bodymovin.loadAnimation({
    container: document.getElementById('bm'),
    renderer: 'canvas',
    loop: true,
    autoplay: true,
    path: './assets/Deer.json',
});

deer.addEventListener('data_ready', (e) => {
    const canvas = deer.renderer.canvasContext.canvas;
    const ctx = deer.renderer.canvasContext;

    canvas.style.zIndex = 10;

    // Function to check if the pixel at (mouseX, mouseY) is transparent
    function isPixelTransparent(mouseX, mouseY) {
        // Get the pixel data from the canvas
        const pixelData = ctx.getImageData(mouseX, mouseY, 1, 1).data;
        // Check the alpha value (the fourth value in the array)
        return pixelData[3] === 0;
    }
    
    // Event listener for mouse move
    canvas.addEventListener('click', (event) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
    
        if (isPixelTransparent(mouseX, mouseY)) {
        // The pixel is transparent
        console.log('The pixel is transparent!');
        } else {
        // The pixel is not transparent (it has color)
        console.log('The pixel is not transparent!');
        }
    });
});
