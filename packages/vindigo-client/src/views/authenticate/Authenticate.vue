<template>
	<section class="auth-page">
		<toolbar class="pl-0" />
		<div class="h-80 laptop:h-72 -mt-14 bg-white dark:bg-gray-800 flex items-center justify-center" />
		<section class="flex -mt-8 rounded-2xl bg-blue-400 w-[65vw] mx-auto">
			<section class="flex col-start-6">
				<h1>Welcome</h1>
				<o-input></o-input>
				<o-input></o-input>
				<div class="flex justify-between">

				</div>
				<o-button>Sign in</o-button>
			</section>
			<section class="flex col-start-6">
				ss
			</section>
		</section>
	</section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	name: 'Authenticate',

	computed: {
		logoUrl(): boolean {
			return this.$store.state.isDark
				? require("/src/assets/vindigo-white.svg")
				: require("/src/assets/vindigo-black.svg");
		},
	}
});
</script>