let score = (item) =>
  item.map((i) => `<div>${i.playerName}-${i.highscore}</div>`);

let leaderboardHTML = () => `
<div class="mainContainer">
  <div>Leaderboard</div>
  <div class="leaderBtns">
  <button class="navBtns" onclick="gamemodeBack(leaderboardHTML)"><-</button>
  ${model.gameModes.selected}
  <button class="navBtns" onclick="gamemodeForward(leaderboardHTML)">-></button>
  </div>
  <div>${setLeaderboardType(model.gameModes.selected)}</div>
  <div class="mainContainer">
`;

/* <div>${score(model.data.players)}</div> */
