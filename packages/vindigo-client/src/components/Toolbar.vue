<template>
	<header
		ref="toolbar"
		class="toolbar"
		:class="toolbarClass"
	>
		<slot>
			<router-link to="/">
				<img
					:src="logoUrl"
					class="h-10 select-none"
					@dragstart.prevent
				>
			</router-link>
		</slot>

		<spacer />

		<!-- The search container -->
		<div class="toolbar__search">
			<w-input
				class="rounded-lg overflow-hidden mr-4"
				inner-icon-left="mdi mdi-magnify"
				placeholder="Search projects, teams, tasks, people..."
				bg-color="gray-200"
				color="gray-700"
			/>
		</div>

		<!-- Create new button -->
		<w-button
			v-wave
			class="mr-0 text-indigo-600 dark:text-gray-100"
			icon="mdi mdi-plus-circle"
			to="#"
			xl
		/>

		<!-- Notification button -->
		<w-button
			v-wave
			class="mr-3 text-gray-600 dark:text-gray-100"
			icon="mdi mdi-bell"
			to="#"
			xl
		/>

		<div class="toolbar__divider mr-4" />

		<!-- Account menu -->
		<w-menu
			align-right
			custom
		>
			<template #activator="{on}">
				<div
					class="flex items-center text-gray-800 cursor-pointer"
					v-on="on"
				>
					<h1 class="mb-0 font-semibold dark:text-gray-100">
						{{ userName }}
					</h1>
					<avatar
						class="ml-2"
						:profile="$vuex.state.profile"
						:open-profile="false"
					/>
				</div>
			</template>
			<div class="account-menu">
				<p class="text-center mb-3 text-gray-500 font-semibold">
					{{ $t('TOOLBAR_YOUR_ACCOUNT') }}
				</p>
				<w-divider />
				<div class="account-menu__list">
					<router-link
						to="/profile/10"
						class="account-menu__item"
						tag="div"
					>
						<w-icon size="1.1rem">
							mdi mdi-account
						</w-icon>
						Your profile
					</router-link>
					<router-link
						to=""
						class="account-menu__item"
						tag="div"
					>
						<w-icon size="1.1rem">
							mdi mdi-animation
						</w-icon>
						Your projects
					</router-link>
					<router-link
						to=""
						class="account-menu__item"
						tag="div"
					>
						<w-icon size="1.1rem">
							mdi mdi-briefcase
						</w-icon>
						Your teams
					</router-link>
					<router-link
						to=""
						class="account-menu__item"
						tag="div"
					>
						<w-icon size="1.1rem">
							mdi mdi-google-analytics
						</w-icon>
						Your activity
					</router-link>
					<w-divider />
					<router-link
						to=""
						class="account-menu__item"
						tag="div"
					>
						<w-icon size="1.1rem">
							mdi mdi-help-circle-outline
						</w-icon>
						Help
					</router-link>
					<router-link
						to="/settings"
						class="account-menu__item"
						tag="div"
					>
						<w-icon size="1.1rem">
							mdi mdi-cog-outline
						</w-icon>
						Settings
					</router-link>
					<w-divider />
					<div
						class="account-menu__item text-red-400"
						@click="$store.dispatch('signOut')"
					>
						<w-icon size="1.1rem">
							mdi mdi-logout
						</w-icon>
						Sign out
					</div>
				</div>
			</div>
		</w-menu>
	</header>
</template>

<script lang="ts">
import Vue from "vue";
import { Optional } from "../typings/types";
import { Scrollable } from '../mixin/scrollable';

export default Vue.extend({
	name: "Toolbar",
	mixins: [
		Scrollable
	],

	props: {
		// buttons: {
		// 	type: Object as PropType<IconButton[]>,
		// },
	},
	
	computed: {
		logoUrl(): boolean {
			return this.$store.state.isDark
				? require("/src/assets/vindigo-white.svg")
				: require("/src/assets/vindigo-black.svg");
		},
		userName(): Optional<string> {
			return this.$vuex.state.profile?.fullName;
		},
		toolbarClass(): any {
			return {
				'toolbar--sticky': (this as any).isScrolling
			};
		}
	},

	methods: {
		getScrollView() {
			return this.$el.parentElement;
		}
	}
});
</script>

<style lang="postcss">
.account-menu {
	@apply bg-white overflow-hidden rounded-xl pt-3 w-60;
	@mixin emissive theme("colors.gray.400");

	&__list {
		@apply overflow-hidden pb-1;
	}

	&__item {
		@apply px-3 py-2 cursor-pointer transition-colors hover:bg-gray-100;

		.w-icon {
			@apply mt-[-3px] mr-1;
		}
	}

	.w-divider {
		@apply my-1;
	}
}

.toolbar {
	@apply flex items-center px-3 bg-white dark:bg-gray-800 h-14 sticky top-0 z-10 transition-shadow;

	&__divider {
		background-color: #e1e1e1;
		width: 2px;

		@apply h-10;
	}
	
	&__search {
		@apply absolute inset-x-0 mx-auto max-w-sm opacity-80 hover:opacity-100 transition-opacity;

		input {
			@apply text-gray-800;

			&::placeholder {
				@apply text-gray-500;
			}
		}
	}

	&--sticky {
		@apply shadow-lg;
	}

	.o-drop__trigger {
		@apply flex items-center;
	}
}
</style>