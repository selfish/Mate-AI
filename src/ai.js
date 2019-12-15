export default class AI {
  constructor(chess) {
    this.chess = chess;
    this.calculateBestMove = this.random;
  }

  random(game) {
    const newGameMoves = game.moves();
    return newGameMoves[Math.floor(Math.random() * newGameMoves.length)];
  }
}
