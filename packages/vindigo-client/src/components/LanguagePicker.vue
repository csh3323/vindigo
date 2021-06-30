<template>
	<div />
<!-- ANCHOR TODO: implement similar version but then in WaveUI -->
<!--
	<o-field>
		<o-select v-model="selected" placeholder="Select a language">
			<option
				v-for="lang in languages"
				:key="lang.id"
				:value="lang.id"
			>
				{{ lang.name }}
			</option>
		</o-select>
	</o-field>
-->
</template>

<script lang="ts">
import Vue from 'vue';
import { i18n } from '..';

export default Vue.extend({
	name: 'LanguagePicker',

	data: () => ({
		selected: i18n.current.id,
		languages: i18n.languageList
	}),

	watch: {
		selected(value) {
			i18n.activate(value);
		}
	}
});
</script>