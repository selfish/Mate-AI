<template>
  <div id="app" class="flex flex-col">
    <h1 class="text-4xl m-2">Tailor's Chess AI</h1>
    <div class="flex flex-row">
      <div id="board" class="board m-2"></div>
      <div class="flex flex-col items-center flex-grow mr-3 mt-1 font-bold" v-if="this.presentation">
        <div class="flex flex-row space-around ml-1 w-9/12">
          <button class="btn m-1 p-1 w-12" @click="presentation.prev()">←</button>
          <h1 class="text-2xl font-black flex-grow">{{ presentation.current().title }}</h1>
          <button class="btn my-1 p-1 w-12 font-bold" @click="presentation.next()">→</button>
        </div>
        <div id="slides" class="flex flex-col m-4 p-2 w-9/12">
          <div v-for="(block, i) in this.presentation.current().blocks" v-bind:key="i"
               :class="{'text-right': block.type === 'fen'}">

            <h1 v-if="block.type === 'title'" class="text-left text-xl mt-12 ml-12 font-black">
              {{ i + 1 }}. {{ block.text }}
            </h1>

            <pre v-if="block.type === 'txt'" class="text-left mt-4 ml-1 pl-2 font-medium">{{ block.text }}</pre>

            <button v-if="block.type === 'fen'"
                    class="btn text-left mx-auto mr-none my-4 p-1 w-full text-left max-w-sm rounded"
                    @click="setPosition(block.data)">{{ i + 1 }}. {{ block.name }}
            </button>

          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col bottom">
      <div class="flex flex-row flex-grow justify-around">
        <StatusBlock :player="'White'" :manager="this.manager"/>
        <StatusBlock :mode="'counter'" :manager="this.manager"/>
        <StatusBlock :player="'Black'" :manager="this.manager"/>
        <div class="flex flex-col justify-around">
          <button class="px-1" @click="manager.resume()">▶</button>
          <button class="px-1" @click="manager.resume()">⎌</button>
        </div>
        <div class="flex flex-col justify-around">
          <button class="px-1" @click="manager.pause()">❙❙</button>
          <button class="px-1" @click="manager.pause()">→</button>
        </div>
      </div>
      <div id="move-history" class="flex flex-row flex-wrap m-2"></div>
    </div>
  </div>
</template>

<script>
import 'chessboardjs/www/css/chessboard.css'
import 'vue-chessboard/dist/vue-chessboard.css'
import JQuery from 'jquery';

window.$ = JQuery;
import Chess from '../../node_modules/chess.js/chess';
import AI from "../js/ai";
import GameManager from "../js/game-manager";
import PresentationManager from "../js/presentation-manager";
import StatusBlock from "./status-block";

export default {
  name: 'app',
  components: {
    StatusBlock,
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
    init() {
      this.game = new Chess();

      this.manager = new GameManager({
        game: this.game,
        containerId: 'board',
        whiteAI: 'preferValueCapture',
        blackAI: 'preferValueCapture',
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
  // box-shadow: inset 0 0 10px #ff9799;
}

body {
  margin: 0;
  padding: 0;
  background-color: #ede9f3;
  background-image: url("../assets/styles/glamorous.svg");
}

button {
  padding: 10px;
  border: 2px #2c3e50 solid;
}

.btn {
  background-color: #ede9f3;
}

.move {
  text-align: left;
  margin-right: 1rem;
}

.board {
  width: 70vh;
  height: 70vh;
}

.bottom {
  width: 70vh;
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

pre {
  font-family: 'Avenir', Helvetica, Arial, sans-serif !important;
}

</style>
