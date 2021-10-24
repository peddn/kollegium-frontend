<template>
  <div id="app">
    <navbar />
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "./navigation/Navbar.vue";

export default {
  components: {
    Navbar,
  },
  data: function () {
    return {};
  },
  methods: {},
  provide: {},
};
</script>