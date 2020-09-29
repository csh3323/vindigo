<template>
	<v-app>
		<!-- Sidebar drawer -->
		<v-navigation-drawer
			app
			permanent
			mini-variant
			class="board-sidebar sidebar elevation-5"
		>
			<v-list nav dense class="board-sidebar__nav">
				<div v-for="btn in sidebar" :key="btn.title" class="board-sidebar-item">
					<v-divider v-if="btn.divider" class="board-sidebar-item__divider"/>
					<template v-else>
						<div :class="{'board-sidebar-item__indicator': true, 'board-sidebar-item__indicator--active': btn.active}"></div>
						<v-tooltip right>
							<template v-slot:activator="{on}">
								<v-list-item :ripple="false" v-on="on" @click="btn.handle" class="my-2">
									<v-list-item-action>
										<v-img v-if="btn.img" :src="btn.img" :transition="false"></v-img>
										<v-icon v-else class="sidebar-icon--text">{{btn.icon}}</v-icon>
									</v-list-item-action>
								</v-list-item>
							</template>
							<span>
								{{btn.title}}
							</span>
						</v-tooltip>
					</template>
				</div>
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
				placeholder="Search cards..."
				hide-details
				dark
			/>
		</v-app-bar>

		<!-- Teleboard Board -->
		<v-content class="board" :style="boardStyle">
			<v-container fluid class="board-content mb-0 pa-0">
				<router-view :board="board" :controls="boardControls"/>
			</v-container>
		</v-content>
	</v-app>
</template>

<script lang="ts">
import HomeIcon from '../../../assets/img/icon.png';

import { defineComponent, ref, computed, reactive, onMounted, onUnmounted } from "@vue/composition-api";
import { StoreKey, injectKey, RouterKey } from "../../common/Providers";
import { StoreService } from "../../store/StoreService";
import * as debug from '../../common/Debug';
import { isHexColor, routeChanged } from '../../common/Utility';
import _ from 'lodash';
import { Route } from 'vue-router';
import { IBoardList } from '../../common/Board';

/**
 * Handle sidebar navigation and generation
 */
function useSidebar(controls: any) {
	const routing = injectKey(RouterKey);
	const current = ref<Route>(routing.router.currentRoute);

	// Listen for changes of the current route
	routeChanged((to) => {
		current.value = to;
	});

	// Construct the sidebar with dyanmic current value
	const sidebar = computed(() => {
		const currId = current.value.meta.id;

		return [
			{
				img: HomeIcon,
				title: 'Homepage',
				active: false,
				handle() {
					routing.goto('/');
				}
			},
			{
				icon: 'mdi-cards',
				title: 'List Overview',
				active: currId == 'board-lists',
				handle() {
					routing.goto('tasks');
				}
			},
			{
				icon: 'mdi-calendar',
				title: 'Calendar View',
				active: currId == 'board-calendar',
				handle() {
					routing.goto('calendar');
				}
			},
			{
				icon: 'mdi-account',
				title: 'Members',
				active: currId == 'board-members',
				handle() {
					routing.goto('members');
				}
			},
			{
				icon: 'mdi-cog',
				title: 'Board Settings',
				active: currId == 'board-settings',
				handle() {
					routing.goto('settings');
				}
			},
			{
				divider: true
			},
			{
				icon: 'mdi-plus-circle-outline',
				title: 'Add list',
				active: false,
				handle() {
					controls.addList();
				}
			}
		]
	});

	return {
		sidebar
	}
}

/**
 * Handle board logic including lists and tasks
 */
function useBoard() {
	const board = reactive(debug.newBoardWithTasks());

	const boardStyle = computed(() => {
		const style = {} as any;

		if(isHexColor(board.background)) {
			style.backgroundColor = board.background;
		} else {
			style.backgroundImage = 'url(' + board.background + ')';
		}

		return style;
	});

	const boardControls = { 
		addList() {
			board.lists.push(debug.newList());
		},

		removeList(id: string) {
			const theList = _.find(board.lists, (list) => list.id == id);

			if(theList === undefined) {
				throw new Error();
			}

			board.lists.splice(board.lists.indexOf(theList), 1);
		},
		
		addTask(list: string) {
			const theList = _.find(board.lists, (ls) => ls.id == list);

			if(theList === undefined) {
				throw new Error();
			}

			theList.tasks.push(debug.newTask());
		}
	}

	return {
		board,
		boardStyle,
		boardControls
	}
}

export default defineComponent({
	name: 'board',
	setup(props, ctx) {
		const board = useBoard();
		const sidebar = useSidebar(board.boardControls);

		return {
			...sidebar,
			...board
		}
	}
});
</script>

<style lang="scss">
.app-titlebar {
	backdrop-filter: blur(3px);
}

.board-sidebar-item {
	position: relative;

	&__indicator {
		width: 4px;
		position: absolute;
		top: 0;
		left: -12px;
		bottom: 0;
		background-color: rgb(0, 204, 255);
		border-top-right-radius: 100px;
		border-bottom-right-radius: 100px;
		transition: left .2s;

		&--active {
			left: -8px;
		}
	}

	&__divider {
		background-color: rgba(255, 255, 255, 0.2);
	}
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