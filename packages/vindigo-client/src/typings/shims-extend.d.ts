// eslint-disable-next-line unused-imports/no-unused-imports
import Vue from 'vue';
import { Store } from 'vuex';
import { ClientConfig } from '../model/config';
import { RootState } from '../registry/store/state';

declare module 'vue/types/vue' {
	interface Vue {
		$oruga: any;
		$vuex: Store<RootState>;
		$config: ClientConfig;
	}
}