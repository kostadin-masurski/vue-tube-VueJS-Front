<template>
  <div>
    <h1 class="text-italic">Edit your playlist</h1>
    <form @submit.prevent="editHandler">
      <div class="form-group">
        <label for="playlist">Playlist</label>
        <input
          v-model="name"
          @blur="$v.name.$touch"
          type="text"
          id="playlist"
          class="form-control"
          placeholder="My playlist is ..."
          maxlength="51"
        />
        <template v-if="$v.name.$error">
          <div v-if="!$v.name.required" class="text-danger">Name is required!</div>
          <div v-if="!$v.name.minLength" class="text-danger">Name should be more than 2 symbols!</div>
          <div v-if="!$v.name.maxLength" class="text-danger">Name should not be more than 50 symbols!</div>
        </template>
      </div>
      <div class="form-group">
        <label for="imageUrl">Image URL</label>
        <input
          v-model="imgUrl"
          @blur="$v.imgUrl.$touch"
          type="text"
          id="imageUrl"
          class="form-control"
          placeholder="https://..."
        />
        <template v-if="$v.imgUrl.$error">
          <div v-if="!$v.imgUrl.url" class="text-danger">Enter valid URL</div>
        </template>
      </div>
      <button :disabled="$v.$invalid" class="btn btn-success">Edit</button>
    </form>
    <hr />
    <add-song @addSong="editHandler($event)"></add-song>
  </div>
</template>

<script>
import Vue from "vue";
import Vuelidate from "vuelidate";
import { required, minLength, maxLength, url } from "vuelidate/lib/validators";
import { PlaylistService } from "../../services/PlaylistService";
import globalStore from "../../store/global";
import AddSong from "./Add-song";

Vue.use(Vuelidate);

export default {
  name: "Playlist-create",
  components: {
    AddSong
  },
  data() {
    return {
      selectedPlaylist: globalStore.selectedPlaylist,
      name: globalStore.selectedPlaylist.name,
      imgUrl: globalStore.selectedPlaylist.imgUrl
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
    }
  },
  methods: {
    editHandler(song) {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.selectedPlaylist.name = this.name;
      this.selectedPlaylist.imgUrl = this.imgUrl;
      // if(song) {
      //   this.selectedPlaylist.songs.push(song);
      // }
      if(this.selectedPlaylist.songs.filter(s => s.youtubeIdent === song.youtubeIdent).length === 0) {
        this.selectedPlaylist.songs.push(song);
      } else {
        //this.selectedPlaylist.songs.pop(song);
        this.selectedPlaylist.songs = this.selectedPlaylist.songs.filter(s => s.youtubeIdent !== song.youtubeIdent);
      }
      PlaylistService.edit(this.selectedPlaylist).then(() => {
          PlaylistService.loadAll().then(response => {
            globalStore.setPlaylists(response.data);
            globalStore.setSelectedPlaylist(this.selectedPlaylist);
          });
        },
        err => console.log(err)
      );
    }
  }
};
</script>