<template>
	<router-view :app="app"/>
</template>

<script lang="ts">
import { defineComponent, provide } from "@vue/composition-api";
import { StoreKey, RouterKey, AppKey } from '../common/Providers';

export default defineComponent({
	props: {
		app: { required: true },
		store: { required: true },
		router: { required: true }
	},
	setup(props) {
		// Provide important core instances
		// to the entire component tree for
		// easy access via injection.

		provide(AppKey, props.app);
		provide(StoreKey, props.store);
		provide(RouterKey, props.router);

	}
});
</script>