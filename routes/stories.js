exports.showStory = function(req, res){
  var stories = require('../lib/db')('NewsItem');
  stories.findOne({Key: req.params.id}, function(err, doc) {
    res.send(doc);
  }); 

};
exports.showStories = function(req, res){
    var stories = require('../lib/db')('NewsItem');
    var skip = req.query.start || 0;
    stories.find().sort({PublishedDate: -1}).limit(40).skip(0).toArray(function(err, docs) {
        res.send(docs);
    });
};
