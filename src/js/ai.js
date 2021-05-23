const random = arr => arr[Math.floor(Math.random() * arr.length)];
const sort = (arr, valuation) => arr.sort((a, b) => (valuation(b) - valuation(a)));

class AI {
  // List of AI Algorithms Available:

  get algorithms() {
    return [
      'player',
      'random',
      'preferCapture',
      'preferValueCapture'
    ]
  }

  // HUMAN PLAYER:
  get player() {return null}

  //RANDOM MOVES:
  static random(game) {
    const newGameMoves = game.moves();
    return random(newGameMoves);
  }

  // PREFER CAPTURES
  static preferCapture(game) {
    const legalMoves = game.moves({ verbose: true });
    const capturingMoves = legalMoves.filter(move => move.captured);
    if (capturingMoves.length === 0) {
      return AI.random(game);
    }
    return random(capturingMoves);
  }

  // PREFER VALUE CAPTURES

  static simpleValuation(move) {
    const values = { p: 10, n: 30, b: 30, r: 50, q: 90, k: 900 };
    return values[move.captured] || 0;
  }

  static preferValueCapture(game) {
    const legalMoves = game.moves({ verbose: true });
    const capturingMoves = legalMoves.filter(move => move.captured);

    if (capturingMoves.length === 0) {
      return AI.random(game);
    }

    const orderedCapturingMoves = sort(capturingMoves, AI.simpleValuation);
    return orderedCapturingMoves[0];
  }

  //
}

export default AI;
