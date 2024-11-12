<template>
    <div class="border-b border-t overflow-x-auto">
      <div class="max-w-full px-4 py-2 flex flex-wrap items-center space-x-2 sm:space-x-4 text-sm">
        <span class="font-medium">Hot</span>
        <span class="text-gray-400">in</span>
        <select v-model="storyType" class="bg-transparent border rounded px-2 py-1 text-gray-600 mb-2 sm:mb-0">
          <option value="all">Stories</option>
          <option value="show">Show HN</option>
          <option value="ask">Ask HN</option>
        </select>
        <span class="text-gray-400">by</span>
        <select v-model="sortBy" class="bg-transparent border rounded px-2 py-1 text-gray-600 mb-2 sm:mb-0">
          <option value="popularity">Popularity</option>
          <option value="date">Date</option>
        </select>
        <span class="text-gray-400">for</span>
        <select v-model="timeRange" class="bg-transparent border rounded px-2 py-1 text-gray-600">
          <option value="24h">Last 24h</option>
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
        </select>
      </div>
    </div>
  </template>
  
  <script>
  import { computed } from 'vue';
  
  export default {
    name: 'FilterBar',
    props: ['storyType', 'sortBy', 'timeRange'],
    emits: ['update:storyType', 'update:sortBy', 'update:timeRange'],
    setup(props, { emit }) {
      const storyType = computed({
        get: () => props.storyType,
        set: (value) => emit('update:storyType', value),
      });
  
      const sortBy = computed({
        get: () => props.sortBy,
        set: (value) => emit('update:sortBy', value),
      });
  
      const timeRange = computed({
        get: () => props.timeRange,
        set: (value) => emit('update:timeRange', value),
      });
  
      return {
        storyType,
        sortBy,
        timeRange,
      };
    },
  };
  </script>