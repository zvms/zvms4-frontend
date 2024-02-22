import { defineStore } from "pinia";

export const usePreferenceStore = defineStore("preference", {
  state: () => ({
    theme: 'light',
    highContrast: false,
  })
})
