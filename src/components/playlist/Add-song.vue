<template>
  <div>
    <button @click="toggleForm" v-text="addForm" type="button" class="btn btn-success"></button>
    <button v-show="selectedSong.name && addSelected" @click="addSelectedSong" 
    type="button" class="btn btn-success">Add: {{selectedSong.artist}} - {{selectedSong.name}}</button>
    <button v-show="selectedSong.name && !addSelected" @click="addSelectedSong" 
    type="button" class="btn btn-danger">Remove: {{selectedSong.artist}} - {{selectedSong.name}}</button>
    <div v-show="addForm === 'Hide Add Form'">
    <h1 class="text-italic">Add new song</h1>
    <form @submit.prevent="addSongHandler">
      <div class="form-group">
        <label for="song">Song</label>
        <input
          v-model="name"
          @blur="$v.name.$touch"
          type="text"
          id="song"
          class="form-control"
          placeholder="Song name ..."
          maxlength="51"
        />
        <template v-if="$v.name.$error">
          <div v-if="!$v.name.required" class="text-danger">Name is required!</div>
          <div v-if="!$v.name.minLength" class="text-danger">Name should be more than 2 symbols!</div>
          <div v-if="!$v.name.maxLength" class="text-danger">Name should not be more than 50 symbols!</div>
        </template>
      </div>
      <div class="form-group">
        <label for="artist">Artist</label>
        <input
          v-model="artist"
          @blur="$v.artist.$touch"
          type="text"
          id="artist"
          class="form-control"
          placeholder="Artist name ..."
          maxlength="51"
        />
        <template v-if="$v.artist.$error">
          <div v-if="!$v.artist.required" class="text-danger">Artist is required!</div>
          <div v-if="!$v.artist.minLength" class="text-danger">Artist should be more than 1 symbol!</div>
          <div v-if="!$v.artist.maxLength" class="text-danger">Artist should not be more than 50 symbols!</div>
        </template>
      </div>
      <div class="form-group">
        <label for="youtubeIdent">Youtube ID or URL</label>
        <input
          v-model="youtubeIdent"
          @blur="$v.youtubeIdent.$touch"
          type="text"
          id="youtubeIdent"
          class="form-control"
          placeholder="Youtube ID or URL..."
        />
        <template v-if="$v.youtubeIdent.$error">
          <div v-if="!$v.youtubeIdent.required" class="text-danger">Youtube ID is required!</div>
          <div v-if="!$v.youtubeIdent.minLength" class="text-danger">Youtube ID should be more than 10 symbols!</div>
        </template>
      </div>
      <div class="form-group">
        <label for="imgUrl">Pictute URL</label>
        <input
          v-model="imgUrl"
          @blur="$v.imgUrl.$touch"
          type="text"
          id="imgUrl"
          class="form-control"
          placeholder="https://..."
        />
        <template v-if="$v.imgUrl.$error">
          <div v-if="!$v.imgUrl.url" class="text-danger">Enter valid URL</div>
        </template>
      </div>
      <button :disabled="$v.$invalid" class="btn btn-success">Add</button>
    </form>
  </div>
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
      addForm: 'Add new song',
      addSelected: globalStore.selectedPlaylist.songs.filter(song => song.youtubeIdent === globalStore.selectedSong.youtubeIdent).length === 0,
      editPlaylist: globalStore.selectedPlaylist,
      selectedPlaylist: globalStore.selectedPlaylist,
      selectedSong: globalStore.selectedSong,
      name: '',
      artist: '',
      imgUrl: '',
      youtubeIdent: ''
    };
  },
  validations: {
    name: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(50)
    },
    artist: {
      required,
      minLength: minLength(2),
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
  watch: {
    $route() {
      if (this.$route.query.playlist !== "all") {
        this.selectedPlaylist =
          globalStore.playlists[this.$route.query.playlist];
      }
      if (this.$route.query.song === "no change") {
        return;
      }
      if (this.selectedPlaylist && this.$route.query.playlist !== "all") {
        this.selectedSong = this.selectedPlaylist.songs[this.$route.query.song];
      } else {
        this.selectedSong = globalStore.allSongs[this.$route.query.song];
      }
      this.addSelected = this.editPlaylist.songs.filter(song => 
      song.youtubeIdent === globalStore.selectedSong.youtubeIdent).length === 0;
    }
  },
  methods: {
    toggleForm() {
      if(this.addForm === 'Add new song') {
        this.addForm = 'Hide Add Form';
      }else {
        this.addForm = 'Add new song';
      }
    },
    addSelectedSong(){
      this.$emit("addSong", this.selectedSong);
      this.addSelected = globalStore.selectedPlaylist.songs.filter(song => song.youtubeIdent === globalStore.selectedSong.youtubeIdent).length === 0;
    },
    addSongHandler() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.youtubeIdent = this.youtubeIdent.substr(this.youtubeIdent.length - 11);
      let newSong = {
       name: this.name,
       artist: this.artist,
       youtubeIdent: this.youtubeIdent,
       imgUrl: this.imgUrl
      };
      if (newSong.imgUrl) {
        newSong.imgUrl =
          "https://ae01.alicdn.com/kf/HTB1WQdVSXXXXXbJXFXXq6xXFXXXS/3d-DJ.jpg_960x960.jpg";
      }
      SongService.add(newSong).then(
        () => {
          SongService.getSong(newSong.youtubeIdent).then(
            response => {
              newSong = response.data;
              globalStore.setSelectedSong(newSong);
              this.$emit("addSong", newSong);
            },
            err => console.log(err)
          );
        },
        err => console.log(err)
      );
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
  color: darkred;
}

.btn {
  margin-right: 2%;
}
</style>