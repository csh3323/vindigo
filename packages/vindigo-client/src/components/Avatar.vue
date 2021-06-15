<template>
	<component :is="avatarTag" :to="profileUrl">
		<div class="avatar inline-flex rounded-full bg-gradient-to-b from-yellow-500 to-pink-600" :style="borderStyle">
			<div class="avatar__space rounded-full bg-white dark:bg-gray-800" :style="borderStyle">
				<img
					:src="src" :style="imgStyle"
					class="rounded-full" style="image-rendering: crisp-edges;"
				>
			</div>
		</div>
	</component>
</template>

<script lang="ts">
import Vue from 'vue';
import { cleanInt } from '../util';

export default Vue.extend({
	name: 'Avatar',
	props: {
		user: {
			type: Number,
			required: true
		},
		src: {
			type: String,
			required: true
		},
		size: {
			type: [String, Number],
			default: 34
		},
		openProfile: {
			type: Boolean,
			default: true
		}
	},

	computed: {
		avatarTag(): string {
			return this.openProfile ? `router-link` : 'span';
		},
		profileUrl(): string|undefined {
			return `/profile/${this.user}`;
		},
		borderStyle(): any {
			return {
				padding: Math.ceil(cleanInt(this.size) / 24) + 'px'
			};
		},
		imgStyle(): any {
			const size = cleanInt(this.size);

			return {
				width: size + 'px',
				height: size + 'px'
			};
		}
	}
});
</script>