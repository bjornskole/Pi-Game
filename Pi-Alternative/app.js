let app = document.getElementById("app")

updateView();
function updateView() {
    app.innerHTML = `
    <div>main</div>
    <button onclick="changeView(gameHTML)">game</button>
    <button onclick="changeView(statisticsHTML)">Statistics</button>
    <button onclick="changeView(leaderboardHTML)">leaderBoard</button>
    <div>${model.router.currentPage}</div>
    `  
}

