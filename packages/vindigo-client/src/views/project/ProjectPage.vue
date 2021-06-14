<template>
	<section class="project-page grid">
		<sidebar
			class="bg-[#2f3a41]"
			:open.sync="open"
		/>
		<section>
			<toolbar class="pl-0">
				<icon-btn
					class="mx-3 text-gray-700"
					icon="mdi-chevron-down"
					to="#"
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
			<main role="main" class="grid max-w-[100%] h-full">
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

export default Vue.extend({
	name: 'ProjectPage',
	components: {
		Sidebar
	},
	data: () => ({
		open: false
	})
});
</script>

<style lang="postcss">
.mdi-star {
	@apply text-yellow-400 ml-1;
	font-size: 1.1rem;
}

.project-page {
	grid-template-columns: 56px auto;
	grid-template-rows: 100vh;
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