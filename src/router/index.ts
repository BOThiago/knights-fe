import { createRouter, createWebHistory } from 'vue-router';
import KnightsList from '@/views/KnightsList.vue';
import HeroesList from '@/views/HeroesList.vue';
import KnightForm from '@/views/KnightForm.vue';
import KnightDetail from '@/views/KnightDetail.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: KnightsList,
  },
  {
    path: '/heroes',
    name: 'HeroesList',
    component: HeroesList,
  },
  {
    path: '/knights/new',
    name: 'KnightForm',
    component: KnightForm,
  },
  {
    path: '/knights/:id',
    name: 'KnightDetail',
    component: KnightDetail,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
