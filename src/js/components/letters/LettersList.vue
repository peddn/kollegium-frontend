<template>
  <div id="letters-list">
    <div class="box">
      <div class="columns">
        <div class="column is-2 has-text-weight-bold">
          <a href="#">erstellt am</a>
        </div>
        <div class="column is-5 has-text-weight-bold">
          <a href="#">Schreiben</a>
        </div>
        <div class="column is-2 has-text-weight-bold has-text-centered">
          <a href="#">gesichtet</a>
        </div>
        <div class="column is-1 has-text-weight-bold has-text-centered">
          ändern
        </div>
        <div class="column is-1 has-text-weight-bold has-text-centered">
          exportieren
        </div>
        <div class="column is-1 has-text-weight-bold has-text-centered">
          löschen
        </div>
      </div>
      <div v-if="!isEmpty">
        <div class="columns" v-for="letter in dataFiltered" :key="letter.id">
          <div class="column is-2">
            {{ getLocalDate(letter.created_at) }}
          </div>
          <div class="column is-5">
            {{ letter.title }}<br />
            <ul class="ml-3">
              <li v-for="doc in letter.documents" :key="doc.id">
                <a :href="getRootUrl + doc.url" target="_blank">
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
          </div>
          <div class="column is-1">
            <button
              class="button is-small is-fullwidth is-warning"
              @click="edit(letter.id)"
              :id="'letter-button-edit-' + letter.id"
            >
              <span class="icon is-small">
                <i class="fas fa-edit"></i>
              </span>
            </button>
          </div>
          <div class="column is-1">
            <button
              class="button is-small is-fullwidth is-info"
              @click="getExport(letter.id)"
              :id="'letter-button-download-' + letter.id"
            >
              <span class="icon is-small">
                <i class="fas fa-download"></i>
              </span>
            </button>
          </div>
          <div class="column is-1">
            <button
              class="button is-small is-fullwidth is-danger"
              @click="remove(letter.id)"
              :id="'letter-button-remove-' + letter.id"
            >
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
            <p class="title">es wurden keine Schreiben eingestellt</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toast } from "bulma-toast";

export default {
  methods: {
    getLocalDate(date) {
      const localDate = new Date(date);
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      return localDate.toLocaleDateString("de-DE", options);
    },
    signedPercentage(signedCount, unsignedCount) {
      const total = signedCount + unsignedCount;
      const result = signedCount / total;
      return result;
    },
    async remove(id) {
      const buttonElement = document.getElementById(
        "letter-button-remove-" + id
      );
      buttonElement.classList.add("is-loading");
      await this.$store.dispatch("letters/remove", id);
      toast({
        message: "Das Schreiben wurde erfolgreich gelöscht.",
        position: "bottom-right",
        type: "is-success",
        dismissible: true,
        pauseOnHover: true,
      });
      buttonElement.classList.remove("is-loading");
    },
    async edit(id) {
      this.$router.push('/letters/update/' + id);
    },
    async getExport(id) {
      // TODO: format 'csv' is hardcoded here
      await this.$store.dispatch("letters/getExport", { id: id, format: "csv" });
    },
  },
  computed: {
    getRootUrl() {
      return process.env.ROOT_URL
    },
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

