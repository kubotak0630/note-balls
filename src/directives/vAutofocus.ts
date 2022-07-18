// custom-directive
// vXXXXX  のキャメルケースでの命名規則がルール。使うときにはv-xxxx  とスネークケースで使う
export const vAutofocus = {
  mounted: (el: HTMLElement) => {
    el.focus();
  },
};
