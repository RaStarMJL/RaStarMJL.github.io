// 获取画布元素
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

// 设置画布大小
canvas.width = window.innerWidth - 200;
canvas.height = window.innerHeight - 200;

// 设置画布背景颜色
canvas.style.background = "#010101";

let isCircleRegionRed = false;
let lastChangedTime = 0;
const redDuration = 500; // 红色显示的持续时间，单位毫秒

const speedRange = [-8, -5, 5, 8, 10];
const ballSizeRange = [15, 16, 17, 18, 19, 20, 22, 25];
// 定义小球类
class Ball {
  constructor(index, x, y, color) {
    this.index = index;
    this.x = x;
    this.y = y;
    this.radius =
      ballSizeRange[Math.floor(Math.random() * ballSizeRange.length)];
    this.color = color;
    this.vx = speedRange[Math.floor(Math.random() * speedRange.length)];
    this.vy = speedRange[Math.floor(Math.random() * speedRange.length)];
  }

  draw() {
    ctx.globalCompositeOperation = "source-over";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  // 碰撞时更改方向
  update() {
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

  // 碰撞时更改颜色
  update2() {
    this.x += this.vx;
    this.y += this.vy;

    // 检查是否碰撞到边界
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.vx = -this.vx;
    }
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.vy = -this.vy;
    }

    // 获取当前小球的index
    const index = balls.indexOf(this);

    // 检查是否碰撞到其他小球
    for (let i = 0; i < balls.length; i++) {
      if (i !== index && this.checkCollision(balls[i])) {
        this.color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      }
    }

    // 检查是否碰撞到恶魔圈
    if (this.checkCollision2(circleRegion)) {
      console.log("碰撞到恶魔圈");
      balls.splice(index, 1);
      // 设置恶魔圈为红色
      isCircleRegionRed = true;
      lastChangedTime = performance.now();
      // console.log(lastChangedTime);
      svg.src = "data:image/svg+xml;base64," + btoa(svgData2);
    }
  }

  checkCollision(ball) {
    const dx = this.x - ball.x;
    const dy = this.y - ball.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < this.radius + ball.radius;
  }

  checkCollision2(circleRegion) {
    const dx = this.x - circleRegion.x;
    const dy = this.y - circleRegion.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < this.radius + circleRegion.radius;
  }
}

// 定义圆形区域类
class CircleRegion {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  draw() {
    ctx.globalCompositeOperation = "source-over";
    ctx.drawImage(svg, this.x, this.y, this.radius, this.radius);
  }
}

// 创建小球数组
const balls = [];
for (let i = 0; i < 10; i++) {
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
  balls.push(
    new Ball(i, x, y, `#${Math.floor(Math.random() * 16777215).toString(16)}`)
  );
}

// 创建圆形区域
const circleRegion = new CircleRegion(canvas.width / 2, canvas.height / 2, 40);

