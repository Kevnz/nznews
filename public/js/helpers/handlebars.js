YUI.add('handlebars-helpers', function(Y) {
	Y.Handlebars.registerHelper('thumbnail', function (url) {
		if (url.indexOf('/warning.jpg') === -1) {
			return '';
		}
		return '<img src="' + url + '" width="100px" />';
	});

	Y.Handlebars.registerHelper('loading', function (field) {

		if (field.toString().length < 1) {
			return '<div class="loading"></div>';
		}
		return '<div>' + field + '</div>';
	});
}, '0.0.1', { requires: ['handlebars'] });