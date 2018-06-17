import Component from '@ember/component';
import ResizeMixin from "../mixins/resize";
import layout from '../templates/components/pdf-view';

export default Component.extend(ResizeMixin, {

	layout,

	spacing: 75,

	tagName: 'pdf-view',

	didInsertElement() {

		this._super(...arguments);

		let s = this.get('spacing');
		let w = this.$().width();
		let h = this.$().height();

		this.set('width', w-s);
		this.set('height', h-s);

	},

	didResizeElement() {

		this._super(...arguments);

		let s = this.get('spacing');
		let w = this.$().width();
		let h = this.$().height();

		this.set('width', w-s);
		this.set('height', h-s);

	},

});
