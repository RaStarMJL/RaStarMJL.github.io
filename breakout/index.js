let score = 0;
let lives = 3;
let pause = false;
const scoreElement = document.querySelector(".score");
const livesElement = document.querySelector(".lives");
// 获取canvas元素
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// 设置canvas尺寸
canvas.width = 1200;
canvas.height = 600;

// 定义游戏变量
let ball = {
  x: canvas.width / 2,
  y: canvas.height - 30,
  vx: 3,
  vy: -3,
  radius: 10,
  color: "white",
};

const paddle = {
  x: canvas.width / 2 - 75,
  y: canvas.height - 20,
  width: 150,
  height: 20,
};

// 生成随机颜色
function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

let bricks = [];
for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 10; j++) {
    bricks.push({
      x: 5 + j * 120,
      y: 5 + i * 30,
      width: 110,
      height: 20,
      color: getRandomColor(),
      visible: true, // 添加一个可见属性，用于表示砖块是否可见
      currentSize: 1,
    });
  }
}

// 绘制游戏元素
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 绘制球
  ctx.fillStyle = ball.color;
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
  ctx.fill();

  // 绘制挡板
  ctx.fillStyle = "white";
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);

  // 绘制砖块
  for (const brick of bricks) {
    if (brick.visible) {
      ctx.fillStyle = brick.color;
      ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
    }
    // 渐变缩小
    if (!brick.visible && brick.currentSize > 0) {
      const decreaseRate = 0.02; // 每帧减少的大小比例
      brick.currentSize -= decreaseRate;
      if (brick.currentSize <= 0) {
        return; // 如果砖块大小小于等于0，则停止动画
      }
      // 根据当前大小重新绘制砖块
      ctx.fillStyle = brick.color;
      ctx.fillRect(
        brick.x + (brick.width * (1 - brick.currentSize)) / 2,
        brick.y + (brick.height * (1 - brick.currentSize)) / 2,
        brick.width * brick.currentSize,
        brick.height * brick.currentSize
      );
    }
  }
}

// 更新游戏状态
function update() {
  // 移动球
  ball.x += ball.vx;
  ball.y += ball.vy;

  // 球碰到边缘反弹
  if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
    ball.vx = -ball.vx;
  }
  if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
    ball.vy = -ball.vy;
  }

  // 小球弹回来时检查是否与底部边缘碰撞
  if (ball.y + ball.radius > canvas.height) {
    lives--;
    livesElement.textContent = `Lives: ${lives}`;
    if (lives > 0) {
      // 重置小球位置
      ball.x = canvas.width / 2;
      ball.y = canvas.height - 30;
      ball.vx = 3;
      ball.vy = 3;
      // 重置挡板位置
      paddle.x = canvas.width / 2 - 75;
      paddle.y = canvas.height - 20;
      document.querySelector(".pause-game-container").style.display = "block";
      document.querySelector("#pause-text").innerHTML =
        "您失去了一条生命，当前剩余生命： " + lives;
      pause = true;
    } else {
      console.log("游戏结束");
      pause = true;
      document.querySelector("#final-score").textContent = score;
      document.querySelector(".game-over-container").style.display = "block";
    }
  }

  // 检查与挡板碰撞
  if (
    ball.y + ball.radius > paddle.y &&
    ball.x > paddle.x &&
    ball.x < paddle.x + paddle.width
  ) {
    ball.vy = -ball.vy;
  }

  // 检测与砖块碰撞
  for (const brick of bricks) {
    if (
      brick.visible && // 确保砖块是可见的
      ball.x + ball.radius > brick.x &&
      ball.x - ball.radius < brick.x + brick.width &&
      ball.y + ball.radius > brick.y &&
      ball.y - ball.radius < brick.y + brick.height
    ) {
      ball.color = brick.color;
      scoreElement.textContent = `Score: ${(score += 10)}`;
      brick.visible = false; // 碰撞后设置砖块不可见
      ball.vy = -ball.vy;
      return;
    }
  }
}

// 主游戏循环
function loop() {
  if (pause) {
    return;
  }
  draw();
  update();
  requestAnimationFrame(loop);
}

// 处理鼠标移动
function handleMouseMove(event) {
  const canvasRect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - canvasRect.left;
  if (mouseX < paddle.width / 2 || mouseX > canvas.width - paddle.width / 2) {
    return;
  } else {
    paddle.x = mouseX - paddle.width / 2;
  }
}

// 添加鼠标移动事件监听器
document.addEventListener("mousemove", handleMouseMove);

const startGameButton = document.querySelector(".start-game-button");

startGameButton.addEventListener("click", () => {
  document.querySelector(".start-game-container").style.display = "none";
  loop();
});

const resumeButton = document.querySelector(".resume-game-button");

resumeButton.addEventListener("click", () => {
  document.querySelector(".pause-game-container").style.display = "none";
  pause = false;
  loop();
});

const restartButton = document.querySelector(".restart-game-button");

restartButton.addEventListener("click", () => {
  document.querySelector(".game-over-container").style.display = "none";
  score = 0;
  lives = 3;
  scoreElement.textContent = `Score: ${score}`;
  livesElement.textContent = `Lives: ${lives}`;
  pause = false;
  bricks = [];
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 10; j++) {
      bricks.push({
        x: 5 + j * 120,
        y: 5 + i * 30,
        width: 110,
        height: 20,
        color: getRandomColor(),
        visible: true, // 添加一个可见属性，用于表示砖块是否可见
        currentSize: 1,
      });
    }
  }
  ball = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    vx: 3,
    vy: -3,
    radius: 10,
    color: "white",
  };

  loop();
});
