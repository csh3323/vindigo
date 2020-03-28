<template>
	<v-card class="task elevation-1">
		<v-container fluid grid-list-sm class="pb-0">
			<v-layout wrap>
				<v-flex xs2 v-for="tag in data.tags" :key="tag">
					<!-- <v-tooltip top>
						<template v-slot:activator="{on}"> -->
							<div :style="colorTag(tag)"></div>
						<!-- </template>
						<span>
							Tag name
						</span>
					</v-tooltip> -->
				</v-flex>
			</v-layout>
		</v-container>
		<v-card-text class="pl-3 pb-3 pr-3 pt-2 black--text">
			{{data.title}}
		</v-card-text>
	</v-card>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
	name: 'task',
	props: {
		data: { required: true }
	},
	setup() {
		function colorTag(tag: string) {
			return {
				backgroundColor: tag,
				height: '7px',
				borderRadius: '3px'
			}
		}

		return {
			colorTag
		}
	}
})
</script>

<style lang="scss" scoped>
.task {
	margin-top: 8px;
}
</style>