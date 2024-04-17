<template>
    <SimonGame />
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  
  // Components
  import SimonGame from '../components/SimonGame.vue';
  
  export default defineComponent({
    name: 'SimonView',
  
    components: {
      SimonGame,
    },
  });
  </script>
  