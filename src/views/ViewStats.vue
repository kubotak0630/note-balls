<template>
  <div class="stats">
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Stat</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Number of Notes</td>
          <td>{{ totalNotesCount }}</td>
        </tr>
        <tr>
          <td>Number of Character (of all notes)</td>
          <td>{{ totalCharactersCout }}</td>
        </tr>
      </tbody>
    </table>
    <input
      v-model="comments"
      type="text"
      class="input"
      placeholder="Do you love noteballs"
      v-autofocus
    />
  </div>
</template>

<script setup lang="ts">
// Imports
import { ref } from 'vue';
import { useStoreNotes } from '@/stores/storeNotes';
import { storeToRefs } from 'pinia';
import { vAutofocus } from '@/directives/vAutofocus';
import { useWatchCharacters } from '@/composables/useWatchCharacters';

const { totalNotesCount, totalCharactersCout } = storeToRefs(useStoreNotes());

//
const comments = ref('');

// watch
useWatchCharacters(comments, 50);
</script>
