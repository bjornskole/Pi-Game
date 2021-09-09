let gameHTML = () => `
   <select onchange="setGameMode(this.value)">
      <option selected="${model.gameModes.selected}">${model.gameModes.selected}</option>
      <option value="${model.gameModes.mode[0]}">${model.gameModes.mode[0]}</option>
      <option value="${model.gameModes.mode[1]}">${model.gameModes.mode[1]}</option>
   </select>
   <button onclick="changeView(gameboardHTML)">Start Game</button>
   `;
