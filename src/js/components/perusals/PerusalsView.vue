<template>
  <section class="section">
    <div class="container">
      <section class="hero is-small is-info mb-4">
        <div class="hero-body">
          <p class="title">Zu Ihrer Kenntnisnahme:</p>
          <p class="subtitle">"Der Blaue Ordner"</p>
        </div>
      </section>

      <nav class="navbar has-background-grey-lighter" role="navigation">
        <div class="navbar-menu">
          <div class="navbar-start">
            <div class="navbar-item">
              <div class="buttons has-addons">
                <button
                  class="button is-small"
                  v-bind:class="{
                    'is-success': isActiveFilter('todo')
                  }"
                  @click="setActiveFilter('todo')"
                >
                  nicht gesichtete Schreiben
                </button>
                <button
                  class="button is-small"
                  v-bind:class="{
                    'is-success': isActiveFilter('done')
                  }"
                  @click="setActiveFilter('done')"
                >
                  gesichtete Schreiben
                </button>
                <button
                  class="button is-small"
                  v-bind:class="{
                    'is-success': isActiveFilter('all')
                  }"
                  @click="setActiveFilter('all')"
                >
                  alle Schreiben
                </button>
              </div>
            </div>
          </div>
          <div class="navbar-end">
            <div class="navbar-item">
              <button class="button is-small is-success" @click="reloadData">
                <span class="icon is-small">
                  <i class="fas fa-sync"></i>
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <perusals-list />
    </div>
  </section>
</template>

<script>
import PerusalsList from "./PerusalsList.vue"

export default {
  components: {
    PerusalsList,
  },
  methods: {
    setActiveFilter(filter) {
      this.$store.commit("perusals/setActiveFilter", filter)
    },
    isActiveFilter(filter) {
      return this.$store.getters["perusals/isActiveFilter"](filter)
    },
    reloadData() {
      this.$store.dispatch("perusals/reloadData")
    },
  },
  computed: {},
  created() {
    this.$store.dispatch("perusals/reloadData")
  }
}
</script>

