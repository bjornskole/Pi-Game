let gameHTML = () => `
   <select onchange="" name="" >
      <option value="Top5">${model.gameModes.mode[0]}</option>
      <option value="Graph">${model.gameModes.mode[1]}</option>
   </select>
   <button onclick="changeView(gameboardHTML)">Start Game</button>
   `;
