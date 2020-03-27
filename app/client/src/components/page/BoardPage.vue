<template>
	<v-app>
		<!-- Sidebar drawer -->

		<!-- Toolbar -->

		<!-- Page content -->
		<v-content>
			Test
		</v-content>
	</v-app>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { StoreKey, injectKey } from "../../common/Providers";
import { StoreService } from "../../store/StoreService";

export default defineComponent({
	props: {
		app: {required: true}
	},
	setup(props, ctx) {
		const store = injectKey(StoreKey);

		store.registerStore
	}
});
</script>