<template>
	<div>
		<v-card>
			<v-card-text>
				Value = {{values}}
			</v-card-text>
		</v-card>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
	name: 'TelescopeApp',
	props: {},
	setup(props, ctx) {
		
	}
})
</script>