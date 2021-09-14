let gameOver = function () {
  saveData();
  resetPi();
  resetGameVal();
  return `
    <h1>GAME OVER!</h1>
    <div>Your score was: ${playedGame.score}</div>
    <button onclick="StartGame()">Play Again!</button>
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
  model.game.piHolder.tmpY = "";
  model.game.piHolder.tmpR = "";
  model.game.piHolder.tmpT = "";
  model.game.piHolder.tmpI = "";
  model.game.life = 3;
}


function saveData() {
  sWatch.StopTimer();
  let gamescore = pi.decimalsStr.length - 1;
  //get current date formatted dd/mm/yyyy alternative = Date().toLocaleString().slice(4, 24);
  var today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  let yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  var today = dd + "/" + mm + "/" + yyyy;

  //extract playerId from model.main.playerName
  //Add if player doesn't exist then create player
  let curplayerdata = model.data.players.find(
    (player) => player.playerName === model.main.playerName
  );
  //adds new user if it does not exist
  if (curplayerdata === undefined){
    let newuser = {
      playerId: model.data.players.length,
      playerName: model.main.playerName,
      highscore: gamescore,
    }
    curplayerdata = newuser;
    model.data.players.push(newuser);
  }
  //checks if score is higher than highscore. If so, updates highscore
  if (curplayerdata.highscore < gamescore){
    model.data.players[curplayerdata.playerId].highscore = gamescore;
  }
  //create playedGame, push to gamesPlayed array
  playedGame = {
    date: today,
    score: gamescore,
    playerId: curplayerdata.playerId,
    gamemode: model.gameModes.selected,
    time: sWatch.timer
  };
  model.data.gamesPlayed.push(playedGame);
}
