<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-three-fifths is-offset-one-fifth">
          <h1 class="title">Hallo {{ getFullName }}!</h1>
          <hr />
          <h2 class="subtitle">Ihre Übersicht:</h2>
          <div class="columns box">
            <div class="column is-3">
              <router-link to="/perusals">Kenntnisnahmen</router-link>:
            </div>
            <div class="column">
              <p v-if="getSignedCount === getTotalCount">alles gesichtet</p>
              <p v-else>
                {{ getSignedCount }} von {{ getTotalCount }} gesichtet
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    getFullName() {
      const account = this.$store.getters["user/getAccount"];
      return account.firstName + " " + account.lastName;
    },
    getTotalCount() {
      return this.$store.getters["perusals/getTotalCount"];
    },
    getSignedCount() {
      return this.$store.getters["perusals/getSignedCount"];
    },
    getPerusalsOverview() {},
  },
  created() {
    this.$store.dispatch("perusals/reloadData");
    this.$store.dispatch("letters/reloadData");
  },
};
</script>
