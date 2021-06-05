<template>
	<section class="relative">
		<div class="sidebar__highlight absolute left-0" :style="offsetActiveRoute"></div>
		<ol class="sidebar__container">
			<li class="sidebar__item">
				<router-link
					class="flex justify-center mt-2"
					to="/"
				>
					<img
						src="../../../public/icon.png"
						alt=""
						width="28px"
					>
				</router-link>
			</li>
			<li
				v-for="(item, index) in listItems"
				:key="index"
				:class="['sidebar__item', $route.path.substr(1, $route.path.length) === item.href ? 'active' : '' ]"
				@click="currentIndex = item.rank"
			>
				<router-link :to="item.href">
					<span :class="['mdi', item.icon]"></span>
				</router-link>
			</li>
		</ol>
	</section>
</template>

<script lang="ts">
import Vue from "vue";
import { routing } from '../../index';
import _ from "lodash";

export default Vue.extend({
	name: "sideBar",
	props: {
		open: {
			required: true,
			type: Boolean,
		},
	},
	data: () => ({
		listItems: [],
		currentIndex: 0
	}),
	computed: {
		offsetActiveRoute() {
			return {
				top: 52 + (this.$route.meta.order * 51) + 'px'
			};
		}
	},
	mounted() {

		// initializing list items
		this.listItems = _.chain(routing.getRoutes()[0].children)
			.map((child) => ({
				icon: child.meta.icon,
				rank: child.meta.order,
				href: child.path
			}))
			.orderBy(item => item.rank, 'asc').value();

		// set the current default index
		this.currentIndex = this.$route.meta.order;
	}
});
</script>

<style lang="postcss" scoped>

.sidebar__highlight {
	width: 3px;
	height: 50px;
	background-color: #14A7F4;
	z-index: 100;
	transition: .3s all;
}

.sidebar__container > .sidebar__item {
	@apply py-1 text-center relative;
}

.sidebar__container > .sidebar__item:first-child {
	@apply mb-2;
}

.sidebar__container > .sidebar__item:not(:first-child):hover,
.sidebar__container > .sidebar__item.active {
	background-color: #293238;
}

.sidebar__container > .sidebar__item span {
	@apply text-white;
	font-size: 1.75rem;
}

.sidebar__container > .sidebar__item span:hover {
	@apply text-indigo-400 cursor-pointer;
}

</style>