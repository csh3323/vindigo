<template>
	<section class="auth-page">
		<toolbar class="pl-0" />
		<div class="h-80 laptop:h-72 -mt-14 bg-white dark:bg-gray-800 flex items-center justify-center" />
		<section class="flex -mt-8 w-[45vw] mx-auto">
			<section class="flex w-[100%]">
				<div class="rounded-tl-md rounded-bl-md bg-blue-400 auth__emissive-blue flex-1 px-4 pb-4 text-center">
					<h1 class="font-semibold text-white my-4">Welcome</h1>
					<o-input class="auth__input --rounded my-5" placeholder="No label" rounded></o-input>
					<o-input class="auth__input --rounded my-5" placeholder="No label" rounded></o-input>
					<div class="flex justify-between">
						<div>
							* Remember me
						</div>
						<a href="">Forgot password</a>
					</div>
					<o-button>Sign in</o-button>
				</div>
				<div class="auth__emissive-dark p-4 bg-white rounded-tr-md rounded-br-md flex-1">
					end
				</div>
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

<style lang="postcss">

@tailwind base;
@tailwind components;
@tailwind utilities;

.o-btn {
	@apply bg-purple-500 !important;
}

.auth__emissive-blue {
	background: linear-gradient(130deg, rgba(2,198,255,1) 0%, rgba(105,67,255,1) 100%);
	@mixin emissive theme('colors.blue.500');
}

.auth__emissive-dark {
	@mixin emissive theme('colors.gray.500');
}

.auth__input > .o-input {
	@apply text-sm text-center py-2;
}

</style>