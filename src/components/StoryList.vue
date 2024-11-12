<template>
    <main class="max-w-4xl mx-auto p-4">
      <div v-if="stories.length" class="space-y-6">
        <div v-for="story in stories" :key="story.id" class="group">
          <div class="flex flex-col sm:flex-row sm:items-start sm:space-x-4">
            <div class="flex-1">
              <h3 class="text-base font-normal">
                <router-link :to="{ name: 'story', params: { id: story.id } }" class="hover:text-orange-500">
                  {{ story.title }}
                </router-link>
              </h3>
              <div class="flex flex-wrap items-center space-x-2 mt-1 text-gray-500">
                <span>{{ story.score }} points</span>
                <span>•</span>
                <span>{{ story.by }}</span>
                <span>•</span>
                <span>{{ timeAgo(story.time) }}</span>
                <span>•</span>
                <a :href="story.url" target="_blank" class="text-gray-400 hover:text-orange-500 break-all">{{ getDomain(story.url) }}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-500"></div>
      </div>
      <div v-else class="text-center py-10">
        <p class="text-gray-500">No stories found.</p>
      </div>
      <div class="mt-8 text-center">
        <button @click="$emit('load-more')" class="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
          Load More
        </button>
      </div>
    </main>
  </template>
  
  
  <script>
  import { ref, onMounted } from 'vue';
  
  export default {
    name: 'StoryList',
    props: ['stories'],
    emits: ['load-more'],
    setup() {
      const loading = ref(true);
  
      const timeAgo = (timestamp) => {
        const diff = Math.floor((Date.now() / 1000 - timestamp) / 60);
        if (diff < 60) return `${diff}m`;
        const hours = Math.floor(diff / 60);
        if (hours < 24) return `${hours}h`;
        const days = Math.floor(hours / 24);
        return `${days}d`;
      };
  
      const getDomain = (url) => {
        if (!url) return '';
        try {
          return new URL(url).hostname.replace('www.', '');
        } catch {
          return url;
        }
      };
  
      onMounted(() => {
        loading.value = false;
      });
  
      return {
        loading,
        timeAgo,
        getDomain,
      };
    },
  };
  </script>