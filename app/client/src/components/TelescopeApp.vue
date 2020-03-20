<template>
	<v-app>
		<v-content class="pa-8">
			<v-card color="light-blue">
				<v-card-text class="white--text">
					Value = {{string}}<br>
					<v-btn @click="increment">Increment</v-btn>
				</v-card-text>
			</v-card>
		</v-content>
    </v-app>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, computed, watch, onUpdated } from '@vue/composition-api';
import { interval } from '../common/timer';

function useCounter() {
	const number = ref(0);
	const string = computed(() => {
		return 'My value is ' + number.value
	});

	watch(number, (newValue) => {
		console.log('The new value is ' + newValue);
	});

	function increment() {
		number.value++;
	}

	return {
		string,
		increment
	}
}

export default defineComponent({
	name: 'TelescopeApp',
	props: {},
	setup(props, ctx) {
		const {string, increment} = useCounter();

		interval(1000, () => {
			increment();
		});

		return {
			string,
			increment
		}
	}
})
</script>