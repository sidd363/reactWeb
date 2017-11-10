/**
 * Express configurations.
 *
 * @type {exports|module.exports}
 */
var Router = require('react-router');
var React = require('react/addons');
var express = require('express');
var session = require('express-session');
var path = require('path');
var multer = require('multer');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var config = require('./config');
//Define Routes here
var posts = require('./routes/post.routes');
var app = express();
var builder = require('xmlbuilder');
var videoInterceptor = require("./routes/videoInterceptor")
var profileInterceptor = require("./routes/profileInterceptor")
var allVideosInterceptor = require('./routes/allVideosInterceptor')
var businessInterceptor = require("./routes/businessInterceptor")
var candidateUploadInterceptor = require("./routes/candidateUploadInterceptor.js")
var bulkUploadInterceptor = require("./routes/bulkUploadInterceptor.js")
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'copy cat', resave: false, saveUninitialized: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(cookieParser());

app.use('/', posts);
app.use('/profile/sitemap.xml', function(req, res) {
  console.log("here /profile/sitemap.xml")
  var obj = {
    "urlset": {
      "@xmlns": "http://www.sitemaps.org/schemas/sitemap/0.9",
      "@xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
      "@xsi:schemaLocation": "http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
    }
  };
  var url = []
  var activities = res.locals.data.ProfileStore.sitemap;
  for (var index in activities) {
    var activity = activities[index];
    var profileSlug = activity.actorInfo.firstName.toLowerCase() + "-" + activity.actorInfo.lastName.toLowerCase() + "-" + activity.actorId;
    var profileUrl = "http://www.shrofile.com/profile/" + profileSlug;
    var loc1 = {
      "loc": {
        "#text": profileUrl
      }
    }
    url.push(loc1);
  }

  var builder = require('xmlbuilder');
  obj.urlset.url = url
  var root = builder.create(obj);
  var xmlStr = root.end();
  res.set('Content-Type', 'text/xml');
  res.send(xmlStr);
})

app.use('/videos/sitemap.xml', function(req, res) {

  var obj = {
    "urlset": {
      "@xmlns": "http://www.sitemaps.org/schemas/sitemap/0.9",
      "@xmlns:video": "http://www.google.com/schemas/sitemap-video/1.1"
    }
  };
  var url = []
  var activities = res.locals.data.ProfileStore.sitemap;
  for (var index in activities) {
    var activity = activities[index];
    var questionName = activity.resourceInfo.title.replace("\n", "-").toLowerCase();
    questionName = questionName.replace(" ", "-");
    questionName = questionName.replace(" ", "")
    var videoSlug = activity.actorInfo.firstName.toLowerCase() + "-" + activity.actorInfo.lastName.toLowerCase() + "-" + questionName + "-" + activity.id;
    var videoUrl = "http://www.shrofile.com/videos/" + videoSlug;
    var qorder = activity.qorder;
    var hints = config.hints[qorder];
    var videoDescription = activity.actorInfo.firstName + " " + activity.actorInfo.lastName + " talking about " + activity.resourceInfo.title + " and describing " + hints;
    var loc1 = {
      "loc": {
        "#text": videoUrl
      },
      "video:video": {
        "video:thumbnail_loc": activity.resourceInfo.coverImage,
        "video:title": activity.resourceInfo.title,
        "video:description": videoDescription,
        "video:content_loc": activity.resourceInfo.url,
        "video:publication_date": activity.submittedAt
      }
    }
    url.push(loc1);
  }

  var builder = require('xmlbuilder');
  obj.urlset.url = url
  var root = builder.create(obj);
  var xmlStr = root.end();
  res.set('Content-Type', 'text/xml');
  res.send(xmlStr);
})
var upload = multer({
  dest:"uploads/",
  fileFilter: function(req, file, callback) {
    callback(null, true);
  }
});

app.use("/admin/resumeupload/bulk", upload.any(), bulkUploadInterceptor);

app.use("/admin",allVideosInterceptor);
app.use("/admin/*",allVideosInterceptor);
app.use("/videos",allVideosInterceptor);
app.use("/videos/*",videoInterceptor);
app.use("/profile/*",profileInterceptor);

app.use("/business/candidate/upload/:id", upload.single('file'), candidateUploadInterceptor);
app.use("/business/*",businessInterceptor);
app.use(function(err, req, res, next) {
    if(!err.status || err.status !== 404){
        err.status = 500;
    }
    console.log(err);
    res.status(err.status);
    res.sendFile(path.resolve(__dirname+'/views/error/'+err.status+'.html'));
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
});

app.listen(3004, function () {
    console.log('Listening on localhost:3004');
});
