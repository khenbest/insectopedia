<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div class="row justify-content-center my-3">

      <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Login</h5>
          <div id="imgBar" class="row">
            <img @click="login('google')" src="https://img.icons8.com/ios-filled/50/000000/google-logo.png">
            <img @click="login('github')" src="https://img.icons8.com/ios-filled/50/000000/github.png">
            <img @click="showForm = !showForm" src="https://img.icons8.com/ios-filled/50/000000/email.png">
          </div>
          <div v-if="showForm" class="sign-in">
            <form v-if="!newUser" @submit.prevent="signIn()">
              <label for="email">Email</label>
              <input type="email" id="email" v-model="user.email" required>
              <label for="password">Password</label>
              <input type="password" id="password" v-model="user.password" required>
              <button type="submit">Login</button>
            </form>
            <form v-else @submit.prevent="signIn()">
              <label for="name">Name</label>
              <input type="text" id="name" v-model="user.displayName" required>
              <label for="email">Email</label>
              <input type="email" id="email" v-model="user.email" required>
              <label for="password">Password</label>
              <input type="password" id="password" v-model="user.password" required>
              <button type="submit">Register</button>
            </form>
            <p class="clickable" @click="clearUser(); newUser = !newUser;">
              {{newUser ? 'Already a member? Login' : 'No account yet? Register'}}</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  // @ is an alias to /src
  import BugForm from '@/components/BugForm.vue'
  export default {
    name: 'home',
    data() {
      return {
        showForm: false,
        user: {
          displayName: "",
          email: "",
          password: ""
        },
        newUser: false
      };
    },
    methods: {
      signIn() {
        if (this.user.displayName) {
          this.$store.dispatch("register", this.user);
        } else {
          this.$store.dispatch("login", this.user);
        }
        this.clearUser();
      },
      clearUser() {
        this.user = {
          displayName: "",
          email: "",
          password: ""
        };
      },
      login(provider) {
        switch (provider) {
          case "google":
            this.$store.dispatch('googleLogin')
            break;
          case "github":
            this.$store.dispatch('githubLogin')
            break;
          case "email":
            this.$store.dispatch('emailLogin')
            break;
          default:
            break;
        }
      }
    }
  }
</script>
<style>
  #imgBar {
    display: flex;
    justify-content: space-evenly;
  }
</style>