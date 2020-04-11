<template>
  <div>
    <div class="row">
      <div class="col-xs-12">
        <h1 class="text-left">{{selectedSong.artist}} - {{selectedSong.name}}</h1>
      </div>
    </div>
    <iframe :src="'https://www.youtube.com/embed/' + selectedSong.youtubeIdent" frameborder="0" 
        allow="accelerometer; autoplay; encrypted-media; gyroscope" allowfullscreen>
        </iframe>
      <app-selected-playlist v-if="selectedPlaylist"
        :selectedPlaylist="selectedPlaylist" :selectedSong="selectedSong"></app-selected-playlist>
  </div>
</template>

<script>
import AppSelectedPlaylist from "./Selected-playlist";

export default {
    components: {
         AppSelectedPlaylist
    },
    props: {
        selectedPlaylist: {
            required: true
        },
        selectedSong: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>
iframe {
    width: 98%;
    height: 55vh;
}
</style>