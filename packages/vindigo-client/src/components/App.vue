<template>
	<section class="grid">
		<sidebar
			class="sidebar bg-[rgb(47,58,65)] w-[65px]"
			:open.sync="open"
		></sidebar>
		<section class="w-100 bg-[#FAF8FE]">
			<header class="app__header bg-[#F1EAF6] py-[0.60rem] px-4">
				<section class="app__header_container">
					<div class="app__header_item_left">
						<h1 class="font-bold mb-0" style="line-height: 8px">
							Vindigo Example Board
							<i class="mdi mdi-star"></i>
						</h1>
						<small class="font-thin" style="line-height: 8px">Kanban view</small>
					</div>
					<div class="app__header_item_right">
						<div class="border-r border-gray-500 h-10">
							<i class="mdi mdi-plus-circle-outline text-[1.6rem] mr-3"></i>
						</div>
						<div class="border-r border-gray-500 h-10 ml-3 mr-5 pr-3">
							<i class="mdi mdi-magnify text-[1.6rem]"></i>
							<i class="mdi mdi-bell text-[1.55rem]"></i>
						</div>
						<div class="flex justify-items-center items-center">
							<h1 class="mb-0 mr-4 font-semibold">John doe</h1>
							<img class="rounded-full border border-gray-800" height="40px" width="40px" src="data:image/png;base64,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" alt="">
						</div>
					</div>
				</section>
				
    		</header>
			<main role="main">
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
import Sidebar from './layout/Sidebar.vue';
import Vue from "vue";
import { store } from '..';

export default Vue.extend({
	name: "app",
    data: () => ({
		open: false
    }),
	components: {
		Sidebar
	},
	computed: {},
	methods: {},
	mounted() {
		
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