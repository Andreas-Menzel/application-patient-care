<script setup lang="ts">
const readmeFiles = [
  { name: 'README-PROJECT-REQUIREMENTS.md', desc: 'Project requirements' },
  { name: 'README-PROJECT-PLAN.md', desc: 'High-level project plan' },
  { name: 'README-DEV.md', desc: 'Tech stack overview' },
  { name: 'README-DEPLOY.md', desc: 'Deployment instructions' },
  { name: 'README-PLANNED-FEATURES.md', desc: 'Future improvements' },
]
</script>

<template>
  <div class="max-w-2xl mx-auto py-8 px-4">
    <h1 class="text-3xl font-bold text-gray-800 mb-4">Patient Care</h1>

    <p class="text-gray-600 mb-6">
      A simple patient management system demonstrating full-stack development
      from requirements analysis and planning through implementation to
      deployment on a public system.
    </p>

    <div class="mb-6">
      <RouterLink
        to="/patients"
        class="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        View Patients →
      </RouterLink>
    </div>

    <div class="border-t pt-6">
      <h2 class="text-lg font-semibold text-gray-700 mb-3">Documentation</h2>
      <ul class="space-y-1 text-sm text-gray-600">
        <li v-for="file in readmeFiles" :key="file.name">
          <span class="font-mono text-gray-800">{{ file.name }}</span>
          — {{ file.desc }}
        </li>
      </ul>
    </div>

    <div class="border-t pt-6 mt-6 text-sm text-gray-500">
      <a
        href="https://github.com/andreasrieger/application-patient-care"
        target="_blank"
        class="text-blue-600 hover:underline"
      >
        View on GitHub
      </a>
    </div>
  </div>
</template>

<style scoped>
</style>
