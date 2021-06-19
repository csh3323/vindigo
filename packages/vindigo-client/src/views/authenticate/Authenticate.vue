<template>
	<section class="auth-page">
		<div class="h-96 laptop:h-72 bg-white" />
		<div class="-mt-44">
			<img
				:src="logoUrl"
				class="h-16 mx-auto mb-3"
			>
			<div class="text-center font-semibold text-2xl text-[#2f3a41] mb-6">
				EXODIUS PLANNING BOARD
			</div>
			<section class="auth-box flex mx-auto">
				<div class="auth-box__left rounded-tl-2xl rounded-bl-2xl flex-1 px-8 py-4 text-center">
					<div class="relative">
						<zoom-x-transition>
							<component
								:is="authView"
								class="absolute inset-0"
								@toggle="isSigningUp = !isSigningUp"
							/>
						</zoom-x-transition>
					</div>
				</div>
				<div class="auth-box__right rounded-tr-2xl rounded-br-2xl flex-1 px-8 py-4 bg-white">
					<div class="h-80 flex items-center justify-center">
						<img :src="require('/src/assets/illustration.png')">
					</div>
				</div>
			</section>
		</div>
	</section>
</template>

<script lang="ts">
import Vue from 'vue';
import SignIn from './Signin.vue';
import SignUp from './Register.vue';

export default Vue.extend({
	name: 'Authenticate',
	
	data: () => ({
		isSigningUp: false
	}),

	computed: {
		logoUrl(): boolean {
			return this.$store.state.isDark
				? require("/src/assets/vindigo-white.svg")
				: require("/src/assets/vindigo-black.svg");
		},
		authView() {
			return this.isSigningUp ? SignUp : SignIn;
		}
	}
});
</script>

<style lang="postcss">
.auth-box {
	width: 735px;

	&__left {
		background: linear-gradient(135deg, rgba(2,198,255,1) 0%, rgba(105,67,255,1) 100%);
		@mixin emissive theme('colors.blue.500');
	}

	&__right {
		@mixin emissive theme('colors.gray.500');
	}

	&__toggle {
		@apply font-light text-sm mt-3 cursor-pointer select-none text-gray-100;
	}
}

.auth-box__input > .o-input {
	@apply text-center;
}
</style>