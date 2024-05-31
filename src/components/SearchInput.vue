<template>
    <div class="mt-1 relative rounded-md shadow-sm w-1/2">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlass class="h-5 w-5 text-gray-600 text-blue-800" aria-hidden="true" />
            <span class="mx-2 text-gray-500"> | </span>
        </div>
        <input :value="modelValue"  @input="$emit('update:modelValue', $event.target.value)"
         type="text" autocomplete="off" class="focus:ring-cyan-500 focus:border-blue-500 block w-full pl-14 sm:text-sm border-gray-500 rounded-2xl h-10 
              bg-gradient-to-r from-cyan-400 to-blue-400  text-blue-800" />
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import MagnifyingGlass from "@heroicons/vue/24/solid/MagnifyingGlassIcon";

defineProps({
    /**
     * Model value prop to bind input tag value 
     */
    modelValue: {
        type: String,
        required: true,
    }
})

// emit to update the current input value to parent component
defineEmits(['update:modelValue'])
</script>