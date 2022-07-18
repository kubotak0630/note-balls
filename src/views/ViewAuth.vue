<template>
  <div class="auth">
    <div class="tabs is-centered">
      <ul>
        <li :class="{ 'is-active': isLoginTab }">
          <a @click.prevent="isLoginTab = true">Login</a>
        </li>
        <li :class="{ 'is-active': !isLoginTab }">
          <a @click.prevent="isLoginTab = false">Register</a>
        </li>
      </ul>
    </div>

    <div class="card auth-form">
      <div class="card-content">
        <div class="title has-text-centered">{{ formTitle }}</div>

        <form @submit.prevent="onSubmit">
          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input
                v-model="credentials.email"
                class="input"
                type="email"
                placeholder="e.g. alexsmith@gmail.com"
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input
                v-model="credentials.password"
                class="input"
                type="password"
                placeholder="Enter a password"
              />
            </div>
          </div>

          <div class="field is-grouped is-grouped-right">
            <p class="control">
              <button class="button is-primary">{{ formTitle }}</button>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Import
import { ref, computed } from 'vue';
import { useStoreAuth } from '@/stores/storeAuth';

//
const isLoginTab = ref(true);

const { registerUser, loginUser } = useStoreAuth();

const formTitle = computed(() => {
  return isLoginTab.value ? 'Login' : 'Register';
});

// credentials
const credentials = ref({
  email: '',
  password: '',
});

// Submit handler
const onSubmit = () => {
  if (!credentials.value.email || !credentials.value.password) {
    alert('Please enter an email and password');
  } else {
    if (isLoginTab.value) {
      loginUser(credentials.value.email, credentials.value.password);
    } else {
      registerUser(credentials.value.email, credentials.value.password);
    }
  }
};
</script>

<style scoped lang="scss">
.auth-form {
  max-width: 400px;
  margin: 0 auto;
}
</style>
