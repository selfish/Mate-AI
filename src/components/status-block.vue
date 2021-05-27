<template>
    <div>
        <div>{{player}}</div>
        <div class="flex flex-row">
            <!--suppress HtmlUnknownTarget -->
            <img :class="{'opacity-25': isTaken(player, piece, i)}"
                 :src="imgLink(player, piece)"
                 class="h-6" v-bind:key="piece + i + player"
                 v-for="(piece, i) in 'PPPPPPPP'">
        </div>
        <div class="flex flex-row">
            <!--suppress HtmlUnknownTarget -->
            <img :class="{'opacity-25': isTaken(player, piece, i), [piece + i]: true}"
                 :src="imgLink(player, piece)"
                 class="h-6" v-bind:key="piece + i + player"
                 v-for="(piece, i) in 'NNBBRRQK'">
        </div>
    </div>
</template>

<script>
  export default {
    name: "StatusBlock",
    props: {
      player: null,
      fen: null,
    },
    methods: {
      isTaken(player, piece, index) {
        piece = player.toLowerCase() === 'white' ? piece.toUpperCase() : piece.toLowerCase();
        const cnt = this.$parent.countPiece(piece);
        switch (piece.toLowerCase()) {
          case 'q':
            return cnt === 0;
          case 'n':
          case 'b':
          case 'r':
            return (cnt < 1) || (cnt === 1 && (index % 2 === 1));
          case 'p':
            return cnt <= index;
          default:
            return false;
        }
      },
      imgLink(player, piece) {
        return `/img/chesspieces/wikipedia/${player[0].toLowerCase()}${piece}.png`;
      },
    },
  }
</script>

<style lang="scss" scoped>

</style>
