function backBtn() {
  model.showBBtn = "none";
  changeView(mainView);
  resetPi();
  resetGameVal();
  sWatch.ResetTimer();
  document.getElementById("inputBox").value = model.main.playerName;
}

/*****************************************************
 * Game Mode
 *****************************************************/
function setPlayerName(val) {
  model.main.playerName = val;
  model.statistics.selectedPlayer = val;
  console.log("Player is: " + model.main.playerName);
}

function setGameMode(val) {
  model.gameModes.selected = val;
}

/*****************************************************
 * LeaderBoard
 *****************************************************/
function sortScore(a, b) {
  let a2 = new Date(a.date).toISOString();
  let b2 = new Date(b.date).toISOString();
  if (a.score > b.score) return -1;
  if (a.score < b.score) return 1;
  if (a.score === b.score) {
    if (a.time > b.time) return 1;
    if (a.time < b.time) return -1;
    if (a.time === b.time) {
      if (a2 > b2) return 1;
      if (a2 < b2) return -1;
      return 0;
    }
  }
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

  tmp.sort(sortScore);
  if (tmp.length >= 10) {
    for (let i = 0; i < 10; i++) {
      names = model.data.players.find(
        ({ playerId }) => playerId === tmp[i].playerId
      ).playerName;
      tmpTxt += retTableData(names, tmp[i].date, tmp[i].time, tmp[i].score);
    }
  } else {
    for (let i = 0; i < tmp.length; i++) {
      names = model.data.players.find(
        ({ playerId }) => playerId === tmp[i].playerId
      ).playerName;
      tmpTxt += retTableData(names, tmp[i].date, tmp[i].time, tmp[i].score);
    }
  }
  return retTable(tmpTxt);
}

function retTableData(names, date, time, score) {
  return `<tr><td>${names}</td> <td>${date}</td> <td>${time}</td> <td>${score}</td></tr>`;
}

function retTable(params) {
  return `
  <table>
    <tr>
      <th>Player</th>
      <th>Date</th>
      <th title="mm:ss:ms">Time</th>
      <th>Score</th>
    </tr>
    ${params}
  </table>
  `;
}

