<template>
	<section class="sign-in flex flex-col">
		<h1 class="font-semibold text-white text-2xl uppercase tracking-widest py-3">
			Welcome
		</h1>
		<form>
			<w-input
				v-model="identity"
				class="auth-box__input my-5"
				placeholder="Email or Username"
				autocomplete="sign-in email"
				round
			/>
			<w-input
				v-model="password"
				class="auth-box__input my-5"
				placeholder="Password"
				autocomplete="sign-in password"
				type="password"
				round
			/>
		</form>
		<div class="flex text-white">
			<w-checkbox v-model="remember" round>
				Remember me
			</w-checkbox>
			<div class="flex-grow" />
			<a href="">Forgot password</a>
		</div>
		<div class="flex-grow" />
		<w-button
			round
			class="d-block w-full h-9 auth-box__button"
			:loading="loading"
			@click="authenticate"
		>
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
		remember: false,
		loading: false
	}),
	
	computed: {
		canRegister() {
			return this.$config.allowRegister;
		}
	},

	methods: {
		async authenticate() {
			this.loading = true;

			const profile = await this.$vuex.dispatch('signIn', {
				identity: this.identity,
				password: this.password,
				remember: this.remember
			});

			if(!profile) {
				this.$waveui.notify('Invalid details', 'error');
			}

			this.loading = false;
		}
	}
});
</script>