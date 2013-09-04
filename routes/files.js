var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

exports.findById = function(req, res) {
 	var id = req.params.id;
 	console.log("Retrieving file: " + id);
 	db.collection('files', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
 	})
 }

exports.findAll = function(req, res) {
    db.collection('files', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
}

exports.addFile = function(req, res) {
    
    //var file = req.body;
    //console.log('Adding file: ' + JSON.stringify(file));

    var gs = new mongo.GridStore(
        db, 
        'users.js', 
        'w'
    );

    gs.open(function(err, gs){
        console.log('this file was uploaded at ' + gs.uploadDate);
    });

    res.send(200);

    // db.collection('files', function(err, collection) {
    //     collection.insert(file, {safe:true}, function(err, result) {
    //         if (err) {
    //             res.send({'error':'An error has occurred'});
    //         } else {
    //             console.log('Success: ' + JSON.stringify(result[0]));
    //             res.send(result[0]);
    //         }
    //     });
    // });
}

exports.updateFile = function(req, res) {
    var id = req.params.id;
    var file = req.body;
    console.log('Updating file: ' + id);
    console.log(JSON.stringify(file));
    db.collection('files', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, file, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating file: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(file);
            }
        });
    });
}

exports.deleteFile = function(req, res) {
    var id = req.params.id;
    console.log('Deleting file: ' + id);
    db.collection('files', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

//curl -i -X PUT -H 'Content-Type: application/json' -d '{"first": "Cassandra", "Last": "Jens", "email" : "jens.cass@gmail.com", "password" : "password", "wgs" : [], "status" :"ACTIVE"}' http://localhost:3000/files/5222562de5fee97b66000001




