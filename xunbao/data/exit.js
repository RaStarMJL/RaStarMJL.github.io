const exites = [];
const exitImage = new Image();
exitImage.src = "./imgs/props/出口.png";

const exitArrowImage = new Image();
exitArrowImage.src = "./imgs/props/exitArrow.png";

const exit = new Sprite({
  position: {
    x: 48 * 7,
    y: 48 * 13,
  },
  image: exitImage,
});

const exitArrow = new Sprite({
  position: {
    x: 48 * 7,
    y: 48 * 12,
  },
  image: exitArrowImage,
  frames: { max: 4 },
  animate: true,
  playInterval: 30,
});

exites.push(exit, exitArrow);
