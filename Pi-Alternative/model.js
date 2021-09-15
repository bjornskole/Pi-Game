//Model

const model = {
  decimalsStr: pi.decimalsStr,
  router: {
    currentPage: "main",
    pages: ["main", "gameMode", "game", "leaderboard", "statistics"],
  },
  main: {
    playerName: "Guest", //onChange check if player exists then update selectedPlayer and generate player object in db
  },
  globals: {
    selectedPlayer: "", //populate with model.inputFields.main.playerName, manipulate with <- -> stats-page
  },
  game: {
    life: 3,
    feedback: "",
    Input: "",
    piHolder: {
      tmpQ: null,
      tmpR: null,
      tmpT: null,
      tmpI: null,
      decimalsStr: null,
    },
  },
  gameModes: {
    selected: "Practice",
    mode: ["Practice", "Normal"], //++ -- on <- ->  buttons
  },
  statistics: {
    type: ["Top5", "Graph"],
    selected: "Top5",
    playerNames: [],
    selectedPlayer: "",
    top5list: "",
  },
  data: {
    // leaderboard: { List: [] },
    gamesPlayed: [
      {
        gameId: 0,
        date: "2021-09-14",
        time: "00:34:22",
        score: 18,
        playerId: 1,
        gamemode: "Normal",
      },
      {
        gameId: 1,
        date: "2021-07-14",
        time: "00:13:34",
        score: 18,
        playerId: 2,
        gamemode: "Practice",
      },
      {
        gameId: 2,
        date: "2021-08-11",
        time: "00:13:34",
        score: 7,
        playerId: 1,
        gamemode: "Normal",
      },
      {
        gameId: 3,
        date: "2021-09-14",
        time: "13:34:23",
        score: 18,
        playerId: 1,
        gamemode: "Practice",
      },
      {
        gameId: 4,
        date: "2021-09-14",
        time: "00:13:34",
        score: 10,
        playerId: 2,
        gamemode: "Normal",
      },
    ],
    players: [
      {
        playerId: 0,
        playerName: "Adrian",
        highscore: 100,
        gamesPlayed:{},
      },
      {
        playerId: 1,
        playerName: "Asbjorn",
        highscore: 200,
        gamesPlayed: {},
      },
    ],
  },
};
