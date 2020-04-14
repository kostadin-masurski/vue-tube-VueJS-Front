<template>
    <header>
        <nav class="navbar navbar-expand-md navbar-dark bg-dark">
            <router-link to="/home" class="navbar-brand">
                <img alt="Vue-tube-logo" height="45" src="../../assets/Vue-tube-logo-big.png">
            </router-link>
            <router-link v-if="!user" to="/register" class="btn btn-light">Register</router-link>

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04"
                    aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarsExample04">
                <ul class="navbar-nav mr-auto">
                </ul>
                <form v-if="user" class="row form-inline my-2 my-md-0" id="navbarsExample04">
                    <router-link to="/home" class="text-light"><h3>Welcome {{user}}</h3></router-link>
                    <router-link to="/playlist/create" class="btn btn-light">Create New Playlist</router-link>
                    <input class="btn btn-light" type="button" value="Logout"  @click="logout()">
                    <!-- <a class="col-1 form-control btn" href="/logout" sec:authorize="isAuthenticated()">Log Out</a> -->
                </form>
                <div v-else>
                    <form @submit.prevent="login" v-if="true" class="row form-inline my-2 my-md-0" method="post">
                        <input v-model="username" class="col-sm-4 form-control" type="text" name="username" placeholder="Username">
                        <input v-model="password" class="col-sm-4 form-control" type="password" name="password" placeholder="Password">
                        <input class="col-sm-2 form-control" type="submit" value="Login">
                    </form>
                    <p v-if="serverStatus" class="alert-danger">{{serverStatus}}</p>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
import { UserService } from "../../services/UserService";
import globalStore from "../../store/global";
import router from "../../router";

export default {
    data() {
        return {
            username: null,
            password: null,
            user: sessionStorage.username,
            serverStatus: false
        }
    },
    methods: {
        login() {
            let { username, password } = this;
            UserService.login({ username, password }).then(
                response => {
                    globalStore.setUser(response.data);
                    sessionStorage.setItem('username', response.data.username);
                    sessionStorage.setItem('email', response.data.email);
                    this.user = sessionStorage.username;
                    this.username = null;
                    this.password = null;
                    router.push('/home');
                },
                err => {
                    console.log(err);
                    this.serverStatus = 'Incorrect username or password';
                }
            )
        },
        logout() { 
            this.user = '';
            globalStore.user = '';
            sessionStorage.clear();
            router.push('/');
            }
    }
}
</script>

<style scoped>
nav{
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
}

.navbar-brand{
    display: inline-flex;
}

.btn-light{
    margin: 2px;
}

h3 {
    margin-right: 20px;
}

.btn-light {
    margin-right: 15px;
}
</style>