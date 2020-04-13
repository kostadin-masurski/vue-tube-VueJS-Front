<template>
        <div>
        <app-selected-playlist v-if="selectedPlaylist"
        :selectedPlaylist="selectedPlaylist" :selectedSong="selectedSong"></app-selected-playlist>
        <app-banner v-else></app-banner>
        </div>
</template>

<script>
import globalStore from '../store/global';
import AppSelectedPlaylist from "./items/Selected-playlist.vue";
import AppBanner from "./items/Banner.vue";

export default {
  name: "Home",
  components: {
    AppSelectedPlaylist,
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
      if(this.$route.query.playlist !== 'all') {
        this.selectedPlaylist = globalStore.playlists[this.$route.query.playlist];
      }
      if(this.$route.query.song === 'no change') { return; }
      if(this.selectedPlaylist && this.$route.query.playlist !== 'all') {
        this.selectedSong = this.selectedPlaylist.songs[this.$route.query.song];
        return;
      }
      this.selectedSong = globalStore.allSongs[this.$route.query.song];
    }
  }
};
</script>