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
  return `Top5
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
