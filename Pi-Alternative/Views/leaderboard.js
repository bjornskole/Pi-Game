let score = (item) =>
  item.map((i) => `<div>${i.playerName}-${i.highscore}</div>`);

let leaderboardHTML = () => `
   <div>${score(model.data.players)}</div>
   <div>${setLeaderboardType("Normal")}</div>
   `;
