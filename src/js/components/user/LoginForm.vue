<template>
  <div id="login-form">
    <div class="field">
      <label class="label">E-Mail</label>
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="benutzername@edith-stein-schule.net"
          v-model="identifier"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">Passwort</label>
      <div class="control">
        <input class="input" type="password" v-model="password" />
      </div>
    </div>

    <div class="field">
      <div class="control">
        <button class="button is-link is-fullwidth" :class="{ 'is-loading': isLoading }" @click="login">anmelden</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      identifier: "",
      password: "",
    };
  },
  methods: {
    async login(event) {
      this.isLoading = true;
      await this.$store.dispatch("user/login", {
        identifier: this.identifier,
        password: this.password,
      });
      this.isLoading = false;
    },
  },
};
</script>

