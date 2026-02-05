<script setup lang="ts">
import { api } from '../../api/client';
import Patient from './Patient.vue';

const { data, isLoading, error } = api.patients.getPatients.useQuery(['patients']);

// Sample data for now
// TODO: load from backend
const patients = [
{ id: 1, initials: 'ER', name: 'Eleanor Rigby', email: 'eleanor.r@example.com', patientId: 'PT-2024-8492', age: '42 yrs', gender: 'Female', lastVisit: '2024-10-24' },
{ id: 2, initials: 'JD', name: 'John Doe', email: 'j.doe@example.com', patientId: 'PT-2024-8493', age: '49 yrs', gender: 'Male', lastVisit: '2024-11-01' },
{ id: 3, initials: 'SC', name: 'Sarah Connor', email: 's.connor@example.com', patientId: 'PT-2024-8494', age: '59 yrs', gender: 'Female', lastVisit: '2023-12-15' },
{ id: 4, initials: 'MC', name: 'Michael Chen', email: 'm.chen@example.com', patientId: 'PT-2024-8495', age: '34 yrs', gender: 'Male', lastVisit: '2024-10-30' },
{ id: 5, initials: 'AP', name: 'Amelia Pond', email: 'amy.pond@example.com', patientId: 'PT-2024-8496', age: '35 yrs', gender: 'Female', lastVisit: '2024-09-10' },
];
</script>

<template>
<div class="max-w-300 mx-auto">
    
    <!-- Search Section -->
    
    <!-- Patient List -->
    <div class="w-full bg-surface-card border-2 border-outline rounded-card overflow-hidden shadow-sm">
        <div class="grid grid-cols-[2fr_1fr_1fr_1fr_60px] bg-surface-secondary px-6 py-4 border-b border-outline">
            <span class="text-xs font-bold uppercase tracking-wider text-content-muted">Patient Name</span>
            <span class="text-xs font-bold uppercase tracking-wider text-content-muted">Patient ID</span>
            <span class="text-xs font-bold uppercase tracking-wider text-content-muted">Demographics</span>
            <span class="text-xs font-bold uppercase tracking-wider text-content-muted">Last Visit</span>
            <span class="text-xs font-bold uppercase tracking-wider text-content-muted text-center">Actions</span>
        </div>
        
        <div class="flex flex-col">
            <router-link :to="'/patient/' + patient.id"
            v-for="patient in patients" 
            :key="patient.id"
            class="grid grid-cols-[2fr_1fr_1fr_1fr_60px] items-center px-6 py-4 border-b last:border-b-0 border-outline hover:bg-gray-50 transition-colors"
            >
                <div class="flex items-center gap-4">
                    <div class="flex items-center justify-center w-10 h-10 rounded-full bg-brand-soft text-brand font-bold text-sm shrink-0">
                        {{ patient.initials }}
                    </div>
                    <div class="flex flex-col">
                        <span class="font-bold text-content-main">{{ patient.name }}</span>
                        <span class="text-sm text-content-muted">{{ patient.email }}</span>
                    </div>
                </div>
                
                <span class="text-sm text-content-muted">{{ patient.patientId }}</span>
                
                <span class="text-sm text-content-muted">{{ patient.age }} · {{ patient.gender }}</span>
                
                <span class="text-sm text-content-muted">{{ patient.lastVisit }}</span>
                
                <div class="flex justify-center">
                    <button class="p-1 hover:bg-surface-secondary rounded-full transition-colors cursor-pointer text-content-muted">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                    </button>
                </div>
            </router-link>
        </div>
        
        <div class="flex items-center justify-between px-6 py-4 bg-surface-secondary">
            <span class="text-sm text-content-muted">
                Showing {{ patients.length }} of {{ patients.length }} results
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
