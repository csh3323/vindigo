<template>
	<div class="h-screen bg-page-background">
		<router-view v-if="$store.state.initialized" />
		<div
			v-else
			class="h-screen flex items-center justify-center"
		>
			<div class="relative select-none">
				<spinner
					ref="spinner"
					loading
					class="loading-spinner"
					:color="spinnerGradient"
					:size="125"
				>
					<img
						slot="legend-caption"
						:src="require('/src/assets/icon.svg')"
						class="relative bottom-3"
						width="85"
						@dragstart.prevent
					>
				</spinner>
				<div class="loading-text">
					Loading...
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
	name: "Vindigo",
	data: () => ({
		spinnerGradient: {
			colors: [
				{ color: "#00C9FF", offset: 0 },
				{ color: "#6A42FF", offset: 100 },
			]
		}
	}),

	mounted() {
		setTimeout(() => {
			this.$r
			// this.$store.commit('initialized');
		}, 1000);
	}
});
</script>

<style lang="postcss">
.loading-text {
	@apply absolute text-lg left-0 top-36 right-0 text-center opacity-30 uppercase font-semibold;
}
</style>