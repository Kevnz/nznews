var extractData = function (el) {
    var content;
    el.all('p').each(function (p) {
        content = content + p.getHTML();
    });
    return content;
};
var isNotObject = function(o) {
    var t = typeof o;
    return !(o && (t === 'object' ||
        ((t === 'function')))) || false;
};
exports.getContent = function (data, callback) {
    console.log(data);
        var selector,
            link = 'http://getnznews.com/data/story/'+ data.Key;
        link = data.Link;
 
        var Y = require('yui/yql');
        if (link.indexOf('herald') > -1) {
            selector = '#articleBody p';
        } else {
            selector = '#left_col p';
        }
        

        Y.YQL('select * from data.html.cssselect where url="' + link + '" and css="' + selector +'"', function(response) {
            console.log(response.query.results.results);
            var results = [];
            for (var i = 0; i < response.query.results.results.p.length; i++) {
                var content = response.query.results.results.p[i];
                console.log(content);
                if (typeof content === 'string') {
                    results.push('<p>' + content + '</p>');
                }
            }

            callback(null, results.join(''));
        });

 /*
    var YUI = require('yui').YUI;

    YUI().use('node', 'io-base', function (Y) {
        Y.io.header('User-Agent', 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.110 Safari/537.36');
        
        //cheating

        console.log(link);
        Y.io(link, {
            on: {
                failure: function (id, e) {
                    callback(true, e);
                },
                complete: function(id, e) {
                    console.log(e.responseText);
                    try {  
                        var json = JSON.parse(e.responseText);
                        callback(null, json.Content);
                         
                        var page 
                        try {
                            page = Y.one(e.responseText);
                        } catch (e) {

                        }
                        if (!page) {
                            callback(true, e);
                        }
                        var content = '',
                            body = page.one('#articleBody'),
                            leftCol = page.all('#left_col');

                        if (body) {
                            content = extractData(body);
                        } else if (leftCol) {
                            content = extractData(leftCol);
                        } else {
                            content = extractData(page)
                        }

                        callback(null, content);
                    
                    } catch (error) {
                        callback(error, "big fat fail");
                    }
                }
            }
        });
    });
*/
};