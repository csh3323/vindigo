<template>
	<div class="h-screen bg-page-background">
		<router-view v-if="isReady" />

		<!-- Loading overlay -->
		<fade-transition>
			<div v-if="!isReady" class="loading-overlay">
				<div class="relative select-none">
					<spinner
						ref="spinner"
						loading
						class="loading-overlay__spinner"
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
					<div class="loading-overlay__text">
						Loading...
					</div>
				</div>
			</div>
		</fade-transition>
	</div>
</template>

<script lang="ts">
import { identity, values } from "lodash";
import Vue from "vue";

export default Vue.extend({
	name: "Vindigo",
	data: () => ({
		spinnerGradient: {
			colors: [
				{ color: "#00C9FF", offset: '0' },
				{ color: "#6A42FF", offset: '100' },
			]
		}
	}),

	computed: {
		isReady(): boolean {
			return values(this.$store.state.loading).every(identity);
		}
	}
});
</script>

<style lang="postcss">
.loading-overlay {
	@apply bg-page-background h-screen fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center;

	&__text {
		@apply absolute text-lg left-0 top-36 right-0 text-center opacity-30 uppercase font-semibold;
	}
}
</style>