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
<input id="gameInput" oninput="checkNormal(this.value)" />
`;
};

function checkNormal(val) {
  let str;
  pi.get(pi.decimalsStr.length);
  str = pi.decimalsStr;
  if (val == str.charAt(str.length - 1)) {
    console.log("right answer");
    console.log(str);
    console.log(pi.decimalsStr);
    updateView();
    document.getElementById("gameInput").focus();
  } else {
    console.log(val + " was wrong");
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
