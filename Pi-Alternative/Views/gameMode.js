let gameHTML = () => `
${model.showBBtn = ''}
<div class="mainContainer">
   <select class="dropDowns" onchange="setGameMode(this.value)">
      <option class="dropItems" selected="${model.gameModes.selected}">${model.gameModes.selected}</option>
      <option class="dropItems" value="${model.gameModes.mode[0]}">${model.gameModes.mode[0]}</option>
      <option class="dropItems" value="${model.gameModes.mode[1]}">${model.gameModes.mode[1]}</option>
   </select>
   <button class="mainBtns" onclick="StartGame()">Start Game</button>
   </div>
   `;
