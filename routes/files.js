var mongo = require('mongodb'), 
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    ReplSetServers = require('mongodb').ReplSetServers,
    ObjectID = require('mongodb').ObjectID,
    Binary = require('mongodb').Binary,
    GridStore = require('mongodb').GridStore,
    Grid = require('mongodb').Grid,
    Code = require('mongodb').Code,
    assert = require('assert'),
    fs = require("fs");

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

// GET
exports.findById = function(req, res) {
 	var id = req.params.id;
 	console.log("Retrieving file: " + id);
 	db.collection('files', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
 	})
 }

// GET
exports.findAll = function(req, res) {
    db.collection('files', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
}

// PUT
exports.addFile = function(req, res) {
         
        var wgs = req.body.theWGs;
        var fg = req.body.theFG;
        var file = req.files.theFile;

        console.log('wgs: ' + wgs);

        // file.name;
        // file.type;
        // file.path;
        // file.size;
        // file.lastModifiedDate

        var fileId = new ObjectID();
        var gridStore = new GridStore(db, fileId, file.name, 'w', {
            'content_type': file.type,
            'metadata': {
                'wgs': wgs
            },
        });
        var fileSize = fs.statSync(file.path).size;
        var data = fs.readFileSync(file.path);

        gridStore.open(function(err, gridStore) {
            gridStore.writeFile(file.path, function(err, doc) {
                gridStore.close(function(result){
                  GridStore.read(db, fileId, function(err, fileData) {
                    assert.equal(data.toString('base64'), fileData.toString('base64'))
                    assert.equal(fileSize, fileData.length);
                  });
                })
            });
        }); 

        res.send(200, fileId); // send the object id here     
}

// POST
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

// DELETE
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

function createFileObject(file) {
    var myObject = new Object();
    myObject.name = file.name;
    myObject.description = "";
    myObject.type = file.type;
    return myObject;
}



