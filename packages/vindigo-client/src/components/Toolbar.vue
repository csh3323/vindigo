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

		<!-- TODO Implement icon buttons prop -->
		<!-- <icon-btn
			class="text-gray-600 mx-3"
			icon="mdi-plus-circle-outline"
			to="#"
		/>

		<div class="toolbar__divider"/> -->

		<icon-btn
			class="mx-3 text-gray-600 dark:text-gray-100"
			icon="mdi-magnify"
			to="#"
		/>

		<icon-btn
			class="mr-3 text-gray-600 dark:text-gray-100"
			icon="mdi-bell"
			to="#"
		/>

		<div class="toolbar__divider" />

		<div class="flex items-center ml-5 text-gray-800">
			<o-dropdown aria-role="list" position="bottom-left">
				<template #trigger>
					<h1 class="mb-0 font-semibold dark:text-gray-100">
						Julian Mills
					</h1>
					<!-- <icon-btn
						class="text-gray-600"
						icon="mdi-chevron-down"
						to="#"
					/> -->
					<avatar
						class="ml-2"
						:user="10"
						:src="require('/src/assets/profile.png')"
					/>
				</template>

				<div class="toolbar__account-menu rounded-2xl p-3 w-60 mt-3">
					<!-- ANCHOR TODO: change oruga button to WaveUI Button
					<o-button rounded @click="$store.dispatch('signOut')">
						Sign out
					</o-button>-->
				</div>
			</o-dropdown>
		</div>
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