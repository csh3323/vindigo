<template>
	<section class="settings-page">
		<toolbar class="pl-0" />
		<main class="container mt-4" role="main">
			<w-tabs
				:items="settingTabs"
				center
				:transition="false"
				:fill-bar="true"
			>
				<template #item-content="{ item }">
					<section class="container">
						<div class="py-5">
							<component :is="item.content" />
						</div>
					</section>
				</template>
			</w-tabs>
		</main>
	</section>
</template>

<script lang="ts">
import Vue from "vue";
import AppearenceTab from "./tabs/AppearenceTab.vue";
import GeneralTab from "./tabs/GeneralTab.vue";
import PrivacyTab from "./tabs/PrivacyTab.vue";
import AccountTab from "./tabs/AccountTab.vue";

export default Vue.extend({
	name: "VindigoSettings",
	computed: {
		settingTabs() {
			return [
				{ title: this.$t("SETTINGS_GENERAL"), content: GeneralTab },
				{
					title: this.$t("SETTINGS_APPEARANCE"),
					content: AppearenceTab,
				},
				{ title: this.$t("SETTINGS_PRIVACY"), content: PrivacyTab },
				{ title: this.$t("SETTINGS_ACCOUNT"), content: AccountTab },
			];
		},
	},
});
</script>

<style lang="postcss">
.settings-page {
	main {
		@apply pt-5;
	}

	.w-tabs {
		@apply border-none;

		&__content-wrap {
			@apply rounded-b-md bg-white dark:bg-gray-800;
		}
	}
}
</style>