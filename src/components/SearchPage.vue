<template>
	<div class="h-full space-y-10 bg-gradient-to-r from-cyan-100/30 to-blue-100/30">
		<NearbyCity 
			ref="nearby_city_modal" 
			:city_id="nearby_city_id" 
			@close_modal="nearby_city_id = ''" 
		/>
		<div class="border-b-2 border-blue-400 py-10 bg-center bg-cover bg-opacity-10"
			style="background-image: url('https://media.b2broker.com/app/uploads/2021/12/b2brokerb2prime.png');">
			<h1 class="w-full text-center text-4xl my-10">Search Cities via region</h1>
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
				<label 
					for="grid"
					:class="[dataViewType == 'grid' ? 'border-blue-500' : 'border-blue-200', 'border-solid border-2 p-3 rounded-lg']"
				>
					Grid View
					<input class="hidden" type="radio" id="grid" value="grid" v-model="dataViewType">
				</label>
				<label 
					for="card"
					:class="[dataViewType == 'card' ? 'border-blue-500' : 'border-blue-200', 'border-solid border-2 p-3 rounded-lg']"
				>
					Card View
					<input class="hidden" type="radio" id="card" value="card" v-model="dataViewType">
				</label>
			</div>

			<div v-show="dataViewType == 'card'">
				<SingleCityCard 
					v-for="city in searchItems" 
					:key="city" 
					:citi-data="city" 
					class="my-5 cursor-pointer"
					@open_near_cities="viewNearCity(city.id)" 
				/>
			</div>

			<div v-show="dataViewType == 'grid'" class="grid 2xl:grid-cols-3 sm:grid-cols-2 grid-cols-1  gap-3 px-12 mb-10">
				<SingleCityGrid 
					v-for="city in searchItems" 
					:key="city" 
					:citi-data="city" 
					class="cursor-pointer"
					@open_near_cities="viewNearCity(city.id)" 
				/>
			</div>

			<div v-if="!searchText" class="w-full flex justify-center space-x-8 mt-10 pb-10">
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
import { ref, computed, watch, onMounted, nextTick } from "vue";
import SingleCityCard from "@/components/SingleCityCard.vue";
import SingleCityGrid from "@/components/SingleCityGrid.vue";
import SearchInput from "@/components/SearchInput.vue";
import api_service from "@/api/api_service";
import api_points from "@/api/api_points";
import { useCitiesStore } from '@/store/cities.js';
import NearbyCity from '@/components/NearbyCity.vue';

// required data variables
const searchText = ref("");
const currentPage = ref(1);
const searchItems = ref([]);
const searchTimer = ref(null);
const citiesLoaded = ref(false);
const dataViewType = ref("grid");
const store = useCitiesStore();
const nearby_city_modal = ref(null);
const nearby_city_id = ref("");

/**
 * Function to assign current page cities to the main list
 */
function assignCurrentCities() {
	const all_cities = store.all_cities;
	searchItems.value = (JSON.parse(JSON.stringify(all_cities))).slice((currentPage.value * 10) - 10, (currentPage.value * 10));
}

/**
 * Funtion to fetch city list based on search query and page number
 */
async function fetchCitiesList() {

	const isCurrentPageDataAvailable = ((store.total_cities - currentPage.value * 10) > 0);

	if (isCurrentPageDataAvailable) {
		assignCurrentCities();
		citiesLoaded.value = true;
		return;
	}
	try {
		const response = await api_service.get(api_points.get_cities, { limit: 10, offset: `${currentPage.value * 10}` });

		store.append_cities(response.data.data);
		assignCurrentCities();
		citiesLoaded.value = true;

	} catch (err) {
		console.error(err);
		searchItems.value = [];
		citiesLoaded.value = true;
	}
}

/**
 * Function to get the region cities by search
 */
function getRegionCities() {
	if(searchText.value) {
		return JSON.parse(JSON.stringify(store.all_cities)).filter((item) => {
			return (item.region.toLowerCase()).includes((searchText.value.toLowerCase()));
		});
	}
}

/**
 * Function to view near cities via modal
 * 
 * @param {string} city_id 
 */
async function viewNearCity(city_id) {
	nearby_city_id.value = city_id;
	nearby_city_modal.value.toggleModal();
}

/**
 * Computed property to check is next page available for more cities
 * But it is limiting to 20 pages max as per now
 */
const isNextPageAvailable = computed(() =>
	!!(currentPage.value <= 20)
);

/**
 * Watcher on current page to fetch list
 */
watch(currentPage, () => {
	if(!searchText.value) {
		citiesLoaded.value = false;
		fetchCitiesList();
	}
});

/**
 * Watcher on search text to run getRegionCities funtion
 * There is a debouncing of 2000 miliseconds
 */
watch(searchText, () => {
	citiesLoaded.value = false;
	clearTimeout(searchTimer.value);
	searchTimer.value = setTimeout(() => {
		if (searchText.value) {
			const cities = getRegionCities();
			searchItems.value = cities;
			citiesLoaded.value = true;
		} else {
			citiesLoaded.value = false;
			currentPage.value = 1;
			fetchCitiesList();
		}
	}, 2000);
});

// run fetchCitiesList function when component is mounted
onMounted(async () => {
	await fetchCitiesList();
});
</script>
