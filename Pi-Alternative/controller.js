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
  resetPi();
  resetGameVal();
}

function setLeaderboardType(val) {
  let tmp = [];
  let tmpTxt = "";
  let names = [];
  let format = 'dd mm yyyy';
  model.data.gamesPlayed.sort(sortScore);
  for (let i = 0; i < model.data.gamesPlayed.length; i++) {
    if (model.data.gamesPlayed[i].gamemode === val) {
      tmp.push(model.data.gamesPlayed[i]);
    }
  }
  function sortScore(a, b) {
    let a2 = new Date(a.date);
    let b2 = new Date(b.date);
    if (a.score > b.score) return -1;
    if (a.score < b.score) return 1;
    if (a.score === b.score) {
      if (a.time > b.time) return 1;
      if (a.time < b.time) return -1;
      if (a.time === b.time) {
        if (a2.toUTCString().slice(0,format.length) > b2.toUTCString().slice(0,format.length)) return 1;
        if (a2.toUTCString().slice(0,format.length) < b2.toUTCString().slice(0,format.length)) return -1;
        return 0;
      }
    }
  }
  tmp.sort(sortScore);
  if (tmp.length >= 10) {
    for (let i = 0; i < 10; i++) {
      names = model.data.players.find(
        ({ playerId }) => playerId === tmp[i].playerId
      ).playerName;
      tmpTxt += `${names} ${tmp[i].date} ${tmp[i].time} ${tmp[i].score}<br>`;
    }
  } else {
    for (let i = 0; i < tmp.length; i++) {
      names = model.data.players.find(
        ({ playerId }) => playerId === tmp[i].playerId
      ).playerName;
      tmpTxt += `${names} ${tmp[i].date} ${tmp[i].time} ${tmp[i].score}<br>`;
    }
  }
  return `${tmpTxt}`;
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

/**Stop Watch */
class StopWatch {
  constructor() {
    this.hr = 0;
    this.min = 0;
    this.sec = 0;
    this.miliSec = 0,
    this.stoptime = true;
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
        
        if (this.miliSec == 60) {
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
        this.miliSec = '0' + this.miliSec;
      }
      if (this.sec < 10 || this.sec == 0) {
        this.sec = '0' + this.sec;
      }
      if (this.min < 10 || this.min == 0) {
        this.min = '0' + this.min;
      }
      if (this.hr < 10 ||this.hr == 0) {
        this.hr = '0' + this.hr;
      }
  
      this.timer = `${this.hr}:${this.min}:${this.sec}:${this.miliSec}`;
      let element = document.querySelector("#timerDiv")
      element ? element.innerHTML = this.timer : null
      setTimeout(() => this.timerCycle(), 10);
    }
  }
  ResetTimer() {
    this.stoptime = true;
    this.hr = 0;
    this.sec = 0;
    this.miliSec = 0;
    this.min = 0;
    this.timer = '00:00:00:00';
}
}
let sWatch = new StopWatch();


