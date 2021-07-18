import Avatar from '../components/Avatar.vue';
import BoardTile from '../components/BoardTile.vue';
import Icon from '../components/Icon.vue';
import LanguagePicker from '../components/LanguagePicker.vue';
import LoadingSpinner from '../components/LoadingSpinner.vue';
import Pagination from '../components/Pagination.vue';
import SectionTitle from '../components/SectionTitle.vue';
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
	Vue.component('Avatar', Avatar);
	Vue.component('Icon', Icon);
}