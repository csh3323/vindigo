<template>
	<nav class="sidebar relative w-14">
		<div
			class="sidebar__highlight rounded-r-lg absolute left-0"
			:style="offsetActiveRoute"
		></div>
		<ol class="sidebar__container">
			<router-link
				v-for="(item, index) in listItems"
				:to="item.href"
				:key="index"
			>
				<li
					class="sidebar__item"
					@click="currentIndex = item.rank"
				>
					<icon :icon="item.icon" class="text-white"/>
				</li>
			</router-link>
		</ol>
	</nav>
</template>

<script lang="ts">
import Vue from "vue";
import { routing } from '../../index';
import _ from "lodash";

export default Vue.extend({
	name: 'Sidebar',
	props: {
		open: {
			required: true,
			type: Boolean,
		},
	},
	data: () => ({
		listItems: [] as any[],
		currentIndex: 0
	}),
	computed: {
		offsetActiveRoute(): any {
			return {
				top: (this.$route.meta!.order * 56) + 'px'
			};
		}
	},
	mounted() {
		const route = routing.getRoute('Project Container')!

		console.log(route);

		// initializing list items
		this.listItems = _.chain(route.children)
			.map((child) => ({
				icon: child.meta.icon,
				rank: child.meta.order,
				href: child.path
			}))
			.orderBy(item => item.rank, 'asc')
			.value();

		// set the current default index
		this.currentIndex = this.$route.meta.order;
	}
});
</script>

<style lang="postcss" scoped>
.sidebar {

	&__highlight {
		width: 4px;
		background-color: #14A7F4;
		transition: .3s all;
		z-index: 2;

		@apply h-14;
	}

	&__item {
		@apply py-1 w-14 h-14 flex items-center justify-center cursor-pointer hover:bg-[#293238];
	}

}
</style>