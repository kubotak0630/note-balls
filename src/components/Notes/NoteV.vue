<template>
  <div class="card mb-3">
    <div class="card-content">
      <div class="content">
        {{ note.content }}
        <div class="columns is-mobile has-text-grey-light mt-2">
          <small class="column">{{ dateFormatted }} </small>
          <small class="column has-text-right">{{ charLength }} </small>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <RouterLink :to="`/editNote/${note.id}`" href="#" class="card-footer-item">Edit</RouterLink>
      <!-- <a @click.prevent="handleEditClicked" href="#" class="card-footer-item">Edit</a> -->
      <!-- <a @click.prevent="handleDeleteClicked" href="#" class="card-footer-item">Delete</a> -->
      <a @click.prevent="modals.deleteNote = true" href="#" class="card-footer-item">Delete</a>
    </footer>
    <ModalDeleteNoteV v-if="modals.deleteNote" v-model="modals.deleteNote" :noteId="note.id" />
  </div>
</template>

<script lang="ts">
export type NoteT = {
  id: string;
  content: string;
  date: string;
};
</script>

<script setup lang="ts">
// Imports
import { computed, ref } from 'vue';
import { useRouter, RouterLink } from 'vue-router';
import { useStoreNotes } from '@/stores/storeNotes';
import ModalDeleteNoteV from '@/components/Notes/ModalDeleteNoteV.vue';
import { useDateFormat } from '@vueuse/core';
// Props

type propType = {
  note: NoteT;
};

const props = defineProps<propType>();

// Emits:
// const emit = defineEmits<{
//   (e: 'emit-delete', id: string): void;
// }>();

//
const modals = ref({ deleteNote: false });

//
const router = useRouter();
const { deleteNote } = useStoreNotes();

const charLength = computed(() => {
  const contentLen = props.note.content.length;
  const description = contentLen > 1 ? 'characters' : 'character';
  return `${contentLen} ${description}`;
});

const handleDeleteClicked = () => {
  deleteNote(props.note.id);
};

const handleEditClicked = () => {
  console.log('handleEditClicked');

  router.push({ name: 'edit-note', params: { id: props.note.id } });
};

// date formatted
// const dateFormatted = computed(() => {
//   const date = new Date(parseInt(props.note.date));
//   return useDateFormat(date, 'YYYY-MM-DD @HH:mm').value;
// });
const date = new Date(parseInt(props.note.date));
const dateFormatted = useDateFormat(date, 'YYYY-MM-DD @HH:mm');
</script>
