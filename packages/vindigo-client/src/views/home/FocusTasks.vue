<template>
	<section class="focus-tasks">
		<section-title icon="mdi-check-circle-outline">
			{{ $t('HOMEPAGE_SECTION_FOCUS') }}
		</section-title>
		<div class="focus-tasks__content rounded-2xl p-4 bg-[#DDE0EB] dark:bg-gray-800 mt-2 h-36">
			<div class="text-gray-500">
				<router-link to="/project/demo">
					Demo project
				</router-link>
				<br>
				<language-picker />
			</div>
		</div>
	</section>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
	name: "FocusTasks",
});
</script>