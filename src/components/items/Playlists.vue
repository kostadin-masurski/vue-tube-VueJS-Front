<template>
  <div class="col-3">
    <h1>Playlists</h1>
    <div class="row scroll">
      <div v-if="playlists" class="col-xs-12">
        <a v-for="playlist in playlists" :key="playlist.id" @click="selectPlaylist(playlist)" class="list-group-item clearfix">
          <div class="pull-left">
            <h4 class="list-group-item-heading">{{playlist.name}}</h4>
          </div>
          <div class="pull-right">
            <img :src="playlist.imgUrl" alt class="img-responsive" />
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import {PlaylistService} from "../../services/PlaylistService";

export default {
  name: "Playlists",
  created: PlaylistService.loadAll,
    data() {
        return {
            playlists: PlaylistService.playlists
        };
    },
    methods: {
      selectPlaylist(playlist) {
        PlaylistService.selectedPlaylist = playlist;
      }
    }
};
</script>

<style scoped>
.pull-right img {
  max-height: 10vh;
  max-width: 100vw;
  display: block;
  border-radius: 6px;
}
</style>