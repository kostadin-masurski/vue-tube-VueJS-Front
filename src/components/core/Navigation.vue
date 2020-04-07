<template>
    <header>
        <nav class="navbar navbar-expand-md navbar-dark bg-dark">
            <a class="navbar-brand" href="/home">
                <img alt="Vue-tube-logo" height="45" src="../../assets/Vue-tube-logo-big.png">
            </a>

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04"
                    aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarsExample04">
                <ul class="navbar-nav mr-auto">
                </ul>
                <form v-if="true" class="row form-inline my-2 my-md-0" method="post">
                    <input class="col-sm-4 form-control" type="text" name="username" placeholder="Username">
                    <input class="col-sm-4 form-control" type="password" name="password" placeholder="Password">
                    <input class="col-sm-2 form-control" type="submit" value="Login">
                </form>
                <input v-if="true" class="btn btn-light" type="button" value="Logout" @click="logout()">
            </div>
        </nav>
    </header>
</template>

<script>
export default {
    
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
</style>