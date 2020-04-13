<template>
  <form @submit.prevent="submitHandler">
    <h1 class="text-center home-h1">Register</h1>
    <hr />
    <label for="username">Username</label>
    <input v-model="username" @blur="$v.username.$touch" class="form-control" type="text" name="username" id="username" placeholder="Username" maxlength="51" required/>
    <template v-if="$v.username.$error">
      <div v-if="!$v.username.required" class="text-danger">Username is required!</div>
      <div v-if="!$v.username.minLength" class="text-danger">Username should be more than 2 symbols!</div>
      <div v-if="!$v.username.maxLength" class="text-danger">Username should not be more than 50 symbols!</div>
    </template>
    <label for="email">Email address</label>
    <input v-model="email" @blur="$v.email.$touch" type="text" name="email" id="email" class="form-control" placeholder="e-mail" required/>
    <template v-if="$v.email.$error">
      <div v-if="!$v.email.required" class="text-danger">Email is required!</div>
      <div v-if="!$v.email.email" class="text-danger">Enter valid e-mail!</div>
    </template>
    <div>
    <label for="password">Password</label>
    <input v-model="password" @blur="$v.password.$touch" class="form-control" type="password" name="password" id="password" required placeholder="Password"/>
    <template v-if="$v.password.$error">
      <div v-if="!$v.password.required" class="text-danger">Password is required!</div>
      <div v-if="!$v.password.minLength" class="text-danger">Password should be more than 5 symbols!</div>
    </template>
    <label for="confirmPassword">Confirm Password</label>
    <input v-model="confirmPassword" @blur="$v.confirmPassword.$touch" class="form-control" type="password" name="confirmPassword"
      id="confirmPassword" required placeholder="confirmPassword"/>
    <template v-if="$v.confirmPassword.$error">
      <div v-if="!$v.confirmPassword.required" class="text-danger">Password confirmation is required!</div>
      <div v-if="!$v.confirmPassword.sameAs" class="text-danger">Password do not match!</div>
    </template>
    </div>
    <hr />
    <button :disabled="$v.$invalid" class="btn btn-success">Register</button>
    <hr />
    <p v-if="serverStatus" class="alert-danger">{{serverStatus}}</p>
  </form>
</template>

<script>
import Vue from "vue";
import Vuelidate from "vuelidate";
import { required, minLength, maxLength, email, sameAs } from "vuelidate/lib/validators";
import { UserService } from "../services/UserService"
// import globalStore from "../../store/global";
// import router from "../../router"

Vue.use(Vuelidate);

export default {
  name: "Playlist-create",
  data() {
    return {
      username: null,
      email: null,
      password: null,
      confirmPassword: null,
      serverStatus: false
    };
  },
  validations: {
    username: {
      required,
      minLength: minLength(3),
      maxLength: maxLength(50)
    },
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    },
    confirmPassword: {
      required,
      sameAs: sameAs('password')
    }
  },
  methods: {
    submitHandler() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      let { username, email, password, confirmPassword } = this;
      UserService.register({ username, email, password, confirmPassword }).then(
        response => {
          console.log(response);
          //router.push("edit");
        },
        err => console.log(err)
      );
    }
  }
};
</script>

<style scoped>
form{
    margin: 2vw;
    padding: 1vw;
    padding-right: 30vw;
    background-image: url('../assets/Vue-tube-logo-big.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: right;
}
</style>