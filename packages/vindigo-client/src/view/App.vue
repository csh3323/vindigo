<template>
	<section :class="layoutSize">
		<sidebar
			class="sidebar"
			:open.sync="open"
		></sidebar>
		<section class="w-100 bg-[#FAF8FE]">
			<header>
        		<h1>Vindigo Example Board</h1>
    		</header>
			<main role="main" class="p-4">
				<router-view></router-view>
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
	computed: {
		layoutSize(): String[] {
			return this.open ? ['grid-sidebar-opened'] : ['grid'];
		}
	},
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
	transition: all .3s;
}

.grid-sidebar-opened {
	display: grid;
	grid-template-columns: auto 1fr;
	grid-auto-rows: 100vh;
}

.sidebar {
	background-color: #3A3C50;
}

.grid .sidebar {
	width: 65px;
	transition: .3s all;
}

.grid-sidebar-opened .sidebar {
	width: 125px;
	transition: .3s all;
}

header {
    padding: 1.2rem;
    background-color: #F1EAF6;
}

</style>