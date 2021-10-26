<template>
  <div id="letters-list">
    <div class="box">
      <div class="columns">
        <div class="column is-2 has-text-weight-bold">
          <a href="#">Erstellt am</a>
        </div>
        <div class="column is-7 has-text-weight-bold">
          <a href="#">Schreiben</a>
        </div>
        <div class="column is-2 has-text-weight-bold">
          <a href="#">unterzeichnet</a>
        </div>
        <div class="column is-1 has-text-weight-bold">
          <a href="#">löschen</a>
        </div>
      </div>
      <div v-if="!isEmpty">
        <div class="columns" v-for="letter in dataFiltered" :key="letter.id">
          <div class="column is-2">
            {{ getLocalDate(letter.created_at) }}
          </div>
          <div class="column is-7">
            {{ letter.title }}<br />
            <ul class="ml-3">
              <li v-for="doc in letter.documents" :key="doc.id">
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
            <progress
              class="progress"
              :value="
                (
                  signedPercentage(letter.signedCount, letter.unsignedCount) *
                  100
                ).toFixed()
              "
              max="100"
            ></progress>
            {{
              (
                signedPercentage(letter.signedCount, letter.unsignedCount) * 100
              ).toFixed()
            }}
            %
          </div>
          <div class="column is-1">
            <button class="button is-small is-fullwidth is-danger" @click="remove(letter.id)">
              <span class="icon is-small">
                <i class="fas fa-trash"></i>
              </span>
            </button>
          </div>
        </div>
      </div>
      <div class="level mt-5 mb-5" v-else>
        <div class="level-item has-text-centered">
          <div>
            <p class="title">es wurden noch keine Schreiben eingestellt</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    getLocalDate(date) {
      const localDate = new Date(date);
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      return localDate.toLocaleDateString("de-DE", options);
    },
    signedPercentage(signedCount, unsignedCount) {
      const total = signedCount + unsignedCount;
      return signedCount / total;
    },
    remove(id) {
      this.$store.dispatch("letters/remove", id );
    },
  },
  computed: {
    dataFiltered() {
      return this.$store.getters["letters/getDataFiltered"];
    },
    isEmpty() {
      if (this.$store.getters["letters/getDataFiltered"].length == 0) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

