<template>
  <div class="presentation">

    <div style="grid-area: left">
      <button class="btn m-1 p-1 w-12" @click="presentation.prev()">←</button>
    </div>
    <div class="centered" style="grid-area: title">
      <h1 class="text-2xl font-black flex-grow">{{ presentation.current().title }}</h1>
    </div>
    <div style="grid-area: right">
      <button class="btn my-1 p-1 w-12 font-bold" @click="presentation.next()">→</button>
    </div>

    <div id="slides" class="slides flex flex-col pb-48 overflow-y-scroll">
      <template v-for="(block, i) in this.presentation.current().blocks"
                :class="{'text-right': block.type === 'fen'}">

        <h1 v-if="block.type === 'title'" class="text-left text-xl mt-12 ml-12 font-black" v-bind:key="i">
          {{ block.text }}
        </h1>

        <div v-if="block.type === 'txt'" v-bind:key="i" class="txt-buttons">
            <pre class="txt-txt text-left whitespace-pre-wrap text-lg mt-4 ml-1 pl-2 font-medium" v-bind:key="i">{{ block.text }}</pre>
            <div class="txt-btn">
              <template v-for="(button, b) in block.buttons">
                <button v-if="button.type === 'fen'" v-bind:key="b"
                        class="float: right; btn text-center mx-auto mr-none my-1 p-1 w-full text-left max-w-sm rounded"
                        @click="setPosition(button.data)">{{ button.name }}
                </button>
              </template>
            </div>
        </div>


        <button v-if="block.type === 'fen'" v-bind:key="i"
                class="float: right; btn text-center mx-auto mr-none my-4 p-1 w-full text-left max-w-sm rounded"
                @click="setPosition(block.data)">{{ block.name }}
        </button>
      </template>
    </div>
  </div>
</template>

<script>
import PresentationManager from "../js/presentation-manager";

export default {
  name: "presentation",
  data() {
    return {
      presentation: new PresentationManager(this.manager)
    }
  },
  methods: {
    setPosition(fen) {
      this.$parent.manager.setPosition(fen)
    },
  }
}
</script>

<style lang="scss" scoped>

.presentation {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: min-content 1fr;
  gap: 10px;
  grid-template-areas:
    "left title right"
    "slides slides slides";
}

.txt-buttons {
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: 1fr;
  gap: 10px;
  grid-template-areas: "text buttons";
}

.txt-txt {
  grid-area: text;
}

.txt-btn {
  grid-area: buttons;
}

.slides {
  grid-area: slides;
}

</style>
