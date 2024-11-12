<template>
    <div v-if="story" class="max-w-4xl mx-auto p-4 sm:p-6">
      <h1 class="text-xl sm:text-2xl font-bold mb-4">{{ story.title }}</h1>
      <div class="flex flex-wrap items-center space-x-2 text-gray-500 mb-4">
        <span>{{ story.score }} points</span>
        <span>•</span>
        <span>by {{ story.by }}</span>
        <span>•</span>
        <span>{{ timeAgo(story.time) }}</span>
      </div>
      <a :href="story.url" target="_blank" class="text-blue-500 hover:underline mb-6 block break-words">{{ story.url }}</a>
      <div v-if="story.text" class="mb-6 text-gray-700" v-html="sanitizeHTML(story.text)"></div>
      <h2 class="text-lg sm:text-xl font-semibold mb-4">Comments ({{ story.descendants || 0 }})</h2>
      <div v-if="comments.length" class="space-y-4">
        <div v-for="comment in comments" :key="comment.id" class="border-l-2 border-gray-200 pl-4">
          <div class="flex flex-wrap items-center space-x-2 text-gray-500 mb-2">
            <span class="font-medium">{{ comment.by }}</span>
            <span>{{ timeAgo(comment.time) }}</span>
          </div>
          <div class="text-gray-700" v-html="sanitizeHTML(comment.text)"></div>
        </div>
      </div>
      <div v-else-if="loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-500"></div>
      </div>
      <div v-else class="text-gray-500">No comments yet.</div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import DOMPurify from 'dompurify';
  
  export default {
    name: 'StoryDetail',
    props: ['id'],
    setup(props) {
      const story = ref(null);
      const comments = ref([]);
      const loading = ref(true);
  
      const fetchStory = async () => {
        try {
          const response = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${props.id}.json`);
          story.value = response.data;
          await fetchComments();
        } catch (error) {
          console.error('Error fetching story:', error);
        } finally {
          loading.value = false;
        }
      };
  
      const fetchComments = async () => {
        if (story.value.kids) {
          const commentPromises = story.value.kids.map(id => 
            axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
          );
          comments.value = (await Promise.all(commentPromises)).map(res => res.data);
        }
      };
  
      const timeAgo = (timestamp) => {
        const diff = Math.floor((Date.now() / 1000 - timestamp) / 60);
        if (diff < 60) return `${diff}m ago`;
        const hours = Math.floor(diff / 60);
        if (hours < 24) return `${hours}h ago`;
        const days = Math.floor(hours / 24);
        return `${days}d ago`;
      };
  
      const sanitizeHTML = (html) => {
        return DOMPurify.sanitize(html);
      };
  
      onMounted(() => {
        fetchStory();
      });
  
      return {
        story,
        comments,
        loading,
        timeAgo,
        sanitizeHTML,
      };
    },
  };
  </script>