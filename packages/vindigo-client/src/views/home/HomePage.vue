<template>
	<section class="home-page">
		<toolbar class="pl-0" />

		<div class="h-80 laptop:h-72 -mt-14 bg-white dark:bg-gray-800 flex items-center justify-center">
			<!-- Display just "Welcome" when user is signed out -->
			<avatar
				:user="10"
				:size="80"
				:src="require('/src/assets/profile.png')"
				:open-profile="false"
			/>
			<div class="pl-6 dark:text-gray-100">
				<h2 class="font-extrabold text-2xl">
					{{ $t('HOMEPAGE_WELCOME') }}
				</h2>
				<h1 class="font-extrabold text-2xl">
					Julian
				</h1>
			</div>
		</div>
		<main class="container grid grid-cols-6 laptop:gap-24">
			<div class="col-span-full laptop:col-span-4 pt-8">
				<section-title icon="mdi-clock-outline">
					{{ $t('HOMEPAGE_SECTION_RECENTS') }}
				</section-title>
				<section class="grid grid-cols-6 gap-5 pt-4">
					<board-tile
						v-for="i in 6"
						:key="i"
						class="col-span-12 laptop:col-span-3 desktop:col-span-2" 
						:name="getBoardName()"
					/>
				</section>
				<section-title class="mt-10" icon="mdi-briefcase">
					{{ $t('HOMEPAGE_SECTION_TEAMS') }}
				</section-title>
				<section class="grid grid-cols-6 gap-5 pt-4">
					<board-tile
						v-for="i in 3"
						:key="i"
						class="col-span-12 laptop:col-span-3 desktop:col-span-2" 
						:name="getTeamName()"
					/>
				</section>
			</div>
			<aside class="col-span-full laptop:col-span-2 order-first laptop:order-none -mt-20">
				<section>
					<section-title icon="mdi-chart-line-variant">
						{{ $t('HOMEPAGE_SECTION_ACTIVITY') }}
					</section-title>
					<activity-card class="bg-purple-500 mt-2 h-52" />
				</section>
				<section class="pt-8">
					<section-title icon="mdi-check-circle-outline">
						{{ $t('HOMEPAGE_SECTION_TASKS') }}
					</section-title>
					<focus-tasks class="bg-[#DDE0EB] dark:bg-gray-800 mt-2 h-96" />
				</section>
			</aside>
		</main>
	</section>
</template>

<script lang="ts">
import Vue from 'vue';
import { commerce } from 'faker';
import ActivityCard from './ActivityCard.vue';
import FocusTasks from './FocusTasks.vue';

export default Vue.extend({
	name: 'HomePage',
	components: { ActivityCard, FocusTasks },
    
	data: () => ({
        
	}),

	methods: {
		getBoardName() {
			return commerce.productName();
		},
		getTeamName() {
			return commerce.department() + ' Team';
		}
	}
});
</script>

<style lang="postcss">
.home-page {
    .activity-card { 
        @mixin emissive theme('colors.purple.500');
    }
}
</style>