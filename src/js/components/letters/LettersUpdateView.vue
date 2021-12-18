<template>
  <section class="section">
    <div class="container">
      <h1 class="title">{{ letter.title }}</h1>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    letter() {
      return this.$store.getters["letters/getLetter"](this.$route.params.id);
    },
  },
};
</script>
