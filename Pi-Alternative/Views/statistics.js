let statisticsHTML = () => `
${(model.showBBtn = "")}
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
let Graph = function () {
  return `<div class="mainContainer">
  <input class="mainInput" onclick="this.value = ''" onchange="setSelectedPlayer(this.value, 'graph')" type="text" list="Playernames" value="${
    model.statistics.selectedPlayer
  }"/>
    <datalist id="Playernames">
      ${genPlayerList()}
    </datalist>
    <select name="gamemodes" id="gamemodeselect" class="mainInput" onChange="setSelectedGamemode(this.value)">
      <option id="gamemodeSelectTitle" value="${model.statistics.gamemode}">${
    model.statistics.gamemode
  }</option> 
      <option value="Normal">Normal</option>
      <option value="Practice">Practice</option>
    </select>
    <div>
        <canvas id="myChart" class="canvas"></canvas>
    </div>
    `;
};
