import { defineStore } from 'pinia';
import { computed, ref } from 'vue'

export const useCitiesStore = defineStore('cities', () => {

    // state
    const cities = ref([]);

    const near_cities = ref({});

    // getters
    const getNearCitiesById = (id) => {
        return (computed(() => near_cities.value[id] ?? null)).value;
    };
   
    const all_cities = computed(() => [...cities.value]);

    const total_cities = computed(() => cities.value.length);

    // actions
    function append_cities(cities_data) {
        cities.value = [...cities.value, ...cities_data];
    }

    function append_near_cities(id, cities_data) {
        near_cities.value[id] = cities_data;
    }

    return { all_cities, append_cities, total_cities, getNearCitiesById, append_near_cities };
  })