let statisticsHTML = () => `
   <div>Statistics</div>
   <select onchange="setStatMode(this.value)">
        <option selected="${model.statistics.selected}">${model.statistics.selected
  }</option>
        <option value="Top5">${model.statistics.type[0]}</option>
        <option value="Graph">${model.statistics.type[1]}</option>
   </select>
   <div>${model.statistics.selected === "Top5" ? Top5() : Graph()}</div>
   `;
let Top5 = function () {
  return `
  <input onclick="this.value = ''" onchange="setSelectedPlayer(this.value)" type="text" list="Playernames" value="${model.statistics.selectedPlayer
    }"/>
    <datalist id="Playernames">
      ${genPlayerList()}
    </datalist>
    <br>
    ${model.statistics.top5list}
    `;
};
//start of graph stuff
let Graph = function () {
  return `Graph
  <div>
  <canvas id="myChart"></canvas>
  </div>
    `;
};


const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
];
const data = {
  labels: labels,
  datasets: [{
    label: 'My First dataset',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: [0, 10, 5, 2, 20, 30, 45],
  }]
};

const config = {
  type: 'line',
  data: data,
  options: {}
};

var myChart = new Chart(
  document.getElementById('myChart'),
  config
);

//end of graph stuff


function setStatMode(val) {
  model.statistics.selected = val;
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

function setSelectedPlayer(val) {
  model.statistics.selectedPlayer = val;
  getTop5(val);
  changeView(statisticsHTML);
}

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
