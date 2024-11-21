const board = document.getElementById("game-board");
const scoreElement = document.getElementById("score");
const startBtn = document.getElementById("start-btn");

let snake = [{ x: 200, y: 200 }];
let food = { x: 0, y: 0 };
let direction = { x: 0, y: 0 };
let score = 0;
let gameInterval;

function createFood() {
    food.x = Math.floor(Math.random() * 20) * 20;
    food.y = Math.floor(Math.random() * 20) * 20;

    const foodElement = document.createElement("div");
    foodElement.classList.add("food");
    foodElement.style.left = `${food.x}px`;
    foodElement.style.top = `${food.y}px`;
    board.appendChild(foodElement);
}

function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    if (
        head.x < 0 ||
        head.x >= 400 ||
        head.y < 0 ||
        head.y >= 400 ||
        snake.some(segment => segment.x === head.x && segment.y === head.y)
    ) {
        clearInterval(gameInterval);
        alert("Game Over! Your score: " + score);
        return;
    }

    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreElement.innerText = "Score: " + score;
        board.removeChild(document.querySelector(".food"));
        createFood();
    } else {
        snake.pop();
    }

    snake.unshift(head);
    drawSnake();
}

function drawSnake() {
    board.innerHTML = "";
    snake.forEach((segment, index) => {
        const segmentElement = document.createElement("div");
        segmentElement.classList.add("snake");
        segmentElement.style.left = `${segment.x}px`;
        segmentElement.style.top = `${segment.y}px`;

        
        if (index === 0) {
            segmentElement.style.backgroundColor = "#1abc9c"; // Head color
        } else {
            segmentElement.style.backgroundColor = "#16a085"; // Body color
        }

        board.appendChild(segmentElement);
    });

    const foodElement = document.createElement("div");
    foodElement.classList.add("food");
    foodElement.style.left = `${food.x}px`;
    foodElement.style.top = `${food.y}px`;
    board.appendChild(foodElement);
}

function changeDirection(event) {
    switch (event.key) {
        case "ArrowUp":
            if (direction.y === 0) direction = { x: 0, y: -20 };
            break;
        case "ArrowDown":
            if (direction.y === 0) direction = { x: 0, y: 20 };
            break;
        case "ArrowLeft":
            if (direction.x === 0) direction = { x: -20, y: 0 };
            break;
        case "ArrowRight":
            if (direction.x === 0) direction = { x: 20, y: 0 };
            break;
    }
}

function startGame() {
    clearInterval(gameInterval);
    snake = [{ x: 200, y: 200 }];
    direction = { x: 0, y: 0 };
    score = 0;
    scoreElement.innerText = "Score: " + score;
    board.innerHTML = "";
    createFood();
    gameInterval = setInterval(moveSnake, 200);
}

document.addEventListener("keydown", changeDirection);
startBtn.addEventListener("click", startGame);