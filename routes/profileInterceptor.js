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
  if(res.locals.data && res.locals.data.ProfileStore && res.locals.data.ProfileStore.profile){
   var profile = res.locals.data.ProfileStore.profile;
   titleContent = "Shrofile|"+"Video profile of "+profile.firstName+" "+profile.lastName;
   if(profile.identity.length>0){
     titleContent= titleContent+"|"+profile.identity
   }
   if(profile.educationList && profile.educationList.length){
     for(var index in profile.educationList){
       college+= profile.educationList[index].institution+", ";
     }
   }
   descriptionContent = "With Shrofile explore the personality of "+profile.firstName+" "+profile.lastName+" through video profile";
   if(profile.identity.length>0){
     descriptionContent = "With Shrofile explore the personality of "+profile.firstName+" "+profile.lastName+" "+profile.identity+" through video profile";
   }
   if(profile.identity.length>0 && college.length>0){
     descriptionContent = "With Shrofile explore the personality of "+profile.firstName+" "+profile.lastName+" "+profile.identity+" from "+college+" through video profile";
   }
   videoUrl = profile.url;
   videoCoverImage = profile.coverImage;
   videoTitle = descriptionContent;
   keywordContent+=keywordContent+", introduction video";
 }
  Router.run(routes, req.url, function (Handler) {
        var content = React.renderToString(React.createElement(Handler));
        iso.add(content, alt.flush());
        res.render('index',{content:iso.render(),descriptionContent:descriptionContent,titleContent:titleContent,keywordContent:keywordContent,videoUrl:videoUrl,videoTitle:videoTitle,videoCoverImage:videoCoverImage,pageurl:pageurl});
  });
}
