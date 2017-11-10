/**
 * Created by Sandeep on 28/06/15.
 */

var request = require('superagent'),
  config = require('../config');
var redis = require('./redis');
var requestlib = require("./request.js");

exports.loadProfile = function(req, res, next) {
  if (req.url.indexOf("sitemap") == -1) {
    var slug = req.params.slug;
    var hyphenlocation = slug.lastIndexOf("-");
    var id = slug.substring(hyphenlocation + 1, slug.length);
    request.get(config.baseUrl + '/users/profile/' + id + "/web", function(err, response) {
      res.locals.data = {
        "ProfileStore": {
          "profile": response.body
        }
      }
      next();
    });
  } else {
    next()
  }
}


exports.loadAllVideos = function(req, res, next) {
  console.log("here loadAllVideos", req.url);
  var mainVideosUrl = config.baseUrl + "/activities/web";
  var limit = config.queryParams.limit;
  console.log("Qparams--->", req.query);
  var offset = (req.query.page ? req.query.page - 1 : 0);
  offset = offset*limit;
  mainVideosUrl = mainVideosUrl + "?offset=" + offset + "&limit=" + limit;
  console.log(mainVideosUrl);
  console.log(mainVideosUrl);
  request.get(mainVideosUrl , function(err, response) {
    if (req.url.indexOf("sitemap") == -1) {
      res.locals.data = {
        "ProfileStore": {
          "allvideos": response.body
        }
      }
    } else {
      res.locals.data = {
        "ProfileStore": {
          "sitemap": response.body
        }
      }
    }
    next();
  });
}

exports.loadVideo = function(req, res, next) {
  if (req.url.indexOf("sitemap") == -1) {
    var slug = req.params.slug;
    var hyphenlocation = slug.lastIndexOf("-");
    var id = slug.substring(hyphenlocation + 1, slug.length);
    request.get(config.baseUrl + '/activities/' + id + "/web", function(err, response) {
      if(req.headers.referer){
          var activity = {};
          if(response.body && response.body.activity){
            activity = response.body.activity;
          }
          if(activity && !activity.public && activity.resourceInfo){
            activity.resourceInfo.coverImage = "https://s3.ap-south-1.amazonaws.com/shrofile-imageassets/novideo.gif";
            activity.resourceInfo.url = "";
            response.body.comments=[];
          }
          console.log("activity====",activity);
          response.body.activity = activity;
      }
      res.locals.data = {
        "ProfileStore": {
          "video": response.body
        }
      }
      next();
    });
  } else {
    next()
  }
}

exports.loadAllUsers = function(req,res,next){
  var usersUrl = '/users/getVerifiedUsers';
  var limit = config.queryParams.limit;
  console.log("Qparams Users--->", req.query);
  var offset = (req.query.page ? req.query.page - 1 : 0);
  offset = offset*limit;
  usersUrl = usersUrl + "?offset=" + offset + "&limit=" + limit;
  console.log("loadAllUsers",req)
  request.get(config.baseUrl + usersUrl)
  .end(function(err,resp){
    res.locals.data = {
      "ProfileStore": {
        "users": resp.body
      }
    }
    next();
  })
}
