<script setup lang="ts">
import { api } from '../api/client';

const { data, isLoading, error } = api.getPatients.useQuery(['patients']);
</script>

<template>
  <div class="patients">
    <h1>Patients</h1>
    <p v-if="isLoading">Loading...</p>
    <p v-else-if="error">Error loading patients</p>
    <ul v-else-if="data?.body">
      <li v-for="patient in data.body" :key="patient.id">
        {{ patient.firstName }} {{ patient.lastName }} ({{ patient.gender }})
      </li>
    </ul>
  </div>
</template>

<style scoped>
.patients {
  text-align: left;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}
</style>
