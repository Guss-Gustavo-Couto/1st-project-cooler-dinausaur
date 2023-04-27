const playerImage = new Image();
playerImage.src = "./images/dinausaur-moves.png";
const spriteWidth = 575; // Width Crop from total image
const spriteHeight = 523; // Height Crop from total image
let frameX = 0; /// Decides column Of animation
let frameY = 4; /// Decides Row Of animation
let gameFrame = 0;
const staggeredFrames = 5; /// Decides velocity of passing Frames

//
let runRightAnim = false;
let runLeftAnim = false;
let jumpAnim = false;
let crouchAnim = false;
let collisionAnim = false;
let gameOverAnim = false;

//// RUN FOWARD ANIMATION
function runAnimate() {
  if (runRightAnim) {
    ctx.drawImage(
      playerImage,
      frameX * spriteWidth,
      0 * spriteHeight,
      spriteWidth,
      spriteHeight,
      player.x,
      player.y,
      150,
      150
    );
    if (gameFrame % staggeredFrames == 0) {
      if (frameX < 6) frameX++;
      else frameX = 0;
    }
  }

  gameFrame++;
}

////JUMP (HIGHT) ANIMATION
function jumpAnimate() {
  if (jumpAnim) {
    ctx.drawImage(
      playerImage,
      frameX * spriteWidth,
      1 * spriteHeight,
      spriteWidth,
      spriteHeight,
      player.x,
      player.y,
      150,
      150
    );
    if (gameFrame % staggeredFrames == 0) {
      if (frameX < 6) frameX++;
      else frameX = 0;
    }
  }

  gameFrame++;
}
// jumpAnimate()

////GETS DOWN ANIMATION
function downAnimate() {
  if (crouchAnim) {
    ctx.drawImage(
      playerImage,
      frameX * spriteWidth,
      2 * spriteHeight,
      spriteWidth,
      spriteHeight,
      player.x,
      player.y,
      150,
      150
    );
    if (gameFrame % staggeredFrames == 0) {
      if (frameX < 6) frameX++;
      else frameX = 0;
    }
  }

  gameFrame++;
}
// downAnimate()

/// WALK BACK ANIMATION
function backAnimate() {
  if (runLeftAnim) {
    ctx.drawImage(
      playerImage,
      frameX * spriteWidth,
      3 * spriteHeight,
      spriteWidth,
      spriteHeight,
      player.x,
      player.y,
      150,
      150
    );
    if (gameFrame % staggeredFrames == 0) {
      if (frameX < 6) frameX++;
      else frameX = 0;
    }
  }

  gameFrame++;
}
//backAnimate()

/// CRASH ANIMATION
function crashAnimate() {
  if (collisionAnim) {
    ctx.drawImage(
      playerImage,
      frameX * spriteWidth,
      4 * spriteHeight,
      spriteWidth,
      spriteHeight,
      player.x,
      player.y,
      150,
      150
    );
    if (gameFrame % staggeredFrames == 0) {
      if (frameX < 6) frameX++;
      else frameX = 0;
    }
  }

  gameFrame++;
}
// crashAnimate()

/// GAME OVER ANIMATION
function gameOverAnimate() {
  if (gameOverAnim) {
    ctx.drawImage(
      playerImage,
      frameX * spriteWidth,
      5 * spriteHeight,
      spriteWidth,
      spriteHeight,
      player.x,
      player.y,
      150,
      150
    );
    if (gameFrame % staggeredFrames == 0) {
      if (frameX < 6) frameX++;
      else frameX = 0;
    }
  }

  gameFrame++;
}
// gameOverAnimate()

/*
runAnimate --> NORMAL / CORRER // SETA DTA  y = 0
jumpAnimate --> SALTAR // SETA UP           y = 1
downAnimate --> Baixar                      y = 2
backAnimate --> PARA TRÀS // SETA BACK      y = 3
crashAnimate --> CHOCAR // Colision	        y = 4
gameOverAnimate --> GAME OVER               y = 5  */
