import { canvasWidth, canvasHeight, gridSize } from './canvasSetup.js';

export class Food {
  constructor() {
    this.size = gridSize;
    this.respawn();
  }

  // Assign a new random position to the food
  respawn() {
    this.x = Math.floor(Math.random() * (canvasWidth / this.size));
    this.y = Math.floor(Math.random() * (canvasHeight / this.size));
  }

  draw(ctx) {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(this.x * this.size, this.y * this.size, this.size, this.size);
  }
}
