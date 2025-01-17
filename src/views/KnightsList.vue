<template>
    <div class="knights-list">
      <h1>Knights</h1>
  
      <div class="actions">
          <button @click="goToCreateKnight">Create</button>
          <button @click="fetchKnights">Refresh</button>
      </div>
  
      <div v-if="loading">Loading...</div>
      <div class="datails" v-else>
        <ul>
          <li v-for="k in knightsStore.knights" :key="k._id">
            <h2>{{ k.name }} ({{ k.nickname }})</h2>
            <p>Attack: {{ k.attack }} | Age: {{ k.age }} | EXP: {{ k.exp }}</p>
            <div class="actions">
                <button @click="editKnight(k._id)">Change nickname</button>
                <button @click="removeKnight(k._id)">Add hall of heroes</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
</template>
  
<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useKnightsStore } from '../stores/knights.ts';
  import { useRouter } from 'vue-router';
  
  const knightsStore = useKnightsStore();
  const router = useRouter();
  const loading = ref(false);
  
  const fetchKnights = async () => {
    loading.value = true;
    await knightsStore.fetchKnights();
    loading.value = false;
  };
  
  const removeKnight = async (id: string) => {
    if (!confirm('Do you really want to remove this Knight?')) return;
    try {
      await knightsStore.removeKnight(id);
      alert('Knight removed and sent to the Hall of Heroes');
    } catch (error) {
      console.error(error);
      alert('Error removing knight');
    }
  };
  
  const editKnight = (id: string) => {
    router.push(`/knights/${id}`);
  };
  
  const goToCreateKnight = () => {
    router.push('/knights/new');
  };
  
  onMounted(() => {
    fetchKnights();
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

  .knights-list {
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
  