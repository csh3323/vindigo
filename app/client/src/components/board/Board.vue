<template>
	<v-app>
		<!-- Sidebar drawer -->
		<v-navigation-drawer
			app
			dark
			permanent
			mini-variant
			class="board-sidebar secondary elevation-5"
		>
			<v-list nav dense class="board-sidebar__nav">
				<template v-for="btn in sidebar">
					<v-divider v-if="btn.divider" :key="btn.title"/>
					<v-tooltip v-else right :key="btn.title">
						<template v-slot:activator="{on}">
							<v-list-item :ripple="false" v-on="on" @click="btn.handle" class="my-2">
								<v-list-item-action>
									<v-img v-if="btn.img" :src="btn.img" :transition="false"></v-img>
									<v-icon v-else>{{btn.icon}}</v-icon>
								</v-list-item-action>
							</v-list-item>
						</template>
						<span>
							{{btn.title}}
						</span>
					</v-tooltip>
				</template>
			</v-list>
		</v-navigation-drawer>

		<!-- Toolbar -->
		<v-app-bar app color="rgba(0, 0, 0, 0.3)" class="app-titlebar elevation-0">
			<span class="white--text title">
				{{board.title}}
			</span>
			<v-spacer/>
			<v-text-field
				prepend-icon="mdi-magnify"
				style="max-width: 250px"
				placeholder="Search"
				hide-details
				dark
			/>
		</v-app-bar>

		<!-- Telescope Board -->
		<v-content class="board" :style="boardStyle">
			<v-container fluid class="board-content mb-0 pa-5">
				<router-view/>
			</v-container>
		</v-content>
	</v-app>
</template>

<script lang="ts">
import HomeIcon from '../../../assets/img/icon.png';

import { defineComponent, ref, computed, reactive } from "@vue/composition-api";
import { StoreKey, injectKey, RouterKey } from "../../common/Providers";
import { StoreService } from "../../store/StoreService";
import * as debug from '../../common/Debug';
import { isHexColor } from '../../common/Utility';
import _ from 'lodash';

export default defineComponent({
	name: 'board',
	setup(props, ctx) {
		const routing = injectKey(RouterKey);
		const board = reactive(debug.newBoardWithTasks());

		// Compute the background
		const boardStyle = computed(() => {
			const style = {} as any;

			if(isHexColor(board.background)) {
				style.backgroundColor = board.background;
			} else {
				style.backgroundImage = 'url(' + board.background + ')';
			}

			return style;
		});

		// Append a new list
		function addList() {
			board.lists.push(debug.newList());
		}

		// Remove a list by id
		function removeList(id: string) {
			const list = _.find(board.lists, (list) => list.id == id);
			const idx = board.lists.indexOf(list);

			board.lists.splice(idx, 1);
		}
		
		// Add a new task
		function addTask(list: string) {
			const theList = _.find(board.lists, (ls) => ls.id == list);

			theList.tasks.push(debug.newTask());
		}

		// Sidebar items list
		const sidebar = ref([
			{
				img: HomeIcon,
				title: 'Homepage',
				handle() {
					routing.router.push('/');
				}
			},
			{
				icon: 'mdi-cards',
				title: 'List Overview',
				handle() {
					
				}
			},
			{
				icon: 'mdi-calendar',
				title: 'Calendar View',
				handle() {
					
				}
			},
			{
				icon: 'mdi-account',
				title: 'Members',
				handle() {
					
				}
			},
			{
				icon: 'mdi-cog',
				title: 'Board Settings',
				handle() {
					
				}
			},
			{
				divider: true
			},
			{
				icon: 'mdi-plus-circle-outline',
				title: 'Add list',
				handle() {
					addList();
				}
			}
		])

		return {
			sidebar,
			board,
			boardStyle,
			addList,
			addTask,
			removeList
		}
	}
});
</script>

<style lang="scss">
.app-titlebar {
	backdrop-filter: blur(3px);
}

.board {
	background-size: cover;
	background-position: center center;
	background-repeat: no-repeat;
}

.board-sidebar {
	.v-navigation-drawer__border {
		display: none;
	}

	.v-list-item:first-child {
		margin-top: 2px !important;
	}
}

.board-content {
	white-space: nowrap;
	overflow-x: auto;
	overflow-y: hidden;
	height: calc(100vh - 64px);

	&__list {
		vertical-align: text-top;
		margin-left: 12px;

		&:first-child {
			margin-left: 0;
		}
	}
}

.slide-fade-enter-active {
	transition: transform .1s ease, opacity .1s ease;
}

.slide-fade-leave-active {
	transition: transform .1s ease, opacity .1s ease, max-width 0.2s ease;
}

.slide-fade-enter, .slide-fade-leave-to {
	transform: translateY(-10px);
	opacity: 0;
	max-width: 0;
}
</style>