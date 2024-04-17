<template>
    <v-container fluid>
      
      <v-row justify="center" v-if="(!gameOver)">
        <v-col col="12">
          <v-row justify="center my-6">
            <h1>Simon Game</h1>
          </v-row>
          <v-row justify="center my-6">
            <v-btn class="bg-green" @click="startGame" :disabled="gameStarted">Start</v-btn>
          </v-row>
          <v-row justify="center">
            <v-sheet class="d-flex justify-center align-center flex-wrap my-12 blocks" width="20vw" min-width="200px" min-height="200px">
            
            <v-btn  v-for="(block, index) in colors" :key="index"
                :style="{ 'background-color': index === selectedBlockComputer[indexOfTurns] ? selectedColor() : block.color }" 
                @click="toggleBlocks(index)"
                width="10vw" height="10vw" min-width="100px" min-height="100px"
                >
                
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
        <v-btn @click="(gameOver = false, score = 0)">Try Again</v-btn> 
        <router-link to="./"><v-btn>Back to Main Menu</v-btn></router-link>
      </v-sheet>
      </v-sheet>
    </v-container>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  
  const selectedBlock = ref([]);
  const selectedBlockComputer = ref([]);
  const colors = ref([
    {selected: false, color: 'blue'},
    {selected: false, color: 'yellow'},
    {selected: false, color: 'green'},
    {selected: false, color: 'red'}
  ]);
  
  const score = ref(0);
  
  let isComputerTurn = false;
  let gameStarted = false;
  
  let gameOver = ref(false)
  
  let indexOfTurns = ref(-1); 
  
  const startGame = () => {
    isComputerTurn = true;
    gameStarted = true;
    computerTurn();
  };
  
  let messageSuccess = ref([]);
  
  const toggleBlocks = (index) => {
    if (!isComputerTurn && gameStarted) {
      colors.value[index].selected = !colors.value[index].selected;
      if (colors.value[index].selected) {
        selectedBlock.value.push(index);
        colors.value[index].selected = false;
        if (selectedBlock.value.length <= selectedBlockComputer.value.length) {
            if (selectedBlock.value[selectedBlock.value.length - 1] !== selectedBlockComputer.value[selectedBlock.value.length - 1]) {
              messageSuccess.value = "Game Over";
              resetGame(); 
            } else if (selectedBlock.value.length === selectedBlockComputer.value.length) {
              messageSuccess.value = "correct"; 
              selectedBlock.value = [];
              isComputerTurn = true;
              computerTurn();
              indexOfTurns.value++;
              score.value++;
            }
         }
      }
    }
  };
  
  const computerTurn = () => {
    const randomIndex = Math.floor(Math.random() * 4);
    selectedBlockComputer.value.push(randomIndex);
    isComputerTurn = false;
    for (let i = 0; i < selectedBlockComputer.value.length; i++) {
      setTimeout(() => {
        blackColor.value = false;
        indexOfTurns.value = i; 
      }, i * 1400); 
    }
  };
  
  const resetGame = () => {
    selectedBlock.value = [];
    selectedBlockComputer.value = [];
    gameStarted = false;
    indexOfTurns.value = -1; 
    gameOver.value = true;
  };
  
  let changedColor = ref('black');
  let originalColor = ref('');
  let blackColor = ref(false);
  
  const selectedColor = () => {
    if (!blackColor.value) {
      changedColor.value = originalColor.value;
      setTimeout(() => {
        changedColor.value = 'pink';
        setTimeout(() => {
          changedColor.value = originalColor.value;
          blackColor.value = true;
        }, 400);
      }, 400);
    } 
    
    return changedColor.value;
  };
  
  watch(() => {
    originalColor.value = selectedBlockComputer.value[indexOfTurns.value] !== undefined ? colors.value[selectedBlockComputer.value[indexOfTurns.value]].color : '';
  });
  
  console.log(gameOver.value);
  
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
}

.router-link {
  text-decoration: none
}


</style>
  