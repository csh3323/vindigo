<template>
	<header class="toolbar flex items-center px-3 bg-white h-14">
		<slot>
			<img
				:src="logoUrl"
				class="h-10 select-none"
				@dragstart.prevent
			/>
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
			class="mx-3 text-gray-600"
			icon="mdi-magnify"
			to="#"
		/>

		<icon-btn
			class="mr-3 text-gray-600"
			icon="mdi-bell"
			to="#"
		/>

		<div class="toolbar__divider" />

		<div class="flex items-center ml-5 text-gray-800">
			<o-dropdown aria-role="list" position="bottom-left">
				<template #trigger>
					<h1 class="mb-0 font-semibold">
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
					Test
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
		logoUrl() {
			return require("/src/assets/vindigo-black.svg");
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