import { defineStore } from 'pinia';
import { computed, ref } from 'vue'

export const useCitiesStore = defineStore('cities', () => {
    const cities = ref([])
   
    const all_cities = computed(() => [...cities.value]);

    const total_cities = computed(() => cities.value.length);

    function append_cities(cities_data) {
        cities.value = [...cities.value, ...cities_data];
    }

    return { all_cities, append_cities, total_cities };
  })