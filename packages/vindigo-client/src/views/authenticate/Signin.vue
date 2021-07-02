<template>
	<section class="sign-in flex flex-col">
		<h1 class="font-semibold text-white text-2xl uppercase tracking-widest py-3">
			Welcome
		</h1>
		<form>
			<w-input
				v-model="identity"
				class="auth-box__input text-center"
				placeholder="Email or Username"
			/>
			<w-input
				v-model="password"
				class="auth-box__input my-3"
				placeholder="Password"
				type="password"
			/>
		</form>
		<div class="flex text-white">
			<w-checkbox v-model="remember">
				Remember me
			</w-checkbox>
			<div class="flex-grow" />
			<a href="">Forgot password</a>
		</div>
		<div class="flex-grow" />
		<w-button @click="authenticate">
			Sign in
			<w-icon color="white">
				mdi mdi-chevron-right
			</w-icon>
		</w-button>
		
		<div
			v-if="canRegister"
			class="auth-box__toggle"
			@click="$emit('toggle')"
		>
			Don't have an account?
			<strong class="font-semibold">
				Sign up
			</strong>
			instead!
		</div>
	</section>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	name: 'SignIn',

	data: () => ({
		identity: '',
		password: '',
		remember: false
	}),
	
	computed: {
		canRegister() {
			return this.$config.allowRegister;
		}
	},

	methods: {
		async authenticate() {
			const profile = await this.$vuex.dispatch('signIn', {
				identity: this.identity,
				password: this.password,
				remember: this.remember
			});

			if(!profile) {
				// ANCHOR TODO: call notification method with text: 'Invalid credentials'
			}
		}
	}
});
</script>

<style lang="postcss" scoped>

.auth-box__input {
	@apply bg-gray-100 text-white rounded-full py-1 border-b-0;
}

</style>

<style lang="postcss">

.w-input__input-wrap--underline {
	border-width: 0 0 0;
}

</style>