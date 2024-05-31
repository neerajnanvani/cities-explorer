<template>
	<div class="lg:mx-20 mx-4" @click="$emit('open_near_cities')">
		<div class="w-full border-2 border-blue-200 hover:border-blue-600 flex flex-row rounded-md">
			<div class="flex grow justify-between px-5 py-2 gap-2">
				<div class="md:w-1/3 w-1/2">
					<div class="flex align-middle">
						<p class="w-24 md:text-lg text-sm">Name: </p>
						<p class="text-gray-700 md:text-xl text-sm">{{ citiData.name }}</p>
					</div>
					
					<div class="flex align-middle">
						
						<p class="w-24 md:text-lg text-sm" > Country: </p>
						<p class="text-gray-700 md:text-xl text-sm">{{ citiData.country }}</p>
					</div>

					<div class="md:hidden flex align-middle">
						<p class="w-24 md:text-lg text-sm">Region: </p>
						<p class="text-gray-700 md:text-xl text-sm">{{ citiData.region }}</p>
					</div>
				</div>

				<div class="md:w-1/3 md:block hidden">
					<div class="flex align-middle">
						<p class="w-24 md:text-lg text-sm">Region: </p>
						<p class="text-gray-700 md:text-xl text-sm">{{ citiData.region }}</p>
					</div>
					
					<div class="flex align-middle">
						
						<p class="w-24 md:text-lg text-sm"> Population: </p>
						<p class="text-gray-700 md:text-xl text-sm">{{ citiData.population }}</p>
					</div>
				</div>

				<div class="md:w-1/3 w-1/2">

					<div class="md:hidden flex align-middle">
						
						<p class="w-24 md:text-lg text-sm"> Population: </p>
						<p class="text-gray-700 md:text-xl text-sm">{{ citiData.population }}</p>
					</div>

					<div class="flex align-middle">
						<p class="w-24 md:text-lg text-sm">Latitude: </p>
						<p class="text-gray-700 md:text-xl text-sm">{{ citiData.latitude }}</p>
					</div>
					
					<div class="flex align-middle">
						
						<p class="w-24 md:text-lg text-sm"> Longitude: </p>
						<p class="text-gray-700 md:text-xl text-sm">{{ citiData.longitude }}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
	/**
	 * citiData prop to show all details about single city
	 */
	citiData: {
		type: Object,
		required: true,
	}
})

</script>
