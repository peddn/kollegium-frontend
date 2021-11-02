<template>
  <div class="navbar-item has-dropdown is-hoverable">
    <a class="navbar-link">Schulleitung</a>
    <div class="navbar-dropdown">
      <div class="navbar-item has-text-weight-bold">
        SCHREIBEN ZUR KENNTNISNAHME
      </div>
      <router-link to="/letters" class="navbar-item">
        <span class="icon-text">
          <span class="icon">
            <i class="fas fa-list"></i>
          </span>
          <span>Schreiben verwalten</span>
        </span>
      </router-link>
      <router-link to="/letters/create" class="navbar-item">
        <span class="icon-text">
          <span class="icon">
            <i class="fas fa-file-alt"></i>
          </span>
          <span>neues Schreiben</span>
        </span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>
