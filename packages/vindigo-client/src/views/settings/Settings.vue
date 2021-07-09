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
import Toolbar from '../../components/Toolbar.vue';
import languages from '../../registry/languages';
import { i18n } from '../../';

export default Vue.extend({
	name: 'VindigoSettings',
	components: { Toolbar },
	props: {

	},
	data: () => ({
		language: i18n.current.id,
		languages: languages
	}),
	watch: {
		language(lang: string) {
			i18n.activate(lang);
			console.log('[language]: changed');
		}
	},
	mounted() {
		
	}
});
</script>