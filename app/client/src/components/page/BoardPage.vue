<template>
	<v-app>
		<!-- Sidebar drawer -->
		<v-navigation-drawer
			app
			dark
			permanent
			mini-variant
			class="board-sidebar"
		>
			<v-list nav dense dark class="board-sidebar__nav">
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
				My Epic Board
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

		<!-- Page content -->
		<v-content class="board" :style="boardStyle">
			<v-container fluid class="board-content mb-0 pa-5">
				<v-card width="300" class="board-content__list d-inline-block">
					<v-card-title class="subheader">
						Todo
					</v-card-title>
					<v-card-text>
						Test
					</v-card-text>
				</v-card>
			</v-container>
		</v-content>
	</v-app>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "@vue/composition-api";
import { StoreKey, injectKey, RouterKey } from "../../common/Providers";
import { StoreService } from "../../store/StoreService";
import HomeIcon from '../../../assets/img/icon.png';

// Provide sidebar related functionality
function useSidebar() {
	const router = injectKey(RouterKey).router;

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
			divider: true
		},
		{
			icon: 'mdi-plus-circle-outline',
			title: 'Add list',
			handle() {
				
			}
		}
	])

	return {
		sbItems
	}
}

function useBoard() {
	const background = ref('https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2560x1703/2af5e1bfcfbaaac81054e415c60443dd/photo-1451187580459-43490279c0fa');
	const lists = ref([
		{
			title: 'Sprint 1 - Jan 26'
		}
	]);

	const boardStyle = computed(() => ({
		backgroundImage: `url(${background.value})`
	}));

	return {
		boardStyle,
		lists
	}
}

export default defineComponent({
	props: {
		app: {required: true}
	},
	setup(props, ctx) {
		return {
			...useSidebar(),
			...useBoard()
		}
	}
});
</script>

<style lang="scss" scoped>
.board {
	background-size: cover;
	background-position: center center;
	background-repeat: no-repeat;
}

.board-sidebar {
	.v-navigation-drawer__border {
		display: none !important;
	}

	.v-list-item:first-child {
		margin-top: 2px !important;
	}
	
}

.board-content {
	user-select: none;
	white-space: nowrap;
	margin-bottom: 8px;
	overflow-x: auto;
	overflow-y: hidden;
	padding-bottom: 8px;
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;

	&__list {
		margin-left: 12px;

		&:first-child {
			margin-left: 0;
		}
	}
}
</style>