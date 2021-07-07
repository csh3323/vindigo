<template>
	<header class="toolbar flex items-center px-3 bg-white dark:bg-gray-800 h-14">
		<slot>
			<router-link to="/">
				<img
					:src="logoUrl"
					class="h-10 select-none"
					@dragstart.prevent
				>
			</router-link>
		</slot>

		<div class="flex-grow" />

		<!-- TODO[epic=example] Implement icon buttons prop -->

		<!-- <icon-btn
			class="text-gray-600 mx-3"
			icon="mdi-plus-circle-outline"
			to="#"
		/>

		<div class="toolbar__divider"/> -->

		<w-button
			v-wave
			class="ml-3 text-gray-600 dark:text-gray-100"
			icon="mdi mdi-magnify"
			to="#"
			xl
		/>

		<w-button
			v-wave
			class="mx-3 text-gray-600 dark:text-gray-100"
			icon="mdi mdi-bell"
			to="#"
			xl
		/>

		<div class="toolbar__divider" />

		<w-menu align-right custom>
			<template #activator="{on}">
				<div class="flex items-center ml-5 text-gray-800" v-on="on">
					<h1 class="mb-0 font-semibold dark:text-gray-100">
						Julian Mills
					</h1>
					<w-icon class="text-gray-600" xl>
						mdi mdi-chevron-down
					</w-icon>
					<avatar
						class="ml-2"
						:user="10"
						:src="require('/src/assets/profile.png')"
					/>
				</div>
			</template>
			<div class="toolbar__account-menu bg-white rounded-xl py-3 w-60">
				<p class="text-center mb-3">
					Your Acccount
				</p>
				<w-divider />
				<div class="toolbar-list rounded-b-2xl">
					<router-link 
						to="/profile/10" class="toolbar-list__item" 
						tag="div"
					>
						<w-icon size="1.1rem">
							mdi mdi-account
						</w-icon>
						Your profile
					</router-link>
					<router-link 
						to="" class="toolbar-list__item"
						tag="div"
					>
						<w-icon size="1.1rem">
							mdi mdi-animation
						</w-icon>
						Your projects
					</router-link>
					<router-link 
						to="" class="toolbar-list__item"
						tag="div"
					>
						<w-icon size="1.1rem">
							mdi mdi-briefcase
						</w-icon>
						Your teams
					</router-link>
					<router-link 
						to="" class="toolbar-list__item"
						tag="div"
					>
						<w-icon size="1.1rem">
							mdi mdi-google-analytics
						</w-icon>
						Your activity
					</router-link>
					<w-divider />
					<router-link 
						to="" class="toolbar-list__item"
						tag="div"
					>
						<w-icon size="1.1rem">
							mdi mdi-help-circle-outline
						</w-icon>
						Help
					</router-link>
					<router-link 
						to="" class="toolbar-list__item"
						tag="div"
					>
						<w-icon size="1.1rem">
							mdi mdi-cog-outline
						</w-icon>
						Settings
					</router-link>
					<w-divider />
					<router-link
						to="" 
						class="toolbar-list__item text-red-400" 
						tag="div" @click="$store.dispatch('signOut')"
					>
						<w-icon size="1.1rem">
							mdi mdi-logout
						</w-icon>
						Sign out
					</router-link>
				</div>
			</div>
		</w-menu>
	</header>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { IconButton } from "../model/button";

export default Vue.extend({
	name: "Toolbar",
	props: {
		buttons: {
			type: Object as PropType<IconButton[]>,
		},
	},
	data: () => ({

	}),
	computed: {
		logoUrl(): boolean {
			return this.$store.state.isDark
				? require("/src/assets/vindigo-white.svg")
				: require("/src/assets/vindigo-black.svg");
		},
	},
});
</script>

<style lang="postcss">

.toolbar-list {

	&__item {

		@apply px-3 py-1 cursor-pointer bg-white;

		transition: .15s background-color ease-in-out;

		&:hover {
			@apply bg-gray-100;
		}

		.w-icon {
			@apply mt-[-3px] mr-1;
		}
	}
}

.toolbar {
	&__divider {
		background-color: #e1e1e1;
		width: 2px;

		@apply h-10;
	}

	.o-drop__trigger {
		@apply flex items-center;
	}

	&__account-menu {
		@mixin emissive theme('colors.gray.400');
	}
}
</style>