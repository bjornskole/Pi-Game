let statisticsHTML = () => `
   <div>Statistics</div>
   <select onchange="setStatMode(this.value)">
        <option selected="${model.statistics.selected}">${
  model.statistics.selected
}</option>
        <option value="Top5">${model.statistics.type[0]}</option>
        <option value="Graph">${model.statistics.type[1]}</option>
   </select>
   <div>${model.statistics.selected === "Top5" ? Top5() : Graph()}</div>
   `;
let Top5 = function () {
  return `
  <input onclick="this.value = ''" onchange="setSelectedPlayer(this.value)" type="text" list="Playernames" value="${
    model.statistics.selectedPlayer
  }"/>
    <datalist id="Playernames">
      ${genPlayerList()}
    </datalist>
    <br>
    ${model.statistics.top5list}
    `;
};

let Graph = function () {
  return `Graph
    `;
};

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
  let tmp = "";
  if (val === "") {
    return ``;
  } else {
    for (let i = 0; i < model.data.players.length; i++) {
      if (val === model.data.players[i].playerName) {
        pId = model.data.players[i].playerId;
      }
    }
    for (let i = 0; i < model.data.gamesPlayed.length; i++) {
      if (
        model.data.gamesPlayed[i].playerId === pId &&
        model.data.gamesPlayed[i].gamemode === "Normal"
      ) {
        tmp += retTableData(
          val,
          model.data.gamesPlayed[i].date,
          model.data.gamesPlayed[i].time,
          model.data.gamesPlayed[i].score
        );
      }
    }
    model.statistics.top5list = retTable(tmp);
  }
}
