import { watch } from 'vue';
import type { Ref } from 'vue';

export const useWatchCharacters = (valueToWatch: Ref<string>, maxChars = 100) => {
  // watch
  watch(valueToWatch, (newValue, oldValue) => {
    // console.log(newValue.length);
    if (newValue.length === maxChars) {
      alert(`Only ${maxChars} characters allowed`);
    }
  });
};
