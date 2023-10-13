import { Snake } from './snake.js';
import { Food } from './food.js';
import { handleInput } from './input.js';
import { canvas, ctx } from './canvasSetup.js';

const NUM_FOODS = 5;
let foods = [];

for (let i = 0; i < NUM_FOODS; i++) {
  foods.push(new Food());
}

let snake = new Snake();

function update() {
  const newHead = snake.update();

  for (const food of foods) {
    if (newHead.x === food.x && newHead.y === food.y) {
      snake.grow();
      food.respawn();
      break;
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  snake.draw(ctx);

  foods.forEach((food) => {
    food.draw(ctx);
  });
}

function handleKeyDown(event) {
  const direction = handleInput(event);
  if (direction) {
    switch (direction) {
      case 'up':
        if (snake.velocity.y === 0) snake.setVelocity(0, -1);
        break;
      case 'down':
        if (snake.velocity.y === 0) snake.setVelocity(0, 1);
        break;
      case 'left':
        if (snake.velocity.x === 0) snake.setVelocity(-1, 0);
        break;
      case 'right':
        if (snake.velocity.x === 0) snake.setVelocity(1, 0);
        break;
    }
  }
}

document.addEventListener('keydown', handleKeyDown);

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
