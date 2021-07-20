import Avatar from '../components/Avatar.vue';
import BoardTile from '../components/BoardTile.vue';
import LanguagePicker from '../components/LanguagePicker.vue';
import LoadingSpinner from '../components/LoadingSpinner.vue';
import Pagination from '../components/Pagination.vue';
import SectionTitle from '../components/SectionTitle.vue';
import Spacer from '../components/Spacer.vue';
import Toolbar from '../components/Toolbar.vue';
import Vue from 'vue';

/**
 * Define all Vue components and directives
 */
export function registerComponents() {
	Vue.component('LanguagePicker', LanguagePicker);
	Vue.component('LoadingSpinner', LoadingSpinner);
	Vue.component('SectionTitle', SectionTitle);
	Vue.component('Pagination', Pagination);
	Vue.component('BoardTile', BoardTile);
	Vue.component('Toolbar', Toolbar);
	Vue.component('Spacer', Spacer);
	Vue.component('Avatar', Avatar);
}