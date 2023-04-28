//////// GAME //////////////

class Game {
  constructor(ctx, width, height, player) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.player = player;
    this.intervalId = null;
    this.frames = 0;
    this.enemies = [];
    this.livesArray = [];
    this.enemySpeed = 0;
    this.enemyImages = [
      "docs/assets/images/enemy-01.png",
      "docs/assets/images/enemy-02.png",
      "docs/assets/images/enemy-03.png",
    ];

    //Crash Audio
    this.crashWithAudio = new Audio("docs/assets/audio/ough.mp3");
    this.crashWithAudio.loop = false;

    //Game Over Audio
    this.gameOverAudio = new Audio("docs/assets/audio/retrogamesound.wav");
    this.gameOverAudio.loop = false;

    //Start Audio
    this.startAudio = new Audio("docs/assets/audio/letsgo.mp3");
    this.startAudio.loop = false;

    //Jump Audio
    this.jumpAudio = new Audio("docs/assets/audio/jumping.wav");
    this.jumpAudio.loop = false;
  }

  jump() {
    this.jumpAudio.play();
  }

  start() {
    this.intervalId = setInterval(this.update, 10);
    this.startAudio.play();
  }

  update = () => {
    this.frames++;
    this.clear();
    startAnimation();
    this.player.newPos();
    this.player.jump();
    runAnimate();
    backAnimate();
    downAnimate();
    jumpAnimate();
    crashAnimate();
    swordAnimate();
    this.updateEnemies();
    this.checkGameOver();
  };

  // Stops The Game
  stop() {
    clearInterval(this.intervalId);
  }
  // Clears Canvas
  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  // Updates Enemies
  updateEnemies() {
    if (this.frames % 600 === 0) {
      this.enemySpeed -= 0.1;
    }

    for (let i = 0; i < this.enemies.length; i++) {
      this.enemies[i].x -= 1; // Enemy goes More to The Right
      this.enemies[i].newPos();
      this.enemies[i].draw(); // Continue to Draw Enemy
    }

    if (this.frames % 600 === 0) {
      let x = 1400; /*  + Math.floor(Math.random() * 601) + 200 */
      let height = 359;

      // Bottom Obstacle
      let enemyImage =
        this.enemyImages[
          Math.floor(Math.random() * (this.enemyImages.length))
        ];
      this.enemies.push(
        new Component(
          x + 120 + Math.floor(Math.random() * 700),
          height,
          120,
          120,
          enemyImage,
          this.ctx,
          this.enemySpeed
        )
      );
    }
  }

  checkGameOver() {
    for (let i = 0; i < this.enemies.length; i++) {
      if (this.player.crashWith(this.enemies[i])) {
        this.enemies.splice(i, 1);
        this.crashWithAudio.play();
        this.livesArray.push("X");
        let lifeIndex = this.livesArray.length;
        let lifeImage = document.getElementById(`life${lifeIndex}`);
        lifeImage.src = "docs/assets/images/blank-heart.png";
        //animation
        runRightAnim = false;
        gameOverAnim = false;
        jumpAnim = false;
        runLeftAnim = false;
        crouchAnim = false;
        swordAnim = false;
        collisionAnim = true;
        setTimeout(() => {
          collisionAnim = false;
          runRightAnim = true;
        }, 500);
      }
    }
    if (elapsedTime === 60000) {
      this.stop();
      ctx.fillStyle = "green";
      this.ctx.font = "72px Arial";
      this.ctx.fillText("CONGRATULATIONS!", this.width / 3, this.height / 2);
      document.getElementById("timer").innerHTML = "00:00";
      document.getElementById("level").innerHTML = "LEVEL 2";
    }

    if (this.livesArray.length > 2) {
      elapsedTime = "--:--";
      this.ctx.fillStyle = "red";
      this.ctx.font = "72px Arial";
      this.ctx.fillText("GAME OVER", this.width / 3.3, this.height / 2);
      
      //animation
      runRightAnim = false;
      jumpAnim = false;
      runLeftAnim = false;
      crouchAnim = false;
      collisionAnim = false;
      swordAnim = false;
      this.stop();
      this.gameOverAudio.play();
      startAnimation();
      gameOverAnim = true;
      requestAnimationFrame(gameOverAnimate);
    }
  }
}
