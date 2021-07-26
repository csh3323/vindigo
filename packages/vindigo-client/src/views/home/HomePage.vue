<template>
	<section ref="pageView" class="home-page">
		<toolbar class="pl-0" />

		<div class="h-80 laptop:h-72 -mt-14 bg-white dark:bg-gray-800 flex items-center justify-center">
			<!-- Display just "Welcome" when user is signed out -->
			<avatar
				:size="80"
				:profile="$vuex.state.profile"
				:open-profile="false"
			/>
			<div class="pl-6 dark:text-gray-100">
				<h2 class="font-extrabold text-2xl">
					{{ $t('HOMEPAGE_WELCOME') }}
				</h2>
				<h1 class="font-extrabold text-2xl">
					{{ firstName }}
				</h1>
			</div>
		</div>
		
		<main class="container grid grid-cols-7 laptop:gap-16">
			<div class="col-span-full laptop:col-span-4 desktop:col-span-5 py-8">
				<starred-projects />
				<your-projects />
				<your-teams />
			</div>
			<aside class="col-span-full laptop:col-span-3 desktop:col-span-2 order-first laptop:order-none -mt-20">
				<activity-card />
				<focus-tasks class="pt-8" />
			</aside>
		</main>
	</section>
</template>

<script lang="ts">
import Vue from 'vue';
import ActivityCard from './ActivityCard.vue';
import FocusTasks from './FocusTasks.vue';
import { Optional } from '../../typings/types';
import StarredProjects from './StarredProjects.vue';
import YourProjects from './YourProjects.vue';
import YourTeams from './YourTeams.vue';

export default Vue.extend({
	name: 'HomePage',
	
	components: {
		ActivityCard,
		FocusTasks,
		StarredProjects,
		YourProjects,
		YourTeams
	},

	beforeRouteEnter(_to, _from, next) {
		console.log('ALPHA');

		setTimeout(() => {
			next(() => {
				console.log('DELTA');
			});
		}, 3000);
	},

	computed: {
		firstName(): Optional<string> {
			return this.$vuex.state.profile?.firstName;
		}
	},

	mounted() {
		console.log('mounted');
	},

	methods: {
		getScrollView() {
			return this.$refs.pageView;
		}
	}
});
</script>

<style lang="postcss">
.home-page {
	@apply overflow-y-scroll h-screen;
}
</style>