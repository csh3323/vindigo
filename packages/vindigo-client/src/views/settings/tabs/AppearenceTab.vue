<template>
	<div>
		<section>
			<div class="flex items-center">
				<label>
					<w-icon class="mr-2" style="margin-top: -2px">
						mdi mdi-information-outline
					</w-icon>
					Dark mode
				</label>
				<spacer />
				<w-switch
					v-model="darkMode"
				/>
			</div>
			<small class="d-block mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur autem molestiae cum maxime perspiciatis voluptatibus consequuntur. Eaque corrupti ullam est rerum corporis dignissimos totam distinctio a fugit recusandae. Reiciendis, facere.</small>
		</section>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
	name: 'AppearenceTab',
	computed: {
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