export default function(application) {

	application.inject('route', 'pdfjs', 'service:pdfjs');
	application.inject('controller', 'pdfjs', 'service:pdfjs');
	application.inject('component', 'pdfjs', 'service:pdfjs');

}
