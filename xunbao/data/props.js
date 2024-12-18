const props = [];

// 绘制地图道具
const coinsImage = new Image();
const torch1Image = new Image();
const torch2Image = new Image();
const key1Image = new Image();
const flask1Image = new Image();
coinsImage.src = "./imgs/props/coins_.png";
torch1Image.src = "./imgs/props/torch1.png";
torch2Image.src = "./imgs/props/torch2.png";
key1Image.src = "./imgs/props/key1.png";
flask1Image.src = "./imgs/props/flask1.png";
// console.log(coinsImage);
const coins = new Sprite({
  position: {
    x: 48 * 6,
    y: 48 * 2,
  },
  image: coinsImage,
  frames: { max: 4 },
  animate: true,
  playInterval: 30,
});
const coin2 = new Sprite({
  position: {
    x: 48 * 7,
    y: 48 * 2,
  },
  image: coinsImage,
  frames: { max: 4 },
  animate: true,
  playInterval: 30,
  frameCurrent: 1,
});

const torch1 = new Sprite({
  position: {
    x: 48 * 6,
    y: 48 * 3,
  },
  image: torch1Image,
  frames: { max: 4 },
  animate: true,
  playInterval: 30,
});

const torch2 = new Sprite({
  position: {
    x: 48 * 9,
    y: 48 * 3,
  },
  image: torch2Image,
  frames: { max: 4 },
  animate: true,
  playInterval: 30,
});

const torch3 = new Sprite({
  position: {
    x: 48 * 6,
    y: 48 * 13,
  },
  image: torch1Image,
  frames: { max: 4 },
  animate: true,
  playInterval: 30,
});

const torch4 = new Sprite({
  position: {
    x: 48 * 9,
    y: 48 * 13,
  },
  image: torch2Image,
  frames: { max: 4 },
  animate: true,
  playInterval: 30,
});

const key1 = new Sprite({
  position: {
    x: 48 * 13,
    y: 48 * 7,
  },
  image: key1Image,
  frames: { max: 4 },
  animate: true,
  playInterval: 30,
});

const flask1 = new Sprite({
  position: {
    x: 48 * 12,
    y: 48 * 9,
  },
  image: flask1Image,
  frames: { max: 4 },
  animate: true,
  playInterval: 30,
});

props.push(coins, coin2, torch1, torch2, torch3, torch4, key1, flask1);
