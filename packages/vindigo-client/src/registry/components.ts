import Avatar from '../components/Avatar.vue';
import BoardTile from '../components/BoardTile.vue';
import Icon from '../components/Icon.vue';
import IconButton from '../components/IconButton.vue';
import SectionTitle from '../components/SectionTitle.vue';
import Toolbar from '../components/Toolbar.vue';
import Vue from 'vue';

/**
 * Define all Vue components and directives
 */
export function registerComponents() {
	Vue.component('section-title', SectionTitle);
	Vue.component('board-tile', BoardTile);
	Vue.component('icon-btn', IconButton);
	Vue.component('toolbar', Toolbar);
	Vue.component('avatar', Avatar);
	Vue.component('icon', Icon);
}