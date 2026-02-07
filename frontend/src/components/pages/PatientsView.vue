<script setup lang="ts">
import { computed } from 'vue';
import { api } from '../../api/client';

const { data, isLoading, error } = api.patients.getPatients.useQuery(['patients']);

const patients = computed(() => data.value?.body ?? []);

const getInitials = (firstName: string, lastName: string) =>
    `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

const formatDate = (timestamp: number) =>
    new Date(timestamp).toLocaleDateString('de-DE');
</script>

<template>
<div class="max-w-300 mx-auto">
    
    <!-- Search Section -->
    
    <!-- Patient List -->
    <div class="w-full bg-surface-card border-2 border-outline rounded-card overflow-hidden shadow-sm">
        <div class="grid grid-cols-[2fr_1fr_1fr_1fr_60px] bg-surface-secondary px-6 py-4 border-b border-outline">
            <span class="text-xs font-bold uppercase tracking-wider text-content-muted">Patient Name</span>
            <span class="text-xs font-bold uppercase tracking-wider text-content-muted">ID</span>
            <span class="text-xs font-bold uppercase tracking-wider text-content-muted">Gender</span>
            <span class="text-xs font-bold uppercase tracking-wider text-content-muted">Created</span>
            <span class="text-xs font-bold uppercase tracking-wider text-content-muted text-center">Actions</span>
        </div>
        
        <div v-if="isLoading" class="px-6 py-8 text-center text-content-muted">
            Loading patients...
        </div>

        <div v-else-if="error" class="px-6 py-8 text-center text-red-500">
            Error loading patients
        </div>

        <div v-else class="flex flex-col">
            <router-link :to="'/patient/' + patient.id"
            v-for="patient in patients"
            :key="patient.id"
            class="grid grid-cols-[2fr_1fr_1fr_1fr_60px] items-center px-6 py-4 border-b last:border-b-0 border-outline hover:bg-gray-50 transition-colors"
            >
                <div class="flex items-center gap-4">
                    <div class="flex items-center justify-center w-10 h-10 rounded-full bg-brand-soft text-brand font-bold text-sm shrink-0">
                        {{ getInitials(patient.firstName, patient.lastName) }}
                    </div>
                    <div class="flex flex-col">
                        <span class="font-bold text-content-main">{{ patient.firstName }} {{ patient.lastName }}</span>
                    </div>
                </div>

                <span class="text-sm text-content-muted">{{ patient.id }}</span>

                <span class="text-sm text-content-muted">{{ patient.gender }}</span>

                <span class="text-sm text-content-muted">{{ formatDate(patient.createdAt) }}</span>

                <div class="flex justify-center">
                    <button class="p-1 hover:bg-surface-secondary rounded-full transition-colors cursor-pointer text-content-muted">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                    </button>
                </div>
            </router-link>
        </div>
        
        <div v-if="!isLoading && !error" class="flex items-center justify-between px-6 py-4 bg-surface-secondary">
            <span class="text-sm text-content-muted">
                Showing {{ patients.length }} results
            </span>
            <div class="flex gap-2">
                <button class="px-4 py-2 text-sm font-medium border border-outline rounded-element bg-surface-primary text-content-muted cursor-not-allowed opacity-50">
                    Previous
                </button>
                <button class="px-4 py-2 text-sm font-medium border border-outline rounded-element bg-surface-primary text-content-muted cursor-not-allowed opacity-50">
                    Next
                </button>
            </div>
        </div>
    </div>
    
</div>
</template>

<style scoped>

</style>
