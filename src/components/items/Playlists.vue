<template>
  <div class="col-3">
    <h1>Playlists</h1>
    <div class="row scroll">
      <div v-if="playlists" class="col-xs-12">
        <a
          v-for="(playlist, index) in playlists"
          :key="playlist.id"
          @click="selectPlaylist(index)"
          :class="{selected: index === selectedPlaylistIndex, 'list-group-item clearfix': true}"
        >
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

export default {
  name: "Playlists",
  props: {
    playlists: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectedPlaylistIndex: -1
    };
  },
  methods: {
    selectPlaylist(idx) {
      this.selectedPlaylistIndex = idx;
      this.$emit('selectPlaylist', idx);
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