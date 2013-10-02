var express         = require('express'),
	mongo           = require('mongodb'),
    user            = require('./routes/users'),
    wg              = require('./routes/wgs'),
    fg              = require('./routes/fgs'),
    file            = require('./routes/files'),
    staticResources = require('./routes/staticResources');

var Server 	= mongo.Server,
	Db 		= mongo.Db,
	BSON 	= mongo.BSONPure;

var server 	= new Server('localhost', 27017, {auto_reconnect: true});

db = new Db('uwleco', server);
db.open(function(err, db) {
	if(!err) {
		console.log("Connected to the uwleco warehouse.");
		db.collection('wgs', {strict:true}, function(err, collection) {
			if(err) {
				console.log("The wgs collection doesn't exist.");
				populateDB_wgs();
			}
		});
		db.collection('files', {strict:true}, function(err, collection) {
			if(err) {
				console.log("The files collection doesn't exist.");
				populateDB_files();
			}
		});
		db.collection('fgs', {strict:true}, function(err, collection) {
			if(err) {
				console.log("The fgs collection doesn't exist.");
				populateDB_fgs();
			}
		});	
		db.collection('users', {strict:true}, function(err, collection) {
			if(err) {
				console.log("The users collection doesn't exist.");
				populateDB_Users();
			}
		});			
	}
});
 
var app = express();
 
app.configure(function () {
    app.use(express.logger('dev'));     /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
});

// Homebrew static resource serving logic
app.get('/', staticResources.index);
app.get(/assets\/.*/, staticResources.serveResource);
app.get(/backbone\/.*/, staticResources.serveResource);

app.get('/users', user.findAll);
app.get('/users/:id', user.findById);
app.post('/users', user.addUser);
app.put('/users/:id', user.updateUser);
app.delete('/users/:id', user.deleteUser);

app.get('/wgs', wg.findAll);
app.get('/wgs/:id', wg.findById);
app.post('/wgs', wg.addWG);
app.put('/wgs/:id', wg.updateWG);
app.delete('/wgs/:id', wg.deleteWG);

app.get('/fgs', fg.findAll);
app.get('/fgs/:id', fg.findById);
app.post('/fgs', fg.addFG);
app.put('/fgs/:id', fg.updateFG);
app.delete('/fgs/:id', fg.deleteFG);

app.get('/files', file.findAll);
app.get('/files/:id', file.findById);
app.post('/files', file.addFile);
app.put('/files/:id', file.updateFile);
app.delete('/files/:id', file.deleteFile);
 
app.listen(3000);
console.log('Listening on port 3000...');

/* ----------------------------------------------   
	First time only: Populate Collections 
 ---------------------------------------------- */

var populateDB_Users = function() {
	
	var users = [
	{
		name: "Cassy",
		last: "Jens",
		email: "jens.cass@gmail.com",
		pw: "password",
		wgs: [],
		state: "ACTIVE"
	},
	{
		first: "Connor",
		last: "Doyle",
		email: "connor@gmail.com",
		pw: "password",
		wgs: [],
		state: "ACTIVE"
	}];

    db.collection('users', function(err, collection) {
        collection.insert(users, {safe:true}, function(err, result) {});
    });
}

var populateDB_wgs = function() {
	
	var wgs = [
	{
		name: "WorkingGroup1",
		description: "Auto created working group.",
		fgs: [],
		standards : {"createdDate" : "2013/06/11 00:19:03", "updatedDate" : "2013/06/11 00:19:03", "state" : "ACTIVE"}
	},
	{
		name: "WorkingGroup2",
		description: "Auto created working group.",
		fgs: [],
		standards : {"createdDate" : "2013/06/11 00:19:03", "updatedDate" : "2013/06/11 00:19:03", "state" : "ACTIVE"}
	}];

    db.collection('wgs', function(err, collection) {
        collection.insert(wgs, {safe:true}, function(err, result) {});
    });
}

var populateDB_files = function() {
	
	var files = [
	{
		name: "CassysDrawing.xml",
        description: "My awesome drawing.",
        type: "text/xml",
        standards : { "createdBy" : "51b6b2951a8834679cf483dc", "createdDate" : "2013/06/11 00:17:34", "updatedBy" : "51b6b2951a8834679cf483dc", "updatedDate" : "2013/06/11 00:17:34", "state" : "ACTIVE" }
	},
	{
        name: "ConnorsDrawing.xml",
        description: "My awesome drawing.",
        type: "text/xml",
        standards : { "createdBy" : "51b6b2951a8834679cf483dc", "createdDate" : "2013/06/11 00:17:34", "updatedBy" : "51b6b2951a8834679cf483dc", "updatedDate" : "2013/06/11 00:17:34", "state" : "ACTIVE" }
	}];

    db.collection('files', function(err, collection) {
        collection.insert(files, {safe:true}, function(err, result) {});
    });
}

var populateDB_fgs = function() {
	
	var fgs = [
	{
		name: "FileGroup1",
		description: "Auto created file group.",
		files: [],
		standards : {"createdDate" : "2013/06/11 00:19:03", "updatedDate" : "2013/06/11 00:19:03", "state" : "ACTIVE"}
	},
	{
		name: "FileGroup2",
		description: "Auto created file group.",
		files: [],
		standards : {"createdDate" : "2013/06/11 00:19:03", "updatedDate" : "2013/06/11 00:19:03", "state" : "ACTIVE"}	
	}];

    db.collection('fgs', function(err, collection) {
        collection.insert(fgs, {safe:true}, function(err, result) {});
    });
}