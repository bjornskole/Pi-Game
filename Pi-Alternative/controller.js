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
  inputFocus(element);
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
  function sortScore(a, b) {
    if (a.score > b.score) return -1;
    if (a.score < b.score) return 1;
    return 0;
  }
  tmp.sort(sortScore);
  for (let i = 0; i < tmp.length; i++) {
    names = model.data.players.find(
      ({ playerId }) => playerId === tmp[i].playerId
    ).playerName;
    tmpTxt += `${names} ${tmp[i].date} ${tmp[i].score}<br>`;
  }

  return `${tmpTxt}`;
}

function inputFocus(element) {
  console.log(element);
  switch (element) {
    case mainView:
      document.getElementById("inputBox").focus();
      break;
    case gameboardHTML:
      document.getElementById("inputBox").focus();
      break;
    default:
      console.log("default");
  }
}

function listChange(get, set, val) {
  let index = set.indexOf(get);
  let tmp;
  if (index == 0 && val == "-") {
    tmp = set[set.length - 1];
  } else if (index == set.length - 1 && val == "+") {
    tmp = set[0];
  } else if (val == "-") {
    index -= 1;
    tmp = set[index];
  } else if (val == "+") {
    index += 1;
    tmp = set[index];
  } else {
    tmp = set[val];
  }
  return tmp;
}
function gamemodeBack(view) {
  model.gameModes.selected = listChange(
    model.gameModes.selected,
    model.gameModes.mode,
    "-"
  );
  changeView(view);
}
function gamemodeForward(view) {
  model.gameModes.selected = listChange(
    model.gameModes.selected,
    model.gameModes.mode,
    "+"
  );
  changeView(view);
}
