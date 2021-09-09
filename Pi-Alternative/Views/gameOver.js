let gameOver = function () {
  return `
    <h1>GAME OVER!</h1>
    <div>Your score was: ${pi.decimalsStr.length - 1}</div>
    <button onclick="changeView(gameboardHTML)">Play Again!</button>
${resetPi()}
    `;
};

let resetPi = function () {
  pi.q = 1n;
  pi.r = 180n;
  pi.t = 60n;
  pi.i = 2n;
  pi.decimalsStr = "";
};

let gamescore = 5; //temp value to make saveData() add an actual value, remove/replace if needed

var playedGame;

function saveData() {
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
  let curplayerdata = model.data.players.find(
    (player) => player.playerName === model.main.playerName
  );
  let playerId = curplayerdata.playerId;
  //create playedGame, push to gamesPlayed array
  playedGame = {
    date: today,
    score: gamescore,
    playerId: playerId,
    gamemode: model.gameModes.selected,
  };
  model.data.gamesPlayed.push(playedGame);
}
