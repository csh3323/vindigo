<template>
    <section class="grid">
		<sidebar
			class="bg-[rgb(47,58,65)]"
			:open.sync="open"
		></sidebar>
		<section class="w-100 bg-[#FAF8FE]">
			<toolbar class="pl-0">
				<icon-btn
					class="mx-3 text-gray-700"
					icon="mdi-chevron-down"
					to="#"
				/>
				<div class="flex flex-col">
					<h1 class="font-bold mb-0">
						Vindigo Example Board
						<i class="mdi mdi-star"></i>
					</h1>
					<small class="font-thin">
						Kanban view
					</small>
				</div>
			</toolbar>
			<main role="main" style="height: 89.3188819885%">
				<transition>
					<keep-alive>
						<router-view></router-view>
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
    data: () => ({
		open: false
    }),
	components: {
		Sidebar
	}
});
</script>

<style lang="postcss">
.grid {
	display: grid;
	grid-template-columns: auto 1fr;
	grid-auto-rows: 100vh;
}

.mdi-star {
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