<template>
  <div class="board-controls overflow-scroll">
    <div class="white-ai">
      <v-select :options="aiOptions" :clearable="false" :filterable="false" v-bind:value="whiteAi" @input="setWhiteAI"></v-select>
    </div>
    <div class="black-ai">
      <v-select :options="aiOptions" :clearable="false" :filterable="false" v-bind:value="blackAi" @input="setBlackAI"></v-select>
    </div>
    <StatusBlock class="white-status" :player="'White'" v-bind:fen="this.fen"/>
    <div class="evaluation centered">
      <span class="text-3xl">{{ score > 0 ? '+' : '' }}{{ score }}</span>
    </div>
    <StatusBlock class="black-status" :player="'Black'" v-bind:fen="this.fen"/>

    <div class="controls">
      <button class="play" @click="$parent.manager.resume()"/>
      <button class="pause" @click="$parent.manager.pause()"/>
      <button class="undo" @click="$parent.manager.resume()"/>
      <button class="redo" @click="$parent.manager.pause()"/>
    </div>

    <div id="move-history" class="moves overflow-scroll flex flex-row content-start flex-wrap p-2"/>
  </div>
</template>

<script>
import StatusBlock from "./status-block";
import AI from "../js/ai";

const PIECE_SCORES = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 };

export default {
  name: "board-controls",
  components: {
    StatusBlock
  },
  props: {
    manager: null,
    whiteAi: null,
    blackAi: null,
  },
  data() {
    return {
      board: [],
      fen: ''
    }
  },
  computed: {
    aiOptions() {
      return AI.algorithms;
    },
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
    setWhiteAI(value){
      this.$emit('set-ai', 'whiteAI', value)
    },
    setBlackAI(value){
      this.$emit('set-ai', 'blackAI', value)
    },
    getAIList(filter) {
      debugger;
    },
    countPiece(piece) {
      return this.pieces.split(piece).length - 1;
    },
    onMove() {
      console.log("onmove ok")
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

<style lang="scss">

.board-controls {
  display: grid;
  grid-template-columns: max-content 1fr max-content 1fr;
  grid-template-rows: min-content min-content 1fr;
  gap: 10px;
  grid-template-areas:
    "white-ai . black-ai ."
    "white-status evaluation black-status controls"
    "moves moves moves moves";
  grid-area: board-controls;
}

.white-ai {
  grid-area: white-ai;
}

.black-ai {
  grid-area: black-ai;
}

.white-status {
  grid-area: white-status;
}

.black-status {
  grid-area: black-status;
}

.evaluation {
  grid-area: evaluation;
}

.controls {
  grid-area: controls;
}

.controls {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 10px;
  grid-template-areas:
    "play pause"
    "undo redo";
  grid-area: controls;
}

.play {
  grid-area: play;

  &:after {
    content: '▶';
  }
}

.pause {
  grid-area: pause;

  &:after {
    content: '❙❙';
  }
}

.undo {
  grid-area: undo;

  &:after {
    content: '⎌';
  }
}

.redo {
  grid-area: redo;

  &:after {
    content: '→';
  }
}

.moves {
  grid-area: moves;
}

.move {
  text-align: left;
  margin-right: 1rem;
  height: min-content;
  width: 130px;
}

</style>
