<template>
  <div class="w-100">
    <div class="row">
      <div class="col-sm-12 col-md-2">
        <app-playlists></app-playlists>
      </div>
      <div class="col-sm-12 col-md-2">
        <app-songs></app-songs>
      </div>
      <div class="col-sm-12 col-md-8">
        <!-- <div v-if="!slectedSong && !selectedPlaylist" class="row home-div"> -->
        <div v-if="true" class="home-div">
          <h1 class="text-center home-h1">
            U Tuba - Your own YouTube playlists!
            <br />No advertising, No registration! Enjoy!
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppPlaylists from "./items/Playlists.vue";
import AppSongs from "./items/Songs.vue";

export default {
  name: "Home",
  components: {
    AppPlaylists,
    AppSongs
  },
  methods: {}
};
</script>

<style scoped>
.home-div {
  background-image: url(../assets/151642953.jpg);
  background-size: cover;
  height: 100vh;
}

.home-h1 {
  color: crimson;
}

.small-playlist {
  height: 10vh;
  margin: 1vw;
}

.small-playlist-div {
  display: inline-flex;
}
</style>