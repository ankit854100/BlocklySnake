import { ctx } from "./App";
import { newCode } from "./Workspace";

const dimension = { w: 350, h: 350 };

const snakeColor = "lightblue";
const snakeBorder = "darkblue";

let snake = [
  { x: 200, y: 200 },
  { x: 190, y: 200 },
  { x: 180, y: 200 },
  { x: 170, y: 200 },
  { x: 160, y: 200 }
];

let changingDirection = false;
let dx = 10;
let dy = 0;
let foodX;
let foodY;
let score = 0;
let myTimeout;
let isBoundaryObstacle = false;
let isSnakeBody = false;
let eaten = false;
let isScoreIncreased = false;
let isGoingUp = false;
let isGoingDown = false;
let isGoingLeft = false;
let isGoingRight = false;
let bg = "white";
let stop = false;

function reset() {
  snake = [
    { x: 200, y: 200 },
    { x: 190, y: 200 },
    { x: 180, y: 200 },
    { x: 170, y: 200 },
    { x: 160, y: 200 }
  ];
  changingDirection = false;
  dx = 10;
  dy = 0;
  score = 0;
  bg = "white";
  isBoundaryObstacle = false;
  eaten = false;
  isScoreIncreased = false;
  isGoingUp = false;
  isGoingDown = false;
  isGoingLeft = false;
  isGoingRight = false;
  stop = false;
  clearTimeout(myTimeout);
}

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  if (!eaten) {
    snake.pop();
  }
  eaten = false;
}

function eat() {
  eaten = true;
  // if (isScoreIncreased) {
  //   increaseScore();
  // }
  // generateFood();
}

function increaseScore() {
  if (isScoreIncreased) score += 5;
  isScoreIncreased = false;
}

function checkFood() {
  const hasEaten = snake[0].x === foodX && snake[0].y === foodY;
  if (hasEaten) {
    return true;
  } else return false;
}

function clearCanvas() {
  ctx.clearRect(0, 0, dimension.w, dimension.h);
  reset();
}

function drawSnakePart(snakePart) {
  ctx.fillStyle = snakeColor;
  ctx.strokeStyle = snakeBorder;
  ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
  ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function drawFood() {
  ctx.fillStyle = "lightgreen";
  ctx.strokestyle = "darkgreen";
  ctx.fillRect(foodX, foodY, 10, 10);
  ctx.strokeRect(foodX, foodY, 10, 10);
}

function drawSnake() {
  snake.forEach(drawSnakePart);
}

function drawScore() {
  ctx.font = "20px Arial";
  ctx.fillStyle = "#000";
  ctx.strokeStyle = "#000";
  ctx.fillText("Score: " + score, 10, 20);
}

function hasGameEnded() {
  // if (isBoundaryObstacle || isSnakeBody) {
  // if (isSnakeBody) {
  //   for (let i = 3; i < snake.length; i++) {
  //     if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
  //       return true;
  //     }
  //   }
  // }

  // if (isBoundaryObstacle) {
  const hitLeftWall = snake[0].x < 0;
  const hitRightWall = snake[0].x > dimension.w - 10;
  const hitTopWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y > dimension.h - 10;

  return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
  //   }
  // } else {
  //   return false;
  // }
}

function hasSnakeTouchedItself() {
  for (let i = 3; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }

  return false;
}

function randomFood(min, max) {
  return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

function generateFood() {
  foodX = randomFood(0, dimension.w - 10);
  foodY = randomFood(0, dimension.h - 10);

  snake.forEach(function hasSnakeEatenFood(part) {
    let hasEaten = part.x === foodX && part.y === foodY;
    if (hasEaten) {
      generateFood();
    }
  });
}

function changeDirection(event) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;

  if (changingDirection) {
    return;
  }
  changingDirection = true;

  const keyPressed = event.keyCode;

  let goingUp = dy === -10;
  let goingDown = dy === 10;
  let goingLeft = dx === -10;
  let goingRight = dx === 10;

  if (isGoingLeft) {
    if (keyPressed === LEFT_KEY && !goingRight) {
      dx = -10;
      dy = 0;
    }
  }

  if (isGoingUp) {
    if (keyPressed === UP_KEY && !goingDown) {
      dx = 0;
      dy = -10;
    }
  }

  if (isGoingRight) {
    if (keyPressed === RIGHT_KEY && !goingLeft) {
      dx = 10;
      dy = 0;
    }
  }

  if (isGoingDown) {
    if (keyPressed === DOWN_KEY && !goingUp) {
      dx = 0;
      dy = 10;
    }
  }
}

function setGoingUp() {
  isGoingUp = true;
}

function setGoingdown() {
  isGoingDown = true;
}

function setGoingLeft() {
  isGoingLeft = true;
}

function setGoingRight() {
  isGoingRight = true;
}

function setBoundaryObstacles() {
  isBoundaryObstacle = true;
}
function setIncreaseScore() {
  isScoreIncreased = true;
}
// main logic of game
function main() {
  if (stop) {
    reset();
  } else {
    //   changingDirection = false;
    try {
      eval(newCode);
    } catch (e) {
      alert(e);
    }
  }
}

function setBackground(color) {
  bg = color;
}

function clear() {
  ctx.clearRect(0, 0, dimension.w, dimension.h);
}

function endGame() {
  stop = true;
}

export default dimension;
export {
  changeDirection,
  generateFood,
  setBoundaryObstacles,
  clearCanvas,
  main,
  bg
};
