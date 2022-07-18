<template>
  <div class="edit-note">
    <AddEditNoteV
      v-model="noteConetent"
      bgColor="link"
      placeholder="Edit note"
      ref="addEditNoteRef"
    >
      <template v-slot:buttons>
        <button @click="$router.push({ name: 'notes' })" class="button mr-2 is-link is-light">
          Cancel
        </button>
        <button
          @click="handleSaveClicked"
          class="button is-link has-background-link"
          :disabled="noteConetent.length === 0"
        >
          Save Note
        </button></template
      >
    </AddEditNoteV>
  </div>
</template>

<script setup lang="ts">
// Imports
import { ref } from 'vue';
import AddEditNoteV from '@/components/Notes/AddEditNoteV.vue';
import { useStoreNotes } from '@/stores/storeNotes';
import { storeToRefs } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
// Props: None

// Emits:

//
const route = useRoute();
const router = useRouter();

const { updateContent, getNoteContent } = useStoreNotes();

const noteConetent = ref('');
noteConetent.value = getNoteContent(route.params.id as string).value;

// function
const handleSaveClicked = () => {
  updateContent(route.params.id as string, noteConetent.value);
  router.push({ name: 'notes' });
};
</script>
