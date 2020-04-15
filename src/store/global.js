import Vue from 'vue';
export const NOT_SET = Symbol('NOT_SET');

const global = new Vue({
    data: {
        playlists: [],
        selectedPlaylist: {},
        allSongs: [],
        selectedPlaylistSongs: [],
        selectedSong: {},
        user: sessionStorage.username
    },
    methods: {
        setPlaylists(playlists) {
            this.playlists = playlists;
        },
        setSelectedPlaylist(playlist) {
            this.selectedPlaylist = playlist;
            this.selectedPlaylistSongs = playlist ? playlist.songs : this.allSongs;
        },
        setAllSongs(songs) {
            this.allSongs = songs;
            this.selectedPlaylistSongs = songs;
        },
        setSelectedSong(song) {
            this.selectedSong = song;
        },
        setUser(user) {
            this.user = user;
        },
        clearUser() {
            this.user = null;
        }
    },
    computed: {
        isLogged() { return !!this.user; },
        isUserSet() { return this.user !== NOT_SET; }
    }
});

export default global;