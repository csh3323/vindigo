<template>
	<section class="your-projects mb-14">
		<section-title icon="mdi mdi-folder-open">
			{{ $t('HOMEPAGE_SECTION_PROJECTS') }}
		</section-title>
		<project-list :projects="projects" :rows="2">
			<template #empty>
				<div class="bg-white p-3">
					You have not joined any projects yet!
				</div>
			</template>
		</project-list>
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