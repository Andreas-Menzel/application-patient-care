<script setup lang="ts">
import { computed, ref } from 'vue';


const editActiveDemographics = ref(false);
const editActiveContactDetails = ref(false);
const editActiveAny = computed(() => editActiveDemographics.value || editActiveContactDetails.value);
</script>

<template>
<div class="max-w-300 mx-auto flex flex-col gap-10">

    <router-link to="/patients" class="flex items-center gap-2 text-content-muted hover:text-content-main transition-colors w-fit">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Back to patients
    </router-link>
  
    <div class="flex flex-row gap-12 justify-between items-center w-full p-9 bg-surface-card border-2 border-outline rounded-container">
        <div class="flex flex-row gap-12 items-center">
            <div class="flex items-center justify-center w-28 h-28 rounded-full bg-brand-soft border-6 border-surface-primary shadow-xl">
                <span class="text-4xl font-bold text-brand">
                    AM
                </span>
            </div>

            <div class="flex flex-col gap-2">
                <span class="text-xl font-bold text-content-main">
                    Andreas Menzel
                </span>
                
                <div class="flex flex-row gap-3 text-content-muted">
                    <span>ID: 1</span>
                    <span>-</span>
                    <span>male</span>
                    <span>-</span>
                    <span>25 years</span>
                </div>
            </div>
        </div>
        <button
            type="button"
            class="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 shadow-xs font-medium leading-5 rounded-element text-sm px-4 py-2.5 focus:outline-none cursor-pointer hover:bg-red-100 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
            Delete
        </button>
    </div>

    <div class="grid grid-cols-2 gap-6">

        <div class="h-fit flex flex-col bg-surface-card border-2 border-outline rounded-card overflow-hidden">
            <div class="h-16 flex flex-row justify-between items-center bg-surface-secondary p-3 pl-4">
                <span class="font-bold text-content-main">
                    Demographics
                </span>
                <div class="flex flex-row gap-3">
                    <div v-if="editActiveDemographics" class="flex flex-row gap-3">
                        <button
                            type="button"
                            class="flex items-center gap-2 text-white bg-green-600 border border-transparent shadow-xs font-medium leading-5 rounded-element text-sm px-4 py-2.5 focus:outline-none cursor-pointer hover:bg-green-700 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            Save
                        </button>
                        <button
                            @click="editActiveDemographics = false"
                            type="button"
                            class="flex items-center gap-2 text-content-main bg-surface-primary border border-outline shadow-xs font-medium leading-5 rounded-element text-sm px-4 py-2.5 focus:outline-none cursor-pointer hover:bg-surface-secondary transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                            Discard
                        </button>
                    </div>
                    <button
                        v-else-if="!editActiveAny"
                        @click="editActiveDemographics = true"
                        type="button"
                        class="flex items-center gap-2 text-brand-foreground bg-brand border border-transparent shadow-xs font-medium leading-5 rounded-element text-sm px-4 py-2.5 focus:outline-none cursor-pointer hover:bg-brand-90 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                        Edit
                    </button>
                </div>
            </div>

            <div class="flex flex-col gap-3 p-3">
                <div class="pl-1">
                    <label for="firstName" class="block mb-2.5 text-sm font-medium text-content-muted">
                        First Name
                    </label>
                    <template v-if="editActiveDemographics">
                        <input type="text"
                            id="firstName"
                            class="bg-surface-primary border border-outline text-content-main text-sm rounded-element focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs placeholder:text-content-muted"
                            placeholder="John"
                            required />
                    </template>
                    <template v-else>
                        <span class="text-content-main">John</span>
                    </template>
                </div>

                <hr class="border-0 h-0.5 bg-surface-secondary">

                <div class="pl-1">
                    <label for="lastName" class="block mb-2.5 text-sm font-medium text-content-muted">
                        Last Name
                    </label>
                    <template v-if="editActiveDemographics">
                        <input type="text"
                            id="lastName"
                            class="bg-surface-primary border border-outline text-content-main text-sm rounded-element focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs placeholder:text-content-muted"
                            placeholder="Doe"
                            required />
                    </template>
                    <template v-else>
                        <span class="text-content-main">Doe</span>
                    </template>
                </div>

                <hr class="border-0 h-0.5 bg-surface-secondary">

                <div class="pl-1">
                    <label for="gender" class="block mb-2.5 text-sm font-medium text-content-muted">
                        Gender
                    </label>
                    <template v-if="editActiveDemographics">
                        <select
                            id="gender"
                            class="bg-surface-primary border border-outline text-content-main text-sm rounded-element focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs"
                            required>
                            <option>male</option>
                            <option>female</option>
                        </select>
                    </template>
                    <template v-else>
                        <span class="text-content-main">male</span>
                    </template>
                </div>

                <hr class="border-0 h-0.5 bg-surface-secondary">

                <div class="pl-1">
                    <label for="dateOfBirth" class="block mb-2.5 text-sm font-medium text-content-muted">
                        Date of Birth
                    </label>
                    <template v-if="editActiveDemographics">
                        <input type="date"
                            id="dateOfBirth"
                            class="bg-surface-primary border border-outline text-content-main text-sm rounded-element focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs"
                            required />
                    </template>
                    <template v-else>
                        <span class="text-content-main">01.01.1970</span>
                    </template>
                </div>
            </div>
        </div>

        <div class="h-fit flex flex-col bg-surface-card border-2 border-outline rounded-card overflow-hidden">
            <div class="h-16 flex flex-row justify-between items-center bg-surface-secondary p-3 pl-4">
                <span class="font-bold text-content-main">
                    Contact Details
                </span>
                <div class="flex flex-row gap-3">
                    <div v-if="editActiveContactDetails" class="flex flex-row gap-3">
                        <button
                            type="button"
                            class="flex items-center gap-2 text-white bg-green-600 border border-transparent shadow-xs font-medium leading-5 rounded-element text-sm px-4 py-2.5 focus:outline-none cursor-pointer hover:bg-green-700 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            Save
                        </button>
                        <button
                            @click="editActiveContactDetails = false"
                            type="button"
                            class="flex items-center gap-2 text-content-main bg-surface-primary border border-outline shadow-xs font-medium leading-5 rounded-element text-sm px-4 py-2.5 focus:outline-none cursor-pointer hover:bg-surface-secondary transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                            Discard
                        </button>
                    </div>
                    <button
                        v-else-if="!editActiveAny"
                        @click="editActiveContactDetails = true"
                        type="button"
                        class="flex items-center gap-2 text-brand-foreground bg-brand border border-transparent shadow-xs font-medium leading-5 rounded-element text-sm px-4 py-2.5 focus:outline-none cursor-pointer hover:bg-brand-90 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                        Edit
                    </button>
                </div>
            </div>

            <div class="flex flex-col gap-3 p-3">
                <div class="pl-1">
                    <label for="email" class="block mb-2.5 text-sm font-medium text-content-muted">
                        E-Mail
                    </label>
                    <template v-if="editActiveContactDetails">
                        <input type="email"
                            id="email"
                            class="bg-surface-primary border border-outline text-content-main text-sm rounded-element focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs placeholder:text-content-muted"
                            placeholder="john-doe@example.com"
                            required />
                    </template>
                    <template v-else>
                        <span class="text-content-main">
                            john-doe@example.com
                        </span>
                    </template>
                </div>

                <hr class="border-0 h-0.5 bg-surface-secondary">

                <div class="pl-1">
                    <label for="phone" class="block mb-2.5 text-sm font-medium text-content-muted">
                        Phone
                    </label>
                    <template v-if="editActiveContactDetails">
                        <input type="tel"
                            id="phone"
                            class="bg-surface-primary border border-outline text-content-main text-sm rounded-element focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs placeholder:text-content-muted"
                            placeholder="01234/56789"
                            required />
                    </template>
                    <template v-else>
                        <span class="text-content-main">
                            01234/56789
                        </span>
                    </template>
                </div>

                <hr class="border-0 h-0.5 bg-surface-secondary">

                <div class="pl-1">
                    <label for="mobile" class="block mb-2.5 text-sm font-medium text-content-muted">
                        Mobile
                    </label>
                    <template v-if="editActiveContactDetails">
                        <input type="tel"
                            id="mobile"
                            class="bg-surface-primary border border-outline text-content-main text-sm rounded-element focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs placeholder:text-content-muted"
                            placeholder="01234/56789"
                            required />
                    </template>
                    <template v-else>
                        <span class="text-content-main">
                            01234/56789
                        </span>
                    </template>
                </div>
            </div>
        </div>

        <div class="h-fit flex flex-col bg-surface-card border-2 border-outline rounded-card overflow-hidden">
            <div class="bg-surface-secondary p-3 pl-4">
                <span class="font-bold text-content-main">
                    Upcoming Appointments
                </span>
            </div>

            <div class="flex flex-col gap-3 p-3">
                <div class="pl-1">
                    <span class="text-content-main">
                        09.02.2026: Showcase Programming Exercise
                    </span>
                </div>

                <hr class="border-0 h-0.5 bg-surface-secondary">

                <div class="pl-1">
                    <span class="text-content-main">
                        01.03.2026: First day at work
                    </span>
                </div>
            </div>
        </div>

    </div>

</div>
</template>

<style scoped>

</style>
