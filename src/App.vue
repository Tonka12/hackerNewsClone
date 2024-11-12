<template>
  <div id="app" class="flex flex-col md:flex-row min-h-screen bg-white font-sans text-sm">
    <Sidebar />
    <div class="flex-1 flex flex-col">
      <Header @search="handleSearch" />
      <FilterBar 
        v-model:storyType="storyType"
        v-model:sortBy="sortBy"
        v-model:timeRange="timeRange"
      />
      <ErrorBoundary>
        <Suspense>
          <template #default>
            <router-view 
              :stories="filteredStories"
              @load-more="loadMoreStories"
            />
          </template>
          <template #fallback>
            <div class="flex justify-center items-center h-64">
              <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-500"></div>
            </div>
          </template>
        </Suspense>
      </ErrorBoundary>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onErrorCaptured } from 'vue';
import axios from 'axios';
import Sidebar from './components/Sidebar.vue';
import Header from './components/Header.vue';
import FilterBar from './components/FilterBar.vue';
import ErrorBoundary from './components/ErrorBoundary.vue';

export default {
  name: 'App',
  components: {
    Sidebar,
    Header,
    FilterBar,
    ErrorBoundary,
  },
  setup() {
    const stories = ref([]);
    const storyType = ref('all');
    const sortBy = ref('popularity');
    const timeRange = ref('24h');
    const searchQuery = ref('');
    const page = ref(1);
    const error = ref(null);

    const filteredStories = computed(() => {
      let filtered = [...stories.value];
      
      if (storyType.value !== 'all') {
        filtered = filtered.filter(story => 
          storyType.value === 'show' ? story.title.toLowerCase().startsWith('show hn:') :
          storyType.value === 'ask' ? story.title.toLowerCase().startsWith('ask hn:') : true
        );
      }

      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(story =>
          story.title.toLowerCase().includes(query) ||
          story.by.toLowerCase().includes(query) ||
          (story.url && story.url.toLowerCase().includes(query))
        );
      }

      if (sortBy.value === 'popularity') {
        filtered.sort((a, b) => b.score - a.score);
      } else {
        filtered.sort((a, b) => b.time - a.time);
      }

      const now = Date.now() / 1000;
      const ranges = {
        '24h': 24 * 60 * 60,
        'week': 7 * 24 * 60 * 60,
        'month': 30 * 24 * 60 * 60
      };
      filtered = filtered.filter(story => now - story.time < ranges[timeRange.value]);

      return filtered;
    });

    const fetchStories = async () => {
      try {
        const topStories = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json');
        const storyPromises = topStories.data.slice((page.value - 1) * 30, page.value * 30).map(id =>
          axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        );
        const newStories = (await Promise.all(storyPromises)).map(res => ({
          ...res.data,
          showComments: false,
          comments: []
        }));
        stories.value = [...stories.value, ...newStories];
      } catch (err) {
        error.value = 'Failed to fetch stories. Please try again later.';
        console.error('Error fetching stories:', err);
      }
    };

    const loadMoreStories = () => {
      page.value++;
      fetchStories();
    };

    const handleSearch = (query) => {
      searchQuery.value = query;
    };

    onMounted(() => {
      fetchStories();
    });

    onErrorCaptured((err) => {
      error.value = 'An unexpected error occurred. Please try again later.';
      console.error('Captured error:', err);
      return true;
    });

    return {
      stories,
      filteredStories,
      storyType,
      sortBy,
      timeRange,
      handleSearch,
      loadMoreStories,
      error,
    };
  },
};
</script>