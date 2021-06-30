<template>
	<section class="sign-up flex flex-col">
		<h1 class="font-semibold text-white text-2xl uppercase tracking-widest py-3">
			SIGN UP
		</h1>
		<form>
			<!-- ANCHOR TODO: implement waveUI
			<o-input
				v-model="email"
				class="auth-box__input my-5 text-center"
				placeholder="Email Address"
				name="email"
				rounded
			/>
			<o-input
				v-model="fullname"
				class="auth-box__input my-5 text-center"
				placeholder="Full Name"
				name="name"
				rounded
			/>
			<o-input
				v-model="password"
				class="auth-box__input my-5"
				placeholder="Password"
				password-reveal
				type="password"
				name="password"
				rounded
			/>-->
		</form>
		<div class="flex text-white">
			<!--
			<o-checkbox v-model="remember">
				Remember me
			</o-checkbox>
			-->
		</div>
		<div class="flex-grow" />
		<!-- ANCHOR TODO: implement WaveUI
		<o-button rounded @click="register">
			Register Account
			<o-icon icon="chevron-right" class="absolute" />
		</o-button>-->

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
		remember: false
	}),
	
	methods: {
		async register() {
			await this.$vuex.dispatch('signUp', {
				fullname: this.fullname,
				email: this.email,
				password: this.password,
				remember: this.remember
			});
		}
	}
});
</script>