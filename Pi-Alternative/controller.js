
function setPlayerName(val) {
    model.main.playerName = val
    console.log(model.main.playerName)
}

// function setLeaderboardType(val) {
//     model.
// }

function changeView(element) {
model.router.currentPage = element()
updateView()
}