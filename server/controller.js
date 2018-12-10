const Bot = require('./model/Bot');
const Leaderboard = require('./model/Leaderboard');

const bot = new Bot();
const leaderboard = new Leaderboard();

const handlePostPlay = function(req, res) {
  let { name } = req.body;
  const { move } = req.body;

  name = name.toLowerCase();
  const { winStatus, botMove } = bot.play(move);

  leaderboard.updateLeaderBoard({
    name,
    winStatus,
  });

  res.json({
    name,
    winStatus,
    botMove,
  });
};

const handleFetchLeaderboard = function(req, res) {
  //
  // TODO
  //
  res.json(leaderboard.getLeaderBoard());
  /*
  res.json([{
    name: 'Not a real player',
    wins: 1000,
    losses: 0,
    ties: 0,
    winPercentage: '100.00',
  },
  {
    name: 'Not a real playerB',
    wins: 1,
    losses: 99,
    ties: 0,
    winPercentage: '1.00',
  }]);
  */
};

module.exports = {
  handlePostPlay,
  handleFetchLeaderboard,
};
