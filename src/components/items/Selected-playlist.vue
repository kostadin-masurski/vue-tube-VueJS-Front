<template>
  <div>
    <div class="row">
      <div class="col-xs-12">
        <h1 class="text-center">{{selectedPlaylist.name}}</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 small-plalist-div">
        <img
          :src="selectedPlaylist.imgUrl"
          alt="Playlist Image"
          class="img-responsive img-details small-paylist"
        />
        <h2 class="text-bold amount">
          <span :style="{color: color}">{{selectedPlaylist.rate}}</span>/10
        </h2>
        <form class="form-inline">
          <div class="form-group">
            <label class="sr-only" for="rating"></label>
            <div class="input-group">
              <input
                type="number"
                min="0"
                max="10"
                step="0.1"
                class="form-control"
                id="rating"
                placeholder="Rate"
              />
            </div>
          </div>
          <button type="button" class="btn btn-success">
            Rate Playlist
          </button>
          <a href="/edit" class="btn btn-primary">Edit Playlist</a>
        </form>
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
        }
    },
    data() {
        return {
            color: 'green'
        }
    }
}
</script>