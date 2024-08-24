<template>
  <v-app>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),

  
}


</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Turret+Road:wght@200;300;400;500;700;800&display=swap');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Turret Road", sans-serif;
  font-weight: 400;
  font-style: normal;
  
}


</style>

<style>

html {
  background: rgb(242,205,50);
  background: linear-gradient(257deg, rgba(242,205,50,1) 0%, rgba(206,221,77,1) 100%);
}

body {
  display: flex;
  justify-content: center;
}

main {
  background-color: transparent;
}
.v-application {
  background-color: transparent;
}


</style>
