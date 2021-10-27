<template>
  <div class="product-list">
    <search @submit="searchSubmit"></search>
  </div>
</template>

<script>
import Search from '@/components/Search.vue';

export default {
  components: {
    Search,
  },
  methods: {
    searchSubmit(form) {
      console.log(form);
    },
  },
};
</script>

<style>
</style>
