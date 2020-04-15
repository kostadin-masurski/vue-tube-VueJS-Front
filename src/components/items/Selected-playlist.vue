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
        <div v-if="user">          
          <router-link to="/playlist/edit" class="btn btn-primary">Edit Playlist</router-link>
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
      user: sessionStorage.username
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

.btn {
  margin: 10px;
}
</style>