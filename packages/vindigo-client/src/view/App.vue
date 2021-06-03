<template>
	<section class="grid">
		<sidebar
			class="sidebar bg-[rgb(47,58,65)] w-[65px]"
			:open.sync="open"
		></sidebar>
		<section class="w-100 bg-[#FAF8FE]">
			<header class="bg-[#F1EAF6] p-[1.2rem]">
				<h1 class="font-bold mb-0" style="line-height: 8px">
					Vindigo Example Board
					<i class="mdi mdi-star"></i>
				</h1>
				<small class="font-thin" style="line-height: 8px">Kanban view</small>
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
import Vue from "vue";

/** template components */
import Sidebar from '../components/template/Sidebar.vue';

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
});
</script>

<style lang="postcss">
@tailwind base;
@tailwind components;
@tailwind utilities;

.grid {
	display: grid;
	grid-template-columns: auto 1fr;
	grid-auto-rows: 100vh;
}

.mdi-star {
	@apply text-yellow-400 ml-1;
	font-size: 1.1rem;
}
</style>