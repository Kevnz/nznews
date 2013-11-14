var request = require('request');

var extractData = function (el) {
    var content
    el.all('p').each(function (p) {
        content = content + p.getHTML();
    });
    return content;
}
module.getContent = function (data, callback) {
    var YUI = require('yui').YUI;

    YUI().use('node', 'io-base', function (Y) {
        Y.io(data.Link, {
            on: {
                error: function (id, e) {
                    callback(true);
                },
                complete: function(id, e) {
                    try {
                        var page = Y.one(e.responseText),
                            content = '',
                            body = page.one('#articleBody'),
                            leftCol = page.all('#left_col');

                        if (body) {
                            content = extractData(body);
                        } else if(leftCol) {
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
}