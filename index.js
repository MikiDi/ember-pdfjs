'use strict';

module.exports = {
  name: require('./package').name,
  included(app) {
    this._super.included(app);
    app.import('node_modules/pdfjs-dist/build/pdf.min.js', {
      outputFile: 'assets/pdf.js'
    });
    app.import('node_modules/pdfjs-dist/build/pdf.worker.min.js', {
      outputFile: 'assets/pdf-worker.js'
    });
  },
};
