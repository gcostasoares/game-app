<template>
  <v-container>
    <v-main>
      <section v-if="!gameStarted">
        <v-row justify="center" class="my-12 bg-transparent">
          <v-sheet class="my-3 my-12 bg-transparent text-center">
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
        <v-row justify="center" class="mx-lg-5">
          <v-sheet v-if="(score < blocks.length && !gameOver)" class="bg-transparent d-flex justify-center align-center flex-column">
            <v-row justify="center" class="mt-5" height="90vh">
              <v-col cols="3" v-for="(block, index) in shuffledBlocks" :key="index" align="center">
                <v-btn
                  @click="selectCard(index)"
                  :style="{ backgroundColor: block.selected ? block.color : 'black' }"
                  class="blocks mx-1 my-3"
                >
                </v-btn>
              </v-col>
            </v-row>
            <v-row justify="center" class="bg-transparent">
              <div class="d-flex justify-space-around align-center mb-6 bg-transparent flex-column flex-md-row">
                <v-sheet class="bg-transparent">
                 
                    <v-btn class="ma-5 bg-white"><router-link to="./"><h3>Back to Main Menu</h3></router-link></v-btn>
      
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
          <v-sheet v-else-if="(score < blocks.length && gameOver)" class="d-flex justify-center align-center flex-column-reverse my-10 ga-10 bg-transparent">
            <h3>Game Over</h3>
            <h3>Score : {{ score }}/{{ blocks.length/2 }}</h3>
            <v-btn @click="resetGame()">Try Again </v-btn>
            <router-link to="./"><v-btn>Back to Main Menu</v-btn></router-link>
          </v-sheet>
          <v-sheet v-else>
            <p>Hello</p>
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
      }, 400)
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

const resetGame = () => {
  gameOver.value = false;
  gameStarted.value = false;
  timer.value = 60;
}

</script>

<style scoped>

.v-sheet {
  text-decoration: none;
  color: black;
}

h3 {
  text-decoration: none;
  color: black;
}

.v-btn{
  background-color: white;
  border: 3px solid black;
  text-decoration: none;
  color: black;
  max-width: 300px;
  min-width: 200px;
  width: 30vw;
}

.blocks{
  width: 15vw;
  height: 15vw;
  min-width: 0;
  max-width: 100px;
  max-height: 200px;
  
}
@media (min-width: 800px) {
  .blocks {
    max-width: 200px;
  }
}

.router-link {
  text-decoration: none
}

</style>
