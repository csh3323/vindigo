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
				<template v-for="btn in sbItems">
					<v-divider v-if="btn.divider" :key="btn.title"/>
					<v-tooltip v-else right :key="btn.title">
						<template v-slot:activator="{on}">
							<v-list-item :ripple="false" v-on="on" @click="btn.handle" class="my-2">
								<v-list-item-action>
									<v-img v-if="btn.img" :src="btn.img"></v-img>
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
		<v-app-bar app color="rgba(0, 0, 0, 0.25)" class="elevation-0">
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

				<!-- Board List -->
				<transition-group appear name="slide-fade">
					<v-card
						v-for="list in board.lists" :key="list.id" 
						width="300"
						class="board-content__list d-inline-block elevation-4"
					>
						<v-card-title class="body-1 pl-3 pt-3 pr-3 pb-0">
							<div class="text-truncate">
								{{list.title}}
							</div>
							<v-spacer/>
							<v-btn icon small @click="removeList(list.id)">
								<v-icon small>mdi-dots-vertical</v-icon>
							</v-btn>
						</v-card-title>
						<div class="board-content__list-content pl-3 pr-3 pb-3 pt-1">
							<task v-for="task in list.tasks" :key="task.id" :data="task"></task>
						</div>
						<div class="pl-3 pr-3 pb-3">
							<v-btn outlined small block color="blue">
								<v-icon left>
									mdi-plus
								</v-icon>
								Add task
							</v-btn>
						</div>
					</v-card>
				</transition-group>

			</v-container>
		</v-content>
	</v-app>
</template>

<script lang="ts">
import HomeIcon from '../../../assets/img/icon.png';

import { defineComponent, ref, computed, reactive } from "@vue/composition-api";
import { StoreKey, injectKey, RouterKey } from "../../common/Providers";
import { StoreService } from "../../store/StoreService";
import { random } from 'faker';
import Task from './Task.vue';
import _ from 'lodash';

export default defineComponent({
	name: 'board',
	components: {
		Task
	},
	setup(props, ctx) {
		const router = injectKey(RouterKey).router;
		const test = ref(false);

		// Board information object
		const board = reactive({
			// backgroundImage: 'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2560x1703/2af5e1bfcfbaaac81054e415c60443dd/photo-1451187580459-43490279c0fa',
			backgroundImage: null,
			backgroundColor: '#1289A7',
			title: 'Project Asteroids',
			lists: [] as any[]
		});

		// Compute the background
		const boardStyle = computed(() => {
			const style = {} as any;

			if(board.backgroundImage) {
				style.backgroundImage = 'url(' + board.backgroundImage + ')';
			} else {
				style.backgroundColor = board.backgroundColor;
			}

			return style;
		});

		// Append a new list
		function addList() {
			let tasks: any[] = [];
			let count = 1 + (Math.random() * 7);

			for(let i = 0; i < count; i++) {
				tasks.push({
					id: ''+Math.random(),
					title: _.capitalize(random.words()),
					tags: ['#A3CB38', '#e74c3c']
				});
			}

			board.lists.push({
				id: ''+Math.random(),
				title: _.capitalize(random.word()),
				tasks: tasks
			});
		}

		// Remove a list by id
		function removeList(id: String) {
			const list = _.find(board.lists, (list) => list.id == id);
			const idx = board.lists.indexOf(list);

			board.lists.splice(idx, 1);
		}

		// Sidebar items list
		const sbItems = ref([
			{
				img: HomeIcon,
				title: 'Homepage',
				handle() {
					router.push('/');
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
			sbItems,
			board,
			boardStyle,
			addList,
			removeList,
			test
		}
	}
});
</script>

<style lang="scss">
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