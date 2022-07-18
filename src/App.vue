<template>
  <NavBarV />

  <div class="container is-max-desktop px-2 py-4">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
// Imports
import { onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import NavBarV from '@/components/Layout/NavBarV.vue';

import { useStoreAuth } from '@/stores/storeAuth';

// Mouted
const { initAuth } = useStoreAuth();

onMounted(() => {
  initAuth();
});
</script>

<style>
/* @import './assets/base.css'; */
@import 'bulma/css/bulma.min.css';
</style>
