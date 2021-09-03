function setPlayerName(val) {
  model.main.playerName = val;
  console.log(model.main.playerName);
}

// function setLeaderboardType(val) {
//     model.
// }

function setGameMode(val) {
  model.gameModes.selected = val;
}

function changeView(element) {
  model.router.currentPage = element();
  updateView();
}

function backBtn() {
  changeView(mainView);
  resetDecimalsStr();
}

function setLeaderboardType(val) {
  let tmp = [];
  let tmpTxt = "";
  let names = [];
  for (let i = 0; i < model.data.gamesPlayed.length; i++) {
    if (model.data.gamesPlayed[i].gamemode === val) {
      tmp.push(model.data.gamesPlayed[i]);
    }
  }
  for (let i = 0; i < model.data.players.length; i++) {
    if (model.data.players[i].playerId === tmp[i].playerId) {
      names.push(model.data.players[i].playerName);
    }
  }
  for (i = 0; i < tmp.length; i++) {
    tmpTxt += `${tmp[i].date} ${names[i]}   ${tmp[i].score}   ${tmp[i].gamemode}<br>`;
  }
  console.log(names);
  return `${tmpTxt}`;
}
