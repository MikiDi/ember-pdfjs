import Mixin from '@ember/object/mixin';
import { debounce } from '@ember/runloop';

export default Mixin.create({

	didResizeElement() {},

	didResizeHandler(e) {
		debounce(this, this.didResizeElement, e, 250);
	},

	didInsertElement() {

		this._super(...arguments);

		window.addEventListener('resize', this.didResizeHandler.bind(this));

	},

	willDestroyElement() {

		window.removeEventListener('resize', this.didResizeHandler.bind(this));

		this._super(...arguments);

	},

});
