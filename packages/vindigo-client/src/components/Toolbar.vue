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

		<w-button
			v-wave
			class="bg-transparent border-none ml-3 text-gray-600 dark:text-gray-100"
			icon="mdi mdi-magnify"
			to="#"
			xl
		/>

		<w-button
			v-wave
			class="bg-transparent border-none mx-3 text-gray-600 dark:text-gray-100"
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
			<div class="toolbar__account-menu rounded-2xl p-3 w-60">
				<w-button
					round
					@click="$store.dispatch('signOut')"
				>
					Sign out
				</w-button>
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