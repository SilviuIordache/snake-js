import { Snake } from './snake.js';
import { Food } from './food.js';
import { handleInput } from './input.js';
import { canvas, ctx, gridSize } from './canvasSetup.js';
import { GAME_STATE } from './gameConfig.js';

let currentState = GAME_STATE.INIT;

const NUM_FOODS = 5;
let foods = [];

for (let i = 0; i < NUM_FOODS; i++) {
  foods.push(new Food());
}

let snake = new Snake();

function update() {
  const newHead = snake.update();

  // Check for collisions with the wall or itself
  if (
    newHead.x < 0 ||
    newHead.x >= canvas.width / gridSize ||
    newHead.y < 0 ||
    newHead.y >= canvas.height / gridSize ||
    snake.segments
      .slice(1)
      .some((segment) => segment.x === newHead.x && segment.y === newHead.y)
  ) {
    currentState = GAME_STATE.GAME_OVER;
    return;
  }

  // Check for snake-food collision
  for (const food of foods) {
    if (newHead.x === food.x && newHead.y === food.y) {
      snake.grow();
      food.respawn();
      break; // Break out of the loop once a collision is detected
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
  if (
    currentState === GAME_STATE.INIT ||
    currentState === GAME_STATE.GAME_OVER
  ) {
    currentState = GAME_STATE.RUNNING;
    snake = new Snake(); // Restart the snake for a new game
    return;
  }

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

function renderInitScreen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillText('Press any key to start', canvas.width / 2, canvas.height / 2);
}

function renderGameOverScreen() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2);
  ctx.fillText(
    'Press any key to restart',
    canvas.width / 2,
    canvas.height / 2 + 30
  );
}

function gameLoop() {
  switch (currentState) {
    case GAME_STATE.INIT:
      renderInitScreen();
      break;
    case GAME_STATE.RUNNING:
      update();
      draw();
      break;
    case GAME_STATE.GAME_OVER:
      renderGameOverScreen();
      break;
  }
  requestAnimationFrame(gameLoop);
}

gameLoop();
