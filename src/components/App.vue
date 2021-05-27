<template>
  <div>
    <div id="app" class="grid-container px-24">
      <div class="header"><h1 class="text-4xl font-black m-2">A Selfish Chess AI</h1></div>

      <div id="board" class="chessboard"/>

      <board-controls v-bind:manager="manager" v-bind:whiteAi="manager.whiteAI" v-bind:blackAi="manager.blackAI" v-on:set-ai="setAI(...arguments)"/>

      <presentation></presentation>
    </div>

    <div id="aapp" class="ccontainer hidden">

      <div class="flex flex-row">

        <div class="flex flex-col items-center flex-grow mr-3 mt-1 font-bold" v-if="this.presentation">
          <div class="flex flex-row space-around ml-1 w-9/12">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'chessboardjs/www/css/chessboard.css'
import 'vue-chessboard/dist/vue-chessboard.css'
import Chess from '../../node_modules/chess.js/chess';
import Presentation from "./presentation";
import BoardControls from "./board-controls";
import GameManager from "../js/game-manager";
import PresentationManager from "../js/presentation-manager";
import JQuery from 'jquery';

window.$ = JQuery;

export default {
  name: 'app',
  components: {
    Presentation,
    BoardControls,
  },
  data() {
    return {
      rerender: 0,
      ai: {},
      game: {},
      manager: {},
      presentation: new PresentationManager(this.manager)
    }
  },

  methods: {
    setPosition(fen) {
      this.manager.setPosition(fen)
    },
    setAI(color, aiName) {
      this.$set(this.manager, color, aiName)
      this.$forceUpdate();
    },
    init() {
      this.game = new Chess();

      this.manager = new GameManager({
        game: this.game,
        containerId: 'board',
        whiteAI: 'random',
        blackAI: 'random',
      });
    }
  },
  mounted() {
    setTimeout(this.init);
  }
}
</script>

<style lang="scss">
div {
  //box-shadow: inset 0 0 10px #ff9799;
}

body {
  margin: 0;
  padding: 0;
  background-color: #ede9f3;
  background-image: url("../assets/styles/glamorous.svg");
}

#app {
  color: #2c3e50;
  text-align: center;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.grid-container {
  padding: 1rem;
  height: 100vh;
  overflow: scroll;

  display: grid;
  grid-template-columns: 35% 1fr;
  grid-template-rows: max-content min-content min-content 1fr;
  gap: 10px 100px;
  grid-template-areas:
    "header header"
    "chessboard presentation"
    "chessboard presentation"
    "board-controls presentation";
}

.chessboard {
  grid-area: chessboard;
}

.presentation {
  grid-area: presentation;
}

.board-controls {
  grid-area: board-controls;
}

.header {
  grid-area: header;
}

button {
  padding: 10px;
  border: 2px #2c3e50 solid;
}

.btn {
  background-color: #ede9f3;
}

.bottom {
  width: 70vh;
}

pre {
  font-family: 'Avenir', Helvetica, Arial, sans-serif !important;
}

.centered {
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
