exports.showStory = function(req, res){
  var stories = require('../lib/db')('NewsItem');
  stories.findOne({Key: req.params.id}, function(err, doc) {

    if (doc.Content) {
        res.send(doc);
    } else {
        var get = require('../lib/loader').getContent(doc, function (err, content) {

            doc.Content = content;
            res.send(docs);
        })
    }
    
  }); 

};
exports.showStories = function(req, res){
    var stories = require('../lib/db')('NewsItem');
    var skip = req.query.start || 0;
    stories.find().sort({PublishedDate: -1}).limit(40).skip(0).toArray(function(err, docs) {
        if (err) {
            res.send(200, err);
        }
        res.send(docs);
    });
};
