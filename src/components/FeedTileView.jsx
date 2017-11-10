var React = require('react/addons');
var RouteHandler = require('react-router').RouteHandler;
var Link = require('react-router').Link;
var ProfileActions = require('../actions/ProfileActions.js');
var moment = require("moment");
var FeedTileView = React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },
  loadLikes: function(e) {
    e.preventDefault();
    var self = this;
    ProfileActions.loadLikes(this.props.feed.resourceId, function(err, response) {
      var likeList = "";
      for (var index in response) {
        var like = response[index];
        href = "/profile/" + like.firstName.toLowerCase() + "-" + like.lastName.toLowerCase() + "-" + like.userId;
        if (!like.image_url) {
          like.image_url = "/images/images.png";
        }
        likeList += '<li><a href="' + href + '" class="lklist"><img src="' + like.image_url + '" alt="" />' + like.firstName + ' ' + like.lastName + '</a></li>'
      }
      $("#likeModal .modal-body ul").html(likeList);
    })
  },
  render: function() {
    var feed = this.props.feed;
    var commentCount = feed.resourceInfo.commentCount + " Comment";
    var likeCount = feed.resourceInfo.likeCount + " Like";
    var submittedAt = moment(feed.submittedAt).startOf('hour').fromNow()
    var feedtitle = feed.resourceInfo.title + ": " + feed.actorInfo.firstName + " " + feed.actorInfo.lastName
    var author = feed.actorInfo.firstName + " " + feed.actorInfo.lastName;
    var videoDescription = feed.actorInfo.firstName + " " + feed.actorInfo.lastName + " talking about " + feed.resourceInfo.title;
    var separator = ": ";
    var vidTitle = feed.resourceInfo.title;
    var questioName = feed.resourceInfo.title.replace("\n", "-");
    questioName = questioName.replace(" ", "-").toLowerCase();
    questioName = questioName.replace(" ", "");

    var slug = feed.actorInfo.firstName.toLowerCase() + "-" + feed.actorInfo.lastName.toLowerCase() + "-" + questioName + "-" + feed.id;
    var url = '/videos/' + slug;
    if (feed.resourceInfo.likeCount > 1) {
      likeCount = feed.resourceInfo.likeCount + " Likes";
    }
    if (feed.resourceInfo.commentCount > 1) {
      commentCount = feed.resourceInfo.commentCount + " Comments";
    }
    return (
      <div className="videotile" itemProp="video" itemScope itemType="http://schema.org/VideoObject">
        <meta itemProp="description" content={videoDescription}/>
        <meta itemProp="thumbnailURL" content={feed.resourceInfo.coverImage}/>
        <meta itemProp="contentURL" content={feed.resourceInfo.url}/>
        <meta itemProp="uploadDate" content={feed.submittedAt}/>
        <meta itemProp="duration" content="T30S"/>
        <video key={feed.id} controlsList="nodownload" preload="none" poster={feed.resourceInfo.coverImage} className="tilescreen" controls>
          <source key={feed.id} src={feed.resourceInfo.url} type="video/mp4"/>
        </video>
        <div className="vdtitle">
          <a href={url}>{vidTitle}</a>
        </div>
        <div className="vdcmt">
          <span className="pull-left">{likeCount}</span>
          <a className="pull-right" href={url}><span>{commentCount}</span></a>
        </div>

      </div>
    )
  }
});

module.exports = FeedTileView;
