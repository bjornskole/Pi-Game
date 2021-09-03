let gameboardHTML = function () {
  return `
<div>${model.gameModes.selected === "Practice" ? Practice() : Normal()}</div>`;
};

let Practice = function () {
  return `<div>Game Mode: Practice</div>
  <div>${model.decimalsStr}</div>
  <input id="gameInput" oninput="checkPractice(this.value)" />
  `;
};

let Normal = function () {
  return `
<div>Game Mode: Normal</div>
<div>${pi.decimalsStr}</div>
<input id="gameInput" oninput="checkAnswer(this.value, Normal)" />
`;
};
function checkAnswer(val, mode) {
  pi.get(pi.decimalsStr.length);
  val === pi.decimalsStr.charAt(pi.decimalsStr.length - 1)
    ? (changeView(mode), document.getElementById("gameInput").focus())
    : changeView(gameOver);
}

function checkNormal(val) {
  let str;
  pi.get(pi.decimalsStr.length);
  str = pi.decimalsStr;
  if (val == str.charAt(str.length - 1)) {
    changeView(Normal);
    document.getElementById("gameInput").focus();
  } else {
    changeView(gameOver);
  }
}
function checkPractice(val) {
  let str;
  pi.calculate();
  str = pi.decimalsStr;
  if (val == str.charAt(str.length - 1)) {
    console.log("right answer");
    updateView();
    document.getElementById("gameInput").focus();
  } else {
    console.log("wrong answer");
    updateView();
  }
}
