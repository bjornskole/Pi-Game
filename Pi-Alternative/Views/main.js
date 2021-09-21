let mainView = () => `
<div class="mainContainer">
<div>Pi-Game</div>
<input class="mainInput" id="inputBox"placeholder="Player name" onchange="setPlayerName(this.value)" type="text" id="inputPlayer"></br>
<button class="mainBtns" onclick="changeView(gameHTML)">New Game</button>
<button class="mainBtns" onclick="changeView(statisticsHTML)">Statistics</button>
<button class="mainBtns" onclick="changeView(leaderboardHTML)">Leaderboard</button>
</div>
`;
