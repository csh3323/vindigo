<template>
	<section class="your-projects">
		<section-title icon="mdi mdi-folder-open">
			{{ $t('HOMEPAGE_SECTION_PROJECTS') }}
			<spacer />
			<w-input
				class="rounded-lg max-w-max"
				inner-icon-left="mdi mdi-magnify"
				placeholder="Search projects..."
				bg-color="page-foreground"
				color="gray-700"
			/>
			<w-button
				v-wave
				color="white"
				bg-color="indigo-600"
			>
				<w-icon class="mr-2">
					mdi mdi-plus
				</w-icon>
				New project
			</w-button>
		</section-title>
		<div class="grid grid-cols-12 gap-5 pt-4">
			<board-tile
				v-for="i in demoCount()"
				:key="i"
				class="col-span-12 laptop:col-span-6 desktop:col-span-3" 
				:name="getBoardName()"
			/>
		</div>
		<pagination
			v-model="page"
			:visible="5"
			:total="1"
			class="mt-4"
		/>
	</section>
</template>

<script lang="ts">
import { commerce, datatype } from 'faker';
import Vue from 'vue';

export default Vue.extend({
	name: 'YourProjects',

	data: () => ({
		page: 1
	}),

	methods: {
		getBoardName(): string {
			return commerce.productName();
		},
		demoCount(): number {
			return 1 + datatype.number(6);
		}
	}
});
</script>