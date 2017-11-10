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
  var keywordContent= "Shrofile, Video, video portfolio, share your video, professional video,video profile,personality videos";
  var pageurl = "https://"+"www.shrofile.com"+req.url;
  if(res.locals.data && res.locals.data.ProfileStore && res.locals.data.ProfileStore.allvideos){
   titleContent="Shrofile|Browse personality videos";
   descriptionContent="With Shrofile browse through personality based video profiles";
  }
  Router.run(routes, req.url, function (Handler) {
        var content = React.renderToString(React.createElement(Handler));
        iso.add(content, alt.flush());
        res.render('index',{content:iso.render(),descriptionContent:descriptionContent,titleContent:titleContent,keywordContent:keywordContent,videoUrl:videoUrl,videoTitle:videoTitle,videoCoverImage:videoCoverImage,pageurl:pageurl});
  });
}
