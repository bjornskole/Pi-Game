let gameboardHTML = function () {
  return `
<div>${model.gameModes.selected === "Practice" ? Practice() : Normal()}</div>`;
};

let Practice = function () {
  return `<div>Game Mode: Practice</div>
  <div>${pi.decimalsStr}</div>
  <input id="gameInput" oninput="checkAnswer(this.value, Practice)"/>
  ${inputFocus("gameInput")}
  `;
};

let Normal = function () {
  return `
<div>Game Mode: Normal</div>
<div>${pi.decimalsStr}</div>
<input id="gameInput" oninput="checkAnswer(this.value, Normal)"/>
${inputFocus("gameInput")}
`;
};
function checkAnswer(val, mode) {
  pi.get(pi.decimalsStr.length);
  console.log(pi.decimalsStr);
  switch (
    val === pi.decimalsStr.charAt(pi.decimalsStr.length - 1) ? mode : "GameOver"
  ) {
    case Practice:
      changeView(mode);
      break;

    case Normal:
      changeView(mode);
      break;

    case "GameOver":
      changeView(gameOver);
      break;
  }
}
