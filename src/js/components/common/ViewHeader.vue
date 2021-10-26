<template>
  <section :class="['hero', 'is-small', 'mb-4', flavour]">
    <div class="hero-body">
      <p class="title">{{ title }}</p>
      <p class="subtitle">{{ subtitle }}</p>
    </div>
  </section>
</template>

<script>
export default {
  props: ["title", "subtitle", "flavour"],
};
</script>