import { ctx } from "./App";

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
let isDrawSnake = false;
let isMoveSnake = false;
let isGenerateFood = false;
let startEating = false;
let isBoundaryObstacle = false;
let eaten = false;

function main() {
  if (hasGameEnded()) {
    clearTimeout(myTimeout);
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
  } else {
    changingDirection = false;
    myTimeout = setTimeout(function onTick() {
      ctx.clearRect(0, 0, dimension.w, dimension.h);
      if (isGenerateFood) drawFood();
      if (checkFood()) {
        eat();
      }
      if (isMoveSnake) moveSnake();
      if (isDrawSnake) drawSnake();

      main();
    }, 200);
  }
}

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  // let hasSnakeEatenFood = false;
  // if (startEating) {
  //   hasSnakeEatenFood = snake[0].x === foodX && snake[0].y === foodY;
  // }

  // const hasSnakeEatenFood = snake[0].x === foodX && snake[0].y === foodY;
  // if (eaten) {
  //   score += 5;
  //   // document.getElementById("score").innerHTML = "Score: " + score;
  //   console.log("Score: " + score);
  //   generateFood();
  // } else {
  //   snake.pop();
  // }
  if (!eaten) {
    snake.pop();
  }
  eaten = false;

  // startEating = false;
}
function eat() {
  eaten = true;
  score += 5;
  // document.getElementById("score").innerHTML = "Score: " + score;
  console.log("Score: " + score);
  generateFood();
  // startEating = false;
}
function checkFood() {
  const hasEaten = snake[0].x === foodX && snake[0].y === foodY;
  if (hasEaten) {
    // startEating = true;
    // console.log("working");
    return true;
  } else return false;
}

function clearCanvas() {
  ctx.clearRect(0, 0, dimension.w, dimension.h);
  clearTimeout(myTimeout);
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

function hasGameEnded() {
  if (isBoundaryObstacle) {
    for (let i = 3; i < snake.length; i++) {
      if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
        return true;
      }
    }

    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > dimension.w - 10;
    const hitTopWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > dimension.h - 10;

    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
  } else {
    return false;
  }
}

function randomFood(min, max) {
  return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

function generateFood() {
  foodX = randomFood(0, dimension.w - 10);
  foodY = randomFood(0, dimension.h - 10);

  snake.forEach(function hasSnakeEatenFood(part) {
    // const hasEaten = part.x === foodX && part.y === foodY;
    let hasEaten = false;
    if (startEating) {
      hasEaten = part.x === foodX && part.y === foodY;
    }
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
  // console.log(keyPressed);

  const goingUp = dy === -10;
  const goingDown = dy === 10;
  const goingLeft = dx === -10;
  const goingRight = dx === 10;

  if (keyPressed === LEFT_KEY && !goingRight) {
    dx = -10;
    dy = 0;
  }
  if (keyPressed === UP_KEY && !goingDown) {
    dx = 0;
    dy = -10;
  }
  if (keyPressed === RIGHT_KEY && !goingLeft) {
    dx = 10;
    dy = 0;
  }
  if (keyPressed === DOWN_KEY && !goingUp) {
    dx = 0;
    dy = 10;
  }
}

function setIsSnakeDraw() {
  isDrawSnake = true;
}

function setIsMoveSnake() {
  isMoveSnake = true;
}

function setGenerateFood() {
  isGenerateFood = true;
}

function clear() {
  generateFood();
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
  isDrawSnake = false;
  isMoveSnake = false;
  isGenerateFood = false;
  startEating = false;
  isBoundaryObstacle = false;
  clearTimeout(myTimeout);
}

function setStartEating() {
  startEating = true;
}

function setBoundaryObstacles() {
  isBoundaryObstacle = true;
}

export default dimension;
export {
  changeDirection,
  main,
  generateFood,
  setIsSnakeDraw,
  setIsMoveSnake,
  setGenerateFood,
  clear,
  setStartEating,
  setBoundaryObstacles,
  clearCanvas
};
