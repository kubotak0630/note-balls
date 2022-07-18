<template>
  <div class="edit-note">
    <div class="card p-4 mb-5" :class="`has-background-${bgColor}-dark`">
      <label v-if="label" class="label has-text-white">{{ label }}</label>
      <div class="field">
        <div class="control">
          <textarea
            :value="modelValue"
            @input="$emit('update:modelValue', ($event as any).target.value)"
            class="textarea"
            ref="textAreaRef"
            :placeholder="placeholder"
            v-autofocus
            maxlength="100"
          ></textarea>
        </div>
      </div>

      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <slot name="buttons"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Imports
import { ref } from 'vue';
import { vAutofocus } from '@/directives/vAutofocus';

// Props
type propType = {
  modelValue: string;
  bgColor?: string;
  placeholder?: string;
  label?: string;
};

const props = withDefaults(defineProps<propType>(), {
  bgColor: 'success',
  placeholder: 'Type something...',
});

// Emit: None

//
const textAreaRef = ref<HTMLElement | null>(null);
const focusTextArea = () => {
  textAreaRef.value!.focus();
};

const text = ref('');

// 外部公開
defineExpose({ focusTextArea });
</script>
