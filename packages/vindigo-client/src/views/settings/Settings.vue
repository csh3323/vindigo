<template>
	<section class="settings-page">
		<toolbar class="pl-0" />
		<main class="container mt-4" role="main">
			<w-select 
				v-model="language" 
				:items="languages"
				:inner-icon-left="`flag-icon flag-icon-${languageFlag}`"
				item-label-key="name"
				item-value-key="id"
				label="Language"
				class="language-picker"
			>
				<template #item="{ item }">
					<span :class="['mr-2', 'flag-icon', `flag-icon-${item.icon}`]" />
					{{ item.name }}
				</template>
			</w-select>
			<w-switch
				v-model="darkMode"
				label="Dark Mode"
				class="mt-4"
			/>
		</main>
	</section>
</template>

<script lang="ts">
import Vue from 'vue';
import languages from '../../registry/languages';
import { i18n } from '../../';
import { Language } from '../../i18n';
import { find } from 'lodash';

export default Vue.extend({
	name: 'VindigoSettings',

	data: () => ({
		languages: languages
	}),

	computed: {
		languageFlag(): string {
			return find(this.languages, (lang: Language) => lang.id == this.language)?.icon || '';
		},
		language: {
			get(): string|undefined {
				return this.$vuex.state.language;
			},
			set(lang: string) {
				i18n.activate(lang);
			}
		},
		darkMode: {
			get(): boolean {
				return this.$vuex.state.isDark;
			},
			set(value: boolean) {
				this.$vuex.commit('setDarkMode', value);
			}
		}
	}
});
</script>

<style lang="postcss">
.language-picker {
	.w-select__icon {
		@apply rounded-none;
	}

	.w-select__selection {
		@apply pl-2;
	}
}
</style>