<template>
  <v-container fluid>
    <v-row justify="center" v-if="!gameOver">
      <v-col col="12">
        <v-row justify="center my-6">
          <h1>Simon Game</h1>
        </v-row>
        <v-row justify="center my-6">
          <v-btn class="bg-green" @click="startGame" :disabled="gameStarted">Start</v-btn>
        </v-row>
        <v-row justify="center" v-if="!gameStarted">
          <h2>Try to memorize the sequence!</h2>
        </v-row>
        <v-row justify="center" v-if="isComputerTurn && gameStarted">
          <h2>It's computer's turn...</h2>
        </v-row>
        <v-row justify="center" v-if="!isComputerTurn && gameStarted">
          <h2>It's your turn...</h2>
        </v-row>
        <v-row justify="center">
          <v-sheet class="d-flex justify-center align-center flex-wrap my-12 blocks" width="20vw" min-width="200px" min-height="200px">
            <v-btn v-for="(block, index) in colors" :key="index"
              :ripple="{ class: 'text-red' }"
              :style="{ 'background-color': index === selectedBlockComputer[indexOfTurns] ? selectedColor() : block.color }" 
              @click="toggleBlocks(index)"
              width="10vw" height="10vw" min-width="100px" min-height="100px"
              :disabled="isComputerTurn">
            </v-btn>
          </v-sheet>
        </v-row>
        <v-row justify="center">
          <h3>Score : {{ score }}</h3>
        </v-row>
        <v-row justify="center" class="my-10">
          <router-link to="./"><v-btn>Back to Main Menu</v-btn></router-link>
        </v-row>
      </v-col>
    </v-row>
    <v-sheet v-else class="d-flex justify-center align-center my-10 flex-column ga-5 bg-transparent">
      <h2>Game Over!<br></h2>
      <h3>Your Score : {{ score }}</h3>
      <v-sheet class="d-flex justify-center align-center my-10 flex-row ga-10 bg-transparent">
        <v-btn @click="tryAgain">Try Again</v-btn> 
        <router-link to="./"><v-btn>Back to Main Menu</v-btn></router-link>
      </v-sheet>
    </v-sheet>
  </v-container>
</template>

<script setup>
/* global Tone */  // Declare Tone as a global variable

import { ref, watch, onMounted } from 'vue';

let synth;

const selectedBlock = ref([]);
const selectedBlockComputer = ref([]);
const colors = ref([
  { selected: false, color: 'green', note: 'C4' },
  { selected: false, color: 'red', note: 'D4' },
  { selected: false, color: 'yellow', note: 'E4' },
  { selected: false, color: 'blue', note: 'F4' }
]);

const playSound = (note) => {
  synth.triggerAttackRelease(note, "8n");
};

const score = ref(0);
const isComputerTurn = ref(false);
const gameStarted = ref(false);
const gameOver = ref(false);
const indexOfTurns = ref(-1);
const soundPlayed = ref(false);

const startGame = () => {
  isComputerTurn.value = true;
  gameStarted.value = true;
  computerTurn();
};

const toggleBlocks = (index) => {
  playSound(colors.value[index].note)
  if (!isComputerTurn.value && gameStarted.value) {
    colors.value[index].selected = !colors.value[index].selected;
    if (colors.value[index].selected) {
      selectedBlock.value.push(index);
      colors.value[index].selected = false;
      if (selectedBlock.value.length <= selectedBlockComputer.value.length) {
        if (selectedBlock.value[selectedBlock.value.length - 1] !== selectedBlockComputer.value[selectedBlock.value.length - 1]) {
          resetGame();
        } else if (selectedBlock.value.length === selectedBlockComputer.value.length) {
          selectedBlock.value = [];
          isComputerTurn.value = true;
          computerTurn();
          indexOfTurns.value++;
          score.value++;
        }
      }
    }
  }
};

const computerTurn = () => {
  setTimeout(() => {
    const randomIndex = Math.floor(Math.random() * 4);
  selectedBlockComputer.value.push(randomIndex);
  let delay = 0;
  isComputerTurn.value = true;

  for (let i = 0; i < selectedBlockComputer.value.length; i++) {
    setTimeout(() => {
      blackColor.value = false;
      indexOfTurns.value = i;
      if (i === selectedBlockComputer.value.length - 1) {
        setTimeout(() => {
          isComputerTurn.value = false;
        }, 1400);
      }
    }, delay);
    delay += 1400;
  }
  }, 600);
  
};

const resetGame = () => {
  console.log('reseted')
  selectedBlock.value = [];
  selectedBlockComputer.value = [];
  gameStarted.value = false;
  indexOfTurns.value = -1;
  gameOver.value = true;
};

const tryAgain = () => {
  gameOver.value = false;
}

const changedColor = ref('black');
const originalColor = ref('');
const blackColor = ref(false);

const selectedColor = () => {
  if (!blackColor.value && !soundPlayed.value) {
    changedColor.value = originalColor.value;
    setTimeout(() => {
      changedColor.value = 'pink';
      setTimeout(() => {
        changedColor.value = originalColor.value;
        blackColor.value = true;
        if (!soundPlayed.value) {
          const playingNote = colors.value[selectedBlockComputer.value[indexOfTurns.value]].note;
          console.log('Hello');
          playSound(playingNote);
          soundPlayed.value = true;
        }
      }, 400);
    }, 400);
  }
  return changedColor.value;
};

watch(() => {
  originalColor.value = selectedBlockComputer.value[indexOfTurns.value] !== undefined ? colors.value[selectedBlockComputer.value[indexOfTurns.value]].color : '';
  soundPlayed.value = false;
});

onMounted(() => {
  const script = document.createElement('script');
  script.src = "https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.37/Tone.js";
  script.onload = () => {
    synth = new Tone.Synth().toDestination();
  };
  document.head.appendChild(script);
});
</script>
