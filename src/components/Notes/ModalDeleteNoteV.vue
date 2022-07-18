<template>
  <p>this is Modal Delete</p>
  <div class="modal is-active p-2">
    <div class="modal-background"></div>
    <div ref="targetRef" class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Delete Note?</p>
        <button @click="closeModal" class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">Are you sure you want to delete this note?</section>
      <footer class="modal-card-foot is-justify-content-flex-end">
        <button @click="closeModal" class="button">Cancel</button>
        <button class="button is-danger" @click="handleDeleteClicked">Delete</button>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
// Import
import { onMounted, onUnmounted, ref } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { useStoreNotes } from '@/stores/storeNotes';
// Props
type propType = {
  modelValue: boolean;
  noteId: string;
};

const props = defineProps<propType>();

// Emits:
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

//
const closeModal = () => {
  emit('update:modelValue', false);
};

// use onClickOutside(外側をクリックしたときに消す)
const targetRef = ref(null);
onClickOutside(targetRef, () => {
  closeModal();
});

// keybord control
const handleKeyboard = (e: KeyboardEvent) => {
  console.log('close it');
  if (e.key === 'Escape') {
    closeModal();
  }
};

onMounted(() => {
  document.addEventListener('keyup', handleKeyboard);
});

onUnmounted(() => {
  document.removeEventListener('keyup', handleKeyboard);
});

// Delete handler
const { deleteNote } = useStoreNotes();
const handleDeleteClicked = () => {
  deleteNote(props.noteId);
};
</script>
