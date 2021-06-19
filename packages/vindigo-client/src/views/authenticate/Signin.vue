<template>
	<section class="sign-in flex flex-col h-80">
		<h1 class="font-semibold text-white text-2xl uppercase tracking-widest py-3">
			Welcome
		</h1>
		<form>
			<o-input
				class="auth-box__input my-5 text-center"
				placeholder="Email Address"
				autocomplete="off"
				rounded
			/>
			<o-input
				class="auth-box__input my-5"
				placeholder="Password"
				password-reveal
				type="password"
				autocomplete="off"
				rounded
			/>
		</form>
		<div class="flex text-white">
			<o-checkbox>Remember me</o-checkbox>
			<div class="flex-grow" />
			<a href="">Forgot password</a>
		</div>
		<div class="flex-grow" />
		<o-button rounded>
			Sign in
			<o-icon icon="chevron-right" class="absolute" />
		</o-button>
		<div class="auth-box__toggle" @click="$emit('toggle')">
			Don't have an account?
			<bold class="font-semibold">
				Sign up
			</bold>
			instead!
		</div>
	</section>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
	name: 'Signin',
	props: [],
	data: () => ({
		
	}),
	computed: {

	},
	watch: {

	},
	mounted() {

	},
	methods: {
		
	}
});
</script>