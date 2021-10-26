<template>
  <section class="section">
    <div class="container">
      <view-header
        title="Ein neues Schreiben erstellen:"
        subtitle="Der Blaue Ordner"
        flavour="is-info"
      />

      <div class="columns mt-5">
        <div class="column is-half is-offset-one-quarter">
          <form @submit.prevent="onSubmit" id="createLetterForm">
            <div class="field">
              <label class="label">Titel</label>
              <div class="control">
                <input
                  name="title"
                  v-model="heading"
                  class="input"
                  :class="{
                    'is-danger': !hasHeading,
                    'is-success': hasHeading,
                  }"
                />
              </div>
              <p
                class="help"
                :class="{ 'is-danger': !hasHeading, 'is-success': hasHeading }"
              >
                {{ getTip }}
              </p>
            </div>

            <hr />

            <div class="field">
              <label class="label">Dateien</label>
              <div class="content" v-if="filesSelected">
                <table class="table is-striped is-narrow">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Größe</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(file, index) in selectedFiles" :key="index">
                      <td>{{ file.name }}</td>
                      <td>{{ (file.size / 1024).toFixed(2) }} kB</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="content" v-else>
                Es wurden noch keine Dateien ausgewählt.
              </div>
            </div>
            <div class="field is-grouped is-grouped-left">
              <div class="control">
                <div class="file">
                  <label class="file-label">
                    <input
                      class="file-input"
                      type="file"
                      name="documents"
                      multiple
                      @change="onFilesSelected"
                    />
                    <span class="file-cta">
                      <span class="file-icon">
                        <i class="fas fa-upload"></i>
                      </span>
                      <span class="file-label" v-if="filesSelected">
                        Dateien ersetzen</span
                      >
                      <span class="file-label" v-else> Dateien hinzufügen</span>
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <hr />

            <div class="field is-grouped is-grouped-right">
              <div class="control">
                <button
                  class="button is-warning"
                  :disabled="!hasHeading && !filesSelected"
                  @click="reset"
                >
                  alles zurücksetzen
                </button>
              </div>
              <div class="control">
                <input
                  type="submit"
                  value="Schreiben erstellen"
                  class="button is-success"
                  :disabled="!isValid"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ViewHeader from "../common/ViewHeader.vue";

export default {
  components: {
    ViewHeader,
  },
  data() {
    return {
      heading: "",
      selectedFiles: [],
    };
  },
  methods: {
    onFilesSelected(event) {
      if (event.target.files.length !== 0) {
        this.selectedFiles = [];
        this.selectedFiles = event.target.files;
      } else {
        this.selectedFiles = [];
      }
    },
    onSubmit(event) {
      const formElement = document.getElementById("createLetterForm");
      this.$store.dispatch("letters/create", formElement);
    },
    reset(event) {
      event.preventDefault();
      this.heading = "";
      this.selectedFiles = [];
    },
  },
  computed: {
    filesSelected() {
      return this.selectedFiles.length !== 0;
    },
    hasHeading() {
      return this.heading != "";
    },
    isValid() {
      return this.hasHeading && this.filesSelected;
    },
    getTip() {
      if (this.hasHeading) {
        return "";
      } else {
        return "Bitte geben Sie einen Titel ein.";
      }
    },
  },
  created() {
    //this.$store.dispatch("letters/reloadData")
  },
};
</script>
