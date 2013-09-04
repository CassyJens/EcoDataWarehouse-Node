 exports.findById = function(req, res) {
 	var id = req.params.id;
 	console.log("Retrieving fg: " + id);
 	db.collection('fgs', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
 	})
 }

exports.findAll = function(req, res) {
    db.collection('fgs', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
}

exports.addFG = function(req, res) {
    var fg = req.body;
    console.log('Adding fg: ' + JSON.stringify(fg));
    db.collection('fgs', function(err, collection) {
        collection.insert(fg, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateFG = function(req, res) {
    var id = req.params.id;
    var fg = req.body;
    console.log('Updating fg: ' + id);
    console.log(JSON.stringify(fg));
    db.collection('fgs', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, fg, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating fg: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(fg);
            }
        });
    });
}

exports.deleteFG = function(req, res) {
    var id = req.params.id;
    console.log('Deleting fg: ' + id);
    db.collection('fgs', function(err, collection) {
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




