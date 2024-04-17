<template>
    <MemoryGame />
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  
  // Components
  import MemoryGame from '../components/MemoryGame.vue';
  
  export default defineComponent({
    name: 'MemoryView',
  
    components: {
      MemoryGame,
    },
  });
  </script>
  