var React = require('react/addons');
var RouteHandler = require('react-router').RouteHandler;
var browserHistory = require('react-router').browserHistory;
var ProfileActions = require('../actions/ProfileActions.js');
var moment = require("moment");
var PlaylistView = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },
  render: function() {
    var item = this.props.item;
    var submittedAt = moment(item.submittedAt).startOf('hour').fromNow()
    var name = "By:" + item.actorInfo.firstName + " " + item.actorInfo.lastName;
    var questioName = item.resourceInfo.title.replace("\n","-");
    questioName = questioName.replace(" ","-").toLowerCase();
    questioName = questioName.replace(" ","");
    
    var slug = item.actorInfo.firstName.toLowerCase()+"-"+item.actorInfo.lastName.toLowerCase()+"-"+questioName+"-"+item.id;
    var url ="/videos/"+slug
    return (
      <div className="col-xs-12 col-sm-12 ">
        <a href={url}>
        <div className="shotsbox transition">
          <img src={item.resourceInfo.coverImage} alt=""/>
        <div className="playlistmeta">
          <h5>{item.resourceInfo.title}</h5>
          <h6>{name}</h6>
          <span className="cmttime">{submittedAt}</span>
        </div>
        </div>
      </a>
      <div className="lgt-seprator"></div>
      </div>
    )
  }
});

module.exports = PlaylistView;
