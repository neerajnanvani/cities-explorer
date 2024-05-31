<template>
    <div v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm"
        @click.self="closeModal">
        <div class="bg-white p-6 rounded-lg shadow-lg 2xl:w-1/2 xl:w-8/12 lg:w-9/12 md:w-10/12 w-11/12">
            <div class="w-full">
                <h3 class="text-center text-2xl font-extrabold pb-5">Nearby Cities</h3>
            </div>
            <hr />

            <div v-if="!isItemsLoaded && !nearbyCities.length">
                <div class="h-32 w-full flex justify-center items-center">
                    <div class="flex h-32 w-full items-center justify-center">
                        <div
                            class="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-cyan-500 to-pink-500 animate-spin">
                            <div class="h-9 w-9 rounded-full bg-gray-200"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else-if="nearbyCities.length">
                <div v-for="(citi, index) in nearbyCities" :key=citi>
                    <div class="flex flex-wrap text-xl my-3">
                        <p class="mr-2 "> {{index + 1 }}. </p>

                        <p class="mx-2 font-light text-slate-500"> Name: </p>
                        <p class="mr-3 font-bold"> {{citi.name}} </p> 
                        |
                        <p class="mx-2 text-slate-500"> Country: </p>
                        <p class="mr-3"> {{citi.country}} </p>  
                        |
                        <p class="mx-2 text-slate-500"> Region: </p>
                        <p class="mr-3"> {{citi.region}} </p>  
                        |
                        <p class="mx-2 text-slate-500"> Distance: </p>
                        <p class="mr-3"> {{citi.distance}} </p> 
                    </div>
                    <hr />
                </div>
                
            </div>

            <div v-else class="w-full h-full">
                <hr />
                <p class="text-3xl w-full h-40 flex justify-center items-center">
                    No results Found
                </p>
            </div>
            <button @click="closeModal" class="mt-4 px-4 py-2 bg-red-500 text-white rounded">Close</button>
        </div>
    </div>
</template>
<script setup>
import {ref, defineProps, watch, defineEmits} from "vue";
import { useCitiesStore } from '@/store/cities.js';
import api_service from "@/api/api_service";
import api_points from "@/api/api_points";

const store = useCitiesStore();

const props = defineProps( {
    /**
     * City_id prop to get the id of city and then fetch the data
     */
    city_id: {
        type: String,
        default: '',
    }
});

// reactive varibles needed
const nearbyCities = ref([]);
const isItemsLoaded = ref(false);
const isOpen = ref(false);

// emit to inform parent component any sort of event
const emit = defineEmits(['close_modal']);

/**
 * Function to close the modal and reset the values
 */
function closeModal() {
    isOpen.value = false;
    isItemsLoaded.value = false;
    nearbyCities.value = []
    emit('close_modal');
}

/**
 * Function to toggle the modal open and close state
 */
function toggleModal() {
    isOpen.value = !isOpen.value;
}

/**
 * Funtion to fetch near city list
 */
async function fetchNearCitiesList() {

    const currentCityData = store.getNearCitiesById(props.city_id);

    if(currentCityData) {
        nearbyCities.value = currentCityData;
        isItemsLoaded.value = true;
        return;
    }

    try {
        const response = await api_service.get(`${api_points.get_cities}/${props.city_id}${api_points.near_cities}`);

        store.append_near_cities(props.city_id, response.data.data);
        const currentCityData = store.getNearCitiesById(props.city_id);
        nearbyCities.value = currentCityData;
        isItemsLoaded.value = true;

    } catch (err) {

        console.error(err);
        isItemsLoaded.value = true;
    }
}


/**
 * Watcher on prop city id to call the fetchNearCityList function
 */
watch(() => props.city_id, () => {
    if(props.city_id && isOpen.value) {
        fetchNearCitiesList();
    }
})

defineExpose({toggleModal});

</script>