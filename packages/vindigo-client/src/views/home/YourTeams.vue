<template>
	<section class="your-teams mt-8">
		<!-- <section-title icon="mdi mdi-account-group" class="mb-4">
			{{ $t('HOMEPAGE_SECTION_TEAMS') }}
			<spacer />
			<w-button
				v-wave
				color="white"
				bg-color="indigo-600"
				class="px-4 py-4 rounded-lg ml-2 font-semibold"
			>
				<w-icon class="mr-2">
					mdi mdi-plus
				</w-icon>
				New team
			</w-button>
		</section-title> -->
		<div
			v-for="team in teams"
			:key="team.id"
			class="your-teams__team-row mb-8"
		>
			<div class="your-teams__toolbar p-2 px-3 flex flex-row items-center bg-page-foreground dark:bg-page-foreground-dark rounded-lg">
				<w-image
					:src="team.logo"
					class="rounded-lg overflow-hidden"
					height="38"
					width="38"
				/>
				<div class="pl-3 flex flex-col dark:text-white">
					<span class="font-semibold text-base">
						{{ team.name }}
					</span>
					<span class="text-sm">
						Member
					</span>
				</div>
				<spacer />
				<w-button
					outline
					color="indigo-600"
				>
					Visit team
					<w-icon>
						mdi mdi-arrow-right
					</w-icon>
				</w-button>
			</div>
			<div class="grid grid-cols-12 gap-5 pt-4">
				<board-tile
					v-for="i in demoCount()"
					:key="i"
					class="col-span-12 laptop:col-span-6 desktop:col-span-3" 
					:name="getTeamName()"
				/>
			</div>
			<pagination
				:value="1"
				:visible="5"
				:total="1"
				class="mt-4"
			/>
		</div>
	</section>
</template>

<script lang="ts">
import { commerce } from 'faker';
import { datatype } from 'faker';
import Vue from 'vue';

export default Vue.extend({
	name: 'YourTeams',

	data: () => ({
		page: 0,
		teams: [
			{
				id: 1,
				logo: '/data/teams/1.png',
				name: 'Exodius Studios'
			},
			{
				id: 2,
				logo: '/data/teams/2.png',
				name: 'Smash Wizards'
			}
		]
	}),

	methods: {
		getTeamName(): string {
			return commerce.department() + ' Team';
		},
		demoCount(): number {
			return 1 + datatype.number(6);
		}
	}
});
</script>