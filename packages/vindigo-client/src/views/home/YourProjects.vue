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
import { gql } from '@apollo/client/core';
import Vue from 'vue';
import { api } from '../..';

export default Vue.extend({
	name: 'YourProjects',

	data: () => ({
		projects: [] as any[]
	}),

	mounted() {
		this.fetchPersonalProjects();
	},

	methods: {
		async fetchPersonalProjects() {
			const res = await api.query(gql`
				query {
					projects(mode: PERSONAL) {
						id
						name
						coverImage
						projectUrl
					}
				}
			`);

			this.projects = res.projects;
		}
	}
});
</script>