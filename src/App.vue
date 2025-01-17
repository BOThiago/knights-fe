<template>
  <div id="app">
    <nav class="nav">
      <router-link to="/">Knights</router-link>
      <router-link to="/heroes">Hall of Heroes</router-link>
      <router-link to="/knights/new">Create a Knight</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script setup lang="ts">
</script>

<style>
  nav {
    padding: 1rem;
    background-color: #f0f0f0;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
