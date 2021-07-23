<template>
	<section v-if="projects.length > 0" class="your-projects mb-14">
		<section-title icon="mdi mdi-star">
			{{ $t('HOMEPAGE_SECTION_STARRED') }}
		</section-title>
		<project-list :projects="projects" :rows="1" />
	</section>
</template>

<script lang="ts">
import { commerce, datatype } from 'faker';
import Vue from 'vue';

export default Vue.extend({
	name: 'YourProjects',

	computed: {
		projects(): any {
			const amount = datatype.number(20);
			const projects: any[] = [];

			for(let i = 0; i < amount; i++) {
				projects.push({
					id: datatype.uuid(),
					name: commerce.productName()
				});
			} 

			return projects;
		}
	}
});
</script>