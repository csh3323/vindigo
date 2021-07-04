<template>
	<spinner
		loading
		class="loading-overlay__spinner"
		:empty-color="emptyColor"
		:color="spinnerGradient"
		:size="115"
	>
		<img
			slot="legend-caption"
			:src="require('/src/assets/icon.svg')"
			class="relative bottom-3"
			width="82"
			@dragstart.prevent
		>
	</spinner>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	data: () => ({
		spinnerGradient: {
			colors: [
				{ color: "#00C9FF", offset: '0' },
				{ color: "#6A42FF", offset: '100' },
			]
		}
	}),

	computed: {
		emptyColor(): string|undefined {
			return this.$vuex.state.isDark ? '#111' : undefined;
		}
	}
});
</script>