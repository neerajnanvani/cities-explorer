<template>
    <div class="w-full border-2 border-blue-300 flex flex-row h-30 rounded-md">
        <div class="flex grow justify-between px-5 py-2">
            <div class="w-1/2">
                <div class="flex align-middle">
                    <p class="w-24 text-lg">Name:</p>
                    <p class="ftext-gray-700 text-xl">{{ citiData.name }}</p>
                </div>

                <div class="flex align-middle">
                    <p class="w-24 text-lg">Country:</p>
                    <p class="ftext-gray-700 text-xl">{{ citiData.country }}</p>
                </div>

                <div class="flex align-middle">
                    <p class="w-24 text-lg">Region:</p>
                    <p class="ftext-gray-700 text-xl">{{ citiData.region }}</p>
                </div>
            </div>

            <div class="w-1/2">
                <div class="flex align-middle">
                    <p class="w-24 text-lg">Population:</p>
                    <p class="ftext-gray-700 text-xl">{{ citiData.population }}</p>
                </div>

                <div class="flex align-middle">
                    <p class="w-24 text-lg">Latitude:</p>
                    <p class="ftext-gray-700 text-xl">{{ citiData.latitude }}</p>
                </div>

                <div class="flex align-middle">
                    <p class="w-24 text-lg">Longitude:</p>
                    <p class="ftext-gray-700 text-xl">{{ citiData.longitude }}</p>
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
