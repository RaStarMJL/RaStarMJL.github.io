function ComputedSize(num, x, y) {
  var bigbox = document.querySelector(".bigbox");
  var box = document.querySelector(".box");
  var num = num;
  var array = []; //每一层
  var arrall = []; //所有层数
  var key = 1;
  var person = {
    life: 80,
    force: 400,
  };
  var monster1 = {
    life: 100,
    force: 200,
  };
  var monster2 = {
    life: 500,
    force: 200,
  };
  this.x = x;
  this.y = y;
  // 设置地图参数
  this.SetMap = function () {
    // 第一层
    var arr = [];
    for (let i = 0; i < x; i++) {
      arr.push([]);
      for (let j = 0; j < y; j++) {
        var value = 5;
        if (i == 0 && j == 0) {
          value = 1;
          // console.log(value);
        } else if ((i == 8 && j == 0) || (i == 6 && j == 1)) {
          value = 2;
        } else if ((i == 4 && j == 3) || (i == 3 && j == 0)) {
          value = 3;
          // console.log(value);
        } else if ((i == 8 && j == 7) || (i == 2 && j == 8)) {
          value = 4;
          // console.log(value);
        } else if (
          (i == 7 && j == 8) ||
          (i == 5 && j == 7) ||
          (i == 5 && j == 5) ||
          (i == 5 && j == 6) ||
          (i == 2 && j == 7) ||
          (i == 1 && j == 6) ||
          (i == 2 && j == 6) ||
          (i == 3 && j == 6) ||
          (i == 3 && j == 5) ||
          (i == 0 && j == 1) ||
          (i == 0 && j == 2) ||
          (i == 1 && j == 2) ||
          (i == 2 && j == 2) ||
          (i == 3 && j == 2) ||
          (i == 3 && j == 1) ||
          (i == 5 && j == 2) ||
          (i == 6 && j == 2) ||
          (i == 0 && j == 1) ||
          (i == 8 && j == 4) ||
          (i == 7 && j == 4) ||
          (i == 6 && j == 4) ||
          (i == 5 && j == 4) ||
          (i == 3 && j == 4) ||
          (i == 2 && j == 4) ||
          (i == 1 && j == 4) ||
          (i == 0 && j == 4) ||
          (i == 6 && j == 0) ||
          (i == 7 && j == 0) ||
          (i == 7 && j == 1) ||
          (i == 7 && j == 2) ||
          (i == 7 && j == 4) ||
          (i == 7 && j == 5) ||
          (i == 7 && j == 7)
        ) {
          value = 0;
          // console.log(value);
        } else if (i == 8 && j == 8) {
          value = 6;
          // console.log(value);
        } else if (
          (i == 4 && j == 0) ||
          (i == 0 && j == 5) ||
          (i == 1 && j == 3)
        ) {
          value = 7;
          // console.log(value);
        } else if (
          (i == 8 && j == 1) ||
          (i == 0 && j == 6) ||
          (i == 5 && j == 1)
        ) {
          value = 8;
          // console.log(value);
        } else if (
          (i == 0 && j == 3) ||
          (i == 0 && j == 5) ||
          (i == 2 && j == 5)
        ) {
          value = 9;
          // console.log(value);
        } else if ((i == 7 && j == 0) || (i == 0 && j == 3)) {
          value = 7;
          // console.log(value);
        }
        arr[i][j] = {
          width: null,
          height: null,
          value: value,
        };
        // console.log(array);
      }
    }
    arrall.push(arr);

    // 第二层
    /*     var arr = [];
    for (let i = 0; i < x; i++) {
      arr.push([]);
      for (let j = 0; j < y; j++) {
        var value = 5;
        if (i == 0 && j == 0) {
          value = 1;
          // console.log(value);
        } else if ((i == 8 && j == 0) || (i == 6 && j == 1)) {
          value = 2;
        } else if ((i == 4 && j == 3) || (i == 3 && j == 0)) {
          value = 3;
          // console.log(value);
        } else if ((i == 8 && j == 7) || (i == 2 && j == 8)) {
          value = 4;
          // console.log(value);
        } else if (
          (i == 7 && j == 8) ||
          (i == 5 && j == 5) ||
          (i == 5 && j == 6) ||
          (i == 2 && j == 7) ||
          (i == 2 && j == 6) ||
          (i == 3 && j == 6) ||
          (i == 3 && j == 5) ||
          (i == 0 && j == 1) ||
          (i == 0 && j == 2) ||
          (i == 1 && j == 2) ||
          (i == 2 && j == 2) ||
          (i == 3 && j == 2) ||
          (i == 3 && j == 1) ||
          (i == 5 && j == 2) ||
          (i == 6 && j == 2) ||
          (i == 0 && j == 1) ||
          (i == 8 && j == 4) ||
          (i == 7 && j == 4) ||
          (i == 6 && j == 4) ||
          (i == 5 && j == 4) ||
          (i == 3 && j == 4) ||
          (i == 2 && j == 4) ||
          (i == 1 && j == 4) ||
          (i == 0 && j == 4) ||
          (i == 6 && j == 0) ||
          (i == 7 && j == 0) ||
          (i == 7 && j == 1) ||
          (i == 7 && j == 2) ||
          (i == 7 && j == 4) ||
          (i == 7 && j == 5) ||
          (i == 7 && j == 7)
        ) {
          value = 0;
          // console.log(value);
        } else if (i == 8 && j == 8) {
          value = 6;
          // console.log(value);
        } else if ((i == 4 && j == 0) || (i == 0 && j == 5)) {
          value = 7;
          // console.log(value);
        } else if (
          (i == 8 && j == 1) ||
          (i == 0 && j == 6) ||
          (i == 5 && j == 1)
        ) {
          value = 8;
          // console.log(value);
        } else if ((i == 0 && j == 3) || (i == 0 && j == 5)) {
          value = 9;
          // console.log(value);
        } else if ((i == 7 && j == 0) || (i == 0 && j == 3)) {
          value = 7;
          // console.log(value);
        } else if (i == 0 && j == 8) {
          value = 10;
          // console.log(value);
        }
        arr[i][j] = {
          width: null,
          height: null,
          value: value,
        };
        // console.log(array);
      }
    }

    arrall.push(arr); */
  };

  // 加载地图
  this.BackG = function () {
    // this.BackG()="";
    bigbox.innerHTML = ""; //清除地图
    // console.log(array.length);
    var smallboxH =
      parseInt(getComputedStyle(bigbox).height) / array.length + "px";
    for (let i = 0; i < array.length; i++) {
      smallboxW =
        parseInt(getComputedStyle(bigbox).width) / array[i].length + "px";
      for (let j = 0; j < array[i].length; j++) {
        // 每张小图片的宽高
        array[i][j].height = smallboxH;
        array[i][j].width = smallboxW;
        // console.log(array[i][j].width, array[i][j].height);
        var img1 = document.createElement("img");
        img1.className = "img1";
        if (array[i][j].value == 0) {
          img1.src = "./imgs/墙.png";
        } else if (array[i][j].value == 1) {
          img1.src = "./imgs/人物.png";
        } else if (array[i][j].value == 2) {
          img1.src = "./imgs/剑.png";
        } else if (array[i][j].value == 3) {
          img1.src = "./imgs/怪3.png";
        } else if (array[i][j].value == 4) {
          img1.src = "./imgs/怪7.png";
        } else if (array[i][j].value == 5) {
          img1.src = "./imgs/背景.png";
        } else if (array[i][j].value == 6) {
          img1.src = "./imgs/楼梯1.png";
        } else if (array[i][j].value == 7) {
          img1.src = "./imgs/钥匙1.png";
        } else if (array[i][j].value == 8) {
          img1.src = "./imgs/门1.png";
        } else if (array[i][j].value == 9) {
          img1.src = "./imgs/药水1.png";
        } else if (array[i][j].value == 10) {
          img1.src = "./imgs/楼梯2.png";
        }
        img1.style.width = array[i][j].width;
        img1.style.height = array[i][j].height;
        bigbox.appendChild(img1);
      }
    }
  };

  this.getarr = function () {
    return array;
  };

  // 人物的当前位置
  this.peoplePosition = function () {
    for (var i = 0; i < array.length; i++) {
      for (var j = 0; j < array[i].length; j++) {
        if (array[i][j].value == 1) {
          return [i, j];
        }
      }
    }
  };
  // 人物位置的改变
  this.personChang = function (decrition, x, y) {
    // console.log(decrition, x, y)
    // console.log(array[x][y])
    if (
      [37, 65].includes(decrition) &&
      this.judege(x, y - 1) &&
      this.npc(x, y - 1)
    ) {
      this.change(x, y, x, y - 1);
    }
    if (
      [38, 87].includes(decrition) &&
      this.judege(x - 1, y) &&
      this.npc(x - 1, y)
    ) {
      this.change(x, y, x - 1, y);
    }
    if (
      [39, 68].includes(decrition) &&
      this.judege(x, y + 1) &&
      this.npc(x, y + 1)
    ) {
      this.change(x, y, x, y + 1);
    }
    if (
      [40, 83].includes(decrition) &&
      this.judege(x + 1, y) &&
      this.npc(x + 1, y)
    ) {
      this.change(x, y, x + 1, y);
    }
  };

  // 交换函数
  this.change = function (x, y, nextx, nexty) {
    var temp = array[x][y];
    array[x][y] = array[nextx][nexty];
    array[nextx][nexty] = temp;
    this.BackG();
  };

  //人物的移动
  this.personMove = function () {
    var that = this;
    window.onkeydown = function (event) {
      const code = event.keyCode;
      if ([37, 38, 39, 40, 65, 87, 83, 68].includes(code)) {
        that.personChang(
          code,
          that.peoplePosition()[0],
          that.peoplePosition()[1]
        );
      }
    };
  };
  // 边界判定
  this.judege = function (nextx, nexty) {
    if (
      nextx < 0 ||
      nextx > x - 1 ||
      nexty < 0 ||
      nexty > y - 1 ||
      array[nextx][nexty].value == 0
    ) {
      return false;
    } else {
      return true;
    }
  };

  this.monsterdead = function (nextx, nexty, monster) {
    if (array[nextx][nexty].value == 3 || array[nextx][nexty].value == 4) {
      if (person.force > monster.life) {
        array[nextx][nexty].value = 5;
      } else {
        alert("你已死亡!!");
        // 重新加载当前界面
        window.location.reload();
      }
    }
  };

  // 遇见npc
  this.npc = function (nextx, nexty) {
    // 遇到钥匙
    if (array[nextx][nexty].value == 7) {
      array[nextx][nexty].value = 5;
      key++;
      console.log(key);
      this.oringal();
    }
    // 遇见门
    else if (array[nextx][nexty].value == 8) {
      if (key > 0) {
        array[nextx][nexty].value = 5;
        key--;
        this.oringal();
      } else {
        alert("钥匙不足请收集钥匙!!!!");
        return false;
      }
    }

    // 怪物
    if (array[nextx][nexty].value == 3) {
      this.monsterdead(nextx, nexty, monster1);
    } else if (array[nextx][nexty].value == 4) {
      this.monsterdead(nextx, nexty, monster2);
    }
    // 药水
    else if (array[nextx][nexty].value == 9) {
      array[nextx][nexty].value = 5;
      person.life += 50;
      this.oringal();
    }
    // 宝剑
    else if (array[nextx][nexty].value == 2) {
      array[nextx][nexty].value = 5;
      person.force += 51;
      console.log(person.force);
      this.oringal();
    }
    // 通往下一层
    else if (array[nextx][nexty].value == 6) {
      // alert("恭喜通关!!!!");
      /*       num++;
      if (num > arrall.length - 1) {
        alert("恭喜通关!!!!");
      } else if (this.getFloor(num)) {
        //加载地图
        console.log(666);
        this.BackG();
        //控制人物移动
        this.personMove();
        return false;
      } else {
        return false;
      } */
    }
    // 回到上一层
    else if (array[nextx][nexty].value == 10) {
      num--;
      console.log(this.getFloor(num));
      if (this.getFloor(num)) {
        //加载地图
        console.log(666);
        this.BackG();
        //控制人物移动
        this.personMove();
        return false;
      } else {
        return false;
      }
    }

    return true;
  };

  //设置楼层
  this.getFloor = function (num) {
    if (num < 0 || num > arrall.length) {
      return false;
    } else {
      array = arrall[num];
      return true;
    }
  };

  // 初始参数的设置
  this.oringal = function () {
    box.innerHTML = `<div>生命值:${person.life}</div><div>攻击力:${person.force}</div>钥匙:${key}</div>`;
  };

  // 内部执行函数
  this.inte = function () {
    this.oringal();
    this.SetMap(); //加载二维数组
    if (this.getFloor(num)) {
      this.BackG(); //加载地图
      this.personMove(); //人物移动
    } else {
      return false;
    }
  };
}
class Text {
  constructor(text) {
    this.h2 = document.createElement("h2");
    this.h2.innerText = text;
  }

