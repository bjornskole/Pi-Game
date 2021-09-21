let statisticsHTML = () => `
<div class="mainContainer">
   <div>Statistics</div>
   <select class="dropDowns" onchange="setStatMode(this.value)">
        <option selected="${model.statistics.selected}">${
  model.statistics.selected
}</option>
        <option value="Top5">${model.statistics.type[0]}</option>
        <option value="Graph">${model.statistics.type[1]}</option>
   </select>
   <div>${model.statistics.selected === "Top5" ? Top5() : Graph()}</div>
   </div>
   `;
let Top5 = function () {
  return `
  <div class="mainContainer">
  <input class="mainInput" onclick="this.value = ''" onchange="setSelectedPlayer(this.value, 'top5')" type="text" list="Playernames" value="${
    model.statistics.selectedPlayer
  }"/>
    <datalist id="Playernames">
      ${genPlayerList()}
    </datalist>
    <br>
    ${model.statistics.top5list}
    </div>
    `;
};
//start of graph stuff
let Graph = function () {
  return `<div class="mainContainer">
  <input class="mainInput" onclick="this.value = ''" onchange="setSelectedPlayer(this.value, 'graph')" type="text" list="Playernames" value="${
    model.statistics.selectedPlayer
  }"/>
    <datalist id="Playernames">
      ${genPlayerList()}
    </datalist>
    <div>
        <canvas id="myChart" class="canvas"></canvas>
    </div>
  `;
};

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

  new Chart(document.getElementById("myChart"), config);
}

function getDataForGraphsBasedOnPlayer(player) {
  const tmpPlayerData = model.data.players.find(
    ({ playerName }) => playerName === player
  );
  try {
    let playerId = tmpPlayerData.playerId;
    model.statistics.graphPlayerName = player;
    model.statistics.scoreData = [];
    model.statistics.dateData = [];
    let gameIds = model.data.players[playerId].gamesPlayed;
    gameIds.forEach(function (item, index, array) {
      let tmpScore = model.data.gamesPlayed[item].score;
      model.statistics.scoreData.push(tmpScore);
      let tmpData = model.data.gamesPlayed[item].date;
      model.statistics.dateData.push(tmpData);
    });
  }
  catch (err) {
    if (err.type = TypeError){
      document.querySelector('.mainInput').value = "";
      alert("Player has no data!");
      throw "Player has no data!";
    }
  }
}
//end of graph stuff

function setStatMode(val) {
  model.statistics.selected = val;
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

function setSelectedPlayer(val, mode) {
  model.statistics.selectedPlayer = val;
  //mode === "top5" ? getTop5(val) : getGraph(val);
  switch (mode) {
    case "top5":
      getTop5(val);
      break;
    case "graph":
      getGraph(val);
      break;
  }
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
