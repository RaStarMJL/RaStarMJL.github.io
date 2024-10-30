// 获取画布元素
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// 设置画布大小
canvas.width = window.innerWidth - 200;
canvas.height = window.innerHeight - 200;

const speedRange = [-5, -3, -1, 1, 3, 5];
// 定义小球类
class Ball {

  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.vx = speedRange[Math.floor(Math.random() * speedRange.length)];
    this.vy = speedRange[Math.floor(Math.random() * speedRange.length)];
  }

  draw () {
    ctx.globalCompositeOperation = 'source-over';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update () {
    this.x += this.vx;
    this.y += this.vy;

    // 检查是否碰撞到边界
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.vx = -this.vx;
    }
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.vy = -this.vy;
    }

    // 检查是否碰撞到其他小球
    for (let i = 0; i < balls.length; i++) {
      if (i !== this.index && this.checkCollision(balls[i])) {
        this.vx = -this.vx;
        this.vy = -this.vy;
        balls[i].vx = -balls[i].vx;
        balls[i].vy = -balls[i].vy;
      }
    }
  }

  update2 () {
    this.x += this.vx;
    this.y += this.vy;

    // 检查是否碰撞到边界
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.vx = -this.vx;
    }
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.vy = -this.vy;
    }
  }

  checkCollision (ball) {
    const dx = this.x - ball.x;
    const dy = this.y - ball.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < this.radius + ball.radius;
  }
}

// 创建小球数组
const balls = [];
for (let i = 0; i < 20; i++) {
  let x, y;
  do {
    x = Math.random() * (canvas.width - 2 * 20) + 20;
    y = Math.random() * (canvas.height - 2 * 20) + 20;
  } while (
    // 避免小球出现在屏幕边缘
    x < 20 ||
    x > canvas.width - 20 ||
    y < 20 ||
    y > canvas.height - 20
  );
  balls.push(new Ball(x, y, 20, `#${Math.floor(Math.random() * 16777215).toString(16)}`));
}

// 主循环
function animate () {
  // 清除画布
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 设置背景色为透明的黑色
  ctx.globalCompositeOperation = 'destination-out';
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 绘制小球
  for (let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
  }

  // 恢复绘图状态
  ctx.globalCompositeOperation = 'source-over';

  // 请求下一帧动画
  requestAnimationFrame(animate);
}

animate();
