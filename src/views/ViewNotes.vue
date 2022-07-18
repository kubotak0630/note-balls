<template>
  <div class="notes">
    <AddEditNoteV v-model="newNote" ref="addEditNoteRef" placeholder="Add note" label="Edit Note">
      <template v-slot:buttons>
        <button
          @click="handleAddNote"
          :disabled="newNote.length === 0"
          class="button is-link has-background-success"
        >
          Submit
        </button></template
      >
    </AddEditNoteV>

    <progress v-if="nowLoaded" class="progress is-large is-success" max="100"></progress>
    <template v-else>
      <NoteV :note="note" v-for="note in notes" :key="note.id" />

      <div
        v-if="!notes.length"
        class="is-size-4 has-text-centered has-text-grey-light is-family-monospace py-6"
      >
        No notes here yet...
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
// Imports
import { ref } from 'vue';
import NoteV from '@/components/Notes/NoteV.vue';
import AddEditNoteV from '@/components/Notes/AddEditNoteV.vue';
import { useStoreNotes } from '@/stores/storeNotes';
import { storeToRefs } from 'pinia';
import { useWatchCharacters } from '@/composables/useWatchCharacters';
// State
const newNote = ref(''); // textareaにbindされている値

const addEditNoteRef = ref<any>(null);

// from Store
const { notes, nowLoaded } = storeToRefs(useStoreNotes());
const { addNote } = useStoreNotes();

// function
const handleAddNote = () => {
  addNote(newNote.value);
  newNote.value = '';
  addEditNoteRef.value.focusTextArea();
};

// watch characters

useWatchCharacters(newNote);
</script>
