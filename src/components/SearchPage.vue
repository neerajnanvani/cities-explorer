<template>
	<div class="h-full space-y-10 bg-gradient-to-r from-cyan-100/30 to-blue-100/30">
		<div 
			class="border-b-2 border-blue-400 py-10 bg-center bg-cover bg-opacity-10" 
			style="background-image: url('https://media.b2broker.com/app/uploads/2021/12/b2brokerb2prime.png');"
		>
			<h1 class="w-full text-center text-4xl my-10">Search Cities</h1>
			<div class="my-6">
				<div class="flex flex-col items-center space-y-6">
					<SearchInput :modelValue="searchText" @update:modelValue="(newValue) => (searchText = newValue)" />
				</div>
			</div>
		</div>
		<div v-if="!citiesLoaded">
			<div class="h-32 w-full flex justify-center items-center">
				<div class="flex h-32 w-full items-center justify-center">
					<div
						class="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-cyan-500 to-pink-500 animate-spin">
						<div class="h-9 w-9 rounded-full bg-gray-200"></div>
					</div>
				</div>
			</div>
		</div>
		<div v-else-if="searchItems.length">

			<div class="flex justify-center space-x-10 my-8">
				<label for="grid" :class="[dataViewType == 'grid' ? 'border-blue-500' : 'border-blue-200', 'border-solid border-2 p-3 rounded-lg']">
					Grid View
					<input class="hidden" type="radio" id="grid" value="grid" v-model="dataViewType">
				</label>
				<label for="card" :class="[dataViewType == 'card' ? 'border-blue-500' : 'border-blue-200', 'border-solid border-2 p-3 rounded-lg']">
					Card View
					<input class="hidden" type="radio" id="card" value="card" v-model="dataViewType">
				</label>
			</div>

			<div v-show="dataViewType=='card'">
				<SingleCityCard v-for="city in searchItems" :key="city" :citi-data="city" class="my-5" />
			</div>

			<div v-show="dataViewType=='grid'" class="grid grid-cols-3 gap-3 px-12">
				<SingleCityGrid v-for="city in searchItems" :key="city" :citi-data="city" />
			</div>

			<div class="w-full flex justify-center space-x-8 mt-10 pb-10">
				<button 
					:disabled="currentPage == 1" 
					:class="[
						currentPage == 1
							? 'bg-gray-200 text-gray-700 border-1'
							: 'bg-blue-100 text-blue-900 hover:border-blue-600 ',
						'px-3 py-2 flex items-center rounded-md border-2',
					]" 
					@click="currentPage = currentPage - 1"
				>
					<ChevronLeft class="w-4 mr-2" />
					Previous
				</button>
				<button 
					:disabled="!isNextPageAvailable" 
					:class="[
						isNextPageAvailable
							? 'bg-blue-100 text-blue-900 hover:border-blue-600'
							: 'bg-gray-200 text-gray-700 border-1',
						'px-3 py-2 flex items-center rounded-md border-2',
					]" 
					@click="currentPage = currentPage + 1"
				>
					Next
					<ChevronRight class="w-4 ml-2" />
				</button>
			</div>
		</div>
		<div v-else class="w-full h-full">
			<p class="text-3xl w-full h-96 flex justify-center items-center">
				No results Found
			</p>
		</div>
	</div>
</template>
<script setup>
import ChevronLeft from "@heroicons/vue/24/solid/ChevronLeftIcon";
import ChevronRight from "@heroicons/vue/24/solid/ChevronRightIcon";
import { ref, computed, watch, onMounted } from "vue";
import SingleCityCard from "@/components/SingleCityCard.vue";
import SingleCityGrid from "@/components/SingleCityGrid.vue";
import SearchInput from "@/components/SearchInput.vue";
import api_service from "@/api/api_service";
import api_points from "@/api/api_points";
import { useCitiesStore } from '@/store/cities.js';

// required data variables
const searchText = ref("");
const currentPage = ref(1);
const searchItems = ref([]);
const searchTimer = ref(null);
const citiesLoaded = ref(false);
const dataViewType = ref("grid");
const store = useCitiesStore();

/**
 * Function to assign current page cities to the main list
 */
function assignCurrentCities() {
	const all_cities = store.all_cities;

	searchItems.value = (JSON.parse(JSON.stringify(all_cities))).slice((currentPage.value * 10) - 10, (currentPage.value * 10));
	console.log(searchItems)
}

/**
 * Funtion to fetch city list based on search query and page number
 */
async function fetchCitiesList() {

	const isCurrentPageDataAvailable = ((store.total_cities - currentPage.value * 10) > 0);

	if(isCurrentPageDataAvailable) {
		assignCurrentCities();
		citiesLoaded.value = true;
		return;
	}
	try {
		const response = await api_service.get(api_points.get_cities, {limit: 10, offset: `${currentPage.value}`});

		store.append_cities(response.data.data);
		assignCurrentCities();
		citiesLoaded.value = true;

	} catch (err) {
		console.log(err);
		citiesLoaded.value = false;
	}
}


/**
 * Computed property to check is next page available for more cities
 * But it is limiting to 20 pages max as per now
 */
const isNextPageAvailable = computed(() =>
	!!(currentPage.value <= 20)
);

/**
 * Watcher on search text and currentPage to run fetchCitiesList funtion
 * There is a debouncing of 500 miliseconds
 */
watch([searchText, currentPage], ([newSearchText]) => {
	// assign 1 to current page whenever query changes
	if (newSearchText) currentPage.value = 1;

	citiesLoaded.value = false;
	clearTimeout(searchTimer.value);
	searchTimer.value = setTimeout(() => {
		fetchCitiesList();
	}, 500);
});

// run fetchCitiesList function when component is mounted
onMounted(async () => {
	await fetchCitiesList();
});
</script>
