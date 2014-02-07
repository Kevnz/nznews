var express = require('express'),
    exphbs  = require('express3-handlebars'),
    routes = require('./routes'),
    stories = require('./routes/stories'),
    http = require('http'),
    path = require('path'),
    app = express(),
    combo = require('combohandler'),
    expstate = require('express-state');


expstate.extend(app);

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.engine('handlebars', exphbs({defaultLayout: 'main'}));
    app.set('view engine', 'handlebars');

    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
    app.use(express.errorHandler());
    app.locals.pretty = true;
});
app.get('/', routes.index);
app.get('/story/:id', routes.index);

app.get('/api/story', stories.showStories);
app.get('/api/story/:id', stories.showStory);
var yuipath = path.join(__dirname, '/public/');
app.get('/combo', combo.combine({rootPath: yuipath }), combo.respond);

exports.app = app;

