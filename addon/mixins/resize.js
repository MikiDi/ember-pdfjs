import { debounce } from '@ember/runloop';
import $ from 'jquery';
import Mixin from '@ember/object/mixin';

export default Mixin.create({

	didResizeElement() {},

	didInsertElement() {

		this._super(...arguments);

		$(window).on('resize', e => {
			debounce(this, this.didResizeElement, e, 250);
		});

	},

	willDestroyElement() {

		$(window).off('resize');

		this._super(...arguments);

	},

});
