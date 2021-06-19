<template>
	<section class="sign-up flex flex-col h-80">
		<h1 class="font-semibold text-white text-2xl uppercase tracking-widest py-3">
			SIGN UP
		</h1>
		<form>
			<o-input
				class="auth-box__input my-5 text-center"
				placeholder="Full Name"
				rounded
			/>
			<o-input
				class="auth-box__input my-5 text-center"
				placeholder="Email Address"
				rounded
			/>
			<o-input
				class="auth-box__input my-5"
				placeholder="Password"
				password-reveal
				type="password"
				rounded
			/>
		</form>
		<div class="flex-grow" />
		<o-button rounded>
			Register Account
			<o-icon icon="chevron-right" class="absolute" />
		</o-button>
		<div class="auth-box__toggle" @click="$emit('toggle')">
			Already have an account?
			<bold class="font-semibold">
				Sign in
			</bold>
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