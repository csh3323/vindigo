import { Optional } from '../typings/types';
import Vue from 'vue';

/**
 * Create a scrollable mixin that sets the `isScrolling` field
 * when the given ref element is scrolled.
 * 
 * @param ref The scroll view ref
 */
export const Scrollable = Vue.extend({
	name: 'Scrollable',

	data: () => ({
		isScrolling: false,
		scrollView: null as Optional<Element>
	}),

	mounted() {
		this.scrollView = this.getScrollView();
		this.scrollView.addEventListener('scroll', this.computeScrolling);
		this.computeScrolling();
	},

	beforeDestroy() {
		this.scrollView?.removeEventListener('scroll', this.computeScrolling);
	},

	methods: {
		getScrollView(): Element {
			throw new Error('getScrollView()');	
		},
		computeScrolling() {
			this.isScrolling = (this.scrollView?.scrollTop ?? 0) > 0;
		}
	}
});