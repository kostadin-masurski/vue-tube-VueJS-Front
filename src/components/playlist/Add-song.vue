<template>
  <div>
    <h1 class="text-italic">Add song</h1>
    <form @submit.prevent="addSongHandler">
      <div class="form-group">
        <label for="song">Song</label>
        <input
          v-model="name"
          type="text"
          id="song"
          class="form-control"
          placeholder="Song name ..."
          maxlength="51"
        />
        <template v-if="$v.name.$error">
          <div v-if="!$v.name.required" class="text-danger">Name is required!</div>
          <div v-if="!$v.name.minLength" class="text-danger">Name should be more than 3 symbols!</div>
          <div v-if="!$v.name.maxLength" class="text-danger">Name should not be more than 50 symbols!</div>
        </template>
      </div>
      <div class="form-group">
        <label for="artist">Artist</label>
        <input
          v-model="artist"
          type="text"
          id="artist"
          class="form-control"
          placeholder="Artist name ..."
          maxlength="51"
        />
        <template v-if="$v.artist.$error">
          <div v-if="!$v.artist.required" class="text-danger">Artist is required!</div>
          <div v-if="!$v.artist.minLength" class="text-danger">Artist should be more than 1 symbols!</div>
          <div v-if="!$v.artist.maxLength" class="text-danger">Artist should not be more than 50 symbols!</div>
        </template>
      </div>
      <div class="form-group">
        <label for="youtubeIdent">Youtube ID or URL</label>
        <input
          v-model="youtubeIdent"
          type="text"
          id="youtubeIdent"
          class="form-control"
          placeholder="Youtube ID or URL..."
        />
        <template v-if="$v.youtubeIdent.$error">
          <div v-if="!$v.youtubeIdent.required" class="text-danger">Youtube ID is required!</div>
          <div v-if="!$v.youtubeIdent.minLength" class="text-danger">Youtube ID should be more than 11 symbols!</div>
        </template>
      </div>
      <div class="form-group">
        <label for="songImageUrl">Pictute URL</label>
        <input
          v-model="imgUrl"
          type="text"
          id="songImageUrl"
          class="form-control"
          placeholder="https://..."
        />
        <template v-if="$v.imgUrl.$error">
          <div v-if="!$v.imgUrl.url" class="text-danger">Enter valid URL</div>
        </template>
      </div>
      <button class="btn btn-primary">Add</button>
    </form>
  </div>
</template>

<script>
import Vue from "vue";
import Vuelidate from "vuelidate";
import { required, minLength, maxLength, url } from "vuelidate/lib/validators";
import { SongService } from "../../services/SongService";
import globalStore from "../../store/global";

Vue.use(Vuelidate);

export default {
  name: "Add-song",
  data() {
    return {
      selectedPlaylist: globalStore.selectedPlaylist,
      selectedSong: globalStore.selectedSong,
      name: globalStore.selectedSong.name,
      artist: globalStore.selectedSong.artist,
      imgUrl: globalStore.selectedSong.imgUrl,
      youtubeIdent: globalStore.selectedSong.youtubeIdent,
    };
  },
  watch: {
    $route() {
      if(this.$route.query.playlist !== 'all') {
        this.selectedPlaylist = globalStore.playlists[this.$route.query.playlist];
      }
      if(this.$route.query.song === 'no change') { return; }
      if(this.selectedPlaylist && this.$route.query.playlist !== 'all') {
        this.selectedSong = this.selectedPlaylist.songs[this.$route.query.song];
      }else {
        this.selectedSong = globalStore.allSongs[this.$route.query.song];
      }
      this.name = this.selectedSong.name;
      this.artist = this.selectedSong.artist;
      this.imgUrl = this.selectedSong.imgUrl;
      this.youtubeIdent = this.selectedSong.youtubeIdent;
    }
  },
  validations: {
    name: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(50)
    },
    artist: {
      required,
      minLength: minLength(1),
      maxLength: maxLength(50)
    },
    youtubeIdent: {
      required,
      minLength: minLength(11)
    },
    imgUrl: {
      url
    }
  },
  methods: {
    addSongHandler(){
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      if(!this.selectedSong.name){
        this.selectedSong = {
          name: this.name,
          artist: this.artist,
          youtubeIdent: this.youtubeIdent.substr(this.youtubeIdent.length - 11),
          imgUrl: this.imgUrl
        }
      }
      if(!this.selectedSong.imgUrl) {
        this.selectedSong.imgUrl = 'https://ae01.alicdn.com/kf/HTB1WQdVSXXXXXbJXFXXq6xXFXXXS/3d-DJ.jpg_960x960.jpg';
      }
      SongService.add(this.selectedSong).then(() => {
          SongService.getSong(this.selectedSong.youtubeIdent).then(response => {
            console.log(response.data)
            this.selectedSong = response.data;
            globalStore.setSelectedSong(this.selectedSong);
          })
        },
        err => console.log(err)
      );
      console.log('in addSong ' + this.selectedSong)
      this.$emit('addSong', this.selectedSong);
    }
  }
};
</script>

<style scoped>
.home-div {
  background-image: url(../../assets/151642953.jpg);
  background-size: cover;
  height: 90vh;
}
.home-h1 {
  color: crimson;
}
.link {
  color:darkred;
}
</style>