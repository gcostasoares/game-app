<template>
    <v-app>
      <v-container fluid>
        <v-main >
          <section v-if="!quizCompleted">
            <v-sheet class="text-center my-14 bg-transparent text-black">
              <h1>{{ questions[currentQuestion].question }}</h1>
            </v-sheet>
            <v-row justify="center" class="my-14">
              <v-col cols="auto">
                <v-row class="text-center">
                  <v-col cols="6" v-for="(option, index) in questions[currentQuestion].options" :key="index">
                    <v-btn @click="selectAnswer(index)" 
                           class="my-5 bg-white questions"
                           :class="{ 'bg-green': questions[currentQuestion].selected === index }"
                            width="30vw"
                           rounded="lg"
                           variant="outlined">
                      {{ option }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
  
            <v-sheet class="d-flex justify-center bg-transparent ga-10 flex-column-reverse flex-md-row align-center">
              <router-link to="./"><v-btn width="60vw">Back to Main Menu</v-btn></router-link>
              <v-btn @click="previousButton" :disabled="currentQuestion == 0" width="200px" class="bg-white">Previous Question</v-btn>
              <v-btn @click="nextButton" v-if="currentQuestion < questions.length -1" width="200px">Next Question</v-btn>
              <v-btn @click="quizCompleted=true" v-else width="200px">End Quiz</v-btn>
              
            </v-sheet>
          </section>
          <section v-else justify="center">
            <v-row class="text-blue my-10" justify="center">
              <h2>End of the Game</h2>
            </v-row>
            <v-row justify="center">
              <h3 class="text-green">Your Score: {{ score }}</h3>
            </v-row>
            <v-row justify="center">
              <v-btn @click="resetQuiz" class="my-7">Try Again!</v-btn>
            </v-row>
          </section>
        </v-main>
      </v-container>
    </v-app>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  const questions = ref([
  {
      question: 'What is the capital of Australia?',
      options: ['Sydney', 'Melbourne', 'Canberra', 'Perth'],
      answer: 2
    },
    {
      question: 'Which river is the longest in the world?',
      options: ['Amazon', 'Nile', 'Yangtze', 'Mississippi'],
      answer: 1
    },
    {
      question: 'Which country is known as the Land of the Rising Sun?',
      options: ['China', 'Japan', 'South Korea', 'Thailand'],
      answer: 1
    },
    {
      question: 'What is the largest desert in the world?',
      options: ['Gobi', 'Sahara', 'Arabian', 'Kalahari'],
      answer: 1
    },
    {
      question: 'Which ocean is the largest?',
      options: ['Atlantic', 'Indian', 'Pacific', 'Arctic'],
      answer: 2
    },
    {
      question: 'Which country is the smallest by land area?',
      options: ['Monaco', 'Maldives', 'Vatican City', 'Nauru'],
      answer: 2
    },
    {
      question: 'What is the tallest mountain in the world?',
      options: ['Mount Everest', 'K2', 'Kangchenjunga', 'Lhotse'],
      answer: 0
    },
    {
      question: 'Which city is known as the City of Love?',
      options: ['Paris', 'Rome', 'Venice', 'Florence'],
      answer: 0
    },
    {
      question: 'What is the largest island in the world?',
      options: ['Greenland', 'Australia', 'Borneo', 'Madagascar'],
      answer: 0
    },
    {
      question: 'Which continent is the most populous?',
      options: ['Asia', 'Africa', 'Europe', 'North America'],
      answer: 0
    }
  ])
  
  let quizCompleted = ref(false)
  const currentQuestion = ref(0)
  
  const nextButton = () => {
    if (currentQuestion.value < questions.value.length -1) {
      currentQuestion.value++
    } else {
      quizCompleted = true
    }
  }
  
  const previousButton = () => {
    if (currentQuestion.value > 0 ) {
      currentQuestion.value--
    }
  }
  
  const score = computed(() => {
    let value = 0
    questions.value.map(q => {
      if(q.selected != null && q.answer == q.selected) {
        value++
      }
    })
    return value
  })
  
  const selectAnswer = (index) => {
    questions.value[currentQuestion.value].selected = index
  }
  
  const resetQuiz = () => {
    questions.value.forEach(q => {
      q.selected = null;
    });
    quizCompleted.value = false;
    currentQuestion.value = 0;
  }
  </script>
  
  <style scoped>
  
  .bg-green {
    background-color: green;
  }

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
  max-width: 250px;

  width: 30vw;
}

.questions {
  width: 40vw;
  max-width: 400px;
}

@media (max-width: 500px) {
  .v-btn {
    font-size: 0.7rem;
  }

}


.router-link {
  text-decoration: none
}

  </style>
  