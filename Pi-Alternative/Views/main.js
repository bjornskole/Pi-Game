let mainView = () => `
<div>Main Site</div>
<input id="inputBox"placeholder="Player name" onchange="setPlayerName(this.value)" type="text" id="inputPlayer"></br>
<button onclick="changeView(gameHTML)">Game</button>
<button onclick="changeView(statisticsHTML)">Statistics</button>
<button onclick="changeView(leaderboardHTML)">LeaderBoard</button>
`;
