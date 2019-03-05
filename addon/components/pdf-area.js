import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';
import layout from '../templates/components/pdf-area';

const DEBOUNCE_MS = 500;

export default Component.extend({

	tagName: 'pdf-area',

	layout,

	url: '',

	page: 1,

	loading: true,

	display: false,

	document: null,

	pdfjs: service(),

	didInsertElement() {

		this._super(...arguments);

		let url = this.get('url');
		let num = this.get('page');

		this.get('renderDoc').perform(url, num);

	},

	didUpdateAttrs() {

		this._super(...arguments);

		let url = this.get('url');
		let num = this.get('page');

		this.get('renderDoc').perform(url, num);

	},

	renderDoc: task(function * (url, num) {

		let xhr, doc;

		try {

			this.set('loading', true);

			// eslint-disable-next-line ember/closure-actions
			this.sendAction('on-load');

			yield timeout(DEBOUNCE_MS);

			xhr = this.get('pdfjs').open(url);
			doc = yield xhr;

			yield this.get('renderPage').perform(doc, num);

		} finally {

			if (xhr && xhr.destroy) xhr.destroy();
			if (doc && doc.destroy) doc.destroy();

		}

	}).restartable(),

	renderPage: task(function * (doc, num) {

		let pge, ren;

		try {

			pge = yield doc.getPage(num);

			let pw = pge.view[2];
			let ph = pge.view[3];
			let ww = this.get('width');
			let wh = this.get('height');
			let s = Math.min(ww/pw, wh/ph);

			var vwp = pge.getViewport(s);
			var ons = document.querySelectorAll('canvas#pdf-main')[0];
			var can = document.querySelectorAll('canvas#pdf-temp')[0];
			var ctx = can.getContext('2d');
			can.height = vwp.height;
			can.width = vwp.width;

			ren = yield pge.render({
				canvasContext: ctx,
				viewport: vwp,
			});

			ons.width = can.width;
			ons.height = can.height;
			ons.getContext('2d').drawImage(can, 0, 0);

			// eslint-disable-next-line ember/closure-actions
			this.sendAction('on-done');

			this.set('display', true);
			this.set('loading', false);

		} finally {

			if (pge && pge.cleanup) pge.cleanup();
			if (ren && ren.cancel) ren.cancel();

		}

	}).restartable(),


});
