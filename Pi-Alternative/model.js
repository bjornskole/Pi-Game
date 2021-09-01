//Model

const model = {
  router: {
    currentPage: "main",
    pages: ["main", "gameMode", "game", "leaderboard", "statistics"],
  },
  main: {
    playerName: "fdgfdg", //onChange check if player exists then update selectedPlayer and generate player object in db
  },
  globals: {
    selectedPlayer: "", //populate with model.inputFields.main.playerName, manipulate with <- -> stats-page
  },
  gameInput: {},
  gameModes: {
    mode: ["Practice", "Normal"], //++ -- on <- ->  buttons
  },
  statistics: {
    type: ["Top5", "Graph"],
  },
  data: {
    // leaderboard: { List: [] },
    gamesPlayed: [
      { date: "12/08/21", score: 18, playerId: 1, gamemode: "Normal" },
      { date: "12/08/21", score: 18, playerId: 2, gamemode: "Practice" },
    ],
    players: [
      {
        playerId: 1,
        playerName: "Adrian",
        highscore: 100,
        // gamesPlayed: {
        //   Normal: [
        //     { date: "12/08/21", score: 18 },
        //     { date: "12/08/21", score: 17 },
        //   ], // top 5 er fem første i liste
        //   Practice: [],
        // },
      },
      {
        playerId: 2,
        playerName: "Asbjorn",
        highscore: 200,
        // gamesPlayed: {
        //   Normal: [],
        //   Practice: [],
        // },
      },
    ],
  },
};
