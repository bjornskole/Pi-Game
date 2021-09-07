let score = (item) =>
  item.map((i) => `<div>${i.playerName}-${i.highscore}</div>`);

let leaderboardMode = 'Normal';
let leaderboardHTML = () => `

  <div>Leaderboard</div>
  <select onchange="leaderboardMode = this.value">
    <option value="${model.gameModes.mode[1]}">${model.gameModes.mode[1]}</option>
    <option value="${model.gameModes.mode[0]}">${model.gameModes.mode[0]}</option>
  </select>
  <button onclick="changeView(leaderboardHTML)">select</button>
  <div>Player Date  Score</div>
  <div>${setLeaderboardType(leaderboardMode)}</div>
`;

/* <div>${score(model.data.players)}</div> */