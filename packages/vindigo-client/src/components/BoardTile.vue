<template>
	<div class="board-tile h-32 bg-[#DDE0EB] dark:bg-[#202127] rounded-xl p-4">
		<div class="board-tile__title text-gray-700 dark:text-gray-200 font-bold">
			{{ name }}
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	name: 'BoardTile',
	props: ['name']
});
</script>