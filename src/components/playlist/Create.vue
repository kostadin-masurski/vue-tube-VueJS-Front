<template>
  <div class="create-div">
    <h1 class="text-italic">Create your playlist</h1>
    <form @submit.prevent="submitHandler">
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
      <button :disabled="$v.$invalid" class="btn btn-success">Create</button>
    </form>
  </div>
</template>

<script>
import Vue from "vue";
import Vuelidate from "vuelidate";
import { required, minLength, maxLength, url } from "vuelidate/lib/validators";
import { PlaylistService } from "../../services/PlaylistService";
import globalStore from "../../store/global";
import router from "../../router"

Vue.use(Vuelidate);

export default {
  name: "Playlist-create",
  data() {
    return {
      name: null,
      imgUrl: null
    };
  },
  validations: {
    name: {
      required,
      minLength: minLength(2),
      maxLength: maxLength(50)
    },
    imgUrl: {
      url
    }
  },
  methods: {
    submitHandler() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      let { name, imgUrl } = this;
      PlaylistService.create({ name, imgUrl }).then(
        response => {
          response.data.songs = [];
          globalStore.playlists.push(response.data);
          globalStore.setSelectedPlaylist(response.data);
          router.push("edit");
        },
        err => console.log(err)
      );
    }
  }
};
</script>

<style scoped>
.create-div {
  margin: 2vw;
  padding: 5vw;
  padding-right: 20vw;
  background-image: url(../../assets/Vue-tube-logo-big.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: right;
}
</style>