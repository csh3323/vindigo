<template>
	<div class="home-subtitle text-gray-600 dark:text-gray-400 font-semibold flex items-center text-lg">
		<w-icon class="mr-2">
			{{ icon }}
		</w-icon>
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