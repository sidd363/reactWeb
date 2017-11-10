var Iso = require('iso');
var alt = require('../src/alt');
var config = require('../config');
var Router = require('react-router');
var routes = require('../src/routes.jsx');
var React = require('react/addons');
var BusinessComponent
var ReactComponent = React.createFactory()

module.exports=function(req,res){
  alt.bootstrap(JSON.stringify(res.locals.data || {}));
  var iso = new Iso();
  var descriptionContent ="";
  var titleContent="Shrofile Business";
  var keywordContent= "Shrofile, Video, video portfolio, share your video, professional video,video profile,personality videos";
  var pageurl = "https://"+"www.shrofile.com"+req.url;
  var pathUrl = req.originalUrl;

  Router.run(routes, req.originalUrl, function (Handler) {
        var content = React.renderToString(React.createElement(Handler));
        iso.add(content, alt.flush());
        res.render('business',{
          content:iso.render(),
          descriptionContent:descriptionContent,
          titleContent:titleContent,
          keywordContent:keywordContent,
          pageurl:pageurl,
          pathUrl:pathUrl
      });
  });
}
