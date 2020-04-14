<template>
  <div>
    <div class="row">
      <div class="col-xs-12">
        <h1 class="text-center">{{selectedPlaylist.name}}</h1>
      </div>
    </div>
    <div class="row">
      <div :class="{'small-playlist-div': selectedSong, 'col-xs-12': true}">
        <img
          :src="selectedPlaylist.imgUrl"
          alt="Playlist Image"
          :class="{'small-playlist': selectedSong, 'img-responsive img-details': true}"
        />
        <h2 class="text-bold amount">
          <span :style="{color: color}">{{selectedPlaylist.rate}}</span>/10
        </h2>
        <div v-if="user">
          <form class="form-inline">
            <div class="form-group">
              <label class="sr-only" for="rating"></label>
              <div class="input-group">
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  class="form-control"
                  id="rating"
                  placeholder="Rate"
                />
              </div>
            </div>
            <button type="button" class="btn btn-success">Rate Playlist</button>
            <router-link to="/playlist/edit" class="btn btn-primary">Edit Playlist</router-link>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectedPlaylist: {
      type: Object,
      required: true
    },
    selectedSong: {
      type: [Object, Boolean]
    }
  },
  data() {
    return {
      user: sessionStorage.username,
      color: "green"
    };
  }
};
</script>

<style scoped>
.small-playlist {
  height: 10vh;
  margin: 1vw;
}

.small-playlist-div {
  display: inline-flex;
}
</style>