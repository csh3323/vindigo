<template>
	<section class="grid">
		<sidebar
			class="sidebar bg-[#3A3C50] w-[65px]"
			:open.sync="open"
		></sidebar>
		<section class="w-100 bg-[#FAF8FE]">
			<header class="bg-[#F1EAF6] p-[1.2rem]">
        		<h1>Vindigo Example Board</h1>
    		</header>
			<main role="main" class="p-4">
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

</style>