exports.showStory = function(req, res){
  var stories = require('../lib/db')('NewsItem');
  stories.findOne({Key: req.params.id}, function(err, doc) {
    res.send(doc);
  }); 

};
exports.showStories = function(req, res){
    var stories = require('../lib/db')('NewsItem');

    stories.find().sort({PublishedDate: -1}, function(err, docs) {
        res.send(docs);
    });
};
