<template>
	<div class="board-card shadow-sm bg-gray-400">
		<div>ss</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
	name: "BoardCard",
	data: () => ({
		id: 0,
		title: "",
		colors: [],
		assignees: [],
	}),
});
</script>

<style lang="postcss" scoped>
.board-card {
	display: grid;
	grid-template-columns: 5px 300px;
	height: 185px;
	@apply shadow-sm;
}

.board-card > div:nth-child(0) {
	@apply bg-purple-500;
}
</style>