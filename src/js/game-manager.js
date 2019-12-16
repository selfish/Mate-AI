import JQuery from 'jquery';

const $ = JQuery;
import ChessBoard from "chessboardjs";
import AI from "./ai";

export default class GameManager extends EventTarget {
  constructor(game, containerId, aiFunc) {
    super();
    this.game = game;
    this.aiFunc = aiFunc || (new AI()).random;
    this.board = ChessBoard('board', {
      draggable: true,
      position: 'start',
      onDragStart: this.onDragStart.bind(this),
      onDrop: this.onDrop.bind(this),
      onMouseoutSquare: this.onMouseoutSquare.bind(this),
      onMouseoverSquare: this.onMouseoverSquare.bind(this),
      onSnapEnd: this.updateBoard.bind(this)
    });
  }

  dispatchMove() {
    this.dispatchEvent(new Event('move'));
  }

  calculateBestMove() {
    return this.aiFunc(this.game)
  }

  checkGameOver() {
    if (this.game.game_over()) {
      return alert(`GAME OVER! ${this.game.turn() === 'w' ? 'White' : 'Black'} lost!`);
    }
  }

  makeBestMove() {
    this.move(this.calculateBestMove());
    this.checkGameOver();
  }

  setPosition(fen) {
    this.game.load(fen);
    this.updateBoard();
    this.dispatchMove();
  }

  move(moveToMake) {
    const move = this.game.move(moveToMake);
    this.updateBoard();
    this.dispatchMove();
    return move;
  }

  updateMoveHistory() {
    const moves = this.game.history();
    const historyElement = $('#move-history').empty();
    historyElement.empty();
    for (let i = 0; i < moves.length; i = i + 2) {
      historyElement.append(`<span class="move">${(i / 2) + 1}.${moves[i]}\t\t\t${(moves[i + 1] ? moves[i + 1] : ' ')}</span>`)
    }
    historyElement.scrollTop(historyElement[0].scrollHeight);
  }

  updateBoard() {
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
    const move = this.move({
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

  status() {
    return {
      fen: this.game.fen()
    }
  }
}

