<template>
  <nav class="navbar has-background-grey-lighter" role="navigation">
    <div class="navbar-menu">
      <div class="navbar-start">
        <div class="navbar-item">
          <p>BUTTONS</p>
        </div>
      </div>
      <div class="navbar-end">
        <div class="navbar-item mr-3">
          <button class="button is-small is-success" @click="reloadData">
            <span class="icon is-small">
              <i class="fas fa-sync"></i>
            </span>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    setActiveFilter(filter) {
      this.$store.commit("letters/setActiveFilter", filter);
    },
    isActiveFilter(filter) {
      return this.$store.getters["letters/isActiveFilter"](filter);
    },
    reloadData() {
      this.$store.dispatch("letters/reloadData");
    },
  },
};
</script>
