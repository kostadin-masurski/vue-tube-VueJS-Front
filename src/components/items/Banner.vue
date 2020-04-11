<template>
  <div class="home-div">
    <h1 v-if="isLogged" class="text-center home-h1">
      U Tuba - <router-link to="/playlist/create" class="link">Create</router-link> your own YouTube playlists!
      <br />No advertising! Enjoy!
    </h1>
    <h1 v-else class="text-center home-h1">
      U Tuba - <router-link to="/register" class="link">Register</router-link> to create your own YouTube playlists!
      <br />No advertising! Enjoy!
    </h1>
  </div>
</template>

<script>
//import globalstore from "../../store/global";

export default {
  data() {
    return {
      isLogged: true
    }
  }
}
</script>

<style scoped>
.home-div {
  background-image: url(../../assets/151642953.jpg);
  background-size: cover;
  height: 90vh;
}
.home-h1 {
  color: crimson;
}
.link {
  color:darkred;
}
</style>