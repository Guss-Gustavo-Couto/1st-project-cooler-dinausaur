
const images = [  
    {src: "docs/assets/images/background-1.png", x: 1200, speed: 0.35},
    {src: "docs/assets/images/background-2.png", x: 1200, speed: 0.8},
    {src: "docs/assets/images/background-3.png", x: 1200, speed: 1.6},
    {src: "docs/assets/images/background-4.png", x: 1200, speed: 3},
    {src: "docs/assets/images/background-5.png", x: 1200, speed: 1},
];


const loadedImages = [];
let imagesLoaded = 0;
for (let i = 0; i < images.length; i++) {
  const img = new Image();
  img.onload = () => {
    imagesLoaded++;
    if (imagesLoaded === images.length) {
      startAnimation();
    }
  };
  img.src = images[i].src;
  loadedImages.push({img: img, x: images[i].x, speed: images[i].speed});
}


function startAnimation() {

    
    for (let i = 0; i < loadedImages.length; i++) {
      const img = loadedImages[i].img;
      const x = loadedImages[i].x;
      const speed = loadedImages[i].speed;
      
      ctx.drawImage(img, x, 0);
      ctx.drawImage(img, x - canvas.width, 0);   ////// troquei + POR menos
      
      loadedImages[i].x -= speed;
      if (loadedImages[i].x >= canvas.width) {  //// troquei sentido
        loadedImages[i].x = 0;
      }
    }
 
}