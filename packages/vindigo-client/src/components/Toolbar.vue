<template>
	<header class="toolbar flex items-center px-3 bg-white h-14">
		<slot/>
		
		<div class="flex-grow"/>

		<icon-btn
			class="text-gray-600 mx-3"
			icon="mdi-plus-circle-outline"
			to="#"
		/>

		<div class="toolbar__divider"/>

		<icon-btn
			class="mx-3 text-gray-600"
			icon="mdi-magnify"
			to="#"
		/>
		
		<icon-btn
			class="mr-3 text-gray-600"
			icon="mdi-bell"
			to="#"
		/>

		<div class="toolbar__divider"/>
		
		<div class="flex items-center ml-5 text-gray-800">
			<h1 class="mb-0 font-semibold">
				Julian Mills
			</h1>
			<icon-btn
				class="text-gray-600"
				icon="mdi-chevron-down"
				to="#"
			/>
			<avatar
				class="ml-2"
				:user="10"
				:src="require('/src/assets/profile.png')"
			/>
		</div>
	</header>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
	name: 'Toolbar'
});
</script>

<style lang="postcss">
.toolbar__divider {
	background-color: #E1E1E1;
	width: 2px;

	@apply h-10;
}
</style>