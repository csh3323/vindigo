<template>
	<section class="auth-page">
		<toolbar class="pl-0" />
		<div class="h-80 laptop:h-72 -mt-14 bg-white dark:bg-gray-800 flex items-center justify-center" />
		<div class="h-full flex flex-col justify-center items-center">
			<div class="text-center text-3xl font-bold pb-8">
				<img :src="logoUrl" class="h-14">
			</div>
			<div class="mx-auto w-96 h-96 rounded-2xl shadow-2xl p-8 bg-purple-500 z-10 ring-8 ring-offset-purple-500v">
				Test
			</div>
		</div>
		<img :src="require('/src/assets/pattern-left.png')" class="fixed bottom-0 left-0 opacity-10">
		<img :src="require('/src/assets/pattern-right.png')" class="fixed bottom-0 right-0 opacity-10">
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