  async load() {
    content.appendChild(this.h2);
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  remove() {
    this.h2.remove();
  }
}

const show = async (text) => {
  const t = new Text(text);
  await t.load();
  t.remove();
};

const start = async () => {
  for (let i = 0; i < steps2.length; i++) {
    const code = steps2[i];
    let x = myComputedSize.peoplePosition()[0];
    let y = myComputedSize.peoplePosition()[1];
    if (i === 0) {
      await show("很久很久以前....   有一个勇敢的骑士");
      await show("一天，他进入了一个神秘的城堡当中，去寻找传说中的宝藏");
    } else if (i === 2) {
      await show(
        "在古老的城堡中，骑士开始寻找钥匙。他穿过长长的走廊，发现房间里有一个怪物在守护着钥匙。"
      );
    } else if (i === 4) {
      await show("骑士勇敢地与怪物战斗，最终打败了它，获得了钥匙。");
    } else if (i === 6) {
      await show(
        "骑士发现了一个宝箱和宝剑，他使用钥匙打开了宝箱，并获得了宝剑，战斗力大大提升了"
      );
    } else if (i === 10) {
      await show("骑士轻易地打败了又一个怪物，继续深入城堡");
    } else if (i === 14) {
      await show(
        "骑士又发现一个钥匙，并且还有一瓶魔法药水，喝下魔法药水后骑士的生命力增加了"
      );
    } else if (i === 24) {
      await show(
        "骑士又发现了一个宝箱和宝剑，他使用钥匙打开了宝箱，并获得了宝剑，战斗力大大提升了"
      );
      await show("战斗力增加后，骑士继续向前探索");
    } else if (i === 39) {
      await show(
        " 前方出现了一只实力更加强大的怪物，骑士毫无畏惧，轻易地打败了它"
      );
    } else if (i === 43) {
      await show("前方又发现了一个宝箱，一个钥匙还有一瓶魔法药水");
    } else if (i === 47) {
      await show("骑士打开宝箱，并喝下了魔法药水，生命力增加了");
    } else if (i === 63) {
      await show("骑士打败了城堡出口的最后一只怪物，然后离开了城堡");
    } else {
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
    if (i === steps2.length - 1) {
      console.log("通关");
      let box = document.querySelector(".big");
      box.remove();
      // 创建一个新的h2元素
      const child = document.createElement("h1");

      // 设置h2元素的文本内容
      child.textContent =
        "骑士成功通过了城堡!他的事迹已经被记录在城堡的记忆中，同时也被人们所铭记";
      content.appendChild(child);
    }
    myComputedSize.personChang(code, x, y);
  }
};
const steps2 = [
  40, 40, 40, 40, 39, 40, 40, 38, 38, 39, 39, 38, 38, 38, 38, 40, 40, 40, 40,
  40, 40, 40, 40, 37, 37, 37, 39, 39, 39, 38, 38, 38, 38, 39, 39, 39, 39, 39,
  38, 38, 38, 38, 37, 37, 37, 40, 40, 38, 38, 39, 39, 39, 40, 40, 40, 40, 40,
  40, 37, 37, 40, 40, 39, 39,
];

const steps = [];
let j = 0;

var myComputedSize = new ComputedSize(0, 9, 9); //num为层数
myComputedSize.inte();
myComputedSize.SetMap();
let h2 = document.querySelectorAll("h2");
let content = document.querySelector(".content");
const html = document.querySelector("html");
html.addEventListener("click", () => {
  const h = document.getElementById("start");
  h.style.display = "none";
  // start();
  var bgm = document.getElementById("bgm");
  bgm.play();
});
