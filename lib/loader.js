var extractData = function (el) {
    var content
    el.all('p').each(function (p) {
        content = content + p.getHTML();
    });
    return content;
}
exports.getContent = function (data, callback) {



        var link = 'http://getnznews.com/data/story/'+ data.Key;

        var Y = require('yui/io-base');

        Y.io(link, {
            on: {
                complete: function(id, e) {
                    var json = JSON.parse(e.responseText);
                    callback(null, json);

                }
            }
        });
    //var YUI = require('yui').YUI;

    //YUI().use('node', 'io-base', function (Y) {
        //Y.io.header('User-Agent', 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.110 Safari/537.36');
        
        //cheating

        /*
        Y.io(link, {
            on: {
                failure: function (id, e) {
                    callback(true, e);
                },
                complete: function(id, e) {
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
*/
}