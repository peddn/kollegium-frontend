<template>
  <section class="section">
    <div class="container">
      <view-header
        title="Zu Ihrer Kenntnisnahme:"
        subtitle="Der Blaue Ordner"
        flavour="is-info"
      />
      <perusals-nav />
      <perusals-list />
    </div>
  </section>
</template>

<script>
import ViewHeader from "../common/ViewHeader.vue";
import PerusalsList from "./PerusalsList.vue";
import PerusalsNav from "./PerusalsNav.vue";

export default {
  components: {
    PerusalsList,
    PerusalsNav,
    ViewHeader,
  },
  created() {
    this.$store.dispatch("perusals/reloadData");
  },
};
</script>

