<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQueryClient } from '@tanstack/vue-query';
import { api } from '../../api/client';
import type { PatientUpdate } from 'shared';

const route = useRoute();
const router = useRouter();
const queryClient = useQueryClient();
const patientId = computed(() => route.params.id as string);
const isCreating = computed(() => !patientId.value);

const { data, isLoading, error } = api.patients.getPatient.useQuery(
    ['patient', patientId],
    () => ({ params: { id: patientId.value } }),
    { enabled: computed(() => !!patientId.value) }
);

const patient = computed(() => data.value?.body);
const editingPatient = ref<PatientUpdate | null>(null);

const getInitials = (firstName: string, lastName: string) =>
    `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

const editActive = ref(false);
const isSaving = ref(false);
const saveError = ref<string | null>(null);

const { mutateAsync: updatePatient } = api.patients.updatePatient.useMutation();
const { mutateAsync: createPatient } = api.patients.createPatient.useMutation();
const { mutateAsync: deletePatientMutation } = api.patients.deletePatient.useMutation();

const isDeleting = ref(false);

// Initialize create mode
watch(isCreating, (creating) => {
    if (creating) {
        editActive.value = true;
        editingPatient.value = {
            firstName: '',
            lastName: '',
            gender: 'male',
            email: null,
            phone: null,
            mobile: null,
        };
    }
}, { immediate: true });

function activateEdit() {
    editActive.value = true;
    saveError.value = null;
    editingPatient.value = JSON.parse(JSON.stringify(patient.value));
}

async function saveChanges() {
    if (!editingPatient.value) return;

    isSaving.value = true;
    saveError.value = null;

    try {
        if (isCreating.value) {
            if (!editingPatient.value.firstName || !editingPatient.value.lastName || !editingPatient.value.gender) {
                const missingFields = [];
                if (!editingPatient.value.firstName) missingFields.push('first name');
                if (!editingPatient.value.lastName) missingFields.push('last name');
                if (!editingPatient.value.gender) missingFields.push('gender');
                
                saveError.value = "The following fields are required: " + missingFields.join(', ') + ".";                return;
            }

            const response = await createPatient({
                body: {
                    firstName: editingPatient.value.firstName,
                    lastName: editingPatient.value.lastName,
                    gender: editingPatient.value.gender,
                    email: editingPatient.value.email ?? null,
                    phone: editingPatient.value.phone ?? null,
                    mobile: editingPatient.value.mobile ?? null,
                },
            });

            if (response.status === 201) {
                editActive.value = false;
                queryClient.invalidateQueries({ queryKey: ['patients'] });
                router.push(`/patient/${response.body.id}`);
            } else {
                saveError.value = 'Failed to create patient';
            }
        } else {
            const response = await updatePatient({
                params: { id: patientId.value },
                body: {
                    firstName: editingPatient.value.firstName,
                    lastName: editingPatient.value.lastName,
                    gender: editingPatient.value.gender,
                    email: editingPatient.value.email,
                    phone: editingPatient.value.phone,
                    mobile: editingPatient.value.mobile,
                },
            });

            if (response.status === 200) {
                editActive.value = false;
                queryClient.invalidateQueries({ queryKey: ['patient', patientId] });
                queryClient.invalidateQueries({ queryKey: ['patients'] });
            } else {
                saveError.value = 'Failed to save changes';
            }
        }
    } catch (e) {
        saveError.value = 'An error occurred while saving';
    } finally {
        isSaving.value = false;
    }
}

function discardChanges() {
    editActive.value = false;
    saveError.value = null;
}

async function deletePatient() {
    if (!confirm('Are you sure you want to delete this patient?')) return;

    isDeleting.value = true;
    saveError.value = null;

    try {
        const response = await deletePatientMutation({
            params: { id: patientId.value },
        });

        if (response.status === 204) {
            queryClient.invalidateQueries({ queryKey: ['patients'] });
            router.push('/patients');
        } else {
            saveError.value = 'Failed to delete patient';
        }
    } catch (e) {
        saveError.value = 'An error occurred while deleting';
    } finally {
        isDeleting.value = false;
    }
}
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

    <div v-if="!isCreating && isLoading" class="text-center text-content-muted py-12">
        Loading patient...
    </div>

    <div v-else-if="!isCreating && error" class="text-center text-red-500 py-12">
        Error loading patient
    </div>

    <template v-else-if="patient || isCreating">
        <div class="flex flex-row gap-12 justify-between items-center w-full p-9 bg-surface-card border-2 border-outline rounded-container">
            <div class="flex flex-row gap-12 items-center">
                <div class="flex items-center justify-center w-28 h-28 rounded-full bg-brand-soft border-6 border-surface-primary shadow-xl">
                    <span v-if="isCreating" class="text-4xl font-bold text-brand">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </span>
                    <span v-else class="text-4xl font-bold text-brand">
                        {{ getInitials(patient!.firstName, patient!.lastName) }}
                    </span>
                </div>

                <div class="flex flex-col gap-2">
                    <span class="text-xl font-bold text-content-main">
                        <template v-if="isCreating">New Patient</template>
                        <template v-else>{{ patient!.firstName }} {{ patient!.lastName }}</template>
                    </span>

                    <div v-if="!isCreating" class="flex flex-row gap-3 text-content-muted">
                        <span>ID: {{ patient!.id }}</span>
                        <span>-</span>
                        <span>{{ patient!.gender }}</span>
                    </div>
                </div>
            </div>
            <div class="flex flex-row gap-3">
                <div v-if="editActive" class="flex flex-row gap-3">
                    <button
                        @click="saveChanges"
                        type="button"
                        :disabled="isSaving"
                        class="flex items-center gap-2 text-white bg-green-600 border border-transparent shadow-xs font-medium leading-5 rounded-element text-sm px-4 py-2.5 focus:outline-none cursor-pointer hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                        <svg v-if="!isSaving" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <svg v-else class="w-4 h-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {{ isSaving ? 'Saving...' : (isCreating ? 'Create' : 'Save') }}
                    </button>
                    <button
                        v-if="!isCreating"
                        @click="discardChanges"
                        type="button"
                        class="flex items-center gap-2 text-content-main bg-surface-primary border border-outline shadow-xs font-medium leading-5 rounded-element text-sm px-4 py-2.5 focus:outline-none cursor-pointer hover:bg-surface-secondary transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                        Discard
                    </button>
                </div>
                <template v-else>
                    <button
                        @click="deletePatient"
                        type="button"
                        :disabled="isDeleting"
                        class="w-full flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 shadow-xs font-medium leading-5 rounded-element text-sm px-4 py-2.5 focus:outline-none cursor-pointer hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                        <svg v-if="!isDeleting" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                        <svg v-else class="w-5 h-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {{ isDeleting ? 'Deleting...' : 'Delete' }}
                    </button>
                    <button
                        @click="activateEdit"
                        type="button"
                        class="flex items-center gap-2 text-brand-foreground bg-brand border border-transparent shadow-xs font-medium leading-5 rounded-element text-sm px-4 py-2.5 focus:outline-none cursor-pointer hover:bg-brand-90 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                        Edit
                    </button>
                </template>
            </div>
        </div>

        <div v-if="saveError" class="p-4 bg-red-50 border border-red-200 rounded-element text-red-600 text-sm">
            {{ saveError }}
        </div>

    <div class="grid grid-cols-2 gap-6">

        <div class="h-fit flex flex-col bg-surface-card border-2 border-outline rounded-card overflow-hidden">
            <div class="h-16 flex flex-row justify-between items-center bg-surface-secondary p-3 pl-4">
                <span class="font-bold text-content-main">
                    Demographics
                </span>
            </div>

            <div class="flex flex-col gap-3 p-3">
                <div class="pl-1">
                    <label for="firstName" class="block mb-2.5 text-sm font-medium text-content-muted">
                        First Name
                    </label>
                    <template v-if="editActive && editingPatient">
                        <input type="text"
                            id="firstName"
                            v-model="editingPatient.firstName"
                            class="bg-surface-primary border border-outline text-content-main text-sm rounded-element focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs placeholder:text-content-muted"
                            placeholder="John"
                            required />
                    </template>
                    <template v-else>
                        <span class="text-content-main">{{ patient!.firstName }}</span>
                    </template>
                </div>

                <hr class="border-0 h-0.5 bg-surface-secondary">

                <div class="pl-1">
                    <label for="lastName" class="block mb-2.5 text-sm font-medium text-content-muted">
                        Last Name
                    </label>
                    <template v-if="editActive && editingPatient">
                        <input type="text"
                            id="lastName"
                            v-model="editingPatient.lastName"
                            class="bg-surface-primary border border-outline text-content-main text-sm rounded-element focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs placeholder:text-content-muted"
                            placeholder="Doe"
                            required />
                    </template>
                    <template v-else>
                        <span class="text-content-main">{{ patient!.lastName }}</span>
                    </template>
                </div>

                <hr class="border-0 h-0.5 bg-surface-secondary">

                <div class="pl-1">
                    <label for="gender" class="block mb-2.5 text-sm font-medium text-content-muted">
                        Gender
                    </label>
                    <template v-if="editActive && editingPatient">
                        <select
                            id="gender"
                            v-model="editingPatient.gender"
                            class="bg-surface-primary border border-outline text-content-main text-sm rounded-element focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs"
                            required>
                            <option value="male">male</option>
                            <option value="female">female</option>
                        </select>
                    </template>
                    <template v-else>
                        <span class="text-content-main">{{ patient!.gender }}</span>
                    </template>
                </div>
            </div>
        </div>

        <div class="h-fit flex flex-col bg-surface-card border-2 border-outline rounded-card overflow-hidden">
            <div class="h-16 flex flex-row justify-between items-center bg-surface-secondary p-3 pl-4">
                <span class="font-bold text-content-main">
                    Contact Details
                </span>
            </div>

            <div class="flex flex-col gap-3 p-3">
                <div class="pl-1">
                    <label for="email" class="block mb-2.5 text-sm font-medium text-content-muted">
                        E-Mail
                    </label>
                    <template v-if="editActive && editingPatient">
                        <input type="email"
                            id="email"
                            v-model="editingPatient.email"
                            class="bg-surface-primary border border-outline text-content-main text-sm rounded-element focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs placeholder:text-content-muted"
                            placeholder="john-doe@example.com" />
                    </template>
                    <template v-else>
                        <span class="text-content-main">
                            {{ patient!.email ?? '-' }}
                        </span>
                    </template>
                </div>

                <hr class="border-0 h-0.5 bg-surface-secondary">

                <div class="pl-1">
                    <label for="phone" class="block mb-2.5 text-sm font-medium text-content-muted">
                        Phone
                    </label>
                    <template v-if="editActive && editingPatient">
                        <input type="tel"
                            id="phone"
                            v-model="editingPatient.phone"
                            class="bg-surface-primary border border-outline text-content-main text-sm rounded-element focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs placeholder:text-content-muted"
                            placeholder="01234/56789" />
                    </template>
                    <template v-else>
                        <span class="text-content-main">
                            {{ patient!.phone ?? '-' }}
                        </span>
                    </template>
                </div>

                <hr class="border-0 h-0.5 bg-surface-secondary">

                <div class="pl-1">
                    <label for="mobile" class="block mb-2.5 text-sm font-medium text-content-muted">
                        Mobile
                    </label>
                    <template v-if="editActive && editingPatient">
                        <input type="tel"
                            id="mobile"
                            v-model="editingPatient.mobile"
                            class="bg-surface-primary border border-outline text-content-main text-sm rounded-element focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs placeholder:text-content-muted"
                            placeholder="01234/56789" />
                    </template>
                    <template v-else>
                        <span class="text-content-main">
                            {{ patient!.mobile ?? '-' }}
                        </span>
                    </template>
                </div>
            </div>
        </div>

        <div v-if="!isCreating" class="h-fit flex flex-col bg-surface-card border-2 border-outline rounded-card overflow-hidden">
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
    </template>

</div>
</template>

<style scoped>

</style>
