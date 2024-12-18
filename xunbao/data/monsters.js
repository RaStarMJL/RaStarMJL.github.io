const monsters = [];

const monster1Image = new Image();
monster1Image.src = "./imgs/monsters/monster1.png";
const monster2Image = new Image();
monster2Image.src = "./imgs/monsters/monster2.png";
const monster3Image = new Image();
monster3Image.src = "./imgs/monsters/monster3_reveal.png";

const monster1 = new Sprite({
  position: {
    x: 48 * 7,
    y: 48 * 3,
  },
  image: monster1Image,
  frames: { max: 4 },
  animate: true,
  playInterval: 30,
});

const monster2 = new Sprite({
  position: {
    x: 48 * 2,
    y: 48 * 8,
  },
  image: monster2Image,
  frames: { max: 4 },
  animate: true,
  playInterval: 30,
});

const monster3 = new Sprite({
  position: {
    x: 48 * 8,
    y: 48 * 10,
  },
  image: monster3Image,
  frames: { max: 4 },
  animate: true,
  playInterval: 30,
});

monsters.push(monster1, monster2, monster3);
