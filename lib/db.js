var qconf = require('qconf'),
    config = qconf();



module.exports = function (collection) {
	var mongojs = require('mongojs');
    var db = mongojs(config.get('mongo'));
    return db.collection(collection);
};