// 边界对象
class Boundary {
  static width = 48;
  static height = 48;
  constructor({ position }) {
    this.position = position;
    this.width = 48;
    this.height = 48;
  }

  draw() {
    ctx.fillStyle = "rgba(255,0,0,0.0)";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

class Sprite {
  constructor({
    position,
    velocity,
    image,
    frames = { max: 1 },
    sprites,
    animate = false,
    playInterval = 10,
    frameCurrent = 0,
  }) {
    this.position = position;
    this.image = image;
    this.frames = { ...frames, current: frameCurrent, elapsed: 0 };
    this.image.onload = () => {
      this.width = this.image.width / this.frames.max;
      this.height = this.image.height;
    };
    this.animate = animate;
    this.sprites = sprites;
    this.playInterval = playInterval;
    this.frameCurrent = frameCurrent;
  }

  draw() {
    ctx.drawImage(
      this.image,
      this.frames.current * (this.image.width / this.frames.max), // 裁剪图片的起始位置
      0, // 裁剪图片的起始位置
      this.image.width / this.frames.max, // 裁剪图片的宽度
      this.image.height, // 裁剪图片的高度
      this.position.x, // 绘制图片的起始位置
      this.position.y, // 绘制图片的起始位置
      this.image.width / this.frames.max, // 绘制图片的宽度
      this.image.height // 绘制图片的高度
    );
    if (!this.animate) return;
    if (this.frames.max > 1) {
      this.frames.elapsed++;
    }
    if (this.frames.elapsed % this.playInterval === 0) {
      if (this.frames.current < this.frames.max - 1) {
        this.frames.current++;
      } else {
        this.frames.current = 0;
      }
    }
  }
}

class Player extends Sprite {
  constructor({ position, velocity, image }) {
    super({ position, velocity, image });
    // 添加角色属性
    this.maxHp = 100;
    this.hp = 100;
    this.maxEnergy = 100;
    this.energy = 100;
    this.attack = 10;
    this.updateStatusBar();
  }

  // 添加更新状态栏的方法
  updateStatusBar() {
    document.getElementById("hp").textContent = this.hp;
    document.getElementById("energy").textContent = this.energy;
    document.getElementById("attack").textContent = this.attack;
  }

  // 在受伤方法中添加状态更新
  takeDamage(damage) {
    this.hp -= damage;
    if (this.hp < 0) this.hp = 0;
    this.updateStatusBar();
  }

  // 在使用能量时添加状态更新
  useEnergy(amount) {
    this.energy -= amount;
    if (this.energy < 0) this.energy = 0;
    this.updateStatusBar();
  }

  // 在恢复能量时添加状态更新
  recoverEnergy(amount) {
    this.energy += amount;
    if (this.energy > this.maxEnergy) this.energy = this.maxEnergy;
    this.updateStatusBar();
  }
}
