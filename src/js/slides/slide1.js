import { FEN, TXT, TIT } from "./types.js"
export default {
  title: "Hello Chess",
  blocks: [
    { type: TIT, text: "Hello Chess World!" },
    {
      type: TXT, text: `Chess is chess and it is cool`,
      buttons: [
        { type: FEN, name: "Initial Position", data: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" },
      ]
    },

    { type: TXT, text: "The rules of chess are published by FIDE (Fédération Internationale des Échecs), chess's international governing body, in its Handbook. Rules published by national governing bodies, or by unaffiliated chess organizations, commercial publishers, etc., may differ in some details. FIDE's rules were most recently revised in 2018.", },
    { type: TIT, text: "Chess Theory" },
    {
      type: TXT, text: "Chess theory usually divides the game of chess into three phases with different sets of strategies: the opening, typically the first 10 to 20 moves, when players move their pieces to useful positions for the coming battle; the middlegame; and last the endgame, when most of the pieces are gone, kings typically take a more active part in the struggle, and pawn promotion is often decisive.", buttons: [
        { type: FEN, name: "Who's doing better?", data: "rnbqkbnr/pppppppp/8/8/2BPPB2/2NQ1N2/PPP2PPP/2KRR3 b kq - 14 9" },
      ]
    },
    { type: TIT, text: "The Opening" },
    {
      type: TXT, text: "Opening theory is concerned with finding the best moves in the initial phase of the game. There are dozens of different openings, and hundreds of variants. The Oxford Companion to Chess lists 1,327 named openings and variants.", buttons: [
        { type: FEN, name: "Opening Example", data: "rnbqkbnr/pppp1ppp/8/4p2Q/4P3/8/PPPP1PPP/RNB1KBNR b KQkq - 1 2" },
      ]
    },
    { type: TIT, text: "The Middlegame" },
    {
      type: TXT,
      text: "Middlegame theory is usually divided into chess tactics and chess strategy. Chess strategy concentrates on setting and achieving long-term positioning advantages during the game – for example, where to place different pieces – while tactics concerns immediate maneuver. These two aspects of the gameplay cannot be completely separated, because strategic goals are mostly achieved through tactics, while the tactical opportunities are based on the previous strategy of play.",
      buttons: [
        { type: FEN, name: "Middlegame Example", data: "r1b1n3/3n1kpp/p1pq4/1p1pPN2/2pR1P2/4B1P1/PPP4P/K3R3 w - b6 0 27" },
      ]
    },
    { type: TIT, text: "The Endgame" },
    {
      type: TXT, text: "Endgame theory is concerned with positions where there are only a few pieces left. Theoretics categorise these positions according to the pieces, for example \"King and pawn endings\" or \"Rook versus a minor piece\".", buttons: [
        { type: FEN, name: "K vs. K+Q", data: "8/8/3k4/8/8/7Q/2K5/8 w - - 0 1" },
        { type: FEN, name: "KBN vs. K+R", data: "8/5nb1/3k4/8/8/7R/2K5/8 w - - 0 1" },
        { type: FEN, name: "KRR vs. KQ", data: "8/5Rb1/3k4/1q6/8/7R/2K5/8 w - - 0 1" },
        { type: FEN, name: "K+P 1", data: "8/2K5/8/1P3k2/8/8/8/8 w - - 0 1" },
        { type: FEN, name: "K+P 2", data: "8/8/8/1P3k2/8/6K1/8/8 w - - 0 1" },
        { type: FEN, name: "K+P 3", data: "8/8/8/1P2k3/8/6K1/8/8 w - - 0 1" },
      ]
    },
    { type: TIT, text: "Chess AI" },
    { type: TXT, text: "One of the goals of early computer scientists was to create a chess-playing machine. In 1997, Deep Blue became the first computer to beat the reigning World Champion in a match when it defeated Garry Kasparov. Today's chess engines are significantly stronger than even the best human players, and have deeply influenced the development of chess theory. " }
  ]
}
