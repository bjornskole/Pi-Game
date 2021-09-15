let statisticsHTML = () => `
   <div>statistics</div>
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
  return `Top5<br>
  <input onclick="this.value = ''" onchange="setSelectedPlayer(this.value)" type="text" list="Playernames" value="${
    model.main.playerName
  }"/>
    <datalist id="Playernames">
    ${genPlayerList()}
    </datalist><br>
    ${model.statistics.top5list}
    `;
};
let adriansfunksjon = function (val) {
  let tmp2 = [];
  let tmp = [];
  for (let i = 0; i < model.data.players.length; i++) {
    if (model.data.players[i].playerName === val) {
      tmp.push(model.data.players[i]);
      for (j = 0; j < model.data.gamesPlayed.length; j++) {
        tmp2.push(
          model.data.gamesPlayed.find(
            ({ playerId }) => playerId === tmp[0].playerId
          )
        );
      }
    }
    console.log("tmp:" + tmp + "tmp2:" + tmp2);
  }
  //console.log(tmp);
  /*   return `${tmp2}
    `; */

  // model.statistics.top5list = `<div>${tmp2}>/div>`;
};

let Graph = function () {
  return `Graph
    `;
};

function setStatMode(val) {
  model.statistics.selected = val;
  changeView(statisticsHTML);
}

function genPlayerList() {
  model.statistics.playerNames = [];
  for (let i = 0; i < model.data.players.length; i++) {
    model.statistics.playerNames += `<Option>${model.data.players[i].playerName}</Option>`;
  }
  return model.statistics.playerNames;
}

function setSelectedPlayer(val) {
  model.statistics.selectedPlayer = val;
  //adriansfunksjon(val);
  getTop5(val);
}

function getTop5(val) {
  let pId;
  let pgPlayed = [];
  if (val === "") {
    console.log("blank input to getTop5");
  } else {
    for (let i = 0; i < model.data.players.length; i++) {
      if (val === model.data.players[i].playerName) {
        pId = model.data.players[i].playerId;
      }
    }
  }
  for (let i = 0; i < model.data.gamesPlayed.length; i++) {
    if (
      model.data.gamesPlayed[i].playerId === pId &&
      model.data.gamesPlayed[i].gamemode === "Normal"
    ) {
      pgPlayed.push(model.data.gamesPlayed[i]);
    }
  }
}
