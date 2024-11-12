<template>
    <aside class="w-full md:w-64 bg-gray-50 border-r p-4 md:block">
      <div class="flex space-x-4 items-center mb-10">
        <img src="/src/assets/hackernews-icon-2048x2048-h8uaqp6j.png" class="rounded-lg w-16 md:w-20" alt="Hacker News Logo">
        <span class="text-lg md:text-xl font-secondary text-gray-400">Search Hacker News</span>
      </div>
      <nav class="space-y-3 text-gray-700">
        <a 
          v-for="item in sidebarItems" 
          :key="item.label" 
          href="#" 
          class="flex items-center space-x-2 hover:text-orange-500"
        >
          <span v-if="item.icon" v-html="item.icon" class="text-lg"></span>
          <span>{{ item.label }}</span>
        </a>
      </nav>
    </aside>
  </template>
  
  <script>
  export default {
    name: 'Sidebar',
    setup() {
      const sidebarItems = [
        { label: 'All', icon: '📄' },
        { label: 'Hot', icon: '🔥' },
        { label: 'Show HN', icon: '👀' },
        { label: 'Ask HN', icon: '❓' },
        { label: 'Polls', icon: '📊' },
        { label: 'Jobs', icon: '💼' },
        { label: 'Shipow', icon: '👤' },
        { label: 'Starred', icon: '⭐' }
      ];
  
      return {
        sidebarItems,
      };
    },
  };
  </script>