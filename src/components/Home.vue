<template>
  <div class="w-100">
    <div class="row">
      <div class="col-sm-12 col-md-2">
        <app-playlists :playlists="playlists" @selectPlaylist="selectPlaylistHandler($event)"></app-playlists>
      </div>
      <div class="col-sm-12 col-md-2">
        <app-songs :songs="songs" @selectSong="selectSongHandler($event)"></app-songs>
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
import globalStore from '../store/global';

export default {
  name: "Home",
  components: {
    AppPlaylists,
    AppSongs
  },
  data() {
    return {
      playlists: globalStore.playlists,
      songs: globalStore.selectedPlayistSongs
    }
  },
  methods: {
    selectPlaylistHandler(idx) {
      globalStore.setSelectedPlaylist(globalStore.playlists[idx]);
      this.songs = globalStore.selectedPlayistSongs;
    },
    selectSongHandler(idx) {
      globalStore.setSelectedSong(globalStore.selectedPlayistSongs[idx]);
      console.log(globalStore.selectedSong.name)
    }
  }
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