<template>
	<div class="home-page__focus-list rounded-2xl p-4">
		<div class="text-gray-500">
			<router-link to="/project/demo">
				Demo project
			</router-link>
			<br>
			<language-picker />
		</div>
	</div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
	name: "FocusTasks",
});
</script>