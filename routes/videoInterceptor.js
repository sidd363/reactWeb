var Iso = require('iso');
var alt = require('../src/alt');
var config = require('../config');
var Router = require('react-router');
var routes = require('../src/routes.jsx');
var React = require('react/addons');
module.exports=function(req,res){
  alt.bootstrap(JSON.stringify(res.locals.data || {}));
  var iso = new Iso();
  var college = "";
  var descriptionContent ="";
  var titleContent="";
  var videoUrl="";
  var videoTitle="";
  var videoCoverImage="";
  var publicVideo = true;
  var keywordContent= "Shrofile, Video, video portfolio, share your video, professional video,video profile,personality videos";
  var pageurl = "https://"+"www.shrofile.com"+req.url;
  if(res.locals.data && res.locals.data.ProfileStore && res.locals.data.ProfileStore.video){
    var video = res.locals.data.ProfileStore.video;
    var activity = video.activity;
    var questioName = activity.resourceInfo.title.replace("\n"," ").toLowerCase();
    var qorder = activity.qorder;
    var hints = config.hints[qorder];
    publicVideo = activity.public;
    titleContent = "Shrofile|"+questioName+" video|"+activity.actorInfo.firstName+" "+activity.actorInfo.lastName;
    descriptionContent = "Watch "+activity.actorInfo.firstName+" "+activity.actorInfo.lastName+" talk about"+questioName+" through a 30 seconds video"+" and describing "+hints;
    videoUrl = activity.resourceInfo.url;
    videoCoverImage = activity.resourceInfo.coverImage;
    videoTitle = questioName;
    keywordContent+=keywordContent+","+questioName+","+hints;
  }
  Router.run(routes, req.url, function (Handler) {
        var content = React.renderToString(React.createElement(Handler));
        iso.add(content, alt.flush());
        res.render('index',{content:iso.render(),descriptionContent:descriptionContent,titleContent:titleContent,keywordContent:keywordContent,videoUrl:videoUrl,videoTitle:videoTitle,videoCoverImage:videoCoverImage,pageurl:pageurl,publicVideo:publicVideo});
  });
}
