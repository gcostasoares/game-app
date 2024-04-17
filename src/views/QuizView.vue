<template>
    <QuizGame />
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  
  // Components
  import QuizGame from '../components/QuizGame.vue';
  
  export default defineComponent({
    name: 'QuizView',
  
    components: {
      QuizGame,
    },
  });
  </script>
  