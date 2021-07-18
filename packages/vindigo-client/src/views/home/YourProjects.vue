<template>
	<section class="your-projects">
		<section-title icon="mdi-folder-open">
			{{ $t('HOMEPAGE_SECTION_PROJECTS') }}
		</section-title>
		<div class="grid grid-cols-12 gap-5 pt-4">
			<board-tile
				v-for="i in 8"
				:key="i"
				class="col-span-12 laptop:col-span-6 desktop:col-span-3" 
				:name="getBoardName()"
			/>
		</div>
		<pagination
			v-model="page"
			:visible="5"
			:total="10"
			class="mt-4"
		/>
	</section>
</template>

<script lang="ts">
import { commerce } from 'faker';
import Vue from 'vue';

export default Vue.extend({
	name: 'YourProjects',

	data: () => ({
		page: 1
	}),

	methods: {
		getBoardName(): string {
			return commerce.productName();
		}
	}
});
</script>