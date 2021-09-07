let score = (item) =>
  item.map((i) => `<div>${i.playerName}-${i.highscore}</div>`);

let leaderboardHTML = () => `
<div>${setLeaderboardType("Normal")}</div>
`;

{/* <div>${score(model.data.players)}</div> */}