<template>

    <div class="container d-flex flex-column justify-center align-center">
      <v-row justify="center" class="my-10">
      <h1>Welcome to the Game App</h1>
     </v-row>
      <v-row>
        <div class="d-flex flex-column justify-center align-center">
   
        <RouterLink to="/memory"><v-btn>Memory</v-btn></RouterLink>
        <RouterLink to="/quiz"><v-btn>Quiz</v-btn></RouterLink>
        <RouterLink to="/simon"><v-btn>Simon</v-btn></RouterLink>
        </div>
      </v-row>
    </div>

</template>

<style scoped>
.v-btn {
  width: 300px;
  margin-bottom: 30px;
  background-color: white;
  border: 3px solid black;
  text-decoration: none;
  color: black;
}

.container {
  height: 30vw;
  width: auto;
}
</style>
