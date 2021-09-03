let gameboardHTML = function () {
  return `
<div>${model.gameModes.selected === "Practice" ? Practice() : Normal()}</div>`;
};

let Practice = function () {
  return `<div>Game Mode: Practice</div>
  <div>${pi.decimalsStr}</div>
  <input id="gameInput" oninput="checkAnswer(this.value, "Practice")" />
  `;
};

let Normal = function () {
  return `
<div>Game Mode: Normal</div>
<div>${pi.decimalsStr}</div>
<input id="gameInput" oninput="checkAnswer(this.value, "Normal")" />
`;
};
function checkAnswer(val, mode) {
  pi.get(pi.decimalsStr.length);
  val === pi.decimalsStr.charAt(pi.decimalsStr.length - 1)
    ? (changeView(mode), document.getElementById("gameInput").focus())
    : changeView(gameOver);
}
