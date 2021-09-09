let gameboardHTML = function () {
  return `
<div>${model.gameModes.selected === "Practice" ? Practice() : Normal()}</div>`;
};

let Practice = function () {
  return `<div>Game Mode: Practice</div>
  <div>${model.game.feedback}</div>
  <div>You entered: ${model.game.Input}</div>
  <div>Correct Pi is:${pi.decimalsStr}</div>
  <input type="number" id="inputBox" oninput="checkPractice(this.value, Practice)"/>
  <br><button onclick="checkAnswer(this.value, 'GameOver')">End game</button>
  `;
};

let Normal = function () {
  return `
<div>Game Mode: Normal</div>
<div>Pi:${pi.decimalsStr}</div>
<input type="number" id="inputBox" oninput="checkAnswer(this.value, Normal)"/>
`;
};

//checkAnswer trenger clean up, game mode bør sjekkes individuelt
function checkAnswer(val, mode) {
  pi.get(pi.decimalsStr.length);
  console.log(pi.decimalsStr);
  switch (
    mode === Practice
      ? mode
      : val === pi.decimalsStr.charAt(pi.decimalsStr.length - 1)
      ? mode
      : "GameOver"
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

function checkPractice(val, mode) {
  pi.get(pi.decimalsStr.length);
  console.log(pi.decimalsStr);

  model.game.Input += val;
  if (val === pi.decimalsStr.charAt(pi.decimalsStr.length - 1)) {
    model.game.feedback = "Correct!, do you know the next one too?";
    console.log("correct");
    changeView(mode);
  } else if (val > parseInt(pi.decimalsStr[pi.decimalsStr.length - 1])) {
    model.game.feedback = "Your number was to high";
    console.log("High");
    changeView(mode);
  } else {
    model.game.feedback = "Your number was to low";
    console.log("Low");
    changeView(mode);
  }
}
