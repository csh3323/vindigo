<template>
	<header class="toolbar flex items-center px-3 bg-white h-14">
		<slot/>
		<spacer/>

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
		
		<div class="flex items-center pl-3 text-gray-800">
			<h1 class="mb-0 mr-4 font-semibold">
				Julian Mills
			</h1>
			<avatar
				:user="10"
				src="https://firebasestorage.googleapis.com/v0/b/cao-master-v2.appspot.com/o/avatars%2F3KuBif2UEReCgzW7LRaBdTIkiQA3?alt=media&token=1a54f0ed-0e0f-412d-9f0b-3cc83e93ba89"
			/>
		</div>
	</header>
</template>

<script lang="ts">
import Vue from "vue";
import Spacer from "../util/Spacer.vue";

export default Vue.extend({
	components: { Spacer },
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