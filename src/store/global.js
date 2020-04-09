import Vue from 'vue';
export const NOT_SET = Symbol('NOT_SET');

const global = new Vue({
    data: {
        playlists: [],
        selectedPlayist: {},
        allSongs: [],
        selectedPlayistSongs: [],
        selectedSong: {},
        user: NOT_SET
    },
    methods: {
        setPlaylists(playlists) {
            this.playlists = playlists;
        },
        setSelectedPlaylist(playlist) {
            this.selectedPlayist = playlist;
            this.selectedPlayistSongs = playlist.songs;
        },
        setAllSongs(songs) {
            this.allSongs = songs;
            this.selectedPlayistSongs = songs;
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