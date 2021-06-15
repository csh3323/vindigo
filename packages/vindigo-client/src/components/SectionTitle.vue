<template>
	<div class="home-subtitle text-gray-600 dark:text-gray-400 font-semibold flex items-center">
		<icon :icon="icon" size="32" />
		<slot />
	</div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	name: 'SectionTitle',
	props: {
		icon: {
			type: String,
			required: true
		}
	}
});
</script>