<template>
	<section class="sign-up flex flex-col">
		<h1 class="font-semibold text-white text-2xl uppercase tracking-widest py-3">
			SIGN UP
		</h1>
		<form>
			<w-input
				v-model="email"
				class="auth-box__input my-5 text-center"
				placeholder="Email Address"
				autocomplete="sign-up email"
				name="email"
				round
			/>
			<w-input
				v-model="fullname"
				class="auth-box__input my-5 text-center"
				placeholder="Full Name"
				autocomplete="sign-up name"
				name="name"
				round
			/>
			<w-input
				v-model="password"
				class="auth-box__input my-5"
				placeholder="Password"
				password-reveal
				autocomplete="sign-up password"
				type="password"
				name="password"
				round
			/>
		</form>
		<div class="flex text-white">
			<w-checkbox v-model="remember" round>
				Remember me
			</w-checkbox>
		</div>
		<spacer />
		<w-button
			round
			class="w-full h-9 auth-box__button"
			color="white"
			bg-color="indigo-600"
			:loading="loading"
			@click="register"
		>
			Register Account
			<w-icon>
				mdi mdi-chevron-right
			</w-icon>
		</w-button>

		<div class="auth-box__toggle" @click="$emit('toggle')">
			Already have an account?
			<strong class="font-semibold">
				Sign in
			</strong>
		</div>
	</section>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
	name: 'Register',
	
	data: () => ({
		fullname: '',
		email: '',
		password: '',
		remember: false,
		loading: false
	}),
	
	methods: {
		async register() {
			this.loading = true;

			await this.$vuex.dispatch('signUp', {
				fullname: this.fullname,
				email: this.email,
				password: this.password,
				remember: this.remember
			});

			this.loading = false;
		}
	}
});
</script>