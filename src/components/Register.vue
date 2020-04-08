<template>
  <form>
    <h1 class="text-center home-h1">Register</h1>
    <hr />
    <label for="username">Username</label>
    <input class="form-control" type="text" name="username" id="username" required placeholder="Username"/>
    <label for="email">Email address</label>
    <input type="text" ngModel name="email" id="email" class="form-control" placeholder="e-mail" required/>
      <!-- pattern="[a-zA-Z0-9.-_]{6,}@*\.com" -->
    <p class="error-message">Please enter valid email!</p>
      <!-- v-if="emailInput.invalid && emailInput.touched" -->
    <div>
      <label for="password">Password</label>
      <input class="form-control" type="password" name="password" id="password" required placeholder="Password"/>
      <label for="confirmPassword">Confirm Password</label>
      <input class="form-control" type="password" name="confirmPassword"
        id="confirmPassword" required placeholder="confirmPassword"/>
      <!-- <p v-if="passwordsGroup.touched && passwordsGroup.invalid" class="danger">Passwords do not match</p> -->
    </div>
    <hr />
    <!-- <button type="submit" [disabled]="registerForm.invalid" class="form-control">Register</button>
    <hr />
    <p v-if="serverStatus" class="alert-danger">{{serverStatus}}</p> -->
  </form>
</template>

<script>

export default {
  
};
</script>

<style scoped>
form{
    margin: 2vw;
    padding: 5vw;
    padding-right: 40vw;
    background-image: url('../assets/Vue-tube-logo-big.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: right;
}

.ng-touched.ng-invalid, 
.password-match-touched.password-match-invalid {
  border-color: red;
}

.ng-valid {
  border-color: green;
}

p.error-message {
  color: red;
  font-style: italic;
}
</style>