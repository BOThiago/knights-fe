<template>
    <div class="heroes-list">
        <h1>Hall of Heroes</h1>
        <div class="actions">
            <button @click="fetchHeroes">Refresh</button>
        </div>
        <div v-if="loading">Loading...</div>
        <div class="datails" v-else>
            <ul>
                <li v-for="h in knightsStore.heroes" :key="h._id">
                <h2>{{ h.name }} ({{ h.nickname }})</h2>
                <p>Age: {{ h.age }} | Attack: {{ h.attack }} | Exp: {{ h.exp }}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useKnightsStore } from '../stores/knights.ts';

const knightsStore = useKnightsStore();
const loading = ref(false);

const fetchHeroes = async () => {
    loading.value = true;
    await knightsStore.fetchHeroes();
    loading.value = false;
};

onMounted(() => {
    fetchHeroes();
});
</script>

<style scoped>
  .datails {
    min-width: 30%;
    max-width: 95%;
  }
  
  li {
    margin: 1rem;
    padding: 1rem;
    border: 5px solid #f6edd9;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .heroes-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .actions {
    padding-top: 1rem;
    display: flex;
    gap: 2rem;
  }
</style>
