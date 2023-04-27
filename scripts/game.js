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
      this.enemyImages = ['./images/enemy-01.png', './images/enemy-02.png', './images/enemy-03.png'];
    }
  
    start() {
      this.intervalId = setInterval(this.update, 10);
    }
  
    update = () => {
      this.frames++;
      this.clear();
      startAnimation();
      this.player.newPos();
      this.player.jump();
      this.player.draw();
      this.updateEnemies();
      this.checkGameOver();
    }
  
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
        this.enemySpeed -= 0.10;
      }
  
      for (let i = 0; i < this.enemies.length; i++) {
        this.enemies[i].x -= 1; // Enemy goes More to The Right
        this.enemies[i].newPos();
        this.enemies[i].draw(); // Continue to Draw Enemy
      }
  
      if (this.frames % 400 === 0) {
        let x = 1200 + Math.floor(Math.random() * 601) + 200;
        let height = 240;
  
        // Bottom Obstacle
        let enemyImage = this.enemyImages[Math.floor(Math.random() * (this.enemyImages.length-1))];
        this.enemies.push(new Component(x + 90, height, 50, 50, enemyImage, this.ctx, this.enemySpeed));
      }
    }
  
    checkGameOver() {
      for (let i = 0; i < this.enemies.length; i++) {
        if (this.player.crashWith(this.enemies[i])) {
          this.enemies.splice(i, 1);
          this.livesArray.push('X');
          let lifeIndex = this.livesArray.length;
          let lifeImage = document.getElementById(`life${lifeIndex}`);
          lifeImage.src = './images/blank-heart.png';
          crashAnimate()
        }
      }
      if (elapsedTime === 60000) {
        this.stop();
        ctx.fillStyle = 'green';
        this.ctx.font = '72px Arial';
        this.ctx.fillText('CONGRATULATIONS!', this.width / 3, this.height / 2);
        document.getElementById('timer').innerHTML = '00:00';
        document.getElementById('level').innerHTML = 'LEVEL 2';
      }
  
      if (this.livesArray.length > 2) {
        elapsedTime = '--:--';
        this.stop();
        ctx.fillStyle = 'red';
        this.ctx.font = '72px Arial';
        this.ctx.fillText('GAME OVER', this.width / 3.3, this.height / 2);
        gameOverAnimate()
      }
    }
  }