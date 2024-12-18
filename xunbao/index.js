let gameStarted = false;

document.getElementById("start-button").addEventListener("click", () => {
  document.getElementById("start-screen").style.display = "none";
  gameStarted = true;
  startGame();
  document.getElementById("bgm").play();
});

const canvas = document.querySelector("canvas");

const ctx = canvas.getContext("2d");
canvas.width = 756;
canvas.height = 756;

const collision_map = [];
for (let i = 0; i < collisions.length; i += 16) {
  collision_map.push(collisions.slice(i, i + 16));
}

// 边界对象数组
const boundaries = [];

collision_map.forEach((row, i) => {
  row.forEach((cell, j) => {
    // 只有101是边界
    if (cell === 101) {
      boundaries.push(
        new Boundary({
          position: { x: j * Boundary.width, y: i * Boundary.height },
        })
      );
    }
  });
});

// 玩家初始位置
const player_start_position = {
  x: 48 * 7 - 30,
  y: 48 * 7 - 40,
};
// 地图背景
const image = new Image();
image.src = "./imgs/map2.png";
// 角色图片
const playerDownImage = new Image();
playerDownImage.src = "./imgs/player_down.png";
const playerLeftImage = new Image();
playerLeftImage.src = "./imgs/player_left_down.png";
const playerRightImage = new Image();
playerRightImage.src = "./imgs/player_right_down.png";
const playerUpImage = new Image();
playerUpImage.src = "./imgs/player_up.png";
// 背景
const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  image: image,
  frames: {
    max: 1,
  },
});

// 角色
const player = new Sprite({
  position: player_start_position,
  image: playerDownImage,
  frames: {
    max: 8,
  },
  sprites: {
    down: {
      image: playerDownImage,
      frames: { max: 8 },
    },
    left: {
      image: playerLeftImage,
      frames: { max: 8 },
    },
    right: {
      image: playerRightImage,
      frames: { max: 8 },
    },
    up: {
      image: playerUpImage,
      frames: { max: 8 },
    },
  },
});

const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

const testBoundary = new Boundary({
  position: { x: 48 * 8, y: 48 * 8 },
});

const rectangularCollision = ({ rect1, rect2 }) => {
  return (
    rect1.position.x + (rect1.width * 2) / 3 >= rect2.position.x &&
    rect1.position.x + rect1.width / 3 <= rect2.position.x + rect2.width &&
    rect1.position.y + (rect1.height * 2) / 3 >= rect2.position.y &&
    rect1.position.y + rect1.height / 3 + 20 <= rect2.position.y + rect2.height
  );
};

function animate() {
  if (!gameStarted) return;

  requestAnimationFrame(animate);
  // 绘制背景
  background.draw();
  // 绘制边界
  // testBoundary.draw();  // 测试边界
  boundaries.forEach((boundary) => {
    boundary.draw();
  });
  // 绘制道具
  props.forEach((prop) => {
    prop.draw();
  });
  // 绘制怪物
  monsters.forEach((monster) => {
    monster.draw();
  });
  // 绘制出口
  exites.forEach((exit) => {
    exit.draw();
  });
  // 绘制角色
  player.draw();
  // 键盘处于运动状态
  let moving = true;
  // 角色初始状态
  player.animate = false;
  // 角色移动
  if (keys.w.pressed && lastKey === "w") {
    player.animate = true;
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rect1: {
            ...player,
            position: {
              x: player.position.x,
              y: player.position.y - 0.7,
            },
          },
          rect2: boundary,
        })
      ) {
        moving = false;
        break;
      }
    }
    if (moving) {
      player.position.y -= 0.7;
    }
  } else if (keys.s.pressed && lastKey === "s") {
    player.animate = true;
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rect1: {
            ...player,
            position: {
              x: player.position.x,
              y: player.position.y + 0.7,
            },
          },
          rect2: boundary,
        })
      ) {
        moving = false;
        break;
      }
    }
    if (moving) {
      player.position.y += 0.7;
    }
  } else if (keys.a.pressed && lastKey === "a") {
    player.animate = true;
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rect1: {
            ...player,
            position: {
              x: player.position.x - 0.7,
              y: player.position.y,
            },
          },
          rect2: boundary,
        })
      ) {
        moving = false;
        break;
      }
    }
    if (moving) {
      player.position.x -= 0.7;
    }
  } else if (keys.d.pressed && lastKey === "d") {
    player.animate = true;
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rect1: {
            ...player,
            position: {
              x: player.position.x + 0.7,
              y: player.position.y,
            },
          },
          rect2: boundary,
        })
      ) {
        moving = false;
        break;
      }
    }
    if (moving) {
      player.position.x += 0.7;
    }
  }
}

// 添加保存和加载玩家数据的函数
function savePlayerPosition() {
  const playerData = {
    x: player.position.x,
    y: player.position.y,
    hp: player.hp,
    energy: player.energy,
    attack: player.attack,
  };
  localStorage.setItem("playerData", JSON.stringify(playerData));
}

function loadPlayerPosition() {
  const savedData = localStorage.getItem("playerData");
  if (savedData) {
    const playerData = JSON.parse(savedData);
    return playerData;
  }
  return {
    x: player_start_position.x,
    y: player_start_position.y,
    hp: 100,
    energy: 100,
    attack: 10,
  };
}

// 修改 startGame 函数
function startGame() {
  // 加载保存的位置和状态
  const savedData = loadPlayerPosition();
  player.position.x = savedData.x;
  player.position.y = savedData.y;
  // player.hp = savedData.hp;
  // player.energy = savedData.energy;
  // player.attack = savedData.attack;
  // player.updateStatusBar();

  animate();
}

// 添加页面关闭事件监听
window.addEventListener("beforeunload", () => {
  savePlayerPosition();
});

// animate();
let lastKey = "";
// 玩家移动
window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
    case "w":
      player.image = player.sprites.up.image;
      keys.w.pressed = true;
      lastKey = "w";
      break;
    case "ArrowDown":
    case "s":
      player.image = player.sprites.down.image;
      keys.s.pressed = true;
      lastKey = "s";
      break;
    case "ArrowLeft":
    case "a":
      player.image = player.sprites.left.image;
      keys.a.pressed = true;
      lastKey = "a";
      break;
    case "ArrowRight":
    case "d":
      player.image = player.sprites.right.image;
      keys.d.pressed = true;
      lastKey = "d";
      break;
  }
});

window.addEventListener("keyup", (e) => {
  // 按键释放
  for (let key in keys) {
    keys[key].pressed = false;
  }
  // 角色停止移动
  player.animate = false;

  // 角色回到第一帧
  // player.frames.current = 0;
});
