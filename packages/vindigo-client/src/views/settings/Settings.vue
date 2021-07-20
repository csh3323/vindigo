<template>
	<section class="settings-page">
		<toolbar class="pl-0" />
		<main class="container mt-4" role="main">
			<w-select 
				v-model="language" 
				:items="languages" label="Locale"
				item-label-key="id"
			>
				<template #item="{ item }">
					<span :class="['mr-2', 'flag-icon', `flag-icon-${item.icon}`]" />
					{{ item.name }}
				</template>
			</w-select>
		</main>
	</section>
</template>

<script lang="ts">
import Vue from 'vue';
import languages from '../../registry/languages';
import { i18n } from '../../';

export default Vue.extend({
	name: 'VindigoSettings',

	data: () => ({
		languages: languages
	}),

	computed: {
		language: {
			get(): string|undefined {
				return this.$vuex.state.language;
			},
			set(lang: string) {
				i18n.activate(lang);
			}
		}
	}
});
</script>