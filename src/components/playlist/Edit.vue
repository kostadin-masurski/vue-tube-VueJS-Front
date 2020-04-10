<template>
  <div>
    <h1 class="text-italic">Edit your playlist</h1>
    <form @submit.prevent="editHandler">
      <div class="form-group">
        <label for="playlist">Playlist</label>
        <input
          v-model="name"
          type="text"
          id="playlist"
          class="form-control"
          placeholder="My playlist is ..."
          maxlength="51"
          :value="selectedPlaylist.name"
        />
        <template v-if="$v.name.$error">
          <div v-if="!$v.name.required" class="text-danger">Name is required!</div>
          <div v-if="!$v.name.minLength" class="text-danger">Name should be more than 3 symbols!</div>
          <div v-if="!$v.name.maxLength" class="text-danger">Name should not be more than 50 symbols!</div>
        </template>
      </div>
      <div class="form-group">
        <label for="imageUrl">Image URL</label>
        <input
          v-model="inmUrl"
          type="text"
          id="imageUrl"
          class="form-control"
          placeholder="https://..."
          :value="selectedPlaylist.imgUrl"
        />
        <template v-if="$v.imgUrl.$error">
          <div v-if="!$v.imgUrl.url" class="text-danger">Enter valid URL</div>
        </template>
      </div>
      <button class="btn btn-primary">Save</button>
    </form>
    <hr />
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
          :value="selectedSong.name"
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
          :value="selectedSong.artist"
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
          :value="selectedSong.youtubeIdent"
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
          :value="selectedSong.imgUrl"
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
//port { PlaylistService } from "../../services/PlaylistService";
import globalStore from "../../store/global";
//import router from "../../router";

Vue.use(Vuelidate);

export default {
  name: "Playlist-create",
  data() {
    return {
      name: null,
      imgUrl: null,
      selectedPlaylist: globalStore.selectedPlaylist,
      selectedSong: globalStore.selectedSong
    };
  },
  validations: {
    name: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(50)
    },
    imgUrl: {
      url
    },
    artist: {
      required,
      minLength: minLength(1),
      maxLength: maxLength(50)
    },
    youtubeIdent: {
      required,
      minLength: minLength(11)
    }
  },
  methods: {
    editHandler() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.selectedPlaylist.name = this.name;
      this.selectedPlaylist.imgUrl = this.imgUrl;
    console.log(this.selectedPlaylist.name + ' - ' + this.selectedPlaylist.imgUrl);
    //   PlaylistService.edit(this.selectedPlaylist).then(
    //     response => {
    //       console.log(response);
    //       PlaylistService.loadAll().then(response => {
    //         globalStore.setPlaylists(response.data);
    //         router.push("/home");
    //       });
    //     },
    //     err => console.log(err)
    //   );
    },
    addSongHandler(){
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      //let { name, imgUrl } = this;
    //   PlaylistService.edit({ name, imgUrl }).then(
    //     response => {
    //       console.log(response);
    //       PlaylistService.loadAll().then(response => {
    //         globalStore.setPlaylists(response.data);
    //         router.push("/home");
    //       });
    //     },
    //     err => console.log(err)
    //   );
    }
  }
};
</script>