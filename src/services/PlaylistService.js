import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

export const PlaylistService = {
    playlists: [],
    selectedPlaylist: {},
  
    loadAll() {
        Vue.axios.get('http://localhost:8080/api/playlists').then((response) => {
            this.playlists = response.data;
        })
    }
}