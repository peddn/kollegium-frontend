<template>
  <div id="perusals-list">
    <div class="box">
      <div class="columns">
        <div class="column is-2 has-text-weight-bold">
          <a href="#">Datum</a>
        </div>
        <div class="column is-8 has-text-weight-bold">
          <a href="#">Inhalt</a>
        </div>
        <div class="column is-2 has-text-weight-bold">
          <a href="#">Status</a>
        </div>
      </div>
      <div v-if="!isEmpty">
        <div class="columns" v-for="perusal in dataFiltered" :key="perusal.id">
          <div class="column is-2">
            {{ getLocalDate(perusal.date) }}
          </div>
          <div class="column is-8">
            {{ perusal.letter.title }}<br />
            <ul class="ml-3">
              <li v-for="doc in perusal.letter.documents" :key="doc.id">
                <a :href="'http://localhost:1337' + doc.url" target="_blank">
                  <span class="icon-text">
                    <span class="icon">
                      <i class="fas fa-angle-right"></i>
                    </span>
                    {{ doc.name }}
                  </span>
                </a>
              </li>
            </ul>
          </div>
          <div class="column is-2">
            <button
              v-if="!isSigned(perusal.id)"
              class="button is-small is-success"
              @click="sign(perusal.id)"
            >
              <span>sichten</span>
              <span class="icon is-small">
                <i class="fas fa-eye"></i>
              </span>
            </button>
            <span v-else class="tag is-info">
              <span class="icon-text">
                <span>gesichted</span>
                <span class="icon">
                  <i class="fas fa-check-circle"></i>
                </span>
              </span>
            </span>
          </div>
        </div>
      </div>
      <div class="level mt-5 mb-5" v-else>
        <div class="level-item has-text-centered">
          <div>
            <p class="title">alles erledigt</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    sign(id, event) {
      this.$store.dispatch("perusals/updateSigned", {
        id: id,
        signed: true,
      });
    },
    isSigned(id, event) {
      const perusal = this.$store.getters["perusals/getData"].find(
        (perusal) => {
          return perusal.id === id;
        }
      );
      return perusal.signed;
    },
    getLocalDate(date) {
      const localDate = new Date(date);
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      return localDate.toLocaleDateString("de-DE", options);
    },
  },
  computed: {
    dataFiltered() {
      return this.$store.getters["perusals/getDataFiltered"];
    },
    isEmpty() {
      if (this.$store.getters["perusals/getDataFiltered"].length == 0) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
