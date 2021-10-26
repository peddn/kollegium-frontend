<template>
  <section class="section">
    <div class="container">
      <view-header
        title="Schreiben zur Kenntnisnahme:"
        subtitle="Der Blaue Ordner"
        flavour="is-info"
      />
      <letters-nav />
      <letters-list />
    </div>
  </section>
</template>

<script>
import ViewHeader from "../common/ViewHeader.vue";
import LettersList from "./LettersList.vue";
import LettersNav from './LettersNav.vue';

export default {
  components: {
    ViewHeader,
    LettersList,
    LettersNav
  },
    created() {
    this.$store.dispatch("letters/reloadData");
  },
};
</script>


