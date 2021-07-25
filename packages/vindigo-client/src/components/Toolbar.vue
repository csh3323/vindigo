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
				placeholder="Search anything..."
				bg-color="gray-200"
				color="gray-700"
			/>
		</div>

		<!-- Create new button -->
		<w-menu
			v-model="creationMenu"
			align-center
			custom
		>
			<template #activator="{on}">
				<w-button
					v-wave
					class="mr-0 text-indigo-600 dark:text-gray-100"
					icon="mdi mdi-plus-circle"
					to="#"
					xl
					v-on="on"
				/>
			</template>
			<div class="toolbar-menu">
				<p class="toolbar-menu__title">
					{{ $t('TOOLBAR_CREATE') }}
				</p>
				<w-divider />
				<div class="toolbar-menu__list">
					<div
						class="toolbar-menu__item"
						@click="openProjectCreation"
					>
						<w-icon size="1.1rem">
							mdi mdi-folder-open
						</w-icon>
						{{ $t('TOOLBAR_CREATE_PROJECT') }}
						<p class="text-gray-400">
							{{ $t('TOOLBAR_CREATE_PROJECT_DESC') }}
						</p>
					</div>
					<div
						class="toolbar-menu__item"
						@click="openTeamCreation"
					>
						<w-icon size="1.1rem">
							mdi mdi-account-group
						</w-icon>
						{{ $t('TOOLBAR_CREATE_TEAM') }}
						<p class="text-gray-400">
							{{ $t('TOOLBAR_CREATE_TEAM_DESC') }}
						</p>
					</div>
				</div>
			</div>
		</w-menu>

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
			<div class="toolbar-menu">
				<p class="toolbar-menu__title">
					{{ $t('TOOLBAR_YOUR_ACCOUNT') }}
				</p>
				<w-divider />
				<div class="toolbar-menu__list">
					<router-link
						to="/profile/10"
						class="toolbar-menu__item"
						tag="div"
					>
						<w-icon size="1.1rem">
							mdi mdi-account
						</w-icon>
						Your profile
					</router-link>
					<router-link
						to=""
						class="toolbar-menu__item"
						tag="div"
					>
						<w-icon size="1.1rem">
							mdi mdi-animation
						</w-icon>
						Your projects
					</router-link>
					<router-link
						to=""
						class="toolbar-menu__item"
						tag="div"
					>
						<w-icon size="1.1rem">
							mdi mdi-briefcase
						</w-icon>
						Your teams
					</router-link>
					<router-link
						to=""
						class="toolbar-menu__item"
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
						class="toolbar-menu__item"
						tag="div"
					>
						<w-icon size="1.1rem">
							mdi mdi-help-circle-outline
						</w-icon>
						Help
					</router-link>
					<router-link
						to="/settings"
						class="toolbar-menu__item"
						tag="div"
					>
						<w-icon size="1.1rem">
							mdi mdi-cog-outline
						</w-icon>
						Settings
					</router-link>
					<w-divider />
					<div
						class="toolbar-menu__item text-red-400"
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

		<!-- ANCHOR Project creation dialog -->
		<w-dialog
			v-model="newProjectDialog"
			dialog-class="rounded-xl"
			width="600"
		>
			<section-title icon="mdi mdi-folder-multiple-plus">
				Create new project
			</section-title>
			
			<div class="p-2">
				<label class="text-gray-500 mb-1 mt-3 block text-sm">
					Project name
				</label>
				<w-input
					v-model="newProjectName"
					class="rounded-lg overflow-hidden"
					bg-color="gray-200"
					color="gray-700"
				/>

				<label class="text-gray-500 mb-1 mt-3 block text-sm">
					Description <small>(optional)</small>
				</label>
				<w-textarea
					v-model="newProjectDesc"
					class="rounded-lg overflow-hidden"
					bg-color="gray-200"
					color="gray-700"
					rows="3"
				/>

				<label class="text-gray-500 mb-1 mt-3 block text-sm">
					Invite members <small>(optional)</small>
				</label>

				<div class="addition-list">
					<!-- TODO Implement member addition -->
					<avatar
						v-for="i in tempMemberCount"
						:key="i"
						class="-mr-2 mb-1 block"
						:profile="$vuex.state.profile"
						:open-profile="false"
						:size="46"
					/>
					<div
						v-if="tempMemberCount < 12"
						class="addition-list"
						@click="tempMemberCount++"
					>
						<w-icon class="addition-list__add-btn">
							mdi mdi-plus
						</w-icon>
					</div>
				</div>

				<div class="flex mt-5">
					<spacer />
					<w-button
						v-wave
						color="white"
						bg-color="indigo-600"
						:loading="newProjectLoading"
						:disabled="!newProjectName"
						@click="createProject"
					>
						<w-icon class="mr-2">
							mdi mdi-plus
						</w-icon>
						Create project
					</w-button>
				</div>
			</div>
		</w-dialog>
	</header>
</template>

<script lang="ts">
import Vue from "vue";
import { Optional } from "../typings/types";
import { Scrollable } from "../mixin/scrollable";
import { api } from "..";
import { gql } from "@apollo/client/core";

export default Vue.extend({
	name: "Toolbar",
	mixins: [Scrollable],

	data: () => ({
		creationMenu: false,

		// Project creation
		newProjectDialog: false,
		newProjectName: "",
		newProjectDesc: "",
		newProjectLoading: false,
		tempMemberCount: 1,

		// Team creation
		createTeamDialog: false,
		createTeamName: "",
	}),

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
				"toolbar--sticky": (this as any).isScrolling,
			};
		},
	},

	methods: {
		getScrollView() {
			return this.$el.parentElement;
		},
		openProjectCreation() {
			this.creationMenu = false;
			this.newProjectDialog = true;
			this.newProjectName = "";
		},
		openTeamCreation() {
			this.creationMenu = false;
			this.createTeamDialog = true;
			this.createTeamName = "";
		},
		async createProject() {
			this.newProjectLoading = true;

			await api.query(gql`
				mutation ($data: ProjectCreationInput!) {
					createProject(details: $data) {
						id
					}
				}
			`, {
				data: {
					name: this.newProjectName,
					description: this.newProjectDesc,
					public: false
				}
			});

			this.newProjectLoading = false;
			this.newProjectDialog = false;
		}
	},
});
</script>

<style lang="postcss">
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

.toolbar-menu {
	@apply bg-white overflow-hidden rounded-xl pt-3 w-60;
	@mixin emissive theme("colors.gray.400");

	&__title {
		@apply text-center mb-3 text-gray-800 font-semibold;
	}

	&__list {
		@apply overflow-hidden pb-1;
	}

	&__item {
		@apply px-3 py-2 cursor-pointer transition-colors text-gray-700 hover:bg-gray-100;

		.w-icon {
			@apply mt-[-3px] mr-1;
		}

		p {
			@apply text-sm;
		}
	}

	.w-divider {
		@apply my-1;
	}
}

.addition-list {
	@apply flex;

	&__add-btn {
		@apply bg-indigo-600 w-12 h-12 m-1 rounded-full ring-4 ring-indigo-600 ring-opacity-40
		flex justify-center items-center text-white cursor-pointer;
	}
}
</style>