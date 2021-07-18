<template>
	<section class="your-teams">
		<section-title class="mt-10" icon="mdi-account-group">
			{{ $t('HOMEPAGE_SECTION_TEAMS') }}
		</section-title>
		<div class="grid grid-cols-12 gap-5 pt-4">
			<board-tile
				v-for="i in 4"
				:key="i"
				class="col-span-12 laptop:col-span-6 desktop:col-span-3" 
				:name="getTeamName()"
			/>
		</div>
	</section>
</template>

<script lang="ts">
import { commerce } from 'faker';
import Vue from 'vue';

export default Vue.extend({
	name: 'YourTeams',

	methods: {
		getTeamName(): string {
			return commerce.department() + ' Team';
		}
	}
});
</script>