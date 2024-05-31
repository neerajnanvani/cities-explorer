<template>
    <div class="w-full border-2 border-blue-200 hover:border-blue-600 flex flex-row h-30 rounded-md" @click="$emit('open_near_cities')">
        <div class="flex xl:flex-row flex-col grow justify-between px-5 py-2">
            <div class="xl:w-1/2">
                <div class="flex align-middle gap-4">
                    <p class="lg:w-20 xl:w-24 w-16 text-base">Name:</p>
                    <p class="text-gray-700 lg:text-xl text-lg">{{ citiData.name }}</p>
                </div>

                <div class="flex align-middle gap-4">
                    <p class="lg:w-20 xl:w-24 w-16 lg:text-lg text-base">Country:</p>
                    <p class="text-gray-700 lg:text-xl text-lg">{{ citiData.country }}</p>
                </div>

                <div class="flex align-middle gap-4">
                    <p class="lg:w-20 xl:w-24 w-16 lg:text-lg text-base">Region:</p>
                    <p class="text-gray-700 lg:text-xl text-lg">{{ citiData.region }}</p>
                </div>
            </div>

            <div class="xl:w-1/2">
                <div class="flex align-middle gap-4">
                    <p class="lg:w-20 xl:w-24 w-16 lg:text-lg text-base">Population:</p>
                    <p class="text-gray-700 lg:text-xl text-lg">{{ citiData.population }}</p>
                </div>

                <div class="flex align-middle gap-4">
                    <p class="lg:w-20 xl:w-24 w-16 lg:text-lg text-base">Latitude:</p>
                    <p class="text-gray-700 lg:text-xl text-lg">{{ citiData.latitude }}</p>
                </div>

                <div class="flex align-middle gap-4">
                    <p class="lg:w-20 xl:w-24 w-16 lg:text-lg text-base">Longitude:</p>
                    <p class="text-gray-700 lg:text-xl text-lg">{{ citiData.longitude }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
    /**
     * citiData prop to show all details about single city
     */
    citiData: {
        type: Object,
        required: true,
    },
});
</script>
