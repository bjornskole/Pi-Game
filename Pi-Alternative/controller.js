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
  function sortScore(a,b) {
    if (a.score > b.score)
      return -1;
    if (a.score < b.score)
      return 1
    return 0;
  };
  tmp.sort(sortScore)
  for (let i = 0; i < tmp.length; i++) {
      names = model.data.players.find( ({playerId})=> playerId === tmp[i].playerId).playerName;
      tmpTxt += `${tmp[i].date} ${names}   ${tmp[i].score}   ${tmp[i].gamemode}<br>`;
  }
  
  return `${tmpTxt}`;
}
