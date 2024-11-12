<template>
    <header class="flex flex-col sm:flex-row items-center p-4 space-y-3 sm:space-y-0 sm:space-x-3 mt-6">
      <div class="relative flex items-center w-full sm:w-1/2">
        <img src="/src/assets/icons8-search.svg" alt="Search Icon" class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-500">
        <input 
          type="text" 
          v-model="searchQuery" 
          @input="emitSearch"
          placeholder="Search stories..." 
          class="pl-10 py-2 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 w-full"
        >
      </div>
      <p class="text-gray-600 flex items-center space-x-1">
        by
        <img src="/src/assets/Algolia.svg" alt="Algolia Logo" class="w-20 h-6 ml-1">
      </p>
    </header>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    name: 'Header',
    emits: ['search'],
    setup(props, { emit }) {
      const searchQuery = ref('');
  
      const emitSearch = () => {
        emit('search', searchQuery.value);
      };
  
      return {
        searchQuery,
        emitSearch,
      };
    },
  };
  </script>