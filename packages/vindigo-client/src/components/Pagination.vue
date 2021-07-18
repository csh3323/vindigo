<template>
	<div class="pagination">
		<w-button
			v-if="showArrows"
			class="pagination__prev w-8 h-8 mx-1 rounded-full"
			icon="mdi mdi-chevron-left"
			bg-color="transparent"
			xl
			:disabled="value <= 1"
			@click="$emit('input', value - 1)"
		/>
		<w-button
			v-for="i in visiblePages"
			:key="i"
			class="pagination__btn w-8 h-8 mx-1 rounded-full"
			:class="buttonClass(i)"
			xl
			@click="$emit('input', i)"
		>
			{{ i }}
		</w-button>
		<w-button
			v-if="showArrows"
			class="pagination__next w-8 h-8 mx-1 rounded-full"
			icon="mdi mdi-chevron-right"
			bg-color="transparent"
			xl
			:disabled="value >= total"
			@click="$emit('input', value + 1)"
		/>
	</div>
</template>

<script lang="ts">
import { range } from 'lodash';
import Vue from 'vue';

export default Vue.extend({
	name: 'Pagination',
	props: {
		value: {
			type: Number,
			required: true
		},
		total: {
			type: Number,
			required: true
		},
		visible: {
			type: Number,
			default: 5
		},
		showArrows: {
			type: Boolean,
			default: true
		}
	},

	computed: {
		visiblePages(): number[] {
			if(this.visible % 2 == 0) {
				throw new Error('visible must be odd');
			}

			const amount = Math.max(Math.min(this.total, this.visible), 1);
			const offset = Math.floor(amount / 2);

			return range(
				Math.min(Math.max(this.value - offset, 1), this.total - amount + 1),
				Math.min(Math.max(this.value + offset, amount), this.total) + 1
			);
		}
	},

	methods: {
		buttonClass(i: number): any {
			return i == this.value || !this.total
				? 'pagination__btn--active'
				: undefined;
		}
	}
});
</script>

<style lang="postcss">
.pagination {
	@apply flex justify-center;

	&__btn {
		@apply bg-[#D5D7DF] text-gray-900 font-semibold text-base !important;

		&--active {
			@apply bg-purple-500 text-white !important;
		}
	}
}
</style>