import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import router from './router'
import axios from 'axios';
import { PlaylistService } from './services/PlaylistService';
import { SongService } from './services/SongService';
import globalStore from './store/global';

const baseURL = 'http://localhost:8080/api';

Vue.use(VueRouter);

Vue.config.productionTip = false;

axios.interceptors.request.use(function (config) {
  if (!config.url.includes('http://')) {
    config.url = `${baseURL}/${config.url}`;
  }
  // if(config.url.includes(baseURL)){
  //   config.withCredentials = true;
  // }  
  return config;
}, function (err) {
  console.error();
  return Promise.reject(err);
});

PlaylistService.loadAll().then((response) => {
  globalStore.setPlaylists(response.data);
  SongService.loadAll().then((response) => {
    globalStore.setAllSongs(response.data);
    new Vue({
      render: h => h(App),
      router
    }).$mount('#app');
  })
})
