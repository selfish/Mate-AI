import JQuery from 'jquery';

const $ = JQuery;
import ChessBoard from "chessboardjs";
import AI from "./ai";

export default class GameManager {
  constructor(game, containerId, aiFunc) {
    this.game = game;
    this.aiFunc = aiFunc || (new AI()).random;
    console.log('gameManager init');
    this.board = ChessBoard('board', {
      draggable: true,
      position: 'start',
      onDragStart: this.onDragStart.bind(this),
      onDrop: this.onDrop.bind(this),
      onMouseoutSquare: this.onMouseoutSquare.bind(this),
      onMouseoverSquare: this.onMouseoverSquare.bind(this),
      onSnapEnd: this.updateBoard.bind(this)
    });
    console.log('gameManager init DONE');
  }

  calculateBestMove() {
    return this.aiFunc(this.game)
  }

  checkGameOver() {
    if (this.game.game_over()) {
      return alert('Game over');
    }
  }

  makeBestMove() {
    this.checkGameOver();
    this.move(this.calculateBestMove());
    this.checkGameOver();
  }

  move(moveToMake) {
    this.game.move(moveToMake);
    this.updateBoard();
  }

  updateMoveHistory() {
    const moves = this.game.history();
    const historyElement = $('#move-history').empty();
    historyElement.empty();
    for (let i = 0; i < moves.length; i = i + 2) {
      historyElement.append('<span>' + moves[i] + ' ' + (moves[i + 1] ? moves[i + 1] : ' ') + '</span><br>')
    }
    historyElement.scrollTop(historyElement[0].scrollHeight);
  }

  updateBoard() {
    console.log('gameManager UPDATE_BOARD');
    this.board.position(this.game.fen());
    this.updateMoveHistory();
  }

  onDragStart(source, piece/*, position, orientation*/) {
    if (
      this.game.in_checkmate()
      || this.game.in_draw()
      || piece.search(/^b/) !== -1
    ) {
      // Block dragging on game end, or opponent's pieces.
      return false;
    }
  }

  removeGreySquares() {
    $('#board .square-55d63').css('background', '');
  }

  onDrop(source, target) {
    const move = this.game.move({
      from: source,
      to: target,
      promotion: 'q'
    });

    this.removeGreySquares();
    if (move === null) {
      return 'snapback';
    }

    this.updateMoveHistory();
    window.setTimeout(this.makeBestMove.bind(this), 250);
  }

  greySquare(square) {
    let squareEl = $('#board .square-' + square);

    let background = '#a9a9a9';
    if (squareEl.hasClass('black-3c85d') === true) {
      background = '#696969';
    }

    squareEl.css('background', background);
  }

  onMouseoverSquare(square/*, piece*/) {
    const moves = this.game.moves({ square: square, verbose: true });
    if (moves.length === 0) return;
    this.greySquare(square);
    for (let i = 0; i < moves.length; i++) {
      this.greySquare(moves[i].to);
    }
  }

  onMouseoutSquare(/*square, piece*/) {
    this.removeGreySquares();
  }
}

