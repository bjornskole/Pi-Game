let gameOver = function () {
  let nextDigit = pi.decimalsStr.slice(-1);
  saveData();
  resetPi();
  resetGameVal();
  return `
  <div class="mainContainer">
    <h1>GAME OVER!</h1>
    <div>Time: ${playedGame.time}</div>
    <div>Score: ${playedGame.score}</div>
    <div>Highscore: ${checkPlayerHighScore("gameEnd")}</div>
    <div>The next digit was: ${nextDigit}</div>
    <br><button class="mainBtns" onclick="StartGame()">Play Again!</button>
    </div>
    `;
};

let resetPi = function () {
  pi.q = 1n;
  pi.r = 180n;
  pi.t = 60n;
  pi.i = 2n;
  pi.decimalsStr = "";
};

function resetGameVal() {
  model.game.Input = "";
  model.game.feedback = "";
  model.game.piHolder.tmpQ = 1n;
  model.game.piHolder.tmpR = 180n;
  model.game.piHolder.tmpT = 60n;
  model.game.piHolder.tmpI = 2n;
  model.game.piHolder.decimalsStr = "";
  model.game.life = 3;
}
function saveData() {
  //stop timer
  sWatch.StopTimer();
  //set gamescore
  let gamescore = pi.decimalsStr.length - 1;
  //get current date
  let today = new Date().toISOString().slice(0, 10);
  //extract playerId from model.main.playerName, if player doesn't exist then create
  let curplayerdata = model.data.players.find(
    (player) => player.playerName === model.main.playerName
  );
  //adds new user if it does not exist
  if (curplayerdata === undefined) {
    let newuser = {
      playerId: model.data.players.length,
      playerName: model.main.playerName,
      highscore: gamescore,
      gamesPlayed: [],
    };
    curplayerdata = newuser;
    model.data.players.push(newuser);
  }
  //checks if score is higher than highscore. If so, updates highscore
  if (curplayerdata.highscore < gamescore) {
    model.data.players[curplayerdata.playerId].highscore = gamescore;
  }
  let gameId = model.data.gamesPlayed.length;
  //create playedGame, push to gamesPlayed array
  playedGame = {
    gameId: gameId,
    date: today,
    time: sWatch.timer,
    score: gamescore,
    playerId: curplayerdata.playerId,
    gamemode: model.gameModes.selected,
  };
  model.data.players[curplayerdata.playerId].gamesPlayed.push(gameId);

  model.data.gamesPlayed.push(playedGame);
}
