<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Letters</h1>
    </div>
  </section>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("letters/reloadData")
  }
}
</script>
