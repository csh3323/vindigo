<template>
	<div class="activity-card flex flex-col rounded-3xl p-4">
		<div class="text-white text-5xl font-light text-right">
			{{ timeStr }}
		</div>
		<div class="text-white font-bold text-right">
			{{ dateStr }}
		</div>
		<div class="flex-grow" />
		<!-- TODO Make color customizable -->
		<trend
			:data="[0, 1, 4, 2, 3, 0, 2]"
			:gradient="['#FFAD7B', '#D481FF']"
			:padding="7.5"
			:stroke-width="4"
			:height="75"
			:radius="15"
			stroke-linecap="round"
			auto-draw
			smooth
		/>
		<!-- TODO Clean this up and move to state -->
		<div class="flex text-white font-light text-sm pt-2">
			Mon
			<div class="flex-grow" />
			Tue
			<div class="flex-grow" />
			Wed
			<div class="flex-grow" />
			Thu
			<div class="flex-grow" />
			Fri
			<div class="flex-grow" />
			Sat
			<div class="flex-grow" />
			Sun
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import dayjs from 'dayjs';

export default Vue.extend({
	name: 'ActivityBox',
    
	data: () => ({
		timeTask: null as any,
		timeStr: '',
		dateStr: '',
	}),

	watch: {
		'$i18n.locale'() {
			this.updateTime();
		}
	},

	mounted() {
		this.updateTime();

		this.timeTask = setInterval(() => {
			this.updateTime();
		}, 1000 * 5);
	},

	destroyed() {
		clearInterval(this.timeTask);
	},

	methods: {
		updateTime() {
			this.timeStr = dayjs().format('h:mm A');
			this.dateStr = dayjs().format('dddd, MMMM D');
		}
	}
});
</script>