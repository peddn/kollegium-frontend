<template>
  <nav class="navbar has-background-grey-lighter" role="navigation">
    <div class="navbar-menu">
      <div class="navbar-start">
        <div class="navbar-item">
          <div class="buttons has-addons">
            <button
              class="button is-small"
              v-bind:class="{
                'is-success': isActiveFilter('todo'),
              }"
              @click="setActiveFilter('todo')"
            >
              nicht gesichtete Schreiben
            </button>
            <button
              class="button is-small"
              v-bind:class="{
                'is-success': isActiveFilter('done'),
              }"
              @click="setActiveFilter('done')"
            >
              gesichtete Schreiben
            </button>
            <button
              class="button is-small"
              v-bind:class="{
                'is-success': isActiveFilter('all'),
              }"
              @click="setActiveFilter('all')"
            >
              alle Schreiben
            </button>
          </div>
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
      this.$store.commit("perusals/setActiveFilter", filter);
    },
    isActiveFilter(filter) {
      return this.$store.getters["perusals/isActiveFilter"](filter);
    },
    reloadData() {
      this.$store.dispatch("perusals/reloadData");
    },
  },
};
</script>
