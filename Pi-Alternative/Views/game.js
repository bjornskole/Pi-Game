let gameboardHTML = function () {
  return `
  ${(model.showBBtn = "")}
  <div class="mainContainer">
<div>${model.gameModes.selected === "Practice" ? Practice() : Normal()}</div>
</div>
`;
};

let Practice = function () {
  return `
  <div class="mainContainer">
  <div>Game Mode: Practice</div>
  <div>Highscore for Normal: ${checkPlayerHighScore("preGame")} </div>
  <div id="timerDiv"></div>
  <div>Lives left: ${model.game.life}</div>
  <div>${model.game.feedback}</div>
  <div>You entered: ${model.game.Input}</div>
  <div>Correct Pi is:${
    !pi.decimalsStr
      ? ""
      : pi.decimalsStr.length > 0
      ? pi.decimalsStr[0] + "," + pi.decimalsStr.slice(1)
      : ""
  }</div>
  <input class="mainInput" type="number" id="inputBox" oninput="checkPractice(this.value, Practice)"/>
  <br><button  class="mainBtns" onclick="checkAnswer(this.value, 'GameOver')">End game</button>
  </div>
  `;
};

let Normal = function () {
  return `
  <div class="mainContainer">
<div>Game Mode: Normal</div>
<div>Highscore: ${checkPlayerHighScore("preGame")} </div>
<div id="timerDiv"></div>
<div>Current score: ${model.game.Input.length}</div>
<div>Pi:${
    !pi.decimalsStr
      ? ""
      : pi.decimalsStr.length > 0
      ? pi.decimalsStr[0] + "," + pi.decimalsStr.slice(1)
      : ""
  }</div>
<input class="mainInput" type="number" id="inputBox" oninput="checkAnswer(this.value, Normal)"/>
<br><button class="mainBtns" onclick="checkAnswer(this.value, 'GameOver')">End game</button>
</div>
`;
};

//checkAnswer trenger clean up, game mode bør sjekkes individuelt
function checkAnswer(val, mode) {
  pi.get(pi.decimalsStr.length);
  console.log(pi.decimalsStr);
  model.game.Input += val;
  switch (
    val === pi.decimalsStr.charAt(pi.decimalsStr.length - 1) ? mode : "GameOver"
  ) {
    case Normal:
      changeView(mode);
      break;

    case "GameOver":
      changeView(gameOver);
      break;
  }
}

function checkPractice(val, mode) {
  setPiState();
  pi.get(pi.decimalsStr.length);
  console.log(pi.decimalsStr);

  model.game.Input = val;
  if (val === pi.decimalsStr.charAt(pi.decimalsStr.length - 1)) {
    model.game.feedback =
      "<div style='color:green;'>Correct!, do you know the next one too?</div>";
    console.log("correct");
    changeView(mode);
  } else if (model.game.life == 1) {
    changeView(gameOver);
  } else if (val > parseInt(pi.decimalsStr[pi.decimalsStr.length - 1])) {
    model.game.feedback =
      "<div style='color:red;'>Your number was too high</div>";
    console.log("High");
    model.game.life -= 1;
    oldPiState();
    changeView(mode);
  } else {
    model.game.feedback =
      "<div style='color:red;'>Your number was too low</div>";
    console.log("Low");
    model.game.life -= 1;
    oldPiState();
    changeView(mode);
  }
}

function setPiState() {
  if (pi.decimalsStr.length <= 0) {
    return;
  } else {
    model.game.piHolder.tmpQ = pi.q;
    model.game.piHolder.tmpR = pi.r;
    model.game.piHolder.tmpT = pi.t;
    model.game.piHolder.tmpI = pi.i;
    model.game.piHolder.decimalsStr = pi.decimalsStr;
  }
}
function oldPiState() {
  pi.q = model.game.piHolder.tmpQ;
  pi.r = model.game.piHolder.tmpR;
  pi.t = model.game.piHolder.tmpT;
  pi.i = model.game.piHolder.tmpI;
  pi.decimalsStr = model.game.piHolder.decimalsStr;
}

function checkPlayerHighScore(gamestate) {
  let curplayerdata = model.data.players.find(
    (player) => player.playerName === model.main.playerName
  );
  if (gamestate == "preGame") {
    if (curplayerdata === undefined) {
      if (model.main.playerName == "") {
        model.main.playerName = "Guest";
      }
      return "You have not played any games";
    } else {
      return curplayerdata.highscore;
    }
  } else if (gamestate == "gameEnd") {
    if (curplayerdata === undefined) {
      return playedGame.score;
    } else if (playedGame.score > curplayerdata.highscore) {
      return "You achieved a new highscore of " + playedGame.score + "!";
    } else {
      return curplayerdata.highscore;
    }
  }
}
