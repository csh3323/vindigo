<template>
	<section class="project-page flex h-screen">
		<sidebar
			class="bg-[#2f3a41]"
			:open.sync="open"
		/>
		<section class="flex flex-col flex-grow">
			<toolbar class="project-toolbar pl-0">
				<w-button
					v-wave
					class="mx-3 text-gray-700"
					icon="mdi mdi-chevron-down"
					to="#"
					xl
				/>
				<div class="flex flex-col">
					<h1 class="font-bold">
						Vindigo Example Board
						<i class="mdi mdi-star" />
					</h1>
					<small class="font-thin -mt-1">
						{{ $t($route.meta.name) }}
					</small>
				</div>
			</toolbar>
			<main role="main" class="flex-grow">
				<transition>
					<keep-alive>
						<router-view />
					</keep-alive>
				</transition>
			</main>
		</section>
	</section>
</template>

<script lang="ts">
import Sidebar from './Sidebar.vue';
import Vue from "vue";
import { updateTitle } from '../../util';

export default Vue.extend({
	name: 'ProjectPage',
	components: {
		Sidebar
	},

	data: () => ({
		open: false
	}),

	created() {
		// TODO Use real project title
		updateTitle('Example Project');
	}
});
</script>

<style lang="postcss">
.project-toolbar .mdi-star {
	@apply text-yellow-400 ml-1;
	font-size: 1.1rem;
}

.app__header > .app__header_container {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.app__header > .app__header_container > .app__header_item_right {
	@apply flex;
}

</style>