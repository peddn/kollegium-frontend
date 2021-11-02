<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-4 is-offset-4">
          <div class="block">
            <login-form />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import LoginForm from "./LoginForm.vue";

export default {
  components: {
    LoginForm,
  },
};
</script>
