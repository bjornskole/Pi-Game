let gameOver = function () {
  return `
    <h1>GAME OVER!</h1>
    <div>Your score was: ${pi.decimalsStr.length}</div>
    <button onclick="changeView(gameboardHTML)">Play Again!</button>
${resetDecimalsStr()}
    `;
};

let resetDecimalsStr = function () {
  pi.decimalsStr = "";
  return "";
};