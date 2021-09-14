let statisticsHTML = () => `
    ${(model.statistics.playerNames = [])}
    ${genPlayerList()}
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
  <input onclick="this.value = ''" type="text" list="Playernames" value="${model.main.playerName}"/>
    <datalist id="Playernames">
    ${model.statistics.playerNames}
    </datalist>
    `;
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
  for (let index = 0; index < model.data.players.length; index++) {
    model.statistics.playerNames += `<Option>${model.data.players[index].playerName}</Option>`;
  }
}
