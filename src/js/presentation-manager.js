const FEN = 'fen';
const TXT = 'txt';
const TIT = 'title';

export default class PresentationManager {
  constructor() {
    this.slides = [
      {
        title: "Hello Chess",
        blocks: [
          { type: TIT, text: "Hello Chess World!" },
          {
            type: TXT, text: `Chess is chess and is cool
whichsad asd asd sad
asd asd asd
asd
as\n
ad\n
asd`
          },
          { type: FEN, name: "Initial Position", data: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" },
          { type: TXT, text: "Chess is chess and is cool" },
          { type: FEN, name: "Initial Position", data: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" },
          { type: TIT, text: "Let's Play!" },
          { type: FEN, name: "Initial Position", data: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" },

          { type: TIT, text: "Hello Chess World!" },
          {
            type: TXT, text: `Chess is chess and is cool
whichsad asd asd sad
asd asd asd
asd
as\n
ad\n
asd`
          },
          { type: FEN, name: "Initial Position", data: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" },
          { type: TXT, text: "Chess is chess and is cool" },
          { type: FEN, name: "Initial Position", data: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" },
          { type: TIT, text: "Let's Play!" },
          { type: FEN, name: "Initial Position", data: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" },
        ]
      }, {
        title: "Hello Chess 2",
        blocks: [
          { type: TXT, text: "Hello World 22222!" },
          { type: FEN, name: "Initial Position", data: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" },
          { type: FEN, name: "Bad for Black (E)", data: "4k3/8/8/3Q1Q2/2QQ1QQ1/1QQQ1QQQ/QQQQ1QQQ/QQQQKQQQ w - - 0 1" },
          { type: FEN, name: "Bad for Black", data: "4k3/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" },
          { type: FEN, name: "Who is winning?", data: "rnbqkbnr/pppppppp/8/PPPPPPPP/RNBQKBNR/8/8/8 w KQkq - 0 1" },
        ]
      }
    ];

    this.currentSlide = 0;
  }

  prev() {
    this.currentSlide = Math.max(this.currentSlide - 1, 0);
    return this.current()
  }

  next() {
    this.currentSlide = Math.min(this.currentSlide + 1, this.slides.length);
    return this.current()
  }

  current() {
    return this.slides[this.currentSlide];
  }


}
