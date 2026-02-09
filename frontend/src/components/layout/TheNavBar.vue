<script setup lang="ts">

</script>

<template>
<div class="w-full h-22 p-3 bg-white">
    <div class="h-full max-w-300 mx-auto flex flex-row gap-12 items-center">
        <img class="h-full w-auto object-contain"
            src="../../assets/company-logo.jpeg"
            alt="Company Logo" />

        <div class="w-full flex flex-row gap-6 text-xl text-brand">
            <router-link to="/" exact-active-class="font-bold" class="hover:underline cursor-pointer">Welcome</router-link>
            <router-link to="/patients" active-class="font-bold" class="hover:underline cursor-pointer">Patients</router-link>
            <a href="https://github.com/Andreas-Menzel/application-patient-care"
                target="_blank"
                class="hover:underline cursor-pointer">
                Github
            </a>
        </div>

        <span class="ml-auto text-sm bg-amber-100 text-amber-800 px-3 py-1 rounded">
            This is a <b>personal</b> and temporary project.
        </span>
    </div>
</div>
</template>

<style scoped>

</style>
