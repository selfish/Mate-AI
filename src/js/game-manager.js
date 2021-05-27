import JQuery from 'jquery';

const $ = JQuery;
import ChessBoard from "chessboardjs";
import AI from "./ai";

const promotion = 'q';
const noop = (() => {
});

export default class GameManager extends EventTarget {
  constructor({ game, containerId, whiteAI, blackAI }) {
    super();
    this.game = game;
    this.paused = true;
    this.whiteAi = whiteAI;
    this.blackAi = blackAI;
    this.board = ChessBoard(containerId, {
      draggable: true,
      position: 'start',
      moveSpeed: 300,
      snapSpeed: 100,
      snapbackSpeed: 400,
      onDragStart: this.onDragStart.bind(this),
      onDrop: this.onDrop.bind(this),
      onMouseoutSquare: this.onMouseoutSquare.bind(this),
      onMouseoverSquare: this.onMouseoverSquare.bind(this),
      onSnapEnd: this.updateBoard.bind(this)
    });

    this.board.resizeObserver = new ResizeObserver(() => {
      this.board.resize();
    }).observe(document.getElementById(containerId));
  }

  dispatchMove() {
    this.dispatchEvent(new Event('move'));
  }

  calculateBestMove() {
    const aiFunc = (this.game.turn() === 'w' ? this.whiteAI : this.blackAI);
    return (AI[aiFunc] || noop)(this.game)
  }

  pause() {
    this.paused = true;
  }

  resume() {
    if (!this.paused) {
      return;
    }
    this.paused = false;
    this.makeBestMove();
  }

  checkGameOver() {
    if (this.game.game_over()) {
      this.pause();
      setTimeout(() => {
        if (this.game.in_draw()) {
          alert(`Game over! It's a DRAW.`);
        } else {
          alert(`Game over! ${this.game.turn() !== 'w' ? 'WHITE' : 'BLACK'} WINS!!`);
        }
      }, 500);
      return true;
    }
    return false;
  }

  makeBestMove() {
    if (this.paused) {
      return;
    }

    if (this.checkGameOver()) {
      return;
    }

    const currentTurn = this.game.turn();
    if ((currentTurn === 'w' && this.whiteAI) || (currentTurn === 'b' && this.blackAI)) {
      setTimeout(() => {
        const nextMove = this.calculateBestMove();
        if (nextMove) {
          console.log(currentTurn, ((currentTurn === 'w' && this.whiteAI) || (currentTurn === 'b' && this.blackAI)), nextMove.san || nextMove);
          this.move(nextMove);
        }
      }, Math.round(Math.random() * 500) + 350)
    }
  }

  setPosition(fen) {
    this.game.load(fen);
    this.updateBoard();
    this.dispatchMove();
  }

  move(moveToMake, auto = true) {
    if (this.checkGameOver()) {
      return;
    }
    const move = this.game.move(moveToMake);
    if (auto) {
      this.updateBoard();
    }
    this.dispatchMove();
    this.removeGreySquares();
    this.updateMoveHistory();
    this.makeBestMove();
    return move;
  }

  updateMoveHistory() {
    const moves = this.game.history();
    const historyElement = $('#move-history').empty();
    historyElement.empty();
    for (let i = 0; i < moves.length; i = i + 2) {
      historyElement.append(`<span class="move">${(i / 2) + 1}.  ${moves[i]}  ${(moves[i + 1] ? moves[i + 1] : ' ')}</span>`)
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
      //|| piece.search(/^b/) !== -1
    ) {
      // Block dragging on game end, or opponent's pieces.
      return false;
    }
  }

  removeGreySquares() {
    $('#board .square-55d63').css('background', '');
  }

  onDrop(from, to) {
    if (this.checkGameOver()) {
      return 'snapback';
    }

    const move = this.move({ from, to, promotion }, false);

    if (move === null) {
      return 'snapback';
    }
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

  get whiteAI() {
    return this.whiteAi;
  }

  set whiteAI(val) {
    this.whiteAi = val;
    this.makeBestMove();
  }

  get blackAI() {
    return this.blackAi;
  }

  set blackAI(val) {
    this.blackAi = val;
    this.makeBestMove();
  }
}

