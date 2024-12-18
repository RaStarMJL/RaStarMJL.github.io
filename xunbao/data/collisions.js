const collisions = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 101, 101,
  101, 101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 101, 0, 0, 0, 0, 101, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 101, 0, 0, 0, 0, 101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 101, 0,
  0, 0, 0, 101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 101, 0, 0, 101, 0, 0, 0, 0, 0,
  0, 0, 101, 101, 101, 0, 0, 101, 0, 0, 101, 0, 0, 101, 101, 101, 0, 101, 0, 0,
  0, 101, 101, 0, 0, 0, 0, 101, 101, 0, 0, 0, 101, 101, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 101, 101, 0, 0, 0, 101, 101, 0, 0, 0, 0, 101, 101, 0, 0, 0,
  101, 0, 101, 101, 101, 0, 0, 101, 0, 0, 101, 0, 0, 101, 101, 101, 0, 0, 0, 0,
  0, 0, 101, 101, 101, 101, 101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 101, 0, 0, 0,
  0, 101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 101, 0, 0, 0, 0, 101, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 101, 0, 0, 0, 0, 101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 101, 101,
  101, 101, 0, 0, 0, 0, 0, 0,
];
// let collisions = [];

// fetch(
//   "https://raw.githubusercontent.com/RaStarMJL/RaStarMJl.github.io/main/data/collisions.txt"
//   // "https://github.com/RaStarMJL/RaStarMJl.github.io/blob/main/treasure2/user.txt"
// )
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error("Network response was not ok " + response.statusText);
//     }
//     return response.text();
//   })
//   .then((data) => {
//     console.log(data);
//     const array = data
//       .trim()
//       .split(",")
//       .map((num) => num.trim())
//       .map(Number);
//     console.log(array);
//     collisions = array;
//     startGame();
//   })
//   .catch((error) => {
//     console.error("There has been a problem with your fetch operation:", error);
//   });
