<template>
  <v-container>
    <v-main>
      <section v-if="!gameStarted">
        <v-row justify="center" class="my-12 bg-transparent">
          <v-sheet class="my-12 bg-transparent text-center">
            <h2>You have 60 seconds to finish the game</h2>
          </v-sheet>
        </v-row>
        <v-row justify="center">
          <v-btn @click="startGame" variant="elevated" color="green">
            <h3>Let's begin!</h3>
          </v-btn>
        </v-row> 
      </section>
      <section v-else>
        <v-row justify="center">
          <v-sheet v-if="(score < blocks.length && !gameOver && !gameWon)" class="bg-transparent d-flex justify-center align-center flex-column">
            <v-row class="d-flex justify-center align-center mt-5 mb-5">
                    <v-col cols="3" v-for="(block, index) in shuffledBlocks" :key="index" class="d-flex justify-center">
                      <v-btn
                          class="play-block"
                          :class="{ 'card-unselected': !block.selected, 'card-selected': block.selected }"
                          :style="{ '--selected-color': block.color }"
                          @click="selectCard(index)"
                        >
                        </v-btn>
                    </v-col>
                  </v-row>
            <v-row justify="center" class="bg-transparent">
              <div class="d-flex justify-space-around align-center bg-transparent flex-column flex-md-row">
                <v-sheet class="bg-transparent">
                 
                    <v-btn class="bg-green"><router-link to="./"><h3>Back to Main Menu</h3></router-link></v-btn>
      
                </v-sheet>
                <v-sheet class="bg-transparent">
                  <v-chip class="ma-5 pa-5 bg-white">
                    <h3>Score : {{ score }}/{{ blocks.length/2 }}</h3>
                  </v-chip>
                </v-sheet>
                <v-sheet class="bg-transparent">
                  <v-chip class="ma-5 pa-5 bg-white">
                    <h3>Your time is running out! : {{ timer }}</h3>
                  </v-chip>
                </v-sheet>
                
              </div>
            </v-row>
          </v-sheet>
          <v-sheet v-if="gameWon" class="bg-transparent">
            <v-row class="d-flex justify-center align-center my-10 flex-column bg-transparent ga-10">
            <h3>WOW!!</h3>
            <h3>You won the game! Congratulations!</h3>
            <v-btn @click="resetGame()">Try Again </v-btn>
          </v-row>
          </v-sheet>
          <v-sheet v-else-if="(score < blocks.length && gameOver)" class="d-flex justify-center align-center flex-column-reverse my-10 ga-10 bg-transparent">
            <h3>Game Over</h3>
            <h3>Score : {{ score }}/{{ blocks.length/2 }}</h3>
            <v-btn @click="resetGame()">Try Again </v-btn>
            <router-link to="./"><v-btn>Back to Main Menu</v-btn></router-link>
          </v-sheet>
        </v-row>
      </section>
    </v-main>
  </v-container>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const blocks = ref([
  { selected: false, color: 'pink' },
  { selected: false, color: 'yellow' },
  { selected: false, color: 'red' },
  { selected: false, color: 'blue' },
  { selected: false, color: 'green' },
  { selected: false, color: 'purple' },
  { selected: false, color: 'orange' },
  { selected: false, color: 'cyan' },
  { selected: false, color: 'pink' },
  { selected: false, color: 'yellow' },
  { selected: false, color: 'red' },
  { selected: false, color: 'blue' },
  { selected: false, color: 'green' },
  { selected: false, color: 'purple' },
  { selected: false, color: 'orange' },
  { selected: false, color: 'cyan' }
]);

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffleArray(blocks.value);

let selectedIndices = ref([])

let gameStarted = ref(false)

console.log (gameStarted)

const startGame = () => {
  gameStarted.value = true
}

let score = ref(0)

let timer = ref (60)

const selectCard = (index) => {
  blocks.value[index].selected = !blocks.value[index].selected
  selectedIndices.value.push(index)
  
  if (selectedIndices.value.length === 2) {
    const firstIndex = selectedIndices.value[0]
    const secondIndex = selectedIndices.value[1]
    
    if (blocks.value[firstIndex].color === blocks.value[secondIndex].color) {
      selectedIndices.value = []
      score.value++
    } else {
      setTimeout(() => {
        selectedIndices.value.forEach(i => {
          blocks.value[i].selected = false
        })
        selectedIndices.value = []
      }, 500)
    }
  }
}

setInterval(() => {
  if(timer.value > 0) {
    timer.value--
  }
}, 1000 )

const shuffledBlocks = computed(() => {
  return blocks.value.slice(); 
})

let gameOver = ref(false);

watch(timer, (currentTimer) => {
  if (currentTimer === 0) {
    gameOver.value = true;
  }
});

let gameWon = ref(false);

watch(score, (newScore) => {
  console.log("Current Score: ", newScore);
  if (newScore >= blocks.value.length / 2 && !gameWon.value) {
    console.log("Winning Condition Met");
    gameWon.value = true;
  }
});


const resetGame = () => {
  gameOver.value = false;
  gameStarted.value = false;
  gameWon.value = false;
  timer.value = 60;
  score.value = 0;
  shuffleArray(blocks.value);
  blocks.value.forEach(block => {
    block.selected = false;
  });
}

</script>

<style scoped>

.card-unselected {
  background: linear-gradient(135deg, #182213, #2D2D2D);
  background-size: 100% 100%;
  background-position: 0px 0px;
}

.card-selected {
  background-color: var(--selected-color); 
}

.v-sheet {
  text-decoration: none;
  color: black;
}

h3 {
  text-decoration: none;
  color: black;
}

.play-block {
  width: 60px;
  height: 60px
}

@media (min-width: 700px) {
  .play-block {
    width: 110px;
    height: 110px;
  }
}

@media (min-width: 1100px) {
  .play-block {
    width: 130px;
    height: 130px;
  }
}



.router-link {
  text-decoration: none
}

</style>
