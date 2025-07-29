const snakeCanvas = document.getElementById("snake-game");
const snakeCtx = snakeCanvas.getContext("2d");

let tileSize = 20;
let rows, cols;
let snake, food, dx, dy;

function resetGame() {
  snakeCanvas.width = window.innerWidth;
  snakeCanvas.height = window.innerHeight;
  rows = Math.floor(snakeCanvas.height / tileSize);
  cols = Math.floor(snakeCanvas.width / tileSize);
  snake = [{ x: 10, y: 10 }];
  dx = 1;
  dy = 0;
  placeFood();
}
resetGame();
window.onresize = resetGame;

function placeFood() {
  food = {
    x: Math.floor(Math.random() * cols),
    y: Math.floor(Math.random() * rows)
  };
}

function drawSnakeGame() {
  snakeCtx.clearRect(0, 0, snakeCanvas.width, snakeCanvas.height);

  // draw food
  snakeCtx.fillStyle = "red";
  snakeCtx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);

  // draw snake
  snakeCtx.fillStyle = "lime";
  for (let part of snake) {
    snakeCtx.fillRect(part.x * tileSize, part.y * tileSize, tileSize, tileSize);
  }

  moveSnake();
}

function moveSnake() {
  let head = { x: snake[0].x + dx, y: snake[0].y + dy };
  if (
    head.x < 0 || head.y < 0 ||
    head.x >= cols || head.y >= rows ||
    snake.some(s => s.x === head.x && s.y === head.y)
  ) {
    resetGame();
    return;
  }

  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    placeFood();
  } else {
    snake.pop();
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" && dy === 0) {
    dx = 0; dy = -1;
  } else if (e.key === "ArrowDown" && dy === 0) {
    dx = 0; dy = 1;
  } else if (e.key === "ArrowLeft" && dx === 0) {
    dx = -1; dy = 0;
  } else if (e.key === "ArrowRight" && dx === 0) {
    dx = 1; dy = 0;
  }
});

setInterval(drawSnakeGame, 150); // slower snake speed
