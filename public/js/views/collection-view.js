YUI.add('collection-view', function (Y) {
	Y.Handlebars.registerHelper('thumbnail', function (url) {
		if (url === 'http://getnznews.com/warning.jpg') {
			return '';
		}
		var pipe = url.indexOf('|');
		if (pipe > 0) {
			url = url.substring(0, pipe).trim();
		}
		return '<img class="story-image" src="' + url + '" width="70px" />';
	});
	var CollectionView = function (config) {
		CollectionView.superclass.constructor.apply(this, arguments);
	};

	Y.extend(CollectionView, Y.View, {
		initializer: function () {
			Y.log('init of collection view');
			var list = this.get('modelList'); 
			list.after(['add', 'remove', 'reset'], this.render, this);
		},
		onRender: function (){},
		render: function () { 
			var container = this.get('container'),
				source = Y.TemplateLoader(this.template),
				compiledTemplate = Y.Handlebars.compile(source),
				data = { items: this.get('modelList').toJSON() };
			var html = compiledTemplate(data);
			
			container.setHTML(html);

			if (!container.inDoc()) {
				Y.one('body').append(container);
			}
			this.fire('render');
			this.onRender();
			return this;
		}
	});
	Y.CollectionView = CollectionView;
},
'0.0.1', {
	requires: ['view', 'handlebars', 'event-custom']
});