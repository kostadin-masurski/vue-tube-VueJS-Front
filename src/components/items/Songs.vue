<template>
 <div class="col-3">
    <h1>Songs</h1>
    <input @click="listAllSongs" type="form-control" class="btn btn-dark" placeholder="All songs"/>
    <div class="row scroll">
      <div v-if="songs" class="col-xs-12">
        <a v-for="song in songs" :key="song.id" @click="selectSong(song)" class="list-group-item clearfix">
          <div class="pull-left">
          <h6 class="list-group-item-heading">{{song.artist}} - {{song.name}}</h6>
          </div>
          <div class="pull-right">
            <img :src="song.imgUrl" alt="song image" class="img-responsive">
          </div>
        </a>
      </div>
    </div>
</div>
</template>

<script>
import {SongService} from "../../services/SongService";

export default {
  name: "Songs",
  created: SongService.loadAll,
    data() {
        return {
            songs: SongService.songs
        };
    },
    methods: {
      selectSong(song) {
        SongService.selectedSong = song;
      },
      listAllSongs() {
        SongService.loadAll;
      }
    }
};
</script>

<style scoped>
.pull-right img {
  max-height: 10vh;
  max-width: 25vw;
  display: block;
  border-radius: 6px;
}
</style>