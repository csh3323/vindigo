<template>
	<section class="your-teams">
		<section-title class="mt-10" icon="mdi-account-group">
			{{ $t('HOMEPAGE_SECTION_TEAMS') }}
		</section-title>
		<div
			v-for="team in teams"
			:key="team.id"
			class="your-teams__team-row"
		>
			<div class="your-teams__toolbar mt-4 flex flex-row items-center">
				<w-image
					:src="team.logo"
					class="rounded-lg overflow-hidden"
				/>
				<span class="font-semibold pl-3">
					{{ team.name }}
				</span>
				<spacer />
			</div>
			<div class="grid grid-cols-12 gap-5 pt-4">
				<board-tile
					v-for="i in 4"
					:key="i"
					class="col-span-12 laptop:col-span-6 desktop:col-span-3" 
					:name="getTeamName()"
				/>
			</div>
			<pagination
				v-model="page"
				:visible="5"
				:total="3"
				class="mt-4"
			/>
		</div>
	</section>
</template>

<script lang="ts">
import { commerce } from 'faker';
import Vue from 'vue';

export default Vue.extend({
	name: 'YourTeams',

	data: () => ({
		page: 0,
		teams: [
			{
				id: 1,
				logo: 'https://trello-logos.s3.amazonaws.com/7bef2b73918e3f51c89f7e42a54bca7b/30.png',
				name: 'Exodius Studios'
			},
			{
				id: 2,
				logo: 'https://trello-logos.s3.amazonaws.com/fe7092cd4b8281c2ff55d19c48ecb9da/30.png',
				name: 'Smash Wizards'
			}
		]
	}),

	methods: {
		getTeamName(): string {
			return commerce.department() + ' Team';
		}
	}
});
</script>