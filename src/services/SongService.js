import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios)

export const SongService = {
    loadAll() {
        return Vue.axios.get('http://localhost:8080/api/songs');
    },

    add(song) {
        return Vue.axios.post('http://localhost:8080/api/songs/add', song);
    },
    
    getSong(youtubeIdent) {
        console.log('in get song ' + youtubeIdent);
        return Vue.axios.get('http://localhost:8080/api/songs/' + youtubeIdent);
    }
}