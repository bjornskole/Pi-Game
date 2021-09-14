let score = (item) =>
  item.map((i) => `<div>${i.playerName}-${i.highscore}</div>`);

let leaderboardHTML = () => `

  <div>Leaderboard</div>
  <button onclick="gamemodeBack(leaderboardHTML)"><-</button>
  ${model.gameModes.selected}
  <button onclick="gamemodeForward(leaderboardHTML)">-></button>
  <div>${setLeaderboardType(model.gameModes.selected)}</div>
`;

/* <div>${score(model.data.players)}</div> */
