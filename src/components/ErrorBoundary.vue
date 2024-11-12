<template>
    <div>
      <slot v-if="!error"></slot>
      <div v-else class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong class="font-bold">Error!</strong>
        <span class="block sm:inline">{{ error }}</span>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onErrorCaptured } from 'vue'
  
  export default {
    setup() {
      const error = ref(null)
  
      onErrorCaptured((err) => {
        error.value = err.message
        return true
      })
  
      return { error }
    }
  }
  </script>