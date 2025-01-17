<template>
    <div class="knight-form">
      <h1>Create</h1>
      <form @submit.prevent="onSubmit">
        <div class="container">
          <div class="knight">
            <h3>Characteristics:</h3>
            <div class="form__group field">
              <input class="form__field" v-model="form.name" required />
              <label class="form__label">Name:</label>
            </div>
            <div class="form__group field">
              <input class="form__field" v-model="form.nickname" required />
              <label class="form__label">Nickname:</label>
            </div>
            <div class="form__group field">
              <input class="form__field" type="date" v-model="form.birthday" required />
              <label class="form__label">Birthday:</label>
            </div>
          </div>
  
          <div>
            <h3>Attributes:</h3>
            <div class="atributes">
              <div>
                <div class="form__group field">
                  <input class="form__field" type="number" v-model.number="form.attributes.strength" :min="0" :max="20" />
                  <label class="form__label">Strength:</label>
                </div>
                <div class="form__group field">
                  <input class="form__field" type="number" v-model.number="form.attributes.dexterity" :min="0" :max="20" />
                  <label class="form__label">Dexterity:</label>
                </div>
                <div class="form__group field">
                  <input class="form__field" type="number" v-model.number="form.attributes.constitution" :min="0" :max="20" />
                  <label class="form__label">Constitution:</label>
                </div>
              </div>
              <div>
                <div class="form__group field">
                  <input class="form__field" type="number" v-model.number="form.attributes.intelligence" :min="0" :max="20" />
                  <label class="form__label">Intelligence:</label>
                </div>
                <div class="form__group field">
                  <input class="form__field" type="number" v-model.number="form.attributes.wisdom" :min="0" :max="20" />
                  <label class="form__label">Wisdom:</label>
                </div>
                <div class="form__group field">
                  <input class="form__field" type="number" v-model.number="form.attributes.charisma" :min="0" :max="20" />
                  <label class="form__label">Charisma:</label>
                </div>
              </div>
            </div>
  
            <label>Key attribute:</label>
              <select class="select" v-model="form.keyAttribute">
                <option value="strength">strength</option>
                <option value="dexterity">dexterity</option>
                <option value="constitution">constitution</option>
                <option value="intelligence">intelligence</option>
                <option value="wisdom">wisdom</option>
                <option value="charisma">charisma</option>
              </select>
          </div>
  
          <div class="weapons">
            <h3>Weapons:</h3>
            <div
              class="weapon-row"
              v-for="(weapon, index) in form.weapons"
              :key="index"
            >
              <div class="form__group field">
                <input class="form__field" v-model="weapon.name" />
                <label class="form__label">Name of weapon:</label>
              </div>
              <div class="form__group field">
                <input class="form__field" type="number" v-model.number="weapon.mod" />
                <label class="form__label">Mod:</label>
              </div>
              <div class="form__group field">
                <input class="form__field" v-model="weapon.attr" />
                <label class="form__label">Attr:</label>
              </div>
  
              <div class="checkbox-form form__group field">
                <label class="form__label">Equipped:</label>
                <div class="checkbox-wrapper-3">
                  <input
                    type="checkbox"
                    :id="'cbx-'+index"
                    v-model="weapon.equipped"
                    @change="onEquippedChange(index)"
                  />
                  <label :for="'cbx-'+index" class="toggle">
                    <span></span>
                  </label>
                </div>
              </div>
  
              <button
                type="button"
                @click="removeWeapon(index)"
                class="remove-weapon"
                v-if="form.weapons.length > 1"
              >
                Remove
              </button>
            </div>
  
            <button type="button" @click="addWeapon" class="add-weapon">
              + Add Weapon
            </button>
          </div>
        </div>
  
        <button type="submit">Save knight</button>
      </form>
    </div>
</template>
  
<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useKnightsStore } from '../stores/knights.ts';

const router = useRouter();
const knightsStore = useKnightsStore();

const form = reactive({
  name: '',
  nickname: '',
  birthday: '',
  weapons: [
    {
      name: 'sword',
      mod: 3,
      attr: 'strength',
      equipped: true,
    },
  ],
  attributes: {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
  },
  keyAttribute: 'strength',
});

function addWeapon() {
  form.weapons.push({
    name: '',
    mod: 0,
    attr: 'strength',
    equipped: false,
  });
}

function removeWeapon(index: number) {
  form.weapons.splice(index, 1);
}

function onEquippedChange(index: number) {
  if (form.weapons[index].equipped) {
    for (let i = 0; i < form.weapons.length; i++) {
      if (i !== index) {
        form.weapons[i].equipped = false;
      }
    }
  }
}

async function onSubmit() {
try {
    await knightsStore.createKnight(form as any);
    alert('Knight created successfully!');
    router.push('/');
} catch (error) {
    console.error('Error creating knight:', error);
    alert('Error creating knight.');
}
}
</script>
  
<style scoped>
    h3 {
        text-align: center;
    }

    .knight-form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        max-width: 100%;
    }

    form {
        width: 95%;
    }

    .container {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        gap: 5rem;
    }

    .atributes {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .weapons {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .weapon-row {
        border: 3px solid #f6edd9;
        padding: 0.5rem;
        margin-bottom: 0.5rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .add-weapon,
    .remove-weapon {
        margin-top: 0.5rem;
        margin-right: 0.5rem;
        background-color: #c6a15b;
        border: none;
        padding: 0.4rem 0.8rem;
        color: #fff;
        cursor: pointer;
        font-weight: bold;
        border-radius: 4px;
    }

    .add-weapon:hover,
    .remove-weapon:hover {
        background-color: #8f7a66;
    }

    button[type='submit'] {
        margin-top: 2rem;
    }

    @media (min-width: 768px) {
        .container {
            flex-direction: row;
        }

        .atributes {
            flex-direction: row;
        }
    }
</style>
