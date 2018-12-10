const Player = require('./Player');

class Leaderboard {
  constructor() {
    this.leadersArray = [];

    // this.leadersArray に含まれているインスタンスの取得が効率よくできるために
    // this.leadersMap はこんなキー・バリュー型で格納するのがいい：
    // {
    //   名前： player インスタンス
    // }
    this.leadersMap = {};
  }

  // winStatus will be 1, 0, or -1
  updateLeaderBoard({ name, winStatus }) {
    //
    // TODO - リーダーボード配列を更新しよう
    // name      STRING: player name
    // winStatus NUMBER: lose (-1), tie (0), win (1)
    //
    // 注意：各playerの勝率を使用してthis.leadersArrayの並び替えを忘れないように！
    //
    // 大事なポイント： Player.js も開いて、player インスタンスが何をできるかをざっと見とこう。
    //
    let player;
    if (this.doesPlayerExist(name)) {
      player = this.leadersMap[name];
    } else {
      player = new Player(name);
      this.leadersMap[name] = player;
      this.leadersArray.push(this.leadersMap[name]);
    }
    player.updateStats(winStatus);

    this.leadersArray.sort((a, b) => b.winPercentage - a.winPercentage);
  }

  getLeaderBoard() {
    return this.leadersArray;
  }

  doesPlayerExist(name) {
    return !!this.leadersMap[name];
  }

  getPlayerStats(name) {
    return this.leadersMap[name].getStats();
  }
}

module.exports = Leaderboard;