function inputFocus(element) {
  switch (element) {
    case mainView:
      document.getElementById("inputBox").focus();
      break;
    case gameboardHTML:
      document.getElementById("inputBox").focus();
      break;
    case Practice:
      document.getElementById("inputBox").focus();
      break;
    case Normal:
      document.getElementById("inputBox").focus();
      break;
    default:
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

function StartGame() {
  sWatch.ResetTimer();
  sWatch.StartTimer();
  changeView(gameboardHTML);
}

/********************************************************************
 * Statistics
 *********************************************************************/
function setStatMode(val) {
  model.statistics.selected = val;
  changeView(statisticsHTML);
}
function setSelectedPlayer(val) {
  model.statistics.selectedPlayer = val;
  changeView(statisticsHTML);
}
function setSelectedGamemode(gamemode) {
  model.statistics.gamemode = gamemode;
  changeView(statisticsHTML);
}

function chooseMode(mode) {
  switch (mode) {
    case "top5":
      getTop5(val); // trenger changeView(statisticsHTML)
      break;
    case "graph":
      getGraph(val); //trur ikke trenger changeView(statisticsHTML), må testes
      break;
  }
  changeView(statisticsHTML);
}

function genPlayerList() {
  model.statistics.playerNames = [`<Option>${model.main.playerName}</Option>`];
  for (let i = 0; i < model.data.players.length; i++) {
    model.statistics.playerNames.push(
      `<Option>${model.data.players[i].playerName}</Option>`
    );
  }
  return model.statistics.playerNames;
}
/***************************************************
 * Graph
 ***************************************************/
function getGraph(val) {
  getDataForGraphsBasedOnPlayer(val);
  setTimeout(myChart, 1);
}
function myChart() {
  const labels = model.statistics.dateData;
  const data = {
    labels: labels,
    datasets: [
      {
        label: model.statistics.graphPlayerName,
        backgroundColor: "#1E90FF",
        borderColor: "#1E90FF",
        data: model.statistics.scoreData,
      },
    ],
  };

  const config = {
    type: "line",
    data: data,
    options: {},
  };
  if (model.statistics.gamemode != "") {
    document.getElementById("gamemodeSelectTitle").innerHTML =
      model.statistics.gamemode;
  }
  new Chart(document.getElementById("myChart"), config);
}

function getDataForGraphsBasedOnPlayer(player) {
  const tmpPlayerData = model.data.players.find(
    ({ playerName }) => playerName === player
  );
  try {
    let playerId = tmpPlayerData.playerId;
    model.statistics.graphPlayerName = player;
    console.log(player);
    model.statistics.scoreData = [];
    model.statistics.dateData = [];
    let gameIds = model.data.players[playerId].gamesPlayed;
    console.log(gameIds);
    console.log(tmpPlayerData);
    for (i = 0, n = gameIds.length; i < n; i++) {
      let curGameId = gameIds[i];
      console.log("Current game Id: " + curGameId);
      if (
        model.data.gamesPlayed[curGameId].gamemode === model.statistics.gamemode
      ) {
        let tmpScore = model.data.gamesPlayed[curGameId].score;
        model.statistics.scoreData.push(tmpScore);
        console.log(tmpScore);
        let tmpData = model.data.gamesPlayed[curGameId].date;
        model.statistics.dateData.push(tmpData);
      }
    }
  } catch (err) {
    alert("Player has no data!");
    throw "Player has no data!";
  }
}

/********************************************************************
 * Top 5
 *********************************************************************/
function getTop5(val) {
  let pId;
  let tmpObj = [];
  let tmp = "";
  let counter;
  if (val === "") {
    return ``;
  } else {
    for (let i = 0; i < model.data.players.length; i++) {
      if (val === model.data.players[i].playerName) {
        pId = model.data.players[i].playerId;
      }
    }
    for (let j = 0; j < model.data.gamesPlayed.length; j++) {
      if (
        model.data.gamesPlayed[j].playerId === pId &&
        model.data.gamesPlayed[j].gamemode === "Normal"
      ) {
        tmpObj.push(model.data.gamesPlayed[j]);
      }
    }
    //console.log(tmpObj);
    tmpObj.sort(sortScore);
    if (tmpObj.length > 5) {
      counter = 5;
    } else {
      counter = tmpObj.length;
    }
    for (let k = 0; k < counter; k++) {
      tmp += retTableData(val, tmpObj[k].date, tmpObj[k].time, tmpObj[k].score);
    }
  }
  model.statistics.top5list = retTable(tmp);
}

/***************************************************
 * Timer
 ***************************************************/
class StopWatch {
  constructor() {
    this.hr = 0;
    this.min = 0;
    this.sec = 0;
    (this.miliSec = 0), (this.stoptime = true);
    this.timer = "00:00:00:00";
  }

  StartTimer() {
    if (this.stoptime == true) {
      this.stoptime = false;
      this.timerCycle();
    }
  }
  StopTimer() {
    if (this.stoptime == false) {
      this.stoptime = true;
    }
  }

  timerCycle() {
    if (this.stoptime == false) {
      this.miliSec = parseInt(this.miliSec);
      this.sec = parseInt(this.sec);
      this.min = parseInt(this.min);
      this.hr = parseInt(this.hr);

      this.miliSec = this.miliSec + 1;

      if (this.miliSec == 100) {
        this.sec = this.sec + 1;
        this.miliSec = 0;
      }
      if (this.sec == 60) {
        this.min = this.min + 1;
        this.sec = 0;
        this.miliSec = 0;
      }
      if (this.min == 60) {
        this.hr = this.hr + 1;
        this.min = 0;
        this.sec = 0;
        this.miliSec = 0;
      }
      if (this.miliSec < 10 || this.miliSec == 0) {
        this.miliSec = "0" + this.miliSec;
      }
      if (this.sec < 10 || this.sec == 0) {
        this.sec = "0" + this.sec;
      }
      if (this.min < 10 || this.min == 0) {
        this.min = "0" + this.min;
      }
      if (this.hr < 10 || this.hr == 0) {
        this.hr = "0" + this.hr;
      }

      this.timer = `${this.min}:${this.sec}:${this.miliSec}`;
      let element = document.querySelector("#timerDiv");
      element ? (element.innerHTML = this.timer) : null;
      setTimeout(() => this.timerCycle(), 10);
    }
  }
  ResetTimer() {
    this.stoptime = true;
    this.hr = 0;
    this.sec = 0;
    this.miliSec = 0;
    this.min = 0;
    this.timer = "00:00:00:00";
  }
}
let sWatch = new StopWatch();
