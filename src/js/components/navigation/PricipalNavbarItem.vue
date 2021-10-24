<template>
  <div class="navbar-start">
        <div class="navbar-item has-dropdown is-hoverable">
      <a class="navbar-link">Schulleitung</a>
      <div class="navbar-dropdown">
        <router-link to="/letters" class="navbar-item"
          >Schreiben zur Kenntnisnahme</router-link
        >
      </div>
    </div>
    <div class="navbar-item has-dropdown is-hoverable">
      <a class="navbar-link">Dienstlich</a>
      <div class="navbar-dropdown">
        <router-link to="/perusals" class="navbar-item"
          >Kenntnisnahmen</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
