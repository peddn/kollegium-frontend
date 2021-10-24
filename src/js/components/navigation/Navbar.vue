<template>
  <nav
    class="navbar is-fixed-top is-success"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="container">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item">
          <div class="navbar-item">
            <figure class="image">
              <img src="/img/ess-logo.svg" width="112" height="28" />
            </figure>
          </div>
        </router-link>
        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div class="navbar-menu">
        <pricipal-navbar-item v-if="isRole('principal')" />
        <teacher-navbar-item v-if="isRole('teacher')" />
        <div class="navbar-end">
          <router-link v-if="!isLoggedIn" to="/login" class="navbar-item">
            anmelden
          </router-link>
          <router-link v-if="isLoggedIn" to="/" class="navbar-item"
            >Einstellungen</router-link
          >
          <router-link
            v-if="isLoggedIn"
            to="/"
            class="navbar-item"
            @click="logout"
            >abmelden</router-link
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import TeacherNavbarItem from "./TeacherNavbarItem.vue";
import PricipalNavbarItem from "./PricipalNavbarItem.vue";

export default {
  components: {
    TeacherNavbarItem,
    PricipalNavbarItem,
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters["user/isLoggedIn"];
    },
  },
  methods: {
    isRole(role) {
      if (this.$store.getters["user/getRole"] === role) {
        return true;
      } else {
        return false;
      }
    },
    logout: function () {
      this.$store.dispatch("user/logout");
      this.$router.push("/login");
    },
  },
};
</script>
