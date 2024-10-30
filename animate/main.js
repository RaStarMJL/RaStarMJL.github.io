const aliceTumbling = [
  { transform: "rotate(0) scale(1)" },
  { transform: "rotate(360deg) scale(0)" },
];

const aliceTiming = {
  duration: 2000,
  iterations: 1,
  fill: "forwards",
};

const alice1 = document.querySelector("#alice1");
const alice2 = document.querySelector("#alice2");
const alice3 = document.querySelector("#alice3");

const f1 = () => {
  console.log(111);
  alice1.animate(aliceTumbling, aliceTiming).finished.then(() => {
    console.log(222);
    alice2.animate(aliceTumbling, aliceTiming).finished.then(() => {
      console.log(333);
      alice3.animate(aliceTumbling, aliceTiming);
    });
  });
};

const f2 = () => {
  console.log(111);
  alice1
    .animate(aliceTumbling, aliceTiming)
    .finished.then(() => {
      console.log(222);
      return alice2.animate(aliceTumbling, aliceTiming).finished;
    })
    .then(() => {
      console.log(333);
      return alice3.animate(aliceTumbling, aliceTiming).finished;
    })
    .then(() => {
      console.log("完成");
    })
    .catch((e) => {
      console.log(e);
    });
};

const f3 = async () => {
  console.log(111);
  await alice1.animate(aliceTumbling, aliceTiming).finished;
  console.log(222);
  await alice2.animate(aliceTumbling, aliceTiming).finished;
  console.log(333);
  await alice3.animate(aliceTumbling, aliceTiming).finished;
};

// f1();
