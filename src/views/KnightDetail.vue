<template>
    <div class="heroes-list">
        <div class="knight-detail" v-if="knight">
          <h1>Datails of Knight</h1>
          <p><strong>Name:</strong> {{ knight.name }}</p>
          <p><strong>Nickname:</strong> {{ knight.nickname }}</p>
          <p><strong>Age:</strong> {{ knight.age }}</p>
          <p><strong>Attack:</strong> {{ knight.attack }}</p>
          <p><strong>Exp:</strong> {{ knight.exp }}</p>
      
          <div class="change-nickname">
                <div class="form__group field">
                    <input class="form__field" type="text" v-model="newNickname" />
                    <label class="form__label">New nickname:</label>
                </div>
          </div>
          <button @click="updateNick">Update nickname</button>
        </div>
    </div>
</template>
  
<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import { useKnightsStore } from '../stores/knights.ts';
  
  const knightsStore = useKnightsStore();
  const route = useRoute();
  const knightId = route.params.id as string;
  
  const knight = ref<any>(null);
  const newNickname = ref('');
  
  const fetchKnight = async () => {
    try {
      const data = await knightsStore.getKnightById(knightId);
      knight.value = data;
      newNickname.value = data.nickname;
    } catch (error) {
      console.error('Erro ao buscar knight:', error);
    }
  };
  
  const updateNick = async () => {
    try {
      const updated = await knightsStore.updateNickname(knightId, newNickname.value);
      knight.value = updated;
      alert('Nickname updated successfully!');
    } catch (error) {
      console.error('Error updating nickname:', error);
    }
  };
  
  onMounted(() => {
    fetchKnight();
  });
</script>
  
<style scoped>
    .heroes-list {
        margin: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    input {
        display: flex;
        flex-direction: column;
        margin-top: 1rem;
    }

    .knight-detail {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    
    .change-nickname {
        width: 100%;
        border: 5px solid #f6edd9;
        padding: 1rem;
        margin-top: 3rem;
        margin-bottom: 3rem;
    }
</style>
  