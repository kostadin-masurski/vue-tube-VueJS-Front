<template>
  <div id="app">
    <app-navigation></app-navigation>
    <div class="w-100">
      <div class="row">
        <div class="col-sm-6 col-md-2">
          <app-playlists :playlists="playlists" 
          @selectPlaylist="selectPlaylistHandler($event)"></app-playlists>
        </div>
        <div class="col-sm-6 col-md-2">
          <app-songs :songs="songs" 
          @selectSong="selectSongHandler($event)" @listAllSongs="listAllSongsHandler($event)"></app-songs>
        </div>
        <div class="col-sm-12 col-md-8">
        <iframe v-if="selectedSong && this.$route.path !=='/home'" 
        :src="'https://www.youtube.com/embed/' + selectedSong.youtubeIdent + '?autoplay=1'" 
        frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope" allowfullscreen>
        </iframe>
        <router-view></router-view>
        <hr />
        </div>
      </div>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppNavigation from "./components/core/Navigation.vue";
import { PlaylistService } from "./services/PlaylistService";
import globalStore from './store/global';
import AppPlaylists from "./components/items/Playlists.vue";
import AppSongs from "./components/items/Songs.vue";
import AppFooter from "./components/core/Footer.vue";

export default {
  name: "App",
  created: PlaylistService.loadAll,
  components: {
    AppNavigation,
    AppPlaylists,
    AppSongs,
    AppFooter
  },
  data() {
    return {
      playlists: globalStore.playlists,
      songs: globalStore.selectedPlaylistSongs,
      selectedPlaylistIndex: false,
      selectedSong: false
    }
  },
  methods: {
    selectPlaylistHandler(idx) {
      globalStore.setSelectedPlaylist(globalStore.playlists[idx]);
      this.songs = globalStore.selectedPlaylistSongs;
      this.selectedPlaylistIndex = idx;
      if(this.$route.query.playlist === idx) { return; }
      this.$router.push({query: {playlist: idx, song: 'no change'}})
    },
    selectSongHandler(idx) {
      globalStore.setSelectedSong(globalStore.selectedPlaylistSongs[idx]);
      this.selectedSong = globalStore.selectedPlaylistSongs[idx];
      if(this.$route.query.song === idx) { return; }
      if(this.$route.query.playlist === 'all') {
        this.$router.push({query: {playlist: 'all', song: idx}});
        return;
      }
      this.$router.push({query: {playlist: this.selectedPlaylistIndex, song: idx}})
    },
    listAllSongsHandler() {
      globalStore.setSelectedPlaylist();
      this.songs = globalStore.selectedPlaylistSongs;
      if(this.$route.query.playlist === 'all') { return; }
      this.$router.push({path: 'home', query: {playlist: 'all', song: 'no change'}})
    }
  }
};
</script>

<style>
html {
  margin: 0px;
  height: 100%;
  width: 100%;
  scroll-behavior: smooth;
}

body {
  /* padding: 0.5%; */
  min-height: 100%;
  /* font-family: inherit; */
  scroll-behavior: smooth;
  overflow-x: hidden;
}

nav {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
}

iframe {
  width: 50%;
  height: 30%;
  padding: 0.4%;
}

.scroll {
  height: 79vh;
  width: 15vw;
  overflow: hidden;
  overflow-y: scroll;
}

.img-details {
  display: block;
  margin: 0 auto;
  border-radius: 6px;
  box-shadow: 3px 3px gray;
  height: 500px;
}

.img-details:hover {
  box-shadow: 5px 5px gray;
}

.pull-right img {
  max-height: 100;
  display: block;
  border-radius: 6px;
}

.list-group-item:hover {
  transform: scale(1.2);
  cursor: pointer;
  background-color: lightgrey;
}

.selected {
  background-color: lightgrey;
}
</style>
