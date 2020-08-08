<template>
  <div id="nav">
    <router-link to="/">Home</router-link>|
    <router-link to="/about">About</router-link>|
    <router-link to="/chapters">Chapters</router-link>
    <div v-if="!$auth.loading">
      <a v-if="!$auth.isAuthenticated" @click="login">
        <strong>Sign in</strong>
      </a>
      <a v-if="$auth.isAuthenticated" @click="logout">
        <strong>Log out</strong>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Nav extends Vue {
  login() {
    Vue.prototype.$auth.loginWithRedirect(); // @TODO: this of a way to call it as this.$auth0?
  }

  logout() {
    Vue.prototype.$auth.logout({
      returnTo: window.location.origin
    });
  }
}
</script>

<!--script>
export default {
  name: "Nav",
  methods: {
    // Log the user in
    login() {
      this.$auth.loginWithRedirect();
    },
    // Log the user out
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    }
  }
};
</script-->

<style lang="scss">
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
