<template>
  <!-- <div class="w-100">
    <div class="row">
      <div class="col-sm-12 col-md-2">
        <app-playlists :playlists="playlists" 
        @selectPlaylist="selectPlaylistHandler($event)"></app-playlists>
      </div>
      <div class="col-sm-12 col-md-2">
        <app-songs :songs="songs" 
        @selectSong="selectSongHandler($event)" @listAllSongs="listAllSongsHandler($event)"></app-songs>
      </div>
      <div class="col-sm-12 col-md-8"> -->
        <div>
        <app-player v-if="selectedSong"
        :selectedSong="selectedSong" :selectedPlaylist="selectedPlaylist"></app-player>
        <app-selected-playlist v-if="selectedPlaylist && !selectedSong"
        :selectedPlaylist="selectedPlaylist"></app-selected-playlist>
        <app-banner v-if="!selectedPlaylist && !selectedSong"></app-banner>
        <hr />
        </div>
      <!-- </div>
    </div>
  </div> -->
</template>

<script>
import globalStore from '../store/global';
// import AppPlaylists from "./items/Playlists.vue";
// import AppSongs from "./items/Songs.vue";
import AppSelectedPlaylist from "./items/Selected-playlist.vue";
import AppPlayer from "./items/Player.vue";
import AppBanner from "./items/Banner.vue";

export default {
  name: "Home",
  components: {
    // AppPlaylists,
    // AppSongs,
    AppSelectedPlaylist,
    AppPlayer,
    AppBanner
  },
  data() {
    return {
      playlists: globalStore.playlists,
      songs: globalStore.selectedPlaylistSongs,
      selectedPlaylist: false,
      selectedSong: false
    }
  },
  watch: {
    $route() {
      this.selectedPlaylist = globalStore.playlists[this.$route.query.playlist];
      if(this.$route.query.song === 'no change') { return; }
      if(this.selectedPlaylist) {
        this.selectedSong = this.selectedPlaylist.songs[this.$route.query.song];
        return;
      }
      this.selectedSong = globalStore.allSongs[this.$route.query.song];
    }
  }
  // methods: {
  //   selectPlaylistHandler(idx) {
  //     globalStore.setSelectedPlaylist(globalStore.playlists[idx]);
  //     this.songs = globalStore.selectedPlaylistSongs;
  //     this.selectedPlaylist = globalStore.selectedPlaylist;
  //   },
  //   selectSongHandler(idx) {
  //     globalStore.setSelectedSong(globalStore.selectedPlaylistSongs[idx]);
  //     this.selectedSong = globalStore.selectedSong;
  //   },
  //   listAllSongsHandler() {
  //     globalStore.setSelectedPlaylist();
  //     this.songs = globalStore.selectedPlaylistSongs;
  //     this.selectedPlaylist = false;
  //   }
  // }
};
</script>