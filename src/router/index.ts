import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

import ViewNotes from '@/views/ViewNotes.vue';
import ViewEditNote from '@/views/ViewEditNote.vue';
import ViewStats from '@/views/ViewStats.vue';
import ViewAuth from '@/views/ViewAuth.vue';
import { useStoreAuth } from '@/stores/storeAuth';
import { storeToRefs } from 'pinia';

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'notes',
      component: ViewNotes,
    },
    {
      path: '/editNote/:id',
      name: 'edit-note',
      component: ViewEditNote,
      // component: () => import('../views/PostView.vue'),
    },
    {
      path: '/stats',
      name: 'stats',
      component: ViewStats,
      // component: () => import('../views/PostView.vue'),
    },
    {
      path: '/auth',
      name: 'auth',
      component: ViewAuth,
      // component: () => import('../views/PostView.vue'),
    },
  ],
});

// navigation guards
router.beforeEach(async (to, from) => {
  const { userInfo } = storeToRefs(useStoreAuth());

  if (!userInfo.value.id && to.name !== 'auth') {
    return { name: 'auth' };
  }

  if (userInfo.value.id && to.name === 'auth') {
    // 移動させない場合はfalse
    return false;
  }

  // console.log('to: ', to);
  // console.log('from: ', from);
});

export default router;
