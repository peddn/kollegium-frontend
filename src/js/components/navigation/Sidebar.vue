<template>
  <div class="box">
    <aside class="menu">
      <p class="menu-label">Schulleitung</p>
      <ul class="menu-list">
        <li>
          <router-link to="/letters">Schreiben</router-link>
          <ul>
            <li><a>neues Schreiben</a></li>
          </ul>
        </li>
      </ul>
      <p class="menu-label">Dienstlich</p>
      <ul class="menu-list">
        <li>
          <router-link to="/perusals">Kenntnisnahme</router-link>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
export default {};
</script>