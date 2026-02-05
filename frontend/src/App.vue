<script setup lang="ts">
import TheFooter from './components/layout/TheFooter.vue';
import TheMood from './components/layout/TheMood.vue';
import TheNavBar from './components/layout/TheNavBar.vue';
</script>

<template>
  <div class="w-screen h-full bg-gray-100">
    <TheNavBar />
    <TheMood />
    <div class="mt-12 mb-12">
      <router-view />
    </div>
    <TheFooter />
  </div>
</template>

