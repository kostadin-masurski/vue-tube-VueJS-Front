<template>
  <div class="col-3">
    <h1>Songs</h1>
    <div @click="listAllSongs">
    <input type="form-control" disabled class="btn btn-dark" placeholder="All songs" />
    </div>
    <div class="row scroll">
      <div v-if="songs" class="col-xs-12">
        <a
          v-for="(song, index) in songs"
          :key="song.id"
          @click="selectSong(index)"
          class="list-group-item clearfix"
        >
          <div class="pull-left">
            <h6 class="list-group-item-heading">{{song.artist}} - {{song.name}}</h6>
          </div>
          <div class="pull-right">
            <img :src="song.imgUrl" alt="song image" class="img-responsive" />
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Songs",
  props: {
    songs: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectedSongIndex: -1
    };
  },
  methods: {
    selectSong(idx) {
      this.selectedSongIndex = idx;
      this.$emit('selectSong', idx);
    },
    listAllSongs() {
      this.$emit('listAllSongs');
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