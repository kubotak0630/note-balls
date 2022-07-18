<template>
  <nav class="navbar is-success" role="navigation" aria-label="main navigation">
    <div class="container is-max-desktop px-2">
      <div class="navbar-brand">
        <div class="navbar-item is-size-4 is-family-monospace">Noteball</div>

        <a
          @click.prevent="showMobileNav = !showMobileNav"
          role="button"
          class="navbar-burger"
          :class="{ 'is-active': showMobileNav }"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu" :class="{ 'is-active': showMobileNav }">
        <div class="navbar-start">
          <button
            v-if="userInfo.id"
            @click="logoutHandler"
            class="button is-small is-info mt-3 ml-3"
          >
            Log out {{ userInfo.email }}
          </button>
        </div>
        <div class="navbar-end">
          <RouterLink
            to="/"
            @click="showMobileNav = false"
            class="navbar-item"
            active-class="is-active"
          >
            Notes
          </RouterLink>

          <RouterLink
            to="/stats"
            @click="showMobileNav = false"
            class="navbar-item"
            active-class="is-active"
          >
            Stats
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
// Imports
import { ref } from 'vue';
import { useStoreAuth } from '@/stores/storeAuth';
/*
 mobile nav
*/

const showMobileNav = ref(false);
const { logoutUser, userInfo } = useStoreAuth();

//
const logoutHandler = () => {
  showMobileNav.value = false;
  logoutUser();
};
</script>

<style>
@media (max-width: 1023px) {
  .navbar-menu {
    position: absolute;
    left: 0;
    width: 100%;
  }
}
</style>
