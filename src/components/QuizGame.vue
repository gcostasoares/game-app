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
                           :class="{ 'bg-blue': questions[currentQuestion].selected === index }"
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
    question: 'Which planet is known as the Red Planet?',
    options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
    answer: 1
  },
  {
    question: 'In which city would you find the famous “Christ the Redeemer” statue?',
    options: ['Buenos Aires', 'Sao Paulo', 'Rio de Janeiro', 'Lima'],
    answer: 2
  },
  {
    question: 'What is the name of the fictional African country in the movie “Black Panther”?',
    options: ['Zaire', 'Naboo', 'Wakanda', 'Krypton'],
    answer: 2
  },
  {
    question: 'Which animal is known as the King of the Jungle?',
    options: ['Lion', 'Tiger', 'Elephant', 'Giraffe'],
    answer: 0
  },
  {
    question: 'What is the rarest blood type in humans?',
    options: ['O+', 'A-', 'AB-', 'B+'],
    answer: 2
  },
  {
    question: 'In which year did the Titanic sink?',
    options: ['1912', '1905', '1898', '1923'],
    answer: 0
  },
  {
    question: 'Which musical instrument has keys, pedals, and strings?',
    options: ['Guitar', 'Piano', 'Violin', 'Drums'],
    answer: 1
  },
  {
    question: 'What is the smallest bone in the human body?',
    options: ['Stapes', 'Femur', 'Tibia', 'Humerus'],
    answer: 0
  },
  {
    question: 'Which company created the first personal computer?',
    options: ['IBM', 'Apple', 'Microsoft', 'Compaq'],
    answer: 1
  },
  {
    question: 'What is the name of the galaxy that contains our solar system?',
    options: ['Andromeda', 'Milky Way', 'Triangulum', 'Whirlpool'],
    answer: 1
  },
  {
    question: 'Which element is used to create a green color in fireworks?',
    options: ['Sodium', 'Strontium', 'Copper', 'Barium'],
    answer: 3
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
  
