let gameboardHTML = () => `
   <div>Game</div>
   <div>${pi.decimalsStr}</div>
   <input id="gameInput" oninput="checkInput(this.value)" />
   `;

function checkInput(val) {
  pi.calculate();
  str = pi.decimalsStr;
  if (val == str.charAt(str.length - 1)) {
    console.log("right answer");
  } else {
    console.log("wrong answer");
  }
  updateView();
  document.getElementById("gameInput").focus();
}
