var mongo = require('mongodb');
 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure,
    ObjectID = mongo.ObjectID;

 exports.findById = function(req, res) {
 	var id = req.params.id;
 	console.log("Retrieving wg: " + id);
 	db.collection('wgs', function(err, collection) {
        collection.findOne({'_id':new ObjectID(id)}, function(err, item) {
            res.send(item);
        });
 	})
 }

exports.findAll = function(req, res) {
    db.collection('wgs', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
}

exports.addWG = function(req, res) {
    var wg = req.body;
    console.log('Adding wg: ' + JSON.stringify(wg));
    db.collection('wgs', function(err, collection) {
        collection.insert(wg, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateWG = function(req, res) {
    var id = req.params.id;
    var wg = req.body;
    delete wg._id; // fix for incompatibility of ObjectId() and _id as string
    // http://stackoverflow.com/questions/14585507/mongodb-error-while-updating-document-cannot-change-id-of-a-document
    db.collection('wgs', function(err, collection) {
        collection.update({'_id': id}, wg, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating wg: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(wg);
            }
        });
    });
}

exports.deleteWG = function(req, res) {
    var id = req.params.id;
    console.log('Deleting wg: ' + id);
    db.collection('wgs', function(err, collection) {
        collection.remove({'_id':new ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}


//curl -i -X PUT -H 'Content-Type: application/json' -d '{"first": "Cassandra", "Last": "Jens", "email" : "jens.cass@gmail.com", "password" : "password", "wgs" : [], "status" :"ACTIVE"}' http://localhost:3000/wgs/5222562de5fee97b66000001




