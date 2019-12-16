<template>
    <div v-if="mode === 'counter'" class="flex flex-col justify-around mx-12">
        <span></span>
        <span class="text-3xl">{{score > 0 ? '+' : ''}}{{score}}</span>
    </div>
    <div v-else>
        {{player}}
        <div class="flex flex-row">
            <!--suppress HtmlUnknownTarget -->
            <img :class="{'opacity-25': isTaken(player, piece, i)}"
                 :src="imgLink(player, piece)"
                 class="h-6" v-bind:key="piece + i + player"
                 v-for="(piece, i) in 'PPPPPPPP'">
        </div>
        <div class="flex flex-row">
            <!--suppress HtmlUnknownTarget -->
            <img :class="{'opacity-25': isTaken(player, piece, i)}"
                 :src="imgLink(player, piece)"
                 class="h-6" v-bind:key="piece + i + player"
                 v-for="(piece, i) in 'NNBBRRQK'">
        </div>
    </div>
</template>

<script>
  const PIECE_SCORES = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 };

  export default {
    name: "StatusBlock",
    props: {
      mode: null,
      player: null,
      manager: null,
    },
    data() {
      return {
        board: [],
        fen: ''
      }
    },
    computed: {
      pieces: function () {
        return this.fen.split(/\s+/)[0];
      },
      score: function () {
        return this.scoreWhite - this.scoreBlack;
      },
      scoreWhite: function () {
        return Object.keys(PIECE_SCORES).reduce((cnt, piece) => cnt + (PIECE_SCORES[piece] * this.countPiece(piece.toUpperCase())), 0);
      },
      scoreBlack: function () {
        return Object.keys(PIECE_SCORES).reduce((cnt, piece) => cnt + (PIECE_SCORES[piece] * this.countPiece(piece.toLowerCase())), 0);
      },
    },
    methods: {
      countPiece(piece) {
        return this.pieces.split(piece).length - 1;
      },
      isTaken(player, piece, index) {
        piece = player.toLowerCase() === 'white' ? piece.toUpperCase() : piece.toLowerCase();
        const cnt = this.countPiece(piece);
        switch (piece.toLowerCase()) {
          case 'k':
          case 'q':
            return cnt === 0;
          case 'n':
          case 'b':
          case 'r':
            return (cnt < 1) || (cnt === 1 && (index % 2 === 1));
          case 'p':
            return cnt <= index;
          default:
            return true;
        }
      },
      imgLink(player, piece) {
        return `/img/chesspieces/wikipedia/${player[0].toLowerCase()}${piece}.png`;
      },
      onMove() {
        this.fen = this.manager.game.fen();
      },
      initListener() {
        if (this.manager.addEventListener) {
          this.manager.addEventListener('move', this.onMove);
          this.onMove()
        } else {
          setTimeout(this.initListener, 1)
        }
      }
    },

    mounted() {
      this.initListener();
    }
  }
</script>

<style scoped>

</style>
