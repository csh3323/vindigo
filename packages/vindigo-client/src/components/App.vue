<template>
	<div class="h-screen bg-page-background dark:bg-gray-900">
		<template v-if="isReady">
			<authenticate v-if="shouldAuth" />
			<router-view v-else />
		</template>

		<!-- Loading overlay -->
		<fade-transition>
			<div v-if="!isReady" class="loading-overlay">
				<div class="relative select-none">
					<loading-spinner />
					<div class="loading-overlay__text">
						Loading...
					</div>
				</div>
			</div>
		</fade-transition>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import Authenticate from '../views/Authenticate.vue';

export default Vue.extend({
	name: "Vindigo",
	components: {
		Authenticate
	},

	computed: {
		shouldAuth(): boolean {
			return true;
		},
		...mapState(['isReady'])
	},

	watch: {
		'$store.state.isDark'() {
			this.updateTheme();
		}
	},

	created() {
		this.updateTheme();
	},

	methods: {
		updateTheme() {
			const html = document.documentElement;

			if(this.$store.state.isDark) {
				html.classList.add('dark');
			} else {
				html.classList.remove('dark');
			}
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