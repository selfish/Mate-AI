import { FEN, TXT, TIT } from "./types.js"

export default  {
  title: "Hello Chess 2",
  blocks: [
    {
      type: TXT, text: "Hello World 22222!", buttons: [
        { type: FEN, name: "Initial Position", data: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" },
        { type: FEN, name: "Bad for Black (E)", data: "4k3/8/8/3Q1Q2/2QQ1QQ1/1QQQ1QQQ/QQQQ1QQQ/QQQQKQQQ w - - 0 1" },
        { type: FEN, name: "Bad for Black", data: "4k3/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" },
        { type: FEN, name: "Who is winning?", data: "rnbqkbnr/pppppppp/8/PPPPPPPP/RNBQKBNR/8/8/8 w KQkq - 0 1" },
      ]
    },
  ]
}
