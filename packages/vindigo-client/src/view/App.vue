<template>
	<div class="test p-4">
		<div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
			<div class="md:flex">
				<div class="md:flex-shrink-0">
					<img
						class="h-48 w-full object-cover md:w-48"
						:src="require('./vindigo.png')"
						alt="Man looking at item at a store"
					/>
				</div>
				<div class="p-8">
					<div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
						Case studies
					</div>
					<a href="#" class="block mt-1">
						Finding customers for your new business
					</a>
					<p class="mt-2 text-gray-500 testing">
						Getting a new business off the ground is a lot of hard
						work. Here are five ideas you can use to find your first
						customers.
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
	name: "app",
	data: () => ({
		value: "Test",
	}),
	methods: {
		e() {},
	},
});
</script>

<style lang="postcss">
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>