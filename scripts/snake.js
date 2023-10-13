import { canvasWidth, canvasHeight, ctx, gridSize } from './canvasSetup.js';

import { tickRate } from './gameConfig.js';

export class Snake {
  constructor() {
    this.ctx = ctx;

    this.segments = [{ x: 5, y: 5 }];

    this.velocity = { x: 0, y: 1 };
    this.size = gridSize;

    this.tickRate = tickRate;
    this.tickCounter = 0;
  }

  setVelocity(x, y) {
    this.velocity.x = x;
    this.velocity.y = y;
  }

  update() {
    this.tickCounter++;

    if (this.tickCounter < this.tickRate) {
      return this.segments[0];
    }

    this.tickCounter = 0;

    const head = { ...this.segments[0] };
    head.x += this.velocity.x;
    head.y += this.velocity.y;

    this.segments.unshift(head); // Add new head
    this.segments.pop(); // Remove last segment

    return head;
  }

  grow() {
    const head = { ...this.segments[0] };
    head.x += this.velocity.x;
    head.y += this.velocity.y;

    // Add the new head to the front of the segments array
    this.segments.unshift(head);
  }

  draw() {
    this.ctx.fillStyle = 'green';
    for (const segment of this.segments) {
      this.ctx.fillRect(
        segment.x * this.size,
        segment.y * this.size,
        this.size,
        this.size
      );
    }
  }
}