// 加载 SVG 图像
var svgData = `<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1730290972964" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5443" id="mx_n_1730290972965" xmlns:xlink="http://www.w3.org/1999/xlink" width="128" height="128"><path d="M632.470588 481.882353c-33.28 0-60.235294-26.955294-60.235294-60.235294 0-1.114353 0.030118-2.198588 0.090353-3.282824 1.927529-44.664471 42.556235-74.300235 76.8-91.437176 32.707765-16.353882 65.024-24.515765 66.409412-24.877176 16.143059-4.035765 32.496941 5.782588 36.532706 21.925647s-5.782588 32.496941-21.925647 36.532706c-16.594824 4.186353-36.261647 11.414588-53.579294 20.088471 10.029176 10.752 16.173176 25.178353 16.173176 41.050353 0 33.28-26.955294 60.235294-60.235294 60.235294zM293.888 360.508235c-16.143059-4.035765-25.961412-20.389647-21.925647-36.532706s20.389647-25.961412 36.532706-21.925647c1.355294 0.331294 33.701647 8.523294 66.409412 24.877176 34.243765 17.106824 74.872471 46.772706 76.8 91.437176 0.060235 1.084235 0.090353 2.168471 0.090353 3.282824 0 33.28-26.955294 60.235294-60.235294 60.235294s-60.235294-26.955294-60.235294-60.235294c0-15.872 6.144-30.268235 16.173176-41.050353-17.317647-8.673882-37.014588-15.902118-53.579294-20.088471zM512 752.941176c76.769882 0 143.932235-41.020235 180.796235-102.339765l77.492706 46.501647c-52.675765 87.582118-148.630588 146.221176-258.288941 146.221176s-205.613176-58.608941-258.288941-146.221176l77.492706-46.501647c36.864 61.319529 104.026353 102.339765 180.796235 102.339765zM993.882353 120.470588c0-42.827294-8.975059-83.576471-25.088-120.470588-31.593412 72.312471-90.774588 129.807059-164.231529 159.232-81.136941-62.072471-182.543059-98.996706-292.562824-98.996706s-211.456 36.924235-292.562824 98.996706c-73.456941-29.394824-132.638118-86.919529-164.231529-159.232-16.112941 36.894118-25.088 77.643294-25.088 120.470588 0 69.240471 23.401412 133.029647 62.674824 183.898353-39.875765 70.144-62.674824 151.280941-62.674824 237.748706 0 266.149647 215.732706 481.882353 481.882353 481.882353s481.882353-215.732706 481.882353-481.882353c0-86.467765-22.799059-167.604706-62.674824-237.748706 39.273412-50.868706 62.674824-114.627765 62.674824-183.898353zM512 933.647059c-216.244706 0-391.529412-175.284706-391.529412-391.529412s175.284706-391.529412 391.529412-391.529412 391.529412 175.284706 391.529412 391.529412-175.284706 391.529412-391.529412 391.529412z" fill="#ffffff" p-id="5444"></path></svg>`;
var svgData2 = `<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1730290972964" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5443" id="mx_n_1730290972965" data-spm-anchor-id="a313x.search_index.0.i2.52633a81Xdxf5R" xmlns:xlink="http://www.w3.org/1999/xlink" width="128" height="128"><path d="M632.470588 481.882353c-33.28 0-60.235294-26.955294-60.235294-60.235294 0-1.114353 0.030118-2.198588 0.090353-3.282824 1.927529-44.664471 42.556235-74.300235 76.8-91.437176 32.707765-16.353882 65.024-24.515765 66.409412-24.877176 16.143059-4.035765 32.496941 5.782588 36.532706 21.925647s-5.782588 32.496941-21.925647 36.532706c-16.594824 4.186353-36.261647 11.414588-53.579294 20.088471 10.029176 10.752 16.173176 25.178353 16.173176 41.050353 0 33.28-26.955294 60.235294-60.235294 60.235294zM293.888 360.508235c-16.143059-4.035765-25.961412-20.389647-21.925647-36.532706s20.389647-25.961412 36.532706-21.925647c1.355294 0.331294 33.701647 8.523294 66.409412 24.877176 34.243765 17.106824 74.872471 46.772706 76.8 91.437176 0.060235 1.084235 0.090353 2.168471 0.090353 3.282824 0 33.28-26.955294 60.235294-60.235294 60.235294s-60.235294-26.955294-60.235294-60.235294c0-15.872 6.144-30.268235 16.173176-41.050353-17.317647-8.673882-37.014588-15.902118-53.579294-20.088471zM512 752.941176c76.769882 0 143.932235-41.020235 180.796235-102.339765l77.492706 46.501647c-52.675765 87.582118-148.630588 146.221176-258.288941 146.221176s-205.613176-58.608941-258.288941-146.221176l77.492706-46.501647c36.864 61.319529 104.026353 102.339765 180.796235 102.339765zM993.882353 120.470588c0-42.827294-8.975059-83.576471-25.088-120.470588-31.593412 72.312471-90.774588 129.807059-164.231529 159.232-81.136941-62.072471-182.543059-98.996706-292.562824-98.996706s-211.456 36.924235-292.562824 98.996706c-73.456941-29.394824-132.638118-86.919529-164.231529-159.232-16.112941 36.894118-25.088 77.643294-25.088 120.470588 0 69.240471 23.401412 133.029647 62.674824 183.898353-39.875765 70.144-62.674824 151.280941-62.674824 237.748706 0 266.149647 215.732706 481.882353 481.882353 481.882353s481.882353-215.732706 481.882353-481.882353c0-86.467765-22.799059-167.604706-62.674824-237.748706 39.273412-50.868706 62.674824-114.627765 62.674824-183.898353zM512 933.647059c-216.244706 0-391.529412-175.284706-391.529412-391.529412s175.284706-391.529412 391.529412-391.529412 391.529412 175.284706 391.529412 391.529412-175.284706 391.529412-391.529412 391.529412z" fill="#d81e06" p-id="5444" data-spm-anchor-id="a313x.search_index.0.i1.52633a81Xdxf5R" class=""></path></svg>`;
const svg = new Image();
svg.src = "data:image/svg+xml;base64," + btoa(svgData);

// 获取 SVG 图像的宽度和高度
const width = svg.width;
const height = svg.height;

let isDragging = false;
let offsetX, offsetY;

canvas.addEventListener("mousedown", (e) => {
  if (e.button === 0) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const distance = Math.sqrt(
      (x - circleRegion.x) ** 2 + (y - circleRegion.y) ** 2
    );
    if (distance < circleRegion.radius) {
      isDragging = true;
      offsetX = x - circleRegion.x;
      offsetY = y - circleRegion.y;
    }
  }
});

canvas.addEventListener("mousemove", (e) => {
  if (isDragging) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    circleRegion.x = x - offsetX;
    circleRegion.y = y - offsetY;
  }
});

canvas.addEventListener("mouseup", () => {
  isDragging = false;
});

// 主循环
function animate() {
  // 清除画布
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 设置背景色为透明的黑色
  ctx.globalCompositeOperation = "destination-out";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 绘制小球
  for (let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update2();
  }

  // 检查是否应该将恶魔圈颜色恢复为原始颜色
  if (isCircleRegionRed && performance.now() - lastChangedTime > redDuration) {
    console.log(performance.now());
    console.log("恢复原始SVG数据");
    isCircleRegionRed = false;
    svg.src = "data:image/svg+xml;base64," + btoa(svgData); // 恢复原始SVG数据
  }
  // 绘制圆形区域
  circleRegion.draw();

  // 恢复绘图状态
  ctx.globalCompositeOperation = "source-over";

  // 请求下一帧动画
  requestAnimationFrame(animate);
}

animate();
