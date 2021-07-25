<template>
	<div>
		<section>
			<w-select 
				v-model="language" 
				:items="languages"
				:inner-icon-left="`flag-icon flag-icon-${languageFlag} lang-icon`"
				item-label-key="name"
				item-value-key="id"
				label="Language"
				class="language-picker"
			/>
			<small class="d-block mt-3">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus, veritatis est quis libero at harum eum quod rem repellat vel dicta corrupti laboriosam obcaecati aperiam error aut iste porro officia! Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum labore ad reiciendis cum recusandae aut, repellendus amet. Impedit officiis nesciunt, consequatur eligendi et fugit! Voluptas corrupti consectetur perferendis quidem laboriosam.
			</small>
		</section>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import languages from '../../../registry/languages';
import { i18n } from '../../../';
import { Language } from '../../../i18n';
import { find } from 'lodash';

export default Vue.extend({
	name: "GeneralTab",
	data: () => ({
		languages: languages,
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
		}
	}
});
</script>

<style lang="postcss">
.lang-icon {
	@apply rounded-none pointer-events-none;
}
</style>