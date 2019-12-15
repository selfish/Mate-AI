<template>
    <div id="app flex flex-col">
        <div id="board" class="board"></div>
        <div class="info">
            <div id="move-history" class="move-history">
            </div>
        </div>
    </div>
</template>

<script>
  import 'chessboardjs/www/css/chessboard.css'
  import 'vue-chessboard/dist/vue-chessboard.css'
  import JQuery from 'jquery';

  window.$ = JQuery;
  import Chess from 'chess.js';
  import ChessBoard from 'chessboardjs';
  import AI from "./ai";
  import GameManager from "./game-manager";

  export default {
    name: 'app',
    components: {},
    methods: {},
    mounted() {
      const ai = new AI();
      new GameManager(new Chess(), 'board', ai.calculateBestMove)
    }
  }
</script>

<style lang="scss">
    div {
        box-shadow: inset 0 0 10px #ff9799;
    }

    body {
        margin: 0;
        padding: 0;
    }

    button {
        padding: 10px;
        border: 2px #2c3e50 solid;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        width: 100vw;
        height: 100vh;
    }

</style>